import { NextResponse } from "next/server";
import { type AuditData } from "@/lib/audit/calc";

// Audit gratuit du site vitrine.
// Source de vérité UNIQUE : le CRM (projet LEVO-AGENCE), atteint via le webhook
// LEVO_WEBHOOK_URL. On n'écrit plus jamais en direct dans les tables Supabase
// partagées (`leads`, `audits`) — c'est le CRM qui gère toute la persistance et
// le traitement en aval.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuditPayload = AuditData & {
  heures_perdues_semaine: number;
  perte_mensuelle_estimee: number;
  lead_id?: string;
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

  const url = process.env.LEVO_WEBHOOK_URL;
  const token = process.env.LEVO_WEBHOOK_TOKEN;
  if (!url || !token) {
    return NextResponse.json(
      { success: false, error: "Webhook CRM non configuré" },
      { status: 500 },
    );
  }

  // lead_id présent uniquement si le visiteur vient d'un lien de prospection (?lead=…).
  const leadId =
    typeof body.lead_id === "string" && body.lead_id.trim() ? body.lead_id.trim() : null;

  // answers = toutes les réponses du formulaire (sans le lead_id, transmis à part).
  const answers: Record<string, unknown> = { ...body, email };
  delete answers.lead_id;

  try {
    const res = await fetch(`${url}?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: leadId, answers }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[audit] webhook CRM statut", res.status, detail);
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi au CRM" },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[audit] webhook CRM échoué:", err);
    return NextResponse.json(
      { success: false, error: "Erreur réseau vers le CRM" },
      { status: 502 },
    );
  }
}
