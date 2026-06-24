import { ScrollReveal } from "@/components/ui/ScrollReveal";

const values = [
  {
    label: "Ancrés en région",
    body: "Basés à Montpellier, proches de nos clients du Sud de la France. Disponibles, réactifs, présents.",
  },
  {
    label: "Excellence discrète",
    body: "La qualité se voit dans les détails, pas dans les grandes déclarations. On soigne chaque solution.",
  },
  {
    label: "Pédagogie",
    body: "On explique, on accompagne, on vous fait monter en compétences. L'IA reste un outil, vous gardez la main.",
  },
];

export function AboutSection() {
  return (
    <section
      id="apropos"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "#0d1b35" }}
    >
      {/* Mesh blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="blob blob-2 absolute -left-24 top-0 h-[500px] w-[500px] opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #005FFF, transparent 65%)" }}
        />
        <div
          className="blob blob-3 absolute bottom-0 right-0 h-[400px] w-[400px] opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #00c2ff, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <ScrollReveal>
            <p className="section-label">À propos de Levo</p>
            <h2
              className="mt-5 font-display text-4xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#f8f4ed" }}
            >
              L&apos;humain
              <br />derrière l&apos;IA
            </h2>
            <p
              className="mt-8 font-body text-lg leading-relaxed"
              style={{ color: "rgba(248,244,237,0.55)" }}
            >
              Levo est une agence IA artisanale. On ne vend pas de produits sur
              étagère : on construit, pour chaque client, des outils qui
              ressemblent à son métier.
            </p>
            <p
              className="mt-5 font-body text-base leading-relaxed"
              style={{ color: "rgba(248,244,237,0.40)" }}
            >
              Notre conviction : la meilleure technologie est celle qui se fait
              oublier. Elle vous libère du temps, sans vous compliquer la vie.
            </p>
            <div
              className="mt-12 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4d8fff" }} />
              <span className="font-body text-sm" style={{ color: "rgba(248,244,237,0.45)" }}>
                Montpellier, Sud de la France
              </span>
            </div>
          </ScrollReveal>

          <div>
            {values.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 100}>
                <div
                  className="group py-8"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: i === values.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="font-display text-xl font-semibold"
                        style={{ color: "#f8f4ed" }}
                      >
                        {v.label}
                      </h3>
                      <p
                        className="mt-3 font-body text-[15px] leading-relaxed transition-colors duration-300"
                        style={{ color: "rgba(248,244,237,0.45)" }}
                      >
                        {v.body}
                      </p>
                    </div>
                    <span
                      className="mt-0.5 shrink-0 font-display text-sm font-bold"
                      style={{ color: "rgba(248,244,237,0.15)" }}
                    >
                      0{i + 1}
                    </span>
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
