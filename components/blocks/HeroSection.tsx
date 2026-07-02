"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  MessagesSquare,
  Bell,
  FileText,
  ReceiptText,
  PenLine,
  Search,
  Check,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TASKS = [
  { icon: MessagesSquare, label: "Demandes clients", status: "Qualifiées & routées", accent: "#1A3BFF" },
  { icon: Bell, label: "Relances", status: "Envoyées à J+2 / J+7", accent: "#B8860B" },
  { icon: FileText, label: "Devis", status: "Générés en < 2 min", accent: "#1A7F37" },
  { icon: ReceiptText, label: "Factures", status: "Émises automatiquement", accent: "#0B6E63" },
  { icon: PenLine, label: "Création de contenu", status: "Rédigée & planifiée", accent: "#7B2FBE" },
  { icon: Search, label: "SEO / GEO", status: "Optimisé en continu", accent: "#005fff" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const mockupY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Spotlight subtil qui suit la souris derrière le headline.
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(30);
  const spotXs = useSpring(spotX, { stiffness: 60, damping: 20 });
  const spotYs = useSpring(spotY, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotXs}% ${spotYs}%, rgba(0,95,255,0.055), transparent 70%)`;

  function onHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onHeroMouseMove}
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ background: "#f4f3ef" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div className="mx-auto max-w-container px-5 lg:px-12">
        {/* Centered hero copy */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...fadeUp(0)} className="section-label mx-auto mb-8 justify-center">
            Agence IA · Écosystèmes sur-mesure
          </motion.p>

          {/* Massive staggered headline */}
          <motion.h1
            className="font-display font-bold leading-[1.0] tracking-[-0.035em]"
            style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)", color: "#111111" }}
          >
            {["Des", "solutions", "IA,"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.05 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {["qui", "vous"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.26 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.em
                className="inline-block font-serif"
                style={{ color: "#005fff", fontStyle: "italic" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.42 }}
              >
                ressemblent.
              </motion.em>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="mx-auto mt-8 max-w-lg font-body text-lg leading-relaxed"
            style={{ color: "rgba(17,17,17,0.60)" }}
          >
            On automatise vos tâches répétitives <em className="font-serif not-italic" style={{ fontStyle: "italic", color: "#111111" }}>et</em> on décuple votre
            efficacité. Un écosystème IA qui travaille pendant que vous vous concentrez
            sur l&apos;essentiel.
          </motion.p>

          {/* Pill CTAs */}
          <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="#contact" className="btn-primary btn-sheen-auto" strength={0.25}>
              Discutons de votre projet →
            </MagneticButton>
            <MagneticButton href="#cas" className="btn-secondary" strength={0.25}>
              Voir nos réalisations
            </MagneticButton>
          </motion.div>

          {/* Bullet strip */}
          <motion.div
            {...fadeUp(0.7)}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {["TÂCHES AUTOMATISÉES", "PLUS D'EFFICACITÉ", "SUR-MESURE", "SANS ENGAGEMENT"].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 font-body text-[11px] font-semibold tracking-[0.12em]"
                style={{ color: "rgba(17,17,17,0.40)" }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: "rgba(17,17,17,0.30)" }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Parallax product mockup */}
        <motion.div
          style={{ y: mockupY, opacity: mockupOpacity }}
          className="mx-auto mt-20 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          >
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(17,17,17,0.10)",
                boxShadow: "0 32px 80px rgba(17,17,17,0.10), 0 4px 16px rgba(17,17,17,0.05)",
              }}
            >
              {/* Reflet de verre — balayage lent et discret */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 z-10 w-1/3"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,0.35) 50%, transparent)",
                  filter: "blur(2px)",
                }}
                initial={{ x: "-150%" }}
                animate={{ x: "450%" }}
                transition={{
                  duration: 2.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 2.2,
                  repeat: Infinity,
                  repeatDelay: 7,
                }}
              />
              {/* En-tête de la console */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: "#f0ede6", borderBottom: "1px solid rgba(17,17,17,0.08)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "#111111" }}>
                    <span className="font-serif text-sm font-bold text-white">L</span>
                  </div>
                  <span className="font-body text-sm font-semibold" style={{ color: "#111111" }}>
                    Votre écosystème Levo
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#28c840" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-body text-[10px]" style={{ color: "rgba(17,17,17,0.45)" }}>
                    Actif 24/7
                  </span>
                </div>
              </div>

              {/* Flux des tâches automatisées */}
              <div className="divide-y" style={{ borderColor: "rgba(17,17,17,0.06)" }}>
                {TASKS.map((task, i) => (
                  <motion.div
                    key={task.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.18, ease: EASE }}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${task.accent}14` }}
                    >
                      <task.icon size={16} strokeWidth={1.8} style={{ color: task.accent }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-sm font-semibold" style={{ color: "#111111" }}>
                        {task.label}
                      </p>
                      <p className="font-body text-[11px]" style={{ color: "rgba(17,17,17,0.45)" }}>
                        {task.status}
                      </p>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.18, ease: EASE }}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: task.accent }}
                    >
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center font-body text-xs" style={{ color: "rgba(17,17,17,0.35)" }}>
              Un écosystème qui gère demandes, devis, relances, contenu — en continu.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
