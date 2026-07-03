import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export const metadata = {
  title: "Dashboard Luma",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#ECEEF8" }}>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden px-5 pb-24 pt-8 lg:px-10 lg:pb-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
