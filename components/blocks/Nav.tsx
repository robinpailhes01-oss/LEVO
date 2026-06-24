"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Méthode" },
  { href: "#cas", label: "Cas clients" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-cream/90 shadow-[0_4px_24px_rgba(11,31,74,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-container items-center justify-between px-5 lg:px-12">
        <Link
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="Levo — accueil"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-navy">
            <span className="font-display text-sm font-bold text-cream">L</span>
          </span>
          <span className="font-display text-xl font-semibold text-navy">Levo</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-body text-sm font-medium text-text-secondary transition-colors hover:text-navy"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="rounded-[10px] bg-navy px-5 py-2.5 font-body text-sm font-semibold text-cream transition-all hover:-translate-y-px hover:bg-navy-mid hover:shadow-[0_4px_16px_rgba(11,31,74,0.20)]"
          >
            Discutons
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-navy md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-navy transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <span className="font-display text-3xl font-semibold text-cream">
            Levo
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-cream"
            aria-label="Fermer le menu"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 px-5 pt-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-3xl font-semibold text-cream"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-[12px] border-2 border-cream bg-cream px-6 py-3 font-body text-sm font-semibold tracking-[0.02em] text-navy"
            >
              Discutons de votre projet
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
