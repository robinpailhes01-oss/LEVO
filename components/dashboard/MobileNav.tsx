"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Target, LineChart, Users } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/luna", label: "LUNA", icon: Sparkles },
  { href: "/dashboard/orion", label: "ORION", icon: Target },
  { href: "/dashboard/hermes", label: "HERMES", icon: LineChart },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t py-2 lg:hidden"
      style={{ background: "#fff", borderColor: "#E2D9C8" }}
    >
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-2 py-1"
            style={{ color: active ? "#1A3BFF" : "#9AA5B4" }}
          >
            <item.icon size={20} strokeWidth={1.8} />
            <span className="font-body text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
