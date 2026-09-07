"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "@/components/ui/WordReveal";

/* ──────────────────────────────────────────────────────────────────
   Acte 4 — La méthode.
   Un trait qui se dessine avec le scroll et allume les étapes une à
   une. La ligne n'est pas décorative : sa progression, c'est le temps
   qui passe entre le premier échange et la mise en ligne.
   ────────────────────────────────────────────────────────────────── */

const STEPS = [
  { num: "01", title: "On comprend", meta: "30 min", description: "Votre métier, vos irritants, ce qui doit changer. Rien n'est vendu à ce stade." },
  { num: "02", title: "On construit", meta: "Semaine 1", description: "Votre solution sur-mesure prend forme, et vous voyez chaque avancée." },
  { num: "03", title: "On ajuste", meta: "Avec vous", description: "Textes, flux, règles métier : on affine jusqu'à ce que ce soit vous." },
  { num: "04", title: "On accompagne", meta: "Sans fin", description: "On déploie, on forme vos équipes. On ne disparaît pas après la livraison." },
];

export function MethodSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });

  return (
    <section ref={ref} id="process" className="relative overflow-hidden py-28 sm:py-36" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">Notre méthode</p>
            <WordReveal
              text="Du premier échange à la mise en ligne, en une semaine."
              as="h2"
              className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl"
              style={{ color: "#111111" }}
              delay={0.05}
            />
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed lg:text-right" style={{ color: "rgba(17,17,17,0.55)" }}>
            Quatre étapes, toutes avec vous dans la pièce. Le trait ci-dessous avance à votre rythme de lecture.
          </p>
        </div>

        {/* Desktop : trait horizontal au-dessus des colonnes */}
        <div className="relative hidden lg:block">
          <Rail progress={progress} reduceMotion={reduceMotion} orientation="horizontal" />
          <ol className="grid list-none grid-cols-4 gap-8 pt-12">
            {STEPS.map((s, i) => (
              <StepItem key={s.num} step={s} index={i} progress={progress} reduceMotion={reduceMotion} />
            ))}
          </ol>
        </div>

        {/* Mobile / tablette : trait vertical à gauche */}
        <div className="relative lg:hidden">
          <Rail progress={progress} reduceMotion={reduceMotion} orientation="vertical" />
          <ol className="list-none space-y-10 pl-12">
            {STEPS.map((s, i) => (
              <StepItem key={s.num} step={s} index={i} progress={progress} reduceMotion={reduceMotion} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Rail({
  progress,
  reduceMotion,
  orientation,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
  orientation: "horizontal" | "vertical";
}) {
  const horizontal = orientation === "horizontal";
  return (
    <div
      aria-hidden
      className={horizontal ? "absolute left-0 right-0 top-0 h-px" : "absolute bottom-0 left-4 top-0 w-px"}
      style={{ background: "rgba(17,17,17,0.12)" }}
    >
      <motion.div
        className={horizontal ? "absolute inset-y-0 left-0 w-full origin-left" : "absolute inset-x-0 top-0 h-full origin-top"}
        style={{
          background: "#111111",
          ...(horizontal ? { scaleX: reduceMotion ? 1 : progress } : { scaleY: reduceMotion ? 1 : progress }),
        }}
      />
    </div>
  );
}

function StepItem({
  step,
  index,
  progress,
  reduceMotion,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  /* Le nœud s'allume quand le trait l'atteint : au quart, à la moitié… */
  const at = (index + 0.5) / STEPS.length;
  const lit = useTransform(progress, [at - 0.08, at], [0, 1]);
  const nodeBg = useTransform(lit, [0, 1], ["rgba(236,234,228,1)", "rgba(17,17,17,1)"]);
  const nodeColor = useTransform(lit, [0, 1], ["rgba(17,17,17,0.55)", "rgba(255,255,255,1)"]);
  const textOpacity = useTransform(lit, [0, 1], [0.45, 1]);

  return (
    <li className="relative">
      {/* Nœud posé sur le trait */}
      <motion.span
        className="absolute flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] tracking-[0.08em] lg:-top-[4.5rem] lg:left-0"
        style={{
          left: "-3rem",
          top: 0,
          border: "1px solid rgba(17,17,17,0.25)",
          background: reduceMotion ? "#111111" : nodeBg,
          color: reduceMotion ? "#ffffff" : nodeColor,
          translateY: "-50%",
        }}
      >
        {step.num}
      </motion.span>

      {/* Numéro fantôme, signature éditoriale */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[7rem] font-bold leading-none lg:-top-4"
        style={{ color: "rgba(17,17,17,0.05)" }}
      >
        {step.num}
      </span>

      <motion.div style={{ opacity: reduceMotion ? 1 : textOpacity }} className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "#1A3BFF" }}>
          {step.meta}
        </p>
        <h3 className="mt-3 font-body text-2xl font-bold tracking-[-0.02em]" style={{ color: "#111111" }}>
          {step.title}
        </h3>
        <p className="mt-3 max-w-xs font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.6)" }}>
          {step.description}
        </p>
      </motion.div>
    </li>
  );
}
