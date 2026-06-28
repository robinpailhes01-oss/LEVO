import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { complete, extractJson } from "@/lib/claude";
import { LUNA_SYSTEM_PROMPT, lunaIdeasPrompt } from "@/lib/prompts/luna";
import { logAgentAction } from "@/lib/agents/log";
import type { ContentTheme } from "@/lib/types/database";

interface GeneratedIdea {
  title: string;
  theme: ContentTheme;
  hook_slide1: string;
  angle: string;
}

export async function POST(req: Request) {
  const started = Date.now();
  let count = 7;
  let themes: string[] | undefined;
  try {
    const body = (await req.json()) as { count?: number; themes?: string[] };
    if (typeof body.count === "number") count = Math.min(Math.max(body.count, 1), 12);
    themes = body.themes;
  } catch {
    /* corps optionnel */
  }

  try {
    const { text, tokens } = await complete({
      system: LUNA_SYSTEM_PROMPT,
      prompt: lunaIdeasPrompt(count, themes),
      maxTokens: 2048,
    });
    const ideas = extractJson<GeneratedIdea[]>(text);

    const supabase = getSupabaseAdmin();
    const rows = ideas.map((i) => ({
      title: i.title,
      theme: i.theme,
      hook_slide1: i.hook_slide1,
      status: "idea" as const,
      created_by: "LUNA",
    }));
    const { data, error } = await supabase
      .from("content_calendar")
      .insert(rows)
      .select("id");
    if (error) throw error;

    await logAgentAction({
      agent: "LUNA",
      action: `Généré ${ideas.length} idées de contenu`,
      output: { ids: data?.map((d) => d.id) },
      durationMs: Date.now() - started,
      costTokens: tokens,
    });

    return NextResponse.json({ ok: true, ideas, ids: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur génération";
    await logAgentAction({
      agent: "LUNA",
      action: "Échec génération d'idées",
      status: "error",
      error: message,
      durationMs: Date.now() - started,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
