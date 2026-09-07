"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Un paragraphe révélé phrase par phrase, chaque phrase glissant hors
   d'un masque. Pour les citations et les manifestes : ça donne le rythme
   d'une voix qui parle, pas d'un bloc qui apparaît. Le texte complet reste
   dans le DOM (aria-label) pour les lecteurs d'écran et les moteurs. */

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Découpe : par phrase (défaut) ou par ligne « \n ». */
  split?: "sentence" | "line";
  as?: "p" | "blockquote" | "h2" | "h3";
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function splitText(text: string, mode: "sentence" | "line"): string[] {
  if (mode === "line") return text.split("\n").map((l) => l.trim()).filter(Boolean);
  return text
    .split(/(?<=[.!?»])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function LineReveal({ text, className, style, delay = 0, split = "sentence", as: Tag = "p" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const parts = splitText(text, split);

  return (
    // @ts-expect-error balise dynamique
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {parts.map((part, i) => (
        <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]" aria-hidden>
          <motion.span
            className="block"
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.14 }}
          >
            {part}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
