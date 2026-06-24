import { Bot, Workflow, LineChart } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    highlight: "Agent Léa pour Harmonie Yacht : +40h économisées/mois",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils avec n8n pour que les tâches répétitives se fassent toutes seules.",
    highlight: "Relances automatiques J+2, J+7 — zéro oubli",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord & suivi",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    highlight: "Vue centralisée de toutes vos données métier",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Ce qu&apos;on construit</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Des outils pensés autour de vous
          </h2>
          <p className="mt-5 font-body text-lg text-text-secondary">
            Trois savoir-faire, une même promesse : vous faire gagner du temps
            sans jamais perdre le contrôle.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-[20px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(11,31,74,0.10)]">
                {/* Electric top border */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Background number */}
                <span
                  aria-hidden
                  className="absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-navy opacity-[0.04] select-none"
                >
                  {s.num}
                </span>

                {/* Icon */}
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-navy/5">
                  <s.icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-electric"
                    aria-hidden
                  />
                </div>

                <h3 className="heading relative mt-6 text-xl">{s.title}</h3>
                <p className="relative mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  {s.description}
                </p>

                {/* Highlight pill */}
                <div className="relative mt-6 rounded-[8px] bg-cream px-3 py-2">
                  <p className="font-body text-xs font-medium text-navy/70">
                    → {s.highlight}
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
