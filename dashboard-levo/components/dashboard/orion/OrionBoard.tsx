"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import type { Lead } from "@/lib/types/database";

const COLUMNS: { key: string; label: string; statuses: string[] }[] = [
  { key: "new", label: "Nouveau", statuses: ["new"] },
  { key: "qualified", label: "Enrichi / Qualifié", statuses: ["qualified"] },
  { key: "contacted", label: "Contacté", statuses: ["contacted", "proposal"] },
  { key: "responded", label: "Répondu", statuses: ["responded", "won"] },
];

interface OutreachVariant {
  angle: string;
  messages: string[];
}

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<{ ok: boolean; error?: string }>;
}

function scoreColor(score: number): string {
  if (score >= 80) return "#1A7F37";
  if (score >= 60) return "#B8860B";
  return "#9AA5B4";
}

export function OrionBoard({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  async function run(key: string, fn: () => Promise<{ ok: boolean; error?: string }>) {
    setBusy(key);
    setError("");
    const r = await fn();
    setBusy(null);
    if (!r.ok) setError(r.error ?? "Erreur");
    else router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "#0B1F4A" }}>
            ORION — Acquisition
          </h1>
          <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
            Pipeline de prospection PME
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold text-white"
          style={{ background: "#CC3A00" }}
        >
          <Plus size={16} />
          Ajouter un lead
        </button>
      </div>

      {adding && (
        <AddLeadForm
          onAdded={() => {
            setAdding(false);
            router.refresh();
          }}
        />
      )}

      {error && (
        <p className="mb-4 font-body text-sm" style={{ color: "#CC0000" }}>
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => col.statuses.includes(l.status));
          return (
            <div key={col.key}>
              <div className="mb-3 flex items-center justify-between">
                <h2
                  className="font-body text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#9AA5B4" }}
                >
                  {col.label}
                </h2>
                <span className="font-body text-xs" style={{ color: "#C9BFA8" }}>
                  {colLeads.length}
                </span>
              </div>
              <div className="space-y-3">
                {colLeads.map((lead) => {
                  const enrich = (lead.enrichment_data ?? {}) as {
                    best_angle?: string;
                    outreach?: {
                      type: string;
                      variant_a: OutreachVariant;
                      variant_b: OutreachVariant;
                    };
                  };
                  return (
                    <div
                      key={lead.id}
                      className="rounded-xl bg-white p-4"
                      style={{ boxShadow: "0 2px 8px rgba(11,31,74,0.05)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="font-body text-sm font-semibold"
                          style={{ color: "#0B1F4A" }}
                        >
                          {lead.company ?? lead.full_name ?? "Lead"}
                        </p>
                        <span
                          className="rounded-full px-2 py-0.5 font-body text-xs font-bold text-white"
                          style={{ background: scoreColor(lead.score) }}
                        >
                          {lead.score}
                        </span>
                      </div>
                      {lead.sector && (
                        <p className="mt-1 font-body text-xs" style={{ color: "#9AA5B4" }}>
                          {lead.sector}
                        </p>
                      )}
                      {lead.pain_points && lead.pain_points.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {lead.pain_points.slice(0, 3).map((p, i) => (
                            <li
                              key={i}
                              className="font-body text-xs"
                              style={{ color: "#4A5568" }}
                            >
                              • {p}
                            </li>
                          ))}
                        </ul>
                      )}

                      {enrich.outreach && (
                        <div
                          className="mt-3 rounded-lg p-2"
                          style={{ background: "#ECEEF8" }}
                        >
                          <p
                            className="font-body text-[11px] font-semibold"
                            style={{ color: "#1A3BFF" }}
                          >
                            Séquence {enrich.outreach.type} générée (A/B)
                          </p>
                          <p
                            className="mt-1 line-clamp-2 font-body text-[11px]"
                            style={{ color: "#4A5568" }}
                          >
                            A : {enrich.outreach.variant_a.messages[0]}
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {lead.status === "new" && (
                          <button
                            type="button"
                            onClick={() =>
                              run(lead.id, () =>
                                post("/api/orion/enrich-lead", { lead_id: lead.id }),
                              )
                            }
                            disabled={busy === lead.id}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-semibold text-white disabled:opacity-60"
                            style={{ background: "#CC3A00" }}
                          >
                            {busy === lead.id && (
                              <Loader2 size={12} className="animate-spin" />
                            )}
                            Enrichir
                          </button>
                        )}
                        {lead.status === "qualified" && (
                          <button
                            type="button"
                            onClick={() =>
                              run(lead.id, () =>
                                post("/api/orion/generate-outreach", {
                                  lead_id: lead.id,
                                  type: "email",
                                }),
                              )
                            }
                            disabled={busy === lead.id}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-semibold text-white disabled:opacity-60"
                            style={{ background: "#1A3BFF" }}
                          >
                            {busy === lead.id && (
                              <Loader2 size={12} className="animate-spin" />
                            )}
                            Générer séquence
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {colLeads.length === 0 && (
                  <p
                    className="rounded-xl border border-dashed p-4 text-center font-body text-xs"
                    style={{ borderColor: "#C9BFA8", color: "#C9BFA8" }}
                  >
                    Vide
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddLeadForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    full_name: "",
    company: "",
    linkedin_url: "",
    source: "linkedin",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    setBusy(true);
    setErr("");
    const res = await fetch("/api/orion/add-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    setBusy(false);
    if (data.ok) onAdded();
    else setErr(data.error ?? "Erreur");
  }

  return (
    <div
      className="mb-6 rounded-2xl bg-white p-5"
      style={{ boxShadow: "0 4px 16px rgba(11,31,74,0.06)" }}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          placeholder="Nom du dirigeant"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="rounded-lg border px-3 py-2 font-body text-sm outline-none"
          style={{ borderColor: "#C9BFA8" }}
        />
        <input
          placeholder="Entreprise"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="rounded-lg border px-3 py-2 font-body text-sm outline-none"
          style={{ borderColor: "#C9BFA8" }}
        />
        <input
          placeholder="URL LinkedIn"
          value={form.linkedin_url}
          onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
          className="rounded-lg border px-3 py-2 font-body text-sm outline-none"
          style={{ borderColor: "#C9BFA8" }}
        />
      </div>
      {err && (
        <p className="mt-2 font-body text-sm" style={{ color: "#CC0000" }}>
          {err}
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className="mt-3 rounded-full px-4 py-2 font-body text-sm font-semibold text-white disabled:opacity-60"
        style={{ background: "#CC3A00" }}
      >
        {busy ? "Ajout…" : "Enregistrer le lead"}
      </button>
    </div>
  );
}
