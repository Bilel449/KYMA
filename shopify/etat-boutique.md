# État de la boutique Shopify — kymas-store.myshopify.com

> Mis à jour le 08/10/2026 (soir : copie de thème KYMA installée, non publiée). Plan : essai (passage à un plan payant nécessaire avant toute vente).
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
- Pages **publiées** `faq` (« FAQ — Précommandes & livraison ») et `cercle-waves` (annonce INITIUM 12,99 € / ORIGINE 29,99 €).
- ~10 produits **ACTIFS** de test ou d'une version précédente (« Exemple de produit », « Hoodie Mint Surge », « Hoodie Lilac Whirl », produits « Cercle Waves — INITIUM / ORIGINE »…).
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
