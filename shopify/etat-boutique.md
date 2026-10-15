# État de la boutique Shopify — kymas-store.myshopify.com

> Mis à jour le 15/10/2026 (R1 étendue, réserves P1 à P3 de Victoire, GLB à supprimer avant publication ; avant : sweat v3 du 14/10, lecteur 3D unique et textes v4 du 10/10, retours du fondateur du 09/10). Copie de thème KYMA installée le 08/10/2026, non publiée. Plan : essai (passage à un plan payant nécessaire avant toute vente).
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
- **Avant toute publication : les 10 GLB `ressac-v2-*` et `ressac-<coloris>.glb` sont supprimés de la copie (action manuelle du fondateur) ; Sacha relit ensuite la liste des assets et confirme qu'il n'en reste aucun.** (La suppression par l'API est bloquée par le connecteur : marche à suivre dans « Sweat v3 branché — 14/10/2026 » plus bas.)

### À traiter avant l'ouverture des précommandes (réserves P1 à P3 de Victoire — `conformite.md`, « Provenance des visuels 3D, 14/10/2026 »)
- **P1 — Titularité des fichiers 3D (🟠, fondateur)** : constituer un dossier de création daté (brief, tech pack v3, charte, échanges où le fondateur fixe les choix, corrections de la v2 à la v3) et **signer l'attestation** type de Victoire ; après le Kbis, cession écrite fondateur → SASU.
- **P2 — Fichiers v1 et v2 encore téléchargeables (🟠, Sacha)** : ne téléverser que la v3 ; supprimer v1 et v2 de la copie (action manuelle du fondateur, voir ci-dessus) et de Shopify. Le nom de matériau « Zip métal argent brossé » de la v2 est ambigu.
- **P3 — Mention R1 (🟠, Izaac, Sacha, fondateur)** : R1 complétée et appliquée le 15/10/2026 (voir plus bas). **Reste ouvert** jusqu'à la confirmation écrite du fabricant sur les bords-côtes et la tirette : la mention est un **palier, pas une solution définitive**. Ensuite, soit le modèle est aligné, soit « peuvent aussi différer » devient la liste des écarts confirmés. À retirer ou adapter dès que des photos de préséries remplacent les rendus.

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
> *Remplacé le 10/10/2026 : voir « Lecteur 3D unique + textes v4 » ci-dessous (plus de bouton « Rejoindre », liste d'attente fermée).*
Paliers **INITIUM** et **MAJESTÉ** (ORIGINE supprimé partout dans le thème et les maquettes), prix affichés en réglages texte : 12,99 € / 39,99 € **par trimestre, TTC**. Bouton « Rejoindre » inactif tant que le lien d'abonnement est `[À COMPLÉTER]` : **aucun achat branché**. Avantages en `[À COMPLÉTER]`, mentions à valider par Victoire.

### Retours du fondateur — 09/10/2026, après-midi (Sacha)
Copie `189991944572` seulement, 13 fichiers relus (MD5 identiques) ; rien de publié, aucun produit, menu ni page modifiés.
- **Accueil** : section « Savoir-faire » retirée de `index.json` (la page Nous connaître garde sa propre section « Savoir-faire » `kyma-steps` : non touchée). « La pièce » = `kyma-product-story-scroll` : récit épinglé de 700 vh piloté au défilement (apparition, capuche dehors/dedans, dos, tirette, zip qui s'ouvre, intérieur gauche/droite avec fiches Composition et Fabrication balisées `[À CONFIRMER]`, dézoom, « Alors, qu'en dites-vous ? » / « Êtes-vous prêt à suivre le mouvement ? »), sur les GLB v2 d'Izaac (clip `ZipOpen`). Mouvement réduit / pause / sans WebGL : texte complet + modèle immobile.
- **Cercle Waves** *(verso et précisions remplacés le 10/10/2026 par les textes v4)* : recto des cartes = visuel du fondateur (réglage image ou URL), verso = avantages de sa page publiée, + « Versé en crédit KYMA sur vos prochains achats. ». **Visuels non trouvés** dans la boutique : à choisir dans l'éditeur (voir `installation-horizon.md` § 1 ter).
- **À arbitrer (fondateur)** : la page publiée `cercle-waves` porte encore ORIGINE 29,99 €, « crédits » (pas « cashback »), des cartes « bleu nuit et argent » / « noire effet miroir » et le tutoiement ; « Priorité stock garantie » et « Statut élite » (déconseillés par Victoire) n'y figurent pas.

### Lecteur 3D unique + textes v4 Cercle Waves / récit 3D — 10/10/2026 (Sacha)
Copie `189991944572` uniquement (rôle relu : UNPUBLISHED). **19 fichiers installés, 19 MD5 relus identiques au dépôt.** Thème en ligne non touché ; aucune page, aucun produit, aucun menu modifié ; rien publié.
- **Un seul lecteur 3D** : `assets/kyma-viewer.js` (nouveau, three.js r180 + GLTFLoader déjà présents dans `kyma-three.js`) pour « 01 Coloris » (accueil), « Le hoodie en 3D » (collection) et la visionneuse de la fiche produit ; « La pièce » (`kyma-pstory.js`) garde son moteur mais partage le même three.js (téléchargé une fois par page). GLB lus : `ressac-v2-<coloris>.glb` (déjà en assets, MD5 relus le 09/10). `kyma-glb.js` et les GLB v1 restent dans la copie mais **ne sont plus chargés**.
- **Passer au v3** : dans l'éditeur, réglage « Modèles 3D — préfixe des fichiers GLB » = `ressac-v3` dans chacune des 3 sections (`kyma-colorways`, `kyma-product-360`, `kyma-product-story-scroll`), après avoir téléversé les 5 `ressac-v3-<coloris>.glb` en assets.
- **Légendes R1 / R3 partout** (cycle 1 d'Arthur) : R1 sur toutes les visionneuses 3D (accueil, récit, collection, fiche produit, défauts de schéma) ; R3 « Rendu 3D du coloris… », « Illustration du motif… », « Illustration de la matière, en 3D… » sur collection, fiche produit, Nous connaître et défauts de schéma. FAQ : composition renvoyée à la fiche produit, réponse Cercle Waves réécrite. Verso des cartes vérifié à 360 et 390 px (5 lignes entières, police 10,5 px).
- **Textes v4 (Maya, validés par Arthur)** : page Cercle Waves (ouverture, paliers, cartes INITIUM 4 lignes / MAJESTÉ 5 lignes, précisions sous la carte, passage, liste d'attente), accueil (Cercle, légendes R1/R3), récit 3D (étapes 1, 4, 5, 6, 7, `still_alt`, légende R1 **permanente** dans la zone épinglée, aussi en rendu statique et sans JS). Aucune composition ni « Portugal » affichés. « plaqué or » / « argent brossé » remplacés aussi dans `product.kyma.json`, `page.nous-connaitre.json`, `page.faq.json`, `kyma-technical`. Défaut « sillage » de `kyma-instagram` → « courant » (aucun template de la copie ne contient « sillage » : 14 templates/groupes Horizon relus + les nôtres).
- **Porte P7 — liste d'attente FERMÉE (variante v4 § 1.6, état par défaut)** : hero sans invitation (« Il n'est pas encore ouvert et aucune date n'est fixée : rien n'est à faire pour l'instant. Nous annoncerons l'ouverture sur Instagram, @kymasinsta. »), bouton « Suivre @kymasinsta » → `https://www.instagram.com/kymasinsta/` (nouvel onglet ; URL à confirmer par le fondateur), note « Ni inscription, ni paiement à ce stade. Le cercle se prépare. », **cartes sans bouton**, « passage » au futur, section « rejoindre » : « Le cercle se prépare. » + texte de Maya + bouton « Suivre @kymasinsta », **sans formulaire** (réglage « Afficher la liste d'attente » désactivé). Plus aucun « Rejoindre », « Être prévenu », « Entrer dans le cercle » ni `#rejoindre` affiché (thème de la copie, menus et groupes d'en-tête/pied de page relus ; collection et FAQ corrigées). Phase 2 prête derrière le réglage : case 1 OBLIGATOIRE (ouverture), case 2 FACULTATIVE (newsletter), jamais pré-cochées, étiquettes client séparées `consentement-ouverture-v1-<date>` (case 1) et, pour la case 2, étiquettes provisoires `newsletter-a-confirmer` / `demande-newsletter-v1-<date>` (`consentement-newsletter-*` seulement après double opt-in, règle C bis de Victoire), texte et version dans la note client, message `consent_error`. Textes de Victoire intégrés : case 1 avec l'engagement de suppression de l'adresse, case 2 avec responsable du traitement + lien confidentialité ; ligne sous les cartes « Carte sans valeur monétaire… au plus tard [21] jours… Vos avantages ne dépendent pas de la carte. ». Valeurs de bascule : `installation-horizon.md` § 1 quater, « Bascule P7 ».
- ⚠️ **Formulaire Shopify « customer »** : Shopify marque toujours le client « abonné e-mail marketing » (doc Shopify « Email consent »), même sans la case 2. Avant d'activer la phase 2 : n'envoyer la newsletter qu'au segment étiqueté `consentement-newsletter-*` (ou passer par une appli de formulaire à double opt-in). Victoire tranche.
- 🔴 **Shopify Payments — réserve sur précommandes (Abdou)** : les précommandes seraient livrées ~18 semaines après paiement ; Shopify peut retenir une réserve sur les fonds. **Demander à Shopify, par écrit, sa politique de réserve AVANT d'ouvrir les précommandes.**
- **Crédit Waves (Abdou)** : ne PAS le créer comme « crédit en magasin » ni carte cadeau (traité comme moyen de paiement : TVA mal calculée) ; prévoir une **remise** sur la commande suivante. Faisabilité : `installation-horizon.md` § 1 quater.
- **Reste hors thème (contenus Shopify, non modifiables sans accord)** : la description du produit DRAFT contient encore « métal argent brossé » / « laiton plaqué or brossé », la composition `[À CONFIRMER]` et « Visuel de présentation (rendu) » ; pages non publiées `savoir-faire` et `faq-v2` : « plaqué or » ; pages **publiées** `a-propos` (« Confection au Portugal »), `faq` (« Au Portugal »), `cercle-waves` (ORIGINE, « Teasers exclusifs », « programme de fidélité »). À corriger par le fondateur ou sur son accord.

### Cycle 1 d'Arthur + variante P7 fermée + textes de Victoire — 10/10/2026 (Sacha), relu le 14/10/2026
Copie `189991944572` : 15 fichiers réinstallés le 10/10 (sections `kyma-page-hero`, `kyma-cercle-join`, `kyma-cercle-waves`, `kyma-product-360`, `kyma-colorways`, `kyma-colorway-cards`, `kyma-recolor`, `kyma-product-story`, `kyma-manifesto` ; `assets/kyma-pages.css` ; templates `page.cercle-waves`, `collection.kyma`, `product.kyma`, `page.nous-connaitre`, `page.faq`). MD5 relus le 14/10/2026 : identiques au dépôt. Rien publié ; menus, pages et produits non modifiés.
- **GLB v3 : NON installés** (décision d'Arthur : Izaac retire « plaqué or » / « argent brossé » des noms de matériaux des GLB). Préfixe des 3 sections 3D = `ressac-v2`. Test local de la v3 actuelle fait le 10/10 (captures `preview/captures/v3-*.png` : chargement, coloris, récit, zip qui s'ouvre, mobile, mouvement réduit, 0 erreur) ; à refaire sur les GLB reconstruits avant de passer le préfixe à `ressac-v3`.

### Sweat v3 branché — 14/10/2026 (Sacha, après « VALIDÉ » d'Arthur)
Copie `189991944572` uniquement, rien publié.
- **Téléversés** : `assets/ressac-v3-<coloris>.glb` × 5 (versions reconstruites par Izaac le 14/10 ; noms de matériaux sans « plaqué or » ni « argent brossé » vérifiés dans les 5 fichiers ; KHR_materials_sheen, clip `ZipOpen`). MD5 relus après envoi.
- **Préfixe `ressac-v3`** dans les 3 sections 3D (accueil « 01 Coloris » + « La pièce », collection « Le hoodie en 3D », fiche produit « La pièce en 3D ») : templates `index`, `collection.kyma`, `product.kyma` du dépôt et de la copie ; valeur par défaut du schéma des 3 sections passée aussi à `ressac-v3`.
- **À supprimer de la copie — À FAIRE À LA MAIN (fondateur)** : les 5 `ressac-v2-*.glb` et les 5 `ressac-<coloris>.glb` v1 (noms de matériaux « argent brossé »). La suppression par l'API (`themeFilesDelete`) est **refusée par la politique de sécurité du connecteur Shopify** ; je ne l'ai pas contournée. Les 10 fichiers ne sont plus référencés par aucun template ni section (grep du dépôt et des templates Horizon de la copie) : ils ne sont plus chargés, mais restent téléchargeables par leur URL. Marche à suivre : Boutique en ligne › Thèmes › « KYMA — Horizon (préparation) » › ⋯ › Modifier le code › Assets › pour chacun des 10 fichiers : ouvrir › « Supprimer le fichier ». Ils restent dans le dépôt (`shopify/3d/`) pour revenir en arrière.
- **Revenir en arrière** : re-téléverser `ressac-v2-<coloris>.glb` depuis `shopify/3d/` puis mettre le réglage « Modèles 3D — préfixe » à `ressac-v2` dans les 3 sections.
- R1 en vrai texte, visible aux 9 moments du récit (test automatique), `still_alt` au modèle R10 (« Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape … . Pas une photo du produit fabriqué. »).
- Tests : `preview/captures/v3-final-*.png` (accueil coloris, produit face/dos/Crimson, collection Noir Absolu, récit en 9 étapes dont zip ouvert, mobile, mouvement réduit), 0 erreur console, three.js chargé une seule fois.

### R1 étendue (texte validé par Arthur) — 15/10/2026 (Sacha)
Copie `189991944572` uniquement (rôle relu avant et après : UNPUBLISHED). Thème en ligne `187511734652` non touché ; aucune page, aucun produit, aucun menu modifié ; rien publié ; aucune suppression d'asset tentée.
- **Nouveau texte R1** : « Modèle 3D de présentation, pas une photo du produit fabriqué. Le motif de chaque pièce est pensé pour être unique : la vôtre différera de ce modèle. Certains détails (bords-côtes, inscription de la tirette, coutures, tombé du tissu) peuvent aussi différer. Les couleurs dépendent de votre écran. » (~290 caractères).
- **Appliqué** : défauts de schéma `caption` (`kyma-product-360`, `kyma-product-story-scroll`) et `caption_hoodie` (`kyma-colorways`), passés de `text` à `textarea` ; valeurs en dur de `index.json` (`drop.caption_hoodie`, `piece.caption`), `product.kyma.json` (`hoodie-3d.caption`), `collection.kyma.json` (`hoodie.caption`) ; maquettes `preview/index.html` (2), `collection.html` (2, dont `data-model`), `produit.html` (2, dont le bloc « Pensé pour être unique » du texte de la fiche), `produit-story.html` (1). `caption_fallback` et légendes R3 intacts.
- **Installé (themeFilesUpsert, 6 fichiers)** : `sections/kyma-product-360.liquid`, `sections/kyma-colorways.liquid`, `sections/kyma-product-story-scroll.liquid`, `templates/index.json`, `templates/product.kyma.json`, `templates/collection.kyma.json`. Contrôle : taille en octets de chaque fichier de la copie = taille avant + insertion attendue (112 octets par occurrence, +4 octets pour `text` → `textarea`), voir le compte rendu pour les MD5 relus.
- **`installation-horizon.md` mis à jour** : GLB v1 retirés du tableau (v3 seulement), méthode B en `assets/ressac-v3-*.glb`, défaut `ressac-v3`, R1 du § 6, case « avant toute publication » en § 7.
- 🔴 **Hors thème, à traiter avec accord** : la description du produit DRAFT (`gid://shopify/Product/16151822205308`) porte encore une ancienne mention (« Visuel de présentation (rendu) ») ; elle n'a pas été modifiée (hors périmètre de cette passe). Même chose pour `contenu/fiches-produit.md` (formule d'Izaac, plus ancienne que R1).
- ⚠️ **Non fait dans cette passe (aucun navigateur ni shell disponible)** : test automatique des 9 moments du récit, vérification de la légende épinglée à 360 et 390 px, captures `r1-etendue-*.png`, grep automatisé. À refaire par une session avec navigateur sans tête avant toute publication. Estimation par lecture de `kyma-pstory.css` (non vérifiée à l'écran) : la légende épinglée n'a ni `overflow` ni `line-clamp`, elle s'étend donc en hauteur (environ 6 lignes à 11 px en 360 px, sous les pastilles) ; la carte d'étape est ancrée en bas (`bottom: 18px`) : le chevauchement reste à contrôler sur les petits écrans (360 × 640).

### Tests R1 étendue — 15/10/2026 (orchestrateur, Sacha n'ayant pas de navigateur)
- MD5 des 6 fichiers installés sur la copie (`kyma-product-360`, `kyma-colorways`, `kyma-product-story-scroll`, `index.json`, `product.kyma.json`, `collection.kyma.json`) identiques au dépôt.
- Grep : plus aucune ancienne R1 dans le thème, les templates et les maquettes (nouvelle R1 : 10 occurrences).
- Récit en 9 étapes à 360×640, 360×800, 390×844 et 1366×900 : légende entièrement visible à chaque étape, aucun chevauchement avec les cartes d'étape (hauteur 92 px en mobile), 0 erreur console. Captures `preview/captures/r1-etendue-*.png`.
