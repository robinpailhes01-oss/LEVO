import Image from "next/image";
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

        {/* Le mot du fondateur */}
        <ScrollReveal delay={120} className="mt-20">
          <div
            className="grid gap-8 rounded-[24px] p-8 sm:grid-cols-[auto,1fr] sm:items-center sm:p-10"
            style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
          >
            <div className="mx-auto sm:mx-0">
              <div
                className="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28"
                style={{ border: "1px solid rgba(17,17,17,0.10)" }}
              >
                <Image
                  src="/team/robin.jpeg"
                  alt="Robin, fondateur de Luma"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="section-label">Le mot du fondateur</p>
              <blockquote className="mt-4 font-body text-lg italic leading-relaxed" style={{ color: "rgba(17,17,17,0.75)" }}>
                « Avant de créer cette agence, j&apos;ai moi-même implémenté l&apos;IA dans mon
                entreprise de location de yachts. Résultat, après un an : mon chiffre
                d&apos;affaires a explosé, j&apos;avais plus de temps et je délivrais de
                meilleures prestations. J&apos;ai la conviction que l&apos;IA doit être un outil
                au service de votre entreprise, et que l&apos;objectif est que vous passiez
                tout votre temps à faire le cœur de votre métier — pas les tâches annexes
                trop chronophages. »
              </blockquote>
              <p className="mt-4 font-body text-sm font-semibold" style={{ color: "#111111" }}>
                Robin — Fondateur de Luma
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
