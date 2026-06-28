import { Bot, Workflow, LineChart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "Agents conversationnels",
    description: "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    tag: "IA conversationnelle",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automatisation de workflows",
    description: "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    tag: "n8n · Zapier",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Tableaux de bord",
    description: "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    tag: "Supabase · Next.js",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-20">
          <p className="section-label">Ce qu&apos;on construit</p>
          <WordReveal
            text="Des outils pensés autour de vous"
            as="h2"
            className="heading mt-6 max-w-xl text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
        </ScrollReveal>

        <ul aria-label="Nos services" className="grid gap-px md:grid-cols-3 list-none" style={{ background: "rgba(17,17,17,0.10)" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 80} as="li">
              <article className="group relative h-full overflow-hidden p-10 transition-colors duration-300 hover:bg-white" style={{ background: "#f4f3ef" }}>
                {/* Number */}
                <span className="font-body text-xs font-semibold tracking-[0.12em]" style={{ color: "rgba(17,17,17,0.30)" }}>
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-[10px]" style={{ border: "1px solid rgba(17,17,17,0.12)", background: "#ffffff" }}>
                  <s.icon size={20} strokeWidth={1.5} style={{ color: "#111111" }} aria-hidden />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold leading-snug" style={{ color: "#111111" }}>
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                  {s.description}
                </p>

                {/* Tag */}
                <span className="mt-8 inline-block rounded-full px-3 py-1 font-body text-[11px]" style={{ background: "rgba(17,17,17,0.07)", color: "rgba(17,17,17,0.50)" }}>
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
