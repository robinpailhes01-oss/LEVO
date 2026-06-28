import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logAgentAction } from "@/lib/agents/log";
import type { ContentStatus } from "@/lib/types/database";

interface SlideFeedback {
  slide_number: number;
  positive?: string;
  negative?: string;
}

export async function POST(req: Request) {
  let body: {
    id?: string;
    status?: ContentStatus;
    approved_by?: string;
    feedback?: SlideFeedback[];
    discard?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ ok: false, error: "id requis" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  try {
    // Écarter une idée → suppression (pas de statut "discarded" dans le schéma).
    if (body.discard) {
      const { error } = await supabase
        .from("content_calendar")
        .delete()
        .eq("id", body.id);
      if (error) throw error;
      await logAgentAction({
        agent: "LUNA",
        action: "Idée écartée",
        input: { id: body.id },
      });
      return NextResponse.json({ ok: true });
    }

    // Feedback slide par slide (optionnel).
    if (body.feedback?.length) {
      for (const f of body.feedback) {
        await supabase
          .from("content_slides")
          .update({
            feedback_positive: f.positive ?? null,
            feedback_negative: f.negative ?? null,
          })
          .eq("content_id", body.id)
          .eq("slide_number", f.slide_number);
      }
    }

    if (body.status) {
      const patch: Record<string, unknown> = { status: body.status };
      if (body.approved_by) patch.approved_by = body.approved_by;
      if (body.status === "published") patch.published_at = new Date().toISOString();
      const { error } = await supabase
        .from("content_calendar")
        .update(patch)
        .eq("id", body.id);
      if (error) throw error;
    }

    await logAgentAction({
      agent: "LUNA",
      action: `Statut du post mis à jour → ${body.status ?? "feedback"}`,
      input: { id: body.id },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur mise à jour";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
