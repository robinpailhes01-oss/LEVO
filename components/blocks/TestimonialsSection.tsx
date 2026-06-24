"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { WordReveal } from "@/components/ui/WordReveal";

const testimonials = [
  {
    quote:
      "Levo a compris notre métier avant de parler technique. L'agent gère nos demandes mieux qu'on l'espérait.",
    name: "Camille R.",
    role: "Direction, Harmonie Yacht",
    initials: "CR",
    result: "40h économisées/mois",
  },
  {
    quote:
      "Un accompagnement vraiment humain. On a gagné des heures chaque semaine, sans jamais nous sentir perdus.",
    name: "Thomas L.",
    role: "Gérant, PME viticole",
    initials: "TL",
    result: "Zéro relance oubliée",
  },
  {
    quote:
      "Du sur-mesure, du soin, et des résultats concrets. Exactement ce qu'on cherchait pour démarrer avec l'IA.",
    name: "Sarah M.",
    role: "Fondatrice, startup montpelliéraine",
    initials: "SM",
    result: "Déployé en 3 semaines",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 sm:py-36" style={{ background: "#f0ebe0" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label">Ils nous font confiance</p>
          <WordReveal
            text="Des clients qui gagnent du temps"
            as="h2"
            className="heading mt-5 text-4xl sm:text-5xl"
            style={{ color: "#0b1f4a" }}
            delay={0.05}
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3" style={{ perspective: "1200px" }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <TiltCard
                className="flex h-full flex-col rounded-[16px] border bg-white p-8"
                style={{ border: "1px solid #e2d9c8" }}
                intensity={5}
              >
                {/* Stars */}
                <div className="flex gap-1" aria-label="5 étoiles">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14" aria-hidden>
                      <path
                        d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z"
                        fill="#005fff"
                      />
                    </svg>
                  ))}
                </div>

                <p
                  className="mt-6 flex-1 font-display text-xl italic leading-snug"
                  style={{ color: "#0b1f4a" }}
                >
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </p>

                <div
                  className="mt-8 flex items-center justify-between pt-6"
                  style={{ borderTop: "1px solid #e2d9c8" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-semibold text-white"
                      style={{ background: "#0b1f4a" }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold" style={{ color: "#0b1f4a" }}>
                        {t.name}
                      </p>
                      <p className="font-body text-xs" style={{ color: "#8a96a8" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 font-body text-[11px]"
                    style={{
                      background: "rgba(0,95,255,0.08)",
                      border: "1px solid rgba(0,95,255,0.18)",
                      color: "#005fff",
                    }}
                  >
                    {t.result}
                  </span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
