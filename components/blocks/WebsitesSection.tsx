import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Site {
  name: string;
  description: string;
  accent: string;
  image: string; // capture d'écran dans /public/sites/
}

const SITES: Site[] = [
  {
    name: "Harmonie Yacht",
    description: "Dashboard de gestion : réservations, finances et agent Léa en temps réel.",
    accent: "#1A3BFF",
    image: "/sites/harmonie-yacht.png",
  },
  {
    name: "Énergies Concept",
    description: "Dashboard de prospection solaire par IA et analyse satellite des toitures.",
    accent: "#F97316",
    image: "/sites/energies-concept.png",
  },
  {
    name: "Love Explorer",
    description: "Conciergerie romantique avec Kia, l'agent IA de réservation.",
    accent: "#E84393",
    image: "/sites/love-explorer.png",
  },
];

export function WebsitesSection() {
  return (
    <section id="sites" className="py-24 sm:py-28" style={{ background: "#eceae4" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-12">
          <p className="section-label">Nos sites internet</p>
          <h2
            className="mt-6 max-w-2xl font-body text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl"
            style={{ color: "#111111" }}
          >
            On construit aussi les interfaces qui pilotent tout ça
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {SITES.map((site, i) => (
            <ScrollReveal key={site.name} delay={i * 80} className="h-full">
              <div
                className="flex h-full flex-col overflow-hidden rounded-[18px]"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17,17,17,0.08)",
                  boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                {/* Mini browser chrome (décoratif, aucun lien) */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: "#f4f3ef", borderBottom: "1px solid rgba(17,17,17,0.06)" }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
                </div>

                {/* Capture d'écran */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 10", background: "#f0ede6" }}
                >
                  <Image
                    src={site.image}
                    alt={`Aperçu du site ${site.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* Bandeau accent */}
                <div className="h-1.5 w-full" style={{ background: site.accent }} />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-body text-lg font-bold" style={{ color: "#111111" }}>
                    {site.name}
                  </h3>
                  <p
                    className="mt-2 font-body text-[14px] leading-relaxed"
                    style={{ color: "rgba(17,17,17,0.55)" }}
                  >
                    {site.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
