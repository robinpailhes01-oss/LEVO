import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const values = [
  { label: "Ancrés en région", body: "Basés à Montpellier, proches de nos clients du Sud de la France. Disponibles, réactifs, présents." },
  { label: "Simple et clair", body: "Pas de jargon, pas d'usine à gaz. Des solutions qui marchent, que vous comprenez et gardez sous contrôle." },
  { label: "Pédagogie", body: "On explique, on accompagne, on vous fait monter en compétences. L'IA reste un outil, vous gardez la main." },
];

export function AboutSection() {
  return (
    <section id="apropos" className="py-28 sm:py-36" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <ScrollReveal>
            <p className="section-label">À propos de Luma</p>
            <WordReveal
              text="L'humain derrière l'IA"
              as="h2"
              className="mt-6 font-display text-4xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#111111" }}
              delay={0.05}
            />
            <p className="mt-8 font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
              Luma est une agence IA artisanale. On ne vend pas de produits sur étagère :
              on construit, pour chaque client, des outils qui ressemblent à son métier.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.45)" }}>
              Notre conviction : la meilleure technologie est celle qui se fait oublier.
              Elle vous libère du temps, sans vous compliquer la vie.
            </p>
            {/* Fondateur */}
            <div
              className="mt-10 flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold text-white"
                style={{ background: "#111111" }}
              >
                R
              </span>
              <div>
                <p className="font-body text-sm font-semibold" style={{ color: "#111111" }}>
                  Robin — Fondateur
                </p>
                <p className="mt-1.5 font-body text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
                  Avant de lancer Luma, Robin a implémenté l&apos;IA dans sa propre société de
                  location de yachts, Harmonie Yacht. Il n&apos;installe rien qu&apos;il n&apos;ait
                  d&apos;abord éprouvé chez lui.
                </p>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full" style={{ background: "rgba(17,17,17,0.40)" }} />
              <span className="font-body text-sm" style={{ color: "rgba(17,17,17,0.45)" }}>Montpellier, Sud de la France</span>
            </div>
          </ScrollReveal>

          <div>
            {values.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 80}>
                <div
                  className="py-8"
                  style={{
                    borderTop: "1px solid rgba(17,17,17,0.10)",
                    borderBottom: i === values.length - 1 ? "1px solid rgba(17,17,17,0.10)" : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold" style={{ color: "#111111" }}>{v.label}</h3>
                      <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>{v.body}</p>
                    </div>
                    <span className="shrink-0 font-body text-xs font-semibold" style={{ color: "rgba(17,17,17,0.20)" }}>0{i + 1}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
