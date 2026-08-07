"use client";

import { ArrowRight } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Formation pas encore ouverte — prix annoncé, inscriptions à venir.
// Format exact (vidéo à la demande / cohorte live) encore à préciser.
const PRICE = "200 €";
const PRICE_NOTE = "Prix de lancement · Places limitées à l'ouverture";
const FORMAT_NOTE = "Formation à venir";

export function FormationCTA() {
  const { openAudit } = useAudit();

  return (
    <section className="py-24 sm:py-28" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div
          className="relative overflow-hidden rounded-[28px] p-8 sm:p-12"
          style={{ background: "#111111" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "#1A3BFF" }}
          />
          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {FORMAT_NOTE}
              </p>
              <p
                className="mt-3 font-body text-5xl font-black tracking-[-0.02em] sm:text-6xl"
                style={{ color: "#ffffff" }}
              >
                {PRICE}
              </p>
              <p className="mt-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
                {PRICE_NOTE}
              </p>
            </div>

            <MagneticButton
              onClick={() => openAudit("waitlist", "Liste d'attente — Formation Agent IA WhatsApp")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-8 py-4 font-body text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-90"
              style={{ background: "#ffffff", color: "#111111" }}
              strength={0.2}
            >
              Être prévenu du lancement <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
