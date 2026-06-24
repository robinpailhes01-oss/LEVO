"use client";

import Link from "next/link";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Méthode" },
  { href: "#cas", label: "Réalisations" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e2d9c8", background: "#faf7f0" }}>
      <div className="mx-auto max-w-container px-5 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-20">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-[7px]"
                style={{ background: "#005fff" }}
              >
                <span className="font-display text-sm font-bold text-white">L</span>
              </span>
              <span className="font-display text-xl font-semibold" style={{ color: "#0b1f4a" }}>
                Levo
              </span>
            </div>
            <p
              className="mt-4 max-w-[220px] font-body text-sm leading-relaxed"
              style={{ color: "#8a96a8" }}
            >
              Solutions IA artisanales, construites avec soin dans le Sud de la France.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "#8a96a8" }}
            >
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "#4a5568" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0b1f4a")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5568")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "#8a96a8" }}
            >
              Contact
            </p>
            <div className="mt-5">
              <a
                href="mailto:harmonieyacht@gmail.com"
                className="block font-body text-sm transition-colors duration-200"
                style={{ color: "#4a5568" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0b1f4a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5568")}
              >
                harmonieyacht@gmail.com
              </a>
              <p className="mt-2 font-body text-xs" style={{ color: "#8a96a8" }}>
                Réponse sous 24h ouvrées
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-3 pt-8 sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid #e2d9c8" }}
        >
          <p className="font-body text-xs" style={{ color: "#8a96a8" }}>
            © {new Date().getFullYear()} Levo · Agence IA sur-mesure
          </p>
          <p className="font-body text-xs" style={{ color: "#8a96a8" }}>
            Montpellier, France
          </p>
        </div>
      </div>
    </footer>
  );
}
