import { checkMcpAuth, mcpOk, mcpError } from "@/lib/mcp/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// MCP Luma — outils clients.

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
      case "get_clients": {
        let query = supabase
          .from("clients")
          .select("*")
          .order("created_at", { ascending: false });
        if (input.status) query = query.eq("status", input.status);
        const { data, error } = await query;
        if (error) throw error;
        return mcpOk(data);
      }

      case "get_client": {
        if (!input.id) return mcpError("id requis");
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .eq("id", input.id)
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      case "update_client": {
        if (!input.id) return mcpError("id requis");
        const { id, ...fields } = input;
        const { data, error } = await supabase
          .from("clients")
          .update(fields)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return mcpOk(data);
      }

      default:
        return mcpError(`Outil clients inconnu: ${tool}`, 404);
    }
  } catch (err) {
    return mcpError(err instanceof Error ? err.message : "Erreur serveur", 500);
  }
}
