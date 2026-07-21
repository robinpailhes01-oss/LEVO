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
    <footer style={{ borderTop: "1px solid rgba(17,17,17,0.10)", background: "#111111" }}>
      <div className="mx-auto max-w-container px-5 py-14 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <div>
            <span className="font-body text-2xl font-black tracking-[-0.03em]" style={{ color: "#ffffff" }}>
              luma<span style={{ color: "#4D8FFF" }}>.</span>
            </span>
            <p className="mt-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Agence IA sur-mesure · Montpellier
            </p>
            <p className="mt-1 font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Luma, une marque de Harmonie Group
            </p>
          </div>

          <ul className="flex flex-wrap gap-6">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-body text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 pt-8 sm:flex-row sm:items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Luma · Harmonie Group SASU au capital de 100 € · RCS Marseille 991 738 733 · Nexos Digital LLC
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/cgv"
              className="font-body text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
            >
              CGV
            </Link>
            <a
              href="mailto:contact@luma-agence.fr"
              className="font-body text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
            >
              contact@luma-agence.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
