import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { AgentName, AgentLogStatus } from "@/lib/types/database";

interface LogInput {
  agent: AgentName;
  action: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  status?: AgentLogStatus;
  durationMs?: number;
  costTokens?: number;
  error?: string;
}

/**
 * Écrit une ligne dans agent_logs. Ne lève jamais : le logging ne doit
 * pas casser le flux métier (best-effort).
 */
export async function logAgentAction(input: LogInput): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("agent_logs").insert({
      agent_name: input.agent,
      action: input.action,
      input_data: input.input ?? null,
      output_data: input.output ?? null,
      status: input.status ?? "success",
      duration_ms: input.durationMs ?? null,
      cost_tokens: input.costTokens ?? null,
      error_message: input.error ?? null,
    });
  } catch (err) {
    console.error("[agent_logs] échec d'écriture du log:", err);
  }
}
