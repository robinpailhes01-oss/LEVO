import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "100%", label: "Sur-mesure", sub: "Jamais de template" },
  { value: "< 30s", label: "Réponse agent", sub: "En production" },
  { value: "40h+", label: "Économisées/mois", sub: "Par client en moyenne" },
  { value: "Humain", label: "Accompagnement", sub: "Pas une boîte noire" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-cream-dark">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div className="bg-cream-dark px-6 py-10 text-center lg:px-10">
                <p className="font-display text-4xl font-bold text-navy sm:text-5xl">
                  {m.value}
                </p>
                <p className="mt-2 font-body text-sm font-semibold text-navy/80">
                  {m.label}
                </p>
                <p className="mt-0.5 font-body text-xs text-text-muted">
                  {m.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
