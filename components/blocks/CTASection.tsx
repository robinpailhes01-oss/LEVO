"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="py-28 sm:py-36" style={{ background: "#faf7f0" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-[24px] px-8 py-20 sm:px-16 sm:py-28"
            style={{
              background: "#0b1f4a",
            }}
          >
            {/* Subtle electric accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,95,255,0.25), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,194,255,0.12), transparent 65%)",
              }}
            />

            <div className="relative max-w-2xl">
              <p className="section-label" style={{ color: "#4d8fff" }}>Parlons de votre projet</p>
              <h2
                className="mt-6 font-display text-4xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-[3.25rem]"
                style={{ color: "#faf7f0" }}
              >
                Votre projet mérite
                <br />une vraie conversation
              </h2>
              <p
                className="mt-7 max-w-lg font-body text-lg leading-relaxed"
                style={{ color: "rgba(250,247,240,0.55)" }}
              >
                Un café, une visio, ou quelques lignes par mail : on prend le temps
                de comprendre votre besoin avant de proposer quoi que ce soit.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}?subject=Projet%20avec%20Levo`}
                  className="inline-flex items-center rounded-[12px] px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: "#005fff",
                    boxShadow: "0 4px 20px rgba(0,95,255,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,95,255,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,95,255,0.35)";
                  }}
                >
                  Écrire à Levo
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-body text-sm underline underline-offset-4 transition-colors duration-200"
                  style={{ color: "rgba(250,247,240,0.40)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(250,247,240,0.70)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(250,247,240,0.40)")}
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
