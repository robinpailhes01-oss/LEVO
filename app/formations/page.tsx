import type { Metadata } from "next";
import { Nav } from "@/components/blocks/Nav";
import { FormationsSection } from "@/components/blocks/FormationsSection";
import { CTASection } from "@/components/blocks/CTASection";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
  title: "Formations — apprenez à construire votre propre IA",
  description:
    "Formations guidées et consulting privé pour créer vous-même votre agent IA WhatsApp, vos sites et votre infrastructure IA sur-mesure.",
  alternates: { canonical: "/formations" },
};

export default function FormationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <FormationsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
