import type { Metadata } from "next";
import { Check, MessageCircle, Database, Settings2, Rocket } from "lucide-react";
import { Nav } from "@/components/blocks/Nav";
import { Footer } from "@/components/blocks/Footer";
import { FormationCTA } from "@/components/blocks/FormationCTA";

export const metadata: Metadata = {
  title: "Formation — Créer son agent IA WhatsApp personnalisé — Luma",
  description:
    "Apprenez à construire votre propre agent IA connecté à WhatsApp et votre CRM sur-mesure, de A à Z, sans dépendre d'un outil tiers.",
  alternates: { canonical: "/formations/agent-whatsapp" },
};

// Formation à venir — prix 200 € confirmé. Format exact et durée
// d'accès encore à préciser. Voir FormationCTA.tsx pour le bloc tarif.
const MODULES = [
  {
    icon: MessageCircle,
    num: "01",
    title: "Connecter WhatsApp Business",
    description:
      "Configurez l'API WhatsApp Business et branchez-la à votre agent — sans dépendre d'un numéro tiers ni d'un abonnement imposé.",
  },
  {
    icon: Settings2,
    num: "02",
    title: "Définir le ton et les règles de votre agent",
    description:
      "Écrivez le comportement de votre agent : ce qu'il doit dire, comment il qualifie une demande, quand il doit passer la main à un humain.",
  },
  {
    icon: Database,
    num: "03",
    title: "Construire votre CRM personnalisé",
    description:
      "Créez le CRM qui correspond à votre activité — vos étapes de suivi, vos champs, vos statuts — sans payer un outil générique surdimensionné.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Mettre en service et faire évoluer",
    description:
      "Déployez votre agent en production, testez-le avec de vraies conversations, et apprenez à l'ajuster vous-même dans la durée.",
  },
];

const INCLUDES = [
  "Méthode complète, étape par étape, pour construire votre agent de A à Z",
  "Les mêmes outils que ceux utilisés en production chez nos clients",
  "Un modèle de CRM personnalisable, prêt à adapter à votre activité",
  "Accès aux mises à jour de la formation",
];

export default function FormationAgentWhatsappPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-40 pb-16 sm:pt-48 sm:pb-20" style={{ background: "#f4f3ef" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: "rgba(26,59,255,0.12)", color: "#1A3BFF" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#1A3BFF" }} />
              Formation · Bientôt disponible
            </span>
            <h1
              className="mt-6 max-w-2xl font-body text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#111111" }}
            >
              Mettez vous-même en place votre propre agent IA WhatsApp personnalisé
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
              Grâce à cette formation, vous construisez de vos propres mains l&apos;agent
              qui répond à vos clients sur WhatsApp et le CRM qui va avec — sans
              dépendre d&apos;une agence, d&apos;un outil ou d&apos;un abonnement tiers.
            </p>
          </div>
        </section>

        {/* Programme */}
        <section className="py-20 sm:py-24" style={{ background: "#f4f3ef" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(17,17,17,0.40)" }}>
              Le programme
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {MODULES.map((m) => (
                <div
                  key={m.num}
                  className="relative overflow-hidden rounded-[24px] p-7"
                  style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-6 font-display text-[6rem] font-bold leading-none"
                    style={{ color: "rgba(17,17,17,0.04)" }}
                  >
                    {m.num}
                  </span>
                  <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(26,59,255,0.10)" }}
                  >
                    <m.icon size={20} strokeWidth={1.8} style={{ color: "#1A3BFF" }} />
                  </div>
                  <h3 className="relative mt-5 font-body text-lg font-bold" style={{ color: "#111111" }}>
                    {m.title}
                  </h3>
                  <p className="relative mt-2.5 font-body text-[15px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qui est inclus */}
        <section className="py-20 sm:py-24" style={{ background: "#111111" }}>
          <div className="mx-auto max-w-container px-5 lg:px-12">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.40)" }}>
              Ce qui est inclus
            </p>
            <h2 className="max-w-xl font-body text-2xl font-bold tracking-[-0.02em] sm:text-3xl" style={{ color: "#ffffff" }}>
              Tout ce qu&apos;il faut pour passer à l&apos;action
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(26,59,255,0.18)" }}
                  >
                    <Check size={13} strokeWidth={2.6} style={{ color: "#4D8FFF" }} />
                  </span>
                  <span className="font-body text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tarif — CTA final */}
        <FormationCTA />
      </main>
      <Footer />
    </>
  );
}
