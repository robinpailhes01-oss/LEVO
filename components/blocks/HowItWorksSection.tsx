"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const steps = [
  {
    num: "01",
    title: "On comprend",
    description:
      "On prend le temps d'écouter votre métier, vos irritants et vos objectifs. Pas de solution standard avant d'avoir compris votre quotidien.",
  },
  {
    num: "02",
    title: "On construit",
    description:
      "On conçoit et développe votre solution sur-mesure, étape par étape, en vous montrant les avancées et en ajustant avec vous.",
  },
  {
    num: "03",
    title: "On accompagne",
    description:
      "On déploie, on forme vos équipes et on reste présents. Vos outils évoluent avec vous, on ne disparaît pas après la livraison.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="py-28 sm:py-36" style={{ background: "#f0ebe0" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-20">
          <div
            className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between"
            style={{ borderBottom: "1px solid #e2d9c8" }}
          >
            <div>
              <p className="section-label">Notre méthode</p>
              <WordReveal
                text="Trois étapes, zéro jargon"
                as="h2"
                className="heading mt-5 text-4xl sm:text-5xl"
                style={{ color: "#0b1f4a" }}
                delay={0.05}
              />
            </div>
            <p className="hidden max-w-xs font-body text-[15px] lg:block" style={{ color: "#4a5568" }}>
              Une approche simple et transparente, du premier échange à la livraison — et au-delà.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-0 md:grid-cols-3">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 120}>
              <div
                className="py-10"
                style={{
                  paddingRight: i < steps.length - 1 ? "2.5rem" : undefined,
                  paddingLeft: i > 0 ? "2.5rem" : undefined,
                  borderLeft: i > 0 ? "1px solid #e2d9c8" : undefined,
                }}
              >
                <span
                  className="font-display text-[3.5rem] font-bold leading-none"
                  style={{ color: "rgba(11,31,74,0.08)" }}
                >
                  {s.num}
                </span>
                <div className="mt-4 h-[2px] w-10" style={{ background: "#005fff" }} />
                <h3 className="heading mt-6 text-2xl" style={{ color: "#0b1f4a" }}>
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: "#4a5568" }}>
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
