import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logAgentAction } from "@/lib/agents/log";
import type { LeadSource } from "@/lib/types/database";

const SOURCES: LeadSource[] = [
  "instagram",
  "linkedin",
  "referral",
  "website",
  "cold_email",
];

export async function POST(req: Request) {
  let body: {
    full_name?: string;
    company?: string;
    linkedin_url?: string;
    instagram_handle?: string;
    email?: string;
    source?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }
  if (!body.company && !body.full_name) {
    return NextResponse.json(
      { ok: false, error: "Nom ou entreprise requis" },
      { status: 400 },
    );
  }

  const source = SOURCES.includes(body.source as LeadSource)
    ? (body.source as LeadSource)
    : "linkedin";

  const supabase = getSupabaseAdmin();
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        full_name: body.full_name ?? null,
        company: body.company ?? null,
        linkedin_url: body.linkedin_url ?? null,
        instagram_handle: body.instagram_handle ?? null,
        email: body.email ?? null,
        source,
        status: "new",
      })
      .select("id")
      .single();
    if (error) throw error;

    await logAgentAction({
      agent: "ORION",
      action: `Nouveau lead ajouté : ${body.company ?? body.full_name}`,
      output: { id: data.id },
    });

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur ajout lead";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
