"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";

/**
 * Créations web — device « pan » : le scroll vertical devient un déplacement
 * latéral. Un rail se lit comme un éventail de possibilités, là où une grille
 * verticale se lit comme un argument.
 *
 * L'amplitude de l'acte n'est pas écrite en dur : elle est calculée depuis le
 * débordement réellement mesuré du rail. Un rail plus étroit que l'écran
 * voyagerait de zéro et l'acte deviendrait un écran immobile tenu pendant
 * plusieurs hauteurs de page — le piège classique de ce device, et il dépend
 * de la largeur, donc il peut être correct sur mobile et mort sur desktop.
 */

interface Creation {
  name: string;
  type: string;
  description: string;
  accent: string;
  image: string;
  url: string;
  displayUrl: string;
}

const CREATIONS: Creation[] = [
  {
    name: "JeanBa Jardin",
    type: "Site vitrine · Devis en ligne",
    description:
      "Paysagiste créateur de jardins sur-mesure, de la conception à l'entretien.",
    accent: "#7CB342",
    image: "/creations/jeanba-jardin.jpg",
    url: "https://www.jeanba-jardin.fr",
    displayUrl: "jeanba-jardin.fr",
  },
  {
    name: "June — Studio UGC",
    type: "Landing page",
    description:
      "Studio de contenu pour hôtels, restaurants et lieux d'expérience.",
    accent: "#8B6F47",
    image: "/creations/lulu-ugc.jpg",
    url: "https://lulu-ugc.vercel.app",
    displayUrl: "lulu-ugc.vercel.app",
  },
  {
    name: "Fabien · LS Consulting",
    type: "Landing page premium",
    description:
      "Personal branding et acquisition pour un consultant, pensée pour la prise de rendez-vous.",
    accent: "#C9A961",
    image: "/creations/fabien.jpg",
    url: "https://fabien-one.vercel.app",
    displayUrl: "fabien-one.vercel.app",
  },
];

export function CreationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const { openAudit } = useAudit();

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const rail = railRef.current;
    const spacer = spacerRef.current;
    if (!section || !stage || !rail || !spacer) return;

    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia("(min-width: 768px)");

    let overflow = 0;
    let raf = 0;

    const reset = () => {
      spacer.style.height = "0px";
      rail.style.removeProperty("--rail-x");
      stage.style.removeProperty("--p");
      section.classList.remove("rail-act--pinned");
    };

    const measure = () => {
      if (!wide.matches || !motionOK.matches) {
        reset();
        return;
      }
      overflow = rail.scrollWidth - stage.clientWidth;
      if (overflow <= 40) {
        // Pas assez de débordement pour mériter un épinglage.
        reset();
        return;
      }
      section.classList.add("rail-act--pinned");
      // 1px de scroll ≈ 1px de déplacement latéral, plus un peu de répit
      // en fin de course pour que la dernière carte ne soit pas coupée net.
      spacer.style.height = `${Math.round(overflow * 1.25)}px`;
      apply();
    };

    const apply = () => {
      raf = 0;
      if (!section.classList.contains("rail-act--pinned")) return;
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
      stage.style.setProperty("--p", p.toFixed(4));
      rail.style.setProperty("--rail-x", `${-(overflow * p).toFixed(1)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    motionOK.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      motionOK.removeEventListener("change", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="creations" ref={sectionRef} data-thread-hide className="rail-act" style={{ background: "#F0EDE6" }}>
      <div ref={stageRef} className="rail-stage">
        <div ref={railRef} className="rail">
          {/* Le titre entre dans le rail : il cesse de concurrencer la nav fixe
              et il apporte la largeur dont le déplacement a besoin. */}
          <div className="rail-lead">
            <p className="section-label">Créations web</p>
            <h2
              className="mt-6 font-body text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl"
              style={{ color: "#111111" }}
            >
              Sites internet &amp; landing pages qui convertissent
            </h2>
            <p
              className="mt-4 font-body text-base leading-relaxed"
              style={{ color: "rgba(17,17,17,0.55)" }}
            >
              Au-delà de l&apos;IA, on conçoit aussi votre présence en ligne : design
              sur-mesure, rapide, pensé pour la conversion.
            </p>
          </div>

          {CREATIONS.map((c, i) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rail-card group"
              style={{ "--from": i === 0 ? -1 : i * 0.14 } as React.CSSProperties}
            >
              <div className="rail-card__chrome">
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

              <div className="rail-card__shot">
                <Image
                  src={c.image}
                  alt={`Aperçu du site ${c.name}`}
                  fill
                  sizes="(max-width: 767px) 78vw, 24rem"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

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
                  className="mt-4 inline-flex items-center gap-1 font-body text-[14px] font-semibold"
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
          ))}

          {/* Le rail se termine sur une résolution, pas sur un bord. */}
          <div className="rail-end" style={{ "--from": 0.45 } as React.CSSProperties}>
            <p
              className="font-body text-2xl font-bold leading-tight tracking-[-0.02em]"
              style={{ color: "#111111" }}
            >
              Le prochain, c&apos;est peut-être le vôtre.
            </p>
            <p
              className="mt-3 font-body text-[15px] leading-relaxed"
              style={{ color: "rgba(17,17,17,0.55)" }}
            >
              On part de votre métier, pas d&apos;un template. Réponse sous 24h.
            </p>
            <button
              type="button"
              onClick={() => openAudit("demo", "Création de site web")}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
              style={{ background: "#111111" }}
            >
              Parler de mon site <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div ref={spacerRef} className="rail-spacer" aria-hidden />
    </section>
  );
}
