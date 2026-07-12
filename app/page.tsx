import { Nav } from "@/components/blocks/Nav";
import { HeroSection } from "@/components/blocks/HeroSection";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { HowItWorksSection } from "@/components/blocks/HowItWorksSection";
import { PortfolioSection } from "@/components/blocks/PortfolioSection";
import { WebsitesSection } from "@/components/blocks/WebsitesSection";
import { CreationsSection } from "@/components/blocks/CreationsSection";
import { AboutSection } from "@/components/blocks/AboutSection";
// TestimonialsSection retirée temporairement (pas encore de témoignages clients réels).
// import { TestimonialsSection } from "@/components/blocks/TestimonialsSection";
import { CTASection } from "@/components/blocks/CTASection";
import { Footer } from "@/components/blocks/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Marquee } from "@/components/ui/Marquee";

const marqueeItems = [
  "Agents IA sur-mesure",
  "Automatisation n8n",
  "Zéro demande oubliée",
  "40h économisées/mois",
  "Montpellier · Sud de la France",
  "Accompagnement humain",
  "Déployé en 3 semaines",
  "Dashboard temps réel",
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <Marquee
          items={marqueeItems}
          speed={40}
          className="border-y py-4"
          style={{ borderColor: "rgba(17,17,17,0.10)", background: "#f4f3ef" }}
        />
        <TrustBar />
        <ServicesSection />
        <HowItWorksSection />
        <PortfolioSection />
        <WebsitesSection />
        <CreationsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
