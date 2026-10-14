# Pipeline de remplacement : d'un modèle réaliste au contrat KYMA

*Izaac, 10/10/2026, revu le 14/10/2026 après relecture d'Arthur. Ce document sert le jour où le fondateur choisit un modèle réaliste. Sources : `recherche-modeles-3d.md` (Isabelle). Licences et contrats : `shopify/conformite.md` (Victoire), parties H et L.*

Aujourd'hui, le site affiche un hoodie procédural (`build_hoodie_v3.py`). Un modèle réaliste le remplace **sans toucher au thème** à une condition : respecter le contrat décrit dans `shopify/contenu/visuels-3d.md`, c'est-à-dire les mêmes noms de nœuds, les mêmes morphs, les mêmes extras et le même clip `ZipOpen`. Sacha n'a alors qu'un réglage à changer : l'URL des GLB.

## 0. Avant tout achat ou contrat : bloquant
**Durée** : le délai de réponse du vendeur ou du prestataire, **7 jours au maximum**. Sans réponse dans ce délai, le modèle passe au rouge. **La journée de conversion du § 2 ne démarre qu'après le feu vert.**

**Trois conditions cumulées** (L1) :
1. une **réponse écrite du vendeur** à la question H2 (`conformite.md`). Elle doit couvrir l'affichage WebGL, la modification et le GLB servi au navigateur ;
2. l'**accord du fondateur** ;
3. le **feu de Victoire**.

**Autres règles :**
- **Aucun achat ni contrat avant le Kbis (ST3)** : la personne qui signe s'engage personnellement tant que la société n'est pas immatriculée.
- **Modèle non généré par IA** : le vendeur ou le prestataire le confirme par écrit (direction digitale : aucune image IA).
- **Dossier de preuves (L7)**, rangé dans un dossier partagé : licence en PDF datée, facture au nom de la société, échanges avec le vendeur, captures de la page de vente.
- **Seul le GLB de production part au navigateur (L8)** : il est optimisé et vise moins de 100 000 triangles et environ 5 Mo. Les sources (projet CLO, FBX, textures 4K d'origine) ne sont jamais servies.

**Ordre de préférence :**
1. **Freelance CLO3D (recommandé)**, à partir du tech pack v3. Contrat avec la **clause H4** de cession de droits, justificatif de licence commerciale du logiciel, liste de tout élément tiers. On lui remet directement ce contrat de nœuds et de morphs, le repère et le budget (< 100 000 triangles, ≈ 5 Mo). Le pipeline se réduit alors à la retexture, l'occlusion et la validation.
2. **Achat d'un modèle**, seulement après les trois conditions. Prendre de préférence le projet CLO3D/Marvelous (patron modifiable : capuche sans cordon, poches biais, longueur), ou un FBX/OBJ/GLB en quads, avec des UV sans chevauchement et des textures séparées. Les ombres ne doivent pas être cuites dans la couleur : on recolore et on applique le motif KYMA Wave, donc des plis peints gênent.
3. **Scan** : voir le § 3, cas particulier, plus long.

## 1. Outils
| Étape | Avec Blender (≥ 3.6, `blender -b -P script.py`) | Sans Blender (machine actuelle : Python + Node) |
|---|---|---|
| Import FBX / OBJ / GLB | importeurs natifs | GLB et OBJ : `trimesh` ; FBX : conversion préalable avec `FBX2glTF` (binaire libre de Meta) |
| Nettoyage, séparation | mode édition, sélection par matériau ou par îlot | `trimesh` (composantes connexes, masques par position), `numpy` |
| Décimation | modificateur *Decimate* en gardant les bords | `gltfpack` (meshoptimizer, npm) ou `gltf-transform simplify` |
| UV | *Smart UV Project* ou UV d'origine | `xatlas` (installé) |
| Motif, maille, occlusion, morphs, clip, export | fonctions de `build_hoodie_v3.py` (§ 4) | idem |
| Validation | Khronos `gltf-validator` (npm) | idem |

Dans `build_hoodie_v3.py`, **les morphs sont des champs de déformation qui ne dépendent que de la position** : `open_field`, `fold_field` et `unzip_field`. L'occlusion (`bake_ao`), le motif (`kyma_wave`) et l'export (`GLB`, `export_glb`) travaillent aussi sur des positions. Les quatre conditions du § 4 s'appliquent néanmoins.

## 2. Déroulé : une journée, après le feu vert du § 0
| Durée | Étape | Détail | Contrôle |
|---|---|---|---|
| 0 h 30 | **Mise au repère** | Mètres, Y vers le haut, devant vers +Z, bas du bord-côte à y = 0, centré en X. Mise à l'échelle sur le guide M (poitrine 64, épaules 58, dos 70, manche 64, bas 62 cm à plat), mesurée comme dans `visuels-3d.md` (tableau des mesures). | écart ≤ 1,5 cm par cote |
| 1 h | **Nettoyage** | Supprimer cordon, œillets, étiquettes, logos, avatar ou mannequin, faces internes inutiles. Fusionner les sommets en double. Remettre les normales vers l'extérieur. | aucun élément d'une autre marque |
| 1 h | **Séparation du contrat** | Couper sur le milieu devant. Ranger les faces dans `Panel_Left` (+X, gauche du porteur), `Panel_Right`, `Body_Back`, `Sleeve_*`, `Cuff_*`, `Hem`, `Hood_Outer` / `Hood_Inner`, `Pocket_*` ; les envers vont dans `Lining_*`. Le zip d'origine est remplacé par celui du v3 (`zip_parts`, `slider_mesh`, `pull_mesh`), posé sur le milieu devant. | noms exacts (`visuels-3d.md`) |
| 1 h | **Décimation** | **Cible < 100 000 triangles** (L8) : corps et manches ~60 k, capuche ~12 k, bords-côtes ~12 k (côtes en normal map plutôt qu'en géométrie), zip ~8 k. Protéger les bords (milieu devant, ouverture de capuche, poignets) et garder les plis. | < 100 k triangles |
| 1 h | **UV** | UV d'origine si elles sont propres, sinon `xatlas`. Atlas unique de 2048 px pour le molleton. Deuxième jeu d'UV en mètres pour la maille en tuile (TEXCOORD_1). | pas de chevauchement |
| 1 h 30 | **Retexture KYMA** | La couleur d'origine n'est pas reprise. Pour chaque coloris, l'atlas est `kyma_wave` évalué sur les positions (motif tonal, jamais symétrique), avec les surpiqûres repeintes. Normal map d'origine fusionnée avec `textures-v3/knit-normal.png` ; `knit-rough.png` ; envers `fleece-normal.png` ; `KHR_materials_sheen`. Zip en métal finition argentée brossée, tirette en laiton doré brossé (base [1,00 ; 0,77 ; 0,34], rugosité 0,40). | 5 coloris |
| 1 h | **Morphs et clip** | Voir le § 4 : clés de `geo`, constantes à recaler, chemin du zip. Les 6 cibles, dans le même ordre (`open`, `open_fold`, `unzip_1..4`), sont appliquées avec les mêmes poids à tous les maillages de `morphNodes`. | ouverture sans trou |
| 0 h 30 | **Occlusion** | `bake_ao` (64 rayons, compromis 70 % ouvert / 30 % fermé) → COLOR_0, ou une texture d'occlusion d'origine propre. | intérieur de capuche sombre |
| 0 h 30 | **Poids** | `KHR_mesh_quantization`, morphs creux (*sparse*), atlas JPEG q≈84, tuiles PNG. Au-delà de 5 Mo : atlas en 1536 px. | ≤ 5 Mo par GLB |
| 0 h 30 | **Validation** | `gltf-validator` : 0 erreur. Recherche de chaînes dans le JSON : aucun nom de vendeur, aucune allégation (« plaqué », « argent », « GOTS »…). Rendus `render_three.cjs`. Test dans le récit au défilement de Sacha. | même contrat que le v2 |
| — | **Livraison** | `ressac-v4-<coloris>.glb` + note de provenance (vendeur ou prestataire, licence, date, modifications) dans `visuels-3d.md`. Relecture par Victoire. | VALIDÉ par Arthur |

## 3. Cas particuliers
- **Projet CLO3D** (freelance ou achat) : retirer le cordon et les œillets, régler l'épaule tombante et la longueur au tech pack v3, puis exporter en OBJ ou FBX *en pose*, avec épaisseur, sans avatar.
- **Scan** : les plis et les ombres sont figés dans la couleur. Il faut délumer (diviser par une occlusion recalculée) avant la retexture. Comptez une demi-journée de plus.
- **Modèle sans envers** : générer l'envers par décalage de 5 mm (méthode de `shell_from_grid`) et ajouter une lisière sur les bords visibles.

## 4. Conditions pour réutiliser les fonctions du v3 (à lire avant d'écrire le convertisseur)
1. **Chemin du zip** : il est calculé dans **`build_geometry`** (lignes 1887 à 1903 de `build_hoodie_v3.py`), pas dans `build_layout`. Pour chaque hauteur, on prend le point le plus en avant des lisières du milieu devant (`Panel_*`, première colonne) et du haut du bord-côte, puis on lisse. `build_layout` ne fait que l'échantillonner (41 points) et en déduire `zipPathQuat`, `sliderOpen*` et le clip. Pour un modèle acheté, il faut produire `geo["zip_path"]` de la même façon, à partir des arêtes du milieu devant.
2. **Clés de `geo` que `to_kyma_meshes` doit fournir** pour que `build_layout`, `bake_ao` et `export_glb` tournent :
   - `geo["zip_path"]` (N × 3, du haut vers le bas) et `geo["zip"]` (= `zip_parts(zip_path)`) ;
   - `geo["slider"]`, `geo["pull_pivot"]` (= `slider_mesh()`) et `geo["pull"]` (= `pull_mesh(police)`) ;
   - `geo["grids"]["Panel_Left"]["G"]` et `geo["grids"]["Hem"]["G"]`, que lit `fold_table` ;
   - `geo["atlas"]` et `geo["pocket_Left"]` / `geo["pocket_Right"]`, seulement si l'on réutilise `bake_atlas`. Sinon, on fournit son propre atlas, déjà cuit sur les UV du modèle.
   - Il faut aussi `nodes` (dict nom → liste de `Mesh`) pour toutes les clés de la liste de `build_layout` : `Body_Back`, `Panel_*`, `Pocket_*`, `Hood`, `Sleeve_*`, `Cuff_*`, `Hem`. Les envers vont en second élément de `Panel_*` et de `Hood`.
3. **`fold_table` suppose des nappes en grille** : elle lit `G[..., :3]` de `Panel_Left` et les 4 premières rangées de `Hem`. Pour un maillage quelconque, il faut la réécrire. Elle donne la profondeur z du devant en fonction de y, à x = `XG + FOLD_W`, et peut se calculer par échantillonnage des sommets proches de cette verticale.
4. **Constantes à recaler** sur le nouveau modèle, car les champs d'ouverture et de V s'en servent :
   - `PIVOT_X`, la couture de côté (axe d'ouverture) ;
   - `FOLD_W`, la largeur du revers ;
   - `XG`, le demi-écart des lisières au milieu devant ;
   - `NW`, la demi-largeur d'encolure ;
   - `Y_SNP`, la hauteur du point d'encolure côté ;
   - `Y_SP` et `W_SH`, le point d'épaule. `shoulder_y` s'en sert pour annuler l'ouverture sur l'épaule.

   Sans ce recalage, l'ouverture déchire l'épaule ou laisse un trou à l'encolure.

## 5. Squelette du convertisseur (à écrire après le feu vert)
```python
import trimesh, numpy as np, build_hoodie_v3 as K          # même dossier
K.PIVOT_X, K.FOLD_W, K.XG, K.NW, K.Y_SNP, K.Y_SP, K.W_SH = mesures_du_modele()   # § 4.4
src = trimesh.load("modele.glb", force="scene")             # FBX -> FBX2glTF d'abord
parts = split_by_contract(src)                              # dict nom -> trimesh (masques par position)
geo, nodes = to_kyma_meshes(parts)                          # clés du § 4.2, zip_path comme au § 4.1
layout = build_layout_maillage(geo, nodes)                  # K.build_layout avec fold_table réécrite (§ 4.3)
K.bake_ao(layout)
tiles = {"knit_normal": K.knit_normal_tile(), "knit_rough": K.knit_roughness_tile(), "fleece_normal": K.fleece_normal_tile()}
for c, col in K.COLORIS.items():
    K.export_glb(f"ressac-v4-{c}.glb", col, geo, layout, bake_atlas_from_uv(geo, col), tiles)
```
Les fonctions qui ne commencent pas par `K.` (`mesures_du_modele`, `split_by_contract`, `to_kyma_meshes`, `build_layout_maillage`, `bake_atlas_from_uv`) dépendent du modèle reçu. Ce sont elles qui occupent l'essentiel de la journée.
