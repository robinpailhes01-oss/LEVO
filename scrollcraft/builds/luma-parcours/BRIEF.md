# BRIEF — luma-agence.fr, « le parcours » (monde continu WebGL)

> **Interviewé partiellement.** Robin a répondu aux quatre questions structurantes
> (structure, univers, pic, périmètre) via un choix guidé. Les questions 1, 2, 3
> et 5 ont été proposées par moi dans le message précédent (concept, six lieux,
> courbe, mouvement signature) et validées implicitement par ses réponses : il a
> choisi le pic « le cœur attrape SON message », qui est le mouvement signature
> proposé. Les réponses marquées *(proposé)* sont donc de ma main, dans la voix
> de la marque, et non ses mots.

## Contexte de ce build

- Le site est en production et porte le SEO. Le voyage **remplace la page
  d'accueil** (choix de Robin). Le contenu profond qui vivait dans les sections
  de l'accueil (réalisations, à propos) migre vers des pages dédiées pour que
  rien ne disparaisse de l'index.
- **Pas de ffmpeg, pas de clé de génération.** Le monde n'est pas de la vidéo :
  c'est une scène three.js temps réel (déjà présente sur le site, réutilisée et
  étendue). Aucun `scrub`, aucune image générée. Conséquence directe : la
  grammaire « monde continu » est implémentée avec ses règles (une seule scène
  fixe, un seul spacer, rien ne s'épingle ni ne se désépingle, le texte arrive
  dans une couche fixe aux points de passage) mais **sans le moteur worldflight**
  du skill, conçu pour des segments vidéo. Le moteur n'est pas modifié : il
  n'est pas monté.
- Next.js 14 + Framer Motion + React Three Fiber 8 (React 18).

---

## Les 8 réponses

**1. Vibe en 3-5 mots + références** *(proposé)*
Lumineux, précis, artisanal, sûr, méditerranéen.
Références : une maquette d'architecte posée sur une table blanche au soleil ;
la scène d'ouverture de « Her » (une machine chaleureuse, jamais froide) ; un
atelier d'horloger, où chaque pièce se voit travailler.

**2. Le parcours de scroll, lieu par lieu** *(proposé, six lieux validés par le
choix du pic)*
Le comptoir (une demande arrive à 22h47) → la coulée (des centaines de messages
tombent sans réponse) → le cœur (l'écosystème attrape le message) → l'atelier
(devis, CRM, relances se fabriquent en volume) → le tableau (le tableau de bord
comme un lieu, avec les vrais chiffres) → l'arrivée (le bureau de Luma, un seul
geste).

**3. La courbe d'énergie** *(proposé)*
Calme et proche à l'ouverture. Ça descend, ça s'assombrit et ça se tait sur la
coulée. Ça culmine sur le cœur. Ça reste soutenu mais mécanique sur l'atelier.
Ça se pose sur le tableau. Ça s'éclaire et s'arrête net sur l'arrivée.

**4. Émotion étape par étape + LE moment à retenir**
Reconnaissance → malaise → **soulagement / émerveillement** → confiance →
maîtrise → résolution. Le moment à retenir, choisi par Robin : **« le cœur
attrape SON message »**.

**5. Une chose qu'aucun site ne fait** *(proposé, retenu par Robin comme pic)*
Le visiteur tape sa propre demande en haut de page. Cette bulle voyage avec lui
dans tout le monde, se fait traiter sous ses yeux, et à la fin le seul bouton
l'envoie réellement à Luma, pré-remplie.

**6. Distance au premium-minimal** — réponse de Robin : **crème lumineux**. Le
monde 3D vit sur la crème actuelle, objets bleu nuit et bleu électrique, blanc
pour la lumière. Continuité totale avec la marque.

**7. Un monde continu ou des scènes distinctes** — réponse de Robin : **un monde
continu**.

**8. Assets** — réponse de Robin : **rien à fournir, tout en WebGL temps réel**.
Assets réels réutilisés : logos clients, portrait de Robin, chiffres Harmonie
Yacht (40h+, 3×, 0 demande oubliée), captures des sites créés.

---

## La courbe de ressenti (une ligne par lieu, écrite avant tout code)

```
1  Reconnaissance   un téléphone posé, une bulle WhatsApp qui arrive à 22h47 ; le visiteur tape la sienne
2  Malaise          la lumière baisse, des centaines de bulles tombent et s'éteignent, presque sans texte
3  Émerveillement   la caméra plonge, le cœur s'allume et attrape SA bulle, les liaisons se tracent autour
4  Confiance        l'atelier : le devis se plie autour de la bulle, les colonnes CRM tournent, une relance s'arme
5  Maîtrise         le tableau de bord devient un lieu ; les vrais chiffres s'inscrivent, rien ne bouge trop
6  Résolution       la lumière chaude du bureau ; la bulle se pose ; un bouton, et il envoie vraiment
```

Aucun lieu adjacent ne porte le même ressenti. Le lieu 2 est **le silence
autorisé** avant le pic : presque pas de texte, ralentissement du rythme, pour
que le lieu 3 soit un changement d'état et pas une suite.

## Le pic

> « J'ai tapé ma demande en haut, et plus bas la machine l'a attrapée et l'a
> transformée en devis sous mes yeux. »

Lieu 3, le cœur. Il reçoit la plus grande part de scroll (≈ 2,4 hauteurs
d'écran sur ≈ 11), le budget d'objets (le cœur, six satellites, les liaisons,
la lumière qui suit le curseur) et le silence du lieu 2 juste avant.

## La phrase « c'est le site où… »

**C'est le site où ta propre demande traverse la machine pendant que tu
descends, et arrive prête à envoyer.**

## Silence autorisé

Lieu 2 (la coulée) : une seule ligne de texte, tard dans le lieu, petite. Le
reste du lieu est visuel. La passe de vérification ne doit pas le compter comme
scroll mort.

---

## Grammaire, chrome, fermeture

- **Grammaire : monde continu (§2.4).** Les sept autres perdent : le split est
  déjà pris par la page actuelle (registre) ; l'éditorial ne porte pas la 3D ;
  la surface vive exige le produit réel opérable ; le poster typographique
  refuse l'image ; la galerie répond à « quelles options » ; le cutlist est
  fait pour l'énergie, pas pour un argument ; le filmique est le squelette par
  défaut, et de toute façon sans vidéo il n'a rien à scrubber.
- **Nav = carte.** Un rail fixe à droite (desktop) / en bas (mobile) : six
  points nommés, un marqueur qui avance, cliquable.
- **Hero = position établie dans le monde.** Le comptoir, déjà là, avec le
  champ où taper sa demande. Pas de titre plein écran séparé, mais un vrai `h1`.
- **Fermeture = arrivée.** Le bureau, la bulle posée, le CTA est un objet posé
  sur le bureau. La page s'arrête là.
- **Mouvement signature** : la bulle du visiteur qui voyage (voir réponse 5).
  Codé dans la page, pas un réglage de device.

## Test d'unicité contre le registre (luma-agence)

| Dimension | luma-agence | luma-parcours | Diffère |
|---|---|---|---|
| Grammaire | Split stage | Monde continu | oui |
| Nav | Pilule flottante | Carte (rail de points de passage) | oui |
| Hero | Parallax + spotlight + kinetic | Position dans le monde + champ de saisie | oui |
| Forme de séquence | 13 sections, 2 pins | 0 section, 6 points de passage, 1 vol, ≈ 11 vh | oui |
| Fermeture | CTA plein écran fond noir | Arrivée dans le monde, CTA-objet | oui |
| Signature | Conversation qui se répond seule | Ta demande traverse la machine | oui |

6/6. Le gate demande 4.

## Score (device par lieu)

Sans moteur, les « devices » sont des comportements de la scène et de la
couche de texte, mais la variété reste la règle : jamais le même deux fois de
suite.

| Lieu | Comportement | Pourquoi |
|---|---|---|
| Comptoir | Position tenue + saisie (le visiteur agit) | La page reconnaît quelqu'un dès la première seconde |
| Coulée | Descente de caméra + chute instanciée, texte quasi absent | Le silence avant le pic |
| Cœur | Plongée + assemblage + lumière au curseur | Le pic : le plus grand changement visuel, le plus de scroll |
| Atelier | Travelling latéral + objets mécaniques (pli, rotation, arc) | La confiance vient de voir les pièces bouger |
| Tableau | Caméra face au panneau, chiffres réels qui s'inscrivent | Maîtrise : on lit, ça ne bouge presque plus |
| Arrivée | Remontée + lumière chaude + objet-bouton | La résolution : ça s'arrête et ça tient |

Longueur totale visée : ≈ 11 hauteurs d'écran (hors bande 13,6-13,8).
