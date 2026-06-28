const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://levo.fr/#organization",
  name: "Levo",
  url: "https://levo.fr",
  logo: {
    "@type": "ImageObject",
    url: "https://levo.fr/brand/logo.png",
    width: 200,
    height: 60,
  },
  description:
    "Levo est une agence IA artisanale basée à Montpellier. Elle conçoit des agents conversationnels et des automatisations sur-mesure pour les PME du Sud de la France.",
  email: "contact@levo.fr",
  foundingDate: "2024",
  areaServed: [
    { "@type": "City", name: "Montpellier" },
    { "@type": "State", name: "Hérault" },
    { "@type": "AdministrativeArea", name: "Sud de la France" },
    { "@type": "Country", name: "France" },
  ],
  knowsAbout: [
    "Intelligence artificielle",
    "Automatisation de workflows",
    "Agents conversationnels",
    "n8n",
    "Next.js",
  ],
  sameAs: [],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://levo.fr/#localbusiness",
  name: "Levo",
  description:
    "Agence IA sur-mesure à Montpellier — agents conversationnels, automatisation de workflows et tableaux de bord pour PME et startups.",
  url: "https://levo.fr",
  telephone: "",
  email: "contact@levo.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montpellier",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6108,
    longitude: 3.8767,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Virement bancaire",
  image: "https://levo.fr/og-image.png",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services IA sur-mesure",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agents conversationnels IA",
          description:
            "Création d'assistants IA qui pré-qualifient vos demandes, répondent à vos clients et préparent le travail dans votre ton.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatisation de workflows",
          description:
            "Connexion de vos outils (CRM, email, agenda) pour automatiser les tâches répétitives : devis, relances, onboarding.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tableaux de bord sur-mesure",
          description:
            "Dashboards clairs pour suivre vos demandes et résultats en temps réel, construits autour de votre activité.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://levo.fr/#website",
  url: "https://levo.fr",
  name: "Levo — Agence IA sur-mesure",
  description: "Agents IA et automatisations sur-mesure pour PME · Montpellier",
  publisher: { "@id": "https://levo.fr/#organization" },
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "ContactAction",
    target: "mailto:contact@levo.fr",
    name: "Contacter Levo",
  },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
