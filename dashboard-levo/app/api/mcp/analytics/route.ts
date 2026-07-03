import { checkMcpAuth, mcpOk, mcpError } from "@/lib/mcp/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/types/database";

// MCP Luma — outils HERMES (analytics).

export async function POST(req: Request) {
  const denied = checkMcpAuth(req);
  if (denied) return denied;

  let body: { tool?: string; input?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return mcpError("Corps JSON invalide");
  }

  const { tool, input = {} } = body;
  const supabase = getSupabaseAdmin();

  try {
    switch (tool) {
      case "get_weekly_stats": {
        const weekStart = (input.week_start as string) ?? null;
        const since =
          weekStart ??
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

        const [clients, leads, posts] = await Promise.all([
          supabase.from("clients").select("mrr,status"),
          supabase.from("leads").select("status,created_at").gte("created_at", since),
          supabase
            .from("content_calendar")
            .select("status,published_at")
            .gte("created_at", since),
        ]);

        const mrr = (clients.data ?? [])
          .filter((c) => c.status === "active")
          .reduce((s, c) => s + Number(c.mrr ?? 0), 0);
        const leadsNew = (leads.data ?? []).length;
        const leadsQualified = (leads.data ?? []).filter((l) =>
          ["qualified", "proposal", "won"].includes(l.status),
        ).length;
        const postsPublished = (posts.data ?? []).filter(
          (p) => p.status === "published",
        ).length;

        return mcpOk({
          mrr_total: mrr,
          leads_new: leadsNew,
          leads_qualified: leadsQualified,
          posts_published: postsPublished,
        });
      }

      case "get_top_content": {
        const limit = (input.limit as number | undefined) ?? 5;
        const { data, error } = await supabase
          .from("content_performance")
          .select("*, content_calendar(title)")
          .order("saves", { ascending: false })
          .limit(limit);
        if (error) throw error;
        return mcpOk(data);
      }

      case "get_lead_pipeline": {
        const { data, error } = await supabase.from("leads").select("status");
        if (error) throw error;
        const pipeline: Record<string, number> = {};
        for (const row of data ?? []) {
          const s = row.status as LeadStatus;
          pipeline[s] = (pipeline[s] ?? 0) + 1;
        }
        return mcpOk(pipeline);
      }

      case "create_weekly_report": {
        const { data, error } = await supabase
          .from("weekly_reports")
          .insert({
            week_start: input.week_start,
            week_end: input.week_end,
            report_content: input.content ?? null,
            mrr_total: input.mrr_total ?? null,
            recommendations: input.recommendations ?? null,
          })
          .select("id")
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      default:
        return mcpError(`Outil analytics inconnu: ${tool}`, 404);
    }
  } catch (err) {
    return mcpError(err instanceof Error ? err.message : "Erreur serveur", 500);
  }
}
