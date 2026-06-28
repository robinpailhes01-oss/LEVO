"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

type RevealProps = {
  children: React.ReactNode;
  /** delay in ms for staggered reveals */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Wraps children in a fade-up-on-scroll reveal.
 * Animation subtile : translateY 20px → 0 + opacity, 700ms ease-out.
 * Respecte prefers-reduced-motion (géré dans globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
