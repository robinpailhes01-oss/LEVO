import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Site {
  name: string;
  description: string;
  accent: string;
  url?: string;
  display: string; // ce qu'on montre dans la barre d'adresse
}

const SITES: Site[] = [
  {
    name: "Harmonie Yacht",
    description: "Dashboard de gestion : réservations, finances et agent Léa en temps réel.",
    accent: "#1A3BFF",
    url: "https://ia-hy-infra-new.vercel.app",
    display: "harmonie-yacht.app",
  },
  {
    name: "Énergies Concept",
    description: "Dashboard de prospection solaire par IA et analyse satellite des toitures.",
    accent: "#F97316",
    url: "https://nergie-concept.vercel.app",
    display: "energies-concept.app",
  },
  {
    name: "Love Explorer",
    description: "Conciergerie romantique avec Kia, l'agent IA de réservation.",
    accent: "#E84393",
    display: "love-explorer.app",
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
          {SITES.map((site, i) => {
            const inner = (
              <div
                className="group flex h-full flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17,17,17,0.08)",
                  boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                {/* Mini browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: "#f4f3ef", borderBottom: "1px solid rgba(17,17,17,0.06)" }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span
                    className="ml-2 flex-1 truncate rounded-md px-2 py-1 font-body text-[11px]"
                    style={{ background: "rgba(17,17,17,0.05)", color: "rgba(17,17,17,0.45)" }}
                  >
                    {site.display}
                  </span>
                </div>

                {/* Bandeau accent */}
                <div className="h-1.5 w-full" style={{ background: site.accent }} />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-body text-lg font-bold" style={{ color: "#111111" }}>
                    {site.name}
                  </h3>
                  <p
                    className="mt-2 flex-1 font-body text-[14px] leading-relaxed"
                    style={{ color: "rgba(17,17,17,0.55)" }}
                  >
                    {site.description}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-transform group-hover:translate-x-0.5"
                    style={{ color: site.url ? site.accent : "rgba(17,17,17,0.35)" }}
                  >
                    {site.url ? "Voir le site" : "Sur demande"}
                    {site.url && <ArrowUpRight size={16} />}
                  </span>
                </div>
              </div>
            );

            return (
              <ScrollReveal key={site.name} delay={i * 80} className="h-full">
                {site.url ? (
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
