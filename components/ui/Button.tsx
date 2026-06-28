import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center gap-2 rounded-[12px] px-7 py-3 text-sm font-body font-semibold tracking-[0.02em] transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<Variant, string> = {
  primary:
    "border-2 border-navy bg-navy text-cream hover:bg-navy-mid hover:border-navy-mid",
  secondary:
    "border-2 border-border-strong bg-transparent text-navy hover:border-navy",
  ghost: "text-navy hover:text-electric",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
