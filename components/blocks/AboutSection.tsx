import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { LineReveal } from "@/components/ui/LineReveal";
import { Parallax } from "@/components/ui/Parallax";

/* ──────────────────────────────────────────────────────────────────
   Acte 7 — L'humain derrière l'IA.
   Le portrait vit sur un plan différent du texte (parallaxe douce), et
   le mot du fondateur se dit phrase par phrase, comme une voix.
   ────────────────────────────────────────────────────────────────── */

const VALUES = [
  { label: "Ancrés en région", body: "Basés à Montpellier, proches de nos clients du Sud de la France. Disponibles, réactifs, présents." },
  { label: "Simple et clair", body: "Pas de jargon, pas d'usine à gaz. Des solutions qui marchent, que vous comprenez et gardez sous contrôle." },
  { label: "Pédagogie", body: "On explique, on accompagne, on vous fait monter en compétences. L'IA reste un outil, vous gardez la main." },
];

const QUOTE =
  "Avant de créer cette agence, j'ai implémenté l'IA dans ma propre entreprise de location de yachts. Un an plus tard : plus de chiffre d'affaires, plus de temps, de meilleures prestations. Ma conviction : l'IA doit servir votre entreprise, pour que vous passiez votre temps sur le cœur de votre métier, pas sur les tâches annexes.";

const BLOB =
  "polygon(50.00% 0.00%, 59.35% 9.05%, 71.69% 4.95%, 76.19% 17.16%, 89.09% 18.83%, 87.84% 31.78%, 98.75% 38.87%, 92.00% 50.00%, 98.75% 61.13%, 87.84% 68.22%, 89.09% 81.17%, 76.19% 82.84%, 71.69% 95.05%, 59.35% 90.95%, 50.00% 100.00%, 40.65% 90.95%, 28.31% 95.05%, 23.81% 82.84%, 10.91% 81.17%, 12.16% 68.22%, 1.25% 61.13%, 8.00% 50.00%, 1.25% 38.87%, 12.16% 31.78%, 10.91% 18.83%, 23.81% 17.16%, 28.31% 4.95%, 40.65% 9.05%)";

export function AboutSection() {
  return (
    <section id="apropos" className="overflow-hidden py-28 sm:py-36" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-32">
          <ScrollReveal>
            <p className="section-label">À propos de Luma</p>
            <WordReveal
              text="L'humain derrière l'IA."
              as="h2"
              className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl"
              style={{ color: "#111111" }}
              delay={0.05}
            />
            <p className="mt-8 font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
              Luma est une agence IA artisanale. On ne vend pas de produits sur étagère : on construit, pour chaque client,
              des outils qui ressemblent à son métier.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.45)" }}>
              Notre conviction : la meilleure technologie est celle qui se fait oublier. Elle vous libère du temps, sans
              vous compliquer la vie.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.45)" }}>
              Montpellier · Sud de la France
            </p>
          </ScrollReveal>

          <div>
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 90}>
                <div
                  className="py-8"
                  style={{
                    borderTop: "1px solid rgba(17,17,17,0.10)",
                    borderBottom: i === VALUES.length - 1 ? "1px solid rgba(17,17,17,0.10)" : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-body text-xl font-bold tracking-[-0.01em]" style={{ color: "#111111" }}>
                        {v.label}
                      </h3>
                      <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
                        {v.body}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.1em]" style={{ color: "rgba(17,17,17,0.25)" }}>
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Le mot du fondateur */}
        <ScrollReveal delay={100} className="mt-24">
          <div
            className="relative grid gap-10 overflow-hidden rounded-[28px] p-8 sm:grid-cols-[auto,1fr] sm:items-center sm:p-10 lg:gap-16 lg:p-14"
            style={{ background: "#111111" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
              style={{ background: "#1A3BFF" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 select-none font-serif text-[14rem] leading-none"
              style={{ color: "rgba(255,255,255,0.05)" }}
            >
              “
            </span>

            <div className="relative mx-auto sm:mx-0">
              <Parallax speed={22}>
                <div className="relative h-44 w-44 shrink-0 sm:h-52 sm:w-52" style={{ clipPath: BLOB, background: "rgba(255,255,255,0.08)" }}>
                  <Image src="/team/robin.jpeg" alt="Robin, fondateur de Luma" fill sizes="208px" className="object-cover" style={{ clipPath: BLOB }} />
                </div>
              </Parallax>
              <p className="mt-5 text-center font-body text-xl font-black tracking-[-0.02em] sm:text-left" style={{ color: "#ffffff" }}>
                Robin
              </p>
              <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] sm:text-left" style={{ color: "rgba(255,255,255,0.45)" }}>
                Fondateur de Luma
              </p>
            </div>

            <div className="relative">
              <p className="section-label" style={{ color: "#7C97FF" }}>
                Le mot du fondateur
              </p>
              <LineReveal
                as="blockquote"
                text={QUOTE}
                className="mt-5 font-serif text-[1.35rem] font-medium italic leading-[1.4] sm:text-2xl"
                style={{ color: "rgba(255,255,255,0.88)" }}
                delay={0.1}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
