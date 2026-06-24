import { Mail, ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-navy px-8 py-16 text-center sm:px-12 sm:py-24">
            {/* Background effects */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #005FFF 0%, transparent 60%)" }}
              />
              <div
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #4D8FFF 0%, transparent 60%)" }}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "radial-gradient(rgba(250,247,240,0.8) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-cream/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric-light" />
                Parlons de votre projet
              </span>

              <h2 className="mt-7 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-[3.5rem]">
                Votre projet mérite
                <br />
                une vraie conversation
              </h2>

              <p className="mx-auto mt-6 max-w-xl font-body text-lg text-cream/60">
                Un café, une visio, ou quelques lignes par mail : on prend le temps
                de comprendre votre besoin avant de proposer quoi que ce soit.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${EMAIL}?subject=Projet%20avec%20Levo`}
                  className="inline-flex items-center gap-2 rounded-[12px] bg-cream px-7 py-3.5 font-body text-sm font-semibold tracking-[0.02em] text-navy transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                >
                  <Mail size={17} strokeWidth={2} aria-hidden />
                  Écrire à Levo
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-[12px] border border-cream/20 bg-cream/5 px-7 py-3.5 font-body text-sm font-semibold text-cream/80 backdrop-blur-sm transition-all hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
                >
                  <CalendarDays size={17} strokeWidth={2} aria-hidden />
                  Planifier un échange
                </a>
              </div>

              <p className="mt-8 font-body text-sm text-cream/40">
                Ou répondez simplement à{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-cream/60 underline underline-offset-2 hover:text-cream/80 transition-colors"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
