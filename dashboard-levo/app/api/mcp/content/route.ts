import { checkMcpAuth, mcpOk, mcpError } from "@/lib/mcp/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// MCP Luma — outils LUNA (contenu).
// POST { tool: string, input: object }

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
      case "get_content_calendar": {
        const status = input.status as string | undefined;
        const limit = (input.limit as number | undefined) ?? 50;
        let query = supabase
          .from("content_calendar")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        if (status) query = query.eq("status", status);
        const { data, error } = await query;
        if (error) throw error;
        return mcpOk(data);
      }

      case "create_content_idea": {
        const { data, error } = await supabase
          .from("content_calendar")
          .insert({
            title: input.title,
            theme: input.theme,
            hook_slide1: input.hook_slide1 ?? null,
            platform: input.platform ?? ["instagram", "facebook"],
            status: "idea",
            created_by: "LUNA",
          })
          .select("id")
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      case "update_content_status": {
        if (!input.id) return mcpError("id requis");
        const patch: Record<string, unknown> = { status: input.status };
        if (input.slides_content) patch.slides_content = input.slides_content;
        if (input.image_prompts) patch.image_prompts = input.image_prompts;
        if (input.caption) patch.caption = input.caption;
        const { data, error } = await supabase
          .from("content_calendar")
          .update(patch)
          .eq("id", input.id)
          .select()
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      case "get_content_performance": {
        if (!input.content_id) return mcpError("content_id requis");
        const { data, error } = await supabase
          .from("content_performance")
          .select("*")
          .eq("content_id", input.content_id);
        if (error) throw error;
        return mcpOk(data);
      }

      case "log_agent_action": {
        const { data, error } = await supabase
          .from("agent_logs")
          .insert({
            agent_name: input.agent_name,
            action: input.action,
            input_data: input.input_data ?? null,
            output_data: input.output_data ?? null,
            status: input.status ?? "success",
          })
          .select("id")
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      default:
        return mcpError(`Outil content inconnu: ${tool}`, 404);
    }
  } catch (err) {
    return mcpError(err instanceof Error ? err.message : "Erreur serveur", 500);
  }
}
