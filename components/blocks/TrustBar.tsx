import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const metrics = [
  { value: "100%", label: "Sur-mesure", note: "Jamais de template" },
  { value: "40h+", label: "Économisées/mois", note: "Par client en moyenne" },
  { value: "30s", label: "Réponse agent", note: "En production" },
  { value: "0", label: "Demandes oubliées", note: "Grâce à l'automatisation" },
];

export function TrustBar() {
  return (
    <section style={{ background: "#faf7f0", borderBottom: "1px solid #e2d9c8" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 60}>
              <div
                className="px-6 py-12 lg:py-16"
                style={{
                  borderRight: i < metrics.length - 1 ? "1px solid #e2d9c8" : undefined,
                  borderTop: i >= 2 ? "1px solid #e2d9c8" : undefined,
                }}
              >
                <p
                  className="font-display text-[2.6rem] font-bold leading-none tracking-[-0.03em]"
                  style={{ color: "#0b1f4a" }}
                >
                  <AnimatedCounter value={m.value} />
                </p>
                <p className="mt-3 font-body text-sm font-semibold" style={{ color: "#0b1f4a" }}>
                  {m.label}
                </p>
                <p className="mt-1 font-body text-xs" style={{ color: "#8a96a8" }}>
                  {m.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
