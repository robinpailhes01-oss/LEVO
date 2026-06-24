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
        {/* Header */}
        <ScrollReveal className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Cas client</p>
            <h2
              className="heading mt-5 text-4xl sm:text-5xl"
              style={{ color: "#f8f4ed" }}
            >
              Harmonie Yacht
              <br />&amp; l&apos;agent Léa
            </h2>
          </div>
          <div className="flex gap-10">
            {kpis.map((k) => (
              <div key={k.label}>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: "#f8f4ed" }}
                >
                  {k.value}
                </p>
                <p className="mt-0.5 font-body text-xs" style={{ color: "rgba(248,244,237,0.40)" }}>
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="overflow-hidden rounded-[24px]"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="grid lg:grid-cols-2">
              {/* Story */}
              <div
                className="p-10 sm:p-14"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: "rgba(248,244,237,0.60)" }}
                >
                  Pour une société de location de yachts, nous avons conçu{" "}
                  <strong style={{ color: "#f8f4ed", fontWeight: 600 }}>Léa</strong>,
                  une assistante virtuelle qui pré-qualifie chaque demande, prépare les
                  devis et relance les prospects au bon moment — sans aucune intervention humaine.
                </p>
                <p
                  className="mt-5 font-body text-base leading-relaxed"
                  style={{ color: "rgba(248,244,237,0.60)" }}
                >
                  L&apos;équipe se concentre désormais sur la relation client et
                  les visites. L&apos;administratif avance tout seul.
                </p>

                <blockquote
                  className="mt-10 pl-6"
                  style={{ borderLeft: "2px solid #005fff" }}
                >
                  <p
                    className="font-display text-xl italic leading-snug"
                    style={{ color: "#f8f4ed" }}
                  >
                    « Moins de demandes oubliées, plus de temps pour nos clients. »
                  </p>
                  <footer className="mt-3 font-body text-sm" style={{ color: "rgba(248,244,237,0.40)" }}>
                    — Camille R., Direction Harmonie Yacht
                  </footer>
                </blockquote>

                <div className="mt-10 flex flex-wrap gap-2">
                  {["Next.js", "Supabase", "n8n", "Claude API"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-4 py-1.5 font-body text-xs"
                      style={{
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(248,244,237,0.50)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div
                className="relative overflow-hidden p-10 sm:p-14"
                style={{ background: "#0a1628" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #005FFF, transparent 70%)" }}
                />
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(248,244,237,0.35)" }}
                >
                  Ce que Léa fait au quotidien
                </p>
                <ul className="mt-8 space-y-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                        style={{
                          border: "1px solid rgba(0,95,255,0.30)",
                          background: "rgba(0,95,255,0.10)",
                        }}
                      >
                        <Check size={11} strokeWidth={2.5} style={{ color: "#4d8fff" }} aria-hidden />
                      </span>
                      <span
                        className="font-body text-[15px] leading-relaxed"
                        style={{ color: "rgba(248,244,237,0.65)" }}
                      >
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
