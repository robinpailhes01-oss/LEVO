"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export function DemoForm({ project, accent }: { project: string; accent: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, project }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) setState("done");
      else {
        setState("error");
        setError(data.error ?? "Une erreur est survenue");
      }
    } catch {
      setState("error");
      setError("Une erreur est survenue");
    }
  }

  if (state === "done") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl p-5"
        style={{ background: "rgba(26,127,55,0.08)" }}
      >
        <span
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-white"
          style={{ background: "#1A7F37" }}
        >
          <Check size={18} />
        </span>
        <p className="font-body text-sm" style={{ color: "#111111" }}>
          Démo envoyée ! Vérifiez votre boîte mail — le lien vient d&apos;arriver.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-5" style={{ background: "#f4f3ef" }}>
      <p className="font-display text-lg font-semibold" style={{ color: "#111111" }}>
        Recevoir la démo
      </p>
      <p className="mt-1 font-body text-sm" style={{ color: "rgba(17,17,17,0.55)" }}>
        Laissez votre email, on vous envoie le lien tout de suite.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@entreprise.fr"
          className="flex-1 rounded-full border px-4 py-3 font-body text-sm outline-none"
          style={{ borderColor: "rgba(17,17,17,0.18)", color: "#111111" }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="flex items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: accent }}
        >
          {state === "loading" && <Loader2 size={15} className="animate-spin" />}
          Recevoir la démo
        </button>
      </div>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Votre entreprise (optionnel)"
        className="mt-3 w-full rounded-full border px-4 py-3 font-body text-sm outline-none"
        style={{ borderColor: "rgba(17,17,17,0.12)", color: "#111111" }}
      />
      {state === "error" && (
        <p className="mt-3 font-body text-sm" style={{ color: "#CC0000" }}>
          {error}
        </p>
      )}
    </form>
  );
}
