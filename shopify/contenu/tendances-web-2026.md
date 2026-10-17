# Tendances web 2026 — motion design & 3D interactive

> Recherche : **Isabelle** (08/10/2026), pour Maya et le fondateur. Factuel, sans recommandation créative.
> Limites : plusieurs sites (Awwwards, web.dev, help.shopify.com…) n'ont pu être lus qu'en extraits de recherche. Les listes de tendances viennent surtout de blogs d'agences : une direction, pas une mesure. Aucune statistique de conversion sans source primaire n'est reprise.

## 1. Les 5 tendances les plus citées
1. **3D interactive temps réel / design « spatial »** — éléments 3D qui réagissent au scroll, au curseur, à l'inclinaison ; couches en profondeur à vitesses différentes. Spline et Unicorn Studio cités comme outils qui démocratisent la 3D. [Graphic Design Junction, 12/2025] [Coalition Technologies, 2026] [Designmodo, 2026]
2. **Défilement narratif (scrollytelling)** — animations déclenchées au scroll qui révèlent et rythment le contenu. [Bellaworks, 2026] [Tinyfrog, 2026]
3. **Typographie cinétique / titres surdimensionnés** — l'effet tient au mouvement plus qu'à la taille ; à réserver au hero et aux messages clés. [Bellaworks, 2026]
4. **Micro-interactions conçues en système** — états survol / focus / actif / chargement / erreur / succès, avec des « tokens » de mouvement communs (durée, easing, amplitude). [StudioMeyer, 2026] [Bellaworks, 2026]
5. **Texture tactile & grain** (réaction au rendu « IA » trop lisse) — grain CSS / SVG feTurbulence ou PNG à 15–30 % d'opacité ; préférer CSS/SVG léger aux images lourdes. [Fireart, 2026] [Coalition Technologies, 2026]

Secondaires : curseurs custom (avec parcimonie), transitions de page fluides (seulement si elles aident à comprendre le changement de page), navigation en profondeur (couches, parallaxe). Rien de solide trouvé sur le « claymorphism » en 2026.

## 2. Sites de référence mode / streetwear
Aucun palmarès 2025-2026 dédié à la mode trouvé (FWA, CSSDA, Godly, Siteinspire). Les sites « à vérifier » ne sont pas confirmés.

| # | Site | Ce qui le distingue | Statut / source |
|---|---|---|---|
| 1 | Max Mara « Jacket Circle » (Adoratorio) | Site de marque de luxe primé | SOTD 16/04/2026, à vérifier [Awwwards] |
| 2 | Lacoste « Ace Breaker » (Merci-Michel) | Casse-briques jouable, gains Roland-Garros | SOTD + Developer Award, date à vérifier [Awwwards] |
| 3 | Miu Miu « A House that we shaped » | Catégorie Fashion | Sources contradictoires, non confirmé [Awwwards] |
| 4 | FILA North America (Your Majesty) | Minimal, effets révélés progressivement | SOTD selon l'agence ; 36 % de clics vers l'e-shop (auto-déclaré) [Your Majesty] |
| 5 | KidSuper World (basement.studio) | Expérience 3D immersive, WebGL + shaders | Prix non précisé [Creativepool] |
| 6 | GLITCHWEAR Custom Studio | Création d'une chemise « glitch » unique en WebGL / Three.js | Nominé 29/05/2026 [Awwwards] |
| 7 | Denim Tears (Kamp Grizzly) | Collage, grille abstraite, page produit « musée », objets 3D ; Hydrogen | Étude de cas Shopify |
| 8 | Patta × Tommy Hilfiger | Headless, 15 000+ visiteurs simultanés | Auto-déclaré [Shopify] |
| 9 | Aimé Leon Dore | « Digital Archive », navigation minimale | Source secondaire |
| 10 | Jacquemus | Site-univers, l'image avant le produit | Roundup d'agence [KrishaWeb, 24/04/2026] |

Références historiques 3D produit : adidas Originals Ozweego 2048 (SOTD 2019), G-Star Elwood (SOTD 2017).

## 3. Faisabilité sur Shopify
1. **3D produit natif (GLB/USDZ)** : jusqu'à 500 Mo (optimisation auto au-delà de 15 Mo) ; Shopify génère GLB + USDZ (AR iOS). Recommandation Partners : ≤ 4 Mo, textures ≤ 2048 px. Le viewer model-viewer s'active à l'upload sur un thème OS 2.0 ; lié à la section produit (difficile à réutiliser en accueil). [Shopify Help] [Shopify Partners checklist 3D] [Shopify Community]
2. **Spline sur thème Liquid** : export « Spline Viewer » puis section « Custom Liquid » ; le web component capte souris et scroll de la page. Spline recommande ≤ 3 embeds par page, lazy-loading, compression « Performance ». Matériaux three.js custom non pris en charge ; un fil signale un mauvais redimensionnement mobile ; filigrane selon le forfait (à vérifier). [Spline Docs]
3. **Headless (Hydrogen + Oxygen)** : cas Denim Tears, Patta, Carhartt WIP (auto-déclarés). Oxygen indisponible sur certains plans (à vérifier pour le plan d'essai). Coût estimé 3–5× un thème Liquid (sources d'agences). [Weaverse] [Ringly] [Eseospace, 2026]
4. **Performance** : seule donnée Shopify (09/2023, « directionnelle ») — CWV réussis ~59,5 % Liquid vs ~35 % Hydrogen. Le goulot habituel = apps et scripts tiers. Budget de référence Shopify : JS < 150 Ko, CSS < 40 Ko (min+gzip). [Weaverse citant Shopify] [Shopify Partners Blog]

## 4. Performance & accessibilité
- **Core Web Vitals** (75e percentile) : LCP ≤ 2,5 s ; INP ≤ 200 ms ; CLS ≤ 0,1. Pas de changement de seuil en 2026. [web.dev] [Google Search Central]
- **prefers-reduced-motion** : techniques W3C C39 (CSS) et SCR40 (JS) ; l'accès au contenu ne doit jamais être bloqué. WCAG 2.3.3 (AAA) ; contenus qui bougent seuls : SC 2.2.2 « Pause, Stop, Hide » (niveau à vérifier). [W3C]
- Animer `transform`/`opacity` plutôt que la mise en page ; laisser l'utilisateur mettre le mouvement en pause. [Bellaworks, 2026]

## 5. À vérifier
Dates/prix Awwwards (Lacoste, Miu Miu, Max Mara) · Oxygen sur le plan d'essai · ModelViewer Hydrogen · filigrane Spline selon le forfait.

## Sources
bellaworksweb.com/website-design-trends-2026 · studiomeyer.io/en/blog/webdesign-trends-2026 · graphicdesignjunction.com/2025/12/web-design-trends-of-2026 · coalitiontechnologies.com/blog/2026-web-design-trends · fireart.studio/blog/the-best-web-design-trends · designmodo.com/web-design-trends · krishaweb.com/blog/best-fashion-website-designs · limely.co.uk/blog/top-15-fashion-ecommerce-websites · awwwards.com/websites/fashion · yourmajesty.co/work/fila · creativepool.com/basementstudio/projects/kidsuper-world-for-kidsuper · shopify.com/case-studies/denim-tears · shopify.com/case-studies/patta-tommy-hilfiger · help.shopify.com/partners/resources/creating-3d-models/3d-model-standards-checklist · docs.spline.design/integrations/integrating-with-shopify · studio.weaverse.io/blogs/speed-performance-liquid-vs-hydrogen · shopify.com/partners/blog/narrative-web-performance · web.dev/articles/vitals · w3.org/WAI/WCAG22/Techniques/css/C39
