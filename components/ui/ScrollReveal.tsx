"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Tag = "div" | "li" | "section" | "article" | "header" | "footer";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}

export function ScrollReveal({ children, className, delay = 0, y = 32, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
