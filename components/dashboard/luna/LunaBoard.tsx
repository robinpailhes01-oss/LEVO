"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import type { ContentCalendarItem, SlideContent } from "@/lib/types/database";
import { Badge } from "@/components/dashboard/ui";

const COLUMNS: { key: string; label: string; statuses: string[] }[] = [
  { key: "idea", label: "Idées", statuses: ["idea"] },
  { key: "approved_idea", label: "Approuvées", statuses: ["approved_idea"] },
  { key: "drafted", label: "Rédigées", statuses: ["drafted"] },
  { key: "validated", label: "Validées", statuses: ["approved_content", "ready"] },
  { key: "published", label: "Publiées", statuses: ["published", "scheduled"] },
];

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<{ ok: boolean; error?: string }>;
}

export function LunaBoard({ items }: { items: ContentCalendarItem[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<ContentCalendarItem | null>(null);
  const [error, setError] = useState("");

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
            LUNA — Contenu
          </h1>
          <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
            Pipeline éditorial Instagram
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            run("generate", () => post("/api/luna/generate-ideas", { count: 7 }))
          }
          disabled={busy === "generate"}
          className="flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: "#1A3BFF" }}
        >
          {busy === "generate" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          Générer 7 idées
        </button>
      </div>

      {error && (
        <p className="mb-4 font-body text-sm" style={{ color: "#CC0000" }}>
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {COLUMNS.map((col) => {
          const colItems = items.filter((i) => col.statuses.includes(i.status));
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
                  {colItems.length}
                </span>
              </div>
              <div className="space-y-3">
                {colItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-white p-4"
                    style={{ boxShadow: "0 2px 8px rgba(11,31,74,0.05)" }}
                  >
                    <p
                      className="font-body text-sm font-semibold"
                      style={{ color: "#0B1F4A" }}
                    >
                      {item.title}
                    </p>
                    {item.theme && (
                      <p className="mt-1 font-body text-xs" style={{ color: "#9AA5B4" }}>
                        {item.theme}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.status === "idea" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              run(item.id, () =>
                                post("/api/luna/update-status", {
                                  id: item.id,
                                  status: "approved_idea",
                                }),
                              )
                            }
                            className="rounded-full px-3 py-1 font-body text-xs font-semibold text-white"
                            style={{ background: "#1A7F37" }}
                          >
                            Garder
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              run(item.id, () =>
                                post("/api/luna/update-status", {
                                  id: item.id,
                                  discard: true,
                                }),
                              )
                            }
                            className="rounded-full px-3 py-1 font-body text-xs"
                            style={{ background: "#FBE3E3", color: "#CC0000" }}
                          >
                            Écarter
                          </button>
                        </>
                      )}
                      {item.status === "approved_idea" && (
                        <button
                          type="button"
                          onClick={() =>
                            run(item.id, () =>
                              post("/api/luna/draft-content", { content_id: item.id }),
                            )
                          }
                          disabled={busy === item.id}
                          className="flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-semibold text-white disabled:opacity-60"
                          style={{ background: "#1A3BFF" }}
                        >
                          {busy === item.id && (
                            <Loader2 size={12} className="animate-spin" />
                          )}
                          Rédiger
                        </button>
                      )}
                      {item.status === "drafted" && (
                        <button
                          type="button"
                          onClick={() => setOpen(item)}
                          className="rounded-full px-3 py-1 font-body text-xs font-semibold"
                          style={{ background: "#ECEEF8", color: "#1A3BFF" }}
                        >
                          Revoir & valider
                        </button>
                      )}
                      {(item.status === "approved_content" ||
                        item.status === "ready") && (
                        <button
                          type="button"
                          onClick={() =>
                            run(item.id, () =>
                              post("/api/luna/update-status", {
                                id: item.id,
                                status: "published",
                              }),
                            )
                          }
                          className="rounded-full px-3 py-1 font-body text-xs font-semibold text-white"
                          style={{ background: "#1A7F37" }}
                        >
                          Marquer publié
                        </button>
                      )}
                      {item.status === "published" && <Badge status="published" />}
                    </div>
                  </div>
                ))}
                {colItems.length === 0 && (
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

      {open && (
        <SlideReviewModal
          item={open}
          onClose={() => setOpen(null)}
          onValidated={() => {
            setOpen(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function SlideReviewModal({
  item,
  onClose,
  onValidated,
}: {
  item: ContentCalendarItem;
  onClose: () => void;
  onValidated: () => void;
}) {
  const slides: SlideContent[] = item.slides_content ?? [];
  const [feedback, setFeedback] = useState<
    Record<number, { positive: string; negative: string }>
  >({});
  const [busy, setBusy] = useState(false);

  function setFb(n: number, field: "positive" | "negative", value: string) {
    setFeedback((prev) => ({
      ...prev,
      [n]: { ...{ positive: "", negative: "" }, ...prev[n], [field]: value },
    }));
  }

  async function regenerate() {
    setBusy(true);
    const fb = Object.entries(feedback).map(([n, v]) => ({
      slide_number: Number(n),
      positive: v.positive,
      negative: v.negative,
    }));
    await post("/api/luna/update-status", { id: item.id, feedback: fb });
    await post("/api/luna/draft-content", { content_id: item.id });
    setBusy(false);
    onValidated();
  }

  async function approve() {
    setBusy(true);
    await post("/api/luna/update-status", {
      id: item.id,
      status: "approved_content",
      approved_by: "Robin",
    });
    setBusy(false);
    onValidated();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4"
      style={{ background: "rgba(11,31,74,0.45)" }}
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-2xl font-bold" style={{ color: "#0B1F4A" }}>
          {item.title}
        </h3>
        {item.caption && (
          <p className="mt-2 font-body text-sm" style={{ color: "#4A5568" }}>
            {item.caption}
          </p>
        )}

        <div className="mt-6 space-y-4">
          {slides.map((s, idx) => {
            const n = idx + 1;
            return (
              <div key={n} className="rounded-xl p-4" style={{ background: "#ECEEF8" }}>
                <p
                  className="font-body text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#9AA5B4" }}
                >
                  Slide {n} · type {s.type}
                </p>
                <p
                  className="mt-1 font-display text-lg font-bold"
                  style={{ color: "#0B1F4A" }}
                >
                  {s.title}
                </p>
                <p className="font-body text-sm" style={{ color: "#4A5568" }}>
                  {s.body}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <input
                    placeholder="+ Ce qui va"
                    value={feedback[n]?.positive ?? ""}
                    onChange={(e) => setFb(n, "positive", e.target.value)}
                    className="rounded-lg border px-3 py-2 font-body text-xs outline-none"
                    style={{ borderColor: "#C9BFA8" }}
                  />
                  <input
                    placeholder="– À corriger"
                    value={feedback[n]?.negative ?? ""}
                    onChange={(e) => setFb(n, "negative", e.target.value)}
                    className="rounded-lg border px-3 py-2 font-body text-xs outline-none"
                    style={{ borderColor: "#C9BFA8" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 font-body text-sm"
            style={{ color: "#9AA5B4" }}
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={regenerate}
            disabled={busy}
            className="rounded-full px-4 py-2 font-body text-sm font-semibold disabled:opacity-60"
            style={{ background: "#ECEEF8", color: "#1A3BFF" }}
          >
            Régénérer avec feedback
          </button>
          <button
            type="button"
            onClick={approve}
            disabled={busy}
            className="rounded-full px-4 py-2 font-body text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: "#1A7F37" }}
          >
            Approuver ce carrousel
          </button>
        </div>
      </div>
    </div>
  );
}
