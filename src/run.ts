import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { writeFileSync, mkdirSync } from "node:fs";

// ── Mission : passée en argument, sinon valeur par défaut ──
const mission =
  process.argv.slice(2).join(" ").trim() ||
  "Propose un concept de Drop 2 pour KYMA : 4 coloris nommés + un angle de communication Instagram.";

const KYMA_CONTEXT = `KYMA (« Kouma ») : streetwear premium unisexe parisien, slogan « L'art du flow », inspirée du mouvement perpétuel des vagues.
Référentiel complet : brand/BRAND.md. Palette Beige #F5EDE4 / Lilas #C8A2C8 / Noir #1C1C1C. Instagram @kymasinsta.
Drop 1 : hoodie zippé oversize 179 € — Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow.
Fidélité Cercle Waves : INITIUM / ORIGINE.`;

// ── Coordinateur : orchestration stricte, hiérarchie respectée ──
const coordinator = `Tu coordonnes l'équipe KYMA. La hiérarchie est :
- Arthur (manager, valide & livre — seul)
  └─ Clémentine (sub-management, cadre)
       ├─ Izaac (création produit, naming, DA)
       ├─ Maya (com & marketing : Instagram, campagnes, copy, RP)
       ├─ Sacha (site e-commerce Shopify : structure, thème, design, motion design, fiches produit, collections)
       ├─ Victoire (juridique : pages légales, CGV, RGPD, allégations, marque, contrats)
       └─ Isabelle (recherche web)

Pour CHAQUE mission orchestrée, déroule ce processus dans l'ordre :

1. Délègue à **clementine** pour obtenir l'objectif, les étapes, et l'aiguillage (Izaac / Maya / Sacha / Victoire / plusieurs).
2. Si des faits, tendances ou données externes sont nécessaires → délègue à **isabelle**.
3. Selon l'aiguillage de Clémentine :
   - Création produit / naming / DA → délègue à **izaac**
   - Com / Instagram / campagne / copy marketing → délègue à **maya**
   - Site Shopify / thème / fiches produit en ligne / collections → délègue à **sacha** (après Izaac si les textes produit sont à créer)
   - Juridique / pages légales / allégations / marque → délègue à **victoire**
   - Mixte → délègue à plusieurs (en parallèle si indépendants, sinon en séquence)
   Transmets-leur les directives de Clémentine et la recherche d'Isabelle.
4. Délègue à **arthur** pour la relecture finale. S'il répond « À CORRIGER », transmets ses corrections à l'auteur concerné, puis re-soumets à Arthur. Boucle 2 fois maximum.

Annonce chaque délégation par une ligne « → <agent> » avant de l'appeler, pour que l'utilisateur suive le flux.
Ne présente comme résultat final QUE le livrable validé par Arthur (celui qui commence par « VALIDÉ »).

CONTEXTE MARQUE :
${KYMA_CONTEXT}`;

async function main() {
  mkdirSync("out", { recursive: true });
  let lastText = "";

  for await (const msg of query({
    prompt: mission,
    options: {
      model: "sonnet",
      systemPrompt: coordinator,
      settingSources: ["project"], // charge .claude/agents/*.md
      allowedTools: ["Agent", "Read", "Write", "WebSearch", "WebFetch"],
      permissionMode: "bypassPermissions",
      maxTurns: 80,
    },
  })) {
    if (msg.type === "assistant") {
      for (const block of msg.message.content) {
        if (block.type === "text" && block.text.trim()) {
          console.log(block.text);
          lastText = block.text;
        } else if (block.type === "tool_use" && block.name === "Agent") {
          const who = (block.input as any)?.subagent_type ?? "agent";
          console.log(`\n— délégation → ${who} —\n`);
        }
      }
    } else if (msg.type === "result") {
      const out = (msg as any).result ?? lastText;
      const file = `out/livrable-${Date.now()}.md`;
      writeFileSync(
        file,
        `# Mission\n\n${mission}\n\n# Livrable (validé par Arthur)\n\n${out}\n`
      );
      console.log(`\n✓ Terminé (${msg.subtype}). Livrable écrit dans ${file}`);
    }
  }
}

main().catch((e) => {
  console.error("Erreur :", e);
  process.exit(1);
});
