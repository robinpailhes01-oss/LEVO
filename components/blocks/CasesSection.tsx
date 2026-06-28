import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const features = [
  "Pré-qualification des demandes (budget, dates, type de yacht)",
  "Envoi automatique des devis via n8n en moins de 2 minutes",
  "Relances intelligentes à J+2 et J+7 sans réponse",
  "Dashboard de suivi des demandes en temps réel",
];

const kpis = [
  { value: "40h+", label: "économisées/mois" },
  { value: "3x", label: "plus de devis envoyés" },
  { value: "0", label: "demande oubliée" },
];

export function CasesSection() {
  return (
    <section id="cas" className="py-28 sm:py-36" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16">
          <p className="section-label">Cas client</p>
          <WordReveal
            text="Harmonie Yacht & l'agent Léa"
            as="h2"
            className="heading mt-6 text-4xl sm:text-5xl"
            style={{ color: "#111111" }}
            delay={0.05}
          />
        </ScrollReveal>

        {/* KPI strip */}
        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap gap-12">
            {kpis.map((k) => (
              <div key={k.label}>
                <p className="font-display text-4xl font-bold tracking-[-0.03em]" style={{ color: "#111111" }}>
                  <AnimatedCounter value={k.value} />
                </p>
                <p className="mt-1 font-body text-sm" style={{ color: "rgba(17,17,17,0.45)" }}>{k.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-hidden rounded-[20px]" style={{ border: "1px solid rgba(17,17,17,0.10)" }}>
            <div className="grid lg:grid-cols-2">
              {/* Story */}
              <div className="p-10 sm:p-14" style={{ background: "#ffffff", borderRight: "1px solid rgba(17,17,17,0.10)" }}>
                <p className="font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
                  Pour une société de location de yachts, nous avons conçu{" "}
                  <strong style={{ color: "#111111" }}>Léa</strong>, une assistante virtuelle
                  qui pré-qualifie chaque demande, prépare les devis et relance les prospects
                  au bon moment — sans aucune intervention humaine.
                </p>
                <p className="mt-5 font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
                  L&apos;équipe se concentre désormais sur la relation client et les visites.
                  L&apos;administratif avance tout seul.
                </p>

                <blockquote className="mt-10 pl-5" style={{ borderLeft: "2px solid #111111" }}>
                  <p className="font-display text-xl italic leading-snug" style={{ color: "#111111" }}>
                    « Moins de demandes oubliées, plus de temps pour nos clients. »
                  </p>
                  <footer className="mt-3 font-body text-sm" style={{ color: "rgba(17,17,17,0.40)" }}>
                    — Camille R., Direction Harmonie Yacht
                  </footer>
                </blockquote>

                <div className="mt-10 flex flex-wrap gap-2">
                  {["Next.js", "Supabase", "n8n", "Claude API"].map((t) => (
                    <span key={t} className="rounded-full px-4 py-1.5 font-body text-xs" style={{ border: "1px solid rgba(17,17,17,0.12)", color: "rgba(17,17,17,0.55)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="p-10 sm:p-14" style={{ background: "#f0ede6" }}>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(17,17,17,0.40)" }}>
                  Ce que Léa fait au quotidien
                </p>
                <ul className="mt-8 space-y-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full" style={{ border: "1px solid rgba(17,17,17,0.20)", background: "#ffffff" }}>
                        <Check size={11} strokeWidth={2.5} style={{ color: "#111111" }} />
                      </span>
                      <span className="font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
