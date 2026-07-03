import { checkMcpAuth, mcpOk, mcpError } from "@/lib/mcp/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// MCP Luma — outils ORION (leads).

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
      case "get_leads": {
        const limit = (input.limit as number | undefined) ?? 50;
        let query = supabase
          .from("leads")
          .select("*")
          .order("score", { ascending: false })
          .limit(limit);
        if (input.status) query = query.eq("status", input.status);
        if (typeof input.score_min === "number")
          query = query.gte("score", input.score_min);
        const { data, error } = await query;
        if (error) throw error;
        return mcpOk(data);
      }

      case "create_lead": {
        const { data, error } = await supabase
          .from("leads")
          .insert({
            full_name: input.full_name,
            company: input.company,
            email: input.email ?? null,
            source: input.source,
            linkedin_url: input.linkedin_url ?? null,
            instagram_handle: input.instagram_handle ?? null,
            sector: input.sector ?? null,
            status: "new",
          })
          .select("id")
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      case "update_lead": {
        if (!input.id) return mcpError("id requis");
        const patch: Record<string, unknown> = {};
        for (const k of [
          "status",
          "score",
          "notes",
          "enrichment_data",
          "pain_points",
          "sector",
          "last_touch",
        ]) {
          if (input[k] !== undefined) patch[k] = input[k];
        }
        const { data, error } = await supabase
          .from("leads")
          .update(patch)
          .eq("id", input.id)
          .select()
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      case "create_proposal": {
        const { data, error } = await supabase
          .from("proposals")
          .insert({
            lead_id: input.lead_id,
            title: input.title,
            amount: input.amount ?? null,
            services: input.services ?? null,
            content: input.content ?? null,
            status: "draft",
          })
          .select("id")
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      default:
        return mcpError(`Outil leads inconnu: ${tool}`, 404);
    }
  } catch (err) {
    return mcpError(err instanceof Error ? err.message : "Erreur serveur", 500);
  }
}
