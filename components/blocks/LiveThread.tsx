"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Mouvement signature — « la conversation qui se répond toute seule ».
 *
 * Le reste de la page décrit l'agent. Ce fil le fait tourner : à mesure que le
 * visiteur descend, une vraie demande client arrive, l'agent répond, la demande
 * est qualifiée, le devis part, la réservation tombe. Quand le visiteur atteint
 * le formulaire, la conversation s'est terminée sous ses yeux.
 *
 * Étiqueté « Démonstration » pour ne jamais être pris pour un chat de support.
 * Masqué sous 1024px : sur un téléphone, un panneau fixe mange le contenu.
 */

type Event =
  | { at: number; kind: "client" | "agent"; time: string; text: string }
  | { at: number; kind: "status"; text: string };

const EVENTS: Event[] = [
  { at: 0.13, kind: "client", time: "22h47", text: "Bonsoir, vous avez de la place le 15 août pour 6 personnes ?" },
  { at: 0.23, kind: "agent", time: "22h47", text: "Bonsoir ! Oui, il reste une disponibilité le 15. Journée ou demi-journée ?" },
  { at: 0.35, kind: "status", text: "Demande qualifiée" },
  { at: 0.49, kind: "client", time: "22h49", text: "La journée. C'est possible avec le repas à bord ?" },
  { at: 0.61, kind: "agent", time: "22h49", text: "Tout à fait. Je vous envoie un devis détaillé dans la minute." },
  { at: 0.74, kind: "status", text: "Devis envoyé" },
  { at: 0.86, kind: "status", text: "Réservé" },
];

const VISIBLE_BUBBLES = 3;

export function LiveThread() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [past, setPast] = useState(false); // sorti de scène en fin de page
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      raf.current = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable <= 0 ? 0 : window.scrollY / scrollable;
      setStep(EVENTS.filter((e) => p >= e.at).length);
      // On libère le bas de page : le CTA final ne doit rien avoir devant lui.
      setPast(p > 0.93);
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (dismissed) return null;

  const revealed = EVENTS.slice(0, step);
  const bubbles = revealed.filter((e) => e.kind !== "status").slice(-VISIBLE_BUBBLES) as Extract<
    Event,
    { kind: "client" | "agent" }
  >[];
  const statuses = revealed.filter((e) => e.kind === "status");
  const status = statuses.length ? statuses[statuses.length - 1].text : null;

  const idle = step === 0;

  return (
    <aside
      className={`wa-rail ${idle || past ? "wa-rail--away" : ""}`}
      aria-label="Démonstration : l'agent WhatsApp de Luma en action"
    >
      <div className="wa-rail__head">
        <span className="wa-rail__dot" aria-hidden />
        <span className="wa-rail__title">Agent Luma</span>
        <span className="wa-rail__tag">Démonstration</span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="wa-rail__close"
          aria-label="Masquer la démonstration"
        >
          <X size={13} strokeWidth={2.2} />
        </button>
      </div>

      <div className="wa-rail__body">
        {bubbles.map((m) => (
          <div key={m.text} className={`wa-msg wa-msg--${m.kind}`}>
            <p className="wa-msg__text">{m.text}</p>
            <span className="wa-msg__time">{m.time}</span>
          </div>
        ))}
      </div>

      {status && (
        <div key={status} className="wa-rail__status">
          <span className="wa-rail__statusDot" aria-hidden />
          {status}
        </div>
      )}
    </aside>
  );
}
