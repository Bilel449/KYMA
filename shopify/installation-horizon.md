# KYMA : installer le site multi-pages dans le thème Horizon

> Auteur : Sacha, le 08/10/2026. Statut : « VALIDÉ » d'Arthur pour une copie non publiée. **INSTALLÉ le 08/10/2026 dans la copie non publiée « KYMA — Horizon (préparation) », `gid://shopify/OnlineStoreTheme/189991944572`.** Rien n'est publié.
> Le thème en ligne (Horizon MAIN `gid://shopify/OnlineStoreTheme/187511734652`) n'a pas été modifié. Aucune attribution de template n'a été changée (pages et produit), puisqu'elle s'appliquerait au thème en ligne : voir le § 4, à faire **au moment de la publication**.
> Prévisualisation : `https://kymas-store.myshopify.com/?preview_theme_id=189991944572`, à ouvrir depuis l'admin connecté. La boutique peut être protégée par mot de passe pendant l'essai.
> Maquettes : `shopify/preview/*.html`. Elles sont rendues depuis les vrais fichiers Liquid, avec les réglages des templates ci-dessous.

## 0. Principe

- On **duplique** Horizon (Boutique en ligne › Thèmes › Horizon › ⋯ › Dupliquer), puis on renomme la copie « KYMA — Horizon (préparation) ». Tout se fait dans cette copie : le thème en ligne n'est jamais touché.
- Tous nos fichiers sont préfixés `kyma-`, sauf les templates. Ils n'écrasent aucun fichier de Horizon, à **deux exceptions voulues** : `templates/index.json` (notre accueil) et `templates/page.contact.json` (notre page Contact). Ces deux fichiers remplacent ceux de la copie.
- Horizon garde son en-tête, son pied de page, son panier, sa recherche et sa section produit native (`product-information`). Nos sections s'ajoutent autour, et l'éditeur de thème les manipule comme les autres.

### Ce que j'ai lu dans Horizon (pour rester compatible)
- **Sections de Horizon** (40 + 2 groupes) : `_blocks`, `carousel`, `cart-drawer-section`, `collection-links`, `collection-list`, `custom-liquid`, `divider`, `featured-blog-posts`, `featured-product`, `featured-product-information`, `footer`, `footer-utilities`, `header`, `header-announcements`, `hero`, `layered-slideshow`, `logo`, `main-404`, `main-blog`, `main-blog-post`, `main-cart`, `main-collection`, `main-collection-list`, `main-page`, `marquee`, `media-with-content`, `password`, `password-footer`, `predictive-search`, `predictive-search-empty`, `product-hotspots`, `product-information`, `product-list`, `product-recommendations`, `quick-order-list`, `search-header`, `search-results`, `section`, `section-rendering-product-card`, `slideshow`, plus les groupes `header-group.json` et `footer-group.json`.
- **Templates de Horizon** : `index`, `product`, `collection`, `page`, `page.contact`, `list-collections`, `search`, `cart`, `blog`, `article`, `404`, `password`, `gift_card.liquid`.
- `templates/product.json` : section `product-information`, avec les blocs statiques `_product-media-gallery` et `_product-details`, et dans ces derniers les blocs `group`, `text`, `price`, `_divider`, `variant-picker`, `buy-buttons` (`quantity`, `add-to-cart`, `accelerated-checkout`). Notre `product.kyma.json` reprend **exactement** cette structure et ces types de blocs.
- `templates/page.json` : section `main-page` (blocs `text` et `page-content`). `templates/collection.json` : sections `section` et `main-collection`.
- `layout/theme.liquid` : `{{ content_for_header }}` se trouve à la fin du `<head>`, et le contenu dans `<main id="MainContent" data-page-transition-enabled="…">`. Notre rideau-vague s'efface de lui-même si les transitions de page de Horizon sont activées.

## 1. Fichiers installés dans la copie (54 fichiers + 1 ligne dans `layout/theme.liquid`)

Source : `shopify/theme/` pour le thème, `shopify/3d/` pour les modèles GLB.

| Dossier du thème | Fichiers | Remarque |
|---|---|---|
| `assets/` (6) | `kyma.css`, `kyma-pages.css`, `kyma-3d.js`, `kyma-motion.js`, `kyma-pages.js`, `kyma-glb.js` | JS : 36 Ko gzip au total (budget de Maya : 150 Ko) |
| `assets/` (6 polices) | `kyma-font-dm-serif-400.woff2`, `kyma-font-dm-serif-400-italic.woff2`, `kyma-font-outfit-300.woff2`, `kyma-font-outfit-400.woff2`, `kyma-font-outfit-500.woff2`, `kyma-font-outfit-600.woff2` | **Auto-hébergées** (`@fontsource` 5.3.0, sous-ensemble latin, licence OFL 1.1 : `shopify/licences/`). Le thème ne fait **plus aucun appel à Google Fonts**. Seules les maquettes l'utilisent encore. |
| `assets/` (5 GLB) | `ressac-lilac-whirl.glb`, `ressac-ivory-tide.glb`, `ressac-silver-drift.glb`, `ressac-noir-absolu.glb`, `ressac-crimson-flow.glb` | À copier depuis `shopify/3d/` **sans les renommer**, de 2,8 à 3,1 Mo chacun |
| `sections/` (20) | `kyma-cercle-join`, `kyma-cercle-waves`, `kyma-chapter`, `kyma-colorway-cards`, `kyma-colorways`, `kyma-contact`, `kyma-faq`, `kyma-hero-wave`, `kyma-instagram`, `kyma-manifesto`, `kyma-page-hero`, `kyma-product-360`, `kyma-product-story`, `kyma-recolor`, `kyma-size-guide`, `kyma-spline`, `kyma-steps`, `kyma-technical`, `kyma-timeline`, `kyma-unique-piece` (tous en `.liquid`) | **`kyma-marquee` n'est PAS téléversé** : Maya refuse les bandeaux défilants. Il reste dans le dépôt. `kyma-manifesto`, `kyma-unique-piece` et `kyma-spline` ne sont utilisés par aucun template. **`kyma-spline` n'est pas testé** : son URL de scène est vide, et il retombe sur la 3D maison. |
| `snippets/` (9) | `kyma-assets`, `kyma-fonts`, `kyma-colorway-key`, `kyma-hoodie-tech`, `kyma-kuma`, `kyma-section-head`, `kyma-size-figure`, `kyma-step-icon`, `kyma-wave-lines` (en `.liquid`) | `kyma-fonts` contient les `@font-face` (avec `asset_url`) et précharge les 2 polices du premier écran |
| `templates/` (8) | `index.json`, `collection.kyma.json`, `product.kyma.json`, `page.nous-connaitre.json`, `page.cercle-waves.json`, `page.guide-des-tailles.json`, `page.faq.json`, `page.contact.json` | `index.json` et `page.contact.json` **remplacent** ceux de la copie. Le `product.json` de Horizon reste intact. |

L'ancien `templates/product.json` du dépôt, écrit pour Dawn (section `main-product`, absente de Horizon), a été **supprimé** : il aurait cassé la fiche produit de Horizon.

### Méthode utilisée le 08/10/2026 (API Admin, par Sacha)
1. `themeDuplicate` du thème MAIN Horizon, qui crée la copie `189991944572` (UNPUBLISHED).
2. `stagedUploadsCreate` (ressource FILE, PUT), puis envoi de chaque fichier et `themeFilesUpsert` sur la **copie** avec des corps `URL`. Lots : assets, polices, GLB, sections et snippets, puis templates et layout.
3. Vérification : chaque fichier a été relu dans la copie et son MD5 comparé au dépôt. Les 54 fichiers sont identiques.
Incident corrigé : 4 sections (`kyma-instagram`, `kyma-product-360`, `kyma-size-guide`, `kyma-spline`) ont d'abord été refusées sans message, à cause de réglages au défaut vide (`"default": ""`) ou d'une URL externe en défaut d'un réglage `url`. Ces défauts ont été retirés dans le dépôt, puis les sections ont été renvoyées.

Pour une réinstallation manuelle :

### Méthode A : éditeur de code (sans outil)
Dans la copie : ⋯ › Modifier le code.
1. **Assets** › « Ajouter un nouvel asset » › Téléverser : les 6 fichiers, puis les 5 `.glb`.
2. **Sections** et **Snippets** › « Ajouter » : créer chaque fichier sous le **même nom**, puis coller le contenu.
3. **Templates** › « Ajouter un modèle » : *product*, nom `kyma`, puis coller le contenu (même démarche pour *collection* `kyma`, *page* `nous-connaitre`, `cercle-waves`, `guide-des-tailles` et `faq`). Pour `index.json` et `page.contact.json`, ouvrir le fichier existant et remplacer tout son contenu.

### Méthode B : Shopify CLI
```bash
# dans un dossier de travail : copier shopify/theme/* et shopify/3d/ressac-*.glb (dans assets/)
shopify theme push --theme "<ID de la copie>" --path ./theme-kyma --nodelete \
  --only "assets/kyma*" --only "assets/ressac-*.glb" --only "sections/kyma-*" --only "snippets/kyma-*" --only "templates/*.json" \
  --ignore "sections/kyma-marquee.liquid"
```
⚠️ Toujours passer `--nodelete`. Sans cette option, `push` **supprime** de la copie tous les fichiers de Horizon absents du dossier local.

**Si l'éditeur refuse l'extension `.glb`** (le média 3D est refusé sur le plan d'essai, mais les fichiers de thème passent en principe) : utiliser la méthode B, ou laisser faire le repli. Sans GLB, la fiche produit affiche l'aperçu 3D du coloris, sans erreur.

## 2. Une ligne à ajouter dans `layout/theme.liquid`

Dans la copie, ouvrir `layout/theme.liquid` et insérer **une ligne**, juste avant `{{ content_for_header }}` (dans le `<head>`) :

```liquid
    {% render 'kyma-assets' %}
    {{ content_for_header }}
```

**Fait dans la copie** : la ligne est placée juste avant `</head>`, après `{{ content_for_header }}`. Le fichier a été relu avant la modification (MD5 identique à Horizon) ; rien d'autre n'a été changé.
Cette ligne charge les polices auto-hébergées, `kyma.css`, `kyma-pages.css` et les trois scripts, une fois par page (en `defer`, sans bloquer l'affichage). Chaque section `kyma-*` rappelle aussi ce snippet : le site fonctionne même si la ligne manque, et `kyma-motion.js` supprime les doublons. `kyma-glb.js` n'est chargé que par la section 360°.

## 3. Réglages de Horizon (éditeur de thème › Paramètres du thème)

- **Couleurs** : fond `#F5EDE4`, texte `#4A3B32`, accent 1 `#C19E86`, accent 2 `#E8C4C4`, bouton principal `#4A3B32` avec texte `#F5EDE4`. Le lilas n'est plus une couleur d'interface.
- **Typographie** : sans objet. `kyma.css` redirige les variables `--font-*--family` de Horizon vers DM Serif Display et Outfit.
- **Transitions de page** (`page_transition_enabled`) : **désactivées**, pour laisser jouer notre rideau-vague. Si on les active, le rideau se retire de lui-même.
- **Logo** : texte « KYMA ». Le SVG de `brand/assets/kyma-logo.svg` contient encore un trait lilas : le repasser en `#C19E86` avant de l'utiliser.
- **Bandeau d'annonce** (`header-announcements`) : message 1 seul au lancement, « Drop 1 — précommande ouverte. Expédition au plus tard le [À COMPLÉTER : date]. ». Ne l'afficher que si la précommande est réellement ouverte (blocage n° 3 de Victoire).

## 4. Attribuer les templates (**au moment de la publication seulement**)

⚠️ Ne rien attribuer avant de publier la copie. Le choix de template d'une page ou d'un produit vaut pour **tous** les thèmes, y compris le thème en ligne, qui n'a pas ces templates. Dans la copie, on prévisualise chaque template avec l'éditeur de thème (menu des modèles, aperçu d'un produit ou d'une page).

| Ressource existante (brouillon) | Template à choisir | Action complémentaire |
|---|---|---|
| Produit `ressac-hoodie-zippe-oversize` (`gid://shopify/Product/16151822205308`) | `product.kyma` | Option « Coloris » : le lecteur 360° et la frise suivent la variante. Tag `precommande` facultatif (le bloc « Précommande » est réglé sur « toujours afficher »). Métachamp `custom.date_expedition` à renseigner. |
| Collection `drop-1` (`gid://shopify/Collection/702730174844`) | `collection.kyma` | Les liens « Voir ce coloris » pointent vers `?variant=` (taille M de chaque coloris, identifiants lus dans l'Admin). |
| Page `notre-histoire` (`gid://shopify/Page/700768649596`) | `page.nous-connaitre` | Changer l'identifiant en `nous-connaitre` et **cocher** « Créer une redirection URL ». |
| Page `savoir-faire` (`gid://shopify/Page/700768682364`) | sans objet (reste en brouillon) | Redirection 301 `/pages/savoir-faire` → `/pages/nous-connaitre#savoir-faire` (Navigation › Redirections d'URL). |
| Page `guide-des-tailles` (`gid://shopify/Page/700768715132`) | `page.guide-des-tailles` | Aucune |
| Page `faq-v2` (`gid://shopify/Page/700768747900`) | `page.faq` | Au lancement : dépublier l'ancienne page `faq`, puis renommer `faq-v2` en `faq`. Nos liens visent déjà `/pages/faq`. |
| Page `cercle-waves-v2` (`gid://shopify/Page/700768780668`) | `page.cercle-waves` | Au lancement : retirer l'ancienne page `cercle-waves`, qui affiche des prix non validés, puis renommer `cercle-waves-v2` en `cercle-waves`. **Aucun prix** sur la nouvelle page. |
| Page Contact (à créer, en brouillon) | `page.contact` | Identifiant `contact`. Formulaire Shopify natif. |

Avant le renommage des pages au lancement, les liens `/pages/faq` et `/pages/cercle-waves` mènent encore aux anciennes pages publiées. C'est sans conséquence tant que le thème n'est pas publié.

## 5. Menus (Boutique en ligne › Navigation)

**Menu principal** (`main-menu`, utilisé par l'en-tête Horizon) :
1. Collection → `/collections/drop-1`
2. Le produit → `/products/ressac-hoodie-zippe-oversize`
3. Cercle Waves → `/pages/cercle-waves`
4. Nous connaître → `/pages/nous-connaitre`
5. Aide → `/pages/faq`, avec trois sous-éléments : Guide des tailles (`/pages/guide-des-tailles`), FAQ (`/pages/faq`), Contact (`/pages/contact`)

**Pied de page** (`footer`) : Collection · Le produit · Cercle Waves · Nous connaître · Guide des tailles · FAQ · Contact.
**Légal** (`footer-legal`, second bloc de menu du pied de page) : Mentions légales · CGV · Livraison · Retours & remboursements · Confidentialité · Cookies · Gérer mes cookies (lien de l'appli de consentement) · Renoncer au contrat ici (fonction de rétractation en ligne, voir `conformite.md`).
**Signature du pied de page** : « KYMA Paris — L'art du flow. ». Le bouton « Mettre le mouvement en pause » s'ajoute dans un bloc « Liquid personnalisé » du pied de page :
```html
<button type="button" class="kyma-pause" data-kyma-pause aria-pressed="false" data-label-off="Mettre le mouvement en pause" data-label-on="Relancer le mouvement"><span data-kyma-pause-label>Mettre le mouvement en pause</span></button>
```

## 6. Le lecteur 360° de la fiche produit (ordre de repli)

1. **Média 3D natif** : si le produit a des médias 3D (plan payant), la section utilise le `<model-viewer>` de Shopify. Le texte alternatif de chaque média doit contenir le nom du coloris.
2. **Lecteur maison** `kyma-glb.js` : sinon, chaque bloc « Coloris » de la section pointe vers `ressac-<coloris>.glb`, dans les fichiers du thème. C'est le cas actuel, sur le plan d'essai.
3. **Aperçu 3D du coloris** (étoffe `kyma-3d.js`) : en dernier recours, si WebGL ou le fichier échouent. La légende devient alors « Illustration du coloris. ».

Le coloris suit la variante choisie, via l'événement `change` du `<variant-picker>` de Horizon (option « Coloris »), et aussi les pastilles de la section. Au plus **2 contextes WebGL** par page : le moteur `kyma-3d.js` (1 contexte partagé par toutes les scènes) et le lecteur GLB (1).
Mention sous le lecteur : « Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer. ».
**À vérifier à l'installation** : les GLB sont servis par `cdn.shopify.com` et chargés par `fetch`. Si la console signale un blocage CORS, téléverser les GLB dans Contenu › Fichiers et saisir leur URL dans le réglage « Fichier GLB » de chaque bloc.

## 7. Après l'installation : check-list

- [ ] Aperçu de la copie sur téléphone et sur ordinateur : accueil, collection, produit, Cercle Waves, Nous connaître, Guide des tailles, FAQ, Contact.
- [ ] Console du navigateur : aucune erreur. Lecteur 360° : il tourne au glisser, et le coloris suit la variante.
- [ ] Les cartes Cercle Waves pivotent au survol, au clic, au toucher et au clavier (Tab, Entrée, Échap), et n'affichent **aucun prix**.
- [ ] Toutes les balises `[À COMPLÉTER]` sont visibles et listées pour le fondateur : date d'expédition, dates de précommande, e-mail, téléphone, grammage, composition, avantages Cercle Waves.
- [ ] Victoire valide les mentions de consentement des formulaires (Cercle Waves, contact) et la mention des visuels.
- [x] RGPD : DM Serif Display et Outfit sont auto-hébergées (`kyma-fonts`) et le thème n'appelle plus Google Fonts. « κύμα » est en SVG ; dans le seul H1 textuel (visuellement masqué), le grec retombe sur Georgia, via la pile `--kyma-serif`.
- [ ] **Blocage n° 3 de Victoire** : le label « PRÉCOMMANDE » (hero de l'accueil, collection), le bandeau d'annonce de précommande, le bouton « Précommander » et toutes les dates (ouverture, clôture, « Expédition au plus tard le ») ne s'activent **qu'une fois le contrat fabricant signé**. Avant cela, retirer « — PRÉCOMMANDE » des labels dans l'éditeur, masquer le bandeau et laisser les dates en `[À COMPLÉTER]`.
- [ ] Formulaire Cercle Waves : la case de consentement envoie `contact[accepts_marketing]=true` et n'est jamais pré-cochée. Victoire valide le texte.
- [ ] `kyma-spline` : non testé. Ne l'ajouter qu'avec une URL de scène Spline validée.
- [ ] Publication : **jamais** sans le « VALIDÉ » d'Arthur et la confirmation du fondateur.
