import type { Metadata } from "next";
import { Nav } from "@/components/blocks/Nav";
import { Footer } from "@/components/blocks/Footer";
import { OfferSection } from "@/components/blocks/OfferSection";
import { AgentWhatsappHero } from "@/components/blocks/AgentWhatsappHero";

export const metadata: Metadata = {
  title: "Agent IA WhatsApp + CRM sur-mesure — Luma",
  description:
    "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans votre CRM. Mise en place offerte, vous ne payez que votre utilisation.",
};

export default function AgentWhatsappPage() {
  return (
    <>
      <Nav />
      <main>
        <AgentWhatsappHero />
        <OfferSection />
      </main>
      <Footer />
    </>
  );
}
