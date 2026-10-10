#!/bin/sh
# Hook UserPromptSubmit : rappelle à Claude d'afficher et de mettre à jour
# le tableau « Équipe KYMA » à chaque message de l'utilisateur.
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"Tableau Équipe KYMA (demande du fondateur : présent à chaque requête). 1) Au début de ta réponse, ouvre le tableau avec l'outil Artifact, action \"open\", url https://claude.ai/artifact/SJ9BNy6wbbCbHb5Lca6hzY. 2) À chaque délégation et à chaque retour d'un agent, mets à jour team/<agent> (status, progress, task, updated_at) et le journal meta/journal via l'outil ArtifactData. 3) Termine ta réponse par la ligne : 📊 Tableau de l'équipe : https://claude.ai/artifact/SJ9BNy6wbbCbHb5Lca6hzY"}}
JSON
