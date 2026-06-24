"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } },
});

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ── Animated gradient mesh ── */}
      <MeshBackground />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-container px-5 pb-20 pt-36 lg:px-12">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3">
            <span className="h-px w-8 bg-electric" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-electric">
              Agence IA · Montpellier
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="mt-8 font-display text-6xl font-bold leading-[1.0] tracking-[-0.03em] text-navy sm:text-7xl lg:text-[5.5rem]"
          >
            Des solutions IA
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">qui vous ressemblent</span>
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                viewBox="0 0 400 10"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 7C80 2 160 2 200 5C240 8 320 2 398 5"
                  stroke="#005FFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.22)}
            className="mt-8 max-w-xl font-body text-xl leading-relaxed text-text-secondary"
          >
            On automatise vos tâches répétitives avec des agents et workflows sur-mesure.
            Construits avec soin, accompagnés humainement, pour les PME du Sud de la France.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.34)} className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[14px] bg-navy px-8 py-4 font-body text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-px hover:shadow-[0_12px_40px_rgba(11,31,74,0.28)]"
            >
              <span className="relative z-10">Discutons de votre projet</span>
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-navy-mid transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
            </Link>
            <Link
              href="#cas"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-navy/60 transition-colors hover:text-navy"
            >
              Voir nos réalisations
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Floating metrics ── */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "100%", label: "Sur-mesure" },
            { value: "40h+", label: "Économisées/mois" },
            { value: "< 30s", label: "Réponse agent" },
            { value: "Humain", label: "Accompagnement" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              {...fadeUp(0.44 + i * 0.07)}
              className="rounded-[16px] border border-border/60 bg-white/50 px-5 py-5 backdrop-blur-sm"
            >
              <p className="font-display text-3xl font-bold text-navy">{m.value}</p>
              <p className="mt-1 font-body text-xs text-text-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, var(--cream))" }}
      />
    </section>
  );
}

/* ── Animated gradient mesh background ── */
function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary cream base */}
      <div className="absolute inset-0 bg-cream" />

      {/* Animated blobs */}
      <div
        className="blob blob-1 absolute -left-48 -top-48 h-[700px] w-[700px] opacity-[0.55]"
        style={{ background: "radial-gradient(circle at center, #c8d9ff 0%, transparent 70%)" }}
      />
      <div
        className="blob blob-2 absolute -right-32 top-1/4 h-[600px] w-[600px] opacity-[0.40]"
        style={{ background: "radial-gradient(circle at center, #005FFF 0%, transparent 65%)" }}
      />
      <div
        className="blob blob-3 absolute bottom-0 left-1/3 h-[500px] w-[500px] opacity-[0.30]"
        style={{ background: "radial-gradient(circle at center, #0b1f4a 0%, transparent 65%)" }}
      />

      {/* Mesh grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,31,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(11,31,74,0.3) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 30% 40%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 30% 40%, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
