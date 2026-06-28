// Portfolio Levo — projets / études de cas.
// `example: true` = écosystème illustratif (pas un client réel).

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
  quote?: { text: string; author: string };
}

export const PROJECTS: Project[] = [
  {
    id: "harmonie-yacht",
    client: "Harmonie Yacht",
    sector: "Location de yachts",
    example: false,
    accent: "#1A3BFF",
    tagline: "L'agent Léa qui qualifie, devise et relance — seule.",
    summary:
      "Pour une société de location de yachts, nous avons conçu un écosystème complet autour de Léa, une assistante virtuelle qui pré-qualifie chaque demande, prépare les devis et relance les prospects au bon moment — sans aucune intervention humaine.",
    context:
      "Les demandes arrivaient de partout (WhatsApp, email, formulaire) et se perdaient. L'équipe passait ses journées à requalifier et à relancer, au détriment de la relation client.",
    ecosystem: [
      "Agent Léa sur WhatsApp : pré-qualification (budget, dates, type de yacht)",
      "Génération et envoi automatique des devis via n8n en moins de 2 minutes",
      "Relances intelligentes à J+2 et J+7 sans réponse",
      "Dashboard de suivi des demandes en temps réel",
    ],
    kpis: [
      { value: "40h+", label: "économisées/mois" },
      { value: "3x", label: "plus de devis envoyés" },
      { value: "0", label: "demande oubliée" },
    ],
    stack: ["Agent IA", "n8n", "Supabase", "Dashboard"],
    quote: {
      text: "Moins de demandes oubliées, plus de temps pour nos clients.",
      author: "Camille R., Direction Harmonie Yacht",
    },
  },
  {
    id: "cabinet-conseil",
    client: "Cabinet de conseil",
    sector: "Services aux entreprises",
    example: true,
    accent: "#1A7F37",
    tagline: "Un écosystème qui transforme les emails entrants en missions.",
    summary:
      "Écosystème illustratif pour un cabinet de conseil : centraliser les demandes entrantes, qualifier automatiquement et préparer les propositions commerciales.",
    context:
      "Exemple typique : un cabinet reçoit des sollicitations par email et LinkedIn, mais le suivi est manuel et les propositions prennent des jours à sortir.",
    ecosystem: [
      "Agent de tri qui lit les emails entrants et qualifie la demande",
      "Génération d'une première proposition commerciale pré-remplie",
      "Synchronisation CRM + relances automatiques",
      "Tableau de bord pipeline en temps réel",
    ],
    kpis: [
      { value: "-70%", label: "temps de qualification" },
      { value: "24h", label: "pour une proposition" },
      { value: "x2", label: "demandes traitées" },
    ],
    stack: ["Agent IA", "n8n", "CRM", "Dashboard"],
  },
  {
    id: "ecommerce-artisan",
    client: "Marque artisanale",
    sector: "E-commerce / Retail",
    example: true,
    accent: "#B8860B",
    tagline: "Le SAV et les avis clients, gérés automatiquement.",
    summary:
      "Écosystème illustratif pour une marque artisanale en ligne : automatiser le support client et la collecte d'avis après achat.",
    context:
      "Exemple typique : une petite marque croule sous les messages SAV répétitifs et oublie de demander les avis qui font vendre.",
    ecosystem: [
      "Agent SAV qui répond aux questions récurrentes (livraison, retours)",
      "Escalade vers l'humain uniquement quand c'est nécessaire",
      "Demande d'avis automatique J+7 après livraison",
      "Synthèse hebdomadaire des irritants clients",
    ],
    kpis: [
      { value: "80%", label: "tickets résolus seuls" },
      { value: "+35%", label: "avis collectés" },
      { value: "<2min", label: "temps de réponse" },
    ],
    stack: ["Agent IA", "n8n", "Shopify", "Dashboard"],
  },
  {
    id: "cabinet-sante",
    client: "Cabinet de santé",
    sector: "Santé / Bien-être",
    example: true,
    accent: "#0B6E63",
    tagline: "Zéro rendez-vous manqué, zéro appel en attente.",
    summary:
      "Écosystème illustratif pour un cabinet pluridisciplinaire : gérer la prise de rendez-vous et les rappels sans mobiliser le secrétariat.",
    context:
      "Exemple typique : le téléphone sonne en continu, les créneaux annulés ne sont pas re-proposés et les no-shows coûtent cher.",
    ecosystem: [
      "Agent de prise de rendez-vous (téléphone + messages)",
      "Rappels automatiques et re-proposition des créneaux libérés",
      "Pré-remplissage des dossiers avant la consultation",
      "Tableau de bord d'occupation en temps réel",
    ],
    kpis: [
      { value: "-60%", label: "no-shows" },
      { value: "100%", label: "appels pris" },
      { value: "15h", label: "secrétariat libéré/sem." },
    ],
    stack: ["Agent vocal", "n8n", "Agenda", "Dashboard"],
  },
];
