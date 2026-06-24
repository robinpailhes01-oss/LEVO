import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  "Pré-qualification des demandes (budget, dates, type de yacht)",
  "Envoi automatique des devis via n8n",
  "Relances intelligentes à J+2 et J+7 sans réponse",
  "Dashboard de suivi des demandes en temps réel",
];

export function CasesSection() {
  return (
    <section id="cas" className="py-24 sm:py-28">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="label">Cas client</p>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">
            Harmonie Yacht & l&apos;agent Léa
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Narrative card */}
            <div className="rounded-[16px] border border-border bg-white p-8 shadow-sm sm:p-10">
              <p className="font-body text-base text-text-secondary">
                Pour une société de location de yachts, nous avons conçu{" "}
                <span className="font-semibold text-navy">Léa</span>, une
                assistante virtuelle qui pré-qualifie chaque demande, prépare les
                devis et relance les prospects au bon moment.
              </p>
              <p className="mt-5 font-body text-base text-text-secondary">
                Résultat : l&apos;équipe se concentre sur la relation client et
                les visites, pendant que l&apos;administratif avance tout seul.
              </p>
              <p className="mt-8 font-display text-2xl italic text-navy">
                « Moins de demandes oubliées, plus de temps pour nos clients. »
              </p>
            </div>

            {/* Features list on navy */}
            <div className="overflow-hidden rounded-[16px] bg-navy p-8 sm:p-10">
              <span className="font-body text-xs uppercase tracking-[0.12em] text-cream/60">
                Ce que Léa fait au quotidien
              </span>
              <ul className="mt-7 space-y-5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-electric/15">
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="text-electric-light"
                        aria-hidden
                      />
                    </span>
                    <span className="font-body text-[15px] leading-relaxed text-cream/90">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
