# Pipeline de remplacement — d'un modèle acheté au contrat KYMA en une journée

*Izaac, 10/10/2026. Pour le jour où le fondateur choisit un modèle réaliste (achat, freelance CLO3D ou scan). Sources possibles : `recherche-modeles-3d.md` (Isabelle). Licences : `shopify/conformite.md` (Victoire).*

Aujourd'hui, le site affiche un hoodie procédural (`build_hoodie_v3.py`). Un modèle acheté le remplace **sans toucher au thème**, s'il respecte le contrat décrit dans `shopify/contenu/visuels-3d.md` : mêmes noms de nœuds, mêmes morphs, mêmes extras, même clip `ZipOpen`. Sacha n'a alors qu'un fichier à changer.

## 0. Avant d'acheter (½ h, bloquant)
- **Licence** : il faut une licence commerciale qui couvre un **GLB servi au navigateur** (le visiteur peut récupérer le fichier). Victoire valide par écrit, sinon on n'achète pas. « Editorial only » et marque tierce sont exclus.
- **Fichier** : prendre de préférence le projet CLO3D/Marvelous (patron modifiable : capuche sans cordon, poches biais, longueur) ou un FBX/OBJ/GLB en quads, UV sans chevauchement, textures séparées (couleur / normale), **sans ombres cuites dans la couleur**. On recolore et on applique le motif KYMA Wave, donc les plis peints dans la texture sont à éviter.
- **Forme** : zip intégral, oversize, épaule tombante. Ce qui manque (cordon, œillets, logo d'une autre marque) se retire en nettoyage, mais il faut le savoir avant d'acheter.

## 1. Outils
| Étape | Avec Blender (≥ 3.6, en ligne de commande : `blender -b -P script.py`) | Sans Blender (machine actuelle : Python + Node) |
|---|---|---|
| Import FBX/OBJ/GLB | importeurs natifs | GLB/OBJ : `trimesh` ; FBX : conversion préalable (`FBX2glTF` de Meta, binaire libre) |
| Nettoyage, séparation | mode édition, sélection par matériau / par îlot | `trimesh` (composantes connexes, masques par position), `numpy` |
| Décimation | modificateur *Decimate* (collapse) en gardant les bords | `gltfpack` (meshoptimizer, npm) ou `gltf-transform simplify` |
| UV | *Smart UV Project* ou UV d'origine | `xatlas` (installé) |
| Motif, maille, occlusion, morphs, clip, export | voir § 4 : on réutilise les fonctions du `build_hoodie_v3.py` | idem |
| Validation | Khronos `gltf-validator` (npm) | idem |

Le plus important : dans `build_hoodie_v3.py`, **les morphs sont des champs de déformation qui ne dépendent que de la position** (`open_field`, `fold_field`, `unzip_field`). Ils s'appliquent donc à n'importe quel maillage placé dans notre repère, comme l'occlusion (`bake_ao`), le motif (`kyma_wave`) et l'export GLB (`GLB`, `export_glb`). Le pipeline consiste à remplacer la géométrie, puis à rejouer la fin du script.

## 2. Déroulé (≈ 1 journée)
| Heure | Étape | Détail | Contrôle |
|---|---|---|---|
| 0 h 30 | **Mise au repère** | Mètres, Y vers le haut, devant vers +Z, bas du bord-côte à y = 0. Centrer en X. Mettre à l'échelle sur la longueur dos de la taille M (70 cm) et la largeur de poitrine (64 cm à plat). | bounding box ≈ celle du v3 |
| 1 h | **Nettoyage** | Supprimer cordon, œillets, étiquettes, logos, avatar ou mannequin, faces internes inutiles. Fusionner les sommets en double. Recalculer les normales vers l'extérieur. | aucun élément d'une autre marque |
| 1 h | **Séparation du contrat** | Couper sur le milieu devant. Ranger les faces dans `Panel_Left` (+X, gauche du porteur), `Panel_Right`, `Body_Back` (dos + côtés), `Sleeve_*`, `Cuff_*`, `Hem`, `Hood_Outer` / `Hood_Inner`, `Pocket_*`. Le zip d'origine, s'il existe, est remplacé par celui du v3 (`zip_parts`, `slider_mesh`, `pull_mesh` : dents, curseur, tirette « Kyma ») posé sur le chemin du milieu devant. Les envers vont dans `Lining_*`. | noms exacts (liste dans `visuels-3d.md`) |
| 1 h | **Décimation** | Viser ≤ 120 000 triangles au total : corps et manches ~70 k, capuche ~15 k, bords-côtes ~15 k, zip ~10 k. Protéger les bords (milieu devant, ouverture de capuche, poignets) et ne pas aplatir les plis. | ≤ 150 k triangles |
| 1 h | **UV** | Garder les UV d'origine si elles sont propres. Sinon, `xatlas`, avec un atlas unique de 2048 px pour le molleton. Deuxième jeu d'UV en mètres pour la maille en tuile (TEXCOORD_1), comme dans le v3 (`arc_coords` ou projection locale). | pas de chevauchement |
| 1 h 30 | **Retexture KYMA** | Ne pas reprendre la couleur d'origine. Pour chaque coloris : atlas = `kyma_wave` évalué en 3D sur les positions (motif tonal, jamais symétrique), avec les surpiqûres repeintes le long des coutures. Normal map d'origine fusionnée avec la maille `textures-v3/knit-normal.png` ; rugosité `knit-rough.png` ; envers `fleece-normal.png` ; `KHR_materials_sheen`. Zip argent brossé, tirette laiton plaqué or brossé. | 5 coloris |
| 1 h | **Morphs et clip** | Appliquer `open_field`, `fold_field` et `unzip_field` aux sommets des maillages de `morphNodes` (mêmes poids partout), avec les 6 cibles dans le même ordre : `open`, `open_fold`, `unzip_1..4`. Recalculer `zipPath` / `zipPathQuat` sur le nouveau milieu devant (`build_layout`), puis `sliderOpen*`, `poi` et le clip `ZipOpen` de 6 s (`export_glb`). Ajuster `PIVOT_X` (couture de côté) et `FOLD_W` à la nouvelle largeur. | ouverture sans trou |
| 0 h 30 | **Occlusion** | `bake_ao` (64 rayons, états fermé + ouvert) → COLOR_0. Une texture d'occlusion d'origine propre peut la remplacer. | intérieur de capuche sombre |
| 0 h 30 | **Poids** | `KHR_mesh_quantization` (normales int8, UV uint16), morphs creux (*sparse*), atlas en JPEG q≈84, tuiles en PNG. Si un fichier dépasse 5 Mo, passer l'atlas en 1536 px ou réduire la décimation. | ≤ 5 Mo par GLB |
| 0 h 30 | **Validation** | `gltf-validator` : 0 erreur. Rendus de contrôle `render_three.cjs` (face, dos, 3/4, capuche, zip ouvert). Test dans le récit au défilement de Sacha (aperçu local du thème). | même contrat que le v2 |
| — | **Livraison** | `ressac-v4-<coloris>.glb` + note de provenance (vendeur, licence, date, modifications) dans `visuels-3d.md` ; Victoire relit. | VALIDÉ par Arthur |

## 3. Cas particuliers
- **Projet CLO3D fourni** : avant l'export, retirer le cordon et les œillets, régler l'épaule tombante et la longueur au tech pack v3, puis exporter en OBJ ou FBX *en pose*, avec épaisseur, sans avatar. La qualité de drapé dépasse alors largement celle du procédural.
- **Scan** : les plis et les ombres sont figés dans la couleur. Il faut délumer (diviser la couleur par une occlusion recalculée) avant la retexture, sinon les volutes KYMA porteront de fausses ombres. Comptez une demi-journée de plus.
- **Modèle sans envers** (surface simple) : générer l'envers par décalage de 5 mm (`shell_from_grid` montre la méthode) et ajouter une lisière sur les bords visibles.
- **Freelance** : demander directement ce contrat, c'est-à-dire la liste des nœuds et des morphs, le repère et le budget. Le pipeline se réduit alors à la retexture, l'occlusion et la validation.

## 4. Squelette du script de conversion (à écrire le jour J)
```python
import trimesh, numpy as np, build_hoodie_v3 as K          # même dossier
src = trimesh.load("achat.glb", force="scene")              # ou OBJ ; FBX -> FBX2glTF d'abord
parts = split_by_contract(src)                              # dict nom -> trimesh (à écrire : masques par position)
geo, nodes = to_kyma_meshes(parts)                          # K.Mesh(V, F, matériau, UV0, UV1, N) par nœud
layout = K.build_layout(geo, nodes)                         # morphs, zipPath, sliderOpen, clip
K.bake_ao(layout)
tiles = {"knit_normal": K.knit_normal_tile(), "knit_rough": K.knit_roughness_tile(), "fleece_normal": K.fleece_normal_tile()}
for c, col in K.COLORIS.items():
    K.export_glb(f"ressac-v4-{c}.glb", col, geo, layout, bake_atlas_from_uv(geo, col), tiles)
```
Les deux fonctions marquées « à écrire » (`split_by_contract`, `bake_atlas_from_uv`) dépendent du modèle acheté. Ce sont elles qui occupent l'essentiel de la journée.
