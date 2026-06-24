import { Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const EMAIL = "harmonieyacht@gmail.com";

export function CTASection() {
  return (
    <section id="contact" className="bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 text-center lg:px-12">
        <Reveal>
          <h2 className="display text-4xl text-cream sm:text-5xl lg:text-[3.5rem]">
            Parlons de votre projet
          </h2>
          {/* Electric signature underline */}
          <div className="mx-auto mt-5 h-0.5 w-20 bg-electric" aria-hidden />
          <p className="mx-auto mt-7 max-w-xl font-body text-lg text-cream/70">
            Un café, une visio, ou quelques lignes par mail : on prend le temps
            de comprendre votre besoin avant de proposer quoi que ce soit.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${EMAIL}?subject=Projet%20avec%20Levo`}
              className="inline-flex items-center gap-2 rounded-[12px] border-2 border-cream bg-cream px-7 py-3 font-body text-sm font-semibold tracking-[0.02em] text-navy transition-colors hover:bg-transparent hover:text-cream"
            >
              <Mail size={18} strokeWidth={2} aria-hidden />
              Écrire à Levo
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-cream/80 transition-colors hover:text-cream"
            >
              {EMAIL}
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
