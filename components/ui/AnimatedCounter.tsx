"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;
  duration?: number;
}

function parseNumber(str: string): { prefix: string; num: number; suffix: string } {
  const match = str.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: str };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function AnimatedCounter({ value, duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");
  const { prefix, num, suffix } = parseNumber(value);
  const hasDecimal = value.includes(".");

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const isFloat = hasDecimal;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, num, duration, hasDecimal]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
