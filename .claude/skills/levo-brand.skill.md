---
name: levo-brand
description: >
  Charte de marque complète de l'agence Levo. Utilise ce skill pour tout output
  visuel, textuel ou de design qui doit respecter l'identité Levo. Déclenche
  systématiquement pour : logo, couleurs, typographie, ton de voix, templates,
  présentations, composants UI, posts réseaux, landing pages, pitchs clients.
  Si le mot "Levo", "branding", "charte", "identité", "couleurs de l'agence"
  apparaît — utilise ce skill avant de produire quoi que ce soit.
---

# Levo — Brand Identity Skill

Agence IA sur-mesure basée à Montpellier, spécialisée dans l'automatisation
personnalisée pour les PME et startups du Sud de la France.

---

## Essence de marque

**Positionnement**: Solutions IA artisanales avec accompagnement humain.  
**Promesse**: Chaque client est unique — ses outils le sont aussi.  
**Ton**: Expert et accessible. Chaleureux sans être familier. Concret, jamais jargonneux.  
**Anti-ton**: Pas de buzzwords vides ("révolutionnaire", "disruption"), pas de froideur corporate.

### Valeurs clés
1. **Sur-mesure** — On ne vend pas de templates, on construit.
2. **Proximité** — Ancrés en région, disponibles, humains.
3. **Excellence discrète** — La qualité se voit dans les détails, pas dans les grandes déclarations.
4. **Pédagogie** — On accompagne, on explique, on monte en compétences.

---

## Palette de couleurs

```
CREAM       #FAF7F0   Fond principal — jamais blanc pur
CREAM-DARK  #F0EBE0   Fond secondaire, cartes, sections alternées
NAVY        #0B1F4A   Couleur primaire — textes, éléments sombres
NAVY-MID    #1E3A6E   Navy intermédiaire — hover, ombres
ELECTRIC    #005FFF   Accent électrique — CTAs, highlights clés
ELECTRIC-LT #4D8FFF   Version claire — gradients, glows subtils
TEXT-2ND    #4A5568   Corps de texte secondaire
MUTED       #9AA5B4   Captions, labels discrets
BORDER      #E2D9C8   Bordures légères
```

**Règles d'usage :**
- `CREAM` = fond de page. Toujours.
- `NAVY` = textes principaux, headers, nav. Autorité sans agression.
- `ELECTRIC` = 1 seul élément par section maximum. CTA principal, stat clé, underline signature.
- Ne jamais combiner `ELECTRIC` et `NAVY-MID` en plages larges.
- Le blanc `#FFFFFF` : uniquement sur les cartes posées sur fond crème.

---

## Typographie

### Polices

| Rôle | Police | Import |
|------|--------|--------|
| Display / Grands titres | Cormorant Garamond | Google Fonts |
| Corps / UI | Plus Jakarta Sans | Google Fonts |

```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Utilisation

```
Hero headline      → Cormorant Garamond 700, 60–72px, navy, tracking -0.02em
Section title      → Cormorant Garamond 600, 40–48px, navy
Card title         → Cormorant Garamond 600, 24–28px
Body lead          → Plus Jakarta Sans 400, 18–20px, text-secondary
Body standard      → Plus Jakarta Sans 400, 16px, text-secondary
Label / Caption    → Plus Jakarta Sans 500, 12–14px, muted, uppercase + tracking
CTA button         → Plus Jakarta Sans 600, 15px, letter-spacing 0.02em
```

**Règle d'or**: Cormorant pour l'émotion et l'élégance. Jakarta pour la lisibilité et l'action.

---

## Logo & Iconographie

### Logotype
- Wordmark "Levo" en Cormorant Garamond 600
- Couleurs autorisées: Navy sur fond crème / Crème sur fond navy / Electric sur fond crème
- Interdit: Déformation, rotation, effets drop-shadow lourds

### Icônes
- Style: Linéaires, 1.5px stroke, coins légèrement arrondis
- Librairie recommandée: Lucide Icons ou Phosphor Icons
- Taille min: 20×20px
- Couleur: Hérite de la couleur de texte parent (currentColor)

---

## Espacement & Mise en page

```
Section padding vertical:    80–120px (5rem–7.5rem)
Container max-width:          1200px
Gutter desktop:               48px
Gutter mobile:                20px
Card padding:                 32–40px
Border-radius cards:          12–16px
Border-radius boutons:        8px (pas de full-round sauf cas spécifiques)
```

---

## Animations & Motion

**Philosophie**: Le mouvement guide, il ne distrait pas.

```css
/* Transitions standard */
--transition-fast:   150ms ease-out;   /* hover states */
--transition-base:   300ms ease-out;   /* reveals, menus */
--transition-slow:   500ms ease-out;   /* sections, modals */
--transition-hero:   800ms cubic-bezier(0.16, 1, 0.3, 1); /* hero entrances */
```

**Patterns autorisés**:
- Fade-up au scroll (translateY 20px → 0 + opacity 0 → 1)
- Hover: légère montée `-2px` + ombre douce
- CTA: border electric qui se remplit au hover (left → right)
- Curseur: pas de curseur custom — trop distrayant

**Interdit**: Parallax agressif, bounce, effets de typewriter sur les headlines, confetti.

---

## Ton de voix — Exemples

### Headline site
❌ "Révolutionnez votre entreprise avec l'IA"  
✅ "L'IA qui travaille comme vous le souhaitez"

### Description service
❌ "Notre solution IA de pointe transforme vos processus"  
✅ "On automatise ce qui vous prend du temps, vous gardez ce qui compte"

### CTA
❌ "Commencer maintenant !" (exclamation = urgence forcée)  
✅ "Discutons de votre projet" / "Voir comment ça marche"

### Instagram caption (voir skill levo-instagram pour le détail)
- Commence par une observation ou question concrète
- Montre le "avant / après" en terme de temps ou de résultat
- Pas d'hashtags en cascade — 3–5 max, pertinents

---

## Application à d'autres contextes

Quand ce skill est actif, **chaque output doit** :
1. Utiliser les tokens couleurs CREAM/NAVY/ELECTRIC
2. Appliquer Cormorant pour les titres, Jakarta pour le corps
3. Respecter le ton : expert, chaleureux, concret
4. Maintenir des espaces généreux (jamais à l'étroit)
5. Limiter l'accent `ELECTRIC` à 1 usage par bloc visuel

---

## Référence

Pour les détails d'implémentation technique (CSS variables, Next.js setup) →
lire `references/tokens.css` dans ce skill.

Pour le design du site web → activer le skill `levo-website-design`.  
Pour le contenu Instagram → activer le skill `levo-instagram`.
