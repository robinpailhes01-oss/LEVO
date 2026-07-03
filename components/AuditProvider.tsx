"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AuditContextProvider, useAudit } from "@/hooks/useAudit";
import { AuditPopup } from "@/components/AuditPopup";

const EXIT_KEY = "luma_audit_exit_shown";
const MIN_DELAY_MS = 30_000; // 30 s minimum avant l'exit-intent

function ExitIntent() {
  const { openAudit } = useAudit();
  const arrivedAt = useRef<number>(0);

  useEffect(() => {
    arrivedAt.current = Date.now();

    let shown = false;
    try {
      shown = localStorage.getItem(EXIT_KEY) === "1";
    } catch {
      /* localStorage indisponible : on ne bloque pas */
    }
    if (shown) return;

    const onMouseOut = (e: MouseEvent) => {
      // Souris qui sort par le haut du viewport
      if (e.clientY > 0 || e.relatedTarget) return;
      if (Date.now() - arrivedAt.current < MIN_DELAY_MS) return;
      try {
        localStorage.setItem(EXIT_KEY, "1");
      } catch {
        /* ignore */
      }
      window.removeEventListener("mouseout", onMouseOut);
      openAudit("exit");
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [openAudit]);

  return null;
}

export function AuditProvider({ children }: { children: ReactNode }) {
  return (
    <AuditContextProvider>
      {children}
      <ExitIntent />
      <AuditPopup />
    </AuditContextProvider>
  );
}
