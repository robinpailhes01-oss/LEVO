// Catalogue des services Luma — utilisé par la page /services.

export interface ServiceEntry {
  slug: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
  href?: string; // page dédiée si elle existe, sinon ancre sur la home
  badge?: string; // ex. "Offre du moment"
}

export const SERVICES: ServiceEntry[] = [
  {
    slug: "agent-whatsapp",
    title: "Agent IA WhatsApp + CRM personnalisé",
    description:
      "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans un CRM pensé pour votre activité. Mise en place offerte, vous ne payez que votre utilisation.",
    tag: "Idéal beaucoup de demandes WhatsApp",
    accent: "#1A3BFF",
    href: "/services/agent-whatsapp",
    badge: "Offre du moment",
  },
  {
    slug: "agents-conversationnels",
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    tag: "Répond à votre place",
    accent: "#1A7F37",
    href: "/#services",
  },
  {
    slug: "automatisation-workflows",
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    tag: "Zéro tâche manuelle",
    accent: "#B8860B",
    href: "/#services",
  },
  {
    slug: "tableaux-de-bord",
    title: "Tableaux de bord",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    tag: "Suivi en temps réel",
    accent: "#7B2FBE",
    href: "/#services",
  },
  {
    slug: "sites-web",
    title: "Sites web & référencement SEO",
    description:
      "Sites vitrines et landing pages sur-mesure, pensés pour convertir et bien référencés dès la conception.",
    tag: "Créations sur-mesure",
    accent: "#0B6E63",
    href: "/#cas",
  },
];
