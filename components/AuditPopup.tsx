"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";
import { AuditForm } from "@/components/AuditForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AuditPopup() {
  const { isOpen, variant, closeAudit } = useAudit();

  // Fermeture avec Escape + verrouillage du scroll.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAudit();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeAudit]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAudit}
          role="dialog"
          aria-modal="true"
          aria-label="Audit gratuit"
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex min-h-screen w-full flex-col bg-white p-6 sm:min-h-0 sm:max-w-[560px] sm:rounded-[24px] sm:p-8"
            style={{ boxShadow: "0 40px 100px rgba(13,17,23,0.35)" }}
          >
            <button
              type="button"
              onClick={closeAudit}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              <X size={18} />
            </button>

            {/* Message d'intention de sortie */}
            {variant === "exit" && (
              <div className="mb-6 mt-2 border-b pb-6" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
                <p className="section-label" style={{ color: "#1A3BFF" }}>Avant de partir</p>
                <h2 className="mt-3 font-serif text-2xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>
                  Obtenez votre audit gratuit
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.6)" }}>
                  Découvrez combien vous perdez chaque mois en tâches non automatisées.
                </p>
              </div>
            )}

            <div className={variant === "exit" ? "" : "mt-4"}>
              <AuditForm onDone={closeAudit} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
