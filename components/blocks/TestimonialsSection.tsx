import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="label">Ils nous font confiance</p>
          <h2 className="heading mt-5 text-4xl sm:text-5xl">
            Des clients
            <br />qui gagnent du temps
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-[20px] border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,31,74,0.07)]">
                {/* Stars */}
                <div className="flex gap-0.5" aria-label="5 étoiles">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#005FFF" aria-hidden>
                      <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-6 flex-1 font-display text-xl italic leading-snug text-navy">
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </p>

                {/* Author */}
                <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-body text-xs font-semibold text-cream">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-navy">{t.name}</p>
                      <p className="font-body text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-cream-dark px-3 py-1 font-body text-[11px] text-text-secondary">
                    {t.result}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
