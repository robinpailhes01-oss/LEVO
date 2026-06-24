import { ScrollReveal } from "@/components/ui/ScrollReveal";

const metrics = [
  { value: "100%", label: "Sur-mesure", note: "Jamais de template" },
  { value: "40h+", label: "Économisées/mois", note: "Par client en moyenne" },
  { value: "< 30s", label: "Réponse agent", note: "En production" },
  { value: "0", label: "Demandes oubliées", note: "Grâce à l'automatisation" },
];

export function TrustBar() {
  return (
    <section
      className="border-b border-border/60"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 60}>
              <div
                className={[
                  "px-6 py-12 lg:py-16",
                  i < metrics.length - 1 ? "border-r border-border/60" : "",
                  i >= 2 ? "border-t border-border/60 lg:border-t-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="font-display text-[2.8rem] font-bold leading-none tracking-[-0.03em] text-navy">
                  {m.value}
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-navy/70">
                  {m.label}
                </p>
                <p className="mt-1 font-body text-xs text-text-muted">{m.note}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
