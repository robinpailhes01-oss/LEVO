import { Check, TrendingUp, Clock, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  "Pré-qualification des demandes (budget, dates, type de yacht)",
  "Envoi automatique des devis via n8n en moins de 2 minutes",
  "Relances intelligentes à J+2 et J+7 sans réponse",
  "Dashboard de suivi des demandes en temps réel",
];

const kpis = [
  { icon: Clock, value: "40h+", label: "Économisées par mois" },
  { icon: TrendingUp, value: "3×", label: "Plus de devis envoyés" },
  { icon: Users, value: "0", label: "Demande oubliée" },
];

export function CasesSection() {
  return (
    <section id="cas" className="py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Cas client</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Harmonie Yacht &amp; l&apos;agent Léa
          </h2>
          <p className="mt-5 font-body text-lg text-text-secondary">
            Comment une société de location de yachts a automatisé sa gestion client
            et économisé 40 heures par mois.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-[0_8px_40px_rgba(11,31,74,0.06)]">
            {/* Top KPI bar */}
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-cream-dark">
              {kpis.map((k) => (
                <div key={k.label} className="flex flex-col items-center py-7 text-center">
                  <k.icon size={18} strokeWidth={1.5} className="text-electric" aria-hidden />
                  <p className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
                    {k.value}
                  </p>
                  <p className="mt-1 font-body text-xs text-text-muted">{k.label}</p>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
              {/* Narrative */}
              <div className="border-b border-border p-8 lg:border-b-0 lg:border-r sm:p-10">
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  Pour une société de location de yachts, nous avons conçu{" "}
                  <span className="font-semibold text-navy">Léa</span>, une
                  assistante virtuelle qui pré-qualifie chaque demande, prépare les
                  devis et relance les prospects au bon moment — sans aucune intervention
                  humaine.
                </p>
                <p className="mt-5 font-body text-base leading-relaxed text-text-secondary">
                  L&apos;équipe se concentre désormais sur la relation client et les
                  visites, pendant que l&apos;administratif avance tout seul.
                </p>
                <blockquote className="mt-8 border-l-2 border-electric pl-5">
                  <p className="font-display text-xl italic leading-snug text-navy">
                    « Moins de demandes oubliées, plus de temps pour nos clients. »
                  </p>
                  <footer className="mt-3 font-body text-sm text-text-muted">
                    — Camille R., Direction Harmonie Yacht
                  </footer>
                </blockquote>
              </div>

              {/* Features on navy */}
              <div className="bg-navy p-8 sm:p-10">
                <p className="font-body text-xs uppercase tracking-[0.12em] text-cream/50">
                  Ce que Léa fait au quotidien
                </p>
                <ul className="mt-7 space-y-5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-electric/20">
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="text-electric-light"
                          aria-hidden
                        />
                      </span>
                      <span className="font-body text-sm leading-relaxed text-cream/80">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-[12px] border border-cream/10 bg-cream/5 p-4">
                  <p className="font-body text-xs text-cream/50">Stack utilisée</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Next.js", "Supabase", "n8n", "Claude API"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-cream/20 px-3 py-1 font-body text-xs text-cream/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
