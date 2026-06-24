import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    title: "On comprend",
    description:
      "On prend le temps d'écouter votre métier, vos irritants et vos objectifs. Pas de solution standard avant d'avoir compris votre quotidien.",
    tag: "Écoute & diagnostic",
  },
  {
    num: "02",
    title: "On construit",
    description:
      "On conçoit et développe votre solution sur-mesure, étape par étape, en vous montrant les avancées et en ajustant avec vous.",
    tag: "Développement itératif",
  },
  {
    num: "03",
    title: "On accompagne",
    description:
      "On déploie, on forme vos équipes et on reste présents. Vos outils évoluent avec vous, on ne disparaît pas après la livraison.",
    tag: "Suivi continu",
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="bg-cream-dark py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Notre méthode</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Trois étapes, zéro jargon
          </h2>
          <p className="mt-5 font-body text-lg text-text-secondary">
            Une approche simple et transparente, du premier échange à la livraison.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 120}>
              <div className="relative overflow-hidden rounded-[20px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,31,74,0.08)]">
                {/* Step connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -right-3 top-12 z-10 hidden h-px w-6 bg-border md:block"
                  />
                )}

                {/* Number + tag */}
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold text-navy opacity-[0.12]">
                    {s.num}
                  </span>
                  <span className="rounded-full border border-border bg-cream px-3 py-1 font-body text-xs text-text-muted">
                    {s.tag}
                  </span>
                </div>

                {/* Electric line accent */}
                <div className="mt-4 h-[2px] w-8 rounded-full bg-electric" />

                <h3 className="heading mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
