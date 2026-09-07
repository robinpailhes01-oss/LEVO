"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ──────────────────────────────────────────────────────────────────
   Acte 1 — La preuve.
   Quatre chiffres posés sur une ligne qui se trace avec le scroll,
   puis les logos. Pas de cartes : des filets, de l'air, des nombres
   qui se comptent. Le contraire d'une grille de tuiles.
   ────────────────────────────────────────────────────────────────── */

const METRICS = [
  { value: "100%", label: "sur-mesure", note: "Jamais de template, jamais de location" },
  { value: "40h+", label: "rendues chaque mois", note: "Par client, en moyenne" },
  { value: "30s", label: "de réponse", note: "Agent en production, 24/7" },
  { value: "0", label: "demande oubliée", note: "Chaque message a une suite" },
];

const CLIENTS = [
  { name: "Harmonie Yacht", src: "/clients/harmonie-yacht.png" },
  { name: "LS Consulting", src: "/clients/ls-consulting.jpg" },
  { name: "Champagne Perla", src: "/clients/champagne-perla.jpg" },
  { name: "JeanBa Jardin", src: "/clients/jeanba-jardin.png" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProofSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 25%"] });
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 80, damping: 24 });
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-24" style={{ background: "#111111" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(26,59,255,0.18), transparent 62%)" }}
      />

      <div className="relative mx-auto max-w-container px-5 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <p className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>
            La preuve, en chiffres
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] sm:block" style={{ color: "rgba(255,255,255,0.35)" }}>
            Mesuré chez nos clients
          </p>
        </div>

        {/* La ligne se trace en entrant, les chiffres se posent dessus. */}
        <div className="relative mt-6 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left" style={{ scaleX: lineScale, background: "#ffffff", opacity: 0.6 }} />
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.12 }}
              className={`py-8 sm:py-10 ${i % 2 === 1 ? "pl-6 sm:pl-8" : ""} ${i < 2 ? "" : ""} lg:pl-8 lg:first:pl-0`}
              style={{
                borderLeft: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
              }}
            >
              <dd
                className="font-body text-[3rem] font-black leading-none tracking-[-0.04em] sm:text-[3.6rem]"
                style={{ color: "#ffffff" }}
              >
                <AnimatedCounter value={m.value} duration={2000} />
              </dd>
              <dt className="mt-3 font-body text-base font-semibold" style={{ color: "#ffffff" }}>
                {m.label}
              </dt>
              <p className="mt-1 font-body text-[13px]" style={{ color: "rgba(255,255,255,0.42)" }}>
                {m.note}
              </p>
            </motion.div>
          ))}
        </dl>

        <div className="mt-6 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

        <p className="mt-10 section-label" style={{ color: "rgba(255,255,255,0.45)" }}>
          Ils nous font confiance
        </p>
      </div>

      {/* Logos : bande continue, fondue sur les bords */}
      <div
        className="relative mt-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-5"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {repeated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl px-6"
              style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="relative h-12 w-full">
                <Image src={client.src} alt={client.name} fill sizes="180px" className="object-contain" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
