import Link from "next/link";
import {
  getKpis,
  getRecentLogs,
  getPostsToValidate,
  getHotLeads,
  getAgentActivity,
} from "@/lib/dashboard/queries";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Card, StatCard, Badge, EmptyState } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

const AGENTS = [
  {
    name: "LUNA",
    role: "Création de contenu",
    avatar: "/avatars/luna.svg",
    accent: "#1A3BFF",
    href: "/dashboard/luna",
    statLabel: "posts cette semaine",
    fallback: "Prête à générer les idées de la semaine.",
  },
  {
    name: "ORION",
    role: "Acquisition client",
    avatar: "/avatars/orion.svg",
    accent: "#CC3A00",
    href: "/dashboard/orion",
    statLabel: "leads chauds",
    fallback: "En veille — aucun lead à enrichir.",
  },
  {
    name: "HERMES",
    role: "Analytics & reporting",
    avatar: "/avatars/hermes.svg",
    accent: "#0B6E63",
    href: "/dashboard/hermes",
    statLabel: "rapport hebdo",
    fallback: "Prochain rapport lundi 8h.",
  },
  {
    name: "VEILLE",
    role: "Veille de contenu (LUNA)",
    avatar: "/avatars/veille.svg",
    accent: "#B8860B",
    href: "/dashboard/luna",
    statLabel: "idées en attente",
    fallback: "Dernière veille : aucune.",
  },
];

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}

export default async function OverviewPage() {
  const [kpis, logs, posts, leads, activity] = await Promise.all([
    getKpis(),
    getRecentLogs(),
    getPostsToValidate(),
    getHotLeads(),
    getAgentActivity(),
  ]);

  const stats: Record<string, string> = {
    LUNA: String(kpis.postsPublished),
    ORION: String(leads.length),
    HERMES: "—",
    VEILLE: "0",
  };

  return (
    <>
      <div className="mb-8">
        <h1
          className="font-display text-3xl font-bold"
          style={{ color: "#0B1F4A" }}
        >
          Bonjour Robin 👋
        </h1>
        <p className="mt-1 font-body text-sm" style={{ color: "#4A5568" }}>
          Voici l&apos;état de votre agence aujourd&apos;hui.
        </p>
      </div>

      {/* Cartes agents */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AGENTS.map((a) => (
          <AgentCard
            key={a.name}
            name={a.name}
            role={a.role}
            avatar={a.avatar}
            accent={a.accent}
            href={a.href}
            stat={stats[a.name]}
            statLabel={a.statLabel}
            lastActivity={activity[a.name] ?? a.fallback}
          />
        ))}
      </div>

      {/* KPIs */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="MRR"
          value={`${kpis.mrr.toLocaleString("fr-FR")} €`}
          sub="clients actifs"
        />
        <StatCard
          label="Leads qualifiés"
          value={String(kpis.leadsQualified)}
          sub="pipeline ORION"
        />
        <StatCard
          label="Posts publiés"
          value={String(kpis.postsPublished)}
          sub="7 derniers jours"
        />
        <StatCard
          label="Engagement moyen"
          value={`${kpis.avgEngagement.toFixed(1)} %`}
          sub="contenu LUNA"
        />
      </div>

      {/* Grille 3 colonnes */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Activité agents */}
        <Card>
          <h2
            className="font-display text-lg font-bold"
            style={{ color: "#0B1F4A" }}
          >
            Activité récente
          </h2>
          <div className="mt-4 space-y-3">
            {logs.length === 0 ? (
              <EmptyState message="Aucune activité agent." />
            ) : (
              logs.map((l) => (
                <div key={l.id} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: l.status === "error" ? "#CC0000" : "#1A7F37",
                    }}
                  />
                  <div className="min-w-0">
                    <p
                      className="font-body text-sm"
                      style={{ color: "#0B1F4A" }}
                    >
                      <strong>{l.agent_name}</strong> — {l.action}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "#9AA5B4" }}
                    >
                      {timeAgo(l.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Posts à valider */}
        <Card>
          <div className="flex items-center justify-between">
            <h2
              className="font-display text-lg font-bold"
              style={{ color: "#0B1F4A" }}
            >
              Posts à valider
            </h2>
            <Link
              href="/dashboard/luna"
              className="font-body text-xs font-semibold"
              style={{ color: "#1A3BFF" }}
            >
              Tout voir
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {posts.length === 0 ? (
              <EmptyState message="Rien à valider." />
            ) : (
              posts.map((p) => (
                <Link
                  key={p.id}
                  href="/dashboard/luna"
                  className="block rounded-xl p-3"
                  style={{ background: "#ECEEF8" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="truncate font-body text-sm font-semibold"
                      style={{ color: "#0B1F4A" }}
                    >
                      {p.title}
                    </p>
                    <Badge status={p.status} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>

        {/* Leads chauds */}
        <Card>
          <div className="flex items-center justify-between">
            <h2
              className="font-display text-lg font-bold"
              style={{ color: "#0B1F4A" }}
            >
              Leads chauds
            </h2>
            <Link
              href="/dashboard/orion"
              className="font-body text-xs font-semibold"
              style={{ color: "#1A3BFF" }}
            >
              Tout voir
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {leads.length === 0 ? (
              <EmptyState message="Aucun lead chaud." />
            ) : (
              leads.map((l) => (
                <Link
                  key={l.id}
                  href="/dashboard/orion"
                  className="block rounded-xl p-3"
                  style={{ background: "#ECEEF8" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="truncate font-body text-sm font-semibold"
                      style={{ color: "#0B1F4A" }}
                    >
                      {l.company ?? l.full_name ?? "Lead"}
                    </p>
                    <span
                      className="rounded-full px-2 py-0.5 font-body text-xs font-bold text-white"
                      style={{ background: l.score >= 80 ? "#1A7F37" : "#B8860B" }}
                    >
                      {l.score}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
