# Cercle Waves et récit 3D — textes définitifs v4 (Maya, 09/10/2026 ; corrigé le 10/10/2026, cycle 1/2 d'Arthur)

> **Pour** : Sacha (intégration), Victoire (contrôle), Arthur (validation), fondateur (valeurs entre crochets).
> **Base** : formulations de Victoire, `shopify/conformite.md`, section « Entraide 09/10/2026 », parties B, C, E. Je n'ai changé aucun fait : j'ai travaillé le rythme, la concision et le ton. Vouvoiement partout, mot « cashback » conservé.
> **Règle de lecture** : `[valeur]` = valeur à faire valider par le fondateur, à laisser visible jusqu'à décision. Aucune publication tant qu'un crochet reste affiché sur le site (point E3 de Victoire).
> **Contexte** : l'abonnement n'est pas encore branché. La page fonctionne donc en **liste d'attente** (section `rejoindre`). Quand l'appli d'abonnement sera active, seuls les champs de la section 1.4 changent (voir « Bascule » en fin de section 1.4).

---

## 1. Page Cercle Waves — `shopify/theme/templates/page.cercle-waves.json`

### 1.1 Section `ouverture` (kyma-page-hero)

| Champ | Texte |
|---|---|
| `label` | CERCLE WAVES |
| `title_before` | Le Cercle |
| `title_em` | Waves |
| `title_after` | . |
| `text` | Le Cercle Waves est l'abonnement de KYMA : deux paliers payants, INITIUM et MAJESTÉ, avec cashback versé en crédit KYMA, accès anticipé aux drops et carte de membre. Vous choisissez votre palier ; vous pouvez en changer ou résilier en ligne, à tout moment. L'abonnement n'est pas encore ouvert : laissez votre adresse, nous vous écrirons. |
| `cta_label` | Être prévenu de l'ouverture |
| `cta_link` | /pages/cercle-waves#rejoindre |
| `note` | Aucun paiement n'est demandé à ce stade. |
| `alt_text` | Illustration animée : deux anneaux satinés, rose clair et marron clair, qui se rapprochent et s'entrelacent. *(inchangé)* |

Variante de titre, si le fondateur préfère un verbe : `title_before` « Suivre le » · `title_em` « courant » · `title_after` « . » (le titre de la section `paliers` reprend « courant » : dans ce cas, passer `paliers` à « Deux paliers, une même » / « marée »).

### 1.2 Section `paliers` (kyma-cercle-waves)

| Champ | Texte |
|---|---|
| `label` | LES DEUX PALIERS *(inchangé)* |
| `title_before` / `title_em` / `title_after` | Deux paliers, un même / courant / . *(inchangé)* |
| `text` | Deux paliers payants, au choix. Chaque carte se retourne pour montrer ses avantages. |
| `terms_text` | Abonnement trimestriel : INITIUM 12,99 € TTC, MAJESTÉ 39,99 € TTC, renouvelé automatiquement tous les 3 mois. Résiliable à tout moment en ligne, sans frais, en quelques clics. Rétractation possible sous 14 jours. Réservé aux majeurs. Conditions : |
| `terms_label` | conditions du Cercle Waves |
| `terms_link` | /pages/cercle-waves-conditions *(la page légale v3 doit être publiée avant ou en même temps)* |

Le texte de `terms_text` est celui de Victoire, mot pour mot. « En quelques clics » reste tel quel tant que le parcours de résiliation n'est pas chronométré (E12).

#### Bloc `tier_1` — INITIUM

| Champ | Texte |
|---|---|
| `name` | INITIUM *(inchangé)* |
| `lead` | L'entrée dans le cercle. *(inchangé)* |
| `invite` | Retourner la carte |
| `back_label` | AVANTAGES *(inchangé)* |
| `perks` — ligne 1 (39 car.) | Cashback 5 % sur vos achats de produits |
| `perks` — ligne 2 (38 car.) | Accès anticipé de [24 h] à chaque drop |
| `perks` — ligne 3 (70 car.) | Aperçu des nouvelles collections [3] jours avant l'ouverture au public |
| `perks` — ligne 4 (49 car.) | Carte de membre physique beige, écriture argentée |
| `cashback_note` | Cashback versé en crédit KYMA (Crédit Waves), pas en espèces : utilisable sur vos prochains achats pendant [12] mois. Hors livraison et cotisation. Voir les conditions. |
| `condition` | Les quantités sont limitées : l'accès anticipé ne garantit pas la disponibilité d'une taille ou d'un coloris. |
| `aria` | Carte INITIUM, palier d'entrée du Cercle Waves, 12,99 € par trimestre TTC, renouvelé automatiquement. Activer pour afficher les avantages au verso. |
| `price` / `price_period` | 12,99 € / par trimestre, TTC *(inchangés)* |
| `join_label` *(liste d'attente)* | Être prévenu |
| `join_link` *(liste d'attente)* | /pages/cercle-waves#rejoindre |

Valeur brute du champ `perks` à coller (séparateur = retour à la ligne) :

```
Cashback 5 % sur vos achats de produits
Accès anticipé de [24 h] à chaque drop
Aperçu des nouvelles collections [3] jours avant l'ouverture au public
Carte de membre physique beige, écriture argentée
```

#### Bloc `tier_2` — MAJESTÉ

| Champ | Texte |
|---|---|
| `name` | MAJESTÉ *(inchangé)* |
| `lead` | Le palier supérieur du Cercle Waves. |
| `invite` | Retourner la carte |
| `back_label` | AVANTAGES *(inchangé)* |
| `perks` — ligne 1 (39 car.) | Cashback 10 % sur vos achats de produits |
| `perks` — ligne 2 (62 car.) | Accès anticipé de [48 h] à chaque drop, précommandes comprises |
| `perks` — ligne 3 (70 car.) | Aperçu des nouvelles collections [7] jours avant l'ouverture au public |
| `perks` — ligne 4 (59 car.) | Produits réservés aux abonnés MAJESTÉ (au moins [1] par an) |
| `perks` — ligne 5 (51 car.) | Carte de membre physique gris clair, écriture dorée |
| `cashback_note` | Cashback versé en crédit KYMA (Crédit Waves), pas en espèces : utilisable sur vos prochains achats pendant [12] mois. Hors livraison et cotisation. Voir les conditions. |
| `condition` | Les quantités sont limitées : l'accès anticipé ne garantit pas la disponibilité d'une taille ou d'un coloris. |
| `aria` | Carte MAJESTÉ, palier supérieur du Cercle Waves, 39,99 € par trimestre TTC, renouvelé automatiquement. Activer pour afficher les avantages au verso. |
| `price` / `price_period` | 39,99 € / par trimestre, TTC *(inchangés)* |
| `join_label` *(liste d'attente)* | Être prévenu |
| `join_link` *(liste d'attente)* | /pages/cercle-waves#rejoindre |

```
Cashback 10 % sur vos achats de produits
Accès anticipé de [48 h] à chaque drop, précommandes comprises
Aperçu des nouvelles collections [7] jours avant l'ouverture au public
Produits réservés aux abonnés MAJESTÉ (au moins [1] par an)
Carte de membre physique gris clair, écriture dorée
```

Passés de 8 à 5 lignes, les avantages de MAJESTÉ tiennent mieux au verso. L'ordre est le même sur les deux cartes (cashback, accès, aperçu, carte), ce qui rend la comparaison immédiate.

**Longueur (≤ 45 caractères « si possible »)** : cinq lignes dépassent, parce que la précision juridique (« avant l'ouverture au public », « physique », « précommandes comprises ») est dans la phrase de Victoire. J'ai gardé son texte. Versions courtes **proposées, à faire valider par Victoire avant usage** :

| Ligne | Version courte | Car. |
|---|---|---|
| Aperçu (INITIUM et MAJESTÉ) | Aperçu des collections [3] j avant le public | 44 |
| Carte INITIUM | Carte de membre beige, écriture argentée | 40 |
| Carte MAJESTÉ | Carte de membre gris clair, écriture dorée | 42 |

Les deux dernières perdent « physique » : à ne retenir que si la mention « carte envoyée » figure dans les conditions du verso (voir ci-dessous). Sacha vérifie de toute façon que les lignes longues passent sur deux lignes sans déborder.

**Ajouts proposés au verso (à valider par Victoire ; facultatifs tant que la page est une liste d'attente ; obligatoires dès la bascule vers le paiement, point E1 et art. 7.6 des conditions)**. Victoire place ces précisions « au verso ou dans les conditions » ; le gabarit n'a qu'un champ `condition`. Si Sacha peut ajouter une seconde ligne de petits caractères, voici le texte :

| Où | Texte |
|---|---|
| Verso INITIUM et MAJESTÉ, 2e ligne de `condition` | Carte sans valeur monétaire, pas un moyen de paiement. Envoyée une fois, sous [14] jours, frais d'envoi inclus. |
| Verso INITIUM et MAJESTÉ, 3e ligne (point E1 : date de première application) | Premier accès anticipé : [date du premier drop concerné]. |
| Verso MAJESTÉ uniquement | Précommandez avant l'ouverture au public. La date d'expédition est affichée sur chaque produit. |

### 1.3 Section `passage` (kyma-chapter)

| Champ | Texte |
|---|---|
| `label` | DE L'UN À L'AUTRE *(inchangé)* |
| `title_before` | D'un palier à l'autre, sans |
| `title_em` | détour |
| `title_after` | . |
| `text` (version retenue) | Vous choisissez directement l'un ou l'autre palier. Passer à MAJESTÉ prend effet tout de suite : vous payez la différence, au prorata. Passer à INITIUM prend effet à la fin du trimestre en cours. |
| `text` (version neutre, si le fondateur ne veut pas détailler le prorata sur la page) | Vous choisissez directement l'un ou l'autre palier, et vous pouvez en changer ensuite. Les modalités (date d'effet, prorata) figurent dans les conditions du Cercle Waves. |
| `sym1` | INITIUM — L'entrée dans le cercle. *(inchangé)* |
| `sym2` | MAJESTÉ — Le palier supérieur. *(inchangé)* |
| autres champs | inchangés |

La version retenue reprend la règle de Victoire (art. 9) en trois phrases courtes au lieu d'une phrase à point-virgule. Le sens et les modalités sont identiques.

### 1.4 Section `rejoindre` (kyma-cercle-join) — liste d'attente

*Décision d'Arthur (cycle 1) : la case de consentement est obligatoire pour la seule finalité « vous prévenir de l'ouverture » ; la newsletter est une seconde case, distincte et facultative. Aucune des deux n'est pré-cochée.*

| Champ | Texte |
|---|---|
| `label` | ÊTRE PRÉVENU |
| `title_before` | Être prévenu de |
| `title_em` | l'ouverture |
| `title_after` | . |
| `text` | Prénom et adresse e-mail suffisent. Ce n'est pas un abonnement : aucun paiement n'est demandé. |
| `consent` (case 1, **obligatoire**, non pré-cochée) | J'accepte que KYMA utilise mon adresse e-mail pour m'informer de l'ouverture du Cercle Waves. Je peux me désinscrire à tout moment via le lien présent dans chaque message. Responsable du traitement : [À COMPLÉTER : raison sociale]. Voir la [politique de confidentialité]. |
| `consent_newsletter` (case 2, **facultative**, non pré-cochée) *(nouveau champ, à ajouter au gabarit par Sacha)* | Je souhaite aussi recevoir par e-mail les actualités de KYMA (ouvertures de drops, coulisses, offres). Je peux me désinscrire à tout moment via le lien présent dans chaque message. |
| `consent_error` *(nouveau champ, message si la case 1 n'est pas cochée)* | Pour vous prévenir de l'ouverture, nous avons besoin de votre accord. Pouvez-vous cocher la première case ? |
| `button` | Me prévenir |
| `success` | Merci. Nous vous écrirons à l'ouverture du Cercle Waves. Cette inscription n'est pas un abonnement. |
| `error` | Cette adresse semble incomplète. Pouvez-vous la vérifier ? *(inchangé)* |
| `terms` | Conditions du Cercle Waves : [lien vers /pages/cercle-waves-conditions]. |

Pour Sacha :
- Le formulaire ne s'envoie pas tant que la case 1 n'est pas cochée. La case 2 n'est jamais requise et ne conditionne rien (ni l'inscription, ni l'accès anticipé futur).
- Les deux consentements sont enregistrés séparément (case 1 = finalité « ouverture du Cercle Waves » ; case 2 = abonnement aux e-mails de KYMA), avec date et version du texte.
- `[politique de confidentialité]` doit devenir un lien vers `/pages/confidentialite` ; la raison sociale est à fournir par le fondateur. Aucune adresse n'est collectée ni aucun e-mail envoyé avant que la société soit immatriculée, la politique publiée et la boutique passée sur un forfait payant.

**Bascule quand l'abonnement est branché** (à ne faire qu'à ce moment-là) : ce bloc devient un lien vers le paiement. Valeurs prêtes : `title_before` « Choisir son » · `title_em` « palier » · `title_after` « . » · `text` « Deux paliers, un abonnement trimestriel renouvelé automatiquement, résiliable en ligne à tout moment. » · cartes `join_label` « Choisir ce palier » · `join_link` lien d'abonnement. Le message « Merci. Nous vous écrirons… » disparaît avec le formulaire.

### 1.5 Bonus, accueil (`index.json`, section `cercle`)

Hors demande, mais le titre « Rejoindre le cercle » et le bouton « Entrer dans le Cercle » posent le même problème que sur la page.

| Champ | Texte |
|---|---|
| `title_before` / `title_em` / `title_after` | Le Cercle / Waves / . |
| `text` | Le Cercle Waves accompagne celles et ceux qui suivent KYMA de près. Deux paliers, INITIUM et MAJESTÉ, par abonnement trimestriel. |
| `cta_label` | Découvrir les deux paliers |

---

## 2. Récit 3D — `shopify/theme/templates/index.json`, section `piece` (kyma-product-story-scroll)

### 2.1 Légende permanente (R1, R2)

| Champ | Texte |
|---|---|
| `caption` (section `piece`) | Modèle 3D de présentation, pas une photo du produit fabriqué. Le motif de chaque pièce est pensé pour être unique : la vôtre différera de ce modèle. Les couleurs dépendent de votre écran. |
| `caption_hoodie` (section `drop`) | *(même texte que ci-dessus)* |
| `caption` (section `drop`) | Rendu 3D du coloris, pas une photo du produit fabriqué. |
| `caption` (section `motif`) | Illustration du motif, pas une photo du produit fabriqué. Chaque pièce est pensée pour être unique. |

À Sacha : la légende de `piece` s'affiche dans `kyma-pstory__sticky`, donc **à chaque étape**, y compris en mouvement réduit, sans JavaScript et sans WebGL. Le texte doit être du vrai texte lisible par les lecteurs d'écran, pas dans le canvas.

### 2.2 Textes des étapes

| Bloc | Champ | Texte |
|---|---|---|
| `step_1` (intro) | `text` | Le hoodie zippé Ressac. Coupe oversize, épaules tombantes, un motif pensé pour ne pas se répéter. Faites défiler : la pièce se dévoile. |
| `step_2` (capuche) | `text` | Double épaisseur, sans cordon ni œillets. À l'intérieur, une doublure en jersey ton sur ton. *(inchangé, conforme)* |
| `step_3` (dos) | `text` | Le motif KYMA Wave court sur tout le dos, d'une épaule à l'autre, comme un courant. *(inchangé ; à recontrôler sur les préséries, R9)* |
| `step_4` (tirette) | `text` | Sculptée « Kyma », en laiton, finition dorée brossée. Le seul éclat de la pièce. |
| `step_5` (zip) | `text` | Zip intégral en métal, finition argentée brossée, du col jusqu'à l'ourlet. |
| `step_6` (composition) | `text` | La composition complète figure sur la fiche produit. |
| `step_6` | `spec` | *(vide : aucune ligne tant que le fabricant n'a pas confirmé la composition)* |
| `step_7` (fabrication) | `text` | *(vide)* |
| `step_7` | `spec` | `Lieu de fabrication \|` *(valeur vide tant que le contrat n'est pas signé et l'attestation d'origine reçue)*<br>`Imaginé à \| Paris` |

Pour Sacha :
- `step_6` : le bloc `<dl>` est masqué s'il est vide, la phrase du champ `text` s'affiche à la place. Quand l'étiquette sera définitive, remplir `spec` à l'identique de l'étiquette, jamais « bio » ni « GOTS » sans le certificat.
- `step_7` : seule la ligne « Imaginé à Paris » s'affiche (une ligne sans valeur n'apparaît pas).
- **Décision d'Arthur** : la ligne « Bords-côtes | 95 % coton, 5 % élasthanne » reste vide à l'étape 6, comme le reste de la composition, jusqu'à confirmation du fabricant.

### 2.3 Textes alternatifs des images fixes (`still_alt`, mouvement réduit)

Coloris par défaut : Lilac Whirl. Si Sacha sait injecter le coloris actif, remplacer « Lilac Whirl » par le nom du coloris choisi.

| Bloc | `still_alt` |
|---|---|
| `step_1` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, vue d'ensemble. Pas une photo du produit fabriqué. |
| `step_2` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape capuche. Pas une photo du produit fabriqué. |
| `step_3` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape dos. Pas une photo du produit fabriqué. |
| `step_4` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape tirette. Pas une photo du produit fabriqué. |
| `step_5` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape zip. Pas une photo du produit fabriqué. |
| `step_6` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape intérieur, côté gauche. Pas une photo du produit fabriqué. |
| `step_7` | Rendu 3D du hoodie Ressac, coloris Lilac Whirl, étape intérieur, côté droit. Pas une photo du produit fabriqué. |

### 2.4 Conclusion du récit (facultatif, aucun enjeu juridique)

« Alors, qu'en dites-vous ? » et « Êtes-vous prêt à suivre le mouvement ? » fonctionnent, mais sont plus bavards que la marque. Une paire plus proche de « la marque murmure », au choix du fondateur :

| Champ | Texte retenu (inchangé) | Alternative |
|---|---|---|
| `final_title` | Alors, qu'en dites-vous ? | Le mouvement continue. |
| `final_subtitle` | Êtes-vous prêt à suivre le mouvement ? | Choisissez votre coloris. |

Les boutons « Découvrir la pièce » et « Choisir mon coloris » restent. Rappel de Victoire (R11) : la note du hero « Expédition au plus tard le [À COMPLÉTER : date] » ne se publie pas tant que la date n'est pas renseignée.

---

## 3. Instagram — @kymasinsta — annonce de la liste d'attente

**Statut : publiable dès que (1) le formulaire de la liste d'attente est actif, (2) la légende des textes ci-dessus est intégrée, (3) la page des conditions est publiée sans crochet, après relecture d'un avocat, (4) la société est immatriculée, la politique de confidentialité est publiée et la boutique est sur un forfait payant.** Format : un visuel unique (capture du visuel animé « anneaux » du site, rendu 3D, aucune image IA). Pas de prix dans le post, ni de réduction, ni de date d'ouverture annoncée.

### Caption

> Un cercle se dessine, vague après vague.
>
> La liste d'attente du Cercle Waves est ouverte. L'abonnement KYMA compte deux paliers payants, INITIUM et MAJESTÉ, en abonnement trimestriel. La date d'ouverture n'est pas encore fixée : laissez votre adresse (lien en bio), nous vous écrirons. Cette inscription n'est pas un abonnement : aucun paiement n'est demandé.
>
> Le cercle se prépare.
>
> #kyma #lartduflow #cerclewaves #streetwearunisexe #parisstreetwear

### Trois propositions d'alt-text

1. Deux anneaux satinés, rose clair et marron clair, qui se rapprochent sur fond beige. Rendu 3D, pas une photo.
2. Visuel typographique beige : « Cercle Waves » en lettres brunes, deux anneaux souples en arrière-plan.
3. Capture du site KYMA : deux cercles tonals qui s'entrelacent, rose clair et camel, sur fond beige.

### CTA

Implicite : « Le cercle se prépare. » + lien en bio (« Liste d'attente Cercle Waves »).

### Trois variantes d'accroche (première ligne)

1. Avant la vague, l'eau se retire un instant.
2. Le ressac revient toujours. Cette fois, il porte un nom : Cercle Waves.
3. Ce qui se prépare au large se devine d'abord au bruit de l'eau.

À chaque variante, le reste de la caption est identique (contexte, mention « n'est pas un abonnement », CTA doux). Accroche retenue dans la caption ci-dessus : « Un cercle se dessine, vague après vague. »

### Stories associées (facultatif)

Une story fixe avec le sticker lien : « Liste d'attente ouverte. » puis, sur la deuxième : « Deux paliers payants, en abonnement trimestriel. Les conditions sont sur la page. »

---

## 4. Valeurs à faire valider par le fondateur

| Valeur | Où | Proposition de Victoire |
|---|---|---|
| Accès anticipé INITIUM | `tier_1.perks` ligne 2 | [24 h] |
| Accès anticipé MAJESTÉ | `tier_2.perks` ligne 2 | [48 h] |
| Aperçu des collections INITIUM | `tier_1.perks` ligne 3 | [3] jours |
| Aperçu des collections MAJESTÉ | `tier_2.perks` ligne 3 | [7] jours |
| Produits réservés MAJESTÉ | `tier_2.perks` ligne 4 | au moins [1] par an (à retirer si impossible à tenir) |
| Validité du Crédit Waves | `cashback_note` des deux cartes | [12] mois |
| Délai d'envoi de la carte | ajout au verso | [14] jours |
| Date du premier accès anticipé | ajout au verso (point E1) | à fixer : aucun drop daté, avantage non vendable sans date |
| Raison sociale | `rejoindre.consent` | à fournir |
| Lien de confidentialité et de conditions | `consent`, `terms`, `terms_link` | pages à publier |
| Taux de cashback 5 % / 10 % | cartes | décidés ; équilibre à valider avec l'expert-comptable (E8) |
| « Imaginé à Paris » | `step_7.spec` | à confirmer |
| « Nominative » ou « numérotée » (carte) | non écrit | à ajouter seulement si le nom ou un numéro est imprimé (E11) |
| Date d'expédition de la note du hero | `index.json`, section `hero`, `note` : « Expédition au plus tard le [À COMPLÉTER : date] » (R11) | à fixer ; ne pas publier tant que le crochet est affiché |

**Choix éditoriaux du fondateur** (aucun enjeu juridique, à trancher avant intégration) :

| Choix | Où | Options |
|---|---|---|
| Titre de la page Cercle Waves | §1.1 `title_*` | « Le Cercle *Waves*. » (retenu par défaut) ou « Suivre le *courant*. » (dans ce cas, titre de `paliers` modifié, voir §1.1) |
| Texte de `passage` | §1.3 `text` | version retenue (prorata et date d'effet détaillés) ou version neutre (renvoi aux conditions) |
| Conclusion du récit 3D | §2.4 `final_title` / `final_subtitle` | texte actuel ou paire « Le mouvement continue. / Choisissez votre coloris. » |
| Section Cercle de l'accueil | §1.5 | titre « Le Cercle *Waves*. », texte et bouton « Découvrir les deux paliers » (proposés) ou texte actuel |

## 5. Contrôle de conformité avant remise à Sacha

- Aucun terme supprimé par Victoire n'a été réintroduit dans les textes ci-dessus (contrôle à la relecture, sur les sept formules de sa liste de proscrits).
- Les mots « élite », « VIP », « privilège », « cercle fermé », « sélection », « gagnez » sont absents ; le Cercle n'est présenté ni comme sélectif ni comme mérité.
- « Garantit » n'apparaît que dans la phrase de `condition` de Victoire, à la forme négative.
- Aucun prix barré, aucune date d'ouverture non fixée, aucune promesse non datée.
- Seuls crochets visibles : valeurs de la partie 4, y compris la date d'expédition du hero.
