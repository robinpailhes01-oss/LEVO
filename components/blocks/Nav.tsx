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
        background: scrolled ? "rgba(244,243,239,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,17,17,0.08)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-5 lg:px-12">
        <Link href="#top" className="font-display text-xl font-bold tracking-[-0.02em]" style={{ color: "#111111" }}>
          Levo
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-body text-sm transition-colors duration-200"
                style={{ color: "rgba(17,17,17,0.55)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111111")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.55)")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="#contact" className="btn-primary hidden text-sm md:inline-flex" style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}>
            Discutons →
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            style={{ border: "1px solid rgba(17,17,17,0.15)" }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={17} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "#f4f3ef" }}
      >
        <div className="flex h-16 items-center justify-between px-5" style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
          <span className="font-display text-xl font-bold" style={{ color: "#111111" }}>Levo</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ border: "1px solid rgba(17,17,17,0.15)" }}
            aria-label="Fermer le menu"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>
        <ul className="flex flex-col px-5 pt-8">
          {links.map((l) => (
            <li key={l.href} style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-2xl font-bold"
                style={{ color: "#111111" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-8">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Discutons de votre projet →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
