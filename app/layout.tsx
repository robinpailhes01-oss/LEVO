import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/ui/JsonLd";
import { AuditProvider } from "@/components/AuditProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const BASE_URL = "https://luma-agence.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Luma — Agence IA sur-mesure | Montpellier",
    template: "%s | Luma",
  },
  description:
    "Luma conçoit des agents IA et des automatisations sur-mesure pour les PME du Sud de la France. Accompagnement humain, déployé en 3 semaines, 40h économisées par mois.",
  keywords: [
    "agence IA Montpellier",
    "automatisation IA PME",
    "agent conversationnel sur-mesure",
    "n8n Montpellier",
    "automatisation workflow PME",
    "intelligence artificielle Sud de la France",
    "agence IA Hérault",
    "solutions IA artisanales",
    "assistant IA entreprise",
    "gain de temps automatisation",
    "Luma agence",
  ],
  authors: [{ name: "Luma", url: BASE_URL }],
  creator: "Luma",
  publisher: "Luma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "fr-FR": BASE_URL },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Luma",
    title: "Luma — Agence IA sur-mesure | Montpellier",
    description:
      "Des agents IA et automatisations construits avec soin pour les PME du Sud de la France. Résultats concrets, accompagnement humain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luma — Agence IA sur-mesure, Montpellier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma — Agence IA sur-mesure | Montpellier",
    description:
      "Des agents IA et automatisations construits avec soin pour les PME du Sud de la France.",
    images: ["/og-image.png"],
    creator: "@luma_ia",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Geo tags — local SEO Montpellier */}
        <meta name="geo.region" content="FR-34" />
        <meta name="geo.placename" content="Montpellier" />
        <meta name="geo.position" content="43.6108;3.8767" />
        <meta name="ICBM" content="43.6108, 3.8767" />
      </head>
      <body>
        <JsonLd />
        <AuditProvider>{children}</AuditProvider>
      </body>
    </html>
  );
}
