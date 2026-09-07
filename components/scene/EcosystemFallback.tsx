/* Partagé entre l'acte Écosystème de l'accueil et la page labo. */

export const ECOSYSTEM_LABELS = ["WhatsApp", "Devis", "Relances", "CRM", "Contenu", "Rapports"];

/** WebGL absent (vieux navigateur, GPU bloqué, mode économie) → version plate. */
export function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function StaticEcosystem() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <div className="relative h-[52vmin] w-[52vmin]">
        <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(26,59,255,0.35)" }} />
        <div
          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "#0d1117", boxShadow: "0 30px 60px rgba(17,17,17,0.25)" }}
        />
        {ECOSYSTEM_LABELS.map((l, i) => {
          const a = (i / ECOSYSTEM_LABELS.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * 50;
          const y = 50 + Math.sin(a) * 50;
          return (
            <span
              key={l}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ left: `${x}%`, top: `${y}%`, background: "#ffffff", border: "1px solid rgba(17,17,17,0.10)", color: "#111111" }}
            >
              {l}
            </span>
          );
        })}
      </div>
    </div>
  );
}
