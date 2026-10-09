# Visuels 3D — hoodie zippé « Ressac » (Drop 1)

*Izaac, direction créative. v2 du 09/10/2026 : remplace les modèles v1 (`ressac-<coloris>.glb`, SDF), rejetés par le fondateur (« on dirait un cube »).*
*Fichiers : `shopify/3d/ressac-v2-<coloris>.glb` (5 coloris) ; script `shopify/3d/build_hoodie_v2.py`.*

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
└─ Zip_Slider                    curseur (métal argent brossé), repère local : Y = vers le haut du zip, Z = vers l'extérieur
   └─ Zip_Pull                   tirette « Kyma » en laiton doré, accrochée à l'anse (pivot = origine, axe X)
```
Matériaux : `Molleton KYMA Wave` (atlas 2048 JPEG + normal map de maille en tuile, rugosité 0,86), `Doublure jersey ton sur ton` (unie, rugosité 0,92), `Zip métal argent brossé`, `Tirette Kyma laiton doré`, `Ruban de zip`, `Fond de poche`.

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
- **Mention obligatoire** près du visualiseur et dans le texte alternatif : « *Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.* » (formule unique du site, à valider par Victoire).
- À remplacer ou à compléter par le shooting du produit fabriqué, après validation des préséries.
- Les anciens `ressac-<coloris>.glb` (v1) ne doivent plus être utilisés sur le site.
