import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "Levo a compris notre métier avant de parler technique. L'agent gère nos demandes mieux qu'on l'espérait.",
    name: "Camille R.",
    role: "Direction, Harmonie Yacht",
    initials: "CR",
  },
  {
    quote:
      "Un accompagnement vraiment humain. On a gagné des heures chaque semaine, sans jamais nous sentir perdus.",
    name: "Thomas L.",
    role: "Gérant, PME viticole",
    initials: "TL",
  },
  {
    quote:
      "Du sur-mesure, du soin, et des résultats concrets. Exactement ce qu'on cherchait pour démarrer.",
    name: "Sarah M.",
    role: "Fondatrice, startup montpelliéraine",
    initials: "SM",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-28">
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
              <Card tone="cream" className="flex h-full flex-col">
                <div className="flex gap-1" aria-label="Note : 5 sur 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className="fill-electric text-electric"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-5 flex-1 font-display text-xl italic leading-snug text-navy">
                  « {t.quote} »
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-cream font-body text-sm font-semibold text-navy">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-body text-sm font-medium text-navy">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
