// Logique métier de l'audit gratuit — options + estimation de la perte.
// Partagé entre le formulaire (aperçu live) et l'API (stockage).

export interface AuditData {
  prenom: string;
  nom: string;
  email: string;
  entreprise: string;
  secteur: string;
  taches: string[];
  temps_par_tache: Record<string, number>; // heures/semaine par tâche
  demandes_semaine: string;
  temps_reponse: string;
  devis_semaine: string;
  temps_devis: string;
  clients_perdus: string;
  panier_moyen: string;
  horizon: string;
}

export const TACHE_OPTIONS: { key: string; label: string }[] = [
  { key: "reponses_clients", label: "Réponses aux clients" },
  { key: "devis", label: "Création de devis" },
  { key: "relances", label: "Relances" },
  { key: "facturation", label: "Facturation" },
  { key: "contenu", label: "Création de contenu / réseaux" },
  { key: "seo", label: "SEO / visibilité" },
  { key: "prise_rdv", label: "Prise de rendez-vous" },
  { key: "admin", label: "Saisie administrative" },
];

export const HEURES_OPTIONS = [1, 2, 4, 6, 10];

// Ce que devient chaque tâche une fois automatisée par Levo — sert à montrer
// l'écosystème IA sur-mesure à l'étape résultat.
export const INFRA_MAP: Record<string, { brique: string; detail: string }> = {
  reponses_clients: {
    brique: "Agent conversationnel",
    detail: "Répond et pré-qualifie vos clients 24/7, dans votre ton.",
  },
  devis: {
    brique: "Devis automatiques",
    detail: "Générés et envoyés en moins de 2 minutes.",
  },
  relances: {
    brique: "Relances intelligentes",
    detail: "Déclenchées seules à J+2 et J+7, sans oubli.",
  },
  facturation: {
    brique: "Facturation automatisée",
    detail: "Émises et suivies sans saisie manuelle.",
  },
  contenu: {
    brique: "Studio de contenu",
    detail: "Posts et visuels rédigés puis planifiés pour vous.",
  },
  seo: {
    brique: "Moteur SEO / GEO",
    detail: "Votre visibilité locale optimisée en continu.",
  },
  prise_rdv: {
    brique: "Agent de rendez-vous",
    detail: "Prend, confirme et rappelle les rendez-vous.",
  },
  admin: {
    brique: "Automatisation administrative",
    detail: "La saisie et les tâches répétitives disparaissent.",
  },
};

// Valeurs représentatives pour convertir les fourchettes en nombres.
const CLIENTS_PERDUS_REP: Record<string, number> = {
  "0": 0,
  "1-2": 1.5,
  "3-5": 4,
  "5+": 7,
};
const PANIER_REP: Record<string, number> = {
  "<500": 300,
  "500-2000": 1200,
  "2000-5000": 3500,
  "5000+": 7000,
};

const COUT_HORAIRE = 35; // € — coût moyen d'une heure de travail
const SEMAINES_PAR_MOIS = 4.33;

export interface AuditResult {
  heures_perdues_semaine: number;
  perte_mensuelle_estimee: number;
}

export function computeAudit(data: Pick<AuditData, "temps_par_tache" | "clients_perdus" | "panier_moyen">): AuditResult {
  const heures = Object.values(data.temps_par_tache ?? {}).reduce(
    (sum, h) => sum + (Number(h) || 0),
    0,
  );

  const coutTemps = heures * SEMAINES_PAR_MOIS * COUT_HORAIRE;
  const clients = CLIENTS_PERDUS_REP[data.clients_perdus] ?? 0;
  const panier = PANIER_REP[data.panier_moyen] ?? 0;
  const manqueAGagner = clients * panier;

  return {
    heures_perdues_semaine: Math.round(heures * 10) / 10,
    perte_mensuelle_estimee: Math.round(coutTemps + manqueAGagner),
  };
}
