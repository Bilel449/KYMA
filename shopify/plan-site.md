# KYMA — Plan du site Shopify (étape 3 : structure + thème + motion)

Boutique connectée : `kymas-store.myshopify.com` — nom actuel « Ma boutique », EUR, fuseau CEST, France.
Plan : **trial** — *"Plan: trial — you'll need to upgrade before you can start selling and unlock full features"*.
Rien n'a été écrit dans la boutique à cette étape (lecture seule : `get-shop-info`).

Sources : `brand/BRAND.md` (tech pack v3, avril 2026, fait foi), charte graphique 2025, logo officiel.
Tout ce qui n'est pas confirmé reste en `[À COMPLÉTER : …]` (jamais d'allégation GOTS / bio / « Made in Portugal » / nom de fournisseur en dur).

---

## 1. Arborescence

| Page | URL (handle) | Template / type | Contenu et source | Statut |
|---|---|---|---|---|
| Accueil | `/` | `templates/index.json` (fourni) | Ordre de Maya (`contenu/copy-site.md` §3) : Hero « Une pièce. Aucune identique. » → 01 Le Drop 1 (coloris) → 02 Le motif → 03 La pièce → 04 Le savoir-faire → 05 Cercle Waves → 06 Instagram. Sections 03, 04 et 06 = `kyma-manifesto` ; 02 = `kyma-unique-piece` (zoom texture). Unicité : repli « Pensé pour que chaque pièce soit unique » | Thème prêt |
| Drop 1 (collection) | `/collections/drop-1` | collection (Dawn) + section « KYMA — Coloris » ajoutée en haut | Voir §3 | À créer |
| Tous les produits | `/collections/tous-les-produits` | collection (Dawn) | Collection automatique | À créer |
| Fiche produit | `/products/<handle>` | `templates/product.json` (fourni) | Dawn `main-product` + « KYMA — Histoire produit » + produits associés | Thème prêt |
| Notre histoire | `/pages/notre-histoire` | page (Dawn) ou template dérivé avec « KYMA — Manifeste » | Izaac / Maya | À écrire |
| Savoir-faire | `/pages/savoir-faire` | page (Dawn) | Izaac. Aucune mention de fabricant, certification ou pays tant que non confirmés | À écrire |
| Cercle Waves | `/pages/cercle-waves` | page + section « KYMA — Cercle Waves » | Maya (conditions, avantages INITIUM / ORIGINE) | À écrire |
| Guide des tailles | `/pages/guide-des-tailles` | page (Dawn) | Tableau cm de `BRAND.md` (déjà dans la fiche produit) + conseil de coupe oversize | À écrire |
| FAQ | `/pages/faq` | page (Dawn) | Maya + Victoire (livraison, retours, précommande) | À écrire |
| Contact | `/pages/contact` | template Dawn `page.contact` (formulaire) | Adresse e-mail publique à choisir (ne pas publier l'e-mail de compte sans accord) | À créer |
| CGV | `/policies/terms-of-service` | Paramètres > Politiques | **Victoire** | Attente |
| Mentions légales | `/policies/legal-notice` | Paramètres > Politiques | **Victoire** | Attente |
| Politique de retour | `/policies/refund-policy` | Paramètres > Politiques | **Victoire** | Attente |
| Confidentialité | `/policies/privacy-policy` | Paramètres > Politiques | **Victoire** | Attente |
| Livraison | `/policies/shipping-policy` | Paramètres > Politiques | **Victoire** | Attente |

Aucun texte juridique n'est rédigé ici. Les pages légales sont les politiques Shopify (Paramètres > Politiques), reliées dans le pied de page.

## 2. Menus

**Menu principal (header)** — handle `main-menu`, 5 entrées maximum, sobre :
1. Drop 1 → `/collections/drop-1`
2. Boutique → `/collections/tous-les-produits`
3. Notre histoire → `/pages/notre-histoire`
4. Savoir-faire → `/pages/savoir-faire`
5. Cercle Waves → `/pages/cercle-waves`

Le logo (KYMA en serif, interlettrage large) est le **nom de la boutique en texte** : Paramètres > Général > Nom de la boutique = « KYMA » (aujourd'hui « Ma boutique »). Option : téléverser `brand/assets/kyma-logo.svg` comme image de logo (le sélecteur d'image du thème ne prend pas toujours le SVG : en cas de refus, exporter en PNG/WebP).

**Pied de page** — handle `footer`, 3 colonnes + légal :
- *Boutique* : Drop 1 · Tous les produits · Guide des tailles
- *Maison* : Notre histoire · Savoir-faire · Cercle Waves
- *Aide* : FAQ · Contact
- *Légal* (ligne du bas, **sur toutes les pages**) : Mentions légales · CGV · Livraison · Retours et remboursements · Confidentialité · Cookies · « Gérer mes cookies » · « Renoncer au contrat ici » · Contact (détail et liens : §9.4)
- Instagram : `@kymasinsta` (profil `https://www.instagram.com/kymasinsta/` à confirmer par le fondateur)
- Bandeau d'annonce (Dawn) : « Drop 1 — précommande. Expédition au plus tard le [À COMPLÉTER : date] » (jamais « estimée »).
- Bloc e-mail (newsletter) : texte de Maya ; consentement explicite (voir §6).

## 3. Collections

| Collection | Type | Règle | Tri |
|---|---|---|---|
| **Drop 1** (`drop-1`) | Automatique | Tag **égal à** `drop-1` | Manuel |
| **Tous les produits** (`tous-les-produits`) | Automatique | Prix du produit **supérieur à** 0 | Plus récents |

Conséquence d'un produit unique (voir §4) : la page « Drop 1 » n'affichera qu'une seule carte. Remède prévu : dans le personnalisateur, sur le template Collection, ajouter la section **« KYMA — Coloris »** en haut de page (même bande que l'accueil, un lien par coloris).

## 4. Produit à créer : 1 hoodie, 5 coloris × 6 tailles = 30 variantes

### Recommandation : **un seul produit** avec options Couleur × Taille (plutôt que 5 produits)

Pourquoi :
1. **Avis et preuve sociale concentrés.** Sur des petites séries (quelques dizaines de pièces par coloris), 5 fiches auraient chacune 2 à 5 avis ; une fiche en cumule 10 à 25.
2. **SEO.** Cinq pages quasi identiques (même coupe, même matière, mêmes textes) se concurrencent et sont du contenu dupliqué. Une page forte, avec le coloris en variante, cumule les liens et les clics.
3. **Une seule précommande à piloter** : un seul tag `precommande`, une seule date d'expédition (métachamp), un seul guide des tailles, un seul prix à tenir (179 € TTC, scénario 199 € à arbitrer).
4. **Parcours client plus court** : changer de coloris sans quitter la page ; le panier regroupe le même modèle ; recommandations « produits associés » inutiles entre coloris.
5. **Flux publicitaires** (Google, Meta) : les variantes sont regroupées automatiquement dans un seul article.
6. Administration : 30 variantes tiennent largement dans les limites Shopify (3 options, plusieurs milliers de variantes).

Ce qu'on perd, et le remède :
- La grille collection n'a qu'une carte → section « KYMA — Coloris » (§3) et bande des coloris à l'accueil, avec liens vers la fiche pré-sélectionnée (`?variant=<id>`).
- Pas d'URL ni de titre propres à chaque coloris → chaque coloris reste nommé dans l'option, dans les photos (alt) et dans les textes Izaac.
- Ruptures par coloris : gérées au niveau de la variante (« Épuisé » sur la pastille).

**Quand choisir l'inverse (5 produits)** : si les coloris sortent à des dates différentes, si l'on veut une page et un référencement par nom de coloris (ex. « Lilac Whirl »), ou si les prix diffèrent. À arbitrer par Clémentine/Arthur avant l'étape 4.

### Fiche (gabarit KYMA) — à créer en **BROUILLON** à l'étape suivante

| Champ | Valeur |
|---|---|
| Titre | `[À COMPLÉTER : nom du produit — Izaac]` (ref. `KYMA-HZ-001` « Oversized zip hoodie ») |
| Handle | proposé `hoodie-zippe-oversize` |
| Fournisseur (Vendor) | KYMA |
| Type | Hoodie |
| Tags | `drop-1`, `hoodie`, `unisexe`, `precommande` (+ un tag par coloris : `lilac-whirl`, `ivory-tide`, `silver-drift`, `noir-absolu`, `crimson-flow`) |
| Options | **Couleur** (5 valeurs) · **Taille** (XS, S, M, L, XL, XXL) |
| Prix | 179,00 € TTC (`[À arbitrer : 199 €]`) — jamais modifié sans « VALIDÉ » Arthur + accord explicite |
| Poids | `[À COMPLÉTER : grammes par taille, d'après le tech pack/fabricant]` |
| Suivi du stock | Oui, par variante (voir §5, précommande) |
| Métachamp | `custom.date_expedition` (Date) = `[À COMPLÉTER : date communiquée par le fabricant]` |
| SEO title (≤ 60) | `<Nom produit> \| KYMA — L'art du flow` — ex. « Hoodie zippé oversize \| KYMA — L'art du flow » (45 car.) |
| Meta description (≤ 155) | ex. « Hoodie zippé oversize KYMA, streetwear unisexe. Drop 1 en cinq coloris, XS à XXL, pensé pour que chaque pièce soit unique. » (122 car. ; repli de Victoire, pas d'unicité affirmée) |
| Description | Izaac (accroche + 2–3 phrases) ; détails/entretien/tailles/précommande sont dans le thème (section « Histoire produit ») |
| Images | 1 packshot par coloris (fond clair, 4:5 portrait, ≥ 1600 px de large) **rattaché aux variantes du coloris** + lifestyle. Shopify sert déjà du WebP/AVIF via son CDN : inutile de convertir à la main |
| Alt | « Hoodie KYMA coloris `<Coloris>`, vue de face / de dos / détail du motif » |
| Statut | **DRAFT** |

⚠ Les visuels actuels (`brand/private/images/`) sont des **rendus / maquettes** : à remplacer par le shooting après validation des préséries.

### Variantes et SKU — règle `KYMA-HZ-001-<COLORIS>-<TAILLE>`

| Coloris (code) | XS | S | M | L | XL | XXL |
|---|---|---|---|---|---|---|
| Lilac Whirl (LW) | KYMA-HZ-001-LW-XS | …-LW-S | …-LW-M | …-LW-L | …-LW-XL | …-LW-XXL |
| Ivory Tide (IT) | KYMA-HZ-001-IT-XS | …-IT-S | …-IT-M | …-IT-L | …-IT-XL | …-IT-XXL |
| Silver Drift (SD) | KYMA-HZ-001-SD-XS | …-SD-S | …-SD-M | …-SD-L | …-SD-XL | …-SD-XXL |
| Noir Absolu (NA) | KYMA-HZ-001-NA-XS | …-NA-S | …-NA-M | …-NA-L | …-NA-XL | …-NA-XXL |
| Crimson Flow (CF) | KYMA-HZ-001-CF-XS | …-CF-S | …-CF-M | …-CF-L | …-CF-XL | …-CF-XXL |

5 × 6 = **30 variantes**, toutes au même prix. Le thème (Dawn) affiche Couleur et Taille en boutons.

### ⚠ Point d'arbitrage : 5 ou 6 coloris, quels noms ?
`BRAND.md` retient **le tech pack v3 : 5 coloris** (Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow) — ce sont ceux du thème et de la maquette, car ce sont ceux des visuels disponibles. La mémoire projet parle de 6 noms (Midnight Current, Amber Flow, Mint Surge en plus ; pas de Noir Absolu ni Crimson Flow). Les noms se changent en un clic dans les blocs « Coloris » ; le nombre de variantes passerait à 36 si 6 coloris. Décision du fondateur / Izaac.

## 5. Réglages Shopify (à faire à l'étape d'intégration, avec accord)

**Marchés** (Paramètres > Marchés) : marché principal **France** (EUR, français) ; ajouter un marché **Union européenne** (EUR, français) avec la liste de pays `[À COMPLÉTER : pays livrés]` et ses tarifs/délais `[À COMPLÉTER]`. `BRAND.md` ne prévoit que la livraison en France pour le Drop 1 : n'ouvrir l'UE que si la logistique est confirmée.

**Taxes** (Paramètres > Taxes et droits) : activer *« Inclure les taxes dans tous les prix »* → prix affichés **TTC** (179 € TTC). TVA France calculée par Shopify. Vente transfrontalière UE (TVA du pays de destination, guichet unique) : `[À valider avec l'expert-comptable]`.

**Expédition** (Paramètres > Expédition et livraison) : zones France / UE, tarifs `[À COMPLÉTER]`. Les délais affichés doivent venir du fabricant et de Victoire.

**Précommande** — trois options, du plus simple au plus outillé :

| Option | Principe | + | − |
|---|---|---|---|
| **A. Stock = places de précommande (recommandée au lancement)** | Suivi du stock activé ; quantité de chaque variante = nombre de pièces que l'on accepte de produire ; « continuer à vendre en rupture » **décoché** | Plafond automatique, pas de survente, aucune appli | Le bouton dit « Ajouter au panier » → renommer en « Précommander » dans Boutique en ligne > Thèmes > ⋯ > Modifier les langues (clé du bouton d'ajout au panier) |
| **B. « Continuer à vendre en rupture »** | Stock à 0, vente illimitée, Dawn peut afficher « Précommander » | Très simple | **Aucun plafond** : risque de vendre plus que la production prévue. À surveiller chaque jour |
| **C. Appli de précommande** | Plafond, date par variante, paiement différé, relances | Le plus complet | Coût mensuel, dépendance, RGPD à vérifier — à benchmarker par Isabelle |

Dans tous les cas : **tag `precommande`** sur le produit (affiche le bloc Précommande du thème) et **date limite d'expédition dans le métachamp** `custom.date_expedition` :
Paramètres > Données personnalisées > Produits > Ajouter une définition → nom « Date limite d'expédition », espace de noms et clé `custom.date_expedition`, type **Date**. Puis remplir la valeur sur la fiche produit. La fiche affiche « Expédition au plus tard le : <date> » ; si la date manque : « Expédition au plus tard le : `[À COMPLÉTER : date …]` » (garde-fou volontaire). Jamais « estimée », « environ » ni « ~18 semaines ». Les informations précontractuelles de précommande (paiement, délai, rétractation) sont rédigées par **Victoire** (voir §9).

**Autres** : mode « mot de passe » actif jusqu'au lancement ; langue de la boutique = français ; Politiques = textes Victoire ; passer du plan *trial* à un plan payant pour vendre.

## 6. Applications recommandées (aucune n'est installée — à comparer par Isabelle avant achat)

| Besoin | Piste | À vérifier |
|---|---|---|
| Avis | Judge.me, Loox, Okendo ou Stamped | Prix, import, RGPD, obligations d'information sur les avis (Victoire), impact sur les performances |
| Fidélité Cercle Waves | Smile.io, Yotpo Loyalty, LoyaltyLion ou équivalent à **paliers nommés** | Possibilité de nommer INITIUM / ORIGINE, règles de passage de palier (Maya), coût selon volume |
| Consentement cookies | Bannière native Shopify (Paramètres > Confidentialité et conformité), sinon appli dédiée | Doit bloquer analytics/pixels avant consentement ; textes : Victoire |
| Newsletter | Shopify Email (natif) ou Klaviyo | Consentement explicite à l'inscription |
| Précommande | Seulement si l'option C est retenue | Voir §5 |

Aucune appli lourde au lancement : le motion est natif (≈ 12 Ko de JS, non mesuré ici, sans bibliothèque).

## 7. Choix de design et d'accessibilité (écarts assumés par rapport à la charte)

- Tokens : charte 2025 (`#F5EDE4`, `#C8A2C8`, `#9B7A9B`, `#8A8A8A`, `#1C1C1C`, `#FAFAFA`, `#C19E86`) — et non les anciens `#F2F0E9` / `#1A1A1A`.
- **Contraste AA** : le gris `#8A8A8A` (2,98:1) et le lilas foncé `#9B7A9B` (3,2:1) échouent en petit texte sur beige. Le thème garde `#9B7A9B` pour les **grands titres** (≥ 24 px, seuil 3:1) et utilise deux dérivés pour le texte courant : `#5F5F5F` (5,5:1) et `#7A5C7A` (5,0:1). Le lilas `#C8A2C8` n'est jamais du texte sur beige (fonds, filets, survols, boutons sur fond sombre). À faire valider par le fondateur.
- Étiquettes en 11 px (charte : 10 px) pour la lisibilité.
- **Polices** : Google Fonts (DM Serif Display + Outfit) chargées par `kyma-assets.liquid`. Le chargement depuis les serveurs Google transmet l'adresse IP du visiteur : **avant l'ouverture au public, auto-héberger** les deux familles (fichiers WOFF2 téléversés dans Contenu > Fichiers, `@font-face` ajoutés en tête de `kyma.css`, puis retirer la ligne Google Fonts du snippet). À valider avec Victoire.
- Mouvement : tout est désactivé sous `prefers-reduced-motion` (motif du hero affiché en image fixe) ; animations en pause hors écran et onglet masqué ; aucun clignotement. Filets de sécurité : sans JavaScript les contenus restent visibles (4 s max).
- Focus clavier visible partout, boutons ≥ 48 px, `aria-label` sur les flèches, bande des coloris focusable, tableau des tailles défilable au clavier, `alt` pris dans les fichiers image.

## 8. Installer le thème (non-développeur) — 2 méthodes

Le dossier à installer est `shopify/theme/`. On **ajoute** des fichiers `kyma-*` à Dawn ; seuls `templates/index.json` et `templates/product.json` remplacent ceux de Dawn.

### Méthode B — Téléversement manuel (la plus simple, sans terminal)
1. Admin Shopify > **Boutique en ligne > Thèmes**. Section « Bibliothèque de thèmes » > **Ajouter un thème > Dawn** (gratuit). Il apparaît en brouillon, non publié.
2. Sur Dawn : **⋯ > Dupliquer** (sauvegarde), puis **⋯ > Modifier le code**.
3. Colonne de gauche, dans cet ordre (les snippets avant les sections) :
   - **Assets** > *Ajouter un nouvel asset* > « Créer un fichier vide » `kyma` / `.css` → coller `assets/kyma.css`. Idem `kyma-motion` / `.js` → coller `assets/kyma-motion.js`.
   - **Snippets** > *Ajouter un nouveau snippet* : `kyma-assets`, `kyma-wave-lines`, `kyma-section-head` → coller le contenu de chaque fichier de `theme/snippets/`.
   - **Sections** > *Ajouter une nouvelle section* : `kyma-hero-wave`, `kyma-colorways`, `kyma-manifesto`, `kyma-unique-piece`, `kyma-cercle-waves`, `kyma-product-story` → coller le contenu de chaque fichier de `theme/sections/`.
   - **Templates** : ouvrir `index.json`, tout sélectionner, remplacer par `theme/templates/index.json` ; idem `product.json`.
   - **Layout > `theme.liquid`** : juste avant `</head>`, ajouter une ligne : `{% render 'kyma-assets' %}` (recommandé : le style du header et des polices s'applique alors à toutes les pages, pas seulement à celles qui contiennent une section KYMA).
4. Enregistrer. Puis **Personnaliser** (voir ci-dessous) et **Aperçu** (menu ⋯ du thème) pour tester sur téléphone et ordinateur. **Ne pas publier** avant la check-list §10.

### Méthode A — Shopify CLI (pour qui a Node.js)
```bash
npm install -g @shopify/cli@latest          # une fois
git clone https://github.com/Shopify/dawn.git kyma-theme
cd kyma-theme
cp -R /chemin/vers/KYMA/shopify/theme/* .   # ajoute les fichiers kyma-*, remplace index.json et product.json
# éditer layout/theme.liquid : ajouter {% render 'kyma-assets' %} avant </head>
shopify theme check                         # contrôle Liquid + schémas
shopify theme dev  --store kymas-store.myshopify.com        # aperçu local, rechargement à chaud
shopify theme push --store kymas-store.myshopify.com --unpublished --theme "KYMA v1"
```
`--unpublished` crée un **nouveau thème non publié** : le thème en ligne n'est jamais touché. (Si une option diffère selon la version du CLI : `shopify theme push --help`.)

### Réglages dans le personnalisateur (Boutique en ligne > Thèmes > Personnaliser)
- **Paramètres du thème > Couleurs** (schémas) :
  - *Schéma 1* : fond `#F5EDE4`, texte `#1C1C1C`, bouton plein `#1C1C1C` / texte du bouton `#FAFAFA`, contour bouton `#1C1C1C`.
  - *Schéma 2* : fond `#FAFAFA`, texte `#1C1C1C` (cartes).
  - *Schéma 3* : fond `#1C1C1C`, texte `#FAFAFA`, bouton `#C8A2C8` / texte du bouton `#1C1C1C` (pied de page, bandeaux sombres).
  - Lilas en accent seulement (règle 80/20).
- **Mise en page** : largeur de page 1200 px. **Boutons / champs** : bordure 1 px, arrondi 0.
- **Typographie** : laisser Dawn ; `kyma.css` impose DM Serif Display + Outfit.
- **En-tête** : *En-tête fixe* = « Toujours » (le hero glisse sous l'en-tête translucide) ; schéma de couleurs 1 ; logo = texte « KYMA ». **Pied de page** : schéma 3.
- **Page d'accueil** : remplacer les textes par défaut (Maya/Izaac), téléverser les visuels dans « Coloris » (packshots), « Le motif » (détail du motif) et « La pièce » (lifestyle) — la légende « Visuel de présentation (rendu) » s'affiche sous chaque rendu et se vide quand une vraie photo la remplace —, renseigner les liens des coloris (`/products/<handle>?variant=<id>`).
- **Modifier les langues** : bouton d'ajout au panier → « Précommander » (option A du §5).

Dépannage : si une section ne s'affiche pas ou un schéma est refusé, lancer `shopify theme check`. Si le thème Dawn est antérieur à la v15, remplacer dans `product.json` `"related-products"` par `"product-recommendations"` et `"scheme-1"` par `"background-1"`.

## 9. Conformité (reprise de `shopify/conformite.md`, partie b — Victoire)

Les textes et libellés ci-dessous sont des **modèles de Victoire, à faire valider par un avocat** avant mise en ligne. Sacha les implémente et les teste ; rien n'est installé ni écrit dans la boutique à cette étape. Note d'alerte : le titre du hero « Une pièce. Aucune identique. » est une affirmation d'unicité sans condition (demandée telle quelle) ; la note de conformité (a) n'autorise aujourd'hui que le repli « Pensé pour que chaque pièce soit unique » — à arbitrer par Arthur/Victoire avant publication ; les autres textes d'accueil utilisent le repli.

### 9.1 « Renoncer au contrat ici » (obligatoire depuis le 19/06/2026)
Sans cette fonction, le délai de rétractation passe à 12 mois et 14 jours. Shopify ne la fournit pas en natif (selon Victoire) : **appli ou page avec formulaire**, au choix du fondateur.

| Option | Principe | À vérifier |
|---|---|---|
| **A. Appli « droit de rétractation / retours »** (à benchmarker par Isabelle sur l'App Store ; aucune installée) | Bouton + formulaire + e-mail d'accusé de réception fournis par l'appli | Libellé personnalisable, accusé avec contenu + date + heure, hébergement RGPD, coût |
| **B. Page `/pages/renoncer-au-contrat` avec formulaire** (template page + formulaire de contact Dawn adapté : nom, n° de commande, e-mail, bouton « Confirmer la rétractation ») | Sans appli ; le lien « Renoncer au contrat ici » du pied de page mène à cette page | Le formulaire natif envoie un e-mail à KYMA mais **pas forcément un accusé de réception automatique au client** : à compléter (appli de formulaires, ou automatisation d'e-mail) et à tester |

Exigences communes (libellé exact à vérifier dans l'art. D.221-5) : bouton gratuit, visible et accessible **pendant tout le délai** ; libellé « Renoncer au contrat ici » ; formulaire (nom, n° de commande, e-mail) puis bouton « **Confirmer la rétractation** » ; **accusé de réception** par e-mail avec le contenu de la demande, la date et l'heure.
**Emplacements** : pied de page de toutes les pages, e-mail de confirmation de commande, page de statut de commande.
**Test (à documenter avec captures)** : (1) commande test en passerelle de test ; (2) clic depuis le pied de page sur mobile et ordinateur ; (3) clic depuis l'e-mail de confirmation ; (4) soumission du formulaire ; (5) accusé reçu avec contenu, date et heure ; (6) demande reçue côté KYMA ; (7) navigation au clavier et lecteur d'écran ; (8) archivage des captures (bonne pratique n°28 de Victoire).

### 9.2 Panier et checkout
- Récapitulatif modifiable : produit, coloris, taille, quantité, prix TTC, frais de livraison, **total TTC**.
- **Trois cases, toutes non pré-cochées** :
  1. « J'ai lu et j'accepte les CGV » (obligatoire, lien vers les CGV) ;
  2. précommande + motif unique (obligatoire pour une précommande) : « J'ai compris que cet article est une précommande, expédiée au plus tard le `[À COMPLÉTER : date]`, et que le motif de ma pièce est unique et différera des visuels. » — formulation à valider par l'avocat ;
  3. newsletter : case **distincte**, facultative, jamais liée aux CGV.
- **Bouton final : « Commande avec obligation de paiement »** (ou formule équivalente sans ambiguïté). Le libellé par défaut de Shopify est à vérifier et à personnaliser (Boutique en ligne > Thèmes > Modifier les langues, rubrique panier/paiement ; sur les plans hors Shopify Plus le checkout ne se modifie pas par code : **[À VÉRIFIER dans l'admin]** ce qui est réellement modifiable).
- Les cases du panier se posent dans le template panier (thème) ; le bouton « Commande avec obligation de paiement » reste désactivé tant que les cases obligatoires ne sont pas cochées. Si le checkout ne permet pas ces cases (hors Plus), prévoir une appli ou la validation de Victoire sur une alternative.
- **Date limite d'expédition rappelée sur chaque ligne de précommande** du panier (« Expédition au plus tard le … », lue dans `custom.date_expedition`), reprise dans le checkout si possible, l'e-mail de confirmation et les notifications.
- Moyens de paiement acceptés et frais affichés avant validation.

### 9.3 Notifications Shopify (Paramètres > Notifications)
E-mail de confirmation de commande : tous les éléments du contrat ; **date limite d'expédition** ; lien et copie des CGV (support durable) ; **formulaire type de rétractation** ; emplacement de « Renoncer au contrat ici » avec son lien ; contact du service client. Les autres notifications (expédition, remboursement) sont relues par Victoire. Remplacer « Expédition estimée » par « Expédition au plus tard le » dans tous les modèles (y compris celui de Maya, `copy-site.md` §4).

### 9.4 Pied de page complet — toutes les pages
| Libellé | Cible |
|---|---|
| Mentions légales | `/policies/legal-notice` |
| CGV | `/policies/terms-of-service` |
| Livraison | `/policies/shipping-policy` |
| Retours et remboursements | `/policies/refund-policy` |
| Confidentialité | `/policies/privacy-policy` |
| Cookies | `/pages/cookies` |
| **Gérer mes cookies** | lien permanent qui rouvre le bandeau de consentement (fonction de la bannière native ou de l'appli retenue) |
| **Renoncer au contrat ici** | `/pages/renoncer-au-contrat` ou bouton de l'appli (§9.1) |
| Contact | `/pages/contact` |

Ne **pas** lier la plateforme européenne de règlement en ligne des litiges (fermée depuis le 20/07/2025). Le médiateur de la consommation figure dans les mentions légales et les CGV (Victoire).

### 9.5 Fiche produit (déjà prévu dans le thème ou à renseigner)
- Prix TTC avec « **Hors frais de livraison** » et lien « Livraison » : bloc `price_note` de `templates/product.json` (fait).
- Bloc Précommande : « **Expédition au plus tard le** : date » (fait), « Annulation possible à tout moment avant l'expédition et jusqu'à 14 jours après réception » avec liens **Retours et remboursements** et **CGV** (fait) ; « Précommande du `[date]` au `[date]` » et condition de seuil minimal éventuelle : `[À COMPLÉTER : fondateur]`.
- **Légende sous chaque rendu** : « Visuel de présentation (rendu) — chaque pièce ayant un motif unique, la vôtre sera différente. » (réglage « Légende » des sections Coloris, Le motif et manifeste ; bloc « Mention des visuels » de la fiche). Plus aucune mention « non contractuel ».
- Composition par élément (corps / bords-côtes 95 % coton, 5 % élasthanne / doublure), en français, avant l'achat : `[À COMPLÉTER : étiquette définitive]`. Pays de fabrication seulement s'il est prouvé. Entretien aligné sur l'étiquette.

### 9.6 Bandeau cookies
« Tout accepter » / « Tout refuser » au **même niveau et même format** / « Personnaliser » ; aucun pixel (Meta, TikTok, GA4) avant consentement ; fermer le bandeau vaut refus ; choix conservé 6 mois ; paramétrage dans Paramètres > Confidentialité des clients ; vérifier que chaque appli respecte l'API de consentement.

## 10. Check-list de mise en ligne

**Conformité (§9)**
- [ ] Fonction « Renoncer au contrat ici » installée, libellé vérifié, accusé de réception (contenu, date, heure) **testé** de bout en bout et documenté
- [ ] Panier : case CGV, case précommande + motif unique, case newsletter distincte — non pré-cochées ; bouton « Commande avec obligation de paiement »
- [ ] Date limite « au plus tard le » affichée sur chaque ligne de précommande (panier, e-mail) ; plus aucune date « estimée »
- [ ] Notifications Shopify : date limite, CGV, formulaire type de rétractation, lien « Renoncer au contrat ici », contact
- [ ] Pied de page complet sur toutes les pages : Mentions légales · CGV · Livraison · Retours et remboursements · Confidentialité · Cookies · « Gérer mes cookies » · « Renoncer au contrat ici » · Contact
- [ ] Fiche produit : « hors frais de livraison » + lien Livraison, bloc Précommande (annulation 14 jours + liens Retours/CGV), légende de rendu sous chaque visuel, composition par élément
- [ ] Bandeau cookies conforme (accepter / refuser au même niveau), aucun pixel avant consentement
- [ ] Textes juridiques validés par un avocat ; arbitrage Arthur/Victoire sur le titre du hero (unicité)

**Contenu**
- [ ] Produit créé en brouillon, 30 variantes, SKU, prix 179 € TTC, poids, stock/places de précommande
- [ ] Photos rattachées aux variantes ; alt rédigés ; **rendus remplacés par les photos du shooting**
- [ ] Textes produit (Izaac) · bandeaux/newsletter (Maya) intégrés ; plus aucun texte par défaut inutile
- [ ] Composition, lieu de fabrication, entretien, mannequin renseignés (aucune mention « GOTS / bio / Made in Portugal » sans preuve) ; plus aucun `[À COMPLÉTER …]` visible
- [ ] Métachamp `custom.date_expedition` rempli + tag `precommande`
- [ ] Pages Notre histoire, Savoir-faire, Cercle Waves, Guide des tailles, FAQ, Contact créées
- [ ] Politiques (CGV, mentions légales, retours, confidentialité, livraison) fournies par Victoire et reliées au pied de page
- [ ] Menus header/footer en place ; liens testés (aucun 404)

**Technique**
- [ ] Nom de boutique « KYMA » ; domaine (`kyma.boutique` ou `kyma-official.com`, **à vérifier et acheter**) ; redirection 301 depuis `myshopify.com`
- [ ] Thème : aperçu validé sur iPhone et Android, puis ordinateur ; Lighthouse mobile (perf, accessibilité ≥ 90)
- [ ] Mouvement réduit testé (réglage système) ; navigation clavier ; contrastes
- [ ] Polices auto-hébergées (§7) ; bannière cookies active ; analytics après consentement
- [ ] Titres SEO ≤ 60 car., meta ≤ 155 car. (accueil proposé : « KYMA | Streetwear unisexe — L'art du flow » ; « KYMA, streetwear unisexe parisien. Hoodie zippé oversize du Drop 1, pensé pour que chaque pièce soit unique, inspiré du mouvement des vagues. » — 141 car.)
- [ ] Image de partage (Open Graph) ; favicon (lilas sur beige)

**Boutique**
- [ ] Plan payant activé ; passerelle de paiement ; commande test de bout en bout (paiement, e-mails, TVA TTC)
- [ ] Marchés France/UE, taxes TTC, expédition vérifiés
- [ ] Avis, fidélité (INITIUM / ORIGINE), newsletter : applis choisies et testées
- [ ] **Livrable « VALIDÉ » d'Arthur + confirmation explicite du fondateur** avant publication du thème ou passage du produit en ACTIVE

## 11. Fichiers de cette livraison

```
shopify/
  plan-site.md
  preview/index.html            maquette autonome de l'accueil
  theme/
    assets/kyma.css · kyma-motion.js
    snippets/kyma-assets.liquid · kyma-wave-lines.liquid · kyma-section-head.liquid
    sections/kyma-hero-wave · kyma-colorways · kyma-manifesto · kyma-unique-piece
             kyma-cercle-waves · kyma-product-story  (.liquid)
    templates/index.json · product.json
```

## État de la boutique

- **Créé dans Shopify : rien** (consigne de l'étape). Lecture seule : infos boutique.
- **À faire à l'étape 4** (avec accord) : renommer la boutique, métachamp, collections `drop-1` et `tous-les-produits` (brouillon), produit unique en brouillon, menus, pages, installation du thème non publié.
- **En attente de validation** : tout (aucun « VALIDÉ » d'Arthur à ce stade).
- **Contrôles non réalisés ici** : aucun rendu dans un navigateur ni `shopify theme check` (pas de terminal dans cet environnement) ; relecture statique uniquement. À exécuter à l'intégration.
