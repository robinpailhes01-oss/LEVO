"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button" | "div";
}

export function MagneticButton({
  children,
  className,
  style,
  strength = 0.35,
  href,
  onClick,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY, display: "inline-flex" }}
    >
      {href ? (
        <a href={href} className={className} style={style} onClick={onClick}>
          {children}
        </a>
      ) : (
        <div className={className} style={style} onClick={onClick} role={onClick ? "button" : undefined}>
          {children}
        </div>
      )}
    </motion.div>
  );

  return Tag === "div" ? inner : inner;
}
