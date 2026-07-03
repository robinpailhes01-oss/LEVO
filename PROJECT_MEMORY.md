# PROJECT_MEMORY.md — Mémoire de Luma

*Claude Code lit ce fichier au début de chaque session et le met à jour à la fin.*

---

## État du projet
- Phase actuelle : **Phases 1 à 6 construites** (infra dashboard complète, build OK)
- Dernière session : 2026-06-28 — construction de toute l'infra agents en une session
- Prochaine action : exécuter `docs/levo/schema.sql` dans Supabase, brancher Resend, tester en prod

---

## Décisions d'architecture prises
- MCP hébergé sur Vercel API routes (`/app/api/mcp/{content,leads,analytics,clients}`), sécurisé `Bearer LUMA_MCP_SECRET`
- Mémoire persistante via ce fichier (pas GBrain)
- ORION utilise Instantly.ai ; webhook réponse → `/api/orion/notify-reply` (même Bearer)
- Auth dashboard simple : cookie HMAC signé (`AUTH_SECRET`), vérifié en Edge middleware via Web Crypto. Pas de Clerk.
- **Site marketing reste sur `/`** ; le dashboard vit sous `/dashboard/*` (route group dédié, layout Bankio fond #ECEEF8). Décision : ne pas rediriger `/` vers le dashboard pour préserver la landing SEO.
- Supabase accédé côté serveur uniquement via **service role key** (bypass RLS). RLS activée sur toutes les tables, aucune policy publique → base fermée à la clé anon.
- Claude appelé via `@anthropic-ai/sdk`, modèle `claude-opus-4-8`, **toujours côté serveur**.
- Tables : ajout de `content_slides` (détail + feedback par slide) en plus des 9 du plan initial → 10 tables.
- Avatars agents : SVG générés dans `/public/avatars/` (luna/orion/hermes/veille). Interface vocale via Web Speech API (fr-FR) sur chaque carte agent.
- **DDL impossible depuis l'environnement** (MCP Supabase ne couvre pas le projet `yzaypsoonsldhmujuqjw`) → le schéma est livré en `docs/levo/schema.sql`, à exécuter manuellement.

## Patterns établis
- `lib/supabase/server.ts` (admin client, `server-only`), `lib/claude.ts` (`complete` + `extractJson`)
- `lib/agents/log.ts` → écrit dans `agent_logs` (best-effort, ne casse jamais le flux)
- Routes agents : try/catch systématique + log succès/erreur dans `agent_logs`
- Couche lecture dashboard `lib/dashboard/queries.ts` tolérante (renvoie vide si table absente)
- Prompts agents dans `lib/prompts/{luna,orion,hermes}.ts`, sortie JSON stricte

## Pièges rencontrés
- `status: "lost"` invalide pour `content_calendar` (pas dans le CHECK) → "Écarter" supprime la ligne
- Edge middleware ne peut pas utiliser le module Node `crypto` → HMAC via `crypto.subtle`
- Service role key ≠ accès DDL via REST → schéma exécuté manuellement

## À faire prochaine session
1. Exécuter `docs/levo/schema.sql` dans le SQL Editor Supabase (projet Luma)
2. **Régénérer les clés exposées** (service role Supabase + clé Anthropic) — elles ont transité en clair
3. Renseigner `RESEND_API_KEY` pour les emails HERMES
4. Brancher le webhook Instantly.ai sur `/api/orion/notify-reply`
5. Tester chaque agent en prod (générer idées LUNA, enrichir un lead ORION, rapport HERMES)
6. Cron lundi 8h (Vercel Cron ou n8n) → POST `/api/hermes/generate-report`

## Notes importantes
- Identifiants dashboard générés dans `.env.local` (DASHBOARD_PASSWORD, AUTH_SECRET, LUMA_MCP_SECRET) — non commités
- Site existant : luma-agence.fr
- Robin valide les décisions importantes (Confusion Protocol)
