# KYMA — Fiches produit Shopify (Drop 1)

> Livrable Izaac, mode mission. Statut : version 3 (vouvoiement, visuels 3D, section Médias 3D). Relecture juridique Victoire à refaire sur la mention des visuels.
> Source : `brand/BRAND.md` (tech pack v3, avril 2026). Visuels : `shopify/3d/` (voir « Médias 3D » en fin de document).
> Ton : vouvoiement partout, aligné sur les textes de Maya.

## Mention des visuels (formule unique)

> **Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.**

À afficher sous le visualiseur 3D et sous chaque vignette. Elle ne promet pas l'unicité : elle exprime l'intention (repli validé par Victoire) et annonce l'écart possible.

## Légende des balises (à lire avant publication)

| Balise | Sens | Action |
|---|---|---|
| `[SI CERTIFIÉ : …]` | Allégation interdite tant que le certificat (GOTS : scope + transaction) n'est pas obtenu. | Retirer la balise et garder le texte seulement après preuve. Sinon supprimer tout le contenu entre crochets. |
| `[SI CONFIRMÉ : …]` | Mention d'origine ou de fait non encore confirmée (ex. « Made in Portugal », à confirmer à la signature fabricant). | Idem. |
| `[SI PRÉSÉRIE VALIDÉE : …]` | Affirmation d'unicité ou de procédé (« chaque pièce est unique », « motif non répété ») non démontrée tant que la présérie n'est pas validée. | Après validation : retirer la balise. Avant : supprimer le passage et publier le repli. |
| `[REPLI : …]` | Texte de remplacement publiable dès aujourd'hui, à la place d'un passage `[SI PRÉSÉRIE VALIDÉE]`. Repli standard : « Pensé pour que chaque pièce soit unique. » | Retirer les crochets pour l'activer. |
| `[À COMPLÉTER : …]` | Donnée chiffrée ou datée volontairement non inventée. | À renseigner par le fondateur. |
| `[À CONFIRMER : …]` | Information issue du tech pack, à aligner sur l'étiquette ou la présérie. | Vérifier avant mise en ligne. |

Règle de publication : tant qu'une balise `[SI …]` n'est pas activée, son contenu est retiré du texte public, et le `[REPLI]` éventuel est publié.

---

# PRODUIT UNIQUE — structure Shopify (décision Arthur)

Un seul produit Shopify, 30 variantes : 5 coloris × 6 tailles.

- **Option 1 — Coloris** : Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow.
- **Option 2 — Taille** : XS, S, M, L, XL, XXL.
- **SKU suggéré** : `KYMA-HZ-001-<COLORIS>-<TAILLE>` (ex. `KYMA-HZ-001-LILAC-M`).
- **Médias par coloris** : un modèle 3D (GLB) et sa vignette rendue depuis la 3D. Textes alternatifs en partie B, fichiers et statut d'import dans « Médias 3D ».

## Titre

**Ressac — Hoodie zippé oversize**
Repli si le nom n'est pas retenu : **Hoodie zippé KYMA**.

## Handle proposé

`ressac-hoodie-zippe-oversize`
Repli : `hoodie-zippe-kyma`.

## SEO title (≤ 60)

`Ressac – Hoodie zippé oversize, 5 coloris | KYMA` — **48 caractères**.
(Ressac 6 + « – » avec espaces 3 + Hoodie zippé oversize 21 + « , » 2 + 5 coloris 9 + « | » avec espaces 3 + KYMA 4 = 48.)

## Meta description (≤ 155)

`Ressac, hoodie zippé oversize KYMA : French terry gratté, zip argent, tirette sculptée. Cinq coloris, motif KYMA Wave. Précommande.` — **131 caractères**.

## Tags

`drop-1`, `hoodie`, `unisexe`, `precommande`

## Description HTML — version source (balisée)

Cette version garde les balises pour le jour où les preuves seront réunies. **Ne pas la coller telle quelle** : coller la « VERSION À PUBLIER » ci-dessous.

```html
<p><em>[SI PRÉSÉRIE VALIDÉE : Une vague ne se répète jamais. Celle-ci non plus.] [REPLI : Pensé pour que chaque pièce soit unique.]</em></p>

<p>Le coton épais tombe, lourd et doux. L'intérieur gratté garde la chaleur, comme un sable tiède. Le motif ondoie d'une épaule à l'autre. Le zip glisse ; la tirette brille, à peine.</p>

<h3>Détails</h3>
<ul>
  <li><strong>Matière</strong> : French terry, 400–420 g/m² [À CONFIRMER : grammage définitif à la présérie], intérieur gratté.</li>
  <li><strong>Composition</strong> : Corps : [À CONFIRMER : 100 % coton] [SI CERTIFIÉ : coton biologique certifié GOTS] · Bords-côtes : 95 % coton, 5 % élasthanne · Doublure de capuche : [À COMPLÉTER : composition]</li>
  <li><strong>Coupe</strong> : oversize, épaules tombantes. Unisexe.</li>
  <li><strong>Zip</strong> : intégral, métal argent brossé.</li>
  <li><strong>Tirette</strong> : sculptée « Kyma », laiton plaqué or brossé.</li>
  <li><strong>Capuche</strong> : double épaisseur, doublure en jersey ton sur ton. Sans cordon ni œillets : un choix de design, pour que la ligne reste pure.</li>
  <li><strong>Poches</strong> : deux poches biais.</li>
  <li><strong>Bords-côtes</strong> : 2×2, 6 cm aux poignets et à la taille.</li>
  <li><strong>Impression</strong> : pigmentaire, all-over, motif KYMA Wave. [SI CERTIFIÉ : encres conformes GOTS / OEKO-TEX ECO PASSPORT]</li>
  <li><strong>Origine</strong> : imaginé à Paris. [SI CONFIRMÉ : fabriqué au Portugal]</li>
</ul>

<h3>[SI PRÉSÉRIE VALIDÉE : Chaque pièce est unique] [REPLI : Pensé pour être unique]</h3>
<p>[SI PRÉSÉRIE VALIDÉE : Le motif KYMA Wave est imprimé en continu sur un long rouleau de tissu. Il ne boucle pas. Chaque hoodie est découpé dans une zone différente du rouleau : le tourbillon qui passe sur votre épaule n'existe que sur votre pièce. Deux hoodies du même coloris partagent la même famille de nuances, jamais le même dessin.] [REPLI : Pensé pour que chaque pièce soit unique.]</p>
<p><em>Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.</em></p>

<h3>Précommande</h3>
<p>La fabrication est lancée après la clôture de la précommande. Expédition au plus tard le [À COMPLÉTER : date]. Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Conditions détaillées dans nos <a href="/policies/terms-of-service">CGV</a> et sur la page <a href="/policies/refund-policy">Retours et remboursements</a>.</p>

<h3>Coupe &amp; taille</h3>
<p>Coupe oversize : ample, posée, épaules tombantes. Votre taille habituelle donne la silhouette voulue. Pour une coupe plus ajustée, prenez une taille en dessous. Mesures détaillées dans le <a href="/pages/guide-des-tailles">guide des tailles</a>.</p>

<h3>Entretien</h3>
<p>Laver à 30–40 °C, sur l'envers. Pas de sèche-linge. [À CONFIRMER : à aligner sur l'étiquette définitive]</p>
```

## VERSION À PUBLIER (brouillon Shopify)

Replis appliqués, aucune balise `[SI …]`. Restent uniquement les trois champs que seul le fondateur peut renseigner : `[À COMPLÉTER : date]`, `[À COMPLÉTER : composition]` (doublure) et les `[À CONFIRMER]` (composition du corps, grammage, entretien). Ils sont à résoudre avant toute mise en ligne. Le bloc reste en brouillon.

```html
<p><em>Pensé pour que chaque pièce soit unique.</em></p>

<p>Le coton épais tombe, lourd et doux. L'intérieur gratté garde la chaleur, comme un sable tiède. Le motif ondoie d'une épaule à l'autre. Le zip glisse ; la tirette brille, à peine.</p>

<h3>Détails</h3>
<ul>
  <li><strong>Matière</strong> : French terry, 400–420 g/m² [À CONFIRMER : grammage définitif à la présérie], intérieur gratté.</li>
  <li><strong>Composition</strong> : Corps : [À CONFIRMER : 100 % coton] · Bords-côtes : 95 % coton, 5 % élasthanne · Doublure de capuche : [À COMPLÉTER : composition]</li>
  <li><strong>Coupe</strong> : oversize, épaules tombantes. Unisexe.</li>
  <li><strong>Zip</strong> : intégral, métal argent brossé.</li>
  <li><strong>Tirette</strong> : sculptée « Kyma », laiton plaqué or brossé.</li>
  <li><strong>Capuche</strong> : double épaisseur, doublure en jersey ton sur ton. Sans cordon ni œillets : un choix de design, pour que la ligne reste pure.</li>
  <li><strong>Poches</strong> : deux poches biais.</li>
  <li><strong>Bords-côtes</strong> : 2×2, 6 cm aux poignets et à la taille.</li>
  <li><strong>Impression</strong> : pigmentaire, all-over, motif KYMA Wave.</li>
  <li><strong>Origine</strong> : imaginé à Paris.</li>
</ul>

<h3>Pensé pour être unique</h3>
<p><em>Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.</em></p>

<h3>Précommande</h3>
<p>La fabrication est lancée après la clôture de la précommande. Expédition au plus tard le [À COMPLÉTER : date]. Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Conditions détaillées dans nos <a href="/policies/terms-of-service">CGV</a> et sur la page <a href="/policies/refund-policy">Retours et remboursements</a>.</p>

<h3>Coupe &amp; taille</h3>
<p>Coupe oversize : ample, posée, épaules tombantes. Votre taille habituelle donne la silhouette voulue. Pour une coupe plus ajustée, prenez une taille en dessous. Mesures détaillées dans le <a href="/pages/guide-des-tailles">guide des tailles</a>.</p>

<h3>Entretien</h3>
<p>Laver à 30–40 °C, sur l'envers. Pas de sèche-linge. [À CONFIRMER : à aligner sur l'étiquette définitive]</p>
```

---

# A. Fiche commune — le hoodie zippé (texte de base partagé)

## Nom de la pièce signature

Trois noms possibles :

1. **Ressac** — la vague qui revient sur elle-même. Le zip va, vient, glisse : le geste est un ressac. C'est le mot même de la charte (« la marque murmure avec assurance — comme le ressac »).
2. **Sillage** — ce que la vague laisse derrière elle. Plus narratif, un peu moins ancré dans la matière.
3. **Houle** — le mouvement lent, ample, avant la vague. Évoque l'oversize et la calme assurance.

**Recommandation : Ressac.** Court, sonore, français, cohérent avec le ton de la charte.
Réserve : disponibilité du nom (marque, INPI) à faire vérifier par Victoire avant usage. Si le nom n'est pas retenu, repli : **« Hoodie zippé KYMA »** (dans ce cas, recompter les SEO title et meta description).

## Accroche

> `[SI PRÉSÉRIE VALIDÉE : Une vague ne se répète jamais. Celle-ci non plus.]`
> `[REPLI : Pensé pour que chaque pièce soit unique.]`

## Description

Le coton épais tombe, lourd et doux. L'intérieur gratté garde la chaleur, comme un sable tiède. Le motif ondoie d'une épaule à l'autre. Le zip glisse ; la tirette brille, à peine.

## Détails

- **Matière** : French terry, 400–420 g/m² `[À CONFIRMER : grammage définitif à la présérie]`, intérieur gratté.
- **Composition** : Corps : `[À CONFIRMER : 100 % coton]` `[SI CERTIFIÉ : coton biologique certifié GOTS]` · Bords-côtes : 95 % coton, 5 % élasthanne · Doublure de capuche : `[À COMPLÉTER : composition]`
- **Coupe** : oversize, épaules tombantes. Unisexe.
- **Zip** : intégral, métal argent brossé.
- **Tirette** : sculptée « Kyma », laiton plaqué or brossé.
- **Capuche** : double épaisseur, doublure en jersey ton sur ton. Sans cordon ni œillets : un choix de design, pour que la ligne reste pure.
- **Poches** : deux poches biais.
- **Bords-côtes** : 2×2, 6 cm aux poignets et à la taille.
- **Impression** : pigmentaire, all-over, motif KYMA Wave. `[SI CERTIFIÉ : encres conformes GOTS / OEKO-TEX ECO PASSPORT]`
- **Origine** : imaginé à Paris. `[SI CONFIRMÉ : fabriqué au Portugal]`

## `[SI PRÉSÉRIE VALIDÉE : Chaque pièce est unique]` `[REPLI : Pensé pour être unique]`

`[SI PRÉSÉRIE VALIDÉE :`
Le motif KYMA Wave est imprimé en continu sur un long rouleau de tissu. Il ne boucle pas. Il ne se répète pas.

Chaque hoodie est découpé dans une zone différente du rouleau. Le tourbillon qui passe sur votre épaule n'existe que sur votre pièce : deux hoodies du même coloris partagent la même famille de nuances, jamais le même dessin.

Ce n'est pas une imperfection. C'est le principe.
`]`

`[REPLI : Pensé pour que chaque pièce soit unique.]`

Hors balise (toujours publiable, sous le visualiseur 3D et sous chaque vignette) : *Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.*

`[À CONFIRMER : une carte numérotée accompagne chaque pièce, selon le packaging final]`

## Disponibilité

Pièce proposée en précommande. La fabrication est lancée après la clôture de la précommande. Expédition au plus tard le `[À COMPLÉTER : date]`. Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Conditions détaillées dans nos [CGV] `[LIEN : /policies/terms-of-service]` et sur la page [Retours et remboursements] `[LIEN : /policies/refund-policy]`.

## Coupe & taille

Coupe oversize : ample, posée, épaules tombantes. Votre taille habituelle donne la silhouette voulue.
Pour une coupe plus ajustée, prenez une taille en dessous.
Mesures détaillées dans le [guide des tailles](/pages/guide-des-tailles).

## Entretien

Laver à 30–40 °C, sur l'envers. Pas de sèche-linge.
`[À CONFIRMER : à aligner sur l'étiquette définitive de la pièce]`

---

# B. Les cinq coloris — blocs coloris et textes alternatifs

Depuis la décision « produit unique » : ces blocs servent aux textes alternatifs des médias de variante et aux blocs coloris affichés sur la fiche ou la page de collection. Les « titres » ci-dessous sont des noms d'affichage de bloc, pas des titres de produit Shopify. Les tags et SEO par coloris sont facultatifs : ne pas les appliquer au produit unique (tags du produit : voir bloc en tête).

Même pièce, même coupe, même tissu. Seuls changent la teinte du motif et la doublure de la capuche.
Décompte en caractères, espaces compris.

**Deux médias par coloris** : le modèle 3D (GLB) et la vignette rendue depuis la 3D (PNG 1600 × 1600, fond beige). Mention à afficher près de chacun : *Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.*

## 1. Lilac Whirl (coloris signature)

- **Nom d'affichage du bloc** : Ressac Lilac Whirl — Hoodie zippé
- **Accroche** : Le lilas qui tourne, sans jamais revenir.
- **Ambiance** : Un tourbillon lilas glisse sur un fond de poudre, tonal, presque une brume. La doublure crème adoucit la lumière sous la capuche.
- **SEO title (facultatif)** : `Ressac Lilac Whirl – Hoodie zippé oversize | KYMA` (49 caractères)
- **Meta description (facultatif)** : `Ressac, hoodie zippé oversize KYMA en Lilac Whirl : lilas tourbillonnant sur poudre. Motif KYMA Wave, pensé pour que chaque pièce soit unique.` (142 caractères)
- **Textes alternatifs**
  - Modèle 3D : Hoodie zippé oversize KYMA Ressac Lilac Whirl, motif marbré lilas et crème, zip argent, tirette dorée, visuel de présentation 3D, à faire pivoter à 360°.
  - Vignette (rendue depuis la 3D) : Hoodie zippé oversize KYMA Ressac Lilac Whirl, vue de face sur fond beige, motif marbré lilas et crème, vignette rendue depuis le modèle 3D.
- **Tags (facultatifs, filtres de collection)** : `lilas`, `lilac-whirl`

## 2. Ivory Tide

- **Nom d'affichage du bloc** : Ressac Ivory Tide — Hoodie zippé
- **Accroche** : L'ivoire monte comme une marée sur le sable clair.
- **Ambiance** : Des volutes crème ivoire sur un fond vanille, à peine séparées l'une de l'autre. La doublure blanc chaud prolonge la douceur jusque sous la capuche.
- **SEO title (facultatif)** : `Ressac Ivory Tide – Hoodie zippé oversize | KYMA` (48 caractères)
- **Meta description (facultatif)** : `Ressac, hoodie zippé oversize KYMA en Ivory Tide : crème ivoire sur vanille. Motif KYMA Wave, pensé pour que chaque pièce soit unique.` (134 caractères)
- **Textes alternatifs**
  - Modèle 3D : Hoodie zippé oversize KYMA Ressac Ivory Tide, motif marbré ivoire et grège clair, zip argent, tirette dorée, visuel de présentation 3D, à faire pivoter à 360°.
  - Vignette (rendue depuis la 3D) : Hoodie zippé oversize KYMA Ressac Ivory Tide, vue de face sur fond beige, motif marbré ivoire et grège clair, vignette rendue depuis le modèle 3D.
- **Tags (facultatifs, filtres de collection)** : `ivoire`, `ivory-tide`

## 3. Silver Drift

- **Nom d'affichage du bloc** : Ressac Silver Drift — Hoodie zippé
- **Accroche** : Un gris d'acier qui dérive sur la perle.
- **Ambiance** : Le motif file, froid et lumineux, comme l'écume un matin sans vent. La doublure blanc froid garde la ligne nette.
- **SEO title (facultatif)** : `Ressac Silver Drift – Hoodie zippé oversize | KYMA` (50 caractères)
- **Meta description (facultatif)** : `Ressac, hoodie zippé oversize KYMA en Silver Drift : gris acier sur perle. Motif KYMA Wave, pensé pour que chaque pièce soit unique.` (132 caractères)
- **Textes alternatifs**
  - Modèle 3D : Hoodie zippé oversize KYMA Ressac Silver Drift, motif marbré gris acier et gris perle, zip argent, tirette dorée, visuel de présentation 3D, à faire pivoter à 360°.
  - Vignette (rendue depuis la 3D) : Hoodie zippé oversize KYMA Ressac Silver Drift, vue de face sur fond beige, motif marbré gris acier et gris perle, vignette rendue depuis le modèle 3D.
- **Tags (facultatifs, filtres de collection)** : `gris`, `silver-drift`

## 4. Noir Absolu

- **Nom d'affichage du bloc** : Ressac Noir Absolu — Hoodie zippé
- **Accroche** : La nuit, quand la mer ne se voit plus mais s'entend.
- **Ambiance** : Du noir sur de l'anthracite : le marbrage se devine, il ne se montre pas. À la lumière, la vague apparaît ; ailleurs, elle se tait.
- **SEO title (facultatif)** : `Ressac Noir Absolu – Hoodie zippé oversize | KYMA` (49 caractères)
- **Meta description (facultatif)** : `Ressac, hoodie zippé oversize KYMA en Noir Absolu : nuit profonde, noir sur anthracite. Motif KYMA Wave, pensé pour que chaque pièce soit unique.` (145 caractères)
- **Textes alternatifs**
  - Modèle 3D : Hoodie zippé oversize KYMA Ressac Noir Absolu, marbrage discret noir et anthracite, zip argent, tirette dorée, visuel de présentation 3D, à faire pivoter à 360°.
  - Vignette (rendue depuis la 3D) : Hoodie zippé oversize KYMA Ressac Noir Absolu, vue de face sur fond beige, marbrage discret noir et anthracite, vignette rendue depuis le modèle 3D.
- **Tags (facultatifs, filtres de collection)** : `noir`, `noir-absolu`

## 5. Crimson Flow

- **Nom d'affichage du bloc** : Ressac Crimson Flow — Hoodie zippé
- **Accroche** : Un cramoisi qui coule sur le bordeaux.
- **Ambiance** : Ardent, mais jamais criard : deux rouges proches, une seule couleur qui respire. Les volutes se resserrent comme un dernier éclat sur l'horizon.
- **SEO title (facultatif)** : `Ressac Crimson Flow – Hoodie zippé oversize | KYMA` (50 caractères)
- **Meta description (facultatif)** : `Ressac, hoodie zippé oversize KYMA en Crimson Flow : cramoisi sur bordeaux ardent. Motif KYMA Wave, pensé pour que chaque pièce soit unique.` (140 caractères)
- **Textes alternatifs**
  - Modèle 3D : Hoodie zippé oversize KYMA Ressac Crimson Flow, motif marbré bordeaux et rose ancien, zip argent, tirette dorée, visuel de présentation 3D, à faire pivoter à 360°.
  - Vignette (rendue depuis la 3D) : Hoodie zippé oversize KYMA Ressac Crimson Flow, vue de face sur fond beige, motif marbré bordeaux et rose ancien, vignette rendue depuis le modèle 3D.
- **Tags (facultatifs, filtres de collection)** : `bordeaux`, `crimson-flow`

### Notes de production pour Sacha

- Les textes alternatifs décrivent les couleurs réellement visibles dans les modèles 3D (palette de `shopify/3d/build_hoodie.py`). Les blocs « Ambiance » ci-dessus restent le texte éditorial du tech pack : à aligner si le fondateur préfère l'un ou l'autre (écart net sur Crimson Flow : bordeaux et rose ancien en 3D, « cramoisi sur bordeaux » en texte).
- Les modèles 3D sont des visuels de présentation, pas des photos du produit fabriqué. La mention des visuels (en tête de document) s'affiche près du visualiseur et sous chaque vignette.
- Les doublures de capuche de Noir Absolu et Crimson Flow ne sont pas précisées au tech pack : elles ne sont donc pas décrites ici.
- Longueurs vérifiées : SEO title produit 48 caractères (plafond 60) ; meta produit 131 caractères (plafond 155) ; metas par coloris entre 132 et 145 caractères.

---

# C. Page « Guide des tailles »

**Titre de page** : Guide des tailles
**Handle suggéré** : `/pages/guide-des-tailles`

## Texte d'intro

Le hoodie Ressac est coupé large. Les épaules tombent, la matière flotte, le zip suit le mouvement. Ce guide vous aide à choisir l'amplitude que vous préférez.

Les mesures sont données à plat, en centimètres, avec une tolérance de ±1 cm.

## Tableau des mesures

| | XS | S | M | L | XL | XXL |
|---|---|---|---|---|---|---|
| Poitrine | 60 | 62 | 64 | 66 | 68 | 70 |
| Épaules | 54 | 56 | 58 | 60 | 62 | 64 |
| Longueur dos | 66 | 68 | 70 | 72 | 74 | 76 |
| Manche | 62 | 63 | 64 | 65 | 66 | 67 |
| Bas (à plat) | 58 | 60 | 62 | 64 | 66 | 68 |

## Conseils

- **Choisir sa taille** : posez à plat un hoodie que vous portez déjà, mesurez-le, comparez. C'est le plus fiable.
- **Coupe prévue** : oversize. Votre taille habituelle donne la silhouette voulue : ample, posée.
- **Pour une coupe plus ajustée, prenez une taille en dessous.**
- **Entre deux tailles** : la plus petite pour plus de tenue, la plus grande pour plus d'amplitude.
- **Unisexe** : une seule grille, pour toutes et tous.
- **Un doute** : écrivez-nous `[À COMPLÉTER : adresse e-mail de contact]`, nous vous répondons.

---

# D. Médias 3D

Source : `shopify/contenu/visuels-3d.md`. Fichiers dans `shopify/3d/`, générés par `build_hoodie.py` (glTF 2.0 binaire standard, sans extension, à l'échelle réelle).

> **Statut global : bloqué sur plan d'essai.** Shopify refuse l'import 3D natif : « Le fichier n'est pas pris en charge sur les comptes d'essai ». **Action : à importer dès le passage à un plan payant.**

| Coloris | Modèle 3D (GLB) | Vignette (PNG 1600 × 1600) | Statut | Action |
|---|---|---|---|---|
| Lilac Whirl | `shopify/3d/ressac-lilac-whirl.glb` | `shopify/3d/ressac-lilac-whirl.png` | Bloqué sur plan d'essai | À importer dès le passage à un plan payant |
| Ivory Tide | `shopify/3d/ressac-ivory-tide.glb` | `shopify/3d/ressac-ivory-tide.png` | Bloqué sur plan d'essai | À importer dès le passage à un plan payant |
| Silver Drift | `shopify/3d/ressac-silver-drift.glb` | `shopify/3d/ressac-silver-drift.png` | Bloqué sur plan d'essai | À importer dès le passage à un plan payant |
| Noir Absolu | `shopify/3d/ressac-noir-absolu.glb` | `shopify/3d/ressac-noir-absolu.png` | Bloqué sur plan d'essai | À importer dès le passage à un plan payant |
| Crimson Flow | `shopify/3d/ressac-crimson-flow.glb` | `shopify/3d/ressac-crimson-flow.png` | Bloqué sur plan d'essai | À importer dès le passage à un plan payant |

Les vignettes sont de simples images : leur import relève des règles habituelles des images produit (à vérifier par Sacha sur la boutique d'essai).

Textes alternatifs : partie B, deux par coloris (modèle 3D, vignette).

**À l'import (Sacha)**
- Ordre conseillé : vignette face en premier média, puis le modèle 3D, puis les vues secondaires (trois-quarts avant, dos) si elles sont rendues.
- Une vignette par coloris sert d'image de variante ; l'association d'un modèle 3D à une variante est à vérifier dans l'admin Shopify.
- Mention à afficher près du visualiseur et sous chaque vignette : *Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.*
- Éclairage du visualiseur : environnement « neutral » de model-viewer, ombre douce (intensité 1, flou 1), fond Beige #F5EDE4.

**Ce que montre le 360°** : silhouette boxy aux épaules tombantes, bords-côtes de 6 cm, zip argent et tirette dorée, deux poches biais, capuche double épaisseur sans cordon ni œillets, motif marbré en deux tons continu d'une face à l'autre.

**Limites** : représentation stylisée, non fabriquée. Le tombé du French terry, l'épaisseur, les coutures et le placement du motif diffèrent. La tirette est schématique (gravure « Kyma » définitive absente). À compléter par le shooting du produit fabriqué après validation des préséries.
