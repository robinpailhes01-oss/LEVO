"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: delay / 1000 },
  }),
};

const chatMessages = [
  { from: "user", text: "Bonjour, j'ai une demande de location pour le 15 juillet." },
  { from: "agent", text: "Bonjour ! Je suis Léa. Pour combien de personnes et quel type de yacht souhaitez-vous ?" },
  { from: "user", text: "6 personnes, un voilier de luxe." },
  { from: "agent", text: "Parfait, je prépare votre devis personnalisé. Vous le recevrez dans quelques instants." },
];

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #005FFF 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-20 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #0B1F4A 0%, transparent 70%)" }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 80% at 65% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 65% 0%, black 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-container items-center gap-16 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12">
        {/* Left — copy */}
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            <span className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-navy/70">
              Agence IA · Montpellier
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={100}
            variants={fadeUp}
            className="display mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-[4.5rem]"
          >
            L&apos;IA qui travaille{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">comme vous</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M1 5.5C50 1.5 100 1.5 199 5.5"
                  stroke="#005FFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            le souhaitez
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={200}
            variants={fadeUp}
            className="mt-7 max-w-[520px] font-body text-lg leading-relaxed text-text-secondary"
          >
            On automatise ce qui vous prend du temps, vous gardez ce qui compte.
            Des solutions sur-mesure, construites avec soin et un vrai accompagnement humain.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={300}
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact" variant="primary">
              Discutons de votre projet
            </Button>
            <Button href="#cas" variant="ghost">
              Voir nos réalisations
              <ArrowRight size={16} strokeWidth={2} className="ml-1" aria-hidden />
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={420}
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-5"
          >
            {["Sur-mesure, jamais de template", "Accompagnement humain inclus", "Basés à Montpellier"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0 text-electric" strokeWidth={2} aria-hidden />
                <span className="font-body text-sm text-text-secondary">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — chat UI mockup */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={200}
          variants={fadeUp}
          className="relative mx-auto w-full max-w-[440px]"
        >
          {/* Glow behind card */}
          <div
            aria-hidden
            className="absolute inset-0 translate-y-4 scale-95 rounded-[24px] opacity-30 blur-2xl"
            style={{ background: "linear-gradient(135deg, #005FFF 0%, #0B1F4A 100%)" }}
          />

          {/* Browser chrome */}
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_24px_64px_rgba(11,31,74,0.12)]">
            {/* Chrome bar */}
            <div className="flex items-center gap-2 border-b border-border bg-cream-dark/70 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <div className="ml-3 flex-1 rounded-md bg-white/80 px-3 py-1 text-[11px] font-body text-text-muted">
                agent-léa.harmonieyacht.fr
              </div>
            </div>

            {/* Chat interface */}
            <div className="bg-cream px-5 py-5">
              {/* Agent header */}
              <div className="mb-4 flex items-center gap-3 rounded-[12px] border border-border bg-white px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy">
                  <span className="font-display text-sm font-semibold text-cream">L</span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-navy">Agent Léa</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    <p className="font-body text-xs text-text-muted">En ligne · Répond en moins de 30s</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.25, duration: 0.4, ease: "easeOut" }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-[14px] px-4 py-2.5 font-body text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "rounded-tr-[4px] bg-navy text-cream"
                          : "rounded-tl-[4px] border border-border bg-white text-navy shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-[14px] rounded-tl-[4px] border border-border bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="mt-4 flex items-center gap-2 rounded-[12px] border border-border bg-white px-4 py-3">
                <span className="flex-1 font-body text-sm text-text-muted">Votre message…</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-electric">
                  <ArrowRight size={14} strokeWidth={2.5} className="text-white" aria-hidden />
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-4 -top-5 rounded-[14px] border border-border bg-white px-4 py-3 shadow-[0_8px_32px_rgba(11,31,74,0.10)]"
          >
            <p className="font-body text-xs text-text-muted">Temps de réponse moyen</p>
            <p className="mt-0.5 font-display text-2xl font-semibold text-navy">{"< 30s"}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 -left-4 rounded-[14px] border border-border bg-white px-4 py-3 shadow-[0_8px_32px_rgba(11,31,74,0.10)]"
          >
            <p className="font-body text-xs text-text-muted">Satisfaction client</p>
            <div className="mt-0.5 flex items-end gap-1">
              <p className="font-display text-2xl font-semibold text-navy">98%</p>
              <span className="mb-0.5 font-body text-xs text-green-600">↑ sur-mesure</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
