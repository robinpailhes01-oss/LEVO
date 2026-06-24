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
    <footer className="border-t border-border/60 bg-cream">
      <div className="mx-auto max-w-container px-5 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-20">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-navy">
                <span className="font-display text-sm font-bold text-cream">L</span>
              </span>
              <span className="font-display text-xl font-semibold text-navy">Levo</span>
            </div>
            <p className="mt-4 max-w-[220px] font-body text-sm leading-relaxed text-text-muted">
              Solutions IA artisanales, construites avec soin dans le Sud de la France.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-text-secondary transition-colors hover:text-navy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Contact
            </p>
            <div className="mt-5">
              <a
                href="mailto:harmonieyacht@gmail.com"
                className="block font-body text-sm text-text-secondary transition-colors hover:text-navy"
              >
                harmonieyacht@gmail.com
              </a>
              <p className="mt-2 font-body text-xs text-text-muted">Réponse sous 24h ouvrées</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-text-muted">
            © {new Date().getFullYear()} Levo · Agence IA sur-mesure
          </p>
          <p className="font-body text-xs text-text-muted">Montpellier, France</p>
        </div>
      </div>
    </footer>
  );
}
