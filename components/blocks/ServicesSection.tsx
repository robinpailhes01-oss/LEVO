import { Bot, Workflow, LineChart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    tag: "IA conversationnelle",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    tag: "n8n · Zapier",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    tag: "Supabase · Next.js",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 sm:py-36">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <p className="label">Ce qu&apos;on construit</p>
          <h2 className="heading mt-5 max-w-xl text-4xl sm:text-5xl">
            Des outils pensés
            <br />autour de vous
          </h2>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-[20px] border border-border bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-navy/20 hover:shadow-[0_24px_64px_rgba(11,31,74,0.09)]">
                {/* Number bg */}
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 select-none font-display text-[9rem] font-bold leading-none text-navy opacity-[0.035] transition-opacity duration-500 group-hover:opacity-[0.06]"
                >
                  {s.num}
                </span>

                {/* Tag */}
                <span className="inline-block rounded-full border border-border px-3 py-1 font-body text-[11px] font-medium text-text-muted">
                  {s.tag}
                </span>

                {/* Icon */}
                <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-[10px] bg-navy/5 transition-colors duration-300 group-hover:bg-electric/10">
                  <s.icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-navy/60 transition-colors duration-300 group-hover:text-electric"
                    aria-hidden
                  />
                </div>

                <h3 className="heading relative mt-6 text-[1.35rem] font-semibold">
                  {s.title}
                </h3>
                <p className="relative mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  {s.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-8 h-px bg-gradient-to-r from-electric/0 via-electric/40 to-electric/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
