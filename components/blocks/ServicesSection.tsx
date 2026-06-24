"use client";

import { Bot, Workflow, LineChart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { WordReveal } from "@/components/ui/WordReveal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    tag: "IA conversationnelle",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    tag: "n8n · Zapier",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    tag: "Supabase · Next.js",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 sm:py-36" style={{ background: "#faf7f0" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-20">
          <p className="section-label">Ce qu&apos;on construit</p>
          <WordReveal
            text="Des outils pensés autour de vous"
            as="h2"
            className="heading mt-5 max-w-xl text-4xl sm:text-5xl"
            style={{ color: "#0b1f4a" }}
            delay={0.05}
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3" style={{ perspective: "1200px" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <TiltCard
                className="relative h-full overflow-hidden rounded-[16px] border bg-white p-8 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(11,31,74,0.10)]"
                style={{ border: "1px solid #e2d9c8" }}
                intensity={6}
              >
                {/* Number watermark */}
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 select-none font-display text-[9rem] font-bold leading-none"
                  style={{ color: "rgba(11,31,74,0.04)" }}
                >
                  {s.num}
                </span>

                {/* Tag */}
                <span
                  className="inline-block rounded-full px-3 py-1 font-body text-[11px] font-medium"
                  style={{
                    border: "1px solid rgba(0,95,255,0.18)",
                    background: "rgba(0,95,255,0.06)",
                    color: "#005fff",
                  }}
                >
                  {s.tag}
                </span>

                {/* Icon */}
                <div
                  className="mt-6 flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{ background: "rgba(0,95,255,0.08)" }}
                >
                  <s.icon size={20} strokeWidth={1.5} style={{ color: "#005fff" }} aria-hidden />
                </div>

                <h3 className="heading relative mt-6 text-[1.25rem]" style={{ color: "#0b1f4a" }}>
                  {s.title}
                </h3>
                <p
                  className="relative mt-3 font-body text-[15px] leading-relaxed"
                  style={{ color: "#4a5568" }}
                >
                  {s.description}
                </p>

                {/* Reveal line on hover */}
                <div
                  className="mt-8 h-px transition-all duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg, #005fff, transparent)" }}
                />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
