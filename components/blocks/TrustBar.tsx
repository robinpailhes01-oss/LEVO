import { ScrollReveal } from "@/components/ui/ScrollReveal";

const metrics = [
  { value: "100%", label: "Sur-mesure", note: "Jamais de template" },
  { value: "40h+", label: "Économisées/mois", note: "Par client en moyenne" },
  { value: "< 30s", label: "Réponse agent", note: "En production" },
  { value: "0", label: "Demandes oubliées", note: "Grâce à l'automatisation" },
];

export function TrustBar() {
  return (
    <section style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 60}>
              <div
                className="px-6 py-14 lg:py-16"
                style={{
                  borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  borderTop: i >= 2 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                }}
              >
                <p
                  className="font-display text-[2.8rem] font-bold leading-none tracking-[-0.03em]"
                  style={{ color: "#f8f4ed" }}
                >
                  {m.value}
                </p>
                <p className="mt-3 font-body text-sm font-semibold" style={{ color: "rgba(248,244,237,0.65)" }}>
                  {m.label}
                </p>
                <p className="mt-1 font-body text-xs" style={{ color: "rgba(248,244,237,0.35)" }}>
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
