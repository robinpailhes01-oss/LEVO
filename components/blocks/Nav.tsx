"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Méthode" },
  { href: "#cas", label: "Réalisations" },
  { href: "#apropos", label: "À propos" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,247,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e2d9c8" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 24px rgba(11,31,74,0.06)" : "none",
      }}
    >
      <nav className="mx-auto flex h-18 max-w-container items-center justify-between px-5 py-4 lg:px-12">
        <Link href="#top" className="flex items-center gap-2.5" aria-label="Levo">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-[7px]"
            style={{ background: "#005fff" }}
          >
            <span className="font-display text-sm font-bold text-white">L</span>
          </span>
          <span className="font-display text-xl font-semibold" style={{ color: "#0b1f4a" }}>
            Levo
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-body text-sm font-medium transition-colors duration-200"
                style={{ color: "#4a5568" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0b1f4a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5568")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden rounded-[10px] px-5 py-2.5 font-body text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px md:inline-flex"
            style={{ background: "#005fff", boxShadow: "0 2px 12px rgba(0,95,255,0.25)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,95,255,0.40)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,95,255,0.25)";
            }}
          >
            Discutons →
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] md:hidden"
            style={{ border: "1px solid #e2d9c8", color: "#0b1f4a" }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={18} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "#faf7f0" }}
      >
        <div className="flex h-16 items-center justify-between px-5" style={{ borderBottom: "1px solid #e2d9c8" }}>
          <span className="font-display text-xl font-semibold" style={{ color: "#0b1f4a" }}>Levo</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-[8px]"
            style={{ border: "1px solid #e2d9c8", color: "#0b1f4a" }}
            aria-label="Fermer le menu"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-5 pt-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-4 py-4 font-display text-2xl font-semibold transition-colors"
                style={{ color: "#0b1f4a" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-6">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="block w-full rounded-[12px] px-6 py-4 text-center font-body text-base font-semibold text-white"
              style={{ background: "#005fff" }}
            >
              Discutons de votre projet
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
