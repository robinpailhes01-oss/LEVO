"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Check,
  FileText,
  MessageCircle,
  PenLine,
  ReceiptText,
  Search,
  BellRing,
  type LucideIcon,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useAudit } from "@/hooks/useAudit";

/* ──────────────────────────────────────────────────────────────────
   Hero « éditorial + instrument »
   À gauche, la thèse : un titre qui occupe l'espace comme une une de
   journal. À droite, la preuve : un journal de bord sombre où l'on
   voit l'écosystème travailler pendant qu'on lit. Rien n'est décrit,
   tout est montré.
   ────────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LedgerEvent {
  icon: LucideIcon;
  channel: string;
  label: string;
  detail: string;
  tone: string;
}

/* Aucune donnée client réelle : uniquement des actions génériques
   qu'un écosystème Luma exécute réellement en production. */
const EVENTS: LedgerEvent[] = [
  { icon: MessageCircle, channel: "WhatsApp", label: "Demande client qualifiée", detail: "Routée vers le devis", tone: "#4D8FFF" },
  { icon: FileText, channel: "Devis", label: "Devis généré et envoyé", detail: "En 1 min 40", tone: "#2ECC71" },
  { icon: BellRing, channel: "Relance", label: "Relance J+2 programmée", detail: "Client sans réponse", tone: "#F2B84B" },
  { icon: CalendarCheck, channel: "Agenda", label: "Rendez-vous confirmé", detail: "Ajouté au calendrier", tone: "#2ECC71" },
  { icon: ReceiptText, channel: "Facture", label: "Facture émise", detail: "Synchronisée en compta", tone: "#3FD5C0" },
  { icon: PenLine, channel: "Contenu", label: "Post Instagram planifié", detail: "Jeudi · 18:00", tone: "#C084FC" },
  { icon: Search, channel: "SEO", label: "Page service réindexée", detail: "Search Console", tone: "#4D8FFF" },
];

interface LedgerEntry {
  id: number;
  time: string;
  event: LedgerEvent;
  done: boolean;
}

const VISIBLE_ROWS = 5;
const TICK_MS = 2600;
const PROCESSING_MS = 900;

function formatTime(t: number): string {
  return new Date(t).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Une ligne du titre : les mots glissent hors d'un masque, un par un. */
function HeadlineLine({
  words,
  startDelay,
}: {
  words: { text: string; weight: number }[];
  startDelay: number;
}) {
  return (
    <span className="block">
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.22em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            style={{ fontWeight: w.weight }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: EASE, delay: startDelay + i * 0.07 }}
          >
            {w.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

export function HeroSection() {
  const { openAudit } = useAudit();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Parallaxe douce de l'instrument au scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const panelY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const panelOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  /* Sortie en profondeur : en défilant, l'instrument bascule légèrement
     vers l'arrière et recule, comme un objet qu'on repose sur la table. */
  const scrollTiltX = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  /* La thèse recule moins vite que l'instrument : deux plans, pas un aplat. */
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  /* ── Spotlight qui suit la souris derrière le titre ── */
  const spotX = useMotionValue(35);
  const spotY = useMotionValue(30);
  const spotXs = useSpring(spotX, { stiffness: 60, damping: 20 });
  const spotYs = useSpring(spotY, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${spotXs}% ${spotYs}%, rgba(0,95,255,0.07), transparent 70%)`;

  /* ── Inclinaison légère de l'instrument (desktop uniquement) ── */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const mouseRotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 120, damping: 22 });
  /* Souris + scroll se cumulent sur le même axe. */
  const rotateX = useTransform([mouseRotateX, scrollTiltX], ([m, s]: number[]) => m + s);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);

    if (reduceMotion) return;
    const p = panelRef.current?.getBoundingClientRect();
    if (!p) return;
    const px = (e.clientX - p.left) / p.width - 0.5;
    const py = (e.clientY - p.top) / p.height - 0.5;
    const inside = Math.abs(px) < 0.9 && Math.abs(py) < 0.9;
    tiltX.set(inside ? Math.max(-0.5, Math.min(0.5, px)) : 0);
    tiltY.set(inside ? Math.max(-0.5, Math.min(0.5, py)) : 0);
  }

  function onMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  /* ── Journal de bord : les actions arrivent pendant qu'on lit ──
     Rendu vide côté serveur (les horaires dépendent de l'horloge du
     visiteur), rempli au montage pour éviter tout écart d'hydratation. */
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    let nextId = 0;
    let nextEvent = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const seedCount = 4;
    const base = Date.now() - seedCount * TICK_MS;
    const seed: LedgerEntry[] = [];
    for (let i = 0; i < seedCount; i += 1) {
      seed.unshift({
        id: nextId,
        time: formatTime(base + i * TICK_MS),
        event: EVENTS[nextEvent % EVENTS.length],
        done: true,
      });
      nextId += 1;
      nextEvent += 1;
    }
    setEntries(seed);

    if (reduceMotion) return;

    const interval = setInterval(() => {
      const id = nextId;
      nextId += 1;
      const event = EVENTS[nextEvent % EVENTS.length];
      nextEvent += 1;

      setEntries((prev) =>
        [{ id, time: formatTime(Date.now()), event, done: false }, ...prev].slice(0, VISIBLE_ROWS),
      );

      timers.push(
        setTimeout(() => {
          setEntries((prev) => prev.map((row) => (row.id === id ? { ...row, done: true } : row)));
        }, PROCESSING_MS),
      );
    }, TICK_MS);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
      style={{ background: "#f4f3ef" }}
    >
      {/* ── Matière du fond : trame de hairlines, halo, grain ── */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,95,255,0.10), transparent 62%)",
          filter: "blur(10px)",
        }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-container px-5 lg:px-12">
        {/* ── Bandeau éditorial ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between gap-6 pb-5"
          style={{ borderBottom: "1px solid rgba(17,17,17,0.10)" }}
        >
          <p className="section-label">Agence IA sur-mesure · Montpellier</p>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "#1A7F37" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#1A7F37" }} />
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(17,17,17,0.45)" }}
            >
              Écosystèmes en production · Occitanie
            </span>
          </div>
        </motion.div>

        <div className="grid items-start gap-14 pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          {/* ── Colonne thèse ── */}
          <motion.div className="lg:col-span-7" style={{ y: copyY }}>
            {/* aria-label + texte réel : le titre reste lisible par Google et les
                lecteurs d'écran malgré l'animation mot par mot. */}
            <h1
              className="font-display leading-[0.98] tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.1rem, 6.6vw, 5.9rem)", color: "#111111" }}
              aria-label="Des outils IA qui vous appartiennent."
            >
              <span aria-hidden="true">
                <HeadlineLine
                  words={[
                    { text: "Des", weight: 400 },
                    { text: "outils", weight: 700 },
                    { text: "IA", weight: 700 },
                  ]}
                  startDelay={0.05}
                />
                <HeadlineLine
                  words={[
                    { text: "qui", weight: 400 },
                    { text: "vous", weight: 400 },
                  ]}
                  startDelay={0.28}
                />
                <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                  <motion.em
                    className="inline-block font-serif"
                    style={{ color: "#005fff", fontStyle: "italic", fontWeight: 500 }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.46 }}
                  >
                    appartiennent.
                  </motion.em>
                </span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(0.55)}
              className="mt-8 max-w-[34rem] font-body text-lg leading-relaxed sm:text-xl"
              style={{ color: "rgba(17,17,17,0.62)" }}
            >
              On ne vous loue pas un logiciel. On construit vos agents, vos
              automatisations et votre tableau de bord autour de votre métier.
              Et ils restent{" "}
              <em className="font-serif" style={{ fontStyle: "italic", color: "#111111" }}>
                à vous
              </em>
              .
            </motion.p>

            <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <MagneticButton href="#contact" className="btn-primary btn-sheen-auto" strength={0.25}>
                Construire mes outils →
              </MagneticButton>
              <button
                type="button"
                onClick={() => openAudit()}
                className="group inline-flex items-center gap-2 font-body text-sm font-semibold"
                style={{ color: "#111111" }}
              >
                <span className="hero-link">Commencer par un audit gratuit</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "#005fff" }}
                >
                  →
                </span>
              </button>
            </motion.div>

            {/* Trois faits, séparés par des hairlines : le contraire d'une liste à puces. */}
            <motion.dl
              {...fadeUp(0.78)}
              className="mt-14 grid grid-cols-3 gap-0"
              style={{ borderTop: "1px solid rgba(17,17,17,0.10)" }}
            >
              {[
                { value: "100 %", label: "vos propres outils" },
                { value: "1 sem.", label: "jusqu'à la mise en prod" },
                { value: "40 h", label: "rendues chaque mois" },
              ].map((fact, i) => (
                <div
                  key={fact.label}
                  className={`pt-4 ${i > 0 ? "pl-4 sm:pl-6" : ""} ${i < 2 ? "pr-3 sm:pr-6" : ""}`}
                  style={i > 0 ? { borderLeft: "1px solid rgba(17,17,17,0.10)" } : undefined}
                >
                  <dd
                    className="font-body text-xl font-bold leading-none tracking-[-0.03em] sm:text-2xl"
                    style={{ color: "#111111" }}
                  >
                    {fact.value}
                  </dd>
                  <dt
                    className="mt-1.5 font-body text-[11px] leading-snug sm:text-xs"
                    style={{ color: "rgba(17,17,17,0.50)" }}
                  >
                    {fact.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ── Colonne preuve : l'instrument ── */}
          <div className="lg:col-span-5" style={{ perspective: "1400px" }}>
            {/* Entrée : l'objet arrive de biais et se redresse, plutôt que
                de glisser à plat. C'est ce qui lui donne une épaisseur. */}
            <motion.div
              ref={panelRef}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 56, rotateX: 18, rotateY: -12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                style={{
                  y: panelY,
                  opacity: panelOpacity,
                  rotateX,
                  rotateY,
                  scale: scrollScale,
                  transformStyle: "preserve-3d",
                }}
                className="relative overflow-hidden rounded-[24px]"
              >
                <div
                  className="relative"
                  style={{
                    background: "linear-gradient(180deg, #14171d 0%, #0d1117 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 24,
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 90px rgba(17,17,17,0.28), 0 6px 18px rgba(17,17,17,0.12)",
                  }}
                >
                  {/* Reflet : un balayage lent, comme la lumière sur du verre. */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 z-10 w-1/3"
                      style={{
                        background:
                          "linear-gradient(100deg, transparent, rgba(255,255,255,0.10) 50%, transparent)",
                        filter: "blur(2px)",
                      }}
                      initial={{ x: "-150%" }}
                      animate={{ x: "450%" }}
                      transition={{ duration: 2.6, ease: EASE, delay: 2.4, repeat: Infinity, repeatDelay: 8 }}
                    />
                  )}

                  {/* En-tête */}
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ background: "#ffffff" }}
                      >
                        <span className="font-serif text-sm font-bold" style={{ color: "#111111" }}>
                          L
                        </span>
                      </div>
                      <div className="leading-tight">
                        <p className="font-body text-[13px] font-semibold text-white">Journal de bord</p>
                        <p className="font-mono text-[10px] tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.40)" }}>
                          VOTRE ÉCOSYSTÈME
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: "#2ECC71" }}
                        animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                        24/7
                      </span>
                    </div>
                  </div>

                  {/* Flux d'actions */}
                  <ul className="px-2 py-2" aria-live="off" style={{ minHeight: 5 * 58 + 16 }}>
                    <AnimatePresence initial={true} mode="popLayout">
                      {entries.map((row, i) => (
                        <motion.li
                          key={row.id}
                          layout
                          initial={{ opacity: 0, y: -12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE, delay: i * 0.06 } }}
                          exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                          style={{
                            background: i === 0 ? "rgba(255,255,255,0.04)" : "transparent",
                          }}
                        >
                          <span
                            className="hidden w-[62px] shrink-0 font-mono text-[11px] tabular-nums sm:block"
                            style={{ color: "rgba(255,255,255,0.38)" }}
                          >
                            {row.time}
                          </span>
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: `${row.event.tone}1F`, color: row.event.tone }}
                          >
                            <row.event.icon size={15} strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-body text-[13px] font-semibold text-white">
                              {row.event.label}
                            </span>
                            <span className="block truncate font-body text-[11px]" style={{ color: "rgba(255,255,255,0.42)" }}>
                              {row.event.channel} · {row.event.detail}
                            </span>
                          </span>
                          <span
                            className="flex h-5 shrink-0 items-center gap-1 rounded-full px-1.5 font-mono text-[9px] uppercase tracking-[0.1em]"
                            style={
                              row.done
                                ? { background: "rgba(46,204,113,0.14)", color: "#2ECC71" }
                                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                            }
                          >
                            {row.done ? (
                              <>
                                <Check size={10} strokeWidth={3} />
                                fait
                              </>
                            ) : (
                              <>
                                <motion.span
                                  className="inline-block h-1.5 w-1.5 rounded-full"
                                  style={{ background: "currentColor" }}
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                en cours
                              </>
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {/* Pied : les deux chiffres qui comptent */}
                  <div
                    className="grid grid-cols-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="px-5 py-4" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="font-serif text-[2.4rem] leading-none text-white" style={{ fontStyle: "italic", fontWeight: 500 }}>
                        <AnimatedCounter value="30" duration={2200} />
                        <span className="ml-1 font-body text-base not-italic" style={{ color: "rgba(255,255,255,0.55)" }}>
                          s
                        </span>
                      </p>
                      <p className="mt-1.5 font-body text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        de réponse à chaque client
                      </p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-serif text-[2.4rem] leading-none text-white" style={{ fontStyle: "italic", fontWeight: 500 }}>
                        0
                      </p>
                      <p className="mt-1.5 font-body text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        demande oubliée
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <p className="mt-4 text-center font-body text-xs lg:text-left" style={{ color: "rgba(17,17,17,0.40)" }}>
                Ce que fait votre écosystème pendant que vous lisez cette page.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Invitation à défiler ── */}
        <motion.div
          {...fadeUp(1.2)}
          aria-hidden
          className="mt-16 hidden items-center gap-3 lg:flex"
        >
          <span className="relative block h-10 w-px overflow-hidden" style={{ background: "rgba(17,17,17,0.12)" }}>
            <motion.span
              className="absolute left-0 top-0 block h-4 w-px"
              style={{ background: "#111111" }}
              animate={reduceMotion ? undefined : { y: ["-100%", "260%"] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(17,17,17,0.45)" }}>
            Défiler
          </span>
        </motion.div>
      </div>
    </section>
  );
}
