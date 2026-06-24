import Link from "next/link";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Méthode" },
  { href: "#cas", label: "Cas clients" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-container px-5 py-14 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-3xl font-semibold text-navy">
              Levo
            </p>
            <p className="mt-2 font-body text-sm text-text-secondary">
              Agence IA sur-mesure · Montpellier, France
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
        <div className="mt-10 border-t border-border pt-6">
          <p className="font-body text-xs text-text-muted">
            © {new Date().getFullYear()} Levo. Solutions IA artisanales, conçues
            avec soin dans le Sud de la France.
          </p>
        </div>
      </div>
    </footer>
  );
}
