import type { Metadata } from "next";
import { Nav } from "@/components/blocks/Nav";
import { PortfolioSection } from "@/components/blocks/PortfolioSection";
import { CreationsSection } from "@/components/blocks/CreationsSection";
import { CTASection } from "@/components/blocks/CTASection";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
  title: "Réalisations — écosystèmes IA et sites web",
  description:
    "Les écosystèmes IA construits par Luma pour des PME du Sud de la France : agents, automatisations, tableaux de bord, et les sites web créés sur-mesure.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <PortfolioSection />
        <CreationsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
