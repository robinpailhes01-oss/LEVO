"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "@/components/ui/WordReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ──────────────────────────────────────────────────────────────────
   Acte 8 — L'appel final.
   Un halo qui suit la main, un titre qui prend toute la place, un
   bouton qui vient vers le curseur. Rien d'autre : c'est la fin.
   ────────────────────────────────────────────────────────────────── */

const EMAIL = "contact@luma-agence.fr";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const xs = useSpring(x, { stiffness: 50, damping: 20 });
  const ys = useSpring(y, { stiffness: 50, damping: 20 });
  const halo = useMotionTemplate`radial-gradient(720px circle at ${xs}% ${ys}%, rgba(26,59,255,0.28), transparent 65%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section ref={ref} id="contact" onMouseMove={onMove} className="relative overflow-hidden py-32 sm:py-44" style={{ background: "#111111" }}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: halo }} />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" style={{ opacity: 0.08, mixBlendMode: "screen" }} />

      <div className="relative mx-auto max-w-container px-5 text-center lg:px-12">
        <ScrollReveal>
          <p className="section-label mx-auto mb-8 justify-center" style={{ color: "rgba(255,255,255,0.40)" }}>
            Parlons de votre projet
          </p>
          <WordReveal
            text="Lançons votre projet, ensemble."
            as="h2"
            className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[6.5rem]"
            style={{ color: "#ffffff" }}
            delay={0.05}
          />
          <p className="mx-auto mt-8 max-w-lg font-body text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
            Dites-nous l&apos;essentiel. On prend le temps de comprendre votre besoin avant de proposer quoi que ce soit.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${EMAIL}?subject=Projet%20avec%20Luma`}
              strength={0.3}
              className="inline-flex items-center rounded-full px-9 py-4 font-body text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "#ffffff" }}
            >
              <span style={{ color: "#111111" }}>Écrire à Luma →</span>
            </MagneticButton>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-full px-7 py-4 font-mono text-[12px] tracking-[0.04em] transition-colors duration-200 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.65)" }}
            >
              {EMAIL}
            </a>
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Réponse sous 24 h · Montpellier
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
