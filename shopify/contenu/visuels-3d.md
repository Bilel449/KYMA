# Visuels 3D — hoodie zippé « Ressac » (Drop 1)

*Izaac, direction créative. **v3 du 10/10/2026** (`ressac-v3-<coloris>.glb`, script `shopify/3d/build_hoodie_v3.py`), même contrat que le v2, qu'elle remplace en attendant un modèle réaliste (achat, CLO3D ou scan, voir `shopify/3d/pipeline-remplacement.md`). La v2 du 09/10/2026 (`ressac-v2-<coloris>.glb`, `build_hoodie_v2.py`) reste en place et inchangée. Les v1 (`ressac-<coloris>.glb`) ne doivent plus être utilisées.*

## v3 — ce qui change (10/10/2026)
Le fondateur a jugé la v2 « vêtement Roblox / cube ». La v3 corrige ce qu'un modèle procédural peut corriger, sans rien acheter.

| | v2 | v3 |
|---|---|---|
| Silhouette | devant plat (arrondi de côté 9 cm), côtés droits | section arrondie (15 cm + devant galbé), bas repris par le bord-côte et léger blousant, profondeur galbée |
| Manches | tubes droits, pose symétrique | axe courbe avec coude doux, gauche et droite différentes, tête de manche moins bombée, tassement en zigzag au-dessus du poignet |
| Plis | 3 à 7 mm | 6 à 12 mm : gravité, aisselles, pli du coude, blousant et fronces à la taille, rides secondaires partout |
| Coutures | dessinées dans la texture | **en creux** dans la géométrie (épaules, emmanchures, côtés, ourlet, dessous de bras) + surpiqûres |
| Capuche | casque rond, intérieur blanc (« tête ») | sommet affaissé vers l'avant (l'arrière reste arrondi), ouverture resserrée, plis de flanc, double épaisseur de 8 mm, intérieur dans l'ombre |
| Poches biais | trait sombre | fente ouverte : passepoil en relief, fond d'ombre, sac de poche légèrement bombé |
| Bords-côtes 2×2 | relief 0,85 mm | relief 1,4 mm, repris plus serré |
| Ombre | aucune (éclairage plat) | **occlusion ambiante cuite** (lancer de rayons, COLOR_0), calculée fermé et ouvert : creux des plis, dessous de bras et intérieur de capuche sombres, intérieur clair une fois ouvert |
| Matière | maille en JPEG, rugosité unique | maille jersey (endroit du french terry) en **PNG**, carte de rugosité PNG, envers molleton gratté (PNG) séparé de la doublure de capuche jersey, reflet velouté du coton (`KHR_materials_sheen`), toutes les tuiles avec `KHR_texture_transform` |
| Métal | zip argenté, tirette laiton | zip métal finition argentée brossée (rugosité 0,40), tirette laiton doré brossé (0,40) |
| Coloris | — | Lilac Whirl recentré sur le lilas (le v2 virait orchidée), Crimson Flow sur le bordeaux (le v2 virait brique) ; voir le tableau des couleurs |
| Mesures | non vérifiées | recalées sur le guide des tailles M : épaule 0,262 m au lieu de 0,272, manche raccourcie, bas du bord-côte élargi (voir le tableau des mesures) |

Correctif au passage : l'anneau du bord-côte de taille de la v2 traversait deux fois l'intérieur du corps (bandes cachées, normales faussées). Il est refait en v3.

### Fichiers v3
| Coloris | Fichier | Poids | Triangles |
|---|---|---|---|
| Lilac Whirl | `ressac-v3-lilac-whirl.glb` | 4,21 Mo | 121 308 |
| Ivory Tide | `ressac-v3-ivory-tide.glb` | 4,12 Mo | 121 308 |
| Silver Drift | `ressac-v3-silver-drift.glb` | 4,16 Mo | 121 308 |
| Noir Absolu | `ressac-v3-noir-absolu.glb` | 4,09 Mo | 121 308 |
| Crimson Flow | `ressac-v3-crimson-flow.glb` | 4,18 Mo | 121 308 |

**Écart assumé sur les triangles** : la cible de la recherche et de la conformité est < 100 000 triangles (L8). La v3 en compte 121 308, comme la v2 avant elle (125 340), qui est déjà en ligne en aperçu. Le poids, lui, reste sous 5 Mo. Ces triangles servent l'épaisseur du tissu (endroit, envers, lisières), les côtes 2×2, les dents du zip et les morphs. Descendre sous 100 000 est possible (doublure moins dense, côtes en normal map), mais coûterait du relief visible. C'est à faire si Sacha mesure un ralentissement sur mobile ; le modèle de remplacement, lui, visera directement < 100 000.

- **Validateur Khronos** (`gltf-validator` 2.0.0-dev.3.10) : **0 erreur** sur les 5 fichiers. Il reste un seul type d'avertissement, le même que la v2 : les tangentes sont générées à l'exécution.
- **Extensions** : `KHR_mesh_quantization` (requise), `KHR_texture_transform`, `KHR_materials_sheen`. Toutes sont gérées nativement par three.js r150+ (le thème embarque la r180) et par model-viewer. Un lecteur sans sheen affiche simplement le tissu sans reflet velouté.
- **7 matériaux** : `French terry KYMA Wave`, `Envers molleton gratté`, `Zip métal finition argentée brossée`, `Tirette Kyma laiton doré brossé`, `Ruban de zip`, `Fond de poche`, `Doublure de capuche jersey ton sur ton`. Le thème ne lit aucun nom de matériau pour un GLB v2/v3. Ces noms sont lisibles par tout visiteur qui ouvre le fichier : ils ne contiennent aucune allégation non confirmée par le fabricant (pas de « plaqué or », pas d'« argent » comme matière). J'ai vérifié par recherche de chaîne dans le JSON des 5 GLB que « plaqué » et « argent brossé » n'y figurent plus.
- **Tuiles PNG** : `shopify/3d/textures-v3/` (`knit-normal.png` maille 24 mm, `knit-rough.png`, `fleece-normal.png`).
- **Rendus de contrôle v2 / v3** : `shopify/3d/rendus-v3/` (`comparatif-face|dos|trois-quarts|capuche|zip-ouvert.png`, `coloris-v2-v3.png`). Script : `shopify/3d/render_three.cjs`, avec un éclairage proche de `kyma-pstory.js` (RoomEnvironment 0,75 + lumière principale) ; plans dans `rendus-v3/plans.json`. **Ce sont des documents de travail : ils ne sont jamais publiés sans la mention R1** (voir « Limites — à afficher »).
- **Reconstruire** : `python3 shopify/3d/build_hoodie_v3.py --coloris all --textures shopify/3d/textures-v3` (≈ 6 min ; `pip install embreex` conseillé pour l'occlusion).

### Mesures du modèle (taille M) comparées au guide des tailles
Les mesures sont prises sur la géométrie du GLB, en cm « à plat » : demi-tour pour la poitrine et le bas, arc sur la surface pour le reste. Le relevé a été fait par un script Python à partir de `build_geometry` : coupe horizontale des nappes, longueur des polylignes, côtes du bord-côte lissées sur une période. Le « patron » est la nappe avant drapé, le « drapé » est la forme livrée : les plis ajoutent de la longueur d'arc.

| Mesure | Guide M | Patron v3 | Drapé v3 | v2 (patron) | Commentaire |
|---|---|---|---|---|---|
| Poitrine (2,5 cm sous l'aisselle) | 64 | 64,0 | 67,1 | 65,9 | conforme (le drapé ajoute l'ampleur des plis) |
| Épaules (arc sur le dos, couture à couture) | 58 | 58,9 | 59,5 | 61,5 | corrigé : `W_SH` 0,272 → 0,262 m. La corde en ligne droite fait 52,4 cm, mais une mesure à plat suit le tissu, donc l'arc. |
| Longueur dos | 70 | 68,6 depuis le milieu dos de l'encolure ; 70,0 en hauteur depuis le point d'encolure côté | 68,9 | 68,4 | conforme en hauteur. L'arc depuis le point d'encolure côté (76 cm) passe par-dessus l'épaule et la profondeur du buste fantôme : il ne se compare pas à une mesure à plat. |
| Manche (couture d'épaule → bout du poignet) | 64 | 64,1 | 64,9 | 69,5 | corrigé : `SLV_LEN` 0,345 → 0,285 m. Les poignets s'arrêtent un peu au-dessus de l'ourlet. |
| Bas (bord-côte, à plat) | 62 | 61,0 en bas / 62,4 en haut | idem | non mesurable (l'anneau défectueux du v2 donne 119) | conforme (côte légèrement resserrée en bas) |
| Capuche | — (pas de cote au guide) | arête d'ouverture 32,5 ; couture milieu 50,9 ; profondeur 27,1 ; largeur 28,4 | 33,7 / 52,0 / 27,4 / 28,5 | 37,2 / 52,9 / 28,2 / 30,1 | dans la norme d'une capuche adulte (ouverture ≈ 33–35 cm). À recaler sur le patron du fabricant dès réception. |

### Couleurs : théorie et rendu mesuré
Mesures prises sous l'éclairage de contrôle (RoomEnvironment 0,75), médiane des pixels.

| Élément | Valeur théorique (GLB) | Mesuré v3 | Mesuré v2 | Cible |
|---|---|---|---|---|
| Tirette | facteur linéaire [1,00 ; 0,77 ; 0,34], rugosité 0,40 (≈ #FFE39E en sRGB) | #C6AB6A (laiton doré) | kaki | doré brossé. La proposition [0,96 ; 0,78 ; 0,42] avec rugosité 0,30 a été testée : **#95845A, kaki**. Plus le métal est lisse, plus il reflète le fond gris du studio ; à 0,40, il redevient doré. |
| Lilac Whirl, nuance B | #B9A0C6 (v2 : #C29CC4) | #C5ADC9 | #E5B8D5 (orchidée) | #C8A2C8 (lilas) |
| Lilac Whirl, nuance A (poudre) | #E6DBDF (v2 : #E9D3C4, pêche) | #F6E9ED | #F7DFD1 | poudre neutre |
| Crimson Flow, nuances A / B | #7C1A2B / #46101D (v2 : #8A2620 / #3F1411) | #9D2438 / #5A1724 | #AB3028 / #501B16 (brique) | cramoisi sur bordeaux |

Ivory Tide, Silver Drift et Noir Absolu gardent les valeurs du v2.

### Contrat : identique à la v2 (vérifié sur les 5 fichiers)
Mêmes nœuds, dans le même ordre et avec la même hiérarchie. Mêmes maillages articulés et mêmes `targetNames` (`open`, `open_fold`, `unzip_1..4`). Mêmes clés d'extras (`zipPath`, `zipPathQuat`, `sliderOpen`, `sliderOpenFold`, `poi`, `morphNodes`…). Même clip `ZipOpen` (6 s, 13 canaux). Pas d'`extras.pivot` : les panneaux portent `extras.hinge`. Le chemin du zip bouge de 8 mm au plus. Tout ce qui suit (nœuds, morphs, extras, animation, séquence de défilement) vaut donc pour la v3 comme pour la v2.

**Pour Sacha** : passer de la v2 à la v3 revient à changer l'URL des GLB, `ressac-v2-<coloris>.glb` → `ressac-v3-<coloris>.glb` (téléverser les 5 fichiers dans les fichiers Shopify). Il n'y a rien à modifier dans `kyma-pstory.js`. La couleur de doublure (`data-lining`) n'est plus utilisée par la v3, qui porte ses propres matériaux d'envers. Elle reste sans effet.

### Limites de la v3 (honnêtement)
- C'est **mieux, pas photoréaliste**. Les plis sont des fonctions de bruit et d'ondes posées sur des surfaces paramétriques. Ce n'est pas une simulation de tissu : ils restent plus réguliers et plus « dessinés » que le tombé réel d'un french terry de 410 g/m². De près, un œil exercé verra toujours un objet de synthèse.
- La capuche reste la partie la moins crédible. Elle tient debout sans tête et forme un petit pincement à la pointe de l'ouverture.
- La silhouette garde un côté « bomber » : bas repris et manches tassées.
- **Poches biais encore peu lisibles** à distance (vue d'ensemble) : la fente ouverte ne se lit bien qu'en gros plan ou en trois-quarts.
- **Coutures d'emmanchure presque verticales** sur le devant : avec l'épaule tombante, elles dessinent un léger effet de plastron, plus marqué que sur un vrai sweat, où le tissu les adoucit.
- **Occlusion = compromis** : `bake_ao` mélange 70 % de la valeur la plus claire (fermé, ouvert, ouvert + revers) et 30 % de la valeur fermée. L'intérieur ouvert reste lisible mais un peu plus clair que la réalité, l'intérieur fermé un peu moins sombre.
- L'occlusion est cuite pour la pose fermée et ouverte. Pendant l'ouverture, les ombres ne bougent pas avec le tissu.
- Seul un modèle issu d'une **simulation (CLO3D / Marvelous) ou d'un scan** franchira le cap du réalisme : voir `shopify/3d/pipeline-remplacement.md` (conversion au même contrat en une journée).

---

*Les sections suivantes décrivent le contrat v2, inchangé en v3.*

## Intention
Le hoodie est construit **comme un vrai vêtement, panneau par panneau** : dos, deux demi-devants, manches, capuche à deux panneaux, bords-côtes. Chaque pièce est un tissu de 5 mm d'épaisseur, avec son endroit, son envers et sa lisière. On y trouve une épaule tombante, des manches qui tombent le long du corps avec plis de coude et tassement au poignet, un blousant au-dessus de la taille et des côtes 2×2. Le motif KYMA Wave tourne en volutes, il ne se répète jamais et il est calculé dans le volume. **Aucune image IA** : la géométrie, le motif, la maille et la tirette sont procéduraux. La tirette porte « Kyma » en relief, en DM Serif Display, la typo de la marque.

## Fichiers
| Coloris | Fichier | Poids | Triangles |
|---|---|---|---|
| Lilac Whirl | `ressac-v2-lilac-whirl.glb` | 3,70 Mo | 125 340 |
| Ivory Tide | `ressac-v2-ivory-tide.glb` | 3,63 Mo | 125 340 |
| Silver Drift | `ressac-v2-silver-drift.glb` | 3,64 Mo | 125 340 |
| Noir Absolu | `ressac-v2-noir-absolu.glb` | 3,60 Mo | 125 340 |
| Crimson Flow | `ressac-v2-crimson-flow.glb` | 3,69 Mo | 125 340 |

Les 5 fichiers passent le validateur Khronos (`gltf-validator`) **sans erreur**. Il reste un seul type d'avertissement : les tangentes sont générées à l'exécution (three.js et model-viewer le font). Les fichiers utilisent `KHR_mesh_quantization` (requis) et `KHR_texture_transform`. three.js (r150 et plus) et model-viewer les gèrent nativement, sans décodeur supplémentaire.

Repère : mètres, Y vers le haut, avant vers +Z, bas du bord-côte à y = 0. **Left / Right = gauche / droite du porteur.** Left est en +X, donc à droite de l'écran en vue de face.

## Contrat des nœuds (noms exacts)
```
KYMA_Hoodie                      racine, extras (zipPath, poi, …)
├─ Body_Back                     dos + côtés (endroit + doublure), immobile
├─ Panel_Left                    demi-devant gauche (+X) — origine du nœud sur la couture de côté (x = +0,272)
│  ├─ Lining_Left                envers du demi-devant (doublure unie ton sur ton)
│  ├─ Pocket_Left                passepoil de la poche biais + fond sombre de la fente
│  └─ Zip_Teeth_Left             dents métal + ruban + butées
├─ Panel_Right                   idem côté droit (origine x = −0,272)
│  ├─ Lining_Right
│  ├─ Pocket_Right
│  └─ Zip_Teeth_Right            (porte le boîtier bas du zip)
├─ Hood_Outer                    capuche, endroit imprimé + lisière roulée de l'ouverture
├─ Hood_Inner                    doublure de capuche (jersey ton sur ton)
├─ Sleeve_Left / Sleeve_Right    manches (endroit + envers)
├─ Cuff_Left / Cuff_Right        poignets, bord-côte 2×2 de 6 cm
├─ Hem                           bord-côte de taille 2×2 de 6 cm (ouvert au milieu devant)
└─ Zip_Slider                    curseur (métal finition argentée brossée), repère local : Y = vers le haut du zip, Z = vers l'extérieur
   └─ Zip_Pull                   tirette « Kyma » en laiton doré, accrochée à l'anse (pivot = origine, axe X)
```
Matériaux : `Molleton KYMA Wave` (atlas 2048 JPEG + normal map de maille en tuile, rugosité 0,86), `Doublure jersey ton sur ton` (unie, rugosité 0,92), `Zip métal argent brossé`, `Tirette Kyma laiton doré`, `Ruban de zip`, `Fond de poche`. Ce sont les noms des fichiers **v2**. Le nom de zip du v2 contient « argent brossé » : la v3 le remplace, et c'est la v3 qui doit être téléversée.

## Morph targets (mêmes noms, même ordre, sur chaque maillage articulé)
Index : `0 open`, `1 open_fold`, `2 unzip_1`, `3 unzip_2`, `4 unzip_3`, `5 unzip_4` (noms aussi dans `mesh.extras.targetNames`, que three.js lit en `morphTargetDictionary`).
**Maillages concernés** (liste dans `extras.morphNodes`) : `Panel_*`, `Lining_*`, `Pocket_*`, `Zip_Teeth_*`, `Hood_Outer`, `Hood_Inner`, `Hem`. Il faut **toujours écrire le même poids sur tous** : ils partagent le même champ de déformation, sinon le tissu se fend.

| Morph | 0 → 1 | Usage |
|---|---|---|
| `unzip_1..4` | V d'ouverture derrière le curseur. Le sommet du V est à 25 / 50 / 75 / 100 % du zip ; l'écart en haut est de 3,4 cm par côté. | Étape 5 (la tirette descend) |
| `open` | Chaque demi-devant pivote d'environ 36° autour de la couture de côté, sans trou, et l'encolure suit. | Étape 6 (sweat ouvert) |
| `open_fold` | En complément d'`open` : les bords du zip s'enroulent vers l'extérieur comme un revers, pour montrer la doublure de face. | Étape 6, optionnel |

Pourquoi `open_fold` : une rotation autour de la couture de côté, même à 40°, laisse l'envers tourné vers l'arrière. De face, on voit l'intérieur du dos et des côtés, pas la doublure des devants. `open_fold` sert à la montrer franchement. Il s'utilise **après** `open` (open = 1), sinon il n'a pas de sens.

Progression de la tirette (s = 0 en haut, 1 en bas) :
```js
const k = 4 * s;                                   // poids des 4 étapes du V
const unzip = [1, 2, 3, 4].map(i => k >= 4 ? (i === 4 ? 1 : 0) : Math.max(0, 1 - Math.abs(k - i)));
// pendant l'ouverture : unzip_4 = 1 - open (le V disparaît dans le sweat ouvert)
```

## Extras (racine `KYMA_Hoodie`, et `zipPath` / `zipPathQuat` répétés sur `Zip_Slider`)
- `zipPath` : 41 points `[x, y, z]`, du haut (curseur fermé, sous l'encolure) jusqu'en bas (sur le boîtier), dans le repère de la racine, qui est aussi celui de `Zip_Slider`.
- `zipPathQuat` : 41 quaternions `[x, y, z, w]`, l'orientation du curseur sur le chemin.
- `sliderOpen` / `sliderOpenFold` : `{position, quaternion}` du curseur quand `open` = 1, puis quand `open` = `open_fold` = 1. Le curseur reste sur le côté droit du porteur. Il faut l'interpoler linéairement avec le poids `open` (puis `open_fold`) : cela suit exactement le morph.
- `poi` : `{target, position, fov}` en mètres pour chaque point de vue : `overview`, `hood` (capuche, extérieur), `hood_inside` (doublure), `back` (dos), `pull` (tirette, au sommet du zip), `inside_left`, `inside_right` (intérieurs, sweat ouvert).
- `morphTargets`, `morphNodes`, `unzipApex`, `animation` (découpage du clip), `left` (convention), `units`.

## Animation intégrée `ZipOpen` (6 s, linéaire)
- 0 → 3 s : le curseur descend le long de `zipPath` et le V s'ouvre (`unzip_1..4`) ;
- 3 → 5 s : `open` passe de 0 à 1, le V se résorbe et le curseur suit `sliderOpen` ;
- 5 → 6 s : `open_fold` passe de 0 à 1.
Pour le défilement, il suffit de piloter le temps de ce clip (three.js : `AnimationMixer`, `action.setLoop(THREE.LoopOnce)`, `action.clampWhenFinished = true`, `mixer.setTime(t)` ; model-viewer : `animation-name="ZipOpen"` puis `currentTime = t`, lecture en pause). Sans `LoopOnce`, t = 6 s boucle sur l'état fermé.

## Comment Sacha anime la séquence (proposition)
| Étape du défilement | Caméra (`poi`) | Pilotage |
|---|---|---|
| 1. Le sweat apparaît | `overview`, rotation lente | fondu / échelle |
| 2. Capuche, extérieur puis intérieur | `hood` → `hood_inside` | — |
| 3. Le dos | `back` | rotation Y de la racine, ou orbite |
| 4. Retour de face, zoom tirette | `pull` | — |
| 5. La tirette descend et ouvre le zip | `pull` → `overview` (la caméra suit le curseur) | `ZipOpen` de 0 à 3 s |
| 6. Ouvert : intérieur gauche puis droit | `inside_left` → `inside_right` | `ZipOpen` de 3 à 6 s |
| 7. Dézoom final | `overview` | — |
Mode manuel, sans le clip : écrire les poids sur chaque maillage de `morphNodes` (`mesh.morphTargetInfluences[dict.open] = w`), puis placer `Zip_Slider` par interpolation sur `zipPath` / `zipPathQuat`. Ne pas faire tourner `Panel_*` à la main : la rotation seule déchire l'épaule. Le morph `open` est fait pour ça.

## Éclairage conseillé
Lumière de studio diffuse (RoomEnvironment de three.js à intensité ~0,75, ou environnement « neutral » de model-viewer), une lumière principale douce en haut à droite, une ombre portée douce, le tone mapping « Neutral » et le fond **Beige #F5EDE4**. La maille ne se lit qu'en gros plan, à travers la normal map ; elle ne doit jamais briller.

## Limites — à afficher
- C'est une **représentation 3D procédurale**, pas le produit fabriqué. Le tombé du French terry, les coutures et le placement du motif diffèrent, car chaque pièce est découpée dans une zone différente du rouleau.
- Les bords-côtes sont imprimés comme sur les rendus du lookbook. En production, ils pourraient être unis : à confirmer avec le fabricant.
- La tirette reprend « Kyma » en DM Serif Display. Ce n'est pas la gravure définitive du fabricant.
- **Mention obligatoire (R1, étendue sur décision d'Arthur, proposition de Victoire)**, légende permanente en texte réel près du visualiseur : « **Modèle 3D de présentation, pas une photo du produit fabriqué. Le motif de chaque pièce est pensé pour être unique : la vôtre différera de ce modèle. Certains détails (bords-côtes, inscription de la tirette, coutures, tombé du tissu) peuvent aussi différer. Les couleurs dépendent de votre écran.** »
- Dès la confirmation du fabricant sur les bords-côtes et la tirette, on alignera le modèle ou on retirera les mentions devenues inutiles de la R1.
- **Texte alternatif des images fixes (R10)** : « Rendu 3D du hoodie Ressac, [coloris], étape [capuche / dos / tirette / zip / intérieur]. Pas une photo du produit fabriqué. »
- Les comparatifs de `shopify/3d/rendus-v3/` sont des documents de travail. Ils ne sont jamais publiés sans la mention R1.
- À remplacer ou à compléter par le shooting du produit fabriqué, après validation des préséries.
- Les anciens `ressac-<coloris>.glb` (v1) ne doivent plus être utilisés sur le site.

## Provenance des modèles v2 et v3 (note demandée par Victoire)
- **Auteur** : Izaac (agent IA de l'équipe KYMA, Claude), sur commande du fondateur, pour KYMA. Les scripts sont dans le dépôt de la marque : `shopify/3d/build_hoodie_v2.py` (09/10/2026) et `build_hoodie_v3.py` (10/10/2026).
- **Méthode** : chaque GLB est **calculé par un programme écrit pour KYMA**. Géométrie : surfaces paramétriques, offsets, profils. Motif KYMA Wave : bruit de Perlin et tourbillons. Maille, rugosité, envers gratté : bruit procédural. Occlusion : lancer de rayons. Tirette : contours vectoriels de la typo « Kyma ». Le résultat est reproductible : même script, même fichier.
- **Aucune image générée par IA** : aucune texture, photo ni maillage ne vient d'un générateur d'images ou de 3D par IA. Le code a été écrit avec l'assistance de Claude, mais aucune sortie d'un modèle génératif d'images ou de 3D n'est incluse.
- **Aucun élément tiers dans les fichiers** : aucun modèle, scan, texture ou photo acheté ou téléchargé. Les seules ressources externes sont des **outils** : Python, NumPy, SciPy, Pillow, fontTools, Shapely, mapbox-earcut, trimesh et embreex pour les calculs ; Khronos glTF-Validator pour le contrôle ; three.js et Playwright/Chromium pour les rendus de contrôle. Aucun de ces outils ne transmet de droit sur les fichiers produits.
- **Une seule réserve** : les lettres « Kyma » en relief sur la tirette reprennent les contours de **DM Serif Display** (police de la marque, paquet `@fontsource/dm-serif-display` 5.3.0, fichier `dm-serif-display-latin-400-normal.woff`, licence SIL Open Font License 1.1, qui autorise l'usage et l'incorporation dans un produit ; seuls des contours vectorisés figurent dans le maillage, la police n'est pas redistribuée). Le journal de la construction finale des 5 GLB v3 (14/10/2026) l'atteste : « police tirette : …/fontsource-dm-serif-display-5.3.0/package/files/dm-serif-display-latin-400-normal.woff ». Le repli DejaVu Serif du script **n'a pas servi**.
- **Titularité des droits sur ces fichiers** : aucun contrat de cession (travail réalisé par un agent IA sous commande du fondateur) ; point à trancher par Victoire.
- **Rendus de contrôle** (`shopify/3d/rendus-v3/`, captures comparatives v2 et v3) : vues calculées de ces mêmes GLB, sans retouche ni IA. Ce sont des documents de travail, pas des visuels de campagne, jamais publiés sans la mention R1.
