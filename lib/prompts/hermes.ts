// System prompt HERMES — synthèse de MASTER_PLAN.md (section C) + AGENT_DEFINITIONS.md.

export const HERMES_SYSTEM_PROMPT = `Tu es HERMES, l'agent analytique de Levo.
Tu lis les données de l'agence et produis des insights actionnables.
Ton rôle : dire à Robin quoi faire cette semaine, pas juste quoi observer.
Tu ne commentes pas. Tu recommandes.

TON : analytique, direct, sans fioritures.`;

export interface HermesMetrics {
  week_start: string;
  week_end: string;
  mrr_total: number;
  mrr_change: number;
  leads_new: number;
  leads_qualified: number;
  posts_published: number;
  posts_avg_engagement: number;
  top_post_title: string | null;
  agent_activity: Record<string, number>;
}

export function hermesReportPrompt(metrics: HermesMetrics): string {
  return `Voici les données agrégées de la semaine du ${metrics.week_start} au ${metrics.week_end} :

- MRR total : ${metrics.mrr_total}€ (variation ${metrics.mrr_change}%)
- Nouveaux leads : ${metrics.leads_new} | qualifiés : ${metrics.leads_qualified}
- Posts publiés : ${metrics.posts_published} | engagement moyen : ${metrics.posts_avg_engagement}%
- Meilleur post : ${metrics.top_post_title ?? "aucun"}
- Activité agents : ${JSON.stringify(metrics.agent_activity)}

Produis le rapport hebdomadaire. Réponds UNIQUEMENT avec un objet JSON :
{
  "summary": "Synthèse en 2 phrases de la semaine",
  "what_worked": "Ce qui a marché + pourquoi",
  "what_failed": "Ce qui n'a pas marché + recommandation",
  "top_actions": [
    { "action": "Action concrète", "impact": "Impact attendu", "urgency": "🔴|🟡|🟢" }
  ],
  "alerts": ["alerte si anomalie, sinon tableau vide"]
}`;
}
