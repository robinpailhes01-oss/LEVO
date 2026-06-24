"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bot, User, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7, ease: EASE, delay } },
});

function FloatingMockup({ children }: { children: React.ReactNode }) {
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 40, damping: 10 });

  useAnimationFrame((t) => {
    y.set(Math.sin(t / 2200) * 9);
  });

  return (
    <motion.div style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const mockupRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 80, damping: 18 });
  const springMy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(springMy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springMx, [-0.5, 0.5], [-6, 6]);

  function onMockupMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = mockupRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMockupMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-0"
      style={{ background: "#faf7f0" }}
    >
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — copy */}
          <div className="pb-16 lg:pb-32">
            <motion.div {...fadeUp(0)} className="mb-7">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-xs font-semibold"
                style={{
                  background: "rgba(0,95,255,0.08)",
                  color: "#005fff",
                  border: "1px solid rgba(0,95,255,0.18)",
                }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#005fff" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                Agence IA · Montpellier
              </span>
            </motion.div>

            {/* H1 with staggered word reveal */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-bold leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", color: "#0b1f4a" }}
              >
                {["Des", "solutions", "IA"].map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.75, ease: EASE, delay: 0.08 + i * 0.07 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
                <br />
                {["qui", "vous", "ressemblent"].map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.75, ease: EASE, delay: 0.3 + i * 0.07 }}
                      style={{ color: i === 0 ? "#0b1f4a" : "#005fff", fontStyle: "italic" }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-7 max-w-md font-body text-lg leading-relaxed"
              style={{ color: "#4a5568" }}
            >
              On automatise vos tâches répétitives avec des agents et workflows
              sur-mesure. Construits avec soin, accompagnés humainement.
            </motion.p>

            <motion.div
              {...fadeUp(0.6)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5 font-body text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background: "#005fff",
                  boxShadow: "0 4px 16px rgba(0,95,255,0.30)",
                }}
              >
                Discutons de votre projet
                <ArrowRight size={14} />
              </MagneticButton>
              <Link
                href="#cas"
                className="font-body text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                style={{ color: "#4a5568" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0b1f4a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5568")}
              >
                Voir nos réalisations
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div {...fadeUp(0.7)} className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["CR", "TL", "SM"].map((i) => (
                  <span
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full font-body text-[10px] font-bold text-white ring-2 ring-white"
                    style={{ background: "#0b1f4a" }}
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="font-body text-sm" style={{ color: "#4a5568" }}>
                <span style={{ color: "#0b1f4a", fontWeight: 600 }}>+10 clients</span> nous font confiance en région
              </p>
            </motion.div>
          </div>

          {/* Right — 3D chat mockup with float + tilt */}
          <motion.div
            {...fadeIn(0.4)}
            className="relative pb-0 pt-8 lg:pt-24 lg:pb-0 self-end"
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-72 w-72 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,95,255,0.07), transparent 70%)",
              }}
            />

            <FloatingMockup>
              <motion.div
                ref={mockupRef}
                onMouseMove={onMockupMouseMove}
                onMouseLeave={onMockupMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  perspective: "1200px",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                className="relative rounded-[20px] overflow-hidden cursor-default"
              >
                <div
                  className="rounded-[20px] overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2d9c8",
                    boxShadow: "0 24px 80px rgba(11,31,74,0.12), 0 4px 16px rgba(11,31,74,0.06)",
                  }}
                >
                  {/* Chrome bar */}
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ background: "#f5f0e8", borderBottom: "1px solid #e2d9c8" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                      <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                      <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
                    </div>
                    <div className="flex flex-1 items-center gap-2 rounded-md px-3 py-1" style={{ background: "#ede8df" }}>
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#28c840" }} />
                      <span className="font-body text-xs" style={{ color: "#8a96a8" }}>
                        app.levo.ai / agent / léa
                      </span>
                    </div>
                  </div>

                  {/* Chat */}
                  <div className="space-y-4 p-5">
                    {/* Agent header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#005fff" }}>
                        <Bot size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold" style={{ color: "#0b1f4a" }}>
                          Léa — Agent IA
                        </p>
                        <div className="flex items-center gap-1.5">
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: "#28c840", display: "inline-block" }}
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="font-body text-[10px]" style={{ color: "#8a96a8" }}>
                            En ligne · répond en &lt; 5s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Agent message */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex gap-2.5"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(0,95,255,0.10)" }}>
                        <Bot size={13} style={{ color: "#005fff" }} />
                      </div>
                      <div className="max-w-xs rounded-xl rounded-tl-none px-4 py-3" style={{ background: "#f5f0e8", border: "1px solid #e2d9c8" }}>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "#4a5568" }}>
                          Bonjour ! Je suis Léa, votre assistante Harmonie Yacht. 🛥️
                          <br /><br />
                          Pour préparer votre devis, pouvez-vous me donner vos dates ?
                        </p>
                      </div>
                    </motion.div>

                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      className="flex gap-2.5 justify-end"
                    >
                      <div className="max-w-xs rounded-xl rounded-tr-none px-4 py-3" style={{ background: "#005fff" }}>
                        <p className="font-body text-xs leading-relaxed text-white">
                          Du 15 au 22 juillet, pour 6 personnes. Budget ~8 000€.
                        </p>
                      </div>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "#e8e1d4" }}>
                        <User size={13} style={{ color: "#4a5568" }} />
                      </div>
                    </motion.div>

                    {/* Agent reply */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      className="flex gap-2.5"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(0,95,255,0.10)" }}>
                        <Bot size={13} style={{ color: "#005fff" }} />
                      </div>
                      <div className="max-w-xs rounded-xl rounded-tl-none px-4 py-3" style={{ background: "#f5f0e8", border: "1px solid #e2d9c8" }}>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "#4a5568" }}>
                          Parfait ! J&apos;ai trouvé 3 options dans votre budget.
                          Devis envoyé par e-mail. ✅
                        </p>
                      </div>
                    </motion.div>

                    {/* Pills */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.7 }}
                      className="flex flex-wrap gap-2 pt-1"
                    >
                      {["Voir les yachts disponibles", "Modifier les dates"].map((label) => (
                        <button
                          key={label}
                          className="rounded-full px-3 py-1.5 font-body text-[10px] font-medium"
                          style={{
                            background: "rgba(0,95,255,0.06)",
                            border: "1px solid rgba(0,95,255,0.18)",
                            color: "#005fff",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </FloatingMockup>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.8 }}
              className="absolute -left-8 top-28 hidden sm:flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{
                background: "#ffffff",
                border: "1px solid #e2d9c8",
                boxShadow: "0 8px 24px rgba(11,31,74,0.10)",
              }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(40,200,64,0.12)" }}>
                <CheckCircle2 size={14} style={{ color: "#28c840" }} />
              </div>
              <div>
                <p className="font-body text-[10px] font-semibold" style={{ color: "#0b1f4a" }}>
                  40h économisées
                </p>
                <p className="font-body text-[9px]" style={{ color: "#8a96a8" }}>ce mois-ci</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #e2d9c8" }} />
    </section>
  );
}
