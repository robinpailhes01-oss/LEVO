"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Bot, User, CheckCircle2, Zap } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060f24" }}
    >
      {/* ── Background layers ── */}
      <DarkBackground />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-32 lg:px-12 flex flex-col items-center text-center">

        {/* Eyebrow pill */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-body text-xs font-medium"
            style={{
              borderColor: "rgba(77,143,255,0.3)",
              background: "rgba(0,95,255,0.08)",
              color: "#4d8fff",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#4d8fff", boxShadow: "0 0 6px #4d8fff" }}
            />
            Agence IA · Montpellier
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display font-bold leading-[1.0] tracking-[-0.03em] text-6xl sm:text-7xl lg:text-8xl"
          style={{ color: "#f8f4ed" }}
        >
          Des solutions IA
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #4d8fff 0%, #00c2ff 60%, #4d8fff 100%)",
            }}
          >
            qui vous ressemblent
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.22)}
          className="mx-auto mt-8 max-w-lg font-body text-lg leading-relaxed"
          style={{ color: "rgba(248,244,237,0.55)" }}
        >
          On automatise vos tâches répétitives avec des agents et workflows sur-mesure.
          Construits avec soin, accompagnés humainement, pour les PME du Sud de la France.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.34)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-[14px] px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "#005fff",
              boxShadow: "0 0 0 0 rgba(0,95,255,0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 30px rgba(0,95,255,0.45), 0 0 0 1px rgba(0,95,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 0 rgba(0,95,255,0.5)";
            }}
          >
            Discutons de votre projet
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#cas"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-colors duration-200"
            style={{ color: "rgba(248,244,237,0.45)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(248,244,237,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(248,244,237,0.45)";
            }}
          >
            Voir nos réalisations
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* ── Floating chat mockup ── */}
        <motion.div
          {...fadeIn(0.5)}
          className="relative mt-16 w-full max-w-2xl"
          style={{ perspective: "1200px" }}
        >
          {/* Glow under the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 h-32 w-3/4 rounded-full blur-3xl"
            style={{ background: "rgba(0,95,255,0.18)" }}
          />

          {/* Browser window */}
          <motion.div
            initial={{ opacity: 0, y: 48, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 2 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#0d1b35",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 40px 120px rgba(0,95,255,0.2), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "#0a1628",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              {/* URL bar */}
              <div
                className="flex flex-1 items-center gap-2 rounded-md px-3 py-1"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#28c840" }} />
                <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  app.levo.ai / agent / léa
                </span>
              </div>
            </div>

            {/* Chat interface */}
            <div className="px-5 py-5 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(135deg, #005fff, #00c2ff)" }}
                >
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold" style={{ color: "#f8f4ed" }}>
                    Léa — Agent IA
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "#28c840", boxShadow: "0 0 4px #28c840" }}
                    />
                    <span className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      En ligne · répond en &lt; 5s
                    </span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <Sparkles size={13} style={{ color: "#4d8fff" }} />
                  <span className="font-body text-[10px] font-medium" style={{ color: "#4d8fff" }}>
                    IA active
                  </span>
                </div>
              </div>

              {/* Message — agent */}
              <div className="flex gap-2.5">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,95,255,0.15)", border: "1px solid rgba(0,95,255,0.2)" }}
                >
                  <Bot size={13} style={{ color: "#4d8fff" }} />
                </div>
                <div
                  className="max-w-xs rounded-xl rounded-tl-none px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(248,244,237,0.75)" }}>
                    Bonjour ! Je suis Léa, votre assistante Harmonie Yacht. 🛥️
                    <br /><br />
                    Pour préparer votre devis, pouvez-vous me donner vos dates de navigation ?
                  </p>
                </div>
              </div>

              {/* Message — user */}
              <div className="flex gap-2.5 justify-end">
                <div
                  className="max-w-xs rounded-xl rounded-tr-none px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,95,255,0.3), rgba(0,194,255,0.2))",
                    border: "1px solid rgba(77,143,255,0.25)",
                  }}
                >
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(248,244,237,0.85)" }}>
                    Du 15 au 22 juillet, pour 6 personnes. Budget ~8 000€.
                  </p>
                </div>
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <User size={13} style={{ color: "rgba(248,244,237,0.5)" }} />
                </div>
              </div>

              {/* Message — agent reply */}
              <div className="flex gap-2.5">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,95,255,0.15)", border: "1px solid rgba(0,95,255,0.2)" }}
                >
                  <Bot size={13} style={{ color: "#4d8fff" }} />
                </div>
                <div
                  className="max-w-xs rounded-xl rounded-tl-none px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(248,244,237,0.75)" }}>
                    Parfait ! J&apos;ai trouvé 3 options disponibles dans votre budget.
                    Je vous envoie le devis détaillé par e-mail dans quelques secondes. ✅
                  </p>
                </div>
              </div>

              {/* Action pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Voir les yachts disponibles", "Modifier les dates"].map((label) => (
                  <button
                    key={label}
                    className="rounded-full px-3 py-1.5 font-body text-[10px] font-medium transition-colors"
                    style={{
                      background: "rgba(0,95,255,0.12)",
                      border: "1px solid rgba(77,143,255,0.25)",
                      color: "#4d8fff",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating badge — top left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
            className="absolute -left-6 top-12 hidden sm:flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{
              background: "#0d1b35",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "rgba(40,200,64,0.15)" }}
            >
              <Zap size={13} style={{ color: "#28c840" }} />
            </div>
            <div>
              <p className="font-body text-[10px] font-semibold" style={{ color: "#f8f4ed" }}>
                40h économisées
              </p>
              <p className="font-body text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                ce mois-ci
              </p>
            </div>
          </motion.div>

          {/* Floating badge — bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
            className="absolute -right-6 bottom-12 hidden sm:flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{
              background: "#0d1b35",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "rgba(0,95,255,0.15)" }}
            >
              <CheckCircle2 size={13} style={{ color: "#4d8fff" }} />
            </div>
            <div>
              <p className="font-body text-[10px] font-semibold" style={{ color: "#f8f4ed" }}>
                0 demande oubliée
              </p>
              <p className="font-body text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                automatisé 24/7
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #faf7f0)",
        }}
      />
    </section>
  );
}

/* ── Dark background with blobs + grid ── */
function DarkBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep navy base */}
      <div className="absolute inset-0" style={{ background: "#060f24" }} />

      {/* Electric blue blob */}
      <div
        className="blob blob-1 absolute -left-32 top-0 h-[800px] w-[800px]"
        style={{
          background: "radial-gradient(circle, #005fff, transparent 60%)",
          opacity: 0.28,
        }}
      />

      {/* Teal/electric secondary blob */}
      <div
        className="blob blob-2 absolute -right-48 top-1/3 h-[600px] w-[600px]"
        style={{
          background: "radial-gradient(circle, #00c2ff, transparent 60%)",
          opacity: 0.15,
        }}
      />

      {/* Bottom warm blob to ease the fade */}
      <div
        className="blob blob-3 absolute -bottom-24 left-1/2 -translate-x-1/2 h-[400px] w-[800px]"
        style={{
          background: "radial-gradient(ellipse, #005fff, transparent 65%)",
          opacity: 0.08,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
