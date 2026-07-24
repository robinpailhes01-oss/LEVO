// Portfolio Luma — projets réels.

export interface ProjectKpi {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  client: string;
  sector: string;
  example: boolean;
  accent: string; // couleur d'accent de la card 3D
  tagline: string; // phrase courte sur la card
  summary: string; // intro du projet ouvert
  context: string; // le contexte / problème
  ecosystem: string[]; // les briques de l'écosystème mises en place
  kpis: ProjectKpi[];
  stack: string[];
  flow: string[]; // mini-schéma : étapes de l'écosystème (4 nœuds)
  quote?: { text: string; author: string };
}

export const PROJECTS: Project[] = [
  {
    id: "harmonie-yacht",
    client: "Harmonie Yacht",
    sector: "Location de yachts",
    example: false,
    accent: "#1A3BFF",
    tagline: "4 agents IA qui gèrent les demandes, les contrats, le marketing et les finances.",
    summary:
      "Pour une société de location de yachts, nous avons construit un écosystème de plusieurs agents IA qui gèrent l'entreprise de bout en bout : de la première demande client jusqu'au pilotage financier.",
    context:
      "Les demandes arrivaient de partout (email, Instagram, WhatsApp) et se perdaient. Les devis, contrats et relances prenaient un temps fou, et l'équipe n'avait aucune vue d'ensemble sur ses canaux et ses finances.",
    ecosystem: [
      "Un agent qui centralise toutes les demandes (email, Instagram, WhatsApp), répond, relance et les ajoute au CRM",
      "Un agent qui génère automatiquement les factures et les contrats de location",
      "Un agent marketing qui analyse la performance de chaque canal d'acquisition",
      "Un agent finances qui donne une vue d'ensemble en temps réel (CA, encaissements, marge)",
    ],
    kpis: [
      { value: "40h+", label: "économisées/mois" },
      { value: "3x", label: "plus de devis envoyés" },
      { value: "0", label: "demande oubliée" },
    ],
    stack: ["Agents IA", "CRM", "Automatisation", "Dashboard"],
    flow: ["Demandes", "Devis & contrats", "Relances", "Pilotage"],
    quote: {
      text: "Moins de demandes oubliées, plus de temps pour nos clients.",
      author: "Ludivine Cadot, Direction Harmonie Yacht",
    },
  },
  {
    id: "energies-concept",
    client: "Énergies Concept",
    sector: "Énergie solaire · Prospection",
    example: false,
    accent: "#F97316",
    tagline: "Prospection solaire par IA et satellite, du repérage des toitures au devis.",
    summary:
      "Pour un installateur de panneaux solaires, nous avons développé un tableau de bord complet de prospection par IA : repérage des toitures par satellite, enrichissement des données entreprises, et envoi de devis personnalisés — automatiquement.",
    context:
      "La prospection solaire se faisait à la main : repérage terrain, recherche des contacts, rédaction des devis. Chronophage, et impossible à passer à l'échelle.",
    ecosystem: [
      "Analyse satellite des toitures (avec et sans panneaux) pour repérer le potentiel",
      "Récupération automatique des données des entreprises ciblées",
      "Envoi de mails personnalisés avec un devis pré-rempli",
      "Tableau de bord complet du pipeline de prospection",
    ],
    kpis: [
      { value: "Satellite", label: "analyse des toitures" },
      { value: "Auto", label: "mails + devis perso" },
      { value: "Temps réel", label: "pipeline de prospection" },
    ],
    stack: ["IA", "Imagerie satellite", "Enrichissement", "Dashboard"],
    flow: ["Repérage satellite", "Qualification", "Mail + devis", "Suivi"],
  },
  {
    id: "love-explorer",
    client: "Love Explorer",
    sector: "Conciergerie romantique",
    example: false,
    accent: "#E84393",
    tagline: "Kia, l'agent IA qui trouve le logement parfait pour chaque escapade.",
    summary:
      "Pour une conciergerie de séjours romantiques, nous avons créé Kia, un agent IA qui converse avec les clients, comprend leurs critères et leur recommande le meilleur logement possible — instantanément.",
    context:
      "Chaque demande de réservation demandait de longs échanges pour cerner l'occasion, le budget et l'ambiance, avant de proposer un logement. Lent pour l'équipe, frustrant pour le client.",
    ecosystem: [
      "Un agent conversationnel (Kia) qui échange avec les clients pour leurs demandes de réservation",
      "Qualification des critères en quelques questions (occasion, budget, ambiance)",
      "Recommandation du meilleur logement selon les critères",
      "Réactivité immédiate — une expérience client haut de gamme",
    ],
    kpis: [
      { value: "24/7", label: "réponse immédiate" },
      { value: "Sur-mesure", label: "logement idéal" },
      { value: "+ d'UX", label: "expérience client" },
    ],
    stack: ["Agent conversationnel", "Voix", "Recommandation", "Réservation"],
    flow: ["Conversation", "Critères", "Meilleur logement", "Réservation"],
  },
  {
    id: "june-content-studio",
    client: "June Content Studio",
    sector: "Créatrice de contenu",
    example: false,
    accent: "#8B6F47",
    tagline: "Veille automatisée, dashboard clients et prospection ciblée pour une créatrice de contenu.",
    summary:
      "Pour une créatrice de contenu, nous avons construit tout son écosystème business : de la veille concurrentielle automatisée à un dashboard client complet, jusqu'à la prospection ciblée par email.",
    context:
      "Entre la veille concurrentielle à la main, le suivi des clients par tableur et l'absence de vitrine pour démarcher de nouvelles marques, il n'y avait ni temps ni outils pour développer l'activité sereinement.",
    ecosystem: [
      "Un agent de veille concurrentielle qui surveille en continu les tendances et les comptes du secteur",
      "Un dashboard client avec suivi des tâches, des contenus livrés et des échéances",
      "Des statistiques détaillées par client : vues, revenus générés, performance des contenus",
      "Un site portfolio pour présenter le travail, couplé à une prospection ciblée par email",
    ],
    kpis: [
      { value: "Auto", label: "veille concurrentielle" },
      { value: "Par client", label: "stats vues & revenus" },
      { value: "Ciblée", label: "prospection par email" },
    ],
    stack: ["Veille IA", "Dashboard client", "Site portfolio", "Prospection email"],
    flow: ["Veille", "Suivi clients", "Stats & revenus", "Prospection"],
  },
];
