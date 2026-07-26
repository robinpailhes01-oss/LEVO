"use client";

import { useAudit } from "@/hooks/useAudit";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ServiceCTA({ project }: { project: string }) {
  const { openAudit } = useAudit();

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <MagneticButton
        onClick={() => openAudit("demo", project)}
        className="inline-flex items-center rounded-full px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:opacity-90"
        style={{ background: "#111111" }}
        strength={0.25}
      >
        Demander un premier échange →
      </MagneticButton>
      <span className="font-body text-xs" style={{ color: "rgba(17,17,17,0.45)" }}>
        Réponse sous 24h · Sans engagement
      </span>
    </div>
  );
}
