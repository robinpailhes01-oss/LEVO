import { Globe, MessageCircle, Settings2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const formations = [
  {
    icon: Globe,
    title: "Créer des sites personnalisés et référencer SEO",
    description:
      "Apprenez à concevoir des sites web sur-mesure et à les positionner sur Google : structure, contenu, optimisation technique — de la conception au référencement naturel.",
    tag: "Sites web & SEO",
    accent: "#1A3BFF",
  },
  {
    icon: MessageCircle,
    title: "Créer son propre agent IA WhatsApp avec son CRM perso",
    description:
      "Construisez votre agent IA connecté à WhatsApp, capable de répondre à vos clients et de tout centraliser dans votre propre CRM — de A à Z, sans dépendre d'un outil tiers.",
    tag: "Agent IA & CRM",
    accent: "#1A7F37",
  },
  {
    icon: Settings2,
    title: "Consulting privé pour créer son infrastructure IA sur-mesure",
    description:
      "Accompagnement individuel pour concevoir l'écosystème IA de votre entreprise : agents, automatisations, données — pensé spécifiquement pour votre activité.",
    tag: "Accompagnement privé",
    accent: "#B8860B",
  },
];

export function FormationsSection() {
  return (
    <section id="formations" className="py-28 sm:py-36" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label">Formations</p>
          <WordReveal
            text="Apprenez à construire votre propre IA"
            as="h2"
            className="heading mt-6 max-w-2xl text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
          <p
            className="mt-6 max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "rgba(17,17,17,0.60)" }}
          >
            Des formations à venir pour prendre en main l&apos;IA vous-même — de la
            création de sites au consulting privé sur-mesure.
          </p>
        </ScrollReveal>

        <ul aria-label="Formations à venir" className="grid list-none gap-5 md:grid-cols-3">
          {formations.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80} as="li" className="h-full">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17,17,17,0.08)",
                  boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: f.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${f.accent}14` }}
                  >
                    <f.icon size={22} strokeWidth={1.8} style={{ color: f.accent }} aria-hidden />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: "rgba(17,17,17,0.05)", color: "rgba(17,17,17,0.45)" }}
                  >
                    Bientôt
                  </span>
                </div>

                <h3 className="relative mt-7 font-body text-xl font-bold leading-snug tracking-[-0.01em]" style={{ color: "#111111" }}>
                  {f.title}
                </h3>
                <p className="relative mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                  {f.description}
                </p>

                <span
                  className="relative mt-7 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold"
                  style={{ background: `${f.accent}14`, color: f.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.accent }} />
                  {f.tag}
                </span>
              </article>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
