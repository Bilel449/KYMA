# KYMA — Équipe IA

**Streetwear unisexe — L'art du flow.**

Ce dépôt héberge l'équipe IA de la marque KYMA : 5 agents spécialisés qui collaborent pour cadrer, créer, communiquer, vérifier et livrer.

## L'équipe

| Agent | Rôle |
|---|---|
| **Clémentine** | Sous-manageuse — cadre la mission, étapes, aiguillage |
| **Izaac** | Création produit — drops, naming, direction artistique |
| **Maya** | Communication & marketing — Instagram, campagnes, copy, RP |
| **Isabelle** | Recherche — tendances, marché, données |
| **Arthur** | Manager & QA — valide et livre (**seul** à livrer) |

## Hiérarchie

```
                Arthur  (valide & livre — seul)
                   │
              Clémentine
                   │
       ┌───────────┼───────────┐
     Izaac       Maya       Isabelle
```

Tu peux **lancer une mission complète** (orchestration automatique respectant la hiérarchie) **ou parler directement à un agent** pour un échange ciblé.

## Deux moteurs, une seule source de vérité

Les agents sont définis une seule fois dans `.claude/agents/*.md`. Deux façons de les exécuter :

- **Voie A — interactif** : ouvre ce dossier dans **Claude Code**, les agents sont chargés automatiquement.
- **Voie B — arrière-plan** : un script Node.js (`src/run.ts`) les fait tourner via le **Claude Agent SDK** (local ou planifié via GitHub Actions).

## Arborescence

```
KYMA/
├─ .claude/
│  └─ agents/
│     ├─ clementine.md
│     ├─ izaac.md
│     ├─ maya.md          ← NOUVEAU : communication & marketing
│     ├─ isabelle.md
│     └─ arthur.md
├─ src/
│  └─ run.ts              ← runtime d'arrière-plan
├─ .github/workflows/
│  └─ kyma.yml            ← exécution planifiée (cron)
├─ CLAUDE.md              ← mémoire projet (lue par Claude Code)
├─ package.json
├─ tsconfig.json
└─ .env.example
```

## Prérequis

- Node.js 18+ (20 recommandé)
- Clé API Anthropic — copie `.env.example` en `.env` et renseigne `ANTHROPIC_API_KEY`

```bash
cp .env.example .env   # colle ta clé dedans
npm install
```

## Utilisation

### 1) Interactif avec Claude Code

Installe Claude Code :
```bash
npm install -g @anthropic-ai/claude-code
```

Puis dans ce dossier :
```bash
claude
```

Tes 5 agents sont chargés. Quelques exemples :

**Mission complète (orchestrée)** :
> Lance une mission : concept de Drop 2 pour KYMA, avec coloris + plan de lancement Instagram.

→ Clémentine cadre, Isabelle vérifie les tendances, Izaac propose les coloris, Maya écrit le plan Insta, Arthur valide et livre.

**Chat direct avec un agent** :
> Demande à Maya 3 captions Instagram pour annoncer le palier ORIGINE du Cercle Waves.
> @izaac, propose 5 noms de coloris pour une capsule estivale.
> Isabelle, quelles sont les 3 tendances streetwear à surveiller cet automne ?

→ L'agent visé répond directement, en mode conversation.

### 2) Arrière-plan en local

```bash
npm run kyma -- "Rédige le calendrier éditorial Instagram de novembre pour KYMA"
```

Le livrable validé par Arthur est écrit dans `out/livrable-<timestamp>.md`.

### 3) Arrière-plan planifié (GitHub Actions)

Pousse le dépôt sur GitHub, ajoute le secret `ANTHROPIC_API_KEY` (Settings → Secrets → Actions). Le workflow `.github/workflows/kyma.yml` tourne chaque lundi à 07:00 UTC, ou à la demande via « Run workflow ». Le livrable est archivé en artefact téléchargeable.

## Personnaliser

- **Modifier un rôle / un ton** : édite le `.md` de l'agent — c'est la seule source de vérité, les deux moteurs s'y réfèrent.
- **Ajouter un agent** : crée un nouveau `.claude/agents/xxx.md` et mentionne-le dans le coordinateur (`src/run.ts`) et dans `CLAUDE.md`.
- **Changer la fréquence d'arrière-plan** : modifie la ligne `cron:` dans `.github/workflows/kyma.yml`.
- **Arbitrer qualité / coût** : le champ `model:` de chaque agent (`sonnet`, `haiku`, `opus`) permet de moduler. Les modèles `haiku` sont plus rapides et moins chers ; `opus` est le plus capable.

## Comment ça marche techniquement

- Le runtime (`src/run.ts`) appelle `query()` du Claude Agent SDK avec `settingSources: ['project']`, ce qui charge automatiquement les sous-agents depuis `.claude/agents/`.
- Un prompt « coordinateur » impose l'ordre Clémentine → Isabelle (si besoin) → Izaac/Maya → Arthur.
- En mode interactif Claude Code, le fichier `CLAUDE.md` décrit la hiérarchie et le routage par défaut — Claude Code délègue automatiquement à l'agent pertinent.
- Chaque agent a son propre contexte ; les workflows multi-agents consomment plus de tokens qu'une session simple.

## Le processus de l'équipe

```
Mission
   ↓
Clémentine    (cadre, étapes, aiguillage)
   ↓
Isabelle      (recherche, si nécessaire)
   ↓
Izaac et/ou Maya    (exécution selon le type de mission)
   ↓
Arthur        (relecture → corrections en boucle → livraison)
```

**Seul le livrable validé par Arthur sort de l'équipe.**
