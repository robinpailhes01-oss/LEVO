"use client";

import { useState } from "react";
import { MessageCircle, LayoutGrid, Gauge, Check, Inbox } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAudit } from "@/hooks/useAudit";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Connectez votre WhatsApp",
    description: "Votre numéro WhatsApp Business branché à l'agent en quelques jours — aucune interruption de service.",
  },
  {
    icon: LayoutGrid,
    title: "L'agent qualifie et classe",
    description: "Chaque message est lu, qualifié et rangé automatiquement dans votre CRM sur-mesure : Nouveau, Qualifié, Devis envoyé, Réservé.",
  },
  {
    icon: Gauge,
    title: "Vous suivez tout, en un coup d'œil",
    description: "Nombre de messages traités et coût exact du mois, visibles en temps réel sur votre tableau de bord.",
  },
];

const PIPELINE = [
  { label: "Nouveau", count: 12, color: "#8A8F98" },
  { label: "Qualifié", count: 9, color: "#1A3BFF" },
  { label: "Devis envoyé", count: 3, color: "#B8860B" },
  { label: "Réservé", count: 2, color: "#1A7F37" },
];

const INBOX = [
  { name: "Émilie Rousseau", message: "Disponibilités 15 août — famille 6 personnes", channel: "WhatsApp", status: "En attente", statusColor: "#B8860B", agent: "Léa", time: "hier" },
  { name: "Karim Haddad", message: "Retard à l'embarquement — demande de geste", channel: "WhatsApp", status: "Escaladée", statusColor: "#CC3333", agent: "Marc", time: "il y a 2j" },
  { name: "Eva Fischer", message: "Demi-journée en semaine — tarifs", channel: "WhatsApp", status: "Résolue", statusColor: "#1A7F37", agent: "Léa", time: "il y a 3j" },
];

export function OfferSection() {
  const { openAudit } = useAudit();
  const [tab, setTab] = useState<"crm" | "inbox">("crm");

  return (
    <section className="py-28 sm:py-36" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-14">
          {/* Colonne gauche — pitch de l'offre */}
          <ScrollReveal>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: "rgba(26,59,255,0.14)", color: "#7C97FF" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4D8FFF" }} />
              Offre du moment
            </span>

            <h2
              className="mt-6 font-body text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#ffffff" }}
            >
              Un agent IA WhatsApp, avec son CRM sur-mesure.
            </h2>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
              Idéal pour les établissements qui reçoivent beaucoup de demandes sur
              WhatsApp : hôtels, conciergeries, locations, restaurants. L&apos;agent
              répond, qualifie et range chaque conversation — vous gardez la main sur
              tout depuis un CRM pensé pour votre activité.
            </p>

            {/* Mise en avant du modèle tarifaire */}
            <div
              className="mt-8 flex items-center gap-4 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(77,143,255,0.16)" }}
              >
                <Check size={18} strokeWidth={2.5} style={{ color: "#4D8FFF" }} />
              </span>
              <p className="font-body text-[15px] leading-snug" style={{ color: "#ffffff" }}>
                <span className="font-bold">Mise en place offerte.</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  Vous ne payez que votre utilisation réelle — au message traité.
                </span>
              </p>
            </div>

            {/* Étapes */}
            <div className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold"
                      style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff" }}
                    >
                      {i + 1}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="mt-2 w-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="flex items-center gap-2 font-body text-[15px] font-bold" style={{ color: "#ffffff" }}>
                      <s.icon size={15} strokeWidth={2} style={{ color: "#4D8FFF" }} />
                      {s.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => openAudit("demo")}
                className="inline-flex items-center rounded-full px-8 py-4 font-body text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-90"
                style={{ background: "#ffffff", color: "#111111" }}
                strength={0.25}
              >
                Demander ma démo personnalisée →
              </MagneticButton>
              <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Réponse sous 24h · Sans engagement
              </span>
            </div>
          </ScrollReveal>

          {/* Colonne droite — mockup produit */}
          <ScrollReveal delay={100}>
            <div
              className="overflow-hidden rounded-[24px]"
              style={{ background: "#f4f3ef", boxShadow: "0 32px 80px rgba(0,0,0,0.35)" }}
            >
              {/* Barre d'usage & coût — le cœur de la demande */}
              <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(17,17,17,0.08)" }}>
                <div className="p-6" style={{ background: "#ffffff" }}>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: "rgba(17,17,17,0.45)" }}>
                    Messages traités
                  </p>
                  <p className="mt-2 font-body text-3xl font-black tracking-[-0.02em]" style={{ color: "#111111" }}>
                    1 284
                  </p>
                  <p className="mt-1 font-body text-xs" style={{ color: "rgba(17,17,17,0.40)" }}>ce mois-ci</p>
                </div>
                <div className="p-6" style={{ background: "#ffffff" }}>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: "rgba(17,17,17,0.45)" }}>
                    Coût du mois
                  </p>
                  <p className="mt-2 font-body text-3xl font-black tracking-[-0.02em]" style={{ color: "#1A3BFF" }}>
                    64,20 €
                  </p>
                  <p className="mt-1 font-body text-xs" style={{ color: "rgba(17,17,17,0.40)" }}>0,05 € / message</p>
                </div>
              </div>

              {/* Deux exemples de tableau de bord : CRM et Boîte de réception */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTab("crm")}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors"
                    style={{
                      background: tab === "crm" ? "#111111" : "rgba(17,17,17,0.06)",
                      color: tab === "crm" ? "#ffffff" : "rgba(17,17,17,0.55)",
                    }}
                  >
                    <LayoutGrid size={12} strokeWidth={2.2} />
                    Suivi commercial · CRM
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("inbox")}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors"
                    style={{
                      background: tab === "inbox" ? "#111111" : "rgba(17,17,17,0.06)",
                      color: tab === "inbox" ? "#ffffff" : "rgba(17,17,17,0.55)",
                    }}
                  >
                    <Inbox size={12} strokeWidth={2.2} />
                    Boîte de réception
                  </button>
                </div>

                {tab === "crm" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PIPELINE.map((col) => (
                        <div
                          key={col.label}
                          className="rounded-2xl p-3.5"
                          style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
                        >
                          <span className="flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(17,17,17,0.50)" }}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
                            {col.label}
                          </span>
                          <p className="mt-2 font-body text-xl font-extrabold tracking-[-0.02em]" style={{ color: "#111111" }}>
                            {col.count}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Aperçu conversation WhatsApp */}
                    <div className="mt-4 rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-body text-xs font-semibold" style={{ color: "#111111" }}>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(37,211,102,0.14)" }}>
                            <MessageCircle size={12} strokeWidth={2.4} style={{ color: "#25D366" }} />
                          </span>
                          Émilie Rousseau
                        </span>
                        <span className="font-body text-[10px]" style={{ color: "rgba(17,17,17,0.35)" }}>il y a 2 min</span>
                      </div>
                      <p className="mt-2.5 font-body text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
                        « Bonjour, avez-vous des disponibilités le 15 août pour 6 personnes ? »
                      </p>
                      <span
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] font-semibold"
                        style={{ background: "rgba(26,59,255,0.10)", color: "#1A3BFF" }}
                      >
                        Qualifié automatiquement
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    {INBOX.map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between gap-3 rounded-2xl p-3.5"
                        style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-body text-[13px] font-semibold" style={{ color: "#111111" }}>{row.name}</span>
                            <span className="font-body text-[10px]" style={{ color: "rgba(17,17,17,0.35)" }}>{row.channel}</span>
                          </div>
                          <p className="mt-0.5 truncate font-body text-xs" style={{ color: "rgba(17,17,17,0.55)" }}>{row.message}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span
                            className="rounded-full px-2 py-0.5 font-body text-[10px] font-semibold"
                            style={{ background: `${row.statusColor}18`, color: row.statusColor }}
                          >
                            {row.status}
                          </span>
                          <span className="font-body text-[10px]" style={{ color: "rgba(17,17,17,0.35)" }}>{row.agent} · {row.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
