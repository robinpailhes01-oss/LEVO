import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { checkMcpAuth } from "@/lib/mcp/guard";
import { logAgentAction } from "@/lib/agents/log";

// Webhook Instantly.ai → notifie Robin qu'un lead a répondu.
// Sécurisé par le même Bearer que le MCP (LUMA_MCP_SECRET) car appelé par un tiers.
// Instantly doit être configuré avec l'en-tête Authorization: Bearer <LUMA_MCP_SECRET>.

interface InstantlyPayload {
  email?: string;
  lead_email?: string;
  reply_text?: string;
  campaign_name?: string;
}

export async function POST(req: Request) {
  const denied = checkMcpAuth(req);
  if (denied) return denied;

  let payload: InstantlyPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }

  const email = payload.lead_email ?? payload.email;
  const supabase = getSupabaseAdmin();

  try {
    if (email) {
      // Stoppe la séquence : le lead passe en "responded".
      await supabase
        .from("leads")
        .update({ status: "responded", last_touch: new Date().toISOString() })
        .eq("email", email);
    }

    await logAgentAction({
      agent: "ORION",
      action: `Réponse reçue de ${email ?? "lead inconnu"} — séquence stoppée, Robin à relayer`,
      input: { email, campaign: payload.campaign_name },
      output: { reply: payload.reply_text },
      status: "pending",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur webhook";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
