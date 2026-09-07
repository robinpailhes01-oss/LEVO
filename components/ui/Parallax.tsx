"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/* Déplacement vertical lié au scroll. `speed` > 0 : l'élément monte plus
   vite que la page (premier plan) ; < 0 : il traîne (arrière-plan).
   Amplitude en pixels, calme par défaut : la parallaxe agressive est
   interdite par la charte. */

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Parallax({ children, speed = 40, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 80, damping: 24 });

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduceMotion ? 0 : y }}>
      {children}
    </motion.div>
  );
}
