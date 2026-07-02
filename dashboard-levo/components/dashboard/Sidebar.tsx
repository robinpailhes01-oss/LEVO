"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Target,
  LineChart,
  Users,
  Settings,
  ClipboardCheck,
  LogOut,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/luna", label: "LUNA — Contenu", icon: Sparkles },
  { href: "/dashboard/orion", label: "ORION — Acquisition", icon: Target },
  { href: "/dashboard/hermes", label: "HERMES — Analytics", icon: LineChart },
  { href: "/dashboard/audits", label: "Audits", icon: ClipboardCheck },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-64 shrink-0 flex-col justify-between border-r p-5 lg:flex"
      style={{ background: "#fff", borderColor: "#E2D9C8" }}
    >
      <div>
        <Link
          href="/dashboard"
          className="font-display text-2xl font-bold"
          style={{ color: "#0B1F4A" }}
        >
          Levo
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors"
                style={{
                  background: active ? "#ECEEF8" : "transparent",
                  color: active ? "#1A3BFF" : "#4A5568",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <item.icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors"
          style={{ color: "#9AA5B4" }}
        >
          <LogOut size={18} strokeWidth={1.8} />
          Déconnexion
        </button>
      </form>
    </aside>
  );
}
