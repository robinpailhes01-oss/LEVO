"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   AgentChatCard — la carte « Agent WhatsApp » du fichier Figma.

   Une conversation qui se joue toute seule quand la carte entre à
   l'écran : le client écrit, l'agent « tape » puis répond, un devis
   arrive en pièce jointe. Le scénario par défaut est illustratif
   (aucun client réel) ; on peut en passer un autre via `messages`.

   Usage :
     <AgentChatCard />
     <AgentChatCard messages={MON_SCENARIO} title="Agent Harmonie" />
   ────────────────────────────────────────────────────────────────── */

export interface ChatAttachment {
  name: string;
  meta: string;
}

export interface ChatMessage {
  from: "client" | "agent";
  text: string;
  attachment?: ChatAttachment;
}

interface Props {
  title?: string;
  channel?: string;
  /** Chip en haut à droite (ex. « Répond en 30 s »). */
  badge?: string;
  messages?: ChatMessage[];
  /** Rejoue la conversation en boucle après une pause. */
  loop?: boolean;
  className?: string;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    from: "client",
    text: "Bonjour, je voudrais un devis pour l'entretien d'un jardin de 800 m² à Castelnau, avec taille de haies.",
  },
  {
    from: "agent",
    text: "Bonjour ! Bien noté : 800 m², taille de haies comprise. Deux questions pour être précis : la fréquence souhaitée (mensuelle ou bimensuelle) et une date de première visite ?",
  },
  { from: "client", text: "Mensuelle, et dès la semaine prochaine si possible." },
  {
    from: "agent",
    text: "Parfait. Votre devis est prêt et vient de vous être envoyé. Un créneau vous est proposé mardi 10 h — je le bloque ?",
    attachment: { name: "Devis_entretien_jardin.pdf", meta: "2 pages · généré automatiquement" },
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const INK = "#111111";
const ELECTRIC = "#1A3BFF";

/* Rythme de lecture : le client écrit vite, l'agent « réfléchit » avant
   de répondre, et une longue réponse met un peu plus de temps. */
const CLIENT_DELAY_MS = 900;
const AGENT_TYPING_MS = 1100;
const LOOP_PAUSE_MS = 4500;

/* forwardRef : AnimatePresence en mode popLayout doit pouvoir mesurer
   chaque enfant, donc les enfants doivent accepter une ref. */
const TypingIndicator = forwardRef<HTMLDivElement>(function TypingIndicator(_, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.35, ease: EASE }}
      className="inline-flex items-center gap-1 self-start rounded-2xl rounded-bl-[5px] px-3.5 py-3"
      style={{ background: "#f1efea" }}
      aria-label="L'agent est en train d'écrire"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full"
          style={{ background: INK }}
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
});

const Bubble = forwardRef<HTMLDivElement, { message: ChatMessage }>(function Bubble({ message }, ref) {
  const agent = message.from === "agent";
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`flex w-full ${agent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 sm:max-w-[74%] ${agent ? "rounded-br-[5px]" : "rounded-bl-[5px]"}`}
        style={{ background: agent ? ELECTRIC : "#f1efea" }}
      >
        <p
          className="font-body text-[13px] leading-[1.45]"
          style={{ color: agent ? "#ffffff" : INK }}
        >
          {message.text}
        </p>
        {message.attachment && (
          <div
            className="mt-2.5 flex items-center gap-2.5 rounded-[10px] py-2 pl-2.5 pr-3"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <span
              className="flex h-7 w-6 shrink-0 items-center justify-center rounded-[4px]"
              style={{ background: "#ffffff" }}
            >
              <FileText size={13} strokeWidth={2} style={{ color: ELECTRIC }} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-body text-[12px] font-semibold text-white">
                {message.attachment.name}
              </span>
              <span className="block truncate font-body text-[10.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                {message.attachment.meta}
              </span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export function AgentChatCard({
  title = "Agent Luma",
  channel = "WhatsApp Business · en ligne",
  badge = "Répond en 30 s",
  messages = DEFAULT_MESSAGES,
  loop = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion() ?? false;

  /* `shown` = nombre de messages affichés ; `typing` = l'agent écrit. */
  const [shown, setShown] = useState(reduceMotion ? messages.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setShown(messages.length);
      return;
    }
    if (!inView) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const play = (index: number) => {
      if (index >= messages.length) {
        if (loop) {
          schedule(() => {
            setShown(0);
            schedule(() => play(0), 500);
          }, LOOP_PAUSE_MS);
        }
        return;
      }
      const next = messages[index];
      if (next.from === "agent") {
        setTyping(true);
        schedule(() => {
          setTyping(false);
          setShown(index + 1);
          play(index + 1);
        }, AGENT_TYPING_MS + Math.min(next.text.length * 6, 700));
      } else {
        schedule(() => {
          setShown(index + 1);
          play(index + 1);
        }, CLIENT_DELAY_MS);
      }
    };

    play(0);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [inView, reduceMotion, messages, loop]);

  return (
    <div
      ref={ref}
      className={`flex flex-col overflow-hidden rounded-[24px] ${className}`}
      style={{
        background: "#ffffff",
        border: "1px solid rgba(17,17,17,0.08)",
        boxShadow: "0 2px 6px rgba(17,17,17,0.05), 0 24px 60px rgba(17,17,17,0.08)",
      }}
    >
      {/* En-tête */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg font-bold text-white"
            style={{ background: INK }}
            aria-hidden
          >
            L
          </span>
          <div className="leading-tight">
            <p className="font-body text-sm font-semibold" style={{ color: INK }}>
              {title}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 font-body text-[11px]" style={{ color: "rgba(17,17,17,0.5)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "#25d366" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#25d366" }} />
              </span>
              {channel}
            </p>
          </div>
        </div>
        {badge && (
          <span
            className="hidden shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] sm:inline-block"
            style={{ background: "rgba(17,17,17,0.05)", color: "rgba(17,17,17,0.6)" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Fil */}
      <div
        className="flex flex-1 flex-col gap-2 px-4 py-4 sm:px-5"
        style={{ background: "#faf9f6", minHeight: 240 }}
        aria-live="polite"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {messages.slice(0, shown).map((m, i) => (
            <Bubble key={`${i}-${m.from}`} message={m} />
          ))}
          {typing && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Barre de saisie (décorative) */}
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ borderTop: "1px solid rgba(17,17,17,0.08)" }}
        aria-hidden
      >
        <div
          className="flex flex-1 items-center rounded-full px-4 py-2.5 font-body text-[13px]"
          style={{ background: "rgba(17,17,17,0.04)", color: "rgba(17,17,17,0.4)" }}
        >
          Écrire un message…
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: INK }}
        >
          <ArrowRight size={15} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}
