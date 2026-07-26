"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";

const INK = "#111111";
const BLUE = "#1A3BFF";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  full_name: string;
  company: string;
  email: string;
  phone: string;
}

export function QuickDemoForm({ project, onDone }: { project: string; onDone?: () => void }) {
  const [data, setData] = useState<FormData>({ full_name: "", company: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof FormData>(key: K, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const valid = data.full_name.trim() !== "" && data.company.trim() !== "" && EMAIL_RE.test(data.email);

  async function submit() {
    if (!valid) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, project }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (json.ok) setStatus("done");
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
        <h3 className="mt-5 font-body text-2xl font-bold tracking-[-0.02em]" style={{ color: INK }}>
          C&apos;est envoyé, {data.full_name.split(" ")[0] || "merci"} !
        </h3>
        <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed" style={{ color: "rgba(17,17,17,0.6)" }}>
          On vous recontacte sous 24h pour organiser votre démo personnalisée.
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-6 rounded-full px-6 py-3 font-body text-sm font-semibold text-white"
            style={{ background: INK }}
          >
            Fermer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nom complet *" value={data.full_name} onChange={(v) => set("full_name", v)} />
        <Field label="Établissement *" value={data.company} onChange={(v) => set("company", v)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email *" type="email" value={data.email} onChange={(v) => set("email", v)} />
        <Field label="Téléphone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} />
      </div>
      <p className="font-body text-xs" style={{ color: "rgba(17,17,17,0.4)" }}>* Champs obligatoires</p>

      {error && <p className="font-body text-sm" style={{ color: "#CC0000" }}>{error}</p>}

      <button
        type="button"
        disabled={!valid || status === "loading"}
        onClick={submit}
        className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-40 disabled:hover:translate-y-0"
        style={{ background: BLUE }}
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Demander ma démo <ArrowRight size={16} />
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold" style={{ color: "rgba(17,17,17,0.55)" }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-white px-4 py-3 font-body text-sm outline-none transition-colors focus:border-[#1A3BFF]"
        style={{ borderColor: "rgba(17,17,17,0.14)", color: INK }}
      />
    </label>
  );
}
