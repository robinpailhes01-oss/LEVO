"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type AuditVariant = "default" | "exit" | "auto" | "demo" | "waitlist";

interface AuditContextValue {
  isOpen: boolean;
  variant: AuditVariant;
  demoProject: string;
  openAudit: (variant?: AuditVariant, demoProject?: string) => void;
  closeAudit: () => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);

export function AuditContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<AuditVariant>("default");
  const [demoProject, setDemoProject] = useState("Projet Luma");

  const openAudit = useCallback((v: AuditVariant = "default", project = "Projet Luma") => {
    setVariant(v);
    setDemoProject(project);
    setIsOpen(true);
  }, []);

  const closeAudit = useCallback(() => setIsOpen(false), []);

  return (
    <AuditContext.Provider value={{ isOpen, variant, demoProject, openAudit, closeAudit }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit(): AuditContextValue {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit doit être utilisé dans <AuditProvider>");
  return ctx;
}
