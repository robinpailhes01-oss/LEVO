import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const metrics = [
  { value: "100%", label: "Sur-mesure", note: "Jamais de template", accent: "#1A3BFF" },
  { value: "40h+", label: "Économisées/mois", note: "Par client en moyenne", accent: "#1A7F37" },
  { value: "30s", label: "Réponse agent", note: "En production", accent: "#B8860B" },
  { value: "0", label: "Demandes oubliées", note: "Grâce à l'automatisation", accent: "#E84393" },
];

export function TrustBar() {
  return (
    <section className="py-16 sm:py-20" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 60} as="div" className="h-full">
              <div
                className="relative h-full overflow-hidden rounded-[22px] p-6 sm:p-7"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl"
                  style={{ background: m.accent }}
                />
                <span className="relative flex h-2 w-2 rounded-full" style={{ background: m.accent }} />
                <dd
                  className="relative mt-4 font-body text-[2.4rem] font-black leading-none tracking-[-0.03em] sm:text-[2.6rem]"
                  style={{ color: "#ffffff" }}
                >
                  <AnimatedCounter value={m.value} />
                </dd>
                <dt className="relative mt-3 font-body text-sm font-semibold" style={{ color: "#ffffff" }}>{m.label}</dt>
                <p className="relative mt-1 font-body text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{m.note}</p>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
