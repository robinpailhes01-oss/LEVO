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
          <p className="section-label">Ils nous font confiance</p>
          <h2
            className="heading mt-5 text-4xl sm:text-5xl"
            style={{ color: "#f8f4ed" }}
          >
            Des clients
            <br />qui gagnent du temps
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div
                className="glass-card flex h-full flex-col p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Stars */}
                <div className="flex gap-1" aria-label="5 étoiles">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14" aria-hidden>
                      <path
                        d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505z"
                        fill="#4d8fff"
                      />
                    </svg>
                  ))}
                </div>

                <p
                  className="mt-6 flex-1 font-display text-xl italic leading-snug"
                  style={{ color: "#f8f4ed" }}
                >
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </p>

                <div
                  className="mt-8 flex items-center justify-between pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #005fff, #00c2ff)" }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold" style={{ color: "#f8f4ed" }}>
                        {t.name}
                      </p>
                      <p className="font-body text-xs" style={{ color: "rgba(248,244,237,0.40)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 font-body text-[11px]"
                    style={{
                      background: "rgba(0,95,255,0.10)",
                      border: "1px solid rgba(77,143,255,0.20)",
                      color: "rgba(77,143,255,0.80)",
                    }}
                  >
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
