import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Levo — Agence IA sur-mesure",
    short_name: "Levo",
    description:
      "Agents IA et automatisations sur-mesure pour PME · Montpellier, Sud de la France",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#111111",
    lang: "fr-FR",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
