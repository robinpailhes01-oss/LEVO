"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────────
   Scroll lissé (Lenis).

   Lenis n'invente pas un faux scroll : il anime le vrai `window.scrollY`
   avec une interpolation, donc tout ce qui écoute `scroll` ou lit
   `getBoundingClientRect()` (split stage, rail, fil WhatsApp, useScroll de
   Framer) continue de fonctionner tel quel.

   Deux détails à tenir :
   - `scroll-behavior: smooth` en CSS entre en conflit ; Lenis pose la classe
     `lenis-smooth` sur <html> et globals.css le neutralise. Les ancres sont
     donc reprises ici, avec le même décalage que `scroll-padding-top`.
   - Sous `prefers-reduced-motion`, on ne monte rien : scroll natif.
   ────────────────────────────────────────────────────────────────── */

const ANCHOR_OFFSET = -104; // = scroll-padding-top (6.5rem)

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* Ancres internes : « #contact » ou « /#process » sur la page courante. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      window.history.pushState(null, "", url.hash);
      lenis.scrollTo(el, { offset: ANCHOR_OFFSET, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    /* Arrivée avec un hash dans l'URL : on se cale sans animation. */
    if (window.location.hash) {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => lenis.scrollTo(el, { offset: ANCHOR_OFFSET, immediate: true }));
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
