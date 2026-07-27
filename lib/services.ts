// Catalogue des services Luma — utilisé par /services et /services/[slug].

export interface ServiceExample {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
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
  faq: ServiceFaq[]; // questions fréquentes → schema FAQPage
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
    faq: [
      {
        question: "Combien de temps prend la mise en place d'un agent IA WhatsApp ?",
        answer:
          "Sous une semaine dans la plupart des cas, entre le premier échange et la mise en service. Nous connectons votre numéro WhatsApp Business, paramétrons l'agent avec vos règles métier et votre ton, puis testons avec vous avant l'ouverture aux clients. Votre activité n'est jamais interrompue pendant l'installation.",
      },
      {
        question: "Et si je n'ai pas encore de CRM ?",
        answer:
          "C'est le cas le plus fréquent, et ce n'est pas un problème : le CRM fait partie de la prestation. Nous le construisons sur-mesure autour de votre activité, avec vos propres étapes de suivi (par exemple Nouveau, Qualifié, Devis envoyé, Réservé). Vous n'avez aucun outil à acheter ni à configurer vous-même.",
      },
      {
        question: "Combien coûte un agent IA WhatsApp pour un établissement ?",
        answer:
          "La mise en place est offerte : vous ne payez que votre utilisation réelle, au message traité. Il n'y a ni abonnement fixe, ni engagement de durée. Vous suivez en temps réel, depuis votre tableau de bord, le nombre de messages traités et le coût exact du mois en cours.",
      },
      {
        question: "L'agent peut-il répondre à la place de mon équipe 24h/24 ?",
        answer:
          "Oui. L'agent répond instantanément, à toute heure, y compris la nuit et le week-end. Il qualifie chaque demande selon vos critères et escalade automatiquement vers un membre de votre équipe dès qu'une situation le nécessite — réclamation, demande complexe ou hors périmètre.",
      },
      {
        question: "Pour quels types d'établissements est-ce adapté ?",
        answer:
          "Cette solution est conçue pour les établissements qui reçoivent un volume important de demandes sur WhatsApp : hôtels, conciergeries, locations saisonnières, loueurs de bateaux et de yachts, restaurants et lieux d'expérience. Si vos clients vous écrivent principalement sur WhatsApp, l'agent est pertinent.",
      },
    ],
  },
  {
    slug: "agents-conversationnels",
    title: "Agents conversationnels",
    description:
      "Des assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail — dans votre ton, avec vos règles.",
    intro:
      "Un agent IA branché sur vos canaux (email, WhatsApp, formulaire du site) qui comprend chaque demande, y répond dans votre ton et prépare le travail avant même que vous n'ouvriez la conversation.",
    tag: "Répond à votre place",
    accent: "#1A7F37",
    href: "/services/agents-conversationnels",
    features: [
      "Compréhension du langage naturel, dans votre ton et votre vocabulaire métier",
      "Connexion à vos canaux existants — email, WhatsApp, formulaire",
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
    faq: [
      {
        question: "Qu'est-ce qu'un agent conversationnel IA pour une entreprise ?",
        answer:
          "C'est un assistant intelligent branché sur vos canaux de contact (email, WhatsApp, formulaire de votre site). Il comprend les demandes rédigées en langage naturel, y répond avec votre ton et votre vocabulaire métier, qualifie le besoin du client et prépare le dossier avant votre intervention.",
      },
      {
        question: "L'agent répond-il vraiment comme nous, ou avec un ton robotique ?",
        answer:
          "Nous le paramétrons à partir de vos vraies conversations et de vos règles métier. Il reprend vos formulations, votre niveau de langage et vos réponses habituelles. Vous validez le ton pendant la phase de test, et vous pouvez l'ajuster à tout moment après la mise en service.",
      },
      {
        question: "Que se passe-t-il si l'agent ne sait pas répondre ?",
        answer:
          "Il ne devine jamais. Lorsqu'une demande sort de son périmètre, qu'elle est ambiguë ou sensible, il transmet la conversation à un membre de votre équipe avec tout le contexte déjà rassemblé. Vous gardez la main sur les échanges qui comptent.",
      },
      {
        question: "Sur quels canaux l'agent peut-il être installé ?",
        answer:
          "Sur ceux que vous utilisez déjà : WhatsApp, email, formulaire de contact de votre site. Nous nous connectons à vos outils existants — vous n'avez ni plateforme à changer, ni nouveau numéro à communiquer à vos clients.",
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
    faq: [
      {
        question: "Quelles tâches peut-on automatiser dans une PME ?",
        answer:
          "Tout ce qui est répétitif et suit une règle : génération de devis et de contrats, relances clients programmées, facturation, onboarding de nouveaux clients, synthèses et rapports, transfert d'informations entre vos outils. En moyenne, nos clients récupèrent une quarantaine d'heures par mois.",
      },
      {
        question: "Faut-il changer d'outils pour automatiser ses processus ?",
        answer:
          "Non, et c'est un point important. Nous nous connectons à ce que vous utilisez déjà — votre CRM, votre messagerie, votre logiciel de facturation, votre agenda. L'objectif est de faire communiquer vos outils entre eux, pas de vous imposer une nouvelle plateforme à apprendre.",
      },
      {
        question: "Combien de temps faut-il pour automatiser un processus ?",
        answer:
          "Un premier automatisme utile est généralement en production sous une semaine. Nous commençons par le processus qui vous coûte le plus de temps, nous le mettons en service, puis nous étendons progressivement au reste de votre activité.",
      },
      {
        question: "Que se passe-t-il si une automatisation tombe en panne ?",
        answer:
          "Vous êtes alerté immédiatement et nous intervenons. Nos automatisations sont conçues pour échouer proprement : en cas de problème, la tâche est signalée pour traitement manuel plutôt que perdue silencieusement. Nous restons présents après la livraison.",
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
    faq: [
      {
        question: "En quoi un tableau de bord sur-mesure diffère-t-il d'un outil du marché ?",
        answer:
          "Un outil du marché vous impose ses indicateurs et son vocabulaire. Un tableau de bord sur-mesure affiche vos chiffres, avec vos mots et vos étapes de suivi. Vous ne payez pas pour des fonctions inutiles et vous ne cherchez pas l'information : elle est là où vous l'attendez.",
      },
      {
        question: "Peut-on consulter le tableau de bord depuis un téléphone ?",
        answer:
          "Oui, tous nos tableaux de bord sont pensés pour le mobile en priorité. Vous consultez vos demandes en cours, vos résultats et vos alertes depuis votre téléphone, sans installer d'application.",
      },
      {
        question: "Les données sont-elles mises à jour en temps réel ?",
        answer:
          "Oui. Le tableau de bord est alimenté directement par vos agents et vos automatisations : dès qu'une demande arrive, qu'un devis part ou qu'une réservation est confirmée, l'information apparaît sans manipulation de votre part.",
      },
      {
        question: "Qui peut accéder au tableau de bord ?",
        answer:
          "Vous décidez. Nous mettons en place les accès selon votre organisation : direction, équipe commerciale, ou vue restreinte par collaborateur. Chacun voit ce qui le concerne.",
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
    faq: [
      {
        question: "Combien de temps faut-il pour créer un site vitrine sur-mesure ?",
        answer:
          "Comptez environ trois semaines entre le premier échange et la mise en ligne pour un site vitrine. Nous commençons par comprendre votre métier et vos clients, puis nous construisons en vous montrant les avancées au fur et à mesure — vous n'attendez jamais dans le noir.",
      },
      {
        question: "Le site sera-t-il bien référencé sur Google ?",
        answer:
          "Le référencement naturel est intégré dès la conception, pas ajouté après coup : structure des pages, titres, vitesse de chargement, données structurées et contenu pensé pour les recherches de vos clients. Nous configurons également votre fiche Google et les outils de suivi de position.",
      },
      {
        question: "Puis-je modifier mon site moi-même ensuite ?",
        answer:
          "Oui. Nous construisons des sites simples à faire évoluer et nous vous formons à leur prise en main. Vous restez autonome sur vos contenus, et nous restons disponibles pour les évolutions plus techniques.",
      },
      {
        question: "Travaillez-vous avec des entreprises hors de Montpellier ?",
        answer:
          "Oui. Nous sommes basés à Montpellier et proches de nos clients du Sud de la France, mais nous accompagnons des entreprises partout en France. Les échanges se font en visioconférence lorsque le déplacement n'est pas nécessaire.",
      },
    ],
  },
];

export function getService(slug: string): ServiceEntry | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
