import Link from "next/link";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Méthode" },
  { href: "#cas", label: "Réalisations" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-container px-5 py-16 lg:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-navy">
                <span className="font-display text-sm font-bold text-cream">L</span>
              </span>
              <span className="font-display text-xl font-semibold text-navy">Levo</span>
            </div>
            <p className="mt-3 font-body text-sm text-text-secondary">
              Agence IA sur-mesure · Montpellier, France
            </p>
            <p className="mt-1.5 font-body text-xs text-text-muted">
              Solutions artisanales, construites avec soin
              <br />dans le Sud de la France.
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
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

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Contact
            </p>
            <a
              href="mailto:harmonieyacht@gmail.com"
              className="mt-4 block font-body text-sm text-text-secondary transition-colors hover:text-navy"
            >
              harmonieyacht@gmail.com
            </a>
            <p className="mt-1.5 font-body text-xs text-text-muted">
              On répond sous 24h ouvrées
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-text-muted">
            © {new Date().getFullYear()} Levo. Tous droits réservés.
          </p>
          <p className="font-body text-xs text-text-muted">
            Fait avec soin à Montpellier 🌊
          </p>
        </div>
      </div>
    </footer>
  );
}
