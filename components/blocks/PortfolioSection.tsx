"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DemoForm } from "@/components/blocks/DemoForm";
import { PROJECTS, type Project } from "@/lib/projects";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PortfolioSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="cas" className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label">Réalisations</p>
          <h2
            className="mt-6 max-w-2xl font-body text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl"
            style={{ color: "#111111" }}
          >
            Des écosystèmes, pas des gadgets
          </h2>
          <p
            className="mt-6 max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "rgba(17,17,17,0.55)" }}
          >
            Chaque projet est un écosystème complet, conçu pour un métier précis.
            Cliquez pour découvrir le détail.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 70}>
              <TiltCard intensity={4} className="h-full" style={{ borderRadius: 24 }}>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="group relative flex h-full w-full flex-col items-start overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,17,17,0.12)]"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(17,17,17,0.08)",
                    borderRadius: 24,
                    boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                  }}
                >
                  {/* Liseré accent en haut */}
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100"
                    style={{ background: p.accent }}
                  />

                  <div className="flex w-full flex-col p-7 sm:p-8">
                    {/* Top : secteur + badge */}
                    <div className="flex w-full items-center justify-between">
                      <span
                        className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: "rgba(17,17,17,0.45)" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                        {p.sector}
                      </span>
                      {p.example ? (
                        <span
                          className="rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider"
                          style={{ background: "rgba(17,17,17,0.05)", color: "rgba(17,17,17,0.45)" }}
                        >
                          Exemple
                        </span>
                      ) : (
                        <span
                          className="rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider"
                          style={{ background: "rgba(26,127,55,0.10)", color: "#1A7F37" }}
                        >
                          Cas réel
                        </span>
                      )}
                    </div>

                    {/* Titre + tagline */}
                    <h3
                      className="mt-6 font-body text-[1.7rem] font-bold leading-tight tracking-[-0.02em]"
                      style={{ color: "#111111" }}
                    >
                      {p.client}
                    </h3>
                    <p
                      className="mt-2.5 font-body text-[15px] leading-relaxed"
                      style={{ color: "rgba(17,17,17,0.55)" }}
                    >
                      {p.tagline}
                    </p>

                    {/* KPIs — sans tabulaire */}
                    <div
                      className="mt-7 grid grid-cols-3 gap-2 rounded-2xl py-4"
                      style={{ background: "#f7f6f2" }}
                    >
                      {p.kpis.slice(0, 3).map((k, idx) => (
                        <div
                          key={k.label}
                          className="px-4"
                          style={{
                            borderLeft:
                              idx > 0 ? "1px solid rgba(17,17,17,0.08)" : undefined,
                          }}
                        >
                          <p
                            className="font-body text-xl font-extrabold tabular-nums tracking-[-0.02em]"
                            style={{ color: p.accent }}
                          >
                            {k.value}
                          </p>
                          <p
                            className="mt-0.5 font-body text-[11px] leading-tight"
                            style={{ color: "rgba(17,17,17,0.45)" }}
                          >
                            {k.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <span
                      className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "#111111" }}
                    >
                      Voir le projet
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </span>
                  </div>
                </button>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
        {/* Header accent */}
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
          <h3 className="mt-3 font-body text-4xl font-bold tracking-[-0.02em] text-white">
            {project.client}
          </h3>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {project.kpis.map((k, idx) => (
              <div
                key={k.label}
                style={{ borderLeft: idx > 0 ? "1px solid rgba(255,255,255,0.2)" : undefined }}
                className={idx > 0 ? "pl-4" : ""}
              >
                <p className="font-body text-2xl font-extrabold tabular-nums tracking-[-0.02em] text-white">
                  {k.value}
                </p>
                <p className="mt-0.5 font-body text-[11px] leading-tight text-white/75">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corps */}
        <div className="p-8 sm:p-10">
          <p className="font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.75)" }}>
            {project.summary}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
            {project.context}
          </p>

          <h4
            className="mt-8 font-body text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "rgba(17,17,17,0.40)" }}
          >
            L&apos;écosystème mis en place
          </h4>
          <ul className="mt-4 space-y-3">
            {project.ecosystem.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ background: project.accent }}
                >
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
              <span
                key={t}
                className="rounded-full px-3 py-1 font-body text-xs font-medium"
                style={{ border: "1px solid rgba(17,17,17,0.12)", color: "rgba(17,17,17,0.55)" }}
              >
                {t}
              </span>
            ))}
          </div>

          {project.quote && (
            <blockquote className="mt-8 pl-5" style={{ borderLeft: `2px solid ${project.accent}` }}>
              <p className="font-body text-lg font-medium italic leading-snug" style={{ color: "#111111" }}>
                «&nbsp;{project.quote.text}&nbsp;»
              </p>
              <footer className="mt-2 font-body text-sm" style={{ color: "rgba(17,17,17,0.45)" }}>
                — {project.quote.author}
              </footer>
            </blockquote>
          )}

          <div className="mt-8">
            <DemoForm project={project.client} accent={project.accent} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
