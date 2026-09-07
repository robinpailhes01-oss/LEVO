import type { Metadata } from "next";
import { LabEcosystem } from "@/components/labs/LabEcosystem";

/* Route de laboratoire : sert à juger le poids et le rendu d'une scène 3D
   réelle avant toute intégration sur une page publique. Hors index. */
export const metadata: Metadata = {
  title: "Labo — Écosystème 3D",
  robots: { index: false, follow: false },
};

export default function EcosystemLab() {
  return (
    <main>
      <LabEcosystem />
    </main>
  );
}
