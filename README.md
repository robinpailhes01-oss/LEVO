# Levo — Site vitrine

Landing page premium one-page de l'agence IA **Levo** (Montpellier).
Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · charte Levo
(crème / navy / électrique, Cormorant Garamond + Plus Jakarta Sans).

## Développement local

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Autres commandes :

```bash
pnpm build        # build de production
pnpm start        # sert le build de production
pnpm lint         # ESLint (next/core-web-vitals)
```

## Structure

```
app/
  layout.tsx              # fonts (next/font) + metadata SEO FR
  page.tsx                # assemble les 10 sections
  globals.css             # tokens Levo + Tailwind
components/
  ui/                     # Button, Card, Reveal (fade-up au scroll)
  blocks/                 # Nav, Hero, TrustBar, Services, HowItWorks,
                          # Cases, About, Testimonials, CTA, Footer
lib/
  hooks/useScrollReveal.ts
tailwind.config.ts        # tokens couleurs + fonts + animations
```

## Déploiement Vercel

Le projet est **zéro-config** : Vercel détecte Next.js automatiquement.
Aucune variable d'environnement n'est requise (site vitrine, sans backend).

### Option A — Dashboard (recommandé)

1. Connectez le repo GitHub `robinpailhes01-oss/LEVO` sur [vercel.com/new](https://vercel.com/new).
2. Framework Preset : **Next.js** (auto-détecté).
3. Build Command : `pnpm build` · Install Command : `pnpm install` · Output : `.next` (auto).
4. Déployez. Chaque PR génère ensuite une **preview deployment**.

### Option B — CLI

```bash
pnpm dlx vercel          # premier déploiement (preview, lie le projet)
pnpm dlx vercel --prod   # déploiement en production
```

> Note : la première exécution crée le dossier local `.vercel/` (déjà ignoré par git).
