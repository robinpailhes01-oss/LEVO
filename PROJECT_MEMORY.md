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
- Figma : MCP connecté (compte `Levo`, équipe « L'équipe de harmonie », siège View — l'écriture via MCP fonctionne malgré tout). Le hero a été reproduit dans un fichier Figma dédié : https://www.figma.com/design/8cAhe05mQnnWWOjmxNa7Hp (frame « Hero — Desktop 1440 », icônes Lucide remplacées par des pastilles). Sous le hero, frame « Section 02 — Composants » : exploration bento (non implémentée dans le code) montrant 5 familles de composants — conversation d'agent WhatsApp, devis généré (carte sombre), tuiles KPI, stepper de méthode, contrôles de formulaire (segmenté, input, toggles, tags). Données d'illustration uniquement. La carte Agent WhatsApp existe en React : `components/ui/AgentChatCard.tsx` (conversation auto-jouée à l'entrée dans le viewport, indicateur de saisie, pièce jointe, boucle, reduced-motion, props `messages/title/badge/loop`). **Pas encore montée sur une page** — à placer là où Robin veut (ex. `/services/agent-whatsapp`).
- **Scroll & 3D (niveaux 1, 3, 4)** :
  - Niveau 1 : scroll lissé Lenis (`components/ui/SmoothScroll.tsx`, monté dans le layout). Compatible avec tout le code scroll existant (événements natifs). Ancres internes reprises par Lenis (offset −104 = scroll-padding-top). Désactivé sous reduced-motion. `data-lenis-prevent` posé sur l'overlay de la popup audit.
  - Niveau 3 : hero — l'instrument entre en perspective (rotateX/rotateY) et se redresse ; au scroll il bascule vers l'arrière et recule (scale), la colonne thèse recule moins vite (deux plans).
  - Niveau 4 : prototype WebGL isolé sur `/labs/ecosystem-3d` (noindex, `/labs/` exclu de robots). `components/labs/EcosystemScene.tsx` (R3F v8 + drei v9 + three 0.170, versions compatibles React 18 — R3F v9 exige React 19) et `LabEcosystem.tsx` (page épinglée 320vh, 3 étapes de texte, fallback statique sans WebGL, reduced-motion = scène assemblée sans pin). Chargé en dynamic import ssr:false : son poids ne touche pas l'accueil. **Pas intégré à une page publique** : décision à prendre après avoir vu le rendu et le poids.
- Piège Framer 12 : une `useTransform` branchée directement sur `scrollYProgress` passe par ScrollTimeline natif → bornes obligatoirement dans [0,1]. Passer par `useSpring(scrollYProgress)` force le chemin JS.
- Rebrand Levo→Luma fait (texte, domaine, `LUMA_MCP_SECRET`). Dossiers `docs/levo`, `dashboard-levo` gardés (chemins).

## Audit gratuit (site)
- Popup 5 étapes (Nav/Hero/exit-intent) + page pleine `/audit?lead=<uuid>`.
- Submit → `/api/audit` : insert Supabase `audits` + crée un lead ORION (`leads`) + **webhook CRM** best-effort si `lead_id` présent → `LEVO_WEBHOOK_URL?token=LEVO_WEBHOOK_TOKEN` body `{lead_id, answers}` (serveur only).
- `lib/audit/calc.ts` : estime heures perdues + perte €/mois + `INFRA_MAP` (aperçu écosystème).

## Accueil — refonte « en actes » (scroll + 3D + motion)
Ordre : Hero → Marquee → **ProofSection** (chiffres + logos, ligne tracée) → SplitStage (pin 1, inchangé) → OfferSection (inchangé) → **EcosystemSection** (pin 2, moment signature : scène 3D `components/scene/EcosystemScene.tsx` chargée à l'approche, 3 étapes, puis 3 cartes briques ; mobile = non épinglé, auto-assemblage ; reduced-motion = statique ; `id="services"`) → **MethodSection** (trait tracé au scroll, nœuds qui s'allument, `id="process"`) → **PortfolioSection** (cartes empilées sticky, `id="cas"`) → **CreationsSection** (grille de fenêtres avec parallaxe interne, rail épinglé supprimé, `id="creations"`) → Formations (TiltCard) → About (Parallax portrait + LineReveal citation) → CTA (halo souris + MagneticButton).
Règle tenue : 2 pins max (split + 3D), 1 signature (3D). Primitives ajoutées : `ui/LineReveal`, `ui/Parallax`. Sections supprimées : TrustBar, ClientsMarquee, ServicesSection, HowItWorksSection. `/labs/ecosystem-3d` conservé pour tester la scène.

## Décisions clés
- Vitrine `/`, dashboard `/dashboard/*` (route group). Supabase RLS ON, accès service role only.
- Auth dashboard : cookie HMAC (`AUTH_SECRET`), vérifié Edge via `crypto.subtle`.
- MCP dashboard : `Bearer LUMA_MCP_SECRET`.

## Pièges
- SQL Supabase échoue si **traduction Chrome active** → exécuter en navigation privée.
- MCP Supabase connecté à un autre compte → **DDL impossible** ici, le user exécute les `.sql`.
- Vercel ne promeut pas toujours en prod auto → vérifier après push.
- **Vercel installe avec pnpm (frozen-lockfile)** : toute nouvelle dépendance doit passer par `pnpm install --lockfile-only` pour mettre à jour `pnpm-lock.yaml`, sinon le déploiement échoue (`ERR_PNPM_OUTDATED_LOCKFILE`). Le `package-lock.json` seul ne suffit pas.
- **Branche de production Vercel = `claude/busy-cori-z394rr`** (pas `main`). Une autre branche ne produit que des previews : `levo-git-<branche>-robinpailhes01-4664s-projects.vercel.app`. Deux projets Vercel pointent sur le repo (`levo` et `levo-k4mh`).

## À FAIRE (côté user)
1. Supabase (nav privée) : exécuter `docs/levo/schema.sql` + `docs/levo/audit_table.sql`.
2. Vercel (site) : env `LEVO_WEBHOOK_URL`, `LEVO_WEBHOOK_TOKEN`, clés Supabase, `RESEND_API_KEY` ; domaine `luma-agence.fr` ; vérifier promotion prod.
3. Régénérer clés Supabase + Anthropic (exposées en clair).
4. Renommer env `LEVO_MCP_SECRET`→`LUMA_MCP_SECRET` sur le projet dashboard.
5. Tester `/audit?lead=test` → lead dans CRM + table `audits`.
