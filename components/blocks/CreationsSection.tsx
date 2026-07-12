import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Creation {
  name: string;
  type: string; // Site vitrine · Landing page…
  description: string;
  accent: string;
  image: string; // capture d'écran dans /public/creations
  url: string;
  displayUrl: string;
}

const CREATIONS: Creation[] = [
  {
    name: "JeanBa Jardin",
    type: "Site vitrine · Formulaire de devis",
    description:
      "Paysagiste créateur de jardins sur-mesure — de la conception à l'entretien, avec demande de devis en ligne.",
    accent: "#7CB342",
    image: "/creations/jeanba-jardin.jpg",
    url: "https://www.jeanba-jardin.fr",
    displayUrl: "jeanba-jardin.fr",
  },
  {
    name: "June — Studio UGC",
    type: "Landing page",
    description:
      "Studio de création de contenu pour hôtels, restaurants et lieux d'expérience : reels, vidéos UGC et photos prêts à poster.",
    accent: "#8B6F47",
    image: "/creations/lulu-ugc.jpg",
    url: "https://lulu-ugc.vercel.app",
    displayUrl: "lulu-ugc.vercel.app",
  },
  {
    name: "Fabien · LS Consulting",
    type: "Landing page premium",
    description:
      "Personal branding et acquisition pour un consultant — une page sombre et élégante, pensée pour la prise de rendez-vous.",
    accent: "#C9A961",
    image: "/creations/fabien.jpg",
    url: "https://fabien-one.vercel.app",
    displayUrl: "fabien-one.vercel.app",
  },
];

export function CreationsSection() {
  return (
    <section id="creations" className="py-24 sm:py-28" style={{ background: "#F0EDE6" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-12">
          <p className="section-label">Créations web</p>
          <h2
            className="mt-6 max-w-2xl font-body text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl"
            style={{ color: "#111111" }}
          >
            Sites internet & landing pages qui convertissent
          </h2>
          <p
            className="mt-4 max-w-2xl font-body text-lg leading-relaxed"
            style={{ color: "rgba(17,17,17,0.55)" }}
          >
            Au-delà de l&apos;IA, on conçoit aussi votre présence en ligne : sites
            vitrines, landing pages, portfolios et formulaires — design sur-mesure,
            rapides et pensés pour la conversion.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {CREATIONS.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 80} className="h-full">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17,17,17,0.08)",
                  boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                {/* Mini browser chrome avec l'URL réelle */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: "#f4f3ef", borderBottom: "1px solid rgba(17,17,17,0.06)" }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span
                    className="ml-2 truncate font-body text-[12px]"
                    style={{ color: "rgba(17,17,17,0.45)" }}
                  >
                    {c.displayUrl}
                  </span>
                </div>

                {/* Capture d'écran */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 10", background: "#f0ede6" }}
                >
                  <Image
                    src={c.image}
                    alt={`Aperçu du site ${c.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Bandeau accent */}
                <div className="h-1.5 w-full" style={{ background: c.accent }} />

                <div className="flex flex-1 flex-col p-6">
                  <p
                    className="font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: c.accent }}
                  >
                    {c.type}
                  </p>
                  <h3 className="mt-2 font-body text-lg font-bold" style={{ color: "#111111" }}>
                    {c.name}
                  </h3>
                  <p
                    className="mt-2 font-body text-[14px] leading-relaxed"
                    style={{ color: "rgba(17,17,17,0.55)" }}
                  >
                    {c.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 font-body text-[14px] font-semibold transition-colors"
                    style={{ color: "#111111" }}
                  >
                    Voir le site
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
