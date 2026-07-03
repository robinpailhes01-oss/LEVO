---
name: levo-website-design
description: >
  Skill de design pour le site web de l'agence Luma (Next.js 14, App Router,
  Tailwind CSS). Utilise ce skill pour créer ou modifier toute page, section,
  composant ou landing page de Luma. Déclenche pour : "crée une section hero",
  "design la page services", "fais un composant carte", "landing page client",
  "homepage Luma", "page contact", "section about", "portfolio", "témoignages".
  Inclut les patterns d'animation, la structure des composants, et les blocs
  de page types.
---

# Luma Website Design Skill

Ce skill couvre le design et l'implémentation du site Luma en Next.js 14.
Lire d'abord le skill `levo-brand` pour les tokens visuels — ce skill se
concentre sur les patterns de composants et sections.

---

## Stack & Setup

```bash
# Fonts dans layout.tsx (Next.js font optimization)
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})
```

---

## Page Architecture

### Homepage (Priorité 1)

```
/ (homepage)
├── <Nav />                  — logo + liens + CTA "Discutons"
├── <HeroSection />          — headline + sous-titre + CTA + visuel subtil
├── <TrustBar />             — 3–4 metrics / logos clients
├── <ServicesSection />      — 3 offres principales (cartes)
├── <HowItWorksSection />    — Processus en 3 étapes
├── <CasesSection />         — 1–2 cas clients (Harmonie Yacht…)
├── <AboutSection />         — Luma, Montpellier, humain derrière l'IA
├── <TestimonialsSection />  — 2–3 témoignages
├── <CTASection />           — Bannière finale + formulaire contact
└── <Footer />
```

---

## Composants clés

### Nav

```tsx
// Comportement : sticky, bg cream/95 + backdrop-blur au scroll
// Mobile : hamburger → drawer plein écran fond navy
// CTA : "Discutons de votre projet" → navy filled button
```

### Hero Section — Pattern recommandé

```tsx
// Structure visuelle :
// [Label eyebrow — "Agence IA · Montpellier"]
// [Headline Cormorant 700 72px]  ← L'IA qui travaille
//                                   comme vous le souhaitez
// [Sous-titre Jakarta 400 20px, max-width 560px]
// [CTA primaire "Voir nos réalisations"] + [CTA ghost "En savoir plus"]
// [Visuel droite : illustration abstraite navy+electric subtile OU
//  mockup d'interface OU espace vide avec grid dots crème]

// Animation :
// - Label : fade in 0ms delay
// - Headline : fade up 100ms delay
// - Sous-titre : fade up 200ms delay
// - CTAs : fade up 300ms delay
// - Visuel : fade in scale 0.97→1 400ms delay
```

### Services Card

```tsx
// Carte blanche, border crème, radius 16px
// Hover : translateY(-4px) + shadow-lg
// Contenu :
//   [Icône Lucide 24px, couleur electric]
//   [Titre Cormorant 600 24px]
//   [Description Jakarta 400 16px text-secondary]
//   [Lien "En savoir plus →" electric, hover underline]
```

### How It Works — 3 étapes

```tsx
// Layout : 3 colonnes desktop, stack mobile
// Chaque étape :
//   [Numéro : "01" — Cormorant 700 80px, opacity 0.08, navy, absolu en bg]
//   [Icône filled 32px, navy]
//   [Titre Cormorant 600 22px]
//   [Description 15px text-secondary]
// Connecteur visuel : ligne pointillée electric entre les étapes (desktop)
```

### Testimonial Card

```tsx
// Fond cream-dark, border crème, radius 16px, padding 40px
// Quote : Cormorant 400 italic 20px, navy
// Attribution : Jakarta 500 14px, + nom, poste, entreprise
// Étoiles : 5★ en electric (fill)
// Photo : avatar 40px radius-full avec fine bordure cream
```

### CTA Section finale

```tsx
// Fond : navy (#0B1F4A)
// Headline : Cormorant 700 56px, couleur cream
// Sous-titre : Jakarta 400 18px, opacity 0.7 cream
// Formulaire ou CTA :
//   Option A : Bouton "Prendre un RDV" → ouvre Calendly ou modal
//   Option B : Mini-formulaire inline (nom, email, message)
// Accent : fine ligne electric sous le titre
```

---

## Animations & Scroll

### Intersection Observer pattern (React)

```tsx
// hook useScrollReveal.ts
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Usage dans un composant section :
// className={`transition-all duration-700 ease-out ${
//   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
// }`}
```

### Staggered children (Framer Motion optionnel)

```tsx
// Si Framer Motion installé (pnpm add framer-motion) :
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}
// <motion.div variants={container} initial="hidden" whileInView="show">
//   <motion.div variants={item}>...</motion.div>
```

---

## Tailwind Config (extrait)

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: '#FAF7F0', dark: '#F0EBE0' },
        navy:     { DEFAULT: '#0B1F4A', mid: '#1E3A6E', light: '#2D5299' },
        electric: { DEFAULT: '#005FFF', light: '#4D8FFF' },
        border:   { DEFAULT: '#E2D9C8', strong: '#C9BFA8' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
}
```

---

## SEO & Metadata

```tsx
// app/layout.tsx
export const metadata = {
  title: {
    default: 'Luma — Agence IA sur-mesure | Montpellier',
    template: '%s | Luma',
  },
  description:
    "Luma conçoit des solutions d'automatisation IA personnalisées pour les PME du Sud de la France. Accompagnement sur-mesure, de la conception au déploiement.",
  keywords: ['agence IA', 'automatisation', 'Montpellier', 'sur-mesure', 'n8n', 'Claude'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Luma',
  },
}
```

---

## Pages secondaires

Pour les sous-pages (services, à propos, contact, cas clients) →
lire `references/pages.md` dans ce skill.

---

## Anti-patterns à éviter

- ❌ Background blanc pur `#fff` comme fond de page (→ utiliser `cream`)
- ❌ Plus de 2 couleurs d'accent différentes dans une même section
- ❌ Animations avec `bounce` ou `elastic`
- ❌ Boutons full-rounded (pill) — Luma utilise `border-radius: 12px`
- ❌ Grilles à plus de 4 colonnes sur desktop
- ❌ Texte blanc sur fond électrique (contraste insuffisant)
- ❌ Police Cormorant en `font-weight: 400` pour les titres (trop léger)
