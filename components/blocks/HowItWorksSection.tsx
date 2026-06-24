import { Compass, Hammer, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    icon: Compass,
    title: "On comprend",
    description:
      "On prend le temps d'écouter votre métier, vos irritants et vos objectifs. Pas de solution standard avant d'avoir compris votre quotidien.",
  },
  {
    num: "02",
    icon: Hammer,
    title: "On construit",
    description:
      "On conçoit et développe votre solution sur-mesure, étape par étape, en vous montrant les avancées et en ajustant avec vous.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "On accompagne",
    description:
      "On déploie, on forme vos équipes et on reste présents. Vos outils évoluent avec vous, on ne disparaît pas après la livraison.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="bg-cream-dark py-24 sm:py-28">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Notre méthode</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Trois étapes, zéro jargon
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 120}>
              <div className="relative">
                <span
                  aria-hidden
                  className="display absolute -top-10 left-0 text-7xl text-navy opacity-[0.08]"
                >
                  {s.num}
                </span>
                <div className="relative">
                  <s.icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-navy"
                    aria-hidden
                  />
                  <h3 className="heading mt-5 text-2xl">{s.title}</h3>
                  <p className="mt-3 font-body text-[15px] text-text-secondary">
                    {s.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
