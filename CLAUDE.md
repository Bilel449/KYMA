# Équipe KYMA — mémoire projet

Ce dépôt contient l'équipe IA de la marque **KYMA**.

## La marque
KYMA (prononcé « Kouma ») — streetwear unisexe. Slogan : « L'art du flow ». Univers : le mouvement perpétuel des vagues.
- **Référentiel complet : `brand/BRAND.md`** (charte, produit, tailles, points à arbitrer). Documents originaux et visuels : `brand/private/` (non versionné — dépôt public, documents confidentiels).
- **Couleurs principales (décision 08/10/2026)** : Beige #F5EDE4, Marron clair #C19E86, Rose clair #E8C4C4 (+ texte Brun #4A3B32). Le lilas n'est plus qu'un coloris produit. Typos DM Serif Display + Outfit.
- **Direction digitale** : aucune image IA ; référence motion = Spline (3D douce, interactive, défilement).
- **Instagram** : @kymasinsta. **Fidélité** : Cercle Waves — INITIUM (12,99 €/trimestre) / MAJESTÉ (39,99 €/trimestre), abonnement.
- **Drop 1 (tech pack v3)** : hoodie zippé oversize, 179 € — Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow.
- **Boutique Shopify** : kymas-store.myshopify.com (plan d'essai).

## L'équipe (sous-agents dans `.claude/agents/`)

| Agent | Rôle | Tools |
|---|---|---|
| **clementine** | Sous-manageuse — cadre la mission, étapes, aiguillage Izaac/Maya | Read, Write |
| **izaac** | Création produit & DA — drops, naming, concepts visuels | Read, Write, WebFetch |
| **maya** | Communication & marketing — Instagram, campagnes, copy, RP | Read, Write, WebFetch |
| **isabelle** | Recherche — tendances, marché, données | WebSearch, WebFetch, Read |
| **sacha** | Site e-commerce Shopify — structure, thème & design, fiches produit, collections, SEO | Read, Write, Edit, Glob, WebFetch, Shopify (MCP) |
| **victoire** | Juriste — pages légales, CGV, RGPD, allégations (GOTS, origine), marque & PI, contrats | Read, Write, WebSearch, WebFetch |
| **arthur** | Manager & QA — valide, corrige, livre. **Seul à livrer.** | Read, Write |

## Hiérarchie

```
                       Arthur  (valide & livre — seul)
                          │
                    Clémentine  (cadre & aiguille)
                          │
      ┌──────────┬──────────┼──────────┬──────────┐
      │          │          │          │          │
    Izaac      Maya       Sacha     Victoire   Isabelle
 (création)  (com/mkt)  (Shopify)  (juridique) (recherche)
```

## Comment Claude Code doit travailler avec cette équipe

### Mode « mission complète » (processus orchestré)
Quand l'utilisateur lance une mission ample (« concept de Drop 2 », « plan de lancement », « campagne Cercle Waves »), suis ce flux :

1. **Délègue à `clementine`** pour obtenir l'objectif clair, les étapes, et l'aiguillage (Izaac, Maya, Sacha, Victoire, ou plusieurs).
2. **Si la mission le demande, délègue à `isabelle`** pour la recherche externe.
3. **Délègue à `izaac`, `maya`, `sacha` et/ou `victoire`** selon l'aiguillage de Clémentine :
   - Création produit / naming / DA → izaac
   - Com / Instagram / campagne → maya
   - Site Shopify / thème / fiche produit en ligne / collections → sacha (après Izaac si les textes produit sont à créer)
   - Juridique / pages légales / allégations / marque → victoire (en parallèle d'Izaac et Maya, avant Sacha qui intègre ses textes)
   - Mixte → plusieurs, en parallèle ou en séquence selon la dépendance
4. **Délègue à `arthur`** pour la relecture. S'il répond « À CORRIGER », transmets ses corrections à l'auteur (Izaac, Maya, Sacha ou Victoire), puis re-soumets à Arthur. **Maximum 2 cycles.**
5. Ne présente comme livrable final QUE ce qu'Arthur a marqué « VALIDÉ ».

### Mode « chat direct » avec un agent
Quand l'utilisateur s'adresse explicitement à un agent (« demande à Maya… », « @izaac, propose… », « Isabelle, vérifie… »), **invoque directement cet agent** via le Task tool, sans déclencher tout le processus. L'agent répondra en mode conversation.

### Règles de routage automatique
Si l'utilisateur ne précise pas, déduis :
- Question factuelle/données/tendances → **isabelle**
- Idée de campagne, post Instagram, copywriting marketing, plan de com → **maya**
- Concept produit, naming, direction artistique, texte de fiche produit → **izaac**
- Site Shopify, thème, design des pages, mise en ligne des fiches produit, collections, SEO du site → **sacha**
- Question juridique, CGV, mentions légales, RGPD, marque, allégation produit → **victoire**
- Stratégie, priorisation, découpage → **clementine**
- Avis qualité, arbitrage, validation → **arthur**
- Mission ample/multi-étapes → processus complet (Clémentine d'abord)

## Processus de livraison
- Seul **Arthur** livre. Une réponse non préfixée par « VALIDÉ » n'est pas un livrable final.
- Les livrables sont stockés dans `out/livrable-<date>.md` quand le runtime d'arrière-plan tourne (voir `src/run.ts`).
- Maya peut écrire dans `out/memo-maya.md` pour mémoriser ce qui marche.
- Sacha écrit ses fichiers Shopify (CSV produits, thème Liquid, pages) dans `shopify/` (versionné). Victoire écrit les pages légales dans `shopify/pages/legal/` et sa note dans `shopify/conformite.md`. Dans la boutique réelle, il crée tout en **brouillon** et ne publie rien sans « VALIDÉ » d'Arthur + confirmation de l'utilisateur.

## Style de réponse Claude Code
Quand tu orchestres, annonce brièvement les délégations (`→ clementine`, `→ maya`...) pour que l'utilisateur suive le flux. Quand un agent répond, préfixe son texte par son nom en gras (`**Maya** :`) pour rendre l'échange lisible.

## Tableau de l'équipe (jauges)
Un tableau en direct montre chaque membre en bulle (statut, jauge d'avancement, tâche en cours) : https://claude.ai/artifact/SJ9BNy6wbbCbHb5Lca6hzY (source : `outils/equipe-kyma.html`).
**À chaque délégation et à chaque retour d'un agent**, Claude met à jour le document `team/<agent>` (`status` : en cours / terminé / en attente / bloqué / disponible ; `progress` 0-100 ; `task` ; `updated_at` ISO) et ajoute une ligne au journal `meta/journal` (`entries`, 30 dernières max) via l'outil ArtifactData.
