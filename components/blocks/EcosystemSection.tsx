"use client";

import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Bot, LineChart, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StaticEcosystem, supportsWebGL } from "@/components/scene/EcosystemFallback";

/* ──────────────────────────────────────────────────────────────────
   Acte 3 — L'écosystème (moment signature).

   Une scène 3D épinglée : le métier au centre, les pièces qui se
   mettent en orbite, les liaisons qui se tracent. Trois étapes de
   texte se relaient pendant que ça s'assemble. Puis, une fois la
   scène figée, les trois briques principales se posent en cartes.

   Trois régimes :
   - desktop        : épinglé, piloté par le scroll (260vh) ;
   - mobile         : pas d'épinglage, la scène s'assemble seule quand
                      elle entre à l'écran (le pouce n'a rien à porter) ;
   - mouvement réduit : scène assemblée, statique.

   La scène WebGL (three + fiber, ~166 Ko gzip) ne se charge qu'à
   l'approche de la section, jamais au chargement de la page.
   ────────────────────────────────────────────────────────────────── */

const EcosystemScene = dynamic(() => import("@/components/scene/EcosystemScene"), { ssr: false });

const STEPS = [
  {
    at: 0.0,
    kicker: "01 · Le point de départ",
    title: "Votre métier au centre.",
    text: "Pas une plateforme dans laquelle vous entrez. Un cœur autour duquel on assemble ce dont vous avez besoin, rien de plus.",
  },
  {
    at: 0.36,
    kicker: "02 · Les pièces arrivent",
    title: "Chaque pièce se met en orbite.",
    text: "Agent WhatsApp, devis, relances, CRM, contenu, rapports : elles arrivent une à une, à leur place, dans votre ton.",
  },
  {
    at: 0.72,
    kicker: "03 · Les liaisons",
    title: "Tout se parle, sans vous.",
    text: "Une demande devient un devis, un devis une relance, une relance un rendez-vous. Vous regardez le tableau de bord.",
  },
];

const BRICKS = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description: "Ils pré-qualifient vos demandes, répondent à vos clients et préparent le travail, dans votre ton, avec vos règles.",
    tag: "Répond à votre place",
    accent: "#1A3BFF",
    href: "/services/agents-conversationnels",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description: "Devis, relances, synthèses, onboarding : vos outils connectés pour que le répétitif se fasse tout seul.",
    tag: "Zéro tâche manuelle",
    accent: "#1A7F37",
    href: "/services/automatisation-workflows",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord",
    description: "Un dashboard clair, construit autour de votre activité, pour suivre demandes et résultats en temps réel.",
    tag: "Suivi en temps réel",
    accent: "#B8860B",
    href: "/services/tableaux-de-bord",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useMediaQuery(query: string): boolean | null {
  const [match, setMatch] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

export function EcosystemSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const desktop = useMediaQuery("(min-width: 1024px)");
  const pinned = desktop === true && !reduceMotion;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });

  /* Mobile : la scène s'assemble seule une fois visible. */
  const auto = useMotionValue(0);
  const progress: MotionValue<number> = pinned ? eased : auto;

  /* Chargement paresseux + détection WebGL */
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setNear(true);
            setWebgl(supportsWebGL());
            io.disconnect();
          }
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (pinned) return;
    if (reduceMotion) {
      auto.set(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !seen) {
          setSeen(true);
          animate(auto, 1, { duration: 4.2, ease: [0.4, 0, 0.2, 1] });
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pinned, reduceMotion, auto, seen]);

  return (
    <section id="services" className="relative" style={{ background: "#f4f3ef" }}>
      {/* ── L'acte épinglé (ou son équivalent mobile) ── */}
      <div ref={ref} className="relative" style={{ height: pinned ? "260vh" : "auto" }}>
        <div className={pinned ? "sticky top-0 h-[100dvh] w-full overflow-hidden" : "relative w-full overflow-hidden"}>
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,59,255,0.12), transparent 65%)" }}
          />

          {/* Scène */}
          <div className={pinned ? "absolute inset-0" : "relative h-[62vh] min-h-[420px] w-full"}>
            {near && webgl === true && <EcosystemScene progress={progress} reduceMotion={reduceMotion} />}
            {near && webgl === false && <StaticEcosystem />}
          </div>

          {/* Étapes */}
          {pinned ? (
            <div className="pointer-events-none absolute inset-0">
              <div className="mx-auto flex h-full max-w-container items-center px-5 lg:px-12">
                <div className="relative h-60 w-full max-w-md">
                  {STEPS.map((s, i) => (
                    <PinnedStep key={s.kicker} step={s} index={i} progress={eased} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {pinned && (
            <div className="pointer-events-none absolute bottom-6 left-5 right-5 lg:left-12 lg:right-12">
              <div className="h-px w-full" style={{ background: "rgba(17,17,17,0.10)" }}>
                <motion.div className="h-px origin-left" style={{ scaleX: eased, background: "#111111" }} />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.45)" }}>
                Notre approche · défiler pour assembler
              </p>
            </div>
          )}
        </div>

        {/* Mobile : les trois étapes se lisent à la suite, sous la scène. */}
        {!pinned && (
          <div className="mx-auto max-w-container px-5 pb-8 lg:px-12">
            <p className="section-label">Notre approche</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.kicker}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "#1A3BFF" }}>
                    {s.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]" style={{ color: "#111111" }}>
                    {s.title}
                  </h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.6)" }}>
                    {s.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sortie : les briques se posent ── */}
      <div className="mx-auto max-w-container px-5 pb-28 pt-16 lg:px-12 lg:pt-24">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-4xl" style={{ color: "#111111" }}>
            Les briques que l&apos;on assemble, <em className="whitespace-nowrap font-serif font-medium" style={{ color: "#1A3BFF" }}>pour vous.</em>
          </h2>
          <p className="max-w-sm font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
            On ne vend pas d&apos;outils sur étagère. Chaque brique est façonnée autour de votre métier, pas l&apos;inverse.
          </p>
        </div>

        <ul aria-label="Les briques de l'écosystème" className="grid list-none gap-5 md:grid-cols-3">
          {BRICKS.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
              style={{ transformPerspective: 1200 }}
              className="h-full"
            >
              <Link
                href={b.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 1px 2px rgba(17,17,17,0.04)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: b.accent }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${b.accent}14` }}>
                    <b.icon size={22} strokeWidth={1.8} style={{ color: b.accent }} aria-hidden />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: "rgba(17,17,17,0.25)" }}>
                    {b.num}
                  </span>
                </div>
                <h3 className="relative mt-7 font-body text-xl font-bold leading-snug tracking-[-0.01em]" style={{ color: "#111111" }}>
                  {b.title}
                </h3>
                <p className="relative mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                  {b.description}
                </p>
                <span
                  className="relative mt-7 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold"
                  style={{ background: `${b.accent}14`, color: b.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.accent }} />
                  {b.tag}
                </span>
                <span
                  className="relative mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "#111111" }}
                >
                  En savoir plus →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PinnedStep({ step, index, progress }: { step: (typeof STEPS)[number]; index: number; progress: MotionValue<number> }) {
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

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y }}>
      <p className="section-label">{step.kicker}</p>
      <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-4xl" style={{ color: "#111111" }}>
        {step.title}
      </h3>
      <p className="mt-3 max-w-sm font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.6)" }}>
        {step.text}
      </p>
    </motion.div>
  );
}
