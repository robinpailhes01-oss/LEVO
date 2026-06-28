// System prompt ORION — synthèse de MASTER_PLAN.md (section B) + AGENT_DEFINITIONS.md.

export const ORION_SYSTEM_PROMPT = `Tu es ORION, l'agent d'acquisition de Levo.
Tu trouves, qualifies et approches des dirigeants de PME pour leur proposer un audit gratuit de 30 minutes.

CONTEXTE LEVO :
- Agence IA à Montpellier, spécialisée automatisation PME
- Offre d'entrée : audit gratuit, sans engagement
- Cible : dirigeants 40-50 ans, PME 2-50 personnes
- Sud de France en priorité, tous secteurs services

TON DE VOIX :
- Direct, professionnel, jamais pushy
- On apporte de la valeur avant de vendre
- On parle résultats concrets, pas technologie
- Vouvoiement obligatoire
- Maximum 4 lignes par message

SCORING LEAD (0-100) :
+20 PME 2-50 personnes
+20 secteur services/commerce
+15 présence digitale active
+15 géolocalisation Sud de France
+10 dirigeant identifié et contactable
+10 pain points visibles publiquement
+10 entreprise saine financièrement
-10 concurrent direct IA
-20 structure >200 personnes`;

export function orionEnrichPrompt(lead: {
  full_name?: string | null;
  company?: string | null;
  sector?: string | null;
  linkedin_url?: string | null;
  instagram_handle?: string | null;
}): string {
  return `Analyse ce lead et produis un profil enrichi.

Lead :
- Nom : ${lead.full_name ?? "inconnu"}
- Entreprise : ${lead.company ?? "inconnue"}
- Secteur : ${lead.sector ?? "inconnu"}
- LinkedIn : ${lead.linkedin_url ?? "—"}
- Instagram : ${lead.instagram_handle ?? "—"}

Réponds UNIQUEMENT avec un objet JSON :
{
  "score": 0,
  "sector": "secteur précis détecté",
  "pain_points": ["pain point 1", "pain point 2"],
  "digital_maturity": "faible|moyenne|élevée",
  "best_angle": "le meilleur angle d'approche en une phrase",
  "reasoning": "justification courte du score"
}`;
}

export function orionOutreachPrompt(
  lead: { full_name?: string | null; company?: string | null; sector?: string | null },
  painPoints: string[],
  type: "email" | "dm",
): string {
  const format =
    type === "email"
      ? `Format COLD EMAIL : objet court et personnel, ligne 1 sur LEUR activité, lignes 2-3 pain point + résultat concret, ligne 4 proposition d'audit gratuit, signature "Robin, Levo". Max 6 lignes.`
      : `Format DM INSTAGRAM : référence un post récent, pain point en 1 phrase, offre audit en 1 phrase. Max 3 lignes.`;

  return `Génère une séquence d'approche pour ${lead.full_name ?? "ce dirigeant"} (${lead.company ?? "son entreprise"}, secteur ${lead.sector ?? "services"}).
Pain points identifiés : ${painPoints.join(", ") || "à déduire"}.

${format}

Produis 3 messages de séquence (initial, relance J+3, relance J+7) en 2 variantes A/B chacun.
Réponds UNIQUEMENT avec un objet JSON :
{
  "variant_a": { "angle": "gain de temps", "messages": ["msg1", "relance1", "relance2"] },
  "variant_b": { "angle": "concurrents", "messages": ["msg1", "relance1", "relance2"] }
}`;
}
