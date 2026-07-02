import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type {
  Client,
  Lead,
  ContentCalendarItem,
  AgentLog,
  WeeklyReport,
} from "@/lib/types/database";

// Couche de lecture du dashboard. Chaque fonction est tolérante :
// si Supabase n'est pas configuré ou si une table manque, on renvoie une
// valeur vide plutôt que de planter le rendu de la page.

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[dashboard] requête échouée:", err);
    return fallback;
  }
}

export interface Audit {
  id: string;
  created_at: string;
  prenom: string | null;
  nom: string | null;
  email: string;
  entreprise: string | null;
  secteur: string | null;
  taches: string[] | null;
  horizon: string | null;
  perte_mensuelle_estimee: number | null;
  heures_perdues_semaine: number | null;
}

export async function getAudits(): Promise<Audit[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("audits")
      .select(
        "id,created_at,prenom,nom,email,entreprise,secteur,taches,horizon,perte_mensuelle_estimee,heures_perdues_semaine",
      )
      .order("created_at", { ascending: false });
    return (data ?? []) as Audit[];
  }, []);
}

export async function getKpis() {
  return safe(
    async () => {
      const supabase = getSupabaseAdmin();
      const weekAgo = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString();

      const [clients, leads, posts, perf] = await Promise.all([
        supabase.from("clients").select("mrr,status"),
        supabase.from("leads").select("status,created_at"),
        supabase
          .from("content_calendar")
          .select("status,published_at")
          .gte("created_at", weekAgo),
        supabase.from("content_performance").select("engagement_rate"),
      ]);

      const mrr = (clients.data ?? [])
        .filter((c) => c.status === "active")
        .reduce((s, c) => s + Number(c.mrr ?? 0), 0);
      const qualified = (leads.data ?? []).filter((l) =>
        ["qualified", "proposal", "won"].includes(l.status),
      ).length;
      const published = (posts.data ?? []).filter(
        (p) => p.status === "published",
      ).length;
      const rates = (perf.data ?? [])
        .map((p) => Number(p.engagement_rate ?? 0))
        .filter((n) => n > 0);
      const avgEng = rates.length
        ? rates.reduce((a, b) => a + b, 0) / rates.length
        : 0;

      return {
        mrr,
        leadsQualified: qualified,
        postsPublished: published,
        avgEngagement: avgEng,
      };
    },
    { mrr: 0, leadsQualified: 0, postsPublished: 0, avgEngagement: 0 },
  );
}

export async function getRecentLogs(limit = 8): Promise<AgentLog[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("agent_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as AgentLog[];
  }, []);
}

export async function getPostsToValidate(
  limit = 3,
): Promise<ContentCalendarItem[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("content_calendar")
      .select("*")
      .in("status", ["drafted", "approved_idea"])
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as ContentCalendarItem[];
  }, []);
}

export async function getHotLeads(limit = 3): Promise<Lead[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .gte("score", 60)
      .order("score", { ascending: false })
      .limit(limit);
    return (data ?? []) as Lead[];
  }, []);
}

export async function getAllContent(): Promise<ContentCalendarItem[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("content_calendar")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as ContentCalendarItem[];
  }, []);
}

export async function getAllLeads(): Promise<Lead[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("score", { ascending: false });
    return (data ?? []) as Lead[];
  }, []);
}

export async function getAllClients(): Promise<Client[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as Client[];
  }, []);
}

export async function getReports(): Promise<WeeklyReport[]> {
  return safe(async () => {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("weekly_reports")
      .select("*")
      .order("week_start", { ascending: false });
    return (data ?? []) as WeeklyReport[];
  }, []);
}

export async function getAgentActivity(): Promise<Record<string, string>> {
  // Dernière action connue par agent (pour les bulles de speech de l'overview).
  return safe(
    async () => {
      const supabase = getSupabaseAdmin();
      const { data } = await supabase
        .from("agent_logs")
        .select("agent_name,action,created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      const last: Record<string, string> = {};
      for (const row of data ?? []) {
        if (!last[row.agent_name]) last[row.agent_name] = row.action;
      }
      return last;
    },
    {},
  );
}
