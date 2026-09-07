"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";

/* ──────────────────────────────────────────────────────────────────
   Acte 5b — Créations web.
   Plus de rail épinglé (le moment signature de la page est la 3D) :
   une grille de « fenêtres » où chaque capture glisse doucement dans
   son cadre pendant le scroll, comme si on regardait le site à travers
   une vitrine. Le quatrième cadre est l'invitation.
   ────────────────────────────────────────────────────────────────── */

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
    description: "Paysagiste créateur de jardins sur-mesure, de la conception à l'entretien.",
    accent: "#7CB342",
    image: "/creations/jeanba-jardin.jpg",
    url: "https://www.jeanba-jardin.fr",
    displayUrl: "jeanba-jardin.fr",
  },
  {
    name: "June — Studio UGC",
    type: "Landing page",
    description: "Studio de contenu pour hôtels, restaurants et lieux d'expérience.",
    accent: "#8B6F47",
    image: "/creations/lulu-ugc.jpg",
    url: "https://lulu-ugc.vercel.app",
    displayUrl: "lulu-ugc.vercel.app",
  },
  {
    name: "Fabien · LS Consulting",
    type: "Landing page premium",
    description: "Personal branding et acquisition pour un consultant, pensée pour la prise de rendez-vous.",
    accent: "#C9A961",
    image: "/creations/fabien.jpg",
    url: "https://fabien-one.vercel.app",
    displayUrl: "fabien-one.vercel.app",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CreationsSection() {
  const { openAudit } = useAudit();

  return (
    <section id="creations" className="py-28 sm:py-36" style={{ background: "#F0EDE6" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">Créations web</p>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl" style={{ color: "#111111" }}>
              Des sites qui <em className="font-serif font-medium" style={{ color: "#1A3BFF" }}>convertissent.</em>
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
            Au-delà de l&apos;IA, votre présence en ligne : design sur-mesure, rapide, pensé pour la prise de contact.
          </p>
        </div>

        <ul className="grid list-none gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CREATIONS.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="h-full"
            >
              <Window creation={c} />
            </motion.li>
          ))}

          {/* La quatrième fenêtre : l'invitation */}
          <motion.li
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
            className="h-full"
          >
            <div
              className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[22px] p-7"
              style={{ background: "#111111" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
                style={{ background: "#1A3BFF" }}
              />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                Le prochain
              </p>
              <div className="relative">
                <p className="font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-white">
                  C&apos;est peut-être <em className="font-serif font-medium" style={{ color: "#7C97FF" }}>le vôtre.</em>
                </p>
                <p className="mt-3 font-body text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  On part de votre métier, pas d&apos;un template. Réponse sous 24 h.
                </p>
                <button
                  type="button"
                  onClick={() => openAudit("demo", "Création de site web")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 font-body text-sm font-semibold transition-transform duration-200 hover:-translate-y-px"
                  style={{ background: "#ffffff", color: "#111111" }}
                >
                  Parler de mon site <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}

/** Une « fenêtre » : la capture glisse dans son cadre au scroll. */
function Window({ creation: c }: { creation: Creation }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shotY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <a
      ref={ref}
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[22px] transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(17,17,17,0.14)]"
      style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#f4f3ef", borderBottom: "1px solid rgba(17,17,17,0.06)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 truncate font-mono text-[10px] tracking-[0.04em]" style={{ color: "rgba(17,17,17,0.45)" }}>
          {c.displayUrl}
        </span>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: "#f0ede6" }}>
        <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: reduceMotion ? 0 : shotY }}>
          <Image
            src={c.image}
            alt={`Aperçu du site ${c.name}`}
            fill
            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 22vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      <div className="h-1 w-full" style={{ background: c.accent }} />

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: c.accent }}>
          {c.type}
        </p>
        <h3 className="mt-2 font-body text-lg font-bold tracking-[-0.01em]" style={{ color: "#111111" }}>
          {c.name}
        </h3>
        <p className="mt-2 font-body text-[13.5px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>
          {c.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-body text-[13px] font-semibold" style={{ color: "#111111" }}>
          Voir le site
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
