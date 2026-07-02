import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { AuditData } from "@/lib/audit/calc";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuditPayload = AuditData & {
  heures_perdues_semaine: number;
  perte_mensuelle_estimee: number;
};

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

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
