const BASE_URL = "https://luma-agence.fr";

interface Props {
  name: string;
  description: string;
  slug: string;
}

/**
 * Données structurées d'une page service :
 * - Service (rattaché à l'Organization Luma)
 * - BreadcrumbList (fil d'Ariane Accueil › Nos services › <service>)
 */
export function ServiceJsonLd({ name, description, slug }: Props) {
  const url = `${BASE_URL}/services/${slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType: name,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Montpellier" },
      { "@type": "AdministrativeArea", name: "Occitanie" },
      { "@type": "Country", name: "France" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Nos services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
