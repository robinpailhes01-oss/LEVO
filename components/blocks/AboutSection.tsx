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
    <section id="apropos" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,247,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,240,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #005FFF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="label-light" style={{ color: "rgba(250,247,240,0.5)", letterSpacing: "0.12em", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", fontFamily: "var(--font-body)" }}>À propos de Levo</p>
            <h2
              className="mt-5 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl"
            >
              L&apos;humain derrière l&apos;IA
            </h2>
            <p className="mt-7 font-body text-lg leading-relaxed text-cream/70">
              Levo est une agence IA artisanale. On ne vend pas de produits sur
              étagère : on construit, pour chaque client, des outils qui
              ressemblent à son métier.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-cream/60">
              Notre conviction : la meilleure technologie est celle qui se fait
              oublier. Elle vous libère du temps, sans vous compliquer la vie. Chaque
              solution est pensée avec soin, livrée avec un accompagnement, et faite
              pour durer.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 px-5 py-3 backdrop-blur-sm">
              <MapPin size={15} strokeWidth={1.5} className="text-electric-light" aria-hidden />
              <span className="font-body text-sm text-cream/70">Montpellier, Sud de la France</span>
            </div>
          </Reveal>

          <div className="space-y-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group flex gap-5 rounded-[16px] border border-cream/10 bg-cream/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-cream/20 hover:bg-cream/10">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] border border-cream/15 bg-cream/10">
                    <v.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-cream/70 transition-colors group-hover:text-electric-light"
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-cream">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 font-body text-[15px] leading-relaxed text-cream/60">
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
