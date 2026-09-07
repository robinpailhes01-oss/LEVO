"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* La scène WebGL n'est chargée que côté client, et seulement sur cette
   route : son poids n'atteint jamais la page d'accueil. */
const EcosystemScene = dynamic(() => import("./EcosystemScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.4)" }}>
        Chargement de la scène…
      </span>
    </div>
  ),
});

const STEPS = [
  {
    at: 0.0,
    kicker: "01 · Le point de départ",
    title: "Votre métier au centre.",
    text: "Pas une plateforme dans laquelle vous entrez. Un cœur autour duquel on assemble ce dont vous avez besoin.",
  },
  {
    at: 0.36,
    kicker: "02 · Les pièces arrivent",
    title: "Chaque pièce se met en orbite.",
    text: "Agent WhatsApp, devis, relances, CRM, contenu, rapports : elles arrivent une à une, à leur place.",
  },
  {
    at: 0.72,
    kicker: "03 · Les liaisons",
    title: "Tout se parle, sans vous.",
    text: "Une demande devient un devis, un devis une relance, une relance un rendez-vous. Vous regardez le tableau de bord.",
  },
];

/** WebGL absent (vieux navigateur, GPU bloqué, mode économie) → affiche
    l'écosystème en version plate plutôt qu'une scène qui plante. */
function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function StaticEcosystem() {
  const labels = ["WhatsApp", "Devis", "Relances", "CRM", "Contenu", "Rapports"];
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <div className="relative h-[52vmin] w-[52vmin]">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(26,59,255,0.35)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "#0d1117", boxShadow: "0 30px 60px rgba(17,17,17,0.25)" }}
        />
        {labels.map((l, i) => {
          const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * 50;
          const y = 50 + Math.sin(a) * 50;
          return (
            <span
              key={l}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ left: `${x}%`, top: `${y}%`, background: "#ffffff", border: "1px solid rgba(17,17,17,0.10)", color: "#111111" }}
            >
              {l}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function LabEcosystem() {
  const reduceMotion = useReducedMotion() ?? false;
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });

  /* En mouvement réduit, la scène est montrée assemblée d'emblée. */
  const fixed = useMotionValue(1);
  const progress = reduceMotion ? fixed : eased;

  /* Tout est piloté par la valeur lissée (chemin JS de Framer), pas par
     scrollYProgress directement : ça évite le chemin ScrollTimeline natif,
     qui impose des bornes dans [0, 1] et se comporte différemment selon
     les navigateurs. */
  const barScale = useTransform(eased, [0, 1], [0, 1]);

  useEffect(() => {
    if (reduceMotion) fixed.set(1);
  }, [reduceMotion, fixed]);

  return (
    <div ref={ref} className="relative" style={{ height: reduceMotion ? "auto" : "320vh", background: "#f4f3ef" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Fond : halo + trame, mêmes matières que le hero */}
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,59,255,0.12), transparent 65%)" }}
        />

        {/* Scène */}
        <div className="absolute inset-0">
          {webgl === true && <EcosystemScene progress={progress} reduceMotion={reduceMotion} />}
          {webgl === false && <StaticEcosystem />}
        </div>

        {/* Textes : une étape à la fois, calée sur la progression */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-container items-end px-5 pb-16 lg:items-center lg:px-12 lg:pb-0">
            <div className="relative h-56 w-full max-w-md">
              {STEPS.map((s, i) => (
                <Step key={s.kicker} step={s} index={i} progress={eased} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </div>

        {/* Cartouche prototype */}
        <div className="pointer-events-auto absolute left-5 top-5 flex items-center gap-3 lg:left-12 lg:top-8">
          <Link href="/" className="font-body text-xl font-black tracking-[-0.03em]" style={{ color: "#111111" }}>
            luma<span style={{ color: "#1A3BFF" }}>.</span>
          </Link>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ background: "rgba(17,17,17,0.06)", color: "rgba(17,17,17,0.55)" }}
          >
            Labo · prototype 3D
          </span>
        </div>

        {/* Progression */}
        {!reduceMotion && (
          <div className="absolute bottom-6 left-5 right-5 lg:left-12 lg:right-12">
            <div className="h-px w-full" style={{ background: "rgba(17,17,17,0.10)" }}>
              <motion.div className="h-px origin-left" style={{ scaleX: barScale, background: "#111111" }} />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.45)" }}>
              Défiler pour assembler l&apos;écosystème
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({
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
  /* Bornes strictement croissantes dans [0, 1]. */
  const first = index === 0;
  const last = index === STEPS.length - 1;
  const inStart = step.at;
  const inEnd = Math.min(step.at + 0.08, 0.99);
  const next = last ? 1 : STEPS[index + 1].at;
  const outStart = last ? 1 : next - 0.08;
  const inputRange = first ? [outStart, next] : last ? [inStart, inEnd] : [inStart, inEnd, outStart, next];
  const opacityRange = first ? [1, 0] : last ? [0, 1] : [0, 1, 1, 0];
  const yRange = first ? [0, -18] : last ? [18, 0] : [18, 0, 0, -18];
  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);

  if (reduceMotion) {
    return (
      <div className="mb-8">
        <p className="section-label">{step.kicker}</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em]" style={{ color: "#111111" }}>
          {step.title}
        </h2>
        <p className="mt-3 font-body text-base" style={{ color: "rgba(17,17,17,0.6)" }}>
          {step.text}
        </p>
      </div>
    );
  }

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y }}>
      <p className="section-label">{step.kicker}</p>
      <h2
        className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-4xl"
        style={{ color: "#111111" }}
      >
        {step.title}
      </h2>
      <p className="mt-3 max-w-sm font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.6)" }}>
        {step.text}
      </p>
    </motion.div>
  );
}
