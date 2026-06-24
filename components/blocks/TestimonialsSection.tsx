import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "Levo a compris notre métier avant de parler technique. L'agent gère nos demandes mieux qu'on l'espérait.",
    name: "Camille R.",
    role: "Direction, Harmonie Yacht",
    initials: "CR",
    highlight: "40h économisées/mois",
  },
  {
    quote:
      "Un accompagnement vraiment humain. On a gagné des heures chaque semaine, sans jamais nous sentir perdus.",
    name: "Thomas L.",
    role: "Gérant, PME viticole",
    initials: "TL",
    highlight: "Zéro relance oubliée",
  },
  {
    quote:
      "Du sur-mesure, du soin, et des résultats concrets. Exactement ce qu'on cherchait pour démarrer avec l'IA.",
    name: "Sarah M.",
    role: "Fondatrice, startup montpelliéraine",
    initials: "SM",
    highlight: "Déployé en 3 semaines",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Ils nous font confiance</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Des clients qui gagnent du temps
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_4px_20px_rgba(11,31,74,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,31,74,0.08)]">
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-navy via-electric to-electric-light" />

                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label="Note : 5 sur 5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className="fill-electric text-electric"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-cream px-3 py-1 font-body text-[11px] font-medium text-navy/60">
                      {t.highlight}
                    </span>
                  </div>

                  <p className="mt-6 flex-1 font-display text-xl italic leading-snug text-navy">
                    &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                  </p>

                  <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-body text-sm font-semibold text-cream">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-navy">
                        {t.name}
                      </p>
                      <p className="font-body text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
