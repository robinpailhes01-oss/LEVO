"use client";

import { motion } from "framer-motion";

interface Props {
  items: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Marquee({ items, speed = 30, className, style }: Props) {
  const repeated = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className ?? ""}`} style={style}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-8 font-body text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "rgba(17,17,17,0.35)" }}
          >
            <span className="h-[3px] w-[3px] rounded-full flex-shrink-0" style={{ background: "rgba(17,17,17,0.25)" }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
