import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const steps = [
  {
    num: "01",
    title: "On comprend",
    description: "30 minutes. Votre métier, vos irritants, ce qui doit changer.",
  },
  {
    num: "02",
    title: "On construit",
    description: "On développe votre solution sur-mesure, en vous montrant les avancées.",
  },
  {
    num: "03",
    title: "On ajuste",
    description: "Textes, flux, règles métier : on affine jusqu'à ce que ce soit vous.",
  },
  {
    num: "04",
    title: "On accompagne",
    description: "On déploie, on forme vos équipes. On ne disparaît pas après la livraison.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="py-28 sm:py-36" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-20">
          <p className="section-label">Notre méthode</p>
          <WordReveal
            text="Du premier échange à la mise en ligne."
            as="h2"
            className="heading mt-6 max-w-2xl text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
        </ScrollReveal>

        <ol
          aria-label="Étapes de notre méthode"
          className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 list-none"
          style={{ background: "rgba(17,17,17,0.10)" }}
        >
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 80} as="li">
              <div className="h-full p-10" style={{ background: "#eceae4" }}>
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-semibold"
                  style={{ border: "1px solid rgba(17,17,17,0.20)", color: "rgba(17,17,17,0.60)" }}
                >
                  {s.num}
                </span>

                <h3 className="mt-8 font-display text-xl font-semibold" style={{ color: "#111111" }}>
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
