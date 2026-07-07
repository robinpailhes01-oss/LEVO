"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type AuditVariant = "default" | "exit" | "auto";

interface AuditContextValue {
  isOpen: boolean;
  variant: AuditVariant;
  openAudit: (variant?: AuditVariant) => void;
  closeAudit: () => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);

export function AuditContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<AuditVariant>("default");

  const openAudit = useCallback((v: AuditVariant = "default") => {
    setVariant(v);
    setIsOpen(true);
  }, []);

  const closeAudit = useCallback(() => setIsOpen(false), []);

  return (
    <AuditContext.Provider value={{ isOpen, variant, openAudit, closeAudit }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit(): AuditContextValue {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit doit être utilisé dans <AuditProvider>");
  return ctx;
}
