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
        <ScrollReveal className="mb-20">
          <p className="section-label">Ce qu&apos;on construit</p>
          <h2
            className="heading mt-5 max-w-xl text-4xl sm:text-5xl"
            style={{ color: "#f8f4ed" }}
          >
            Des outils pensés
            <br />autour de vous
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div
                className="glass-card group relative h-full overflow-hidden p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Number watermark */}
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 select-none font-display text-[9rem] font-bold leading-none"
                  style={{ color: "rgba(255,255,255,0.04)" }}
                >
                  {s.num}
                </span>

                {/* Tag */}
                <span
                  className="inline-block rounded-full px-3 py-1 font-body text-[11px] font-medium"
                  style={{
                    border: "1px solid rgba(77,143,255,0.2)",
                    background: "rgba(0,95,255,0.06)",
                    color: "rgba(77,143,255,0.8)",
                  }}
                >
                  {s.tag}
                </span>

                {/* Icon */}
                <div
                  className="mt-6 flex h-11 w-11 items-center justify-center rounded-[10px] transition-colors duration-300"
                  style={{ background: "rgba(0,95,255,0.10)" }}
                >
                  <s.icon size={20} strokeWidth={1.5} style={{ color: "#4d8fff" }} aria-hidden />
                </div>

                <h3
                  className="heading relative mt-6 text-[1.35rem] font-semibold"
                  style={{ color: "#f8f4ed" }}
                >
                  {s.title}
                </h3>
                <p
                  className="relative mt-3 font-body text-[15px] leading-relaxed"
                  style={{ color: "rgba(248,244,237,0.55)" }}
                >
                  {s.description}
                </p>

                {/* Bottom electric line on hover */}
                <div
                  className="mt-8 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg, transparent, #005fff, transparent)" }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
