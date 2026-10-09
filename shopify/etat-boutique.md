# État de la boutique Shopify — kymas-store.myshopify.com

> Mis à jour le 09/10/2026 (retours du fondateur : hoodie 3D, cartes Cercle Waves, attribution des templates). Copie de thème KYMA installée le 08/10/2026, non publiée. Plan : essai (passage à un plan payant nécessaire avant toute vente).
> Tout ce qui est listé ici a été créé **en brouillon / non publié**, après « VALIDÉ » d'Arthur (cycle 2).

## Créé par l'équipe
| Ressource | ID | Handle | Statut |
|---|---|---|---|
| Produit « Ressac — Hoodie zippé oversize » (5 coloris × 6 tailles = 30 variantes, 179 €, SEO) | `gid://shopify/Product/16151822205308` | `ressac-hoodie-zippe-oversize` | DRAFT, stock 0, vente en rupture refusée — **aucune image** (rendus IA supprimés le 08/10/2026 à la demande du fondateur ; photos du shooting à venir) |
| Métachamp produit `custom.date_expedition` (date, « Expédition au plus tard le ») | `gid://shopify/MetafieldDefinition/336902488444` | — | aucune valeur |
| Collection « Drop 1 » (manuelle) | `gid://shopify/Collection/702730174844` | `drop-1` | sur aucun canal |
| Collection « Tous les produits » (auto, prix > 0) | `gid://shopify/Collection/702730207612` | `tous-les-produits` | sur aucun canal — règle à resserrer |
| Page « Notre histoire » | `gid://shopify/Page/700768649596` | `notre-histoire` | non publiée |
| Page « Savoir-faire » | `gid://shopify/Page/700768682364` | `savoir-faire` | non publiée |
| Page « Guide des tailles » | `gid://shopify/Page/700768715132` | `guide-des-tailles` | non publiée |
| Page « FAQ produit » | `gid://shopify/Page/700768747900` | `faq-v2` | non publiée |
| Page « Cercle Waves » | `gid://shopify/Page/700768780668` | `cercle-waves-v2` | non publiée |

SKU : `KYMA-HZ-001-<LILAC|IVORY|SILVER|NOIR|CRIMSON>-<XS…XXL>`.

## Déjà présent dans la boutique avant cette mission (non modifié)
- Pages **publiées** `faq` (« FAQ — Précommandes & livraison ») et `cercle-waves` (ancienne page du fondateur : paliers « Standard 12,99 €/an » et « Majesté 39,99 €/an », images de cartes de membre ; non modifiée).
- ~10 produits **ACTIFS** de test ou d'une version précédente (« Exemple de produit », « Hoodie Mint Surge », « Hoodie Lilac Whirl », produits « Cercle Waves » de l'ancienne version…).
- → À arbitrer par le fondateur : archiver ces produits et remplacer ces pages par les nouvelles versions au lancement (Victoire : un abonnement payant Cercle Waves nécessite son propre règlement et des CGV adaptées).

## Thème KYMA installé dans une copie NON PUBLIÉE (08/10/2026, après « VALIDÉ » d'Arthur)
| Ressource | ID | Statut |
|---|---|---|
| Thème « KYMA — Horizon (préparation) » (copie de Horizon MAIN `187511734652`) | `gid://shopify/OnlineStoreTheme/189991944572` | **UNPUBLISHED** : rien n'est publié |

- **Installé (54 fichiers, MD5 vérifiés)** : `assets/` (kyma.css, kyma-pages.css, kyma-3d.js, kyma-motion.js, kyma-pages.js, kyma-glb.js, 6 polices woff2 auto-hébergées, 5 GLB `ressac-<coloris>.glb`), 20 sections `kyma-*` (sans `kyma-marquee`), 9 snippets `kyma-*`, 8 templates (`index`, `collection.kyma`, `product.kyma`, `page.nous-connaitre`, `page.cercle-waves`, `page.guide-des-tailles`, `page.faq`, `page.contact`).
- `layout/theme.liquid` de la copie : une ligne ajoutée, `{% render 'kyma-assets' %}`, avant `</head>`.
- `index.json` et `page.contact.json` de la **copie** remplacent ceux de Horizon. Le thème en ligne n'est pas touché.
- **Non fait, volontairement** : aucune attribution de template aux pages ni au produit (elle s'appliquerait au thème en ligne) ; aucune publication. Voir `installation-horizon.md` § 4.
- Prévisualisation : `https://kymas-store.myshopify.com/?preview_theme_id=189991944572` (admin connecté). Non vérifiable depuis l'environnement de Sacha : le domaine de la boutique y est bloqué par la politique réseau.

## Pas encore fait (volontairement)
- Publication du thème KYMA et attribution des templates (voir `installation-horizon.md` § 4), après réglages Horizon (§ 3) et levée du blocage n° 3 (contrat fabricant).
- Menus, politiques légales (attendent les données de la société), nom de la boutique, domaine, applis (avis, cookies, rétractation en ligne).
- Aucune publication, aucun produit ACTIVE.

## Retours du fondateur — 09/10/2026 (Sacha)

### Templates attribués (lecture préalable : le thème en ligne n'a aucun de ces templates)
Lecture du thème MAIN Horizon `187511734652` le 09/10/2026 : ses templates sont `404, article, blog, cart, collection, gift_card.liquid, index, list-collections, page, page.contact, password, product, search`. **Aucun** `page.cercle-waves`, `page.nous-connaitre`, `page.faq`, `page.guide-des-tailles`, `product.kyma` ni `collection.kyma` : sur le site en ligne, ces ressources continuent d'utiliser `page.json`, `product.json` et `collection.json` (aucun effet visible). Dans la copie, elles affichent nos pages.

| Ressource | ID | templateSuffix | Statut (inchangé) |
|---|---|---|---|
| Page `cercle-waves` (ancienne page publiée, lien du menu) | `gid://shopify/Page/700646982012` | `cercle-waves` | publiée |
| Page `cercle-waves-v2` | `gid://shopify/Page/700768780668` | `cercle-waves` | non publiée |
| Page `notre-histoire` | `gid://shopify/Page/700768649596` | `nous-connaitre` | non publiée |
| Page `faq-v2` | `gid://shopify/Page/700768747900` | `faq` | non publiée |
| Page `guide-des-tailles` | `gid://shopify/Page/700768715132` | `guide-des-tailles` | non publiée |
| Produit `ressac-hoodie-zippe-oversize` | `gid://shopify/Product/16151822205308` | `kyma` | DRAFT |
| Collection `drop-1` | `gid://shopify/Collection/702730174844` | `kyma` | sur aucun canal |

Aucune page publiée, aucun produit passé en ACTIVE, menu de navigation non modifié. La page Contact avait déjà `templateSuffix: contact` (template présent dans les deux thèmes) : non touchée.
⚠️ **À ne pas oublier** : si quelqu'un ajoute un jour un template du même nom dans le thème en ligne, l'attribution s'y appliquera aussitôt.

**Revenir en arrière** (à faire aussi avant de supprimer la copie) : remettre `templateSuffix` à vide pour chacune des 7 ressources :
```graphql
mutation { p: pageUpdate(id: "gid://shopify/Page/700646982012", page: { templateSuffix: "" }) { page { templateSuffix } userErrors { message } } }
# idem pour les pages 700768780668, 700768649596, 700768747900, 700768715132 ;
# productUpdate(product: { id: "gid://shopify/Product/16151822205308", templateSuffix: "" }) ;
# collectionUpdate(input: { id: "gid://shopify/Collection/702730174844", templateSuffix: "" })
```
Dans l'admin : ouvrir la page / le produit / la collection › « Modèle de thème » › « Modèle par défaut ».

### Nom de la boutique
Lu dans l'Admin API le 09/10/2026 : `shop.name` = **« KYMA »** (déjà le bon nom ; l'API n'a de toute façon aucune mutation pour le renommer). Si « Ma boutique » s'affiche encore : vider le cache / vérifier Paramètres › Détails de la boutique et Paramètres › Marque.
Logo : la copie n'avait **aucune couleur lilas** dans `config/settings_data.json` (palette Horizon par défaut : fond `#ffffff`, texte `#000000`, aucun logo image). Le logo lilas vu par le fondateur est donc une **image** (Paramètres › Marque › Logo, ou logo choisi dans l'éditeur) : à remplacer par une version brune ou camel. Dans la copie seulement : palette passée à fond `#F5EDE4` / texte `#4A3B32` (seule modification de `settings_data.json`) et logo texte « KYMA » en DM Serif brun (`kyma.css`).

### Cercle Waves (décision du fondateur)
Paliers **INITIUM** et **MAJESTÉ** (ORIGINE supprimé partout dans le thème et les maquettes), prix affichés en réglages texte : 12,99 € / 39,99 € **par trimestre, TTC**. Bouton « Rejoindre » inactif tant que le lien d'abonnement est `[À COMPLÉTER]` : **aucun achat branché**. Avantages en `[À COMPLÉTER]`, mentions à valider par Victoire.

### Retours du fondateur — 09/10/2026, après-midi (Sacha)
Copie `189991944572` seulement, 13 fichiers relus (MD5 identiques) ; rien de publié, aucun produit, menu ni page modifiés.
- **Accueil** : section « Savoir-faire » retirée de `index.json` (la page Nous connaître garde sa propre section « Savoir-faire » `kyma-steps` : non touchée). « La pièce » = `kyma-product-story-scroll` : récit épinglé de 700 vh piloté au défilement (apparition, capuche dehors/dedans, dos, tirette, zip qui s'ouvre, intérieur gauche/droite avec fiches Composition et Fabrication balisées `[À CONFIRMER]`, dézoom, « Alors, qu'en dites-vous ? » / « Êtes-vous prêt à suivre le mouvement ? »), sur les GLB v2 d'Izaac (clip `ZipOpen`). Mouvement réduit / pause / sans WebGL : texte complet + modèle immobile.
- **Cercle Waves** : recto des cartes = visuel du fondateur (réglage image ou URL), verso = avantages de sa page publiée, + « Versé en crédit KYMA sur vos prochains achats. ». **Visuels non trouvés** dans la boutique : à choisir dans l'éditeur (voir `installation-horizon.md` § 1 ter).
- **À arbitrer (fondateur)** : la page publiée `cercle-waves` porte encore ORIGINE 29,99 €, « crédits » (pas « cashback »), des cartes « bleu nuit et argent » / « noire effet miroir » et le tutoiement ; « Priorité stock garantie » et « Statut élite » (déconseillés par Victoire) n'y figurent pas.
