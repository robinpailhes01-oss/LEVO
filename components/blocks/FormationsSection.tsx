import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const formations = [
  {
    num: "01",
    title: "Créer son agent IA WhatsApp et personnaliser son entreprise",
    description:
      "Construisez votre agent IA connecté à WhatsApp, capable de répondre à vos clients et de tout centraliser dans votre propre CRM — de A à Z, sans dépendre d'un outil tiers.",
    format: "Formation guidée",
    duration: "À votre rythme",
    accent: "#1A3BFF",
    status: "open" as const,
    href: "/formations/agent-whatsapp",
  },
  {
    num: "02",
    title: "Créer des sites personnalisés et référencer SEO",
    description:
      "Apprenez à concevoir des sites web sur-mesure et à les positionner sur Google : structure, contenu, optimisation technique — de la conception au référencement naturel.",
    format: "Formation guidée",
    duration: "À votre rythme",
    accent: "#7B2FBE",
    status: "soon" as const,
  },
  {
    num: "03",
    title: "Consulting privé pour créer son infrastructure IA sur-mesure",
    description:
      "Accompagnement individuel pour concevoir l'écosystème IA de votre entreprise : agents, automatisations, données — pensé spécifiquement pour votre activité.",
    format: "Accompagnement 1:1",
    duration: "Sur-mesure",
    accent: "#B8860B",
    status: "soon" as const,
  },
];

export function FormationsSection() {
  return (
    <section id="formations" className="py-28 sm:py-36" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>Formations</p>
          <WordReveal
            text="Apprenez à construire votre propre IA"
            as="h2"
            className="heading mt-6 max-w-2xl text-4xl sm:text-5xl"
            style={{ color: "#ffffff" }}
            delay={0.05}
          />
          <p
            className="mt-6 max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Prenez en main l&apos;IA vous-même — de l&apos;agent WhatsApp au
            consulting privé sur-mesure.
          </p>
        </ScrollReveal>

        <ul aria-label="Nos formations" className="grid list-none gap-6 lg:grid-cols-3">
          {formations.map((f, i) => {
            const isOpen = f.status === "open";
            const Card = (
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-300"
                style={{
                  background: "#181818",
                  border: isOpen ? `1px solid ${f.accent}40` : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Grand numéro fantôme en fond — signature éditoriale */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-8 font-display text-[9rem] font-bold leading-none"
                  style={{ color: "rgba(255,255,255,0.04)" }}
                >
                  {f.num}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-[0.14] blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: f.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: isOpen ? `${f.accent}22` : "rgba(255,255,255,0.06)",
                      color: isOpen ? f.accent : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {isOpen ? "Inscriptions ouvertes" : "Bientôt"}
                  </span>
                  {isOpen && (
                    <ArrowUpRight
                      size={20}
                      strokeWidth={2.2}
                      style={{ color: f.accent }}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </div>

                <h3
                  className="relative mt-8 font-body text-2xl font-black leading-[1.1] tracking-[-0.015em]"
                  style={{ color: "#ffffff" }}
                >
                  {f.title}
                </h3>
                <p className="relative mt-4 font-body text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {f.description}
                </p>

                <div
                  className="relative mt-auto flex items-center gap-4 pt-8 font-body text-xs"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.accent }} />
                    {f.format}
                  </span>
                  <span>·</span>
                  <span>{f.duration}</span>
                </div>

                {isOpen && (
                  <span
                    className="relative mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold"
                    style={{ color: "#ffffff" }}
                  >
                    Découvrir la formation →
                  </span>
                )}
              </article>
            );

            return (
              <ScrollReveal key={f.title} delay={i * 80} as="li" className="h-full">
                {isOpen && f.href ? (
                  <Link href={f.href} className="block h-full">
                    {Card}
                  </Link>
                ) : (
                  Card
                )}
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
