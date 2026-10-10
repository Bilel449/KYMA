# Brief Spline — scène « KYMA Wave » (pour le fondateur ou un designer 3D)

> Objectif : créer dans **Spline** (app.spline.design) la scène 3D officielle de KYMA, puis la coller dans la section
> **« KYMA — Scène Spline »** du thème Shopify. Tant que la scène n'existe pas, le site affiche la 3D maison
> (`kyma-3d.js`, WebGL natif) : rien ne casse si ce guide n'est pas suivi tout de suite.
> Règles de marque : **aucune image générée par IA**, motif **toujours tonal** (deux nuances proches), mouvement
> **lent, fluide, organique** (jamais de rebond ni de clignotement). Palette du site : beige, marron clair, rose clair, brun foncé.

## 1. Préparer le fichier
1. Se connecter sur app.spline.design → **New File** → **Blank**.
2. Nommer le fichier `KYMA — Wave — v1`.
3. Panneau de droite, onglet **Scene** :
   - **Background** : `#F5EDE4` (beige KYMA), opacité 100 %. C'est la couleur exacte du site : le cadre doit être invisible.
   - **Fog** : désactivé.
   - **Shadows** : **Soft**, qualité « High ».

## 2. Caméra et lumière (lumière de studio)
| Élément | Réglage |
|---|---|
| Caméra | Perspective, focale ~ 35 mm (FOV 45°), position `(0, 60, 520)`, regarde `(0, 0, 0)`. Désactiver « Orbit » pour le visiteur (l'objet bouge, pas la caméra). |
| Lumière principale | **Directional**, couleur `#FFF7EE`, intensité 1,1, en haut à gauche et devant (`-300, 420, 300`), ombres activées, adoucissement (Shadow Radius) 12–16. |
| Contre-jour | **Directional**, couleur `#E9ECF5`, intensité 0,45, derrière à droite (`400, 120, -380`), sans ombre. |
| Ambiance | **Ambient** ou **Hemisphere** : ciel `#F5EDE4`, sol `#E8D9CC`, intensité 0,5. |
| Sol | Un **Plane** de 4000 × 4000 à `y = -160`, matériau **Shadow Only** (ou couleur `#F5EDE4`, mat) : on ne doit voir que l'ombre douce sous l'objet. |

## 3. L'objet héros « La Vague »
1. **Shapes → Torus** : rayon 110, épaisseur (Tube) 45, segments 128 / 64.
2. Panneau **Deform** (ou modificateur *Twist* + *Noise* selon la version) :
   - **Twist** : 270° sur l'axe Y (un tour et demi) ;
   - **Noise / Displace** : amplitude 12–18, échelle 0,8, **animé** (vitesse lente : 0,1–0,15) ;
   - aplatir légèrement la section (Scale Y = 0,55) pour obtenir un ruban épais et torsadé.
3. Ajouter une **Sphere** (rayon 55) qui suit le pourtour de l'anneau et la fusionner avec l'anneau
   (**Boolean → Union** avec *Smooth* 30–40, ou un *Metaball* si disponible) : c'est la « crête » qui voyage.
4. Rotation de départ : `X = 25°, Z = 10°`.

## 4. Matériau « argile / satin » + motif KYMA Wave
Créer un matériau en **couches** (Material → Layers) :
| Couche | Réglage |
|---|---|
| **Color** (base) | Teinte claire du coloris (voir tableau ci-dessous, colonne B). |
| **Noise** (le motif) | Type **Simplex / Fractal**, échelle 0,6–0,9, *Movement* lent (0,05), couleur A du coloris, mode *Normal*, opacité 75–85 %, **Warp / Distortion** ≈ 0,6 pour obtenir des volutes. |
| **Noise** (veines) | Même bruit, échelle ×3, seuil fin (Contrast élevé) pour des filets, couleur « veines », opacité 30–40 %. |
| **Lighting** | Modèle **Physical**, Roughness 0,45 (satin), Metalness 0, Reflectivity 0,2. |
| **Fresnel** | Couleur `#F5EDE4`, intensité 0,35, bias 0,1 : léger halo sur les bords. |

Coloris (états à créer, voir §5) — valeurs exactes :
| État | A (motif) | B (base) | Veines |
|---|---|---|---|
| `kyma` (défaut du site) | `#E8C4C4` rose clair | `#F5EDE4` beige | `#C19E86` marron clair |
| `lilac-whirl` | `#C8A2C8` | `#F5EDE4` | mélange A/B, 30 % plus sombre |
| `ivory-tide` | `#E8E0D8` | `#C5BFB8` | idem |
| `silver-drift` | `#8E9EAB` | `#C8CDD2` | idem |
| `noir-absolu` | `#1A1A1A` | `#3A3A4A` | idem |
| `crimson-flow` | `#5C2032` | `#C4878E` | idem |

## 5. États et interactions
1. Sélectionner l'objet → panneau **States** → **+** : créer un état par coloris (`kyma`, `lilac-whirl`, …) où seules les
   couleurs du matériau changent. Transition : **1,2 s**, easing **Ease In Out** (jamais « Spring » ni « Bounce »).
2. **Respiration** (événement *Start*) : animation en boucle entre l'état de base et un état « respire » (échelle 1,03,
   rotation Y +6°), durée 4 s, *Ping-pong*, Ease In Out.
3. **Suivi de la souris** : événement **Mouse Hover** sur la scène → action **Look At** (ou *Follow*) sur l'objet,
   amplitude faible (15–20°), *Damping / Smoothness* élevé (0,9) pour l'inertie.
4. **Survol de l'objet** : événement **Mouse Hover** sur l'objet → état « survol » (Noise amplitude +8, échelle 1,04), 0,6 s.
5. **Défilement** : événement **Scroll** (Scene → Events → Scroll) → transition de l'état de base vers un état
   « défilé » (rotation X +30°, caméra reculée de 15 %, Twist 360°). Activer *Scroll-linked* pour que la progression suive
   la page.
6. Option : un bouton par coloris peut appeler les états via l'API Spline (`spline.setVariable` / `emitEvent`) ;
   le site actuel synchronise déjà ses propres coloris sur la 3D maison, ce n'est pas indispensable.

## 6. Performance et accessibilité
- Garder le fichier léger : **< 2 Mo** à l'export, pas de texture image (le motif doit venir des couches Noise),
  segments raisonnables (128 × 64 max).
- Aucun texte essentiel dans la scène : tout le contenu reste en HTML sur le site.
- Prévoir un état statique propre (première image) : les visiteurs en « mouvement réduit » doivent voir une image nette.

## 7. Export et intégration
1. En haut à droite : **Export** → **Code Export** → **Web Content / Viewer** → bouton **Generate / Update Public URL**.
2. Copier l'URL qui se termine par **`.splinecode`** (forme `https://prod.spline.design/XXXXXXXX/scene.splinecode`).
3. Shopify → **Boutique en ligne → Thèmes → Personnaliser** → page d'accueil → **Ajouter une section →
   « KYMA — Scène Spline »** → coller l'URL dans **« URL de la scène Spline (.splinecode) »** → Enregistrer.
4. La section charge alors `<spline-viewer>` (module `@splinetool/viewer@1.9.82` depuis unpkg) **uniquement** si l'URL est
   remplie. Si le lecteur ne se charge pas en 8 s (réseau, bloqueur), la section bascule seule sur la 3D maison.
5. Vérifier sur ordinateur **et** sur téléphone : fluidité, ombre douce, couleurs exactes, rien ne déborde.

> ⚠️ **Non testé ici** : l'environnement de développement bloque spline.design et unpkg. Le chemin Spline (chargement du
> lecteur, rendu de la scène, interactions) doit être validé dans l'aperçu Shopify après l'étape 3. Le repli kyma-3d,
> lui, est testé.
> RGPD : le lecteur Spline est chargé depuis un domaine tiers (unpkg / Spline). À signaler à Victoire pour la politique
> de cookies / confidentialité avant activation.
