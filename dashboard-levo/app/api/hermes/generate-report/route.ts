import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { complete, extractJson } from "@/lib/claude";
import { HERMES_SYSTEM_PROMPT, hermesReportPrompt } from "@/lib/prompts/hermes";
import { logAgentAction } from "@/lib/agents/log";

interface TopAction {
  action: string;
  impact: string;
  urgency: string;
}
interface HermesReport {
  summary: string;
  what_worked: string;
  what_failed: string;
  top_actions: TopAction[];
  alerts: string[];
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function sendEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;
  if (!apiKey || !from || !to) return false; // Resend optionnel
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Alias GET pour le Vercel Cron (lundi 8h) — voir vercel.json.
export async function GET() {
  return POST();
}

export async function POST() {
  const started = Date.now();
  const supabase = getSupabaseAdmin();
  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const since = weekStart.toISOString();
    const [clients, leads, posts, perf, logs, prevReport] = await Promise.all([
      supabase.from("clients").select("mrr,status"),
      supabase.from("leads").select("status,created_at").gte("created_at", since),
      supabase
        .from("content_calendar")
        .select("title,status,published_at")
        .gte("created_at", since),
      supabase.from("content_performance").select("engagement_rate,saves,content_id"),
      supabase
        .from("agent_logs")
        .select("agent_name")
        .gte("created_at", since),
      supabase
        .from("weekly_reports")
        .select("mrr_total")
        .order("week_start", { ascending: false })
        .limit(1),
    ]);

    const mrr = (clients.data ?? [])
      .filter((c) => c.status === "active")
      .reduce((s, c) => s + Number(c.mrr ?? 0), 0);
    const prevMrr = Number(prevReport.data?.[0]?.mrr_total ?? mrr);
    const mrrChange = prevMrr > 0 ? ((mrr - prevMrr) / prevMrr) * 100 : 0;

    const leadsNew = (leads.data ?? []).length;
    const leadsQualified = (leads.data ?? []).filter((l) =>
      ["qualified", "proposal", "won"].includes(l.status),
    ).length;
    const published = (posts.data ?? []).filter((p) => p.status === "published");
    const rates = (perf.data ?? [])
      .map((p) => Number(p.engagement_rate ?? 0))
      .filter((n) => n > 0);
    const avgEng = rates.length ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    const topPost = (posts.data ?? []).find((p) => p.status === "published") ?? null;

    const activity: Record<string, number> = {};
    for (const log of logs.data ?? []) {
      activity[log.agent_name] = (activity[log.agent_name] ?? 0) + 1;
    }

    const { text, tokens } = await complete({
      system: HERMES_SYSTEM_PROMPT,
      prompt: hermesReportPrompt({
        week_start: isoDate(weekStart),
        week_end: isoDate(now),
        mrr_total: mrr,
        mrr_change: Math.round(mrrChange * 10) / 10,
        leads_new: leadsNew,
        leads_qualified: leadsQualified,
        posts_published: published.length,
        posts_avg_engagement: Math.round(avgEng * 10) / 10,
        top_post_title: topPost?.title ?? null,
        agent_activity: activity,
      }),
      maxTokens: 2000,
      temperature: 0.4,
    });
    const report = extractJson<HermesReport>(text);

    const { data: saved, error: saveErr } = await supabase
      .from("weekly_reports")
      .insert({
        week_start: isoDate(weekStart),
        week_end: isoDate(now),
        mrr_total: mrr,
        mrr_change: Math.round(mrrChange * 10) / 10,
        leads_new: leadsNew,
        leads_qualified: leadsQualified,
        posts_published: published.length,
        posts_avg_engagement: Math.round(avgEng * 10) / 10,
        report_content: JSON.stringify(report),
        recommendations: report.top_actions.map(
          (a) => `${a.action} → ${a.impact} ${a.urgency}`,
        ),
      })
      .select("id")
      .single();
    if (saveErr) throw saveErr;

    const html = `<h2>Rapport hebdo Luma</h2>
<p>${report.summary}</p>
<h3>Top 3 actions</h3>
<ul>${report.top_actions
      .map((a) => `<li>${a.urgency} <b>${a.action}</b> → ${a.impact}</li>`)
      .join("")}</ul>`;
    const emailed = await sendEmail("Rapport hebdo Luma — HERMES", html);

    await logAgentAction({
      agent: "HERMES",
      action: `Rapport hebdo généré${emailed ? " + envoyé par email" : ""}`,
      durationMs: Date.now() - started,
      costTokens: tokens,
    });

    return NextResponse.json({ ok: true, report, id: saved.id, emailed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur rapport";
    await logAgentAction({
      agent: "HERMES",
      action: "Échec génération rapport",
      status: "error",
      error: message,
      durationMs: Date.now() - started,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
