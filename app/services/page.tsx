import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/blocks/Nav";
import { Footer } from "@/components/blocks/Footer";
import { CTASection } from "@/components/blocks/CTASection";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nos services — Luma",
  description:
    "Agents IA, automatisation, tableaux de bord, agent WhatsApp + CRM sur-mesure, sites web : découvrez tous les services de Luma.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nos services — Luma",
    description:
      "Agents IA, automatisation, tableaux de bord, agent WhatsApp + CRM sur-mesure, sites web : découvrez tous les services de Luma.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#f4f3ef" }}>
        <section className="pt-40 pb-20 sm:pt-48 sm:pb-28">
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="section-label">Nos services</p>
            <h1
              className="mt-6 max-w-2xl font-body text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl"
              style={{ color: "#111111" }}
            >
              Un écosystème IA sur-mesure, construit brique par brique
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
              On ne vend pas d&apos;outils sur étagère. Voici les briques que nous
              assemblons le plus souvent — chacune peut être déployée seule ou combinée
              dans votre écosystème.
            </p>
          </div>
        </section>

        <section className="pb-28 sm:pb-36">
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <ul aria-label="Nos services" className="grid list-none gap-5 md:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href ?? "/#services"}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(17,17,17,0.08)",
                      boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                      style={{ background: s.accent }}
                    />

                    <div className="relative flex items-center justify-between">
                      {s.badge ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider"
                          style={{ background: `${s.accent}14`, color: s.accent }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                          {s.badge}
                        </span>
                      ) : (
                        <span />
                      )}
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2}
                        style={{ color: "rgba(17,17,17,0.30)" }}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>

                    <h2 className="relative mt-6 font-body text-xl font-bold leading-snug tracking-[-0.01em]" style={{ color: "#111111" }}>
                      {s.title}
                    </h2>
                    <p className="relative mt-3 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                      {s.description}
                    </p>

                    <span
                      className="relative mt-7 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold"
                      style={{ background: `${s.accent}14`, color: s.accent }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                      {s.tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
