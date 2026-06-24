import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const testimonials = [
  {
    quote: "Levo a compris notre métier avant de parler technique. L'agent gère nos demandes mieux qu'on l'espérait.",
    name: "Camille R.",
    role: "Direction, Harmonie Yacht",
    initials: "CR",
    result: "40h économisées/mois",
  },
  {
    quote: "Un accompagnement vraiment humain. On a gagné des heures chaque semaine, sans jamais nous sentir perdus.",
    name: "Thomas L.",
    role: "Gérant, PME viticole",
    initials: "TL",
    result: "Zéro relance oubliée",
  },
  {
    quote: "Du sur-mesure, du soin, et des résultats concrets. Exactement ce qu'on cherchait pour démarrer avec l'IA.",
    name: "Sarah M.",
    role: "Fondatrice, startup montpelliéraine",
    initials: "SM",
    result: "Déployé en 3 semaines",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label">Ils nous font confiance</p>
          <WordReveal
            text="Des clients qui gagnent du temps"
            as="h2"
            className="heading mt-6 text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
        </ScrollReveal>

        <ul
          aria-label="Témoignages clients"
          className="grid gap-px md:grid-cols-3 list-none"
          style={{ background: "rgba(17,17,17,0.10)" }}
        >
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80} as="li">
              <article className="flex h-full flex-col p-10" style={{ background: "#f4f3ef" }}>
                <div className="flex gap-1 mb-6" aria-label="Note : 5 étoiles sur 5" role="img">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z" fill="#111111" />
                    </svg>
                  ))}
                </div>

                <blockquote cite="#" className="flex-1 font-display text-xl italic leading-snug" style={{ color: "#111111" }}>
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </blockquote>

                <footer className="mt-8 flex items-center justify-between pt-6" style={{ borderTop: "1px solid rgba(17,17,17,0.10)" }}>
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-bold text-white" style={{ background: "#111111" }}>
                      {t.initials}
                    </span>
                    <div>
                      <cite className="not-italic font-body text-sm font-semibold" style={{ color: "#111111" }}>{t.name}</cite>
                      <p className="font-body text-xs" style={{ color: "rgba(17,17,17,0.45)" }}>{t.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full px-3 py-1 font-body text-[10px] font-medium" style={{ background: "rgba(17,17,17,0.07)", color: "rgba(17,17,17,0.55)" }}>
                    {t.result}
                  </span>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
