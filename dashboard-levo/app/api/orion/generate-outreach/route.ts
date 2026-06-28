import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { complete, extractJson } from "@/lib/claude";
import { ORION_SYSTEM_PROMPT, orionOutreachPrompt } from "@/lib/prompts/orion";
import { logAgentAction } from "@/lib/agents/log";
import type { Lead } from "@/lib/types/database";

interface OutreachVariant {
  angle: string;
  messages: string[];
}
interface OutreachResult {
  variant_a: OutreachVariant;
  variant_b: OutreachVariant;
}

export async function POST(req: Request) {
  const started = Date.now();
  let leadId: string | undefined;
  let type: "email" | "dm" = "email";
  try {
    const body = (await req.json()) as { lead_id?: string; type?: "email" | "dm" };
    leadId = body.lead_id;
    if (body.type) type = body.type;
  } catch {
    /* ignore */
  }
  if (!leadId) {
    return NextResponse.json({ ok: false, error: "lead_id requis" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  try {
    const { data: lead, error: readErr } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();
    if (readErr) throw readErr;
    const l = lead as Lead;

    const { text, tokens } = await complete({
      system: ORION_SYSTEM_PROMPT,
      prompt: orionOutreachPrompt(l, l.pain_points ?? [], type),
      maxTokens: 2000,
      temperature: 0.7,
    });
    const result = extractJson<OutreachResult>(text);

    // Stocke la séquence A/B dans enrichment_data + passe le lead en "contacted".
    const { error: updErr } = await supabase
      .from("leads")
      .update({
        status: "contacted",
        last_touch: new Date().toISOString(),
        enrichment_data: {
          ...(l.enrichment_data ?? {}),
          outreach: { type, ...result },
        },
      })
      .eq("id", leadId);
    if (updErr) throw updErr;

    await logAgentAction({
      agent: "ORION",
      action: `Séquence ${type} A/B générée pour ${l.company ?? leadId}`,
      input: { lead_id: leadId, type },
      durationMs: Date.now() - started,
      costTokens: tokens,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur génération outreach";
    await logAgentAction({
      agent: "ORION",
      action: "Échec génération outreach",
      status: "error",
      error: message,
      durationMs: Date.now() - started,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
