"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="py-28 sm:py-36" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-container px-5 text-center lg:px-12">
        <ScrollReveal>
          <p className="section-label mx-auto mb-8 justify-center" style={{ color: "rgba(255,255,255,0.40)" }}>
            Parlons de votre projet
          </p>
          <WordReveal
            text="Lançons votre projet, ensemble."
            as="h2"
            className="mx-auto max-w-3xl font-display text-5xl font-bold leading-tight tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            style={{ color: "#ffffff" }}
            delay={0.05}
          />
          <p className="mx-auto mt-8 max-w-lg font-body text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
            Dites-nous l&apos;essentiel — on prend le temps de comprendre votre besoin
            avant de proposer quoi que ce soit.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}?subject=Projet%20avec%20Luma`}
              className="inline-flex items-center rounded-full px-8 py-4 font-body text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-90"
              style={{ background: "#ffffff", color: "#111111" }}
            >
              Écrire à Luma →
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-full px-8 py-4 font-body text-sm font-semibold transition-all duration-200 hover:border-white/40"
              style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.65)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
            >
              {EMAIL}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
