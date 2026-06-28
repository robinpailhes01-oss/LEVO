"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import type { WeeklyReport } from "@/lib/types/database";
import { Card, StatCard, EmptyState } from "@/components/dashboard/ui";

interface TopAction {
  action: string;
  impact: string;
  urgency: string;
}
interface ParsedReport {
  summary: string;
  what_worked: string;
  what_failed: string;
  top_actions: TopAction[];
  alerts: string[];
}

function parse(report: WeeklyReport): ParsedReport | null {
  if (!report.report_content) return null;
  try {
    return JSON.parse(report.report_content) as ParsedReport;
  } catch {
    return null;
  }
}

export function HermesView({ reports }: { reports: WeeklyReport[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const latest = reports[0];
  const parsed = latest ? parse(latest) : null;

  async function generate() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/hermes/generate-report", { method: "POST" });
    const data = (await res.json()) as { ok: boolean; error?: string };
    setBusy(false);
    if (data.ok) router.refresh();
    else setError(data.error ?? "Erreur");
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "#0B1F4A" }}>
            HERMES — Analytics
          </h1>
          <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
            Rapport hebdomadaire et recommandations
          </p>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={busy}
          className="flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: "#0B6E63" }}
        >
          {busy ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Générer le rapport maintenant
        </button>
      </div>

      {error && (
        <p className="mb-4 font-body text-sm" style={{ color: "#CC0000" }}>
          {error}
        </p>
      )}

      {!latest ? (
        <EmptyState message="Aucun rapport pour l'instant. Cliquez sur « Générer le rapport maintenant »." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="MRR"
              value={`${Number(latest.mrr_total ?? 0).toLocaleString("fr-FR")} €`}
              sub={`${(latest.mrr_change ?? 0) >= 0 ? "▲" : "▼"} ${latest.mrr_change ?? 0}%`}
            />
            <StatCard label="Nouveaux leads" value={String(latest.leads_new)} />
            <StatCard label="Leads qualifiés" value={String(latest.leads_qualified)} />
            <StatCard
              label="Posts publiés"
              value={String(latest.posts_published)}
              sub={`${latest.posts_avg_engagement ?? 0}% engagement`}
            />
          </div>

          {parsed && (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Card>
                <h2 className="font-display text-lg font-bold" style={{ color: "#0B1F4A" }}>
                  Synthèse
                </h2>
                <p className="mt-2 font-body text-sm" style={{ color: "#4A5568" }}>
                  {parsed.summary}
                </p>
                <h3 className="mt-5 font-body text-sm font-semibold" style={{ color: "#1A7F37" }}>
                  Ce qui a marché
                </h3>
                <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
                  {parsed.what_worked}
                </p>
                <h3 className="mt-4 font-body text-sm font-semibold" style={{ color: "#CC3A00" }}>
                  Ce qui n&apos;a pas marché
                </h3>
                <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
                  {parsed.what_failed}
                </p>
              </Card>

              <Card>
                <h2 className="font-display text-lg font-bold" style={{ color: "#0B1F4A" }}>
                  Top 3 actions
                </h2>
                <ol className="mt-3 space-y-3">
                  {parsed.top_actions.map((a, i) => (
                    <li key={i} className="rounded-xl p-3" style={{ background: "#ECEEF8" }}>
                      <p className="font-body text-sm font-semibold" style={{ color: "#0B1F4A" }}>
                        {a.urgency} {a.action}
                      </p>
                      <p className="font-body text-xs" style={{ color: "#4A5568" }}>
                        {a.impact}
                      </p>
                    </li>
                  ))}
                </ol>

                {parsed.alerts.length > 0 && (
                  <>
                    <h3 className="mt-5 font-body text-sm font-semibold" style={{ color: "#CC0000" }}>
                      Alertes
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {parsed.alerts.map((al, i) => (
                        <li key={i} className="font-body text-xs" style={{ color: "#CC0000" }}>
                          ⚠️ {al}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Card>
            </div>
          )}

          {/* Historique */}
          <Card className="mt-6">
            <h2 className="font-display text-lg font-bold" style={{ color: "#0B1F4A" }}>
              Historique des rapports
            </h2>
            <div className="mt-3 space-y-2">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ background: "#ECEEF8" }}
                >
                  <span className="font-body text-sm" style={{ color: "#0B1F4A" }}>
                    {r.week_start} → {r.week_end}
                  </span>
                  <span className="font-body text-sm font-semibold" style={{ color: "#0B6E63" }}>
                    {Number(r.mrr_total ?? 0).toLocaleString("fr-FR")} €
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
