import type { ReactNode } from "react";

// Primitives de design du dashboard — style Bankio (cards blanches arrondies, soft shadows).

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white ${padded ? "p-6" : ""} ${className}`}
      style={{ boxShadow: "0 4px 16px rgba(11,31,74,0.06)" }}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card>
      <p
        className="font-body text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#9AA5B4" }}
      >
        {label}
      </p>
      <p
        className="mt-2 font-display text-3xl font-bold"
        style={{ color: "#0B1F4A" }}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-1 font-body text-xs" style={{ color: "#4A5568" }}>
          {sub}
        </p>
      )}
    </Card>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1
          className="font-display text-3xl font-bold"
          style={{ color: "#0B1F4A" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  idea: { bg: "#EEF0F6", fg: "#4A5568" },
  approved_idea: { bg: "#E3ECFF", fg: "#1A3BFF" },
  drafted: { bg: "#FFF4E0", fg: "#B8860B" },
  approved_content: { bg: "#E3F9E5", fg: "#1A7F37" },
  ready: { bg: "#E3F9E5", fg: "#1A7F37" },
  published: { bg: "#E3F9E5", fg: "#1A7F37" },
  new: { bg: "#EEF0F6", fg: "#4A5568" },
  contacted: { bg: "#FFF4E0", fg: "#B8860B" },
  responded: { bg: "#E3ECFF", fg: "#1A3BFF" },
  qualified: { bg: "#E3F9E5", fg: "#1A7F37" },
  won: { bg: "#E3F9E5", fg: "#1A7F37" },
  lost: { bg: "#FBE3E3", fg: "#CC0000" },
};

export function Badge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? { bg: "#EEF0F6", fg: "#4A5568" };
  return (
    <span
      className="inline-block rounded-full px-2.5 py-1 font-body text-[11px] font-medium"
      style={{ background: c.bg, color: c.fg }}
    >
      {status}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl border border-dashed p-10 text-center font-body text-sm"
      style={{ borderColor: "#C9BFA8", color: "#9AA5B4" }}
    >
      {message}
    </div>
  );
}
