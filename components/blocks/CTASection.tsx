import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="py-28 sm:py-36">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[28px] bg-navy px-8 py-20 sm:px-16 sm:py-28">
            {/* Animated mesh inside the card */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="blob blob-1 absolute -bottom-32 -right-32 h-[500px] w-[500px] opacity-[0.18]"
                style={{ background: "radial-gradient(circle, #005FFF, transparent 60%)" }}
              />
              <div
                className="blob blob-3 absolute -left-16 -top-16 h-[300px] w-[300px] opacity-[0.08]"
                style={{ background: "radial-gradient(circle, #4D8FFF, transparent 60%)" }}
              />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(rgba(250,247,240,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            <div className="relative max-w-2xl">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/40">
                Parlons de votre projet
              </p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-[-0.025em] text-cream sm:text-5xl lg:text-[3.5rem]">
                Votre projet mérite
                <br />une vraie conversation
              </h2>
              <p className="mt-7 max-w-lg font-body text-lg leading-relaxed text-cream/55">
                Un café, une visio, ou quelques lignes par mail : on prend le temps
                de comprendre votre besoin avant de proposer quoi que ce soit.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}?subject=Projet%20avec%20Levo`}
                  className="group relative inline-flex items-center overflow-hidden rounded-[12px] bg-cream px-8 py-4 font-body text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-px hover:bg-white hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
                >
                  Écrire à Levo
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-body text-sm text-cream/40 underline underline-offset-4 transition-colors hover:text-cream/70"
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
