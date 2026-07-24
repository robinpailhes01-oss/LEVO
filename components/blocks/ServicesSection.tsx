import { Bot, Workflow, LineChart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description: "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    tag: "Répond à votre place",
    accent: "#1A3BFF",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description: "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    tag: "Zéro tâche manuelle",
    accent: "#1A7F37",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord",
    description: "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    tag: "Suivi en temps réel",
    accent: "#B8860B",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-12">
          <p className="section-label">Notre approche</p>
          <WordReveal
            text="Un écosystème automatisé, propre à votre entreprise"
            as="h2"
            className="heading mt-6 max-w-2xl text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
          <p
            className="mt-6 max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "rgba(17,17,17,0.60)" }}
          >
            On ne vend pas des outils sur étagère. On construit, pour chaque client, un
            écosystème sur-mesure où vos agents, vos automatisations et vos données
            travaillent ensemble — façonné autour de votre métier, pas l&apos;inverse.
          </p>
        </ScrollReveal>

        <p
          className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: "rgba(17,17,17,0.40)" }}
        >
          Quelques briques que l&apos;on assemble
        </p>

        <ul aria-label="Exemples de briques de l'écosystème" className="grid list-none gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 80} as="li" className="h-full">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17,17,17,0.08)",
                  boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                {/* Lueur d'accent en fond */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: s.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${s.accent}14` }}
                  >
                    <s.icon size={22} strokeWidth={1.8} style={{ color: s.accent }} aria-hidden />
                  </div>
                  <span className="font-body text-xs font-bold tracking-[0.12em]" style={{ color: "rgba(17,17,17,0.20)" }}>
                    {s.num}
                  </span>
                </div>

                <h3 className="relative mt-7 font-body text-xl font-bold leading-snug tracking-[-0.01em]" style={{ color: "#111111" }}>
                  {s.title}
                </h3>
                <p className="relative mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                  {s.description}
                </p>

                {/* Tag */}
                <span
                  className="relative mt-7 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold"
                  style={{ background: `${s.accent}14`, color: s.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                  {s.tag}
                </span>
              </article>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
