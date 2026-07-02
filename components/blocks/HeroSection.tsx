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
import { Bot, User } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
            Levo · Montpellier → Sud de la France
          </motion.p>

          {/* Massive staggered headline */}
          <motion.h1
            className="font-display font-bold leading-[1.0] tracking-[-0.035em]"
            style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)", color: "#111111" }}
          >
            {["Des", "solutions", "IA,"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
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
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
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
            <span className="inline-block overflow-hidden">
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
            On automatise vos tâches répétitives avec des agents et workflows sur-mesure.
            Construits avec soin, accompagnés humainement.
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
            {["SUR-MESURE", "40H+ ÉCONOMISÉES", "SANS ENGAGEMENT", "RÉSULTATS CONCRETS"].map((item) => (
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
              {/* Browser chrome */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: "#f0ede6", borderBottom: "1px solid rgba(17,17,17,0.08)" }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <div className="flex flex-1 items-center gap-2 rounded-md px-3 py-1" style={{ background: "rgba(17,17,17,0.06)" }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#28c840" }} />
                  <span className="font-body text-xs" style={{ color: "rgba(17,17,17,0.40)" }}>
                    app.levo.ai / agent / léa
                  </span>
                </div>
              </div>

              {/* Chat UI */}
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid rgba(17,17,17,0.07)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#111111" }}>
                    <Bot size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold" style={{ color: "#111111" }}>Léa — Agent IA</p>
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: "#28c840" }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="font-body text-[10px]" style={{ color: "rgba(17,17,17,0.40)" }}>
                        En ligne · répond en &lt; 5s
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(17,17,17,0.07)" }}>
                    <Bot size={13} style={{ color: "#111111" }} />
                  </div>
                  <div className="max-w-sm rounded-2xl rounded-tl-none px-4 py-3" style={{ background: "#f0ede6" }}>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
                      Bonjour ! Je suis Léa, votre assistante Harmonie Yacht. 🛥️<br /><br />
                      Pour préparer votre devis, pouvez-vous me donner vos dates ?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex justify-end gap-3"
                >
                  <div className="max-w-sm rounded-2xl rounded-tr-none px-4 py-3" style={{ background: "#111111" }}>
                    <p className="font-body text-xs leading-relaxed text-white">
                      Du 15 au 22 juillet, pour 6 personnes. Budget ~8 000€.
                    </p>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(17,17,17,0.07)" }}>
                    <User size={13} style={{ color: "#111111" }} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(17,17,17,0.07)" }}>
                    <Bot size={13} style={{ color: "#111111" }} />
                  </div>
                  <div className="max-w-sm rounded-2xl rounded-tl-none px-4 py-3" style={{ background: "#f0ede6" }}>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
                      Parfait ! 3 options disponibles dans votre budget. Devis envoyé par e-mail. ✅
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="flex gap-2 pt-1"
                >
                  {["Voir les yachts disponibles", "Modifier les dates"].map((label) => (
                    <button
                      key={label}
                      className="rounded-full px-3 py-1.5 font-body text-[10px] font-medium"
                      style={{ border: "1px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.55)" }}
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>

            <p className="mt-5 text-center font-body text-xs" style={{ color: "rgba(17,17,17,0.35)" }}>
              Agent Léa — Harmonie Yacht · 40h économisées par mois
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
