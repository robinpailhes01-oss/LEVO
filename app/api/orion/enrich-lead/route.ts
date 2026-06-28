import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { complete, extractJson } from "@/lib/claude";
import { ORION_SYSTEM_PROMPT, orionEnrichPrompt } from "@/lib/prompts/orion";
import { logAgentAction } from "@/lib/agents/log";
import type { Lead } from "@/lib/types/database";

interface EnrichResult {
  score: number;
  sector: string;
  pain_points: string[];
  digital_maturity: string;
  best_angle: string;
  reasoning: string;
}

export async function POST(req: Request) {
  const started = Date.now();
  let leadId: string | undefined;
  try {
    const body = (await req.json()) as { lead_id?: string };
    leadId = body.lead_id;
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
      prompt: orionEnrichPrompt(l),
      maxTokens: 1500,
      temperature: 0.4,
    });
    const result = extractJson<EnrichResult>(text);
    const score = Math.min(Math.max(Math.round(result.score), 0), 100);

    const { error: updErr } = await supabase
      .from("leads")
      .update({
        score,
        sector: result.sector,
        pain_points: result.pain_points,
        status: "qualified",
        last_touch: new Date().toISOString(),
        enrichment_data: {
          digital_maturity: result.digital_maturity,
          best_angle: result.best_angle,
          reasoning: result.reasoning,
        },
      })
      .eq("id", leadId);
    if (updErr) throw updErr;

    await logAgentAction({
      agent: "ORION",
      action: `Lead enrichi : ${l.company ?? l.full_name ?? leadId} (score ${score})`,
      input: { lead_id: leadId },
      output: { score },
      durationMs: Date.now() - started,
      costTokens: tokens,
    });

    return NextResponse.json({ ok: true, result: { ...result, score } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur enrichissement";
    await logAgentAction({
      agent: "ORION",
      action: "Échec enrichissement lead",
      status: "error",
      error: message,
      durationMs: Date.now() - started,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
