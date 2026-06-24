import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      {/* Subtle dotted grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, black, transparent)",
        }}
      />
      {/* Electric glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full"
        style={{ background: "var(--electric-glow)", filter: "blur(80px)" }}
      />

      <div className="relative mx-auto grid max-w-container items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div>
          <p
            className="label opacity-0 animate-fadeUp"
            style={{ animationDelay: "0ms" }}
          >
            Agence IA · Montpellier
          </p>
          <h1
            className="display mt-5 text-5xl opacity-0 animate-fadeUp sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            L&apos;IA qui travaille
            <br />
            comme vous le souhaitez
          </h1>
          <p
            className="mt-7 max-w-[560px] font-body text-lg text-text-secondary opacity-0 animate-fadeUp"
            style={{ animationDelay: "200ms" }}
          >
            On automatise ce qui vous prend du temps, vous gardez ce qui compte.
            Des solutions sur-mesure, construites avec soin et un accompagnement
            humain, pour les PME et startups du Sud de la France.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-4 opacity-0 animate-fadeUp"
            style={{ animationDelay: "300ms" }}
          >
            <Button href="#cas" variant="primary">
              Voir nos réalisations
            </Button>
            <Button href="#process" variant="secondary">
              Comment ça marche
            </Button>
          </div>
        </div>

        {/* Abstract visual */}
        <div
          className="relative opacity-0 animate-fadeUp"
          style={{ animationDelay: "400ms" }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[24px] border border-border bg-white shadow-lg" />
            <div className="absolute inset-6 overflow-hidden rounded-[16px] bg-navy">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(77,143,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-7">
                <span className="font-body text-xs uppercase tracking-[0.12em] text-cream/60">
                  Agent · Léa
                </span>
                <div className="space-y-3">
                  <div className="h-2.5 w-3/4 rounded-full bg-cream/20" />
                  <div className="h-2.5 w-1/2 rounded-full bg-cream/20" />
                  <div className="h-2.5 w-2/3 rounded-full bg-electric-light/70" />
                </div>
                <p className="font-display text-2xl italic text-cream">
                  « Bonjour, je m&apos;occupe de votre demande. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
