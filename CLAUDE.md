# Équipe KYMA — mémoire projet

Ce dépôt contient l'équipe IA de la marque **KYMA**.

## La marque
KYMA (prononcé « Kouma ») — streetwear unisexe. Slogan : « L'art du flow ». Univers : le mouvement perpétuel des vagues.
- **Palette** : Beige #F2F0E9, Lilas #C8A2C8, Noir #1A1A1A.
- **Fournisseur** : ASBX (Portugal). **Instagram** : @kymasinsta.
- **Fidélité** : Cercle Waves — INITIUM / ORIGINE.
- **Drop 1** : Silver Drift, Ivory Tide, Lilac Whirl, Midnight Current, Amber Flow, Mint Surge.

## L'équipe (sous-agents dans `.claude/agents/`)

| Agent | Rôle | Tools |
|---|---|---|
| **clementine** | Sous-manageuse — cadre la mission, étapes, aiguillage Izaac/Maya | Read, Write |
| **izaac** | Création produit & DA — drops, naming, concepts visuels | Read, Write, WebFetch |
| **maya** | Communication & marketing — Instagram, campagnes, copy, RP | Read, Write, WebFetch |
| **isabelle** | Recherche — tendances, marché, données | WebSearch, WebFetch, Read |
| **arthur** | Manager & QA — valide, corrige, livre. **Seul à livrer.** | Read, Write |

## Hiérarchie

```
                       Arthur  (valide & livre — seul)
                          │
                    Clémentine  (cadre & aiguille)
                          │
              ┌───────────┼───────────┐
              │           │           │
           Izaac        Maya       Isabelle
        (création)    (com/mkt)    (recherche)
```

## Comment Claude Code doit travailler avec cette équipe

### Mode « mission complète » (processus orchestré)
Quand l'utilisateur lance une mission ample (« concept de Drop 2 », « plan de lancement », « campagne Cercle Waves »), suis ce flux :

1. **Délègue à `clementine`** pour obtenir l'objectif clair, les étapes, et l'aiguillage (Izaac, Maya, ou les deux).
2. **Si la mission le demande, délègue à `isabelle`** pour la recherche externe.
3. **Délègue à `izaac` et/ou `maya`** selon l'aiguillage de Clémentine :
   - Création produit / naming / DA → izaac
   - Com / Instagram / campagne → maya
   - Mixte → les deux, en parallèle ou en séquence selon la dépendance
4. **Délègue à `arthur`** pour la relecture. S'il répond « À CORRIGER », transmets ses corrections à l'auteur (Izaac ou Maya), puis re-soumets à Arthur. **Maximum 2 cycles.**
5. Ne présente comme livrable final QUE ce qu'Arthur a marqué « VALIDÉ ».

### Mode « chat direct » avec un agent
Quand l'utilisateur s'adresse explicitement à un agent (« demande à Maya… », « @izaac, propose… », « Isabelle, vérifie… »), **invoque directement cet agent** via le Task tool, sans déclencher tout le processus. L'agent répondra en mode conversation.

### Règles de routage automatique
Si l'utilisateur ne précise pas, déduis :
- Question factuelle/données/tendances → **isabelle**
- Idée de campagne, post Instagram, copywriting marketing, plan de com → **maya**
- Concept produit, naming, direction artistique, fiche produit → **izaac**
- Stratégie, priorisation, découpage → **clementine**
- Avis qualité, arbitrage, validation → **arthur**
- Mission ample/multi-étapes → processus complet (Clémentine d'abord)

## Processus de livraison
- Seul **Arthur** livre. Une réponse non préfixée par « VALIDÉ » n'est pas un livrable final.
- Les livrables sont stockés dans `out/livrable-<date>.md` quand le runtime d'arrière-plan tourne (voir `src/run.ts`).
- Maya peut écrire dans `out/memo-maya.md` pour mémoriser ce qui marche.

## Style de réponse Claude Code
Quand tu orchestres, annonce brièvement les délégations (`→ clementine`, `→ maya`...) pour que l'utilisateur suive le flux. Quand un agent répond, préfixe son texte par son nom en gras (`**Maya** :`) pour rendre l'échange lisible.
