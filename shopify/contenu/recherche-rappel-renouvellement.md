# Rappel avant reconduction (art. L.215-1) — recherche d'Isabelle (10/10/2026)

> Pour Sacha (mise en place) et Victoire (fondement et preuve). Limite : pages non ouvertes en direct (WebFetch indisponible), extraits de recherche uniquement ; confiance moyenne. **Aucune solution confirmée n'envoie un rappel à J-35.**

| Outil | Rappel « upcoming order » | Délai | Contenu / lien portail | Coût | Preuve d'envoi |
|---|---|---|---|---|---|
| Shopify Subscriptions | oui, automatique, 3 jours avant chaque prélèvement | réglage non trouvé (3 j documenté) | lien « Manage your subscription » ; modèle éditable non confirmé | appli gratuite (comparatif 2026) | non trouvé |
| Appstle | oui, e-mail « Upcoming Order » activable, modèle éditable | champ « jours avant » non trouvé | texte éditable, lien vers la commande à venir | gratuit < 500 $/mois d'abonnements ; 10 / 30 / 100 $ ; 0 % de frais | webhook `subscription.upcoming-order-notification` ; journal non trouvé |
| Seal Subscriptions | oui, « Reminder about the upcoming billing » | exemple « 1 day before » ; max non confirmé | modèles éditables | dès 5,95 $/mois (gratuit < 50 abonnements) | non trouvé |
| Loop | oui, « Upcoming order » | **1 à 25 jours** pour un renouvellement non annuel → **insuffisant pour J-35** | date, montant, lien de résiliation | 99 $/mois + 1 % | journal d'activité |
| Shopify Flow | déclencheurs d'abonnement (créé, modifié, prélèvement réussi/échoué) mais **pas de « N jours avant »** | — | l'action « Send marketing email » ne vise que les clients ayant accepté le marketing (forum) → **un rappel légal pourrait ne pas partir** | Basic et plus | non trouvé |
| Klaviyo | événement `loop_order_upcoming` (Loop seulement) ; Seal : pas d'événement « à venir » | — | flux entièrement personnalisable | gratuit ≤ 250 profils ; ~20 $/mois jusqu'à 500 | historique par profil (non vérifié) |
| Shopify Email (« Shopify Messaging ») | pas un déclencheur d'abonnement | — | — | 10 000 e-mails/mois inclus puis 1 $/1 000 (à confirmer) | non trouvé |

Exemples de marques françaises : non trouvé (modèles génériques seulement).

## Recommandation factuelle
1. **Seal (5,95 $/mois) ou Appstle (gratuit au départ)** : tester dans l'admin si le champ « jours avant » accepte 35 et si le texte est éditable ; sinon écrire au support (Appstle : subscription-support@appstle.com) et demander s'il existe un journal d'envoi horodaté.
2. **Appstle webhook → Klaviyo** : voie la plus personnalisable, faisabilité non vérifiée.
3. **Loop** : écarté (plafond 25 jours, prix).
4. **Sans appli** : envoi J-35 par Klaviyo (flux par date) ou par e-mail manuel hebdomadaire à partir d'un export — à valider par Victoire (l'e-mail est une information obligatoire, pas une prospection : il ne doit pas dépendre du consentement marketing).

Sources : help.shopify.com (Subscriptions, Flow triggers) · changelog.shopify.com (Flow sur Basic) · community.shopify.com · help.loopwork.co · intercom.help/appstle · developers.appstle.com/subscription/webhooks · apps.shopify.com (Appstle, Seal) · sealsubscriptions.com · klaviyo.com/pricing · donneespersonnelles.fr (reconduction tacite) — consultés le 10/10/2026.
