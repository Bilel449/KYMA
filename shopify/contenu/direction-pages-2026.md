# KYMA — Direction des pages 2026 : arborescence, storyboards motion, micro-interactions (v1, Maya)

Statut : BROUILLON PUBLIABLE sous réserve des balises. À relire : Arthur (QA), Victoire (juridique), Sacha (faisabilité WebGL).
Auteur : Maya, 08/10/2026, à la demande du fondateur.
Sources : `brand/BRAND.md` (Direction digitale, Palette du site), `tendances-web-2026.md` (Isabelle), `copy-site.md` (Maya, validé), `pages-editoriales.md` et `fiches-produit.md` (Izaac), `conformite.md` (Victoire).

Précision d'honnêteté : ce document est écrit pour être codé par Sacha, mais je n'ai pas encore reçu ses retours. Les points de faisabilité sont listés en fin de document (section 8) comme questions à lui poser, pas comme accords obtenus. Je n'ai pas ouvert les sites de référence cités : je me fonde sur la description d'Isabelle (statuts « à vérifier » conservés).

## Légende des balises (inchangée)
`[À COMPLÉTER : …]` donnée manquante · `[À VALIDER : …]` proposition à valider · `[À CONFIRMER : …]` à aligner sur l'étiquette ou la présérie · `[SI PRÉSÉRIE VALIDÉE : …]` affirmation d'unicité, à n'activer qu'après validation des préséries (repli : « Pensé pour que chaque pièce soit unique. ») · `*mot*` = mot en DM Serif Display italique.

## Garde-fous juridiques appliqués à tout le document
- Aucune unicité sans condition : partout, le repli « Pensé pour que chaque pièce soit unique. » est le texte par défaut.
- Aucune mention GOTS, coton biologique, bio, ni origine de fabrication (ni « Made in Portugal », ni drapeau). Seul « imaginé à Paris » / « KYMA Paris » est utilisé.
- Chaque affichage de précommande porte « Expédition au plus tard le [À COMPLÉTER : date] ».
- Aucune allégation environnementale. « Petites séries » reste un fait de production.
- Aucun prix codé en dur : le prix vient de Shopify (`{{ prix TTC }}`, avec « hors frais de livraison » et lien Livraison).
- Aucun compteur, aucune rareté affichée, aucun décompte.
- Les représentations 3D de coloris sont des illustrations : légende « Illustration du coloris. » La mention de rendu produit est en section 3.0.

---

## 1. Les tendances 2026 que KYMA retient, et celles qu'elle refuse

Principe de tri : « KYMA ne crie jamais. La marque murmure avec assurance, comme le ressac. » Une tendance est retenue si elle peut se faire lentement, sans bruit, et si elle sert à regarder la pièce. Elle est refusée si elle réclame l'attention.

### Retenues (5, chacune sous condition)

| # | Tendance (Isabelle) | Ce que KYMA en garde | Pourquoi, au regard de « KYMA ne crie jamais » |
|---|---|---|---|
| 1 | 3D interactive temps réel, référence Spline | Des objets doux, satinés, pastel, éclairés comme en studio. Un objet par écran, jamais deux. Mouvement lent (cycles de 7 à 14 s), réponse à la souris amortie. | La 3D de style Spline est silencieuse par nature : matière, lumière, ombre douce. Elle montre le motif en volume, sans photo ni image IA. La limite : aucun effet spectaculaire, aucune explosion de particules. |
| 2 | Défilement narratif | Une idée par écran, révélée par le scroll natif. Aucune prise de contrôle du défilement, aucun « snap » long. | Le visiteur garde la main. Le récit se déroule comme une marée, au rythme de la lecture. |
| 3 | Typographie cinétique | Réservée au titre du hero et à l'ouverture des chapitres. Les titres se lèvent ligne par ligne, une seule fois. | Isabelle note que l'effet tient au mouvement plus qu'à la taille. On garde le mouvement, on refuse le gigantisme et le défilé de texte. |
| 4 | Micro-interactions en système | Un seul jeu de tokens (durées, easing, amplitudes) pour tout le site. Voir section 5. | La cohérence est une forme de calme : le site réagit toujours de la même façon, jamais de surprise. |
| 5 | Texture tactile et grain | Grain très léger (6 à 10 % sur les fonds, contre 15 à 30 % dans la recherche), jamais sur le texte, jamais sur les coloris produit. Voir section 6. | Le grain répond au rendu « IA trop lisse » et donne du toucher. À 8 %, on le sent sans le voir : du luxe discret. |

### Refusées

| Tendance ou pratique repérée | Décision | Raison |
|---|---|---|
| Expérience jouable (Lacoste « Ace Breaker ») | Refusée | Un jeu crie pour attirer. KYMA invite sans solliciter. |
| Monde 3D immersif qui remplace la navigation (KidSuper World) | Refusée | Naviguer dans un décor fait oublier la pièce. La navigation reste lisible, le 3D reste un objet. |
| Effets « glitch » et distorsion (GLITCHWEAR) | Refusée | Le glitch est brutal. Le motif KYMA est fluide, tonal, jamais saccadé. |
| Configurateur « créez votre pièce » (Custom Studio) | Refusée | Hors modèle (pièce non personnalisable) et risque juridique : l'exception « bien personnalisé » ne doit pas être suggérée. |
| Titres surdimensionnés, bandeaux défilants (tickers), contrastes extrêmes | Refusée | Volume élevé. Le titre du hero plafonne à 7,5 rem et reste fixe une fois révélé. |
| Curseur personnalisé envahissant | Refusée sous cette forme | Seulement un halo discret autour du curseur système, jamais de curseur masqué. |
| Transitions de page spectaculaires | Refusée | Seul un fondu de 240 ms, qui aide à comprendre le changement de page. |
| Vidéo ou son en lecture automatique, compte à rebours, fausse rareté | Refusée | Pression et bruit. Déjà exclus par `copy-site.md`. |
| Headless (Hydrogen) | Non retenue pour l'instant | Coût estimé 3 à 5 fois celui d'un thème Liquid, Oxygen à vérifier sur le plan d'essai. Le thème Liquid suffit pour un produit. |

### Sites de référence (inspiration, pas copie)
1. **Denim Tears (Kamp Grizzly, étude de cas Shopify)** : la page produit pensée comme un musée, des objets 3D posés dans un grand vide. On en garde l'idée d'un produit présenté comme une pièce de collection. On ne copie ni le collage ni la grille abstraite, qui sont leur langage.
2. **FILA North America (Your Majesty)** : minimal, effets révélés progressivement. On en garde la retenue : l'effet apparaît seulement quand on s'en approche. Statut « SOTD » non confirmé hors source agence ; le chiffre de 36 % de clics est auto-déclaré, on ne s'en sert pas.
3. **Aimé Leon Dore (Digital Archive)** : navigation minimale. On en garde la sobriété du menu. Source secondaire.
Référence motion de matière : **Spline** (décision du fondateur). Plausible mais non vérifié : Max Mara « Jacket Circle » (à vérifier).

---

## 2. Arborescence, rôle des pages et menu

### Arborescence
```
/                                  Accueil
/collections/drop-1                Collection (Drop 1)
/products/ressac-hoodie-zippe-oversize   Le produit (Ressac)
/pages/cercle-waves                Cercle Waves
/pages/nous-connaitre              Nous connaître (#histoire #adn #motif #savoir-faire #paris)
/pages/guide-des-tailles           Guide des tailles
/pages/faq                         FAQ
/pages/contact                     Contact
```
Hors storyboard, sobres, sans 3D (mêmes tokens, même grain de fond) : panier, 404 (copy-site §7), pages légales, cookies, conditions Cercle Waves (non publiée tant que les règles ne sont pas définies).
Redirections 301 à prévoir par Sacha : `/pages/notre-histoire` et `/pages/savoir-faire` vers `/pages/nous-connaitre` (leurs textes d'Izaac sont repris dans la page unique).
Nom du produit : « Ressac » sous réserve de disponibilité (repli : « Hoodie zippé KYMA », handle `hoodie-zippe-kyma`).

### Rôle de chaque page

| Page | Rôle | Question du visiteur | Action principale | Visuel dominant |
|---|---|---|---|---|
| Accueil | Poser l'univers et mener au choix du coloris en un défilement. | « Qu'est-ce que KYMA ? » | Choisir mon coloris | Sculpture « La Vague », étoffes |
| Collection | Comparer les cinq coloris d'une même pièce, expliquer la précommande. | « Lequel me va ? » | Voir ce coloris | Étoffes qui ondulent |
| Le produit | Convaincre et permettre la précommande, avec toutes les mentions légales. | « Est-ce la bonne pièce, à ma taille ? » | Précommander | Hoodie 3D 360° |
| Cercle Waves | Présenter les deux paliers et recueillir les inscriptions. | « Que m'apporte le cercle ? » | Rejoindre le cercle | Cartes 3D, anneaux |
| Nous connaître | Raconter la marque : histoire, ADN, motif, savoir-faire, Paris. | « Qui est derrière ? » | Découvrir le Drop 1 | Typographie, dessins techniques |
| Guide des tailles | Lever le doute sur la taille avant l'achat. | « Quelle taille ? » | Retour à la fiche produit | Dessin technique à cotes |
| FAQ | Répondre sans contact. | « Comment ça marche ? » | Écrire à KYMA si besoin | Accordéon |
| Contact | Recevoir un message. | « Comment les joindre ? » | Envoyer | Ondes concentriques |

### Menu proposé
- **En-tête (bureau)** : logo KYMA à gauche · **Collection · Le produit · Cercle Waves · Nous connaître · Aide** (menu déroulant : Guide des tailles, FAQ, Contact) · panier à droite. Le lien actif porte un filet ondulé camel de 1 px.
- **En-tête (mobile)** : logo, panier, bouton « Menu ». Panneau plein écran beige, entrées en DM Serif Display 40 px numérotées (01 Collection, 02 Le produit, 03 Cercle Waves, 04 Nous connaître, 05 Aide), apparition en cascade (60 ms entre entrées).
- **Bandeau d'annonce** : les 3 messages de `copy-site.md` §2, fondu de 480 ms toutes les 6 s, en pause au survol et au focus ; au lancement, message 1 seul.
- **Pied de page** : signature « KYMA Paris — L'art du flow. » · Collection · Le produit · Cercle Waves · Nous connaître · Guide des tailles · FAQ · Contact · puis la ligne légale de Victoire : Mentions légales · CGV · Livraison · Retours & remboursements · Confidentialité · Cookies · Gérer mes cookies · Renoncer au contrat ici.
- **Bouton « Mettre le mouvement en pause »** dans le pied de page (voir 5.8).

---

## 3. Storyboards motion, page par page

### 3.0 Fondations communes

**Couleurs d'interface.** Fond Beige `#F5EDE4` · Brun `#4A3B32` (textes, titres) · Marron clair `#C19E86` (filets, tracés, détails, jamais du texte) · Rose clair `#E8C4C4` (aplats `#F3DEDC` : cartes, halos, survols). Le lilas n'est plus une couleur d'interface.
**Mot en italique des titres.** La charte le mettait en lilas foncé : ce n'est plus possible. Proposition : italique en **Camel profond `#8A6A52`** [À VALIDER fondateur], uniquement dès 32 px (contraste 4,2:1 sur beige, valable pour grand texte). À défaut : italique en Brun. Camel `#C19E86` seul sur beige n'atteint que 2,1:1 : jamais pour du texte.
**Labels numérotés** : Outfit 500, capitales, interlettrage 4 px, 12 à 13 px, Brun à 72 %. Format « 01 — LE DROP 1 ».
**Mention de rendu (partout où un rendu du hoodie apparaît)** : « Visuel de présentation (rendu). Pensé pour que chaque pièce soit unique ; la vôtre pourra différer. » Point à confirmer avec Victoire : la mention de `conformite.md` (a) contient « chaque pièce ayant un motif unique », ce qui contredit son propre tableau tant que les préséries ne sont pas validées. J'utilise la version de repli.
**Aucune image IA, aucune photo de banque.** Toute matière est générée par shader ou dessinée en vectoriel. Les PNG de `brand/private/images/` sont des rendus IA : ils ne servent ni de texture ni de fond, même floutés.

**Moteur 3D (pour Sacha).** Un seul contexte WebGL par page, un seul fichier partagé (`kyma-gl.js`, mis en cache entre les pages), un seul canvas qui suit la section visible. Le canvas hérite de la taille de son conteneur (`aspect-ratio` réservé, pas de décalage de mise en page). Rendu à la demande : la boucle s'arrête quand le canvas est hors écran (IntersectionObserver) ou l'onglet masqué. Résolution : devicePixelRatio plafonné à 1,75 (bureau) et 1,5 (mobile). Si le temps d'image dépasse 24 ms sur 30 images, passer à ratio 1, puis à 30 i/s. Budget : JS total < 150 Ko min+gzip (budget Shopify), textures ≤ 2048 px (≤ 1024 sur mobile), GLB ≤ 4 Mo.
**Repli sans WebGL, mode économie de données ou batterie faible** : image vectorielle statique de l'objet (SVG dans la même palette) + interactions CSS équivalentes. Le texte du hero, qui porte le LCP, ne dépend jamais du canvas.

### 3.1 Catalogue des objets (référencés par leur code dans les storyboards)

**V — La Vague (sculpture)**
- Géométrie : surface paramétrique (u,v), grille 128×72 (mobile 80×48), soit environ 37 000 triangles (15 000 mobile). Profil en volute : pour v dans [0,1], rayon r(v)=R·(1−0,62·v), angle φ(v)=v·2,5π, point (y,z)=r(v)·(sin φ, cos φ). Extrusion le long de x dans [−1,2 ; 1,2]·R. Rayon modulé : R(u,t)=R0·(1 + 0,16·sin(2π·1,4u + 0,35t) + 0,08·sin(2π·3,1u − 0,6t + 1,7)). Torsion asymétrique de 0,35 rad·(u−0,5) autour de x : la forme n'est jamais symétrique. Épaisseur : seconde nappe décalée de 0,07·R0 le long des normales, bord fermé et arrondi.
- Matière : satin. Diffus enveloppant (wrap 0,4), spéculaire large (brillance 18, intensité 0,35), rim Fresnel 0,25 teinté rose clair. Marbrage par bruit fractal à deux octaves avec déformation de domaine, mélange tonal entre `#E8C4C4` et `#C19E86` limité à 0–55 % (jamais de contraste extrême).
- Lumière : clé (−0,5 ; 0,8 ; 0,6) `#FFF4E8` ; ambiance hémisphérique `#F5EDE4` à 0,55 ; rebond bas `#C19E86` à 0,15. Ombre de contact au sol : ellipse floue Brun à 16 % d'opacité, rayon 1,1·R, qui suit la rotation.
- Repos : « respiration » d'échelle 1 ± 1,2 % sur 6 s ; flux de t continu (cycle visible 9 à 14 s).
- Réponse par défaut : souris → lacet ±14°, tangage ±7°, lissage exponentiel (taux 5/s) ; la lumière suit le pointeur ; tactile → glisser horizontal ±25° avec retour élastique de 800 ms.

**E — Étoffe qui ondule**
- Géométrie : plan 1 × 1,35, grille 96×128 (mobile 48×64). Déplacement en z dans le vertex shader : z = Aw·[0,6·sin(5,5x + 0,9t + φ(y)) + 0,4·sin(3,2y − 0,6t + 1,3x)]·pin(y), avec Aw=0,05 au repos et pin(y)=smoothstep(0, 0,35, 1−y) (bord haut fixe, comme une bannière suspendue). Normales analytiques.
- Vent du curseur : gaussienne de σ=0,18, amplitude +0,09, attaque 200 ms, relâchement 900 ms.
- Matière : motif KYMA Wave procédural. p=uv·2,2 ; q=fbm(p+0,15t) ; r=fbm(p+3q+(1,7 ; 9,2)) ; couleur=mix(A,B,smoothstep(0,25 ; 0,75 ; r)). Écart de luminance A/B ≤ 12 %. Micro-trame de maille (normale bruitée, force 0,15), satin léger, ourlet plus sombre de 6 % sur 2 % de la bordure.
- Palette de marque (scènes hors produit) : `#E8C4C4` / `#C19E86`.
- Palettes de coloris Drop 1 (valeurs approchées, [À VALIDER Izaac], tech pack v3) : Lilac Whirl `#C8A2C8` / `#E6D5E6` · Ivory Tide `#EFE4C8` / `#F7F0DC` · Silver Drift `#9AA3AD` / `#E3E5E8` · Noir Absolu `#1C1C1C` / `#343434` · Crimson Flow `#A3162F` / `#5A0F1F`.
- Légende obligatoire sous toute étoffe de coloris : « Illustration du coloris. »

**H — Hoodie 3D 360° (fiche produit uniquement)**
- Source : modèle GLB d'Izaac [dépendance : je ne l'ai pas vu dans le dépôt]. ≤ 4 Mo, textures ≤ 2048 px, seulement normales et occlusion préparées. Le motif est calculé par shader (mêmes uniformes que E) pour obtenir les 5 coloris avec un seul modèle. Aucune texture dérivée des rendus IA.
- Matières : French terry = rugosité élevée + voile de bord (sheen) 0,35 ; zip = métal argent brossé, spéculaire anisotrope ; tirette « Kyma » = laiton plaqué or brossé ; doublure de capuche = jersey ton sur ton.
- Caméra : champ 28°, distance 3,2, cible (0 ; 0,05 ; 0). Orbite libre en lacet sur 360°, tangage borné entre −8° et +18°. Inertie : décroissance exponentielle, constante 0,55 s. Rotation automatique 7°/s après 3 s sans action, arrêtée à l'appui, reprise après 4 s.
- Préréglages Face (0°), Profil (90°), Dos (180°), Détail (zoom 1,7 sur le zip) : trajet de 900 ms, easing `--ease-tide`.
- Changement de coloris : uniforme uMix de 0 à 1 en 900 ms. Front de balayage de bas en haut : masque = smoothstep(p−0,15 ; p+0,15 ; bruit(uv·3)+0,8·uv.y). Le motif change de teinte comme une vague qui passe.
- Grain : 0 sur le hoodie, pour la fidélité des couleurs.

**D — Dessin technique vectoriel animé (SVG)**
- Contours en Camel `#C19E86`, trait 1,25 px (1 px sur mobile) ; cotes, flèches et textes en Brun, Outfit 12 px capitales, interlettrage 0,12 em ; axes en pointillé 3-3.
- Animation : `pathLength=1`, `stroke-dashoffset` de 1 à 0. Soit piloté par le scroll (progression de section de 0,1 à 0,7), soit chronométré (1100 ms, `--ease-flow`) à l'entrée dans l'écran, avec 120 ms de décalage entre éléments. Les cotes se tracent, puis leur valeur monte en 400 ms (chiffres tabulaires).
- Pièces à dessiner par Izaac ou Sacha (originales, vectorielles) : hoodie à plat face et dos (épaules tombantes, zip intégral, capuche double épaisseur sans cordon, deux poches biais, bords-côtes), détails (zip, tirette, bord-côte 2×2), tracé libre de la Seine.

**T — Typographie cinétique**
- DM Serif Display, `clamp(2.75rem, 7vw, 7.5rem)` pour le hero, `clamp(2rem, 4.5vw, 4rem)` pour les chapitres. Chaque ligne est masquée (`overflow:hidden`), montée de 110 % à 0 en 1100 ms (`--ease-flow`), décalage 90 ms par mot, 28 ms par lettre pour un mot court. Le mot en italique reçoit une ligne ondulée dessinée (SVG, 640 ms, +300 ms de retard).
- Au scroll, sur les titres de chapitre : interlettrage de 0,06 em à 0 entre les progressions 0,2 et 0,6 (effet de resserrement très léger).
- Un seul titre cinétique par écran. Aucun défilement horizontal de texte.
- Attention au grec : je ne suis pas sûr que DM Serif Display contienne les glyphes grecs. Si non, « κύμα » est livré en SVG (contours dessinés) plutôt qu'en repli sur une autre police. À vérifier par Sacha.

**A — Anneaux 3D**
- Tore de rayon R=1, rayon de tube r=0,16, segments 96×32. Matière satin mat, léger brossage radial, marbrage tonal le long de u. INITIUM `#E8C4C4`, ORIGINE `#C19E86` [À VALIDER].
- Paire entrelacée : axes inclinés de 70°, centres écartés de 1,0·R. Au repos : rotation de chaque anneau autour de son axe à 4°/s, en sens opposés. Parallaxe souris ±10°. Jamais de logo sur les anneaux.

**G — Grain** : voir section 6. **R — Ondes concentriques** : voir page Contact.

### 3.2 ACCUEIL

**Section 0 — Hero**
- Label : DROP 1 — PRÉCOMMANDE
- Titre : Une pièce, pensée pour être *unique*.
- Texte : Pensé pour que chaque pièce soit unique. Le motif KYMA Wave est un marbré fluide, tonal, qui ne cherche jamais à se répéter.
- CTA : Choisir mon coloris → `/collections/drop-1`. Mention sous le bouton : Expédition au plus tard le [À COMPLÉTER : date]. Lien secondaire : Découvrir le motif (ancre vers la section 02).
- Remarque : le label « PRÉCOMMANDE » n'est affiché que si la précommande est effectivement ouverte (voir blocage n°3 de Victoire : pas de précommande sans contrat fabricant signé).
- 3D : **V** à droite (62 % de la largeur sur bureau, 55 vh centré sur mobile), sur fond de motif KYMA Wave animé en basse résolution (charte §05) : rendu à 0,5×, 24 i/s, écart de luminance ≤ 4 % entre les deux teintes beige et rose.
  - Défilement : lacet 0 à 160°, déroulement de la volute (de 1,25 tour à 0,6 tour) sur la hauteur du hero, translation −8 %, échelle 1 à 0,82. Le texte monte de 12 % moins vite (parallaxe).
  - Souris : réponse par défaut de V. Le CTA agit sur la lumière : au survol, la lumière clé se déplace de 20° vers le bouton.
  - Toucher : glisser horizontal sur le canvas, `touch-action: pan-y` (le défilement vertical reste libre).
- Transition : la sculpture se dissout par fondu de 640 ms pendant que les cinq étoffes de la section suivante montent, décalées de 120 ms.

**Section 1**
- Label : 01 — LE DROP 1
- Titre : Cinq coloris, un même *flux*.
- Texte : Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow. Cinq nuances du même mouvement, en petite série.
- Lien : Voir les coloris → `/collections/drop-1#coloris`
- 3D : cinq **E** suspendues en ligne (palettes de coloris), chacune 17 vw de large. Légende « Illustration du coloris. » + nom du coloris sous chaque étoffe.
  - Défilement : à l'entrée, une onde unique traverse les cinq étoffes de gauche à droite (déphasage 350 ms, amplitude ×2 qui décroît en 1,6 s).
  - Souris : vent gaussien. Au survol d'une étoffe : elle se lève de 12 px, son ondulation se calme à Aw=0,02, son nom se souligne (ligne ondulée dessinée, 320 ms), les autres passent à 72 % d'opacité.
  - Toucher : balayage horizontal avec accroche (snap) sur mobile, un appui ouvre la page. Un appui long déclenche le vent.
  - Clavier : flèches gauche/droite pour passer d'une étoffe à l'autre, Entrée pour ouvrir.
- Transition : le motif de l'étoffe Lilac Whirl s'élargit en fondu de 640 ms et devient le fond de la section suivante.

**Section 2**
- Label : 02 — LE MOTIF
- Titre : Un motif qui suit son *flux*. [SI PRÉSÉRIE VALIDÉE : Un motif qui ne se répète *jamais*.]
- Texte : Le KYMA Wave est un marbré fluide, volutes et tourbillons, toujours tonal. Il capte le rythme des vagues sans chercher à les copier.
- Lien : Découvrir le motif → `/pages/nous-connaitre#motif`
- 3D : **E** à plat (sans ondulation), plein cadre 100 vw × 70 vh, palette Lilac Whirl.
  - Défilement : l'intensité de déformation passe de 0,5 à 1,6 sur la section ; le motif circule sans jamais boucler visiblement.
  - Souris : le pointeur est un attracteur de tourbillon (rayon 0,22, force 0,6, retour en 1,2 s).
  - Toucher : le doigt trace un sillage identique, sans bloquer le défilement vertical (zone de glissement limitée aux 70 % centraux).
  - Sélecteur : cinq points (les cinq coloris), changement de palette par balayage de 900 ms. Légende : « Illustration du coloris. »
- Transition : le cadre rectangulaire du motif se resserre en silhouette de hoodie (masque SVG interpolé, les deux tracés doivent avoir la même structure de points, fournis par Izaac).

**Section 3**
- Label : 03 — LA PIÈCE
- Titre : Une pièce, un *seul* geste. [SI PRÉSÉRIE VALIDÉE : Chaque hoodie est *unique*.]
- Texte : Le motif est imprimé sur tout le tissu. Pensé pour que chaque pièce soit unique. [SI PRÉSÉRIE VALIDÉE : Chaque pièce est découpée dans une zone différente du rouleau : votre hoodie ne ressemble qu'à lui-même.]
- Lien : Découvrir la pièce → page produit
- Interactif : **D** du hoodie à plat, section épinglée sur 160 vh. Le dessin se trace dans l'ordre : contour, capuche, zip, poches, bords-côtes. À la fin, la silhouette se remplit du motif de la section précédente (masque révélé de bas en haut). Trois légendes se tracent : « Épaules tombantes », « Zip intégral », « Capuche sans cordon ».
  - Souris : au survol d'une partie, son trait passe à 2 px Brun et la légende s'ouvre.
  - Toucher : un appui sur une partie ouvre la légende, un second la ferme.
  - Clavier : chaque partie est focusable, la légende s'ouvre au focus.
- Transition : la silhouette se défait en fils verticaux qui descendent vers la section suivante.

**Section 4**
- Label : 04 — LE SAVOIR-FAIRE
- Titre : Une matière dense, une coupe *libre*.
- Texte : French terry épais à l'intérieur gratté, épaules tombantes, zip intégral en métal brossé, capuche double épaisseur sans cordon.
- Lien : Lire le détail de la pièce → `/pages/nous-connaitre#savoir-faire`
- Note : aucune phrase sur la certification ni sur le lieu de fabrication ; grammage affiché seulement une fois confirmé ([À COMPLÉTER : grammage définitif]).
- 3D : un carré de maille en gros plan (**E** à plat, normales de boucles de French terry, force 0,4, sans ondulation). Deux puces sous le carré : « Face » et « Intérieur gratté ».
  - Défilement : la maille bascule de 0 à 180° autour de l'axe horizontal ; au verso, l'ombrage devient duveteux (bruit haute fréquence sur la normale et sur le voile de bord).
  - Souris : la lumière glisse, la force de la normale monte à ×1,6 sous le pointeur.
  - Toucher : glisser pour incliner (±20°).
- Transition : la maille se roule sur elle-même en anneau (fondu de 640 ms) qui devient le premier anneau de la section 5.

**Section 5**
- Label : 05 — CERCLE WAVES
- Titre : Rejoindre le *cercle*.
- Texte : Cercle Waves réunit celles et ceux qui suivent KYMA de près. Deux paliers, INITIUM et ORIGINE.
- Lien : Entrer dans le Cercle → `/pages/cercle-waves`
- 3D : **A**, deux anneaux d'abord écartés (distance 2,4·R).
  - Défilement : la distance passe à 1,0·R (entrelacés) sur la section, avec un arrêt ralenti en fin de course.
  - Souris : parallaxe ±10°. À moins de 80 px d'un anneau, une étiquette INITIUM ou ORIGINE apparaît (fondu de 180 ms).
  - Toucher : glisser horizontal pour tourner la paire.
- Transition : les anneaux glissent vers le bas et s'effacent pendant que la grille de la section suivante monte.

**Section 6**
- Label : 06 — INSTAGRAM
- Titre : Dans le *sillage*.
- Texte : Coulisses, textures et premiers regards, sur @kymasinsta.
- Lien : Suivre @kymasinsta
- Interactif : six tuiles carrées. Pas d'incrustation Instagram (elle déposerait des traceurs tiers sans consentement, et pourrait afficher des visuels hors charte). Chaque tuile est un fragment de **E** à plat (palette de marque) portant une courte légende en DM Serif Display. Chaque tuile renvoie vers le compte.
  - Souris : inclinaison ±4°, relevé de 4 px, halo rose clair `#E8C4C4` à 35 %.
  - Toucher : montée en cascade au scroll (60 ms entre tuiles).
- Transition : une ligne ondulée camel monte du bas et devient le filet du pied de page, avec la signature « KYMA Paris — L'art du flow. ».

### 3.3 COLLECTION (Drop 1)

**Section 0 — Hero**
- Label : DROP 1 — PRÉCOMMANDE
- Titre : Une pièce, cinq *courants*.
- Texte : Le hoodie Ressac existe en cinq coloris. Même coupe, même tissu, même motif KYMA Wave : seules changent la teinte du motif et la doublure de la capuche.
- CTA : Voir les coloris (ancre `#coloris`). Mention : Expédition au plus tard le [À COMPLÉTER : date].
- 3D : une grande **E** (palette de marque), suspendue à droite (45 vw).
  - Défilement : de la progression 0,3 à 0,8, l'étoffe se découpe en cinq bandes verticales (écart de 0 à 24 px) ; chaque bande passe à la palette d'un coloris (fondu de 640 ms, décalage 120 ms).
  - Souris et toucher : vent par défaut.
- Transition : les cinq bandes deviennent les cinq cartes de la section 1.

**Section 1**
- Label : 01 — LES COLORIS
- Titre : Choisir son *courant*.
- Texte (un bloc par coloris, nom en DM Serif Display + accroche + doublure) :
  - Lilac Whirl. Le lilas qui tourne, sans jamais revenir. Doublure crème.
  - Ivory Tide. L'ivoire monte comme une marée sur le sable clair. Doublure blanc chaud.
  - Silver Drift. Un gris d'acier qui dérive sur la perle. Doublure blanc froid.
  - Noir Absolu. La nuit, quand la mer ne se voit plus mais s'entend.
  - Crimson Flow. Un cramoisi qui coule sur le bordeaux.
  - Prix : `{{ prix TTC }}` « hors frais de livraison » (lien Livraison), affiché une seule fois en tête de liste. Doublures de Noir Absolu et Crimson Flow non précisées au tech pack : ne rien écrire.
- Lien par carte : Voir ce coloris → `/products/ressac-hoodie-zippe-oversize?variant=…`
- 3D : cinq **E** (palettes de coloris), légende « Illustration du coloris. ».
  - Souris : au survol, l'étoffe s'agrandit à ×1,4, son ondulation se calme, un panneau (nom, accroche, doublure) s'ouvre à droite. Les quatre autres reculent à 72 % d'opacité.
  - Toucher : balayage horizontal avec accroche. Un appui sélectionne, le lien « Voir ce coloris » ouvre.
  - Clavier : flèches pour passer d'une étoffe à l'autre, Entrée pour ouvrir.
- Transition : les étoffes se replient (échelle verticale à 0, 640 ms) pour laisser le dessin technique tracer la section 2.

**Section 2**
- Label : 02 — UNE MÊME PIÈCE
- Titre : Même pièce, autre *teinte*.
- Texte : Même coupe, même tissu, même motif KYMA Wave. Seuls changent la teinte du motif et la doublure de la capuche.
- Interactif : **D** du hoodie à plat, rempli du motif par un petit canvas **E** masqué par la silhouette. Cinq pastilles de coloris. Un clic recolore la silhouette par balayage de bas en haut (640 ms). Légende : « Illustration du coloris. ».
  - Souris : le survol d'une pastille prévisualise la teinte à 60 % d'intensité.
  - Toucher : un appui sélectionne.
- Transition : la ligne de la silhouette se prolonge en une ligne horizontale qui devient la frise de la section 3.

**Section 3**
- Label : 03 — LA PRÉCOMMANDE
- Titre : La fabrication suit la *précommande*.
- Texte : Précommande du [À COMPLÉTER : date d'ouverture] au [À COMPLÉTER : date de clôture]. La fabrication démarre après la clôture de la précommande. Votre paiement est enregistré à la commande. Expédition au plus tard le [À COMPLÉTER : date]. Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Voir les CGV et la page Retours. [À COMPLÉTER : liens vers les pages CGV et Retours]
- Interactif : frise **D** en quatre points, Précommande · Clôture · Fabrication · Expédition (« au plus tard le [À COMPLÉTER : date] »).
  - Défilement : la ligne se trace, chaque point s'allume (cercle Camel qui se remplit de Rose, 320 ms) dans l'ordre.
  - Souris : le survol d'un point révèle une phrase explicative d'une ligne.
  - Toucher : un appui ouvre la phrase.
- Transition : la ligne se prolonge jusqu'à un anneau.

**Section 4**
- Label : 04 — CERCLE WAVES
- Titre : Rester dans le *cercle*.
- Texte : Inscrivez-vous pour suivre le courant de près : ouvertures, coulisses, premiers regards.
- Lien : Entrer dans le Cercle → `/pages/cercle-waves`
- 3D : un seul anneau **A** (INITIUM, rose), rotation lente, parallaxe souris. Un appui ou un clic mène à la page.
- Transition : fondu vers le pied de page (ligne ondulée camel).

### 3.4 LE PRODUIT (Ressac)

Mise en page bureau : le visualiseur reste épinglé à gauche pendant que la colonne de droite défile. Mobile : visualiseur en haut (60 vh), colonne dessous, bouton « Précommander » dans un volet fixe en bas.

**Section 0 — Visualiseur et achat**
- Label : DROP 1 — HOODIE ZIPPÉ OVERSIZE
- Titre : Ressac, hoodie zippé *oversize*.
- Accroche (italique) : Pensé pour que chaque pièce soit unique. [SI PRÉSÉRIE VALIDÉE : Une vague ne se répète jamais. Celle-ci non plus.]
- Texte : Le coton épais tombe, lourd et doux. L'intérieur gratté garde la chaleur, comme un sable tiède. Le motif ondoie d'une épaule à l'autre. Le zip glisse ; la tirette brille, à peine.
- Sous le visualiseur : « Visuel de présentation (rendu). Pensé pour que chaque pièce soit unique ; la vôtre pourra différer. »
- Colonne d'achat (contenu obligatoire, rien ne doit être masqué par une animation) :
  - Prix : `{{ prix TTC }}`, « hors frais de livraison », lien Livraison.
  - Coloris : cinq pastilles + nom. Taille : XS à XXL + lien Guide des tailles.
  - Bouton : Précommander (si aucune taille : Choisir une taille). Sous le bouton : Expédition au plus tard le [À COMPLÉTER : date].
  - Bloc « Précommande, en toute transparence » : texte de `copy-site.md` §4.1, inchangé.
  - Accordéons ouverts par défaut : Composition (Corps : [À CONFIRMER : 100 % coton] · Bords-côtes : 95 % coton, 5 % élasthanne · Doublure de capuche : [À COMPLÉTER : composition]), Entretien (30 à 40 °C sur l'envers, pas de sèche-linge [À CONFIRMER : étiquette définitive]).
- 3D : **H**.
  - Défilement : le visualiseur reste épinglé, la caméra se rapproche très légèrement (distance 3,2 à 3,0) pendant le défilement de la colonne.
  - Souris : glisser pour tourner, lumière qui suit le pointeur, molette non captée (le défilement de la page reste libre). Boutons Face · Profil · Dos · Détail sous le visualiseur. Le changement de coloris déclenche le balayage de 900 ms.
  - Toucher : glisser horizontal pour tourner (`touch-action: pan-y`) ; pas de zoom au pincement, le bouton « Détail » le remplace.
  - Clavier : le visualiseur est focusable, flèches gauche/droite = rotation de 15°, touches 1 à 4 = préréglages.
  - Bouton « Précommander » sans taille : halo rose qui pulse une fois (640 ms) et message « Choisissez une taille. », sans secousse.
- Transition : la caméra du visualiseur s'éloigne pendant que le hoodie réduit à 40 % se fixe dans le coin ; la section 01 arrive en plein cadre.

**Section 1**
- Label : 01 — LA MATIÈRE
- Titre : Une matière qui *tombe*.
- Texte : French terry de 400 à 420 g/m² [À CONFIRMER : grammage définitif à la présérie], intérieur gratté. Dense, il tombe sans coller. Doux dès le premier jour.
- 3D : carré de maille **E** (comme l'accueil section 4), plus grand (80 vw).
  - Défilement : bascule 0 à 180° face / intérieur gratté, légende qui change.
  - Souris : lumière rasante qui suit le pointeur ; la force de normale grossit sous le curseur.
  - Toucher : glisser pour incliner.
- Transition : le carré se recentre et son motif s'étend en fond de la section 2.

**Section 2**
- Label : 02 — LE MOTIF
- Titre : Un motif qui suit son *flux*.
- Texte : Le motif KYMA Wave est imprimé en pigmentaire, all-over, sur un long rouleau de tissu. Marbré, fluide, jamais symétrique.
- Interactif : **E** à plat plein cadre (comme l'accueil section 2). [SI PRÉSÉRIE VALIDÉE : sur ce fond, une silhouette de hoodie glisse le long du rouleau et s'arrête à trois endroits différents ; à chaque arrêt, le motif sous la silhouette est visiblement autre. Texte associé : « Il ne boucle pas. Chaque pièce est découpée dans une zone différente du rouleau. »] Sans validation, cette animation n'est pas affichée : elle affirmerait l'unicité par l'image.
  - Souris et toucher : tourbillon comme à l'accueil.
- Transition : fondu du fond vers le beige, la silhouette devient le dessin de la section 3.

**Section 3**
- Label : 03 — LES DÉTAILS
- Titre : Rien d'ajouté, rien de *bruyant*.
- Texte (cinq légendes) :
  - Zip intégral en métal argent brossé.
  - Tirette sculptée « Kyma », en laiton plaqué or brossé. C'est le seul éclat de la pièce.
  - Capuche à double épaisseur, doublure en jersey ton sur ton. Pas de cordon, pas d'œillets : un choix de design, pour une ligne sans interruption.
  - Deux poches biais.
  - Bords-côtes 2×2 de 6 cm aux poignets et à la taille.
- Interactif : **D** du hoodie à plat, section épinglée sur 180 vh. Cinq points numérotés se posent un à un, chacun avec un trait de rappel et sa légende (320 ms). Le point actif zoome le dessin ×1,6 vers sa zone (900 ms, `--ease-tide`).
  - Souris : survol d'un point = même ouverture que le scroll.
  - Toucher : appui sur un point, ou balayage horizontal sur une barre de progression.
  - Clavier : Tab parcourt les cinq points.
- Transition : le dessin se resserre en silhouette entière, puis les cotes de la section 4 se tracent.

**Section 4**
- Label : 04 — COUPE ET TAILLE
- Titre : Une silhouette *posée*.
- Texte : Coupe oversize : ample, posée, épaules tombantes. Votre taille habituelle donne la silhouette voulue. Pour une coupe plus ajustée, prenez une taille en dessous. Mesures détaillées dans le guide des tailles.
- Lien : Guide des tailles → `/pages/guide-des-tailles`
- Interactif : **D** du hoodie à plat avec les cotes (poitrine, épaules, longueur dos, manche, bas) ; un sélecteur de taille XS à XXL. À chaque changement, le dessin respire (échelle ±3 %, 320 ms) et les valeurs montent de la précédente à la nouvelle (400 ms). Mesures à plat en cm, tolérance ±1 cm, issues du guide.
  - Souris : survol d'une cote = surbrillance du trait Brun 2 px.
  - Toucher : appui sur une taille.
- Transition : fondu doux vers la section 5.

**Section 5**
- Label : 05 — LA PRÉCOMMANDE
- Titre : En toute *transparence*.
- Texte : La fabrication démarre après la clôture de la précommande. Votre paiement est enregistré à la commande. Expédition au plus tard le [À COMPLÉTER : date]. Si cette échéance devait être affectée, nous vous informons par e-mail. Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Voir les CGV et la page Retours. [À COMPLÉTER : liens]
- Interactif : la frise **D** de la Collection (section 3), version courte.
- Transition : la ligne conduit à la suggestion « Autres coloris » (cinq pastilles ondulantes **E** miniatures, 56 px) puis au pied de page.

### 3.5 CERCLE WAVES

Cette page détaille la section 4 du document pour les cartes. Aucune mention de prix.

**Section 0 — Hero**
- Label : CERCLE WAVES
- Titre : Rejoindre le *cercle*.
- Texte : Cercle Waves est le programme de fidélité de KYMA. Il accompagne celles et ceux qui suivent la marque, du premier pas jusqu'à la proximité. Deux paliers, qui se découvrent dans l'ordre.
- 3D : **A**, un seul anneau INITIUM centré, un second ORIGINE qui entre depuis la droite.
  - Défilement : l'anneau ORIGINE glisse jusqu'à s'entrelacer avec INITIUM (progression de 0 à 100 % du hero).
  - Souris : parallaxe ±10°. Toucher : glisser horizontal pour tourner.
- Transition : les anneaux se réduisent et s'élèvent derrière le titre de la section 1.

**Section 1 — Les paliers (cartes pivotantes)**
- Label : 01 — LES DEUX PALIERS
- Titre : Deux paliers, un même *courant*.
- Texte : L'entrée dans le cercle, puis le palier supérieur. Chacun se découvre en retournant sa carte.
- 3D : deux cartes, détail en section 4.
- Transition : les cartes reculent et s'inclinent de 6° pendant que la ligne de la section 2 se trace.

**Section 2 — Le passage**
- Label : 02 — DE L'UN À L'AUTRE
- Titre : Dans l'ordre, sans *détour*.
- Texte : Les paliers se découvrent dans l'ordre. Le passage à ORIGINE : [À COMPLÉTER : critère décidé par le fondateur]. Ne rien chiffrer avant sa décision.
- Interactif : **D**, une ligne ondulée Camel relie les deux symboles de palier (un anneau puis deux anneaux entrelacés en vectoriel), et se trace au scroll en 900 ms ; le deuxième symbole se remplit de Camel à l'arrivée.
  - Souris et toucher : survol ou appui sur un symbole = rappel du nom et de la phrase d'accroche.
- Transition : la ligne se referme en cercle autour du formulaire.

**Section 3 — Inscription**
- Label : 03 — ENTRER
- Titre : Entrer dans le *cercle*.
- Texte : Prénom et adresse e-mail suffisent. Vous pourrez vous désinscrire à tout moment.
- Formulaire : prénom, e-mail. Case de consentement non pré-cochée. Mention : même texte que le bloc newsletter de `copy-site.md` §5 [À VALIDER VICTOIRE : formulation RGPD, responsable de traitement]. Bouton : Rejoindre le cercle.
- Confirmation : Bienvenue dans le cercle. Votre place est enregistrée.
- Erreur : Cette adresse semble incomplète. Pouvez-vous la vérifier ?
- Mentions : Conditions du programme : [À COMPLÉTER : lien. Page non publiée tant que les règles ne sont pas décidées.]
- Interactif : un anneau **A** (petit, 120 px) au-dessus du formulaire.
  - Succès : l'anneau, resté ouvert (arc de 300°), se ferme en 900 ms avec un léger éclat satiné.
  - Erreur : l'anneau reste ouvert, aucune secousse, le champ concerné se souligne en Brun avec le message.
  - Chargement : l'anneau tourne lentement (une rotation par 2 s).

### 3.6 NOUS CONNAÎTRE

Une seule page, cinq chapitres, avec ancres. Reprend les textes d'Izaac (`pages-editoriales.md` §1 et §3), passés au vouvoiement (voir section 8).

**Section 0 — Ouverture**
- Label : NOUS CONNAÎTRE
- Titre : *κύμα.*
- Texte : En grec, la vague. KYMA se prononce « Kouma ». Un mot ancien pour un mouvement qui ne s'arrête pas : la vague arrive, se retire, revient. Jamais tout à fait la même.
- Visuel : **T**, le mot κύμα en très grand, tracé au contour (SVG, 1100 ms) puis rempli ; un seul mot, seul. Voir l'alerte sur le grec en 3.1.
  - Défilement : le mot se réduit et monte en haut de page (position fixe, 12 vh) pendant les chapitres.
  - Souris : les lettres se décalent de ±6 px selon le pointeur (parallaxe individuelle).
- Transition : le trait du contour descend et devient la ligne du chapitre 1.

**Section 1 — Histoire**
- Label : 01 — HISTOIRE
- Titre : Un mouvement qui ne *s'arrête* pas.
- Texte : C'est de là que la marque naît, à Paris. D'un rythme plutôt que d'une image. KYMA ne copie pas la nature : elle en capture la cadence. Aucune date de fondation n'est affichée (les documents se contredisent, point à arbitrer par le fondateur).
- 3D : **V** petite (40 vw), au repos.
  - Défilement : lacet de 0 à 120°.
  - Souris et toucher : réponse par défaut.
- Transition : la sculpture se déroule en une ligne horizontale.

**Section 2 — ADN**
- Label : 02 — ADN
- Titre : Peu de choses, bien *dites*.
- Texte : Une seule pièce signature : un hoodie zippé oversize. Épaules tombantes, matière dense, intérieur gratté, capuche sans cordon. Rien d'ajouté, rien de bruyant. Qu'on reconnaisse KYMA sans logo : à la texture, à la couleur, au mouvement. Le vide compte autant que le plein.
- 3D : **V** plein cadre, trois mots en légende : Texture · Couleur · Mouvement.
  - Défilement : trois temps. Texture : matière mate, grain visible, sans couleur. Couleur : la palette rose/camel se révèle par balayage. Mouvement : l'ondulation s'active. Chaque temps dure un tiers de la section ; un trait Camel indique l'étape.
  - Souris : le pointeur survole un mot, la sculpture revient à l'étape correspondante.
  - Toucher : appui sur un mot.
- Transition : la sculpture s'efface, il reste son marbrage qui devient la section 3.

**Section 3 — Motif**
- Label : 03 — LE MOTIF
- Titre : Marbré. Fluide. Jamais *symétrique*.
- Texte : Deux nuances proches, un tourbillon qui s'écoule. Pensé pour que chaque pièce soit unique. [SI PRÉSÉRIE VALIDÉE : Le motif ne se répète pas : chaque hoodie est découpé dans une zone différente du rouleau, et porte son propre dessin.]
- Interactif : **E** à plat plein cadre, palette de marque, avec un curseur « Teinte » (cinq coloris) en bas à gauche. Mêmes réglages que l'accueil section 2.
- Transition : le motif se resserre en un trait qui part vers la section 4.

**Section 4 — Savoir-faire**
- Label : 04 — SAVOIR-FAIRE
- Titre : De la fibre au *zip*.
- Texte (six étapes, chacune avec son dessin) :
  1. La fibre. Le point de départ est le coton. [À CONFIRMER : composition définitive, selon l'étiquette]
  2. Le tissu. Un French terry de 400 à 420 g/m² [À CONFIRMER : grammage]. Dense, il tombe sans coller. L'intérieur est gratté : doux dès le premier jour.
  3. Le motif. Le motif KYMA Wave est imprimé en pigmentaire, all-over, sur un long rouleau de tissu.
  4. La découpe. Chaque pièce est découpée avec soin dans le tissu imprimé. Pensé pour que chaque pièce soit unique. [SI PRÉSÉRIE VALIDÉE : Chaque pièce est découpée dans une zone différente du rouleau. C'est ce geste qui rend chaque hoodie unique.]
  5. La forme. Coupe oversize, épaules tombantes. Capuche à double épaisseur, doublure en jersey ton sur ton. Deux poches biais. Bords-côtes 2×2 de 6 cm aux poignets et à la taille.
  6. Le zip. Zip intégral en métal argent brossé. Au bout, une tirette sculptée « Kyma » en laiton plaqué or brossé. C'est le seul éclat de la pièce.
- Exclus : toute mention de certification des fibres ou des encres et tout lieu de fabrication.
- Interactif : **D**, frise horizontale épinglée (240 vh) : fibre (brin), maille (tricot), rouleau (bande imprimée), ciseaux (découpe), silhouette, tirette. Chaque dessin se trace au scroll (900 ms), l'étape active en Brun, les autres en Camel à 50 %.
  - Souris : clic sur une étape = saut animé de 900 ms.
  - Toucher : balayage horizontal avec accroche, ou défilement vertical.
  - Clavier : flèches pour changer d'étape.
- Transition : le trait de la dernière étape (la tirette) se prolonge en une ligne qui serpente.

**Section 5 — Paris**
- Label : 05 — PARIS
- Titre : Une adresse, *Paris*.
- Texte : KYMA naît à Paris. Imaginé à Paris : une ville de quais et de reflets, où l'eau est partout pour qui la suit. Ride the wave.
- Visuel : **D**, tracé libre d'un fleuve (inspiré de la Seine, vectoriel original, sans fond de carte), avec un seul point « Paris ».
  - Défilement : le fleuve se trace en 1500 ms, le point apparaît à la fin.
  - Souris : la ligne s'épaissit de 1 à 2 px autour du pointeur.
  - Toucher : un appui sur le point affiche « KYMA Paris ».
- CTA : Découvrir le Drop 1 → `/collections/drop-1`
- Transition : la ligne se jette dans le pied de page.

### 3.7 GUIDE DES TAILLES

**Section 0 — Ouverture**
- Label : GUIDE DES TAILLES
- Titre : Choisir sa *taille*.
- Texte : Le hoodie Ressac est coupé large. Les épaules tombent, la matière flotte, le zip suit le mouvement. Ce guide vous aide à choisir l'amplitude que vous préférez. Les mesures sont données à plat, en centimètres, avec une tolérance de ±1 cm.
- Visuel : **T** simple (titre) + trait **D** d'un mètre ruban qui se déroule en 900 ms.
- Transition : le ruban devient la première ligne du tableau.

**Section 1 — Tableau**
- Label : 01 — LES MESURES
- Titre : Cinq mesures, six *tailles*.
- Texte : le tableau HTML réel (accessible, sélectionnable) :

| | XS | S | M | L | XL | XXL |
|---|---|---|---|---|---|---|
| Poitrine | 60 | 62 | 64 | 66 | 68 | 70 |
| Épaules | 54 | 56 | 58 | 60 | 62 | 64 |
| Longueur dos | 66 | 68 | 70 | 72 | 74 | 76 |
| Manche | 62 | 63 | 64 | 65 | 66 | 67 |
| Bas (à plat) | 58 | 60 | 62 | 64 | 66 | 68 |

- Interactif : à droite du tableau, **D** du hoodie à plat avec cotes. Un clic sur une colonne (taille) ou une ligne (mesure) met la cote en surbrillance Brun 2 px et redessine la silhouette à l'échelle de la taille (320 ms, amplitude ±3 %). Le tableau lui-même reste sans grain et sans animation de texte.
  - Souris : survol de ligne = cote correspondante en surbrillance.
  - Toucher : défilement horizontal du tableau avec première colonne figée, appui = sélection.
  - Clavier : flèches dans le tableau (rôle grille).
- Transition : la cote sélectionnée se détache et se transforme en ruban de la section 2.

**Section 2 — Mesurer**
- Label : 02 — SE MESURER
- Titre : Poser à plat, *comparer*.
- Texte : Posez à plat un hoodie que vous portez déjà, mesurez-le, comparez. C'est le plus fiable.
- Interactif : **D**, trois vignettes (poitrine, épaules, longueur) animées successivement : le vêtement posé, le ruban qui se tend, la valeur qui s'affiche. Boucle unique, relançable par un bouton « Revoir ».
  - Toucher : balayage entre les trois vignettes.
- Transition : fondu.

**Section 3 — Conseils**
- Label : 03 — CONSEILS
- Titre : Entre deux *tailles*.
- Texte : Coupe prévue : oversize. Votre taille habituelle donne la silhouette voulue : ample, posée. Pour une coupe plus ajustée, prenez une taille en dessous. Entre deux tailles : la plus petite pour plus de tenue, la plus grande pour plus d'amplitude. Unisexe : une seule grille, pour toutes et tous.
- Interactif : curseur « Plus ajusté — Plus ample » qui fait varier la silhouette **D** (échelle de 0,94 à 1,06) et affiche la taille conseillée par rapport à la taille habituelle (sélectionnée dans une liste). Aucune promesse d'ajustement : résumé « Indication, à confirmer avec le tableau ».
- Transition : renvoi.

**Section 4 — Un doute**
- Label : 04 — UN DOUTE
- Titre : Nous *écrire*.
- Texte : Un doute sur la taille : écrivez-nous [À COMPLÉTER : adresse e-mail de contact], nous vous répondons.
- CTA : Contacter KYMA → `/pages/contact`. Second lien : Retour à la pièce → fiche produit.

### 3.8 FAQ

Page fonctionnelle : le mouvement reste minimal.

**Section 0 — Ouverture**
- Label : FAQ
- Titre : Questions *fréquentes*.
- Texte : Les réponses essentielles, sans détour.
- Interactif : un champ « Rechercher une question » qui filtre en direct (120 ms), mise en évidence du terme en Rose. Une ligne ondulée Camel sous le champ, qui s'étire de la longueur de la saisie.
- Transition : les groupes montent en cascade (60 ms).

**Sections 1 à 4 — Accordéons** (un groupe par label)

*01 — LA PIÈCE*
- Quelle taille choisir ? Le hoodie Ressac est oversize : votre taille habituelle donne la silhouette voulue, ample et posée. Pour une coupe plus ajustée, prenez une taille en dessous. Toutes les mesures sont dans le guide des tailles.
- Comment entretenir mon hoodie ? Lavage à 30–40 °C, sur l'envers. Pas de sèche-linge. [À CONFIRMER : à aligner sur l'étiquette définitive] Suivez toujours l'étiquette cousue dans la pièce.
- De quoi est fait le hoodie ? French terry de 400 à 420 g/m², intérieur gratté [À CONFIRMER : grammage définitif]. Corps : [À CONFIRMER : 100 % coton] · Bords-côtes : 95 % coton, 5 % élasthanne · Doublure de capuche : [À COMPLÉTER : composition]. Zip métal argent brossé, tirette en laiton plaqué or brossé.
- Quelle est la différence entre les coloris ? Aucune, sinon la couleur. Même coupe, même tissu, même motif KYMA Wave. Seuls changent la teinte du motif et la doublure de la capuche.

*02 — LE MOTIF*
- Chaque pièce est-elle unique ? Pensé pour que chaque pièce soit unique. Les visuels du site montrent l'esprit du motif, pas votre pièce exacte. [SI PRÉSÉRIE VALIDÉE : Oui. Le motif est imprimé en continu sur un rouleau de tissu, sans répétition. Chaque hoodie est découpé dans une zone différente : deux pièces du même coloris partagent les mêmes teintes, jamais le même dessin.]

*03 — LA PRÉCOMMANDE*
- Comment fonctionne la précommande ? Le Drop 1 est proposé en précommande : la fabrication démarre après la clôture de la précommande. Expédition au plus tard le [À COMPLÉTER : date], indiquée sur la fiche produit. Les conditions de paiement, de délai et de rétractation sont détaillées dans nos CGV. [À COMPLÉTER : lien]
- Comment se passe la livraison ? Nous livrons en [À COMPLÉTER : pays desservis ; à ce stade, la France]. Frais : [À COMPLÉTER]. Délai : [À COMPLÉTER : délai après expédition]. Un e-mail de suivi vous est envoyé dès l'envoi. [À CONFIRMER : transporteur et suivi]
- Puis-je annuler ou retourner ma commande ? Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Conditions et marche à suivre sur la page Retours et remboursements.

*04 — CERCLE WAVES*
- Comment fonctionne Cercle Waves ? Cercle Waves est le programme de fidélité de KYMA, en deux paliers, INITIUM et ORIGINE. Les avantages et les conditions sont [À COMPLÉTER : règles décidées par le fondateur]. Voir la page Cercle Waves.

- Interactif des accordéons : ouverture de la hauteur en 320 ms (`--ease-flow`) ; l'icône « + » est une ligne ondulée qui s'aplatit en trait puis en « − » (320 ms). Une seule réponse ouverte à la fois par groupe (au clavier : Entrée, flèches haut/bas). Au toucher : appui sur toute la ligne (44 px de hauteur minimum).
- Transition : le pied de page, avec le lien « Une autre question ? → Contact ».

### 3.9 CONTACT

**Section 0 — Ouverture et formulaire**
- Label : CONTACT
- Titre : Nous *écrire*.
- Texte : Une question sur une taille, une précommande, un envoi : écrivez-nous. Nous vous répondons [À COMPLÉTER : délai de réponse].
- Formulaire : nom, e-mail, sujet (liste : Taille · Précommande · Livraison · Cercle Waves · Autre), message, consentement non pré-coché [À VALIDER VICTOIRE]. Bouton : Envoyer.
- Confirmation : Merci. Votre message est parti, nous revenons vers vous.
- Erreur : Cette adresse semble incomplète. Pouvez-vous la vérifier ?
- 3D : **R**, plan plein fond (60 vh) en beige, sur lequel des ondes concentriques partent des positions récentes du pointeur (jusqu'à 6 ondes). Déplacement analytique : A·exp(−1,2·âge)·sin(k·(r − c·âge)), avec A=0,03, k=22, c=0,45. Teinte : filets Camel à 40 %, aplat Rose `#F3DEDC` dans les creux, éclairage satiné.
  - Souris : une onde se déclenche tous les 180 px parcourus (pas à chaque mouvement).
  - Toucher : une onde par appui, jamais pendant un défilement.
  - Envoi réussi : une grande onde unique part du bouton (1100 ms).
  - Réduit : aucune onde ; fond statique.

**Section 1 — Coordonnées**
- Label : 01 — COORDONNÉES
- Titre : Nous *joindre*.
- Texte : E-mail : [À COMPLÉTER : adresse]. Téléphone : [À COMPLÉTER : numéro, obligatoire dans les mentions légales]. Instagram : @kymasinsta.
- Interactif : le texte s'écrit en fondu, les liens suivent les tokens de la section 5.
- Transition : pied de page.

---

## 4. Page Cercle Waves en détail : les deux cartes pivotantes

### 4.1 Point d'alerte (prix non validés)
La boutique contient déjà une page Cercle Waves avec des prix (INITIUM 12,99 €, ORIGINE 29,99 €). Ces prix n'ont pas été validés : **je ne les reprends nulle part**, ni dans le texte, ni dans les `alt`, ni dans les métadonnées.
- Je ne peux pas consulter la boutique depuis cet environnement (pas d'accès Shopify) : je m'appuie sur ce qu'a indiqué le fondateur, non vérifié.
- Actions demandées : Sacha garde l'ancienne page hors ligne (brouillon) et ne l'utilise pas comme base. Le fondateur décide si Cercle Waves est gratuit ou payant.
- Conséquences si c'est payant : programme à titre onéreux, donc conditions spécifiques, CGV adaptées, droit de rétractation et facturation à traiter par Victoire. Cela contredit aussi l'hypothèse « Cercle Waves sans règles » de `conformite.md` et la formulation « inscription gratuite, ou lié à un premier achat [À VALIDER] » de `copy-site.md` §6.
- La page `cercle-waves-conditions` reste non publiée.

### 4.2 Structure des cartes
- Format portrait 5:7 (320 × 448 px sur bureau, 78 vw plafonné sur mobile), angles arrondis à 3,5 % du côté, épaisseur 0,8 % de la largeur, tranche biseautée.
- Disposition : deux cartes côte à côte sur bureau (écart 48 px), l'une sous l'autre sur mobile (écart 32 px). Ordre toujours INITIUM puis ORIGINE.
- Rendu : WebGL (corps, tranche, reflet satiné, rotation). Les faces sont dessinées au chargement dans un canvas 2D à 1024 × 1434 px (texte net, anisotropie 4×, mipmaps), puis passées en textures.
- Texte réel : le contenu des deux faces existe dans le DOM (`<button>` + liste, masqués visuellement sauf quand ils sont lus par un lecteur d'écran). Le texte sélectionnable ne dépend jamais de la texture.
- Repli : sans WebGL, même carte en CSS 3D (`transform-style: preserve-3d`, `backface-visibility: hidden`), mêmes durées.

### 4.3 Faces

**INITIUM, recto** (fond rose clair `#E8C4C4`, texte Brun)
- Numéro : 01
- Nom : INITIUM (DM Serif Display, capitales, interlettrage 6 px)
- Accroche : L'entrée dans le cercle.
- Sous-ligne : Pour toute personne qui rejoint KYMA.
- Petit motif : un anneau seul, filet Camel de 1 px, sur un marbrage KYMA Wave tonal à 6 % de contraste.
- Invite en bas : « Retourner » avec une flèche tracée.

**INITIUM, verso** (aplat rose très clair `#F3DEDC`, texte Brun)
- Label : AVANTAGES
- Liste : [À COMPLÉTER : avantage 1, décision du fondateur] · [À COMPLÉTER : avantage 2] · [À COMPLÉTER : avantage 3]
- Condition d'accès : [À COMPLÉTER : décision du fondateur]
- Bouton : Rejoindre le cercle (ancre vers l'inscription)

**ORIGINE, recto** (fond marron clair `#C19E86`, texte Brun 600, 20 px minimum)
- Numéro : 02
- Nom : ORIGINE
- Accroche : Le palier supérieur.
- Sous-ligne : Pour celles et ceux qui portent KYMA depuis ses origines.
- Petit motif : deux anneaux entrelacés, filet Brun à 40 %.
- Invite en bas : « Retourner ».

**ORIGINE, verso** (aplat camel clair `#D9C0AE` [À VALIDER], texte Brun)
- Label : AVANTAGES
- Liste : [À COMPLÉTER : avantage 1, décision du fondateur] · [À COMPLÉTER : avantage 2]
- Condition de passage : [À COMPLÉTER : critère décidé par le fondateur]
- Bouton : Rejoindre le cercle

**Couleurs, à valider par le fondateur.** Rose clair pour INITIUM, marron clair pour ORIGINE. Les paliers se distinguent aussi par la forme (un anneau / deux anneaux) et le numéro, pas seulement par la couleur. Contraste du Brun : 6,7:1 sur le rose, 4,3:1 sur le camel `#C19E86` (acceptable uniquement pour du texte de 20 px ou 18,66 px en gras) et 6,2:1 sur le camel clair du verso. Mes calculs, à recontrôler par Sacha avec un outil.

### 4.4 Déclencheurs
| Contexte | Action | Effet |
|---|---|---|
| Souris (pointeur fin) | Entrée dans la carte, après 120 ms d'intention | Pivote de 0 à 180° autour de l'axe vertical |
| Souris | Sortie de la carte, après 400 ms | Revient à 0° |
| Souris | Clic | Épingle la face courante (reste retournée même sans survol) ; second clic = relâche |
| Toucher | Appui | Bascule recto/verso |
| Toucher | Glisser horizontal sur la carte | La carte suit le doigt ; au relâchement elle s'accroche à la face la plus proche (0 ou 180°), en tenant compte de la vitesse. Le défilement vertical reste libre (`touch-action: pan-y`). |
| Clavier | Tab | Focus sur la carte (anneau de focus double, Brun 2 px + Rose 4 px) |
| Clavier | Entrée ou Espace | Bascule recto/verso |
| Clavier | Échap | Revient au recto |
| Lecteur d'écran | `button` avec `aria-pressed` | Annonce « INITIUM, carte du palier d'entrée. Activer pour afficher les avantages. » ; le contenu du verso est lu après activation |
- La zone sensible est un rectangle fixe invisible de la taille de la carte, indépendant de la rotation : la carte ne clignote pas en tournant sous le pointeur.
- Pas de gyroscope par défaut (permission iOS requise).

### 4.5 Mouvement
- Pivot : 900 ms, ressort (raideur 120, amortissement 18, masse 1) : dépassement de 2° puis retour. Pendant le pivot, la carte monte de 12 % de sa largeur sur z et passe à l'échelle 1,03 au milieu de l'arc, puis revient.
- Inclinaison à la souris : rotation en X ±8° et en Y ±8° selon la position du pointeur dans la carte, lissage exponentiel (taux 6/s). Atténuée à 25 % pendant un pivot. Pas d'inclinaison au toucher.
- Ombre : ellipse de contact Brun à 14 %, qui s'élargit de 15 % quand la carte monte.
- Montée au défilement : les cartes entrent avec 24 px de translation et un fondu de 640 ms, INITIUM puis ORIGINE (décalage 120 ms).
- Mode mouvement réduit : le pivot est remplacé par un fondu croisé de 200 ms ; pas d'inclinaison ; pas de balayage de reflet.

### 4.6 Reflet satiné
- Calcul : reflet anisotrope, bande étroite : spec = pow(max(dot(H,N),0), 24) modulé par un brossage horizontal fin. Intensité max 0,18, couleur blanc chaud `#FFF4E8`.
- La position de la lumière suit le pointeur, converti dans le repère de la carte. Sans pointeur : un balayage lent de gauche à droite toutes les 7 s (durée 2200 ms, easing `--ease-tide`).
- Le reflet est réduit de moitié sur les zones de texte (masque alpha dans la texture) pour ne pas gêner la lecture. Pas de reflet derrière la liste d'avantages.
- Pas de dégradé sur les logos : le reflet est de l'éclairage, il ne s'applique pas à un logo.
- Grain : 10 % sur les aplats de carte, sous le texte (voir section 6).

---

## 5. Système de micro-interactions : tokens de mouvement

### 5.1 Tokens (à placer en variables CSS et en constantes JS)
```css
:root {
  /* Durées */
  --t-instant: 90ms;   /* appui, retour immédiat */
  --t-fast: 180ms;     /* survol, focus, fondu d'étiquette */
  --t-base: 320ms;     /* ouvertures, boutons, cartes */
  --t-slow: 640ms;     /* entrées de section, changements de palette */
  --t-flow: 1100ms;    /* révélation de titre, tracé de dessin */
  --t-ambient: 9000ms; /* cycles de fond (9 à 14 s) */

  /* Easing */
  --ease-flow: cubic-bezier(0.22, 1, 0.36, 1);   /* défaut : entrée douce */
  --ease-tide: cubic-bezier(0.65, 0, 0.35, 1);   /* va-et-vient (pivot, caméra) */
  --ease-ebb:  cubic-bezier(0.55, 0, 0.8, 0.2);  /* sortie */

  /* Amplitudes */
  --lift-hover: 4px;          /* relevé des cartes */
  --reveal-y: 24px;           /* translation d'une entrée */
  --reveal-y-title: 40px;     /* translation d'un titre */
  --scale-hover: 1.02;        /* agrandissement maximal */
  --tilt-card: 4deg;          /* inclinaison d'une carte standard */
  --tilt-circle: 8deg;        /* cartes Cercle Waves */
  --stagger: 60ms;            /* décalage entre éléments */
  --stagger-letter: 28ms;     /* décalage entre lettres */
}
```
Valeurs JS : ressort 3D = raideur 120, amortissement 18, masse 1 ; lissage du pointeur = 1 − exp(−dt·taux) avec taux 5/s (objets) et 6/s (cartes), ce qui rend le résultat indépendant du nombre d'images par seconde ; parallaxe de défilement : couches entre 0,04 et 0,18 de la vitesse du scroll.
Règle : on n'anime que `transform` et `opacity` (hors tracés SVG). Aucune propriété qui force la mise en page.

### 5.2 Entrées au défilement
Déclenchement à 15 % de visibilité, une seule fois (un élément qui est apparu ne se cache plus). Opacité 0 à 1 et translation de 24 px à 0 en `--t-slow` / `--ease-flow`. Titres : voir objet T. Décalage `--stagger` entre éléments d'un groupe. Au maximum 12 éléments animés simultanément.

### 5.3 Boutons
| État | Primaire (fond Brun, texte Beige) | Secondaire (contour Camel 1 px, texte Brun) |
|---|---|---|
| Repos | Fond `#4A3B32`, texte `#F5EDE4`, capitales Outfit 500, interlettrage 2,5 px, hauteur 52 px | Transparent, bord `#C19E86` |
| Survol | Une vague Rose `#E8C4C4` monte du bas (clip-path ondulé, `--t-base`, `--ease-flow`) ; le texte passe au Brun ; bord Brun 1 px | Bord Brun, fond Rose `#F3DEDC` en `--t-base` |
| Focus clavier | Anneau double : contour Brun 2 px, décalage 3 px, anneau Rose 4 px extérieur | Idem |
| Actif (appui) | Échelle 0,98 en `--t-instant`, la vague est pleine | Échelle 0,98 |
| Chargement | Le libellé reste ; un filet Camel de 1 px court en bas du bouton, boucle de 1200 ms ; bouton inactif (`aria-busy`) | Idem |
| Succès | Le libellé devient « Ajouté au panier » (fondu `--t-base`), un coche se trace en 320 ms | Idem |
| Désactivé | Opacité 45 %, pas de survol ; « Choisir une taille » reste cliquable et affiche le message plutôt que de se bloquer | Idem |
Tactile : pas de survol collant. L'état de survol n'existe pas ; l'état actif dure 90 ms. Zone d'appui minimale 44 × 44 px.

### 5.4 Liens
Repos : soulignement Camel 1 px, décalé de 4 px. Survol et focus : le trait se redessine en ligne ondulée (SVG, amplitude 2 px, longueur d'onde 16 px), tracée de gauche à droite en `--t-base`. Actif : le trait passe au Brun. Lien visité : aucun changement de couleur. Lien de navigation actif : ligne ondulée fixe. Les liens externes portent une petite flèche tracée.

### 5.5 Cartes (collection, tuiles, cartes Cercle Waves)
- Survol : relevé de `--lift-hover`, ombre `0 18px 40px -20px rgba(74,59,50,.28)`, halo Rose à 35 %, inclinaison de `--tilt-card` (cartes Cercle Waves : `--tilt-circle`). Durée `--t-base`.
- Focus : même anneau double que les boutons, sans inclinaison.
- Appui : échelle 0,985 en `--t-instant`.
- Tactile : pas d'inclinaison ni de relevé ; l'appui active la carte directement.

### 5.6 Curseur
Uniquement avec un pointeur fin. Le curseur système reste toujours visible. Un halo de 12 px, bord Camel 1 px, suit avec un lissage de 0,18. Sur un élément interactif : le halo passe à 44 px, fond Rose à 40 %, avec une étiquette de 12 px : « Voir » (liens), « Faire pivoter » (cartes), « Glisser » (hoodie 3D), « Écrire » (champs). Transition `--t-fast`. Il disparaît en mode mouvement réduit s'il suit avec retard (devient un halo instantané). Jamais au toucher.

### 5.7 Mode mouvement réduit (`prefers-reduced-motion: reduce`)
- Translations et échelles remplacées par un fondu de 200 ms ; tracés SVG affichés dans leur état final ; pas de vent, de respiration, de balayage de reflet ni de rotation automatique.
- Les canvas 3D sont rendus en image fixe ; la manipulation directe (glisser pour tourner, utilisateur actif) reste possible, sans inertie ni ressort.
- Grain statique. Curseur : halo sans retard. Bandeau d'annonce : message 1 fixe. Aucun contenu n'est bloqué par l'absence d'animation.

### 5.8 Pause et accessibilité
- Bouton « Mettre le mouvement en pause » dans le pied de page : arrête les boucles ambiantes (fond, respiration, vent, rotation automatique, balayage) ; l'état est mémorisé.
- Aucune boucle ambiante visible de plus d'un objet à la fois, pas de clignotement.
- Tout contenu apparaissant au survol est aussi accessible au focus et au toucher ; aucune information n'existe uniquement dans un canvas (les canvas portent `aria-hidden` ou `role="img"` et une description, et les contrôles sont de vrais boutons).
- Transitions de page : API View Transitions (navigation entre documents), fondu de 240 ms du contenu principal ; en-tête persistant. Sans support : aucune transition.
- Cibles : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 (seuils Core Web Vitals cités par Isabelle).

---

## 6. Grain et texture

| Zone | Intensité | Détails |
|---|---|---|
| Fond principal Beige | 8 % (plage 6–10 %) | Bruit fin en tuile 200 px répétée, appliqué en `background-image` des sections |
| Aplats Rose et Camel (cartes, bandeau) | 10 % | Un peu plus perceptible : la matière se sent |
| Objets 3D (V, E, A, R) | ±2,5 % de luminance | Ajouté dans le shader final, bruit haché, mis à jour à 12 i/s |
| Cartes Cercle Waves | 10 % sur les faces | Sous le texte ; relief de fibre fin en normale, force 0,1 |
| Hero (motif animé) | 8 % | Fixe, ne bouge pas avec le motif |

**Aucun grain** sur : le texte et les titres, le logo, le hoodie 3D **H** et les représentations de coloris (la fidélité des couleurs prime), le tableau des tailles, les formulaires, le panier et le paiement, les pages légales, les captures de produit.
Technique : génération procédurale (bruit SVG `feTurbulence`, fréquence 0,8, 2 octaves, graine fixe, monochrome) rastérisée une fois en tuile, jamais appliquée comme filtre sur un grand élément (coût de peinture) ; pas de `mix-blend-mode` plein écran sur mobile. Le grain n'est jamais une image d'IA. En mode mouvement réduit ou en pause, le grain du shader est figé.

---

## 7. Mémoire de ce qui marche
Rien de testé en ligne à ce stade ; pas de note ajoutée à `out/memo-maya.md`.

## 8. Points ouverts et questions

**Sacha (faisabilité, à valider avant de coder)**
1. Un seul contexte WebGL par page et un moteur partagé sous 150 Ko : réaliste avec la liste d'objets V, E, A, H, R ?
2. Cartes Cercle Waves : texte en texture + double DOM masqué, ou bien CSS 3D comme solution principale ? Je préfère le WebGL pour le reflet, mais le CSS reste le repli.
3. Chargement du GLB du hoodie dans un moteur natif (analyse minimale du format GLB) ou usage du composant `model-viewer` de Shopify comme solution de secours.
4. Glyphes grecs de DM Serif Display (voir 3.1).
5. Section épinglée (160 à 240 vh) en Liquid : prévoir `position: sticky`, pas de bibliothèque.
6. Masque SVG qui se transforme (rectangle vers silhouette) : demander à Izaac des tracés à structure identique.

**Izaac**
7. Fournir : le GLB du hoodie (≤ 4 Mo, sans texture issue d'images IA), les tracés vectoriels du hoodie à plat (face, dos, détails), les teintes exactes des cinq coloris et les doublures de Noir Absolu et Crimson Flow.
8. Tutoiement/vouvoiement : mes textes validés (`copy-site.md`) vouvoient ; `pages-editoriales.md` et `fiches-produit.md` tutoient. Les textes ci-dessus sont en vouvoiement. À aligner par Arthur.

**Victoire**
9. Mention de rendu : « chaque pièce ayant un motif unique » (conformité (a)) contredit son tableau d'unicité ; j'ai mis le repli. Confirmer.
10. Cercle Waves : payant ou gratuit ? Règlement, RGPD, consentement des formulaires (Cercle Waves, contact, newsletter).
11. Pas d'incrustation Instagram (traceurs) : confirmer.
12. Le label « PRÉCOMMANDE » et « Expédition au plus tard le » ne s'affichent qu'avec un contrat fabricant signé (blocage n°3).

**Fondateur**
13. Couleur du mot en italique (Camel profond `#8A6A52` ou Brun) et teintes des cartes Cercle Waves.
14. Date d'expédition, ouverture et clôture de précommande, livraison, e-mail et téléphone de contact, grammage, composition de la doublure, règles de Cercle Waves.
15. Nom « Ressac » : disponibilité (INPI) avant usage.

**Arthur**
16. Ce document est un cadre pour la validation. Les textes sont définitifs sous réserve des balises ; rien n'est publié.
