import type { Metadata } from "next";
import { Nav } from "@/components/blocks/Nav";
import { AboutSection } from "@/components/blocks/AboutSection";
import { MethodSection } from "@/components/blocks/MethodSection";
import { ProofSection } from "@/components/blocks/ProofSection";
import { CTASection } from "@/components/blocks/CTASection";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
  title: "À propos — l'humain derrière l'IA, notre méthode",
  description:
    "Luma est une agence IA artisanale basée à Montpellier. Notre méthode en quatre étapes, nos convictions, et le mot du fondateur.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <AboutSection />
        <MethodSection />
        <ProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
