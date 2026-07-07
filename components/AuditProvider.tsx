"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AuditContextProvider, useAudit } from "@/hooks/useAudit";
import { AuditPopup } from "@/components/AuditPopup";

const SHOWN_KEY = "luma_audit_shown";
const AUTO_OPEN_DELAY_MS = 5_000; // popup auto 5s après l'arrivée (marche aussi sur mobile)
const EXIT_MIN_DELAY_MS = 30_000; // exit-intent desktop : 30 s minimum

function hasBeenShown(): boolean {
  try {
    return localStorage.getItem(SHOWN_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown(): void {
  try {
    localStorage.setItem(SHOWN_KEY, "1");
  } catch {
    /* ignore */
  }
}

// Ouvre automatiquement le popup 5s après l'arrivée — fonctionne sur mobile/tablette,
// contrairement à l'exit-intent qui dépend d'un curseur de souris.
function AutoOpen() {
  const { openAudit, isOpen } = useAudit();
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    if (hasBeenShown()) return;
    const timer = setTimeout(() => {
      if (hasBeenShown() || isOpenRef.current) return;
      markShown();
      openAudit("auto");
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [openAudit]);

  return null;
}

// Sur desktop, en plus : si la souris sort par le haut avant les 5s, on déclenche
// immédiatement (dès 30s après l'arrivée) plutôt que d'attendre.
function ExitIntent() {
  const { openAudit, isOpen } = useAudit();
  const arrivedAt = useRef<number>(0);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    arrivedAt.current = Date.now();
    if (hasBeenShown()) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      if (Date.now() - arrivedAt.current < EXIT_MIN_DELAY_MS) return;
      if (hasBeenShown() || isOpenRef.current) return;
      markShown();
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
      <AutoOpen />
      <ExitIntent />
      <AuditPopup />
    </AuditContextProvider>
  );
}
