"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/projects";

/* ──────────────────────────────────────────────────────────────────
   Acte 5a — Réalisations en cartes empilées.
   Chaque projet est une carte sombre qui reste collée en haut de
   l'écran pendant que la suivante vient se poser dessus ; la carte
   recouverte recule et s'assombrit légèrement. On feuillette un
   dossier, on ne parcourt pas une grille.
   ────────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TOP_OFFSET = 112; // sous la nav
const STEP = 22; // décalage vertical entre cartes empilées

export function PortfolioSection() {
  const [active, setActive] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="cas" className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">Réalisations</p>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl" style={{ color: "#111111" }}>
              Des écosystèmes, <em className="font-serif font-medium" style={{ color: "#1A3BFF" }}>pas des gadgets.</em>
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
            Chaque projet est un écosystème complet, conçu pour un métier précis. Ouvrez une carte pour le détail.
          </p>
        </div>

        <div ref={stackRef} className={reduceMotion ? "grid gap-6" : "relative"}>
          {PROJECTS.map((p, i) => (
            <StackedCard
              key={p.id}
              project={p}
              index={i}
              total={PROJECTS.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>{active && <ProjectModal project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

function StackedCard({
  project: p,
  index,
  total,
  progress,
  reduceMotion,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  onOpen: () => void;
}) {
  /* Quand la carte suivante arrive, celle-ci recule : échelle et voile. */
  const start = index / total;
  const end = 1;
  const remaining = total - 1 - index;
  const scale = useTransform(progress, [start, end], [1, 1 - remaining * 0.045]);
  const veil = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, remaining > 0 ? 0.45 : 0]);

  const card = (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col items-start overflow-hidden text-left"
      style={{ background: "#111111", borderRadius: 28, boxShadow: "0 30px 80px rgba(17,17,17,0.22)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: p.accent }}
      />
      <div className="relative grid w-full gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-12">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.10em]"
              style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
              {p.sector}
            </span>
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em]"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              {p.example ? "Exemple" : "Cas réel"}
            </span>
          </div>
          <h3 className="mt-7 font-body text-[2.1rem] font-black leading-[1.02] tracking-[-0.03em] sm:text-[2.6rem]" style={{ color: "#ffffff" }}>
            {p.client}
          </h3>
          <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            {p.tagline}
          </p>

          {/* Le flux de l'écosystème */}
          <div className="mt-8 flex items-center">
            {p.flow.map((step, idx) => (
              <div key={step} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 0 3px ${p.accent}33` }} />
                  <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {step}
                  </span>
                </div>
                {idx < p.flow.length - 1 && (
                  <span className="mx-1 -mt-4 h-px flex-1" style={{ background: `linear-gradient(90deg, ${p.accent}66, ${p.accent}22)` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.08)" }}>
            {p.kpis.slice(0, 3).map((k) => (
              <div key={k.label} className="px-4 py-4" style={{ background: "#111111" }}>
                <p className="font-serif text-[1.9rem] font-medium italic leading-none tabular-nums" style={{ color: "#ffffff" }}>
                  {k.value}
                </p>
                <p className="mt-2 font-body text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {k.label}
                </p>
              </div>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#ffffff" }}>
            Voir le projet
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </span>
        </div>
      </div>

      {/* Voile quand la carte est recouverte */}
      {!reduceMotion && (
        <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "#000000", opacity: veil, borderRadius: 28 }} />
      )}
    </button>
  );

  if (reduceMotion) return card;

  return (
    <div className="sticky" style={{ top: TOP_OFFSET + index * STEP, marginBottom: index < total - 1 ? "12vh" : 0 }}>
      <motion.div style={{ scale, transformOrigin: "top center" }}>{card}</motion.div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(17,17,17,0.45)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="my-4 w-full max-w-2xl overflow-hidden rounded-[28px]"
        style={{ background: "#ffffff", boxShadow: "0 40px 100px rgba(17,17,17,0.28)" }}
      >
        <div className="relative p-8 sm:p-10" style={{ background: project.accent }}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/30"
            style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
          >
            <X size={18} />
          </button>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
            {project.sector}
            {project.example ? " · Exemple" : " · Cas réel"}
          </p>
          <h3 className="mt-3 font-body text-4xl font-bold tracking-[-0.02em] text-white">{project.client}</h3>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {project.kpis.map((k, idx) => (
              <div key={k.label} style={{ borderLeft: idx > 0 ? "1px solid rgba(255,255,255,0.2)" : undefined }} className={idx > 0 ? "pl-4" : ""}>
                <p className="font-body text-2xl font-extrabold tabular-nums tracking-[-0.02em] text-white">{k.value}</p>
                <p className="mt-0.5 font-body text-[11px] leading-tight text-white/75">{k.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <p className="font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.75)" }}>
            {project.summary}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
            {project.context}
          </p>
          <h4 className="mt-8 font-body text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(17,17,17,0.40)" }}>
            L&apos;écosystème mis en place
          </h4>
          <ul className="mt-4 space-y-3">
            {project.ecosystem.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full" style={{ background: project.accent }}>
                  <Check size={11} strokeWidth={3} className="text-white" />
                </span>
                <span className="font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-full px-3 py-1 font-body text-xs font-medium" style={{ border: "1px solid rgba(17,17,17,0.12)", color: "rgba(17,17,17,0.55)" }}>
                {t}
              </span>
            ))}
          </div>
          {project.quote && (
            <blockquote className="mt-8 pl-5" style={{ borderLeft: `2px solid ${project.accent}` }}>
              <p className="font-serif text-xl font-medium italic leading-snug" style={{ color: "#111111" }}>
                «&nbsp;{project.quote.text}&nbsp;»
              </p>
              <footer className="mt-2 font-body text-sm" style={{ color: "rgba(17,17,17,0.45)" }}>
                — {project.quote.author}
              </footer>
            </blockquote>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
