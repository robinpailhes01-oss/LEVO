import { Nav } from "@/components/blocks/Nav";
import { HeroSection } from "@/components/blocks/HeroSection";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { HowItWorksSection } from "@/components/blocks/HowItWorksSection";
import { CasesSection } from "@/components/blocks/CasesSection";
import { AboutSection } from "@/components/blocks/AboutSection";
import { TestimonialsSection } from "@/components/blocks/TestimonialsSection";
import { CTASection } from "@/components/blocks/CTASection";
import { Footer } from "@/components/blocks/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <HowItWorksSection />
        <CasesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
