import type { Metadata } from "next";
import { Nav } from "@/components/blocks/Nav";
import { Footer } from "@/components/blocks/Footer";
import { OfferSection } from "@/components/blocks/OfferSection";
import { AgentWhatsappHero } from "@/components/blocks/AgentWhatsappHero";
import { ServiceJsonLd } from "@/components/ui/ServiceJsonLd";
import { ServiceFaq } from "@/components/blocks/ServiceFaq";
import { getService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Agent IA WhatsApp + CRM sur-mesure — Luma",
  description:
    "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans votre CRM. Mise en place offerte, vous ne payez que votre utilisation.",
  alternates: { canonical: "/services/agent-whatsapp" },
  openGraph: {
    title: "Agent IA WhatsApp + CRM sur-mesure — Luma",
    description:
      "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans votre CRM. Mise en place offerte.",
    url: "/services/agent-whatsapp",
  },
};

export default function AgentWhatsappPage() {
  const service = getService("agent-whatsapp");

  return (
    <>
      <ServiceJsonLd
        name="Agent IA WhatsApp + CRM personnalisé"
        description="Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans un CRM pensé pour votre activité."
        slug="agent-whatsapp"
      />
      <Nav />
      <main>
        <AgentWhatsappHero />
        <OfferSection />
        <ServiceFaq items={service?.faq ?? []} accent="#1A3BFF" />
      </main>
      <Footer />
    </>
  );
}
