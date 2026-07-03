"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/dashboard";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.replace(from);
      router.refresh();
    } else {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Erreur");
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-5"
      style={{ background: "#ECEEF8" }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8"
        style={{ boxShadow: "0 8px 32px rgba(11,31,74,0.10)" }}
      >
        <p
          className="font-display text-3xl font-bold"
          style={{ color: "#0B1F4A" }}
        >
          Luma
        </p>
        <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
          Dashboard agence — accès privé
        </p>

        <label
          className="mt-8 block font-body text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#9AA5B4" }}
        >
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-lg border px-4 py-3 font-body text-sm outline-none"
          style={{ borderColor: "#E2D9C8", color: "#0B1F4A" }}
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-3 font-body text-sm" style={{ color: "#CC0000" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg py-3 font-body text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: "#1A3BFF" }}
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
