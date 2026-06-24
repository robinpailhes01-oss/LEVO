import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "100 %", label: "Sur-mesure, jamais de template" },
  { value: "Montpellier", label: "Ancrés en région, disponibles" },
  { value: "J+2", label: "Relances intelligentes automatisées" },
  { value: "Humain", label: "Un accompagnement, pas une boîte noire" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-cream-dark">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-8 px-5 py-12 lg:grid-cols-4 lg:px-12">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 80} className="text-center">
            <p className="heading text-3xl">{m.value}</p>
            <p className="mt-2 font-body text-sm text-text-secondary">
              {m.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
