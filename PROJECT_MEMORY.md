# PROJECT_MEMORY — Luma

*Lu en début de session, mis à jour en fin.*

## Repos
- **LEVO** (ce repo) : site vitrine `luma-agence.fr` (racine) + `dashboard-levo/` (dashboard interne, projet Vercel séparé, peu utilisé).
- **LEVO-AGENCE** (repo séparé, non accessible ici) : le vrai dashboard CRM du user.

## Stack
Next.js 14 App Router · TS strict · Tailwind · Supabase (service role, serveur only) · Claude `claude-opus-4-8` (serveur only) · Resend · Framer Motion.

## État
- Site vitrine + audit : construits, build OK, poussés sur `main`.
- **Hero refondu (branche `claude/figma-connection-ef38or`)** : composition éditoriale asymétrique — thèse à gauche (titre masqué mot par mot, signature Cormorant italique bleue, 3 faits en hairlines), preuve à droite = « Journal de bord » sombre où les actions de l'écosystème arrivent en direct (horaires client-side, pas d'hydratation), parallaxe + tilt légers, trame/grain de fond. Police mono `JetBrains_Mono` ajoutée (`--font-mono`, `font-mono`). Reduced-motion respecté (journal figé, pas de tilt/reflet).
- Figma : MCP connecté sur le compte `Levo` mais siège **View** uniquement → lecture OK, écriture dans Figma impossible tant que le siège n'est pas passé en Edit.
- Rebrand Levo→Luma fait (texte, domaine, `LUMA_MCP_SECRET`). Dossiers `docs/levo`, `dashboard-levo` gardés (chemins).

## Audit gratuit (site)
- Popup 5 étapes (Nav/Hero/exit-intent) + page pleine `/audit?lead=<uuid>`.
- Submit → `/api/audit` : insert Supabase `audits` + crée un lead ORION (`leads`) + **webhook CRM** best-effort si `lead_id` présent → `LEVO_WEBHOOK_URL?token=LEVO_WEBHOOK_TOKEN` body `{lead_id, answers}` (serveur only).
- `lib/audit/calc.ts` : estime heures perdues + perte €/mois + `INFRA_MAP` (aperçu écosystème).

## Décisions clés
- Vitrine `/`, dashboard `/dashboard/*` (route group). Supabase RLS ON, accès service role only.
- Auth dashboard : cookie HMAC (`AUTH_SECRET`), vérifié Edge via `crypto.subtle`.
- MCP dashboard : `Bearer LUMA_MCP_SECRET`.

## Pièges
- SQL Supabase échoue si **traduction Chrome active** → exécuter en navigation privée.
- MCP Supabase connecté à un autre compte → **DDL impossible** ici, le user exécute les `.sql`.
- Vercel ne promeut pas toujours en prod auto → vérifier après push.

## À FAIRE (côté user)
1. Supabase (nav privée) : exécuter `docs/levo/schema.sql` + `docs/levo/audit_table.sql`.
2. Vercel (site) : env `LEVO_WEBHOOK_URL`, `LEVO_WEBHOOK_TOKEN`, clés Supabase, `RESEND_API_KEY` ; domaine `luma-agence.fr` ; vérifier promotion prod.
3. Régénérer clés Supabase + Anthropic (exposées en clair).
4. Renommer env `LEVO_MCP_SECRET`→`LUMA_MCP_SECRET` sur le projet dashboard.
5. Tester `/audit?lead=test` → lead dans CRM + table `audits`.
