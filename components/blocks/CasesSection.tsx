import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  "Pré-qualification des demandes (budget, dates, type de yacht)",
  "Envoi automatique des devis via n8n en moins de 2 minutes",
  "Relances intelligentes à J+2 et J+7 sans réponse",
  "Dashboard de suivi des demandes en temps réel",
];

const kpis = [
  { value: "40h+", label: "économisées/mois" },
  { value: "3×", label: "plus de devis envoyés" },
  { value: "0", label: "demande oubliée" },
];

export function CasesSection() {
  return (
    <section id="cas" className="py-28 sm:py-36">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">Cas client</p>
            <h2 className="heading mt-5 text-4xl sm:text-5xl">
              Harmonie Yacht
              <br />&amp; l&apos;agent Léa
            </h2>
          </div>
          <div className="flex gap-10">
            {kpis.map((k) => (
              <div key={k.label}>
                <p className="font-display text-3xl font-bold text-navy">{k.value}</p>
                <p className="mt-0.5 font-body text-xs text-text-muted">{k.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-hidden rounded-[24px] border border-border">
            <div className="grid lg:grid-cols-2">
              {/* Story */}
              <div className="p-10 sm:p-14">
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  Pour une société de location de yachts, nous avons conçu{" "}
                  <strong className="font-semibold text-navy">Léa</strong>,
                  une assistante virtuelle qui pré-qualifie chaque demande, prépare
                  les devis et relance les prospects au bon moment — sans aucune
                  intervention humaine.
                </p>
                <p className="mt-5 font-body text-base leading-relaxed text-text-secondary">
                  L&apos;équipe se concentre désormais sur la relation client et
                  les visites. L&apos;administratif avance tout seul.
                </p>

                <blockquote className="mt-10 border-l-2 border-electric pl-6">
                  <p className="font-display text-xl italic leading-snug text-navy">
                    « Moins de demandes oubliées, plus de temps pour nos clients. »
                  </p>
                  <footer className="mt-3 font-body text-sm text-text-muted">
                    — Camille R., Direction Harmonie Yacht
                  </footer>
                </blockquote>

                <div className="mt-10 flex flex-wrap gap-2">
                  {["Next.js", "Supabase", "n8n", "Claude API"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-cream px-4 py-1.5 font-body text-xs text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features — navy */}
              <div className="relative overflow-hidden bg-navy p-10 sm:p-14">
                {/* Subtle glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #005FFF, transparent 70%)" }}
                />

                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/40">
                  Ce que Léa fait au quotidien
                </p>
                <ul className="mt-8 space-y-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-electric/30 bg-electric/10">
                        <Check size={11} strokeWidth={2.5} className="text-electric-light" aria-hidden />
                      </span>
                      <span className="font-body text-[15px] leading-relaxed text-cream/75">
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
