import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { TACHE_OPTIONS, type AuditData } from "@/lib/audit/calc";
import type { SupabaseClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuditPayload = AuditData & {
  heures_perdues_semaine: number;
  perte_mensuelle_estimee: number;
  lead_id?: string;
};

// Envoie l'événement d'audit au dashboard CRM (projet séparé).
// Best-effort : jamais bloquant, erreurs ignorées. Ne fait rien sans lead_id.
async function notifyCrm(
  leadId: string,
  answers: Record<string, unknown>,
): Promise<void> {
  const url = process.env.LEVO_WEBHOOK_URL;
  const token = process.env.LEVO_WEBHOOK_TOKEN;
  if (!url || !token) return; // webhook non configuré → on ignore
  try {
    await fetch(`${url}?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: leadId, answers }),
    });
  } catch (err) {
    console.error("[audit] webhook CRM échoué (ignoré):", err);
  }
}

const TACHE_LABEL: Record<string, string> = Object.fromEntries(
  TACHE_OPTIONS.map((t) => [t.key, t.label]),
);

// Crée aussi un lead dans le pipeline ORION (best-effort — ne bloque jamais l'audit).
async function upsertLead(
  supabase: SupabaseClient,
  body: Partial<AuditPayload>,
  email: string,
): Promise<void> {
  try {
    const perte = Math.round(Number(body.perte_mensuelle_estimee) || 0);
    let score = Math.min(95, Math.max(20, Math.round(perte / 100)));
    if (body.horizon === "Dès que possible") score = Math.min(100, score + 10);

    const fullName = [body.prenom, body.nom].filter(Boolean).join(" ") || null;
    const painPoints = (body.taches ?? []).map((k) => TACHE_LABEL[k] ?? k);

    await supabase.from("leads").insert({
      full_name: fullName,
      company: body.entreprise ?? null,
      email,
      sector: body.secteur ?? null,
      source: "website",
      status: "new",
      score,
      assigned_agent: "ORION",
      pain_points: painPoints,
      notes: `Audit gratuit — perte estimée ${perte.toLocaleString("fr-FR")} €/mois · ${
        Number(body.heures_perdues_semaine) || 0
      } h/sem · horizon : ${body.horizon ?? "n.c."}`,
      enrichment_data: {
        source: "audit",
        perte_mensuelle_estimee: perte,
        heures_perdues_semaine: Number(body.heures_perdues_semaine) || 0,
        horizon: body.horizon ?? null,
      },
    });
  } catch (err) {
    console.error("[audit] création du lead échouée:", err);
  }
}

export async function POST(req: Request) {
  let body: Partial<AuditPayload>;
  try {
    body = (await req.json()) as Partial<AuditPayload>;
  } catch {
    return NextResponse.json({ success: false, error: "Requête invalide" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
  }

  // Webhook CRM (best-effort, indépendant de Supabase) — uniquement si le
  // visiteur est arrivé via un lien de prospection personnalisé (?lead=…).
  const leadId = typeof body.lead_id === "string" ? body.lead_id.trim() : "";
  if (leadId) {
    const answers = { ...body };
    delete answers.lead_id;
    await notifyCrm(leadId, answers);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Base de données non configurée" },
      { status: 500 },
    );
  }

  try {
    const { error } = await supabase.from("audits").insert({
      prenom: body.prenom ?? null,
      nom: body.nom ?? null,
      email,
      entreprise: body.entreprise ?? null,
      secteur: body.secteur ?? null,
      taches: body.taches ?? [],
      temps_par_tache: body.temps_par_tache ?? {},
      demandes_semaine: body.demandes_semaine ?? null,
      temps_reponse: body.temps_reponse ?? null,
      devis_semaine: body.devis_semaine ?? null,
      temps_devis: body.temps_devis ?? null,
      clients_perdus: body.clients_perdus ?? null,
      panier_moyen: body.panier_moyen ?? null,
      horizon: body.horizon ?? null,
      perte_mensuelle_estimee: Math.round(Number(body.perte_mensuelle_estimee) || 0),
      heures_perdues_semaine: Number(body.heures_perdues_semaine) || 0,
    });
    if (error) throw error;

    // Miroir dans le pipeline ORION (n'affecte pas le succès de l'audit).
    await upsertLead(supabase, body, email);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
