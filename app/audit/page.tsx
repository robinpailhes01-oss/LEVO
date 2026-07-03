import type { Metadata } from "next";
import { AuditForm } from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Votre audit gratuit personnalisé",
  description: "Questionnaire d'audit gratuit — Luma",
  robots: { index: false, follow: false },
};

export default function AuditPage({
  searchParams,
}: {
  searchParams: { lead?: string | string[] };
}) {
  const raw = searchParams.lead;
  const leadId = Array.isArray(raw) ? raw[0] : raw;

  return (
    <main
      className="flex min-h-screen items-start justify-center px-4 py-10 sm:items-center sm:py-16"
      style={{ background: "#f4f3ef" }}
    >
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <a
            href="/"
            className="font-serif text-2xl font-bold tracking-[-0.02em]"
            style={{ color: "#111111" }}
          >
            Luma
          </a>
          <p className="mt-2 font-body text-sm" style={{ color: "rgba(17,17,17,0.55)" }}>
            Votre audit gratuit et personnalisé
          </p>
        </div>

        <div
          className="rounded-[24px] bg-white p-6 sm:p-8"
          style={{ boxShadow: "0 20px 60px rgba(17,17,17,0.10)" }}
        >
          <AuditForm leadId={leadId} />
        </div>

        <p className="mt-5 text-center font-body text-xs" style={{ color: "rgba(17,17,17,0.4)" }}>
          Sans engagement · réponse sous 24h
        </p>
      </div>
    </main>
  );
}
