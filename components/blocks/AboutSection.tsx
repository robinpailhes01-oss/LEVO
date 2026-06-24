import { MapPin, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    icon: MapPin,
    title: "Ancrés en région",
    description:
      "Basés à Montpellier, proches de nos clients du Sud de la France. Disponibles, réactifs, humains.",
  },
  {
    icon: Sparkles,
    title: "Excellence discrète",
    description:
      "La qualité se voit dans les détails, pas dans les grandes déclarations. On soigne chaque solution.",
  },
  {
    icon: Heart,
    title: "Pédagogie",
    description:
      "On explique, on accompagne, on vous fait monter en compétences. L'IA reste un outil, vous gardez la main.",
  },
];

export function AboutSection() {
  return (
    <section id="apropos" className="bg-cream-dark py-24 sm:py-28">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="label">À propos</p>
            <h2 className="heading mt-4 text-4xl sm:text-5xl">
              L&apos;humain derrière l&apos;IA
            </h2>
            <p className="mt-6 font-body text-lg text-text-secondary">
              Levo est une agence IA artisanale. On ne vend pas de produits sur
              étagère : on construit, pour chaque client, des outils qui
              ressemblent à son métier.
            </p>
            <p className="mt-4 font-body text-base text-text-secondary">
              Notre conviction : la meilleure technologie est celle qui se fait
              oublier. Elle vous libère du temps, sans vous compliquer la vie.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-1">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="flex gap-5 rounded-[16px] border border-border bg-white p-6">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[12px] bg-cream-dark">
                    <v.icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-navy"
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="heading text-xl">{v.title}</h3>
                    <p className="mt-1.5 font-body text-[15px] text-text-secondary">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
