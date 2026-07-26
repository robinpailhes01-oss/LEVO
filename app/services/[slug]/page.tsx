import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Nav } from "@/components/blocks/Nav";
import { Footer } from "@/components/blocks/Footer";
import { ServiceCTA } from "@/components/blocks/ServiceCTA";
import { SERVICES, getService } from "@/lib/services";

// La page Agent IA WhatsApp a sa propre route dédiée (plus complète) ;
// on ne génère pas de doublon statique pour ce slug ici.
export function generateStaticParams() {
  return SERVICES.filter((s) => s.slug !== "agent-whatsapp").map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} — Luma`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service || service.slug === "agent-whatsapp") notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="pt-40 pb-16 sm:pt-48 sm:pb-20" style={{ background: "#f4f3ef" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: `${service.accent}14`, color: service.accent }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
              {service.tag}
            </span>
            <h1
              className="mt-6 max-w-2xl font-body text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#111111" }}
            >
              {service.title}
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
              {service.intro}
            </p>
          </div>
        </section>

        {/* Ce que comprend le service */}
        <section className="py-20 sm:py-24" style={{ background: "#f4f3ef" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(17,17,17,0.40)" }}>
              Ce que comprend le service
            </p>
            <ul className="grid list-none gap-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-2xl p-5"
                  style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${service.accent}18` }}
                  >
                    <Check size={13} strokeWidth={2.6} style={{ color: service.accent }} />
                  </span>
                  <span className="font-body text-[15px] leading-relaxed" style={{ color: "#111111" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Exemples concrets — sans prix */}
        <section className="py-20 sm:py-24" style={{ background: "#111111" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.40)" }}>
              Exemples concrets
            </p>
            <h2 className="max-w-xl font-body text-2xl font-bold tracking-[-0.02em] sm:text-3xl" style={{ color: "#ffffff" }}>
              Comment on l&apos;a mis en place pour d&apos;autres clients
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {service.examples.map((ex) => (
                <div
                  key={ex.title}
                  className="relative overflow-hidden rounded-[24px] p-7"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl"
                    style={{ background: service.accent }}
                  />
                  <h3 className="relative font-body text-lg font-bold" style={{ color: "#ffffff" }}>{ex.title}</h3>
                  <p className="relative mt-3 font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {ex.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — premier contact simple */}
        <section className="py-24 sm:py-28" style={{ background: "#f4f3ef" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="max-w-lg font-body text-2xl font-bold tracking-[-0.02em] sm:text-3xl" style={{ color: "#111111" }}>
              On en discute ?
            </p>
            <p className="mt-3 max-w-lg font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
              Laissez-nous vos coordonnées, on revient vers vous sous 24h pour comprendre
              votre besoin — sans engagement.
            </p>
            <ServiceCTA project={service.title} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
