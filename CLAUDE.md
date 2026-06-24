# LEVO — Agence IA | CLAUDE.md

> Claude Code config file for the Levo agency. Read this before every task.
> Levo is an AI agency based in Montpellier, France, specializing in tailor-made
> automation solutions with personalized follow-up for regional SMEs and startups.

---

## 🏢 Agency Identity

**Name**: Levo  
**Type**: Agence IA sur-mesure  
**Location**: Montpellier, France (Sud de France)  
**Positioning**: Solutions IA artisanales — chaque client est unique, chaque solution est construite avec soin et accompagnement humain.  
**Tone**: Expert mais accessible. Chaleureux. Concret. Jamais de jargon gratuit.  
**Language**: French (default for all client-facing content). English for code & technical docs.

---

## 🧰 Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) | TypeScript strict, Tailwind CSS |
| Backend / DB | Supabase | Postgres + Auth + Storage + Realtime |
| Automation | n8n | Self-hosted or cloud, all workflows here |
| Deployment | Vercel | Preview deployments for every PR |
| AI / Agents | Claude (Anthropic) | Via API or Claude Code |
| Styling | Tailwind CSS + CSS Variables | Levo design tokens (see below) |
| Package manager | pnpm | Always use pnpm, never npm or yarn |

---

## 📁 Project Structure (Next.js 14 App Router)

```
project/
├── app/                    # App Router pages & layouts
│   ├── (marketing)/        # Public site routes
│   ├── (dashboard)/        # Authenticated client dashboard
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Base design system (shadcn-style)
│   ├── blocks/             # Page-level sections
│   └── agents/             # Agent UI components (chat, status…)
├── lib/
│   ├── supabase/           # Supabase client + helpers
│   ├── n8n/                # n8n webhook triggers
│   └── agents/             # Agent logic & prompts
├── public/
│   └── brand/              # Levo logos, brand assets
├── styles/
│   └── globals.css         # Design tokens as CSS variables
└── CLAUDE.md               # This file (copy into each project)
```

---

## 🎨 Levo Design System

### Color Tokens

```css
/* globals.css — always include these */
:root {
  /* Backgrounds */
  --cream:          #FAF7F0;   /* Main background */
  --cream-dark:     #F0EBE0;   /* Card / section background */
  --white:          #FFFFFF;

  /* Brand */
  --navy:           #0B1F4A;   /* Primary text, dark elements */
  --navy-mid:       #1E3A6E;   /* Secondary navy, hover states */
  --electric:       #005FFF;   /* Electric blue accent — use sparingly */
  --electric-light: #4D8FFF;   /* Softer electric for glows / gradients */

  /* Text */
  --text-primary:   #0B1F4A;
  --text-secondary: #4A5568;
  --text-muted:     #9AA5B4;

  /* Borders */
  --border:         #E2D9C8;
  --border-strong:  #C9BFA8;
}
```

### Typography

```css
/* Fonts — load via next/font */
--font-display: 'Cormorant Garamond', Georgia, serif;  /* Headlines, hero */
--font-body:    'Plus Jakarta Sans', system-ui, sans-serif; /* All body text */

/* Scale */
--text-xs:   0.75rem;   /* 12px — captions */
--text-sm:   0.875rem;  /* 14px — UI labels */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — lead text */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
--text-5xl:  3rem;      /* 48px — section titles */
--text-6xl:  3.75rem;   /* 60px — hero headlines */
--text-7xl:  4.5rem;    /* 72px — max hero */
```

### Design Principles

1. **Crème, jamais blanc pur** — Le fond est toujours `--cream`, jamais `#fff`.
2. **Serif pour les grands titres** — Cormorant en `font-weight: 600–700`.
3. **L'accent électrique est rare** — `--electric` sur les CTAs et éléments clés uniquement.
4. **Espaces généreux** — Sections avec `padding: 6rem 0` minimum.
5. **Animations subtiles** — `ease-out`, durées 300–600ms. Jamais d'effets criards.
6. **Mobile-first** — Breakpoints Tailwind standard (`sm`, `md`, `lg`, `xl`).

---

## ⚙️ Code Conventions

### TypeScript
- Strict mode toujours activé
- Types pour tous les props de composants
- Zod pour la validation des données Supabase et n8n
- Pas de `any` — utiliser `unknown` si nécessaire

### Supabase
- Toujours utiliser le Row Level Security (RLS)
- Helpers centralisés dans `lib/supabase/`
- Nommer les tables en `snake_case` (ex: `client_requests`, `agent_sessions`)
- Utiliser `supabase.auth.getUser()` côté serveur, jamais `getSession()`

### n8n Workflows
- Un workflow par cas d'usage métier (ex: `onboarding-client`, `rappel-rdv`, `synthese-hebdo`)
- Variables d'environnement : `N8N_WEBHOOK_URL` dans `.env.local`
- Toujours ajouter un nœud "Error Handler" dans chaque workflow
- Nommer les nœuds en français descriptif (ex: "Envoyer email de bienvenue")

### Agents Claude
- Prompts dans `lib/agents/prompts/[agent-name].ts`
- Toujours définir : rôle, ton, limites, format de sortie
- Utiliser `claude-sonnet-4-6` sauf si le client a besoin d'Opus
- Logger les conversations en Supabase pour amélioration continue

### Git
```bash
# Convention de commits
feat: nouvelle fonctionnalité
fix: correction de bug
design: changements visuels / CSS
agent: modifications de prompt / logique agent
workflow: modifications n8n
chore: maintenance, deps
```

---

## 🤖 Reference Clients

### Harmonie Yacht — Agent Léa
**Contexte**: Automatisation de la gestion client pour une société de location de yachts.  
**Agent**: Léa — assistante virtuelle de pré-qualification et suivi client.  
**Stack projet**: Next.js 14 + Supabase + n8n + Claude  
**Fonctionnalités clés**:
- Pré-qualification des demandes de location (budget, dates, type de yacht)
- Envoi automatique de devis via n8n
- Relances intelligentes (J+2, J+7 si pas de réponse)
- Dashboard client pour suivre les demandes
- Intégration agenda pour les visites

**Fichier de référence**: `projects/harmonie-yacht/SPEC.md` (à créer par projet)

---

## 🔌 MCP Integrations

| MCP | Usage | Config |
|-----|-------|--------|
| Supabase | DB queries, schema, migrations | `mcp.supabase.com` |
| n8n | Créer / modifier des workflows | `robinplhs.app.n8n.cloud` |
| Vercel | Déploiements, logs, env vars | `mcp.vercel.com` |
| Google Drive | Documents clients, specs | Via OAuth |
| Gmail | Communications clients | Via OAuth |

---

## 🚀 Common Commands

```bash
# Démarrer le projet
pnpm dev

# Générer les types Supabase
pnpm supabase gen types typescript --project-id [ID] > lib/supabase/types.ts

# Linter + formatter
pnpm lint
pnpm format

# Build de production
pnpm build

# Déploiement Vercel
vercel --prod
```

---

## 📐 Skills disponibles

| Skill | Déclencheur | Usage |
|-------|------------|-------|
| `levo-brand` | identité, couleurs, charte, branding Levo | Appliquer la charte Levo à n'importe quel output |
| `levo-website-design` | site web, landing page, section, composant Next.js | Créer des pages web dans l'esthétique Levo |
| `levo-instagram` | Instagram, post, story, reel, caption, visuel réseaux | Créer du contenu Instagram aligné Levo |

---

## ✅ Before Every Task Checklist

- [ ] La palette crème/navy/électrique est-elle respectée ?
- [ ] Les fonts Cormorant + Plus Jakarta sont-elles chargées ?
- [ ] Le RLS Supabase est-il activé sur les nouvelles tables ?
- [ ] Les variables d'env sont-elles dans `.env.local` (jamais dans le code) ?
- [ ] Le contenu client est-il en français ?
- [ ] Les animations sont-elles subtiles (< 600ms, ease-out) ?
