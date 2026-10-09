# Recherche — modèles 3D réalistes de hoodie zippé (Isabelle, 09/10/2026)

> Pour Izaac (qualité technique) et Victoire (licences). Aucun achat avant ce triple filtre et l'accord du fondateur.

## Limites
- Les pages des marketplaces n'ont pas pu être ouvertes (erreur DNS sur WebFetch) : tout vient d'extraits de résultats de recherche. Prix ou licences manquants = « non trouvé ». Rien n'est inventé.
- Fab, Sketchfab Store, CLO-SET Connect : aucun modèle correspondant confirmé.
- Aucun modèle trouvé ne coche toutes les cases (oversize + zip intégral + capuche sans cordon + poches biais + GLB + < 100k triangles). Capuche sans cordon et poches biais : à vérifier visuellement sur chaque fiche.

## 1. Modèles identifiés
| # | Modèle | Plateforme | Prix | Formats | Géométrie | Licence | Remarques |
|---|---|---|---|---|---|---|---|
| 1 | Oversized Hoodie (polygonal-miniatures) — https://www.renderhub.com/polygonal-miniatures/oversized-hoodie | RenderHub | non trouvé | FBX, **GLB**, OBJ, blend | 70 486 polygones (triangles à recompter) ; diffuse + normal 4K | non trouvée | Photogrammétrie (ZBrush) : plis et ombres figés dans la texture → recoloris difficile ; zip devant non séparé |
| 2 | Zip Hoodie Wash (Clothing Axis) — https://www.renderhub.com/clothing-axis/zip-hoodie-wash | RenderHub | non trouvé | **projet CLO3D/Marvelous (ZPRJ)**, blend, OBJ, FBX, **GLB**, USD, DXF | 300 000 polygones (trop lourd : décimation/retopo) ; UV sans chevauchement | Extended Use | Patron modifiable via le projet CLO ; oversize non confirmé |
| 3 | Ultimate Oversized Zip Hoodie CLO 3D — https://www.cgtrader.com/3d-models/character/clothing/ultimate-oversized-zip-hoodie-clo-3d | CGTrader | 6 $ | FBX (~69,5 Mo), projet CLO/Marvelous (~76 Mo) ; pas de GLB | high poly, textures 4K, UV prêtes, pose A | « Custom License » à lire | Seul « oversized + zip » explicite ; aucun avis |
| 4 | Hoodie Zip Generic (Frezzy) — https://www.renderhub.com/frezzy/hoodie-zip-generic · https://superhivemarket.com/products/hoodie-zip-generic | RenderHub / Superhive | 27 $ (Superhive) | FBX, OBJ, Blender, Max, Maya, C4D ; pas de GLB | non trouvée (repère : « Hoodie Generic Black » du même vendeur = 37 293 polygones) | Extended Use (RenderHub) | Oversize non confirmé |
| 5 | Hoodies zippés Clothing Axis (ex. « Too Much Swag », « Girls Zipper Hoodie Red » 360 000 polygones) | RenderHub / Superhive | ~7,49–9,99 $ (Superhive, autres produits) | CLO3D, très haute densité | trop lourds tels quels | Royalty Free (Superhive) | Même famille que le n° 2 |
| 6 | Hoodie (CG StudioX) — https://marketplace.reallusion.com/hoodie-438125 | Reallusion | non trouvé | Character Creator / iClone (pas de glTF natif) | 2 342 polygones, PBR 4K | non trouvée | Seul vrai low-poly ; zip et oversize non confirmés |
| 7 | ~~Stussy Zip Hoodie Low Poly PBR~~ — https://www.renderhub.com/3dog-artist/stussy-zip-hoodie-low-poly-pbr | RenderHub | — | MAX, FBX, OBJ | 132 884 polygones | **Editorial Use Only** (marque tierce) | **À écarter** |

Prestation sur mesure : BinaryCloth (https://binarycloth.com/product/high-fidelity-3d-hoodie-model/) — à partir de 39 $ par vêtement, GLB/USDZ sur demande ; licence non trouvée.
Pistes sans résultat vérifié : fiches Fab (fab.com/listings/043c8ff3-c703-4a8f-ac17-76f0691a0f77 veste zippée high-poly avec glTF + projet CLO ; fab.com/listings/5968c437-87fb-4b40-a36a-ec6dbf38834a sweat zippé MetaHuman FBX), TurboSquid (rien de zippé), Sketchfab (seulement un sweat à cordon CC-BY), Artstation (hoodies CLO3D 3,89 $ licence standard / 25,89 $ extended, https://www.artstation.com/a/31421904).

## 2. Licences (site e-commerce, GLB téléchargeable par le navigateur)
Point critique commun : une page WebGL envoie le fichier au navigateur, donc le visiteur peut le récupérer ; la plupart des licences « royalty free » interdisent la redistribution du fichier brut.
- **CGTrader Royalty Free** — risque élevé : droit « strictly limited to Incorporated Product » ; le modèle ne doit pas être récupérable seul ; exemples conformes = rendus, vidéos. Un viewer WebGL n'est pas clairement couvert. https://help.cgtrader.com/hc/en-us/articles/360015124437
- **TurboSquid Royalty Free** — risque élevé : distribution autorisée seulement dans un format propriétaire non extractible ; un GLB brut est un format ouvert. https://www.turbosquid.com/licensing · https://www.turbosquid.com/help/en/articles/9937423-royalty-free-license-faq
- **Sketchfab Store** — Standard : commercial, tous médias, dérivés ; Editorial : exclu pour un site marchand. Redistribution comme asset autonome non autorisée (source secondaire). L'embed du viewer Sketchfab évite de servir le GLB depuis notre site, mais sans retexture libre. https://help.sketchfab.com/en/articles/16152225-store-license-usage-faq
- **Fab Standard** — distribution commerciale de projets intégrant l'asset, pas de l'asset seul ; aucune clause « web / temps réel » trouvée. https://www.fab.com/legal
- **RenderHub Extended Use** — usage commercial « dans divers médias et applications » ; texte complet non lu ; « IP Restricted » = éditorial seulement. https://renderhub.com/info/3d-content-licensing

## 3. Coûts alternatifs
- Freelance CLO3D (repères dispersés, non vérifiés) : Malt ~180 €/jour (profil débutant), Fiverr ~20 $/h ou 250 $ en 3–4 jours, ComeUp ~120 $ ; projet de configurateur web GLB à zones séparées budgété 1 000–10 000 € (Codeur.com). L'optimisation temps réel (retopo, bake, GLB) est à préciser dans le devis.
- Scan 3D à Paris : aucun prestataire ni tarif fiable trouvé. Les scans ont des ombres cuites et des plis permanents (gênant pour recolorer).

## Recommandation factuelle
- **A.** Zip Hoodie Wash (Clothing Axis, RenderHub) ou Ultimate Oversized Zip Hoodie (CGTrader, 6 $) : projet CLO3D fourni → patron modifiable (oversize, capuche sans cordon, poches biais). Prévoir retopo/bake/export GLB pour tenir < 100k triangles et 5 Mo.
- **B.** Oversized Hoodie (polygonal-miniatures) : déjà en GLB, < 100k polygones, réaliste, mais recoloris difficile ; prix et licence à vérifier.
- Alternative : freelance CLO3D à partir du tech pack v3, avec clause de cession des droits au contrat.

## Points de vigilance licence (à valider par Victoire)
1. GLB téléchargeable par tout visiteur : demander au vendeur une confirmation écrite couvrant l'affichage web interactif avant d'acheter.
2. Exclure toute licence « Editorial ».
3. Extended (RenderHub) : plus large, texte web temps réel non lu.
4. Mitigation : licence écrite, ou modèle retravaillé avec preuve de licence conservée, ou commande sur mesure.
5. Aucun avis juridique : lecture d'extraits à confirmer sur les textes complets.
