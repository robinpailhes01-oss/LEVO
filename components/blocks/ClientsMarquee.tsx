"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ClientLogo {
  name: string;
  src: string;
}

// Logos clients — bande déroulante horizontale infinie.
// Pour ajouter un logo : dépose l'image dans public/clients/ et ajoute une entrée ici.
const CLIENTS: ClientLogo[] = [
  { name: "LS Consulting", src: "/clients/ls-consulting.jpg" },
  { name: "Champagne Perla", src: "/clients/champagne-perla.jpg" },
];

export function ClientsMarquee() {
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 sm:py-24" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <ScrollReveal className="mb-10 text-center">
          <p className="section-label mx-auto justify-center">Ils nous font confiance</p>
        </ScrollReveal>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-6"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {repeated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex h-24 w-52 shrink-0 items-center justify-center rounded-[20px] px-6"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(17,17,17,0.08)",
                boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
              }}
            >
              <div className="relative h-14 w-full">
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
