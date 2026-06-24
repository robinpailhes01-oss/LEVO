import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="py-28 sm:py-36">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-[28px] px-8 py-20 sm:px-16 sm:py-28"
            style={{
              background: "#0d1b35",
              border: "1px solid rgba(0,95,255,0.20)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.3)",
            }}
          >
            {/* Glow effects */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="blob blob-1 absolute -bottom-32 -right-32 h-[500px] w-[500px] opacity-[0.20]"
                style={{ background: "radial-gradient(circle, #005FFF, transparent 60%)" }}
              />
              <div
                className="blob blob-3 absolute -left-16 -top-16 h-[300px] w-[300px] opacity-[0.10]"
                style={{ background: "radial-gradient(circle, #00c2ff, transparent 60%)" }}
              />
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            <div className="relative max-w-2xl">
              <p className="section-label">Parlons de votre projet</p>
              <h2
                className="mt-6 font-display text-4xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
                style={{ color: "#f8f4ed" }}
              >
                Votre projet mérite
                <br />une vraie conversation
              </h2>
              <p
                className="mt-7 max-w-lg font-body text-lg leading-relaxed"
                style={{ color: "rgba(248,244,237,0.50)" }}
              >
                Un café, une visio, ou quelques lignes par mail : on prend le temps
                de comprendre votre besoin avant de proposer quoi que ce soit.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}?subject=Projet%20avec%20Levo`}
                  className="inline-flex items-center rounded-[12px] px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px"
                  style={{
                    background: "#005fff",
                    boxShadow: "0 4px 24px rgba(0,95,255,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,95,255,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,95,255,0.35)";
                  }}
                >
                  Écrire à Levo
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-body text-sm underline underline-offset-4 transition-colors duration-200"
                  style={{ color: "rgba(248,244,237,0.35)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(248,244,237,0.65)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(248,244,237,0.35)")}
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
