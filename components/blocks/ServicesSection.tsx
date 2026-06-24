import { Bot, Workflow, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const services = [
  {
    icon: Bot,
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
  },
  {
    icon: Workflow,
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils avec n8n pour que les tâches répétitives se fassent toutes seules.",
  },
  {
    icon: LineChart,
    title: "Tableaux de bord & suivi",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-28">
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <Card className="h-full">
                <s.icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-electric"
                  aria-hidden
                />
                <h3 className="heading mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 font-body text-base text-text-secondary">
                  {s.description}
                </p>
                <Link
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-electric transition-colors hover:text-navy"
                >
                  En savoir plus
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
