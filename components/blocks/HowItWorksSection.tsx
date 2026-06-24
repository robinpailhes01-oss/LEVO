import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "On comprend",
    description:
      "On prend le temps d'écouter votre métier, vos irritants et vos objectifs. Pas de solution standard avant d'avoir compris votre quotidien.",
  },
  {
    num: "02",
    title: "On construit",
    description:
      "On conçoit et développe votre solution sur-mesure, étape par étape, en vous montrant les avancées et en ajustant avec vous.",
  },
  {
    num: "03",
    title: "On accompagne",
    description:
      "On déploie, on forme vos équipes et on reste présents. Vos outils évoluent avec vous, on ne disparaît pas après la livraison.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="relative overflow-hidden py-28 sm:py-36">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 40%, var(--cream-dark) 60%, var(--cream) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-20 flex items-end justify-between gap-8 border-b border-border/60 pb-10">
          <div>
            <p className="label">Notre méthode</p>
            <h2 className="heading mt-5 text-4xl sm:text-5xl">
              Trois étapes,
              <br />zéro jargon
            </h2>
          </div>
          <p className="hidden max-w-xs font-body text-[15px] text-text-secondary lg:block">
            Une approche simple et transparente, du premier échange à la livraison — et au-delà.
          </p>
        </ScrollReveal>

        <div className="grid gap-0 md:grid-cols-3">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 120}>
              <div className={`py-10 pr-10 ${i > 0 ? "border-l border-border/60 pl-10 pr-0 md:pr-10" : ""}`}>
                <span className="font-display text-[3.5rem] font-bold leading-none text-navy opacity-[0.10]">
                  {s.num}
                </span>
                <div className="mt-4 h-[2px] w-10 bg-electric" />
                <h3 className="heading mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
