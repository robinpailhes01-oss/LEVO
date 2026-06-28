import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { complete, extractJson } from "@/lib/claude";
import { LUNA_SYSTEM_PROMPT, lunaDraftPrompt } from "@/lib/prompts/luna";
import { logAgentAction } from "@/lib/agents/log";
import type { ContentCalendarItem } from "@/lib/types/database";

interface DraftedSlide {
  type: string;
  title: string;
  body: string;
  attribution: string;
  image_prompt: string;
}
interface DraftResult {
  slides: DraftedSlide[];
  caption: string;
  hashtags: string[];
}

export async function POST(req: Request) {
  const started = Date.now();
  let contentId: string | undefined;
  try {
    const body = (await req.json()) as { content_id?: string };
    contentId = body.content_id;
  } catch {
    /* ignore */
  }
  if (!contentId) {
    return NextResponse.json({ ok: false, error: "content_id requis" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  try {
    const { data: item, error: readErr } = await supabase
      .from("content_calendar")
      .select("*")
      .eq("id", contentId)
      .single();
    if (readErr) throw readErr;
    const post = item as ContentCalendarItem;

    const { text, tokens } = await complete({
      system: LUNA_SYSTEM_PROMPT,
      prompt: lunaDraftPrompt(
        post.title,
        post.theme ?? "educatif",
        post.hook_slide1 ?? post.title,
      ),
      maxTokens: 4096,
    });
    const draft = extractJson<DraftResult>(text);

    // Stocke le détail slide par slide dans content_slides (remplace l'existant).
    await supabase.from("content_slides").delete().eq("content_id", contentId);
    const slideRows = draft.slides.map((s, idx) => ({
      content_id: contentId,
      slide_number: idx + 1,
      slide_type: s.type,
      title: s.title,
      body: s.body,
      attribution: s.attribution || null,
      image_prompt: s.image_prompt,
    }));
    const { error: slidesErr } = await supabase
      .from("content_slides")
      .insert(slideRows);
    if (slidesErr) throw slidesErr;

    // Met à jour l'agrégat dans content_calendar.
    const { error: updErr } = await supabase
      .from("content_calendar")
      .update({
        slides_content: draft.slides.map((s) => ({
          type: s.type,
          title: s.title,
          body: s.body,
          attribution: s.attribution,
        })),
        image_prompts: draft.slides.map((s) => s.image_prompt),
        caption: draft.caption,
        hashtags: draft.hashtags,
        status: "drafted",
      })
      .eq("id", contentId);
    if (updErr) throw updErr;

    await logAgentAction({
      agent: "LUNA",
      action: `Rédigé le carrousel "${post.title}" (${draft.slides.length} slides)`,
      input: { content_id: contentId },
      durationMs: Date.now() - started,
      costTokens: tokens,
    });

    return NextResponse.json({ ok: true, draft });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur rédaction";
    await logAgentAction({
      agent: "LUNA",
      action: "Échec rédaction de contenu",
      status: "error",
      error: message,
      durationMs: Date.now() - started,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
