import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://levo.fr"),
  title: {
    default: "Levo — Agence IA sur-mesure | Montpellier",
    template: "%s | Levo",
  },
  description:
    "Levo conçoit des solutions d'automatisation IA personnalisées pour les PME du Sud de la France. Accompagnement sur-mesure, de la conception au déploiement.",
  keywords: [
    "agence IA",
    "automatisation",
    "Montpellier",
    "sur-mesure",
    "n8n",
    "Claude",
    "PME",
  ],
  authors: [{ name: "Levo" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Levo",
    title: "Levo — Agence IA sur-mesure | Montpellier",
    description:
      "Des solutions d'automatisation IA construites avec soin pour les PME et startups du Sud de la France.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
