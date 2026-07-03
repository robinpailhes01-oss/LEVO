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
            <span className="font-display text-2xl font-bold" style={{ color: "#ffffff" }}>Luma</span>
            <p className="mt-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Agence IA sur-mesure · Montpellier
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
            © {new Date().getFullYear()} Luma · Tous droits réservés
          </p>
          <a
            href="mailto:harmonieyacht@gmail.com"
            className="font-body text-xs transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.25)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
          >
            harmonieyacht@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
