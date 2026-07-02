"use client";

import { useState, useMemo } from "react";
import { Loader2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import {
  TACHE_OPTIONS,
  HEURES_OPTIONS,
  computeAudit,
  type AuditData,
} from "@/lib/audit/calc";

const BLUE = "#1A3BFF";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyData: AuditData = {
  prenom: "",
  nom: "",
  email: "",
  entreprise: "",
  secteur: "",
  taches: [],
  temps_par_tache: {},
  demandes_semaine: "",
  temps_reponse: "",
  devis_semaine: "",
  temps_devis: "",
  clients_perdus: "",
  panier_moyen: "",
  horizon: "",
};

const SELECTS = {
  demandes_semaine: ["< 10", "10 à 30", "30 à 50", "50+"],
  temps_reponse: ["< 1h", "1 à 4h", "4 à 24h", "> 24h"],
  devis_semaine: ["0 à 2", "3 à 5", "5 à 10", "10+"],
  temps_devis: ["< 15 min", "15 à 30 min", "30 à 60 min", "> 1h"],
  horizon: ["Dès que possible", "Sous 1 mois", "Sous 3 mois", "Je me renseigne"],
};

const CLIENTS_PERDUS: { value: string; label: string }[] = [
  { value: "0", label: "Aucun" },
  { value: "1-2", label: "1 à 2" },
  { value: "3-5", label: "3 à 5" },
  { value: "5+", label: "Plus de 5" },
];
const PANIER: { value: string; label: string }[] = [
  { value: "<500", label: "Moins de 500 €" },
  { value: "500-2000", label: "500 à 2 000 €" },
  { value: "2000-5000", label: "2 000 à 5 000 €" },
  { value: "5000+", label: "Plus de 5 000 €" },
];

const TOTAL_STEPS = 5;

export function AuditForm({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AuditData>(emptyData);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const result = useMemo(() => computeAudit(data), [data]);

  function set<K extends keyof AuditData>(key: K, value: AuditData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleTache(key: string) {
    setData((d) => {
      const has = d.taches.includes(key);
      const taches = has ? d.taches.filter((t) => t !== key) : [...d.taches, key];
      const temps_par_tache = { ...d.temps_par_tache };
      if (has) delete temps_par_tache[key];
      else temps_par_tache[key] = HEURES_OPTIONS[1];
      return { ...d, taches, temps_par_tache };
    });
  }

  const step1Valid = data.email.trim() !== "" && EMAIL_RE.test(data.email);

  async function submit() {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...result,
        }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (json.success) setStatus("done");
      else {
        setStatus("error");
        setError(json.error ?? "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setError("Une erreur est survenue");
    }
  }

  if (status === "done") {
    return (
      <div className="px-1 py-6 text-center">
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
          style={{ background: "#1A7F37" }}
        >
          <Check size={26} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-bold" style={{ color: "#1A1A1A" }}>
          C&apos;est envoyé, {data.prenom || "merci"} !
        </h3>
        <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.6)" }}>
          On analyse vos réponses et on vous envoie votre audit personnalisé
          par email sous 24h, avec une démo adaptée à votre activité.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 rounded-full px-6 py-3 font-body text-sm font-semibold text-white"
          style={{ background: "#1A1A1A" }}
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Barre de progression */}
      <div className="mb-6 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ background: i < step ? BLUE : "rgba(26,26,26,0.10)" }}
          />
        ))}
      </div>

      {/* Étape 1 — coordonnées */}
      {step === 1 && (
        <Step title="Faisons connaissance" subtitle="Pour vous envoyer votre audit personnalisé.">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Prénom" value={data.prenom} onChange={(v) => set("prenom", v)} />
            <Input label="Nom" value={data.nom} onChange={(v) => set("nom", v)} />
          </div>
          <Input label="Email professionnel *" type="email" value={data.email} onChange={(v) => set("email", v)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Entreprise" value={data.entreprise} onChange={(v) => set("entreprise", v)} />
            <Input label="Secteur" value={data.secteur} onChange={(v) => set("secteur", v)} />
          </div>
        </Step>
      )}

      {/* Étape 2 — tâches */}
      {step === 2 && (
        <Step title="Vos tâches chronophages" subtitle="Cochez ce qui vous prend du temps, puis estimez le temps hebdomadaire.">
          <div className="space-y-2">
            {TACHE_OPTIONS.map((t) => {
              const active = data.taches.includes(t.key);
              return (
                <div
                  key={t.key}
                  className="rounded-xl border p-3 transition-colors"
                  style={{
                    borderColor: active ? BLUE : "rgba(26,26,26,0.12)",
                    background: active ? "rgba(26,59,255,0.04)" : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleTache(t.key)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
                        style={{
                          borderColor: active ? BLUE : "rgba(26,26,26,0.25)",
                          background: active ? BLUE : "transparent",
                        }}
                      >
                        {active && <Check size={12} strokeWidth={3} className="text-white" />}
                      </span>
                      <span className="font-body text-sm" style={{ color: "#1A1A1A" }}>{t.label}</span>
                    </button>
                    {active && (
                      <select
                        value={data.temps_par_tache[t.key] ?? HEURES_OPTIONS[1]}
                        onChange={(e) =>
                          set("temps_par_tache", {
                            ...data.temps_par_tache,
                            [t.key]: Number(e.target.value),
                          })
                        }
                        className="rounded-lg border px-2 py-1.5 font-body text-xs outline-none"
                        style={{ borderColor: "rgba(26,26,26,0.15)", color: "#1A1A1A" }}
                      >
                        {HEURES_OPTIONS.map((h) => (
                          <option key={h} value={h}>{h}h / sem.</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Step>
      )}

      {/* Étape 3 — volume */}
      {step === 3 && (
        <Step title="Votre volume d'activité" subtitle="Une estimation suffit.">
          <Segmented label="Demandes clients par semaine" options={SELECTS.demandes_semaine} value={data.demandes_semaine} onChange={(v) => set("demandes_semaine", v)} />
          <Segmented label="Temps de réponse moyen" options={SELECTS.temps_reponse} value={data.temps_reponse} onChange={(v) => set("temps_reponse", v)} />
          <Segmented label="Devis par semaine" options={SELECTS.devis_semaine} value={data.devis_semaine} onChange={(v) => set("devis_semaine", v)} />
          <Segmented label="Temps pour faire un devis" options={SELECTS.temps_devis} value={data.temps_devis} onChange={(v) => set("temps_devis", v)} />
        </Step>
      )}

      {/* Étape 4 — impact */}
      {step === 4 && (
        <Step title="L'impact business" subtitle="Pour estimer ce que ça vous coûte vraiment.">
          <Segmented label="Clients perdus / mois (faute de suivi)" options={CLIENTS_PERDUS.map((c) => c.label)} value={CLIENTS_PERDUS.find((c) => c.value === data.clients_perdus)?.label ?? ""} onChange={(label) => set("clients_perdus", CLIENTS_PERDUS.find((c) => c.label === label)?.value ?? "")} />
          <Segmented label="Panier moyen d'un client" options={PANIER.map((p) => p.label)} value={PANIER.find((p) => p.value === data.panier_moyen)?.label ?? ""} onChange={(label) => set("panier_moyen", PANIER.find((p) => p.label === label)?.value ?? "")} />
          <Segmented label="Vous voulez automatiser…" options={SELECTS.horizon} value={data.horizon} onChange={(v) => set("horizon", v)} />
        </Step>
      )}

      {/* Étape 5 — résultat + envoi */}
      {step === 5 && (
        <Step title="Votre estimation" subtitle="Basée sur vos réponses — affinée lors de l'audit.">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard value={`${result.heures_perdues_semaine} h`} label="perdues chaque semaine" />
            <ResultCard value={`${result.perte_mensuelle_estimee.toLocaleString("fr-FR")} €`} label="de perte estimée / mois" accent />
          </div>
          <p className="mt-4 font-body text-xs leading-relaxed" style={{ color: "rgba(26,26,26,0.5)" }}>
            Ces chiffres sont une première estimation. On les affine ensemble lors de
            votre audit gratuit, puis on vous montre une démo adaptée à votre activité.
          </p>
          {error && (
            <p className="mt-3 font-body text-sm" style={{ color: "#CC0000" }}>{error}</p>
          )}
        </Step>
      )}

      {/* Navigation */}
      <div className="mt-7 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 font-body text-sm font-medium"
            style={{ color: "rgba(26,26,26,0.55)" }}
          >
            <ArrowLeft size={16} /> Retour
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={step === 1 && !step1Valid}
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ background: BLUE }}
          >
            Continuer <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            disabled={status === "loading"}
            onClick={submit}
            className="flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: BLUE }}
          >
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            Recevoir ma démo personnalisée <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Sous-composants ────────────────────────────────────────────────

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-2xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>{title}</h3>
      <p className="mt-1.5 font-body text-sm" style={{ color: "rgba(26,26,26,0.55)" }}>{subtitle}</p>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold" style={{ color: "rgba(26,26,26,0.55)" }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 font-body text-sm outline-none focus:border-[#1A3BFF]"
        style={{ borderColor: "rgba(26,26,26,0.15)", color: "#1A1A1A" }}
      />
    </label>
  );
}

function Segmented({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <span className="mb-2 block font-body text-xs font-semibold" style={{ color: "rgba(26,26,26,0.55)" }}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="rounded-full border px-4 py-2 font-body text-[13px] transition-colors"
              style={{
                borderColor: active ? BLUE : "rgba(26,26,26,0.15)",
                background: active ? BLUE : "transparent",
                color: active ? "#ffffff" : "rgba(26,26,26,0.7)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: accent ? BLUE : "#F0EDE6", color: accent ? "#ffffff" : "#1A1A1A" }}
    >
      <p className="font-serif text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 font-body text-xs" style={{ opacity: 0.75 }}>{label}</p>
    </div>
  );
}
