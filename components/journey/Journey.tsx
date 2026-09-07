"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";
import { STATIONS, TOTAL_VH, WAYPOINTS, currentIndex } from "./track";
import { StaticEcosystem, supportsWebGL } from "@/components/scene/EcosystemFallback";

/* ──────────────────────────────────────────────────────────────────
   Le parcours : grammaire « monde continu ».

   Un seul stage fixe (le monde WebGL + la couche de texte + la carte),
   un seul élément dans le flux (le spacer). Le scroll ne fait qu'une
   chose : avancer une timeline p ∈ [0, 1]. Rien ne s'épingle, rien ne
   se désépingle, donc aucune couture.

   Mouvement signature : le visiteur tape sa demande au comptoir ; la
   bulle voyage avec lui dans le monde ; à l'arrivée, le seul bouton
   l'envoie réellement à Luma, pré-remplie.
   ────────────────────────────────────────────────────────────────── */

const World = dynamic(() => import("./World"), { ssr: false });

const EMAIL = "contact@luma-agence.fr";
const SAMPLE = "Bonsoir, vous avez de la place le 15 août pour 6 personnes ?";

function useMedia(query: string): boolean | null {
  const [m, setM] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const f = () => setM(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [query]);
  return m;
}

function scrollToStation(index: number) {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.round(STATIONS[index].start * scrollable) + 2;
  const ev = new CustomEvent("luma:scrollto", { detail: { top, duration: 1.6 } });
  window.dispatchEvent(ev);
  /* Sans Lenis (mouvement réduit), on saute. */
  if (!document.documentElement.classList.contains("lenis")) window.scrollTo({ top, behavior: "auto" });
}

export function Journey() {
  const reduceMotion = useReducedMotion() ?? false;
  const mobile = useMedia("(max-width: 1023px)");
  const { openAudit } = useAudit();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.0005 });

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => progress.on("change", (v) => setActive(currentIndex(v))), [progress]);

  const mailto = useMemo(() => {
    const body = sent && message.trim() ? message.trim() : SAMPLE;
    return `mailto:${EMAIL}?subject=${encodeURIComponent("Ma demande, vue dans votre parcours")}&body=${encodeURIComponent(
      `Voici la demande que j'ai fait voyager sur luma-agence.fr :\n\n« ${body} »\n\nQue construiriez-vous pour la traiter chez moi ?`,
    )}`;
  }, [message, sent]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    scrollToStation(1);
  }

  return (
    <div className="relative" style={{ background: "#f4f3ef" }}>
      {/* ── Le stage fixe ── */}
      <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden" aria-hidden={false}>
        <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 z-[3]" />

        {/* Le monde */}
        <div className="absolute inset-0 z-[1]">
          {mobile !== null && webgl === true && (
            <World progress={progress} message={message} sent={sent} reduceMotion={reduceMotion} mobile={mobile} />
          )}
          {webgl === false && <StaticEcosystem />}
        </div>

        {/* Voile crème sous le texte, mobile uniquement (jamais plein cadre) */}
        {mobile && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[46%]"
            style={{ background: "linear-gradient(180deg, rgba(244,243,239,0) 0%, rgba(244,243,239,0.92) 38%, rgba(244,243,239,0.96) 100%)" }}
          />
        )}

        {/* ── La couche de texte ── */}
        <div className="pointer-events-none absolute inset-0 z-[4]">
          <div className="mx-auto h-full max-w-container px-5 lg:px-12">
            {/* 1 · Le comptoir (lead) */}
            <Window progress={progress} index={0} className="absolute bottom-[8%] left-5 right-5 lg:bottom-auto lg:left-12 lg:top-1/2 lg:w-[30rem] lg:-translate-y-1/2">
              <p className="section-label">Agence IA sur-mesure · Montpellier</p>
              <h1 className="mt-5 font-display text-[2.4rem] font-bold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]" style={{ color: "#111111" }}>
                Des outils IA qui vous{" "}
                <em className="font-serif font-medium" style={{ color: "#1A3BFF" }}>
                  appartiennent.
                </em>
              </h1>
              <p className="mt-5 max-w-md font-body text-base leading-relaxed sm:text-lg" style={{ color: "rgba(17,17,17,0.62)" }}>
                Tapez la demande qu&apos;un client vous envoie un soir. Puis descendez : vous allez la regarder traverser l&apos;écosystème qu&apos;on construirait pour vous.
              </p>
              <form onSubmit={submit} className="pointer-events-auto mt-6">
                <label htmlFor="demande" className="block font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.5)" }}>
                  Votre demande, comme un client l&apos;écrirait
                </label>
                <div
                  className="mt-2 flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5"
                  style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.12)", boxShadow: "0 12px 32px rgba(17,17,17,0.08)" }}
                >
                  <input
                    id="demande"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (sent) setSent(false);
                    }}
                    placeholder={SAMPLE}
                    maxLength={160}
                    className="min-w-0 flex-1 bg-transparent font-body text-[14px] outline-none placeholder:text-[rgba(17,17,17,0.35)]"
                    style={{ color: "#111111" }}
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 font-body text-[13px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
                    style={{ background: "#111111" }}
                  >
                    Suivre ma demande <ArrowDown size={14} strokeWidth={2.4} />
                  </button>
                </div>
              </form>
            </Window>

            {/* 2 · La coulée : le silence, une ligne tard et petite */}
            <Window progress={progress} index={1} late className="absolute bottom-[10%] left-5 right-5 text-center lg:bottom-[14%] lg:left-0 lg:right-0">
              <p className="mx-auto max-w-md font-body text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                Sans réponse, une demande vaut zéro. Et il en tombe des centaines.
              </p>
            </Window>

            {/* 3 · Le cœur (trail) : le pic */}
            <Window progress={progress} index={2} className="absolute bottom-[8%] left-5 right-5 lg:bottom-auto lg:left-auto lg:right-48 lg:top-1/2 lg:w-[26rem] lg:-translate-y-1/2 lg:text-right">
              <p className="section-label lg:justify-end">Ici, maintenant</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[2.9rem]" style={{ color: "#111111" }}>
                Votre demande est <em className="font-serif font-medium" style={{ color: "#1A3BFF" }}>attrapée.</em>
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.62)" }}>
                L&apos;écosystème que l&apos;on construit autour de votre métier la lit, la qualifie et la met au travail. En trente secondes, pas demain matin.
              </p>
            </Window>

            {/* 4 · L'atelier (split) */}
            <Window progress={progress} index={3} className="absolute bottom-[8%] left-5 right-5 lg:bottom-[10%] lg:left-12 lg:right-48 lg:grid lg:grid-cols-2 lg:items-end lg:gap-12">
              <h2 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[2.7rem]" style={{ color: "#111111" }}>
                Devis, relance, rendez-vous : tout se fabrique <em className="font-serif font-medium" style={{ color: "#1A3BFF" }}>sans vous.</em>
              </h2>
              <ul className="mt-4 grid gap-2 font-body text-[15px] leading-relaxed lg:mt-0 lg:justify-self-end lg:max-w-sm" style={{ color: "rgba(17,17,17,0.62)" }}>
                <li className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#1A3BFF" }} />Le devis se rédige et part, dans votre mise en page.</li>
                <li className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#1A3BFF" }} />La relance s&apos;arme pour J+2, puis J+7.</li>
                <li className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#1A3BFF" }} />Le CRM range la conversation à sa place, avec vos règles.</li>
              </ul>
            </Window>

            {/* 5 · Le tableau (lead) */}
            <Window progress={progress} index={4} className="absolute bottom-[8%] left-5 right-5 lg:bottom-auto lg:left-12 lg:top-1/2 lg:w-[24rem] lg:-translate-y-1/2">
              <h2 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[2.7rem]" style={{ color: "#111111" }}>
                Vous regardez. Vous ne courez plus.
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.62)" }}>
                Un tableau de bord construit autour de votre activité, pas l&apos;inverse. Ce que vous lisez à droite, ce sont les chiffres d&apos;un client, un an après.
              </p>
            </Window>

            {/* 6 · L'arrivée (centre, haut) */}
            <Window progress={progress} index={5} hold className="absolute left-5 right-5 top-[14%] text-center lg:top-[13%]">
              <p className="section-label mx-auto justify-center">L&apos;arrivée</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[3rem]" style={{ color: "#111111" }}>
                Votre demande est arrivée. <em className="whitespace-nowrap font-serif font-medium" style={{ color: "#1A3BFF" }}>La nôtre commence.</em>
              </h2>
              <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed" style={{ color: "rgba(17,17,17,0.62)" }}>
                Envoyez-la telle quelle à Luma. On vous répond sous 24 h avec ce qu&apos;on construirait pour la traiter chez vous.
              </p>
              <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={mailto}
                  className="btn-primary btn-sheen-auto"
                  style={{ boxShadow: "0 18px 40px rgba(17,17,17,0.18)" }}
                >
                  Envoyer à Luma <ArrowRight size={15} />
                </a>
                <button type="button" onClick={() => openAudit()} className="font-body text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "#111111" }}>
                  ou commencer par un audit gratuit
                </button>
              </div>
            </Window>
          </div>
        </div>

        {/* ── Le chrome : marque + liens de pages ── */}
        <div className="pointer-events-auto absolute left-5 right-5 top-5 z-[5] flex items-center justify-between lg:left-12 lg:right-12 lg:top-7">
          <Link href="/" className="font-body text-xl font-black tracking-[-0.03em]" style={{ color: "#111111" }}>
            luma<span style={{ color: "#1A3BFF" }}>.</span>
          </Link>
          <nav aria-label="Pages" className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.55)" }}>
            <Link href="/services" className="hover:text-[#111111]">Services</Link>
            <Link href="/realisations" className="hidden hover:text-[#111111] sm:inline">Réalisations</Link>
            <Link href="/formations" className="hidden hover:text-[#111111] sm:inline">Formations</Link>
            <Link href="/a-propos" className="hover:text-[#111111]">À propos</Link>
          </nav>
        </div>

        {/* ── La carte : six points, cliquables ── */}
        <MapRail active={active} mobile={mobile === true} />
      </div>

      {/* ── Le seul élément dans le flux : le spacer ── */}
      <div aria-hidden style={{ height: `calc(${TOTAL_VH + 1} * 100vh)` }} />
    </div>
  );
}

/** Une fenêtre de texte : visible pendant la tenue de son lieu. */
function Window({
  progress,
  index,
  className,
  children,
  late = false,
  hold = false,
}: {
  progress: MotionValue<number>;
  index: number;
  className?: string;
  children: React.ReactNode;
  /** N'apparaît que dans la seconde moitié de la tenue (silence autorisé). */
  late?: boolean;
  /** Ne disparaît jamais (fermeture). */
  hold?: boolean;
}) {
  const s = STATIONS[index];
  const len = s.end - s.start;
  const inStart = late ? s.start + len * 0.55 : index === 0 ? -1 : s.start;
  const inEnd = late ? s.start + len * 0.7 : index === 0 ? 0 : s.start + len * 0.14;
  const outStart = hold ? 2 : s.end - len * 0.08;
  const outEnd = hold ? 3 : s.next;
  const range = index === 0 ? [outStart, outEnd] : hold ? [inStart, inEnd] : [inStart, inEnd, outStart, outEnd];
  const op = index === 0 ? [1, 0] : hold ? [0, 1] : [0, 1, 1, 0];
  const ys = index === 0 ? [0, -24] : hold ? [24, 0] : [24, 0, 0, -24];
  const opacity = useTransform(progress, range, op);
  const y = useTransform(progress, range, ys);
  const pointer = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));

  return (
    <motion.div className={className} style={{ opacity, y, pointerEvents: pointer as unknown as "auto" | "none" }}>
      {children}
    </motion.div>
  );
}

function MapRail({ active, mobile }: { active: number; mobile: boolean }) {
  if (mobile) {
    return (
      <div className="pointer-events-auto absolute bottom-4 left-5 z-[5] flex items-center gap-2" role="navigation" aria-label="Carte du parcours">
        {WAYPOINTS.map((w, i) => (
          <button
            key={w.id}
            type="button"
            aria-label={w.label}
            onClick={() => scrollToStation(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? 22 : 8, background: i === active ? "#111111" : "rgba(17,17,17,0.25)" }}
          />
        ))}
      </div>
    );
  }
  return (
    <nav
      aria-label="Carte du parcours"
      className="pointer-events-auto absolute right-9 top-1/2 z-[5] -translate-y-1/2 rounded-2xl px-4 py-4"
      style={{ background: "rgba(244,243,239,0.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      <ol className="relative flex list-none flex-col gap-4 pl-5">
        <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px" style={{ background: "rgba(17,17,17,0.14)" }} />
        {WAYPOINTS.map((w, i) => {
          const on = i === active;
          return (
            <li key={w.id} className="relative">
              <button
                type="button"
                onClick={() => scrollToStation(i)}
                className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-200"
                style={{ color: on ? "#111111" : "rgba(17,17,17,0.45)" }}
              >
                <span
                  aria-hidden
                  className="absolute -left-5 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-300"
                  style={{ background: on ? "#1A3BFF" : "rgba(17,17,17,0.3)", boxShadow: on ? "0 0 0 4px rgba(26,59,255,0.15)" : "none" }}
                />
                <span className="w-3 text-right" style={{ color: "rgba(17,17,17,0.35)" }}>{i + 1}</span>
                <span className="group-hover:text-[#111111]">{w.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
