# BRIEF — luma-agence.fr, passe scroll premium

> **Self-authored, not interviewed.** Robin n'a pas répondu aux 8 questions de
> l'interview (il a répondu « Tu peux reprendre ? »). Ce brief est reconstitué à
> partir du travail mené avec lui sur ce site dans la même session : positionnement
> arrêté ensemble, palette, cible, offre, assets réels, et ses corrections
> successives sur le copywriting. Ce n'est pas un plan validé par lui.

## Contexte particulier de ce build

Ce n'est **pas** une page scrollcraft autonome. Le site existe, il est en
production, il porte le SEO (canonicals, schémas, FAQ), les formulaires
connectés à Supabase + email, et plusieurs pages (`/services`,
`/services/[slug]`, `/formations/agent-whatsapp`, `/cgv`).

Construire une page HTML parallèle avec le moteur du skill créerait du contenu
dupliqué, casserait le SEO et laisserait deux sites à maintenir. La grammaire,
la courbe de ressenti, le pic, la variété de devices et la vérification par
capture s'appliquent donc **au site Next.js existant**, en Framer Motion (déjà
une dépendance, déjà utilisée dans le Hero). Le moteur `scrollcraft.js` n'est
pas monté : il écrirait des `transform` en concurrence avec Framer Motion sur
les mêmes nœuds.

Contraintes d'environnement : **pas de ffmpeg, pas de `KIE_AI_API_KEY`**. Donc
aucun device `scrub`, aucune imagerie générée. Tout est typographie, layout,
transform et couleur — ce qui exclut d'office les grammaires qui reposent sur la
vidéo.

---

## Les 8 réponses (auto-rédigées, voix de la marque)

**1. Vibe en 3-5 mots + références**
Sobre, premium, méditerranéen, artisanal, sûr de lui.
Références : la typographie d'un magazine d'architecture (grands titres, marges
généreuses) ; une boutique d'opticien haut de gamme du centre de Montpellier
(peu d'objets, beaucoup de lumière) ; la lumière de fin d'après-midi sur la
pierre du Sud.

**2. Le parcours de scroll**
On arrive sur la promesse. On voit tout de suite que d'autres ont fait confiance.
On comprend le problème qu'on vit tous les jours (les messages qui s'accumulent).
On voit ce qui change. On voit l'offre concrète. On voit les preuves. On demande
un audit.

**3. La courbe d'énergie**
Calme et large à l'ouverture. Ça se tend au moment où on nomme le problème.
Ça culmine sur le basculement avant/après. Ça redescend sur les preuves et la
méthode (registre posé, factuel). Ça se referme net sur l'action.

**4. Émotion étape par étape + LE moment à retenir**
Reconnaissance (« c'est exactement ma journée ») → agacement contenu (« oui, je
perds ça toutes les semaines ») → **soulagement** (« ah, donc ça peut juste
s'arrêter ») → confiance (« ils l'ont déjà fait pour d'autres ») → décision.
Le moment à retenir : **le basculement**, quand la colonne « sans » se fait
avaler par la colonne « avec ».

**5. Une chose qu'aucun site ne fait**
Ne pas *décrire* l'agent. Le **faire tourner sur la page**. Pendant que le
visiteur lit, une vraie conversation WhatsApp se déroule et se répond toute
seule, et elle est terminée quand il arrive au formulaire.

**6. Distance au premium-minimal**
On reste premium-minimal, c'est la bonne famille pour du B2B qui vend de la
tranquillité. Mais on arrête d'être plat : il faut un moment qui se retient.

**7. Monde continu ou scènes distinctes ?**
Scènes distinctes. C'est un site de conversion multi-pages, pas un voyage.

**8. Assets disponibles**
Logos clients réels (Harmonie Yacht, LS Consulting, Champagne Perla, JeanBa
Jardin), captures de sites livrés (JeanBa, June, Fabien), photo de Robin,
chiffres réels vérifiés (40h/mois, 3x devis, 0 demande oubliée, 1284 messages,
64,20 €). **Aucune vidéo, aucun budget de génération.**

---

## Grammaire retenue : Split stage (§2.7)

**Pourquoi elle.** Tout le pitch de Luma est une comparaison à deux côtés :
*ce que vous vivez* contre *ce que vous vivriez*. « Zéro client perdu parce que
personne n'a répondu à temps » n'a de sens que par contraste. La comparaison
**est** le produit.

**Pourquoi les sept autres perdent :**

| Grammaire | Pourquoi non |
|---|---|
| Filmic one-shot | Repose sur `scrub`. Pas de vidéo, pas de ffmpeg, pas de budget. Et porte une charge de la preuve que rien ici ne justifie. |
| Chaptered editorial | Interdit la barre fixe et le hero plein cadre. Casserait la nav pilule et la structure multi-pages qui portent la conversion. |
| Live surface | Interdit toute chrome marketing (pas de wordmark+CTA, pas de titre de section en display). Détruirait un site dont le métier est de convertir. Récupérée autrement : voir le signature move. |
| Continuous world | Exige worldflight + assets générés. Indisponible. |
| Typographic poster | Séduisant vu l'absence d'assets, mais interdit les cartes — or le site est bâti sur des cartes (services, réalisations, formations) qu'on vient de refondre. |
| Gallery / catalog | Le site est un argument, pas seulement une collection. La question du visiteur est « est-ce que je peux y croire », pas « quelles sont les options ». |
| Rhythmic cutlist | Grammaire de marques d'énergie (streetwear, sport, événementiel). Contresens total pour un dirigeant de PME qui cherche du calme. |

**Application partielle, assumée.** Split stage veut « pas de barre, le séparateur
est la chrome ». On garde la nav pilule : c'est un site multi-pages en
production, la retirer casserait la navigation et le SEO. La grammaire gouverne
donc **l'acte du pic**, pas la chrome globale. C'est une déviation, elle est
consciente, elle est ici pour être lue.

---

## Courbe de ressenti (écrite avant le score)

| Acte | Ressenti | Ce qui le cause à l'écran |
|---|---|---|
| Hero | Calme, assurance | Grand titre, beaucoup d'air, mockup qui respire |
| Preuve sociale | Rassurance tiède | Logos réels qui défilent |
| **Sans / Avec (PIC)** | **Tension puis soulagement** | **La colonne « sans » se fait avaler par la colonne « avec »** |
| Offre WhatsApp | Concret, appétit | Chiffres d'usage et coût réel, onglets CRM |
| Services | Posé, factuel | Cartes, lecture tranquille |
| Méthode | Confiance | 4 étapes numérotées |
| Réalisations | Preuve | Cas clients chiffrés |
| Contact | Décision | Fond noir, une seule action |

Aucun acte adjacent ne partage le même ressenti. Le silence auteur est **juste
avant le pic** : la bande de logos est volontairement calme et lente pour que la
tension qui suit se détache.

## Le pic

**L'acte :** Sans / Avec, placé après la preuve sociale et avant l'offre.

**La phrase qu'un visiteur dirait à un confrère :**
> « Il y a un moment où la page se coupe en deux, ta journée pourrie d'un côté,
> et l'autre côté bouffe littéralement le premier pendant que tu scrolles. »

Il a la plus grande amplitude de scroll de la page, et l'acte qui le précède
(logos) est plus calme que lui.

## Signature move

**« La conversation qui se répond toute seule. »**

Un fil WhatsApp compact, fixe en bas à droite, présent toute la page. Il ne
raconte pas l'agent : il **le fait tourner**. À des positions de scroll
précises, un vrai message client arrive, puis l'agent répond, puis le statut
passe à « Qualifié », puis « Devis envoyé », puis « Réservé ». Quand le visiteur
atteint le formulaire, la conversation est terminée sous ses yeux.

Ce n'est aucun device du kit, ce n'est pas un paramètre modifié, et c'est la
logique de la grammaire *Live surface* (la démo est l'argument) récupérée
comme mouvement signature au lieu d'être imposée à toute la page.

Étiqueté « Démonstration » pour qu'il ne soit jamais confondu avec un chat de
support réel.

## Phrase tell-someone

> « C'est le site où l'agent WhatsApp te répond tout seul pendant que tu
> descends la page, et où ta journée d'avant se fait avaler par celle d'après. »

---

## Score (device par acte)

| Acte | Device | Pourquoi celui-là |
|---|---|---|
| Hero | `parallax` + `spotlight` + `kinetic` | Existant, il fonctionne. On n'y touche pas. |
| Preuve sociale | `pan` (marquee) | Le défilement latéral lit « éventail de clients », pas « hiérarchie ». Existant. |
| **Sans / Avec** | **`pin` + split piloté par `--sc-p`** | **Un séparateur qui se déplace sous la main est la seule façon de faire *ressentir* un basculement au lieu de l'affirmer.** |
| Offre | `pin` léger + onglets | Existant. |
| Services / Formations | `flow` + `in` | Tout épingler épuise. Le contraste est ce qui fait atterrir le pic. |
| Réalisations | `tilt` + `reveal` | Existant. |
| Contact | `magnet` | Existant. |
| Toute la page | `drift` | Le sol se déplace du crème vers le noir en trois paliers. Invisible d'une image à l'autre, évident du haut vers le bas. |

Familles distinctes : `pin`, `pan`, `flow`, `parallax`, `tilt`, `reveal`,
`magnet`, `drift` → largement au-dessus du plancher de quatre. Aucune famille
deux fois d'affilée. Zéro `scrub` (impossible). Longueur totale inchangée, on
n'allonge pas la page : le pic prend son amplitude sur du scroll neuf, pas sur
du scroll volé aux autres sections.

## Déviations assumées

- **Tirets cadratins conservés.** La règle dure du skill les interdit ; c'est une
  règle de typographie anglaise. En français le tiret cadratin est une
  ponctuation standard et le site est entièrement francophone.
- **Nav pilule conservée** malgré Split stage (voir plus haut).
- **Signature move masqué sous 1024px.** Sur un écran de 390px, un panneau fixe
  mange le contenu et nuirait à la conversion. Le pic, lui, fonctionne sur mobile.
