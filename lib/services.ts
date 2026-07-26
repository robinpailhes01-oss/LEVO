// Catalogue des services Luma — utilisé par /services et /services/[slug].

export interface ServiceExample {
  title: string;
  description: string;
}

export interface ServiceEntry {
  slug: string;
  title: string;
  description: string; // résumé court (carte listing)
  intro: string; // paragraphe d'intro sur la page dédiée
  tag: string;
  accent: string;
  href?: string; // page dédiée si elle existe
  badge?: string; // ex. "Offre du moment"
  features: string[]; // ce que comprend le service
  examples: ServiceExample[]; // cas d'usage concrets, sans prix
}

export const SERVICES: ServiceEntry[] = [
  {
    slug: "agent-whatsapp",
    title: "Agent IA WhatsApp + CRM personnalisé",
    description:
      "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans un CRM pensé pour votre activité. Mise en place offerte, vous ne payez que votre utilisation.",
    intro:
      "Un agent IA qui répond à vos clients sur WhatsApp, qualifie chaque demande et la range automatiquement dans un CRM pensé pour votre activité.",
    tag: "Idéal beaucoup de demandes WhatsApp",
    accent: "#1A3BFF",
    href: "/services/agent-whatsapp",
    badge: "Offre du moment",
    features: [],
    examples: [],
  },
  {
    slug: "agents-conversationnels",
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    intro:
      "Un agent IA branché sur vos canaux (email, WhatsApp, Instagram, formulaire du site) qui comprend chaque demande, y répond dans votre ton et prépare le travail avant même que vous n'ouvriez la conversation.",
    tag: "Répond à votre place",
    accent: "#1A7F37",
    href: "/services/agents-conversationnels",
    features: [
      "Compréhension du langage naturel, dans votre ton et votre vocabulaire métier",
      "Connexion à vos canaux existants — email, WhatsApp, Instagram, formulaire",
      "Qualification automatique de chaque demande (besoin, budget, urgence)",
      "Escalade vers un humain dès que la situation le demande",
    ],
    examples: [
      {
        title: "Conciergerie de séjours romantiques",
        description:
          "Kia, notre agent pour Love Explorer, échange avec les clients, comprend leurs critères (occasion, budget, ambiance) et recommande le meilleur logement — instantanément, 24/7.",
      },
      {
        title: "Location de yachts",
        description:
          "Pour Harmonie Yacht, un agent centralise les demandes venues d'email, Instagram et WhatsApp, répond, relance et alimente le CRM sans intervention manuelle.",
      },
    ],
  },
  {
    slug: "automatisation-workflows",
    title: "Automatisation de workflows",
    description:
      "Devis, relances, synthèses, onboarding : on connecte vos outils pour que les tâches répétitives se fassent toutes seules.",
    intro:
      "On relie vos outils entre eux pour que les tâches répétitives — devis, relances, synthèses, onboarding — se fassent seules, sans que vous ayez à y penser.",
    tag: "Zéro tâche manuelle",
    accent: "#B8860B",
    href: "/services/automatisation-workflows",
    features: [
      "Génération automatique de devis et de contrats",
      "Relances programmées (J+2, J+7…) sans oubli possible",
      "Synchronisation entre vos outils existants (CRM, email, facturation)",
      "Notifications et rapports envoyés automatiquement aux bonnes personnes",
    ],
    examples: [
      {
        title: "Prospection solaire par satellite",
        description:
          "Pour Énergies Concept, l'analyse satellite des toitures, l'enrichissement des données entreprises et l'envoi de devis personnalisés sont entièrement automatisés.",
      },
      {
        title: "Facturation et contrats",
        description:
          "Pour Harmonie Yacht, les factures et contrats de location sont générés automatiquement dès qu'une réservation est confirmée.",
      },
    ],
  },
  {
    slug: "tableaux-de-bord",
    title: "Tableaux de bord",
    description:
      "Un dashboard clair pour suivre vos demandes et vos résultats en temps réel, construit sur-mesure autour de votre activité.",
    intro:
      "Un tableau de bord unique, construit autour de votre activité, pour suivre en un coup d'œil vos demandes, vos résultats et ce qui mérite votre attention.",
    tag: "Suivi en temps réel",
    accent: "#7B2FBE",
    href: "/services/tableaux-de-bord",
    features: [
      "Vue d'ensemble en temps réel de votre activité (CA, demandes, pipeline)",
      "Suivi par client : tâches, contenus livrés, échéances",
      "Statistiques détaillées (performance, revenus, volume traité)",
      "Accessible depuis n'importe quel appareil, pensé mobile-first",
    ],
    examples: [
      {
        title: "Pilotage financier en temps réel",
        description:
          "Pour Harmonie Yacht, un agent finances donne une vue d'ensemble en continu : chiffre d'affaires, encaissements, marge.",
      },
      {
        title: "Suivi clients pour créateurs de contenu",
        description:
          "Pour June Content Studio, un dashboard centralise les tâches, les contenus livrés et les statistiques par client — vues, revenus générés, performance.",
      },
    ],
  },
  {
    slug: "sites-web",
    title: "Sites web & référencement SEO",
    description:
      "Sites vitrines et landing pages sur-mesure, pensés pour convertir et bien référencés dès la conception.",
    intro:
      "Des sites vitrines et landing pages sur-mesure — jamais de template — pensés pour convertir vos visiteurs et bien référencés sur Google dès la conception.",
    tag: "Créations sur-mesure",
    accent: "#0B6E63",
    href: "/services/sites-web",
    features: [
      "Design sur-mesure, jamais de template générique",
      "Structure et contenu pensés pour le référencement naturel (SEO)",
      "Formulaires de contact et de devis connectés à votre CRM",
      "Site rapide, responsive et facile à faire évoluer",
    ],
    examples: [
      {
        title: "Site vitrine avec formulaire de devis",
        description:
          "Pour JeanBa Jardin, paysagiste créateur de jardins sur-mesure : un site vitrine avec demande de devis en ligne, pensé pour convertir.",
      },
      {
        title: "Landing page premium",
        description:
          "Pour Fabien · LS Consulting, une landing page sombre et élégante pour le personal branding et l'acquisition de clients consulting.",
      },
    ],
  },
];

export function getService(slug: string): ServiceEntry | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
