# KYMA — Note de conformité juridique du site Shopify

> **Auteur** : Victoire (juriste KYMA) · **Version** : v1 du 08/10/2026 · **Boutique** : kymas-store.myshopify.com (essai, rien de publié)
> **Destinataires** : Arthur (validation), Clémentine, Izaac, Maya, Sacha, fondateur.
> **Rappel unique** : les textes de `shopify/pages/legal/` et cette note sont des **modèles**. Ils doivent être relus et validés par un avocat (droit de la consommation / RGPD) avant toute mise en ligne.

**Hypothèses retenues** (à confirmer par le fondateur) : Drop 1 = hoodie zippé oversize, 5 coloris (tech pack v3), 179 € TTC. Vente en précommande, production lancée après encaissement, délai indicatif d'environ 18 semaines après validation fabricant. SASU en création. Composition annoncée « 100 % coton bio GOTS » sans certificat. Fabrication au Portugal sans fabricant signé. Motif unique par pièce, sans personnalisation à la demande. Visuels = rendus/maquettes. Cercle Waves sans règles. Newsletter prévue.

**Fichiers livrés** (HTML simple, à coller dans *Shopify > Paramètres > Politiques* ou *Boutique en ligne > Pages*) :

| Fichier | Où le coller dans Shopify |
|---|---|
| `pages/legal/mentions-legales.html` | Politiques > « Mentions légales » (Legal notice) |
| `pages/legal/cgv.html` | Politiques > « Conditions d'utilisation / de vente » (Terms of service) |
| `pages/legal/retours-remboursements.html` | Politiques > « Politique de remboursement » |
| `pages/legal/livraison.html` | Politiques > « Politique d'expédition » |
| `pages/legal/confidentialite.html` | Politiques > « Politique de confidentialité » (remplacer le modèle Shopify) |
| `pages/legal/cookies.html` | Page `/pages/cookies` |
| `pages/legal/cercle-waves-conditions.html` | Page `/pages/cercle-waves-conditions` (**v2 du 09/10/2026 : conditions d'abonnement, voir la dernière section de cette note ; ne pas publier avant validation des avantages**) |

Shopify demande aussi une politique « Coordonnées » (Contact information) : y reprendre raison sociale, adresse, e-mail, téléphone, SIREN et TVA, sans rien inventer.

---

## (a) Allégations produit : AUTORISÉES maintenant vs APRÈS preuve

> Pour **Izaac** (fiches et textes produit), **Maya** (Instagram, newsletter, campagnes, RP) et **Sacha** (site, métadonnées SEO, balises alt, emails Shopify).
> Règle générale : une allégation est autorisée seulement si elle est **vraie, précise, vérifiable et prouvée par un document en notre possession** (art. L.121-2 C. conso). « Bientôt » ou « en cours » ne permet pas de l'afficher comme acquise.
> **Contexte au 08/10/2026** : la directive (UE) 2024/825 (« EmpCo ») s'applique depuis le **27/09/2026**. La France ne l'a pas encore transposée : le projet de loi DDADUE est toujours en première lecture à l'Assemblée et la Commission a adressé une mise en demeure à la France le 28/05/2026. La DGCCRF et les juges interprètent déjà l'art. L.121-2 à sa lumière, et la loi AGEC interdit déjà certaines mentions (art. L.541-9-1 C. env.). **On applique donc ses règles dès maintenant.**

| Thème | ❌ Interdit / à retirer | ✅ Autorisé MAINTENANT | ✅ Autorisé APRÈS preuve (et preuve exigée) |
|---|---|---|---|
| **GOTS** | « Certifié GOTS », logo GOTS, « GOTS » dans les noms, hashtags, balises alt ou métadonnées. | **Rien.** Aucune mention GOTS tant que les preuves ne sont pas réunies. | Il faut 4 preuves : ① certificat de périmètre (*scope certificate*) GOTS valide du fabricant, couvrant le produit et toutes les étapes (impression comprise) ; ② certificat de transaction (TC) pour **notre** lot ; ③ étiquette du produit approuvée par l'organisme certificateur (*Labelling Release*) ; ④ étiquette conforme sur chaque pièce. Formulation : « **Organic — certifié par [organisme certificateur], licence n° [xxx]** » (catégorie « organic » si ≥ 95 % de fibres bio certifiées), ou « **made with [x] % organic materials** » (70 à 94 %). Logo GOTS seulement s'il figure sur l'étiquette du produit. « 100 % organic » n'existe pas comme catégorie d'étiquetage GOTS. |
| **Coton bio** | « 100 % coton bio », « coton biologique », « bio », « organic » sur la fiche, dans les publicités ou le SEO. | Composition factuelle, une fois confirmée par la fiche technique du fabricant : « **Corps : 100 % coton** ». Si l'on veut parler de la démarche (page marque uniquement, jamais sur la fiche produit) : « Nous avons choisi de travailler avec un fabricant certifié GOTS ; nous l'annoncerons dès réception des certificats. » | « Coton biologique certifié GOTS » avec les mêmes preuves que la ligne GOTS. ⚠️ **Les bords-côtes contiennent 5 % d'élasthanne** : ne jamais écrire « 100 % coton bio » pour **tout** le produit. Écrire plutôt « Corps : 100 % coton biologique certifié GOTS · Bords-côtes : 95 % coton biologique, 5 % élasthanne · Doublure de capuche : [à compléter] ». |
| **Made in Portugal** | « Made in Portugal », drapeau portugais, « fabriqué en Europe » | « Fabricant en cours de sélection » ou rien. Ne nommer aucun fabricant, y compris ASBX. | « **Confectionné au Portugal** » ou « Made in Portugal », avec : ① contrat fabricant signé ; ② attestation écrite que la coupe et la confection sont faites au Portugal ; ③ vérification de l'origine non préférentielle selon la règle douanière du code SH du produit (chapitre 61 si maille, à confirmer ; annexe 22-01 du règlement délégué (UE) 2015/2446). En cas de doute, demander un avis à la douane. Pour aller plus loin (facultatif pour KYMA vu les seuils AGEC), indiquer le pays de chaque étape : tricotage, impression, confection. |
| **« Pièce unique »** | « Pièce unique » seul (suggère un exemplaire artisanal ou une œuvre) ; « édition limitée » sans quantité fixée ; « numérotée » si la carte n'est pas effectivement numérotée. | Formulation d'intention : « **Pensé pour que chaque pièce soit unique.** » | Après fiche technique validée par le fabricant et préséries : « **Motif unique : chaque hoodie est découpé dans une zone différente du tissu, aucun ne présente exactement le même motif.** » « Édition limitée à [N] pièces par coloris », seulement si le nombre est fixé et respecté (aucune réédition identique). « Carte numérotée » seulement si elle est réellement produite. |
| **« Éco-responsable », « durable », « green », « respectueux de l'environnement », « clean »** | **Interdit**, même après preuve : allégation environnementale générique (directive 2024/825). « Respectueux de l'environnement » est déjà interdit sur le produit et l'emballage (AGEC, art. L.541-9-1 C. env.). Aussi interdits : « neutre en carbone », « impact positif », « mode responsable », label maison du type « KYMA Conscious ». | Faits précis et vrais : « **Produit en petites séries, après précommande, pour limiter les invendus.** » (c'est le modèle réel) | Seulement des faits précis et prouvés, par exemple « Encres pigmentaires certifiées [référentiel exact] » avec le certificat. « Durable » au sens de la solidité : remplacer par des données factuelles (« molleton 410 g/m² », « zip YKK métal »). |
| **« Zéro plastique » / packaging** | « Zéro plastique », « zéro plastique superflu », « zéro déchet », « 100 % recyclable », « emballage écologique ». | « **Colis expédié dans un carton kraft** » (seulement si c'est vrai). | « Expédition sans plastique » ou « sans film ni calage plastique », seulement après vérification de **toute** la chaîne : sachet individuel du fabricant, adhésif, sticker, étiquettes, pochette transporteur. « Carton recyclé à [x] % » avec la fiche fournisseur. « Recyclable » seulement dans les conditions de l'art. L.541-9-1 (avec info-tri). |
| **Encres / OEKO-TEX** | « Certifié OEKO-TEX » (un certificat ECO PASSPORT vise les produits chimiques, pas le vêtement). | Rien. | « Encres certifiées OEKO-TEX ECO PASSPORT » avec le certificat du fournisseur d'encres. |
| **Paris** | « Made in Paris », « fabriqué en France », drapeau tricolore sur le produit. | « **KYMA Paris** », « marque créée à Paris » (vrai : marque basée à Paris). | — |
| **Disponibilité / rareté** | « En stock », « livraison rapide », « plus que X pièces » si c'est faux. | « **Précommande — expédition au plus tard le [date]** » | — |

**Visuels (rendus).** Sous chaque visuel qui est un rendu, Sacha affiche la mention : « **Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.** » (formule mise à jour le 08/10/2026 : repli conforme au tableau d'unicité tant que les préséries ne sont pas validées — à confirmer par Victoire) Une mention « non contractuel » ne rend pas licite un visuel trompeur. Le rendu doit donc rester fidèle à la coupe, au coloris et aux finitions réels. Remplacer les rendus par des photos du produit fabriqué dès le shooting des préséries.

---

## (b) Mentions obligatoires : fiche produit, panier, confirmation, pied de page

### Fiche produit (Sacha, sur les textes d'Izaac)
1. **Caractéristiques essentielles** : désignation, coupe, coloris, tailles et guide des tailles (art. L.111-1 et L.221-5 C. conso).
2. **Composition en fibres, en français et avant l'achat** : art. 16 du règlement (UE) 1007/2011. Composition par élément si nécessaire (corps, bords-côtes, doublure). Seuls les noms de fibres réglementaires sont utilisés.
3. **Prix TTC en euros**, avec « hors frais de livraison » et un lien vers la politique de livraison. Pas de prix barré sans prix de référence conforme (prix le plus bas des 30 derniers jours, art. L.112-1-1).
4. **Bloc PRÉCOMMANDE**, visible près du bouton d'achat :
   - « Précommande du [date] au [date] » ;
   - « **Expédition au plus tard le [date]** » : date ferme ou délai maximal, jamais « environ » ni « ~18 semaines » ;
   - [si seuil minimal] condition de lancement et remboursement intégral si le seuil n'est pas atteint ;
   - « Annulation possible jusqu'à 14 jours après réception (droit de rétractation). »
5. **Mention « motif unique »** et mention « visuel de présentation (rendu) » (voir (a)).
6. Conseils d'entretien, alignés sur l'étiquette définitive.
7. Pays de fabrication : **seulement** quand il est prouvé (voir (a)).
8. Liens vers la politique de retours (rétractation 14 jours) et vers les CGV (garanties légales).

### Panier et checkout (Sacha)
1. Récapitulatif modifiable : produit, coloris, taille, quantité, prix TTC, frais de livraison, **total TTC**, et **date limite d'expédition rappelée sur chaque ligne en précommande**.
2. **Case « J'ai lu et j'accepte les CGV »**, non pré-cochée et obligatoire, avec un lien vers les CGV.
3. **Case recommandée**, non pré-cochée : « J'ai compris que le motif de ma pièce est unique et différera des visuels présentés. » C'est l'acceptation expresse d'un écart avec le visuel (logique de l'art. L.217-5 C. conso). Formulation à valider par l'avocat.
4. **Case newsletter distincte**, non pré-cochée et facultative. Le consentement ne doit pas être lié à l'acceptation des CGV.
5. **Bouton final** : « **Commande avec obligation de paiement** » ou formule équivalente sans ambiguïté (art. L.221-14). Le libellé Shopify par défaut est à vérifier et à personnaliser.
6. Moyens de paiement acceptés et frais affichés avant validation.

### E-mail de confirmation de commande (Sacha, modèles de notification Shopify)
Il doit contenir : tous les éléments du contrat, la **date limite d'expédition**, le lien et une copie des CGV (support durable), le **formulaire type de rétractation**, l'emplacement de la **fonction « Renoncer au contrat ici »**, et le contact du service client.

### Pied de page de toutes les pages (Sacha)
Liens vers : Mentions légales · CGV · Livraison · Retours & remboursements · Confidentialité · Cookies · « **Gérer mes cookies** » · « **Renoncer au contrat ici** » · Contact.

### Fonction de rétractation en ligne (obligatoire depuis le 19/06/2026)
Base : ordonnance n° 2026-2 ; décret n° 2026-3 du 05/01/2026 ; art. L.221-21 et D.221-5 C. conso, qui transposent la directive (UE) 2023/2673.
- **Fonctionnement attendu** : un bouton gratuit, visible et accessible pendant tout le délai, libellé « **Renoncer au contrat ici** » ou formule équivalente sans ambiguïté. Il ouvre un formulaire (nom, n° de commande, e-mail), puis un bouton « **Confirmer la rétractation** ». Un accusé de réception est envoyé par e-mail avec le contenu de la demande, la date et l'heure. Le libellé exact est à vérifier dans l'art. D.221-5.
- **Mise en place** : Shopify ne fournit pas cette fonction en natif à ma connaissance. Sacha doit l'installer (application ou formulaire dédié) et la tester.
- **Sanction** : sans cette information précontractuelle, le délai de rétractation est prolongé à 12 mois et 14 jours.

### Bandeau cookies (Sacha)
Le bandeau propose « Tout accepter », « Tout refuser » (même niveau, même format) et « Personnaliser ». Aucun pixel (Meta, TikTok, GA4) n'est chargé avant le consentement. Fermer le bandeau vaut refus. Le choix est conservé 6 mois. Le lien « Gérer mes cookies » est permanent. Paramétrage dans *Shopify > Paramètres > Confidentialité des clients* (bannière de cookies, région UE), puis vérification que chaque application respecte l'API de consentement.

---

## (c) Informations à demander au fondateur

**Identité et structure**
1. Statut : SASU immatriculée ? Si oui : raison sociale, capital, adresse du siège, SIREN/RCS, n° de TVA intracommunautaire, régime de TVA (franchise en base ou non).
2. Nom du représentant légal et du directeur de la publication.
3. E-mail de contact, **numéro de téléphone** (obligatoire), adresse postale pour les retours.
4. Nom de domaine retenu (kyma.boutique ou kyma-official.com ?) : est-il acheté, et à qui appartient-il (la société, pas une personne) ?

**Fabrication et produit**
5. Fabricant : nom, pays, statut du contrat, **délai de production contractuel**, pénalités de retard, clause de propriété intellectuelle sur le motif « KYMA Wave ».
6. Certificats : scope certificate GOTS du fabricant (n° de licence, organisme certificateur), possibilité d'un TC, certificats des encres.
7. Composition exacte de chaque élément (corps, bords-côtes, doublure de capuche, fil) et étiquette d'entretien définitive.
8. Pays de chaque étape : filature, tricotage, impression, coupe, confection.
9. Coloris définitifs (5 ou 6 ? les noms divergent entre documents) et tailles.

**Précommande**
10. Dates d'ouverture et de clôture de la précommande, **date limite d'expédition** qu'il s'engage à tenir (avec marge).
11. Y a-t-il un seuil minimal de précommandes pour lancer la production ? Que se passe-t-il s'il n'est pas atteint ?
12. Paiement intégral à la commande, ou prélèvement différé ?
13. Transporteur(s), zones de livraison, frais, délais d'acheminement.
14. Frais de retour : à la charge du client ou offerts ? Échanges proposés ?

**Conformité et prestataires**
15. Médiateur de la consommation retenu (convention signée ?).
16. Adhésion à Refashion (filière textiles) et IDU ; emballages (Citeo / Léko) et IDU.
17. Applications Shopify prévues : précommande, fidélité, avis, newsletter (Shopify Email ? Klaviyo ?), analytics, pixels publicitaires.
18. Règles du Cercle Waves : gratuit ou payant, critères d'accès à INITIUM et à ORIGINE, avantages, points, durée de validité. **[Tranché le 09/10/2026 : abonnement payant INITIUM / MAJESTÉ, voir la dernière section. Restent à fournir : valeur et durée de chaque avantage, quantités réservées, nature de la carte.]**

**Propriété intellectuelle et visuels**
19. Dépôt de la marque KYMA : effectué ? Classes, n° de dépôt ? Recherche d'antériorités faite ?
20. Auteur des rendus et des visuels lifestyle : graphiste (contrat de cession ?), outil d'IA (conditions d'utilisation ?), mannequins (autorisations de droit à l'image ?).
21. Qui a créé le motif « KYMA Wave » et le logo (cession écrite des droits d'auteur à la société ?).

---

## (d) Points de vigilance

### 🔴 Bloquant avant toute mise en vente

| # | Risque | Action attendue | Qui |
|---|---|---|---|
| 1 | **Société non immatriculée** : impossible de remplir les mentions légales, les CGV, le compte de paiement Shopify et la facturation. Vendre au nom d'une société « en formation » est risqué. | Immatriculer la SASU avant d'ouvrir les précommandes. Compléter tous les champs `[À COMPLÉTER]`. | Fondateur + expert-comptable |
| 2 | **Allégations non prouvées** (GOTS, coton bio, Made in Portugal) : pratique commerciale trompeuse (art. L.121-2 et s., jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende pour une personne physique, montants multipliés pour une société), retrait d'étiquettes et poursuites de GOTS. | Retirer ces mentions de tous les supports (site, Instagram, SEO, balises alt) et appliquer le tableau (a). | Izaac, Maya, Sacha ; preuves : fondateur |
| 3 | **Date d'expédition des précommandes** : sans fabricant signé ni délai contractuel, aucune date fiable ne peut être affichée. Sans date, la loi impose une livraison sous 30 jours (art. L.216-1). Par ailleurs, le client peut se rétracter **à tout moment avant l'expédition** : le modèle « valider puis produire » doit intégrer ce risque de trésorerie. | Pas de précommande tant que le contrat fabricant (délai, pénalités) n'est pas signé. Afficher une date ferme avec marge (« au plus tard le … »). Prévoir une procédure d'information en cas de retard. | Fondateur ; Sacha (affichage) |
| 4 | **Marque KYMA non déposée** : « kyma » (« vague » en grec) est un terme courant, des marques antérieures sont possibles. Risque de contrefaçon ou de perte du nom après le lancement. | Recherche d'antériorités, puis dépôt INPI (et EUIPO si vente dans l'UE) en **classes 25** (vêtements) et **35** (vente en ligne), éventuellement 18 et 14, **avant le lancement**. Idéalement avec un conseil en propriété industrielle. | Fondateur |
| 5 | **Visuels** : rendus présentés comme le produit ; droits d'auteur sur les rendus et le motif non cédés ; **lookbook avec photos de banque d'images sans lien avec KYMA et gabarit Canva** (« reallygreatsite.com »). | Mention « Visuel de présentation (rendu) » sous chaque rendu. Cessions de droits écrites (graphiste, motif, logo). Vérifier les conditions de l'outil d'IA éventuel. **Ne réutiliser aucune image du lookbook** sur le site ni sur Instagram. Remplacer par les photos des préséries. | Sacha, Maya, Izaac ; cessions : fondateur |
| 6 | **Fonction « Renoncer au contrat ici »** absente : sanction = délai de rétractation porté à 12 mois et 14 jours. | Installer, tester et documenter la fonction (voir (b)). | Sacha |
| 7 | **Médiateur de la consommation non désigné** : obligation légale (art. L.612-1), amende administrative possible. | Choisir un médiateur référencé par la CECMC, signer la convention, ajouter ses coordonnées (mentions légales, CGV). | Fondateur |
| 8 | **Contact et hébergeur incomplets** dans les mentions légales (LCEN art. 6) : le téléphone est obligatoire. | Compléter. Vérifier sur shopify.com/legal les coordonnées de Shopify International Ltd (Dublin, contractant UE) et de Shopify Inc. (Ottawa). | Fondateur, Sacha |
| 9 | **Cookies et pixels** déposés sans consentement : sanctions CNIL. | Bandeau conforme (voir (b)) avant d'activer le moindre pixel publicitaire ou outil d'analyse. Auditer les cookies réels et compléter le tableau de `cookies.html`. | Sacha |
| 10 | **Plan d'essai Shopify** : la boutique d'essai ne doit recevoir aucune commande ni donnée réelle. | Garder la page protégée par mot de passe. Tester uniquement avec la passerelle de test. Ne collecter ni e-mails ni précommandes avant la publication des politiques, le passage à un forfait payant et la **validation d'Arthur et du fondateur**. Tout reste en brouillon. | Sacha |

### 🟠 À régler rapidement (avant la première expédition ou dans les semaines suivant l'ouverture)

| # | Risque | Action | Qui |
|---|---|---|---|
| 11 | **REP textiles (filière TLC)** : adhésion obligatoire pour mettre des vêtements neufs sur le marché français (art. L.541-10 et s. C. env.). Amende possible, jusqu'à 30 000 € selon les sources. | Adhérer à Refashion (déclaration simplifiée sous 5 000 pièces par an) et obtenir l'IDU auprès de l'ADEME. Mentionner l'IDU dans les CGV (à confirmer auprès de Refashion pour la filière TLC). Vérifier l'info-tri / Triman. | Fondateur |
| 12 | **REP emballages** (boîte, kraft, papier de soie) : adhésion à un éco-organisme et IDU. | Vérifier auprès de Citeo ou Léko. | Fondateur |
| 13 | **Étiquetage textile** : étiquette de composition en français, durable, cohérente avec la fiche produit (règlement 1007/2011). Bords-côtes à 5 % d'élasthanne. | Valider l'étiquette avec le fabricant avant production. | Fondateur, Izaac |
| 14 | **Directive 2024/825 non transposée** mais applicable depuis le 27/09/2026 : la loi de transposition peut ajouter des règles. | Surveiller le projet de loi DDADUE. Relire tous les textes marketing tous les trimestres. | Victoire |
| 15 | **Contrat fabricant** : propriété du motif, confidentialité, délais et pénalités alignés sur les dates promises aux clients, obligation de fournir les certificats GOTS et TC, qualité et défauts. | Transmettre le projet de contrat à Victoire pour relecture, puis à un avocat. | Fondateur |
| 16 | **Cercle Waves** sans règles : un programme flou peut être une pratique trompeuse. **[Remplacé le 09/10/2026 par la section « Cercle Waves (abonnement) » ci-dessous.]** | Définir les règles, compléter la page et la faire valider avant toute promotion. | Fondateur, Maya |
| 17 | **RGPD** : registre des traitements, DPA Shopify accepté, liste des sous-traitants (applications), mécanismes de transfert vérifiés (Canada : adéquation ; États-Unis : DPF ou clauses contractuelles types). | Tenir un registre simple. Compléter `confidentialite.html` après le choix des applications. | Fondateur, Sacha |
| 18 | **Paiement anticipé** : sans stipulation contraire, les sommes versées d'avance sont des **arrhes** (art. L.214-1). Les CGV les qualifient d'acompte. | Faire valider la clause par l'avocat (ou choisir un prélèvement différé). | Fondateur + avocat |
| 19 | **TVA** : régime à déterminer ; guichet unique OSS si les ventes dans l'UE dépassent 10 000 € par an. | Voir l'expert-comptable. | Fondateur |
| 20 | **Droit à l'image** : visuels lifestyle avec personnes (réelles ou générées). | Autorisations écrites des mannequins. Pour une image générée : s'assurer qu'elle ne ressemble pas à une personne réelle. | Fondateur, Maya |
| 21 | **Nom de domaine** non acheté ou au nom d'un tiers. | L'acheter au nom de la société. | Fondateur |

### 🟢 Bonnes pratiques

| # | Point | Action | Qui |
|---|---|---|---|
| 22 | Newsletter | Double opt-in, lien de désinscription dans chaque e-mail, pas de pixel de suivi sans consentement. Conservation 3 ans après le dernier contact. | Maya, Sacha |
| 23 | Accessibilité (European Accessibility Act, depuis le 28/06/2025) | Les micro-entreprises (moins de 10 salariés et chiffre d'affaires ou bilan ≤ 2 M€) sont exemptées pour les services. Viser tout de même un thème proche de WCAG 2.1 AA (contrastes, alternatives textuelles des images). | Sacha |
| 24 | Prix 179 € ou 199 € | Choisir avant l'ouverture. Pas de « prix barré » artificiel (le prix de référence est le plus bas des 30 derniers jours). | Fondateur, Maya |
| 25 | Cohérence des noms de coloris | N'afficher que les coloris définitifs (tech pack v3). | Izaac, Sacha |
| 26 | Traçabilité volontaire | Les obligations d'information environnementale du décret 2022-748 (traçabilité) ne visent que les entreprises au-delà de 10 M€ de chiffre d'affaires et 10 000 unités. Des informations volontaires (pays de chaque étape) restent valorisantes **si elles sont prouvées**. | Izaac |
| 27 | Plateforme européenne de règlement en ligne des litiges (RLL) | Fermée depuis le 20/07/2025 (règlement (UE) 2024/3228) : **ne pas** mettre de lien vers cette plateforme. | Sacha |
| 28 | Archivage | Conserver les versions datées des CGV et les captures des fiches produit (date d'expédition affichée) pour chaque précommande. | Sacha |

---

## (e) Relecture rapide des contenus déjà rédigés (`shopify/contenu/`, 08/10/2026)

Le balisage `[SI CERTIFIÉ]` / `[SI CONFIRMÉ]` d'Izaac et Sacha est conforme. Trois corrections :

1. **« Expédition estimée : [date] »** (copy-site.md §1 et §4 ; fiches-produit.md l. 65) → remplacer par « **Expédition au plus tard le [date]** ». La date annoncée engage KYMA (art. L.216-1) : le mot « estimée » laisse croire au client qu'elle n'est pas contraignante.
2. **Case à cocher « … sa date d'expédition est estimée »** (copy-site.md §4) → à remplacer par : « J'ai compris que cet article est une précommande, expédiée au plus tard le [date], et que le motif de ma pièce est unique et différera des visuels. » La case d'acceptation des CGV reste distincte.
3. **Composition « 100 % coton »** (fiches-produit.md l. 43) → préciser par élément : corps / bords-côtes (95 % coton, 5 % élasthanne) / doublure.

La phrase de copy-site.md §4 marquée « [À VALIDER VICTOIRE] » sur la rétractation en précommande doit reprendre ceci : « Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. »

---

## Sources consultées (08/10/2026)

L'accès direct à Légifrance, economie.gouv.fr et village-justice.com était bloqué depuis l'environnement de travail. Les informations ci-dessous viennent d'extraits de recherche de ces sources et de sources secondaires. **Les articles cités doivent être relus dans leur version en vigueur sur Légifrance avant publication.**

- **Livraison, date, résolution, remboursement 14 jours** : C. conso art. L.216-1 et s. (rédaction de l'ordonnance 2021-1247). DGCCRF, fiches « Livraison : quelles sont les obligations du professionnel et les recours ? » et « E-commerce : les règles entre professionnels et consommateurs » (economie.gouv.fr). INC, « Acheter sur internet en 10 questions-réponses » [consultés le 08/10/2026].
- **Rétractation et exception « bien personnalisé »** : C. conso art. L.221-18 et s., L.221-28 3° (Légifrance, version en vigueur depuis le 28/05/2022). INC, fiche « Délais de réflexion — délais de rétractation » : l'exception vise les biens produits selon les souhaits personnels formulés par le consommateur [08/10/2026].
- **Fonction de rétractation en ligne** : directive (UE) 2023/2673 ; ordonnance n° 2026-2 ; décret n° 2026-3 du 05/01/2026 ; C. conso art. L.221-21 et D.221-5, en vigueur au 19/06/2026. Commentaires : CMS Francis Lefebvre, Bird & Bird (2026), CCI Paris IDF, village-justice.com (É. Kalfon) [08/10/2026].
- **Garanties légales et encadré** : C. conso art. L.217-1 et s. ; décret n° 2022-946 du 29/06/2022 ; annexe à l'art. D.211-2 (Légifrance) ; DGCCRF, « Les garanties légales de conformité et contre les vices cachés » [08/10/2026].
- **Médiation** : C. conso art. L.612-1, L.616-1, R.616-1. DGCCRF, « La médiation de la consommation : ce que vous devez savoir ». CECMC, fiche pratique professionnels, mise à jour du 06/01/2026 [08/10/2026].
- **Plateforme RLL** : règlement (UE) 2024/3228 (EUR-Lex) ; fiche du Parlement européen (OEIL) ; fermeture le 20/07/2025 [08/10/2026].
- **Cookies** : CNIL, lignes directrices et recommandation « cookies et autres traceurs » (recommandation consolidée, cnil.fr, 2026-01) ; CNIL, « Refuser les cookies doit être aussi simple qu'accepter » ; FAQ cookies [08/10/2026].
- **Prospection e-mail** : CPCE art. L.34-5. CNIL, « Communications par voie électronique aux prospects et clients : quelles règles respecter ? » et « Les règles d'or de la prospection par courrier électronique » [08/10/2026].
- **Shopify (RGPD et hébergeur)** : Shopify Help Center, « Shopify's primary contracting entities » (Shopify International Ltd, Irlande, pour l'EMEA) ; Shopify Data Processing Addendum (shopify.com/legal/dpa) ; mentions légales Shopify (fr.shopify.com/legal/mentions-legales ; shopify.com/de/legal/legal-notice-de) [08/10/2026].
- **GOTS** : GOTS Version 7.0 (global-standard.org, en vigueur depuis le 01/03/2024) ; « Conditions for the use of GOTS Signs » v3.1 (18/10/2021) ; GOTS Licensing & Labelling Guide ; Oregon Tilth, « Requirements for GOTS labels » [08/10/2026].
- **Allégations environnementales** : directive (UE) 2024/825 (EUR-Lex) ; DGCCRF, « L'arsenal juridique de la lutte contre l'écoblanchiment bientôt complété » ; village-justice.com (G. Leclerc), « depuis le 27 septembre 2026, la directive s'applique, la France n'a pas transposé » ; KPMG Avocats (01/2026). C. env. art. L.541-9-1 (AGEC) ; Conseil d'État, 31/05/2024, n° 464945 ; loi Climat et Résilience (neutralité carbone) [08/10/2026].
- **Origine « Made in »** : DGCCRF, « Le fabriqué en France : la garantie de l'origine des produits » ; service-public.fr F33797 ; code des douanes de l'Union (règlement (UE) 952/2013, art. 60) et règlement délégué (UE) 2015/2446, annexe 22-01 [08/10/2026].
- **Étiquetage textile** : règlement (UE) 1007/2011, art. 4, 11 et 16 (EUR-Lex / legislation.gov.uk) ; DGCCRF, « L'étiquetage des vêtements » ; economie.gouv.fr, « Vêtements : les 6 indications à bien repérer » (19/09/2025) [08/10/2026].
- **Traçabilité AGEC** : décret n° 2022-748 du 29/04/2022 (seuil de 10 M€ et 10 000 unités depuis le 01/01/2025), selon des synthèses SGS et Intertek [08/10/2026].
- **REP textiles et emballages** : C. env. art. L.541-10 et s. ; Refashion, guide d'adhésion ; ministère de la Transition écologique, « Produits textiles (TLC) » [08/10/2026].
- **Visuels non contractuels** : C. conso art. L.121-2 (pratiques trompeuses) ; DGCCRF (délit de tromperie) ; Cass. 1re civ., 06/05/2010, n° 08-14.461 (valeur contractuelle des documents publicitaires précis, référence secondaire non vérifiée) [08/10/2026].
- **Accessibilité** : directive (UE) 2019/882 (European Accessibility Act), applicable depuis le 28/06/2025, avec exemption des micro-entreprises pour les services (sources secondaires) [08/10/2026].

---

## Cercle Waves (abonnement) : ajout du 09/10/2026

> **Décision du fondateur** : le Cercle Waves devient un abonnement payant. **INITIUM 12,99 € TTC par trimestre** et **MAJESTÉ 39,99 € TTC par trimestre**, renouvellement automatique. L'ancien palier ORIGINE disparaît. Cette section **remplace** les points 16 et 18 ci-dessus. Texte de la page : `pages/legal/cercle-waves-conditions.html` (v2, réécrit). Les avantages et leurs valeurs ne sont pas validés : ils sont tous en `[À COMPLÉTER]` dans la page.
> **Rappel unique** : modèles à faire relire par un avocat en droit de la consommation avant publication, et par l'expert-comptable pour la TVA du crédit.
> **Sources** : l'accès direct à Légifrance et à economie.gouv.fr est bloqué depuis l'environnement de travail. Les règles ci-dessous viennent d'extraits de recherche (Légifrance, INC, DGCCRF, questions parlementaires) et de sources secondaires. **Relire les articles sur Légifrance** avant publication.

### 1. Cadre en vigueur (synthèse)

| Sujet | Règle | Conséquence pour KYMA | Certitude |
|---|---|---|---|
| **Informations précontractuelles et prix** | C. conso art. L.111-1, L.112-1 (prix TTC), L.221-5 (contrat à distance : caractéristiques, prix TTC, durée, conditions de reconduction et de résiliation, rétractation, médiation). Art. L.221-14 : bouton « commande avec obligation de paiement ». Art. L.221-13 : confirmation sur support durable. | Afficher avant le clic : prix TTC par trimestre, renouvellement automatique, date du prochain prélèvement, durée, façon de résilier, rétractation (texte au 2 ci-dessous). | Élevée |
| **Rétractation 14 jours (service)** | Art. L.221-18 : 14 jours à compter de la conclusion. Art. L.221-25 : si le client demande **expressément** que le service démarre avant la fin des 14 jours, il ne paie, en cas de rétractation, que le **montant proportionnel au service déjà fourni** ; si la demande n'a pas été recueillie, ou si l'information sur ce paiement manque (art. L.221-5 9°), il ne doit **rien**. La DGCCRF a sanctionné en 2024 un professionnel qui n'avait pas informé du paiement dû (amende administrative jusqu'à 75 000 € pour une personne morale, art. L.242-13). L'exception de l'art. L.221-28 1° (service pleinement exécuté) ne joue pas : un trimestre n'est pas exécuté en 14 jours. | Case de démarrage immédiat obligatoire, non pré-cochée. Calcul : prix du trimestre × jours écoulés ÷ jours de la période. **Avantage déjà utilisé** : aucune retenue en plus du prorata (risque de pénalité dissuasive). Crédit non utilisé annulé, achats déjà faits conservés, carte non renvoyée. Fonction « Renoncer au contrat ici » obligatoire (voir (b)). | Élevée sur le principe ; **moyenne** sur les avantages utilisés (pas de texte spécifique, choix prudent) |
| **Reconduction tacite** | Art. L.215-1 : le professionnel informe le consommateur **par écrit (lettre ou e-mail dédiés)**, **au plus tôt 3 mois et au plus tard 1 mois avant** le terme de la période permettant de refuser la reconduction, avec la date limite dans un **encadré visible**. À défaut : résiliation gratuite à tout moment à compter de la reconduction, remboursement sous 30 jours des sommes versées d'avance après la dernière reconduction, déduction faite du service fourni. | Rappel à envoyer **au moins 1 mois avant le renouvellement** (cible J-35), pas à J-7. E-mail dédié, avec encadré. Un second rappel à J-7 est une bonne pratique, non suffisant seul. | Élevée (texte) ; **moyenne** sur l'application à un contrat résiliable à tout moment (lecture la plus sûre retenue) |
| **Résiliation en ligne** | Art. L.215-1-1 (loi n° 2022-1158 du 16/08/2022) et décret n° 2023-417 du 31/05/2023 (en vigueur depuis le 01/06/2023) : si le contrat peut être conclu en ligne, le professionnel offre une fonctionnalité de résiliation **gratuite, directe, permanente et facile d'accès**, libellée « résilier votre contrat » ou formule analogue sans ambiguïté, qui ne demande que les informations d'identification (identité, coordonnées, références du contrat, date d'effet souhaitée, motif facultatif), puis une page récapitulative et un bouton de confirmation. Le professionnel **confirme la réception sur support durable** et indique la date de fin et les effets. Aucune création de compte ne peut être exigée si le contrat n'en nécessitait pas. Sanction : amende administrative (75 000 € pour une personne morale selon les sources, à vérifier) ; la DGCCRF a mis fin à sa tolérance. | Le « bouton 3 clics » est un raccourci des médias : le texte parle de quelques validations. Nous visons **3 clics maximum** depuis le compte (« Mon abonnement » > « Résilier mon abonnement » > « Confirmer »). Lien public « Résilier mon abonnement » en pied de page. Aucun parcours dissuasif (offre de rétention bloquante, champs inutiles). | Élevée (principe) ; **moyenne** sur les rubriques exactes (relire D.215-1 à D.215-3) |
| **Cashback** | Aucun texte spécifique sur la validité d'un cashback ou d'un avoir de fidélité, ni durée minimale légale (aucune fiche DGCCRF trouvée). S'appliquent : pratiques trompeuses (art. L.121-2), clauses abusives (art. L.212-1 et R.212-1 s., déséquilibre significatif), information claire sur taux, assiette, conditions et expiration. Le client **paie** pour obtenir l'avantage : une perte automatique du crédit acquis à la résiliation est un risque de clause abusive. Fiscalité : une prime de fidélité s'analyse en réduction de prix (BOFiP) ; un avoir utilisable chez le même vendeur peut relever des « bons » (art. 256 ter CGI, directive (UE) 2016/1065 ; usage unique = TVA à l'émission, usages multiples = TVA à l'utilisation). Un crédit **remboursable en argent** changerait de nature (paiement / monnaie électronique : à vérifier). | Choisir un **avoir (Crédit Waves)** non remboursable en espèces, jamais présenté comme de « l'argent remboursé ». Afficher taux, assiette, date de versement, validité (≥ 12 mois recommandé), usage partiel, maintien après résiliation (6 mois proposés). Versement **après** l'expiration du délai de rétractation de la commande, annulation en cas de retour. TVA à faire valider par l'expert-comptable. | **Moyenne** : pas de texte précis ; avocat et expert-comptable |
| **« Priorité stock garantie »** | Art. L.121-2 (allégation fausse ou trompeuse sur la disponibilité) ; art. L.121-4 (fausse rareté, sanction sans preuve d'altération). Une promesse précise peut devenir **contractuelle**. | **À retirer.** KYMA produit en petites séries après précommande : aucune garantie de stock n'est tenable (rupture, défaut de production). Une part réservée n'est possible que chiffrée et respectée. | Élevée |
| **« Statut élite »** | Art. L.121-2 : exclusivité alléguée alors que l'accès s'obtient en payant 39,99 € sans sélection : risque d'induire en erreur sur la nature et les qualités de l'offre. Risque modéré, plus fort si le statut est présenté comme rare ou mérité. | **À retirer.** Utiliser « palier MAJESTÉ ». « Accès réservé aux abonnés MAJESTÉ » est exact. | Moyenne à élevée |
| **Carte physique** | Carte de membre nominative, accessoire de l'abonnement ; contrat mixte (bien + service). Pas un moyen de paiement tant qu'elle ne contient aucune valeur stockée. Si une valeur y est stockée ou si elle permet de payer ailleurs : risque de monnaie électronique ou d'instrument de paiement (agrément ACPR). Livraison : art. L.216-1 (date ou délai, à défaut 30 jours). Rétractation : KYMA ne demande pas le renvoi (choix simple ; sinon art. L.221-23 : frais de renvoi au client s'il en a été informé). Allégations sur la carte (matière, « numérotée ») seulement si exactes. | Carte « sans valeur monétaire, non rechargeable, pas un moyen de paiement ». Envoi inclus dans le prix. Délai d'envoi affiché. | Moyenne à élevée |

### 2. Mentions obligatoires : texte exact prêt à coller

**A. Sur la page Cercle Waves (en-tête, sous le titre).**

> **Cercle Waves : abonnement trimestriel.** INITIUM : 12,99 € TTC par trimestre. MAJESTÉ : 39,99 € TTC par trimestre. L'abonnement est renouvelé automatiquement tous les 3 mois jusqu'à sa résiliation. Vous pouvez le résilier à tout moment en ligne, en quelques clics depuis votre espace client, sans frais ; la résiliation prend effet à la fin du trimestre payé. Vous disposez de 14 jours pour vous rétracter. Réservé aux personnes majeures. [Lire les conditions du Cercle Waves]

**B. Sous les cartes de chaque palier.**

> INITIUM : **12,99 € TTC / trimestre**. Prélevé à la souscription puis tous les 3 mois, renouvellement automatique. Résiliable à tout moment en ligne, sans frais. Rétractation possible sous 14 jours. Avantages soumis à conditions : voir les [conditions]. Réservé aux majeurs.
>
> MAJESTÉ : **39,99 € TTC / trimestre**. [même suite]

Un montant annuel peut s'ajouter (« soit 51,96 € TTC pour 4 trimestres » pour INITIUM, « 159,96 € » pour MAJESTÉ), mais seulement avec la précision « si vous restez abonné 4 trimestres ». Il n'est pas obligatoire.

**C. Au paiement (panier ou checkout, Sacha).**

*Bloc récapitulatif* :
> **Cercle Waves, palier [INITIUM / MAJESTÉ].** [12,99 € / 39,99 €] TTC par trimestre, payés aujourd'hui puis tous les 3 mois. Prochain prélèvement le [JJ/MM/AAAA], puis tous les 3 mois, jusqu'à votre résiliation. Renouvellement automatique. Résiliation à tout moment en ligne : Mon compte > Mon abonnement > Résilier. Effet à la fin de la période payée.

*Case 1 (obligatoire, non pré-cochée)* :
> J'ai lu et j'accepte les conditions du Cercle Waves et les CGV. Je comprends que mon abonnement est renouvelé automatiquement tous les 3 mois au prix de [12,99 € / 39,99 €] TTC, et que je peux le résilier à tout moment en ligne.

*Case 2 (obligatoire pour démarrer tout de suite, non pré-cochée)* :
> Je demande expressément que mon abonnement commence immédiatement, avant la fin du délai de rétractation de 14 jours. Je reconnais que, si je me rétracte, je devrai payer un montant proportionnel au service déjà fourni jusqu'à ma demande (prix du trimestre × jours écoulés ÷ nombre de jours du trimestre).

*Bouton final* :
> **Je m'abonne : commande avec obligation de paiement**

Sur un forfait Shopify hors Plus, le libellé du bouton de paiement du checkout n'est pas librement modifiable. Si seul le libellé par défaut est disponible, ajouter juste au-dessus : « En cliquant sur ce bouton, vous vous abonnez au Cercle Waves avec obligation de paiement. » Formule à faire valider par l'avocat.

**D. E-mail de confirmation.** Il contient : palier, prix TTC par trimestre, dates du premier et du prochain prélèvement, renouvellement automatique, avantages (comme dans les conditions), lien direct de résiliation, formulaire type de rétractation, lien « Renoncer au contrat ici », copie des conditions et des CGV, coordonnées du service client et du médiateur.

**E. E-mail de rappel avant reconduction (J-35, e-mail dédié).**

> **Objet : Votre abonnement Cercle Waves sera renouvelé le [JJ/MM/AAAA]**
>
> Bonjour [Prénom],
>
> Votre abonnement Cercle Waves (palier [INITIUM / MAJESTÉ]) sera renouvelé automatiquement pour 3 mois le **[JJ/MM/AAAA]**, au prix de **[12,99 € / 39,99 €] TTC**, prélevé sur votre moyen de paiement enregistré.
>
> **[Encadré] Vous pouvez refuser ce renouvellement et résilier gratuitement jusqu'au [JJ/MM/AAAA].**
>
> [Bouton : Résilier mon abonnement]
>
> Sans action de votre part, votre abonnement continue. Vous pouvez aussi le résilier à tout moment depuis Mon compte > Mon abonnement. Vos avantages restent actifs jusqu'à la fin de la période payée. [Si le prix change : nouveau prix et date d'effet.]
>
> KYMA — [coordonnées du service client]

### 3. Formulations d'avantages : autorisées et à éviter

| Avantage annoncé | À éviter | Autorisé (si l'avantage est validé et tenu) |
|---|---|---|
| Cashback 5 % / 10 % | « Cashback », « argent remboursé », « jusqu'à 10 % » sans dire quel palier, « gagnez de l'argent ». | « **Crédit Waves : [5 %] (INITIUM) / [10 %] (MAJESTÉ) du prix de vos achats reversés en avoir**, utilisable sur vos prochains achats. Versé après l'expiration du délai de rétractation, valable [12] mois, non remboursable en espèces. » |
| Accès prioritaire aux drops | « Accès garanti », « toujours servi en premier », « sans file d'attente » si faux. | « **Accès anticipé de [24 h / 72 h]** avant l'ouverture au public. Il ne garantit pas la disponibilité : les quantités sont limitées. » |
| Précommandes en avant-première | « Avant tout le monde » (non vérifiable) ; date d'expédition différente non annoncée. | « Précommandez avant l'ouverture au public ([durée]). La date d'expédition est affichée sur chaque produit. » |
| Drops réservés aux membres | « Drops introuvables ailleurs » ; « édition limitée » sans quantité. | « Produits réservés aux abonnés [MAJESTÉ], dans la limite de [N] pièces par coloris, quantité indiquée sur la page du produit. » |
| Carte physique | « Carte exclusive en métal », « numérotée » si faux ; « carte de crédit / de paiement ». | « **Carte de membre nominative** envoyée avec votre abonnement MAJESTÉ (sans valeur monétaire, pas un moyen de paiement). » Matière et numérotation seulement si exactes. |
| « Priorité stock garantie » | **Retirer**, toute formule avec « garantie ». | Seulement chiffré : « [N] pièces par coloris réservées aux abonnés pendant l'accès anticipé. » |
| « Statut élite » | **Retirer**. | « Palier MAJESTÉ ». Pas de « cercle fermé », « sélection », « VIP » si l'accès s'obtient par paiement. |
| Engagement | « Sans engagement » (le contrat est reconduit par périodes de 3 mois), « gratuit », « 0 € » sans condition. | « **Résiliable à tout moment en ligne, sans frais.** Renouvellement automatique tous les 3 mois. » |

Règle générale : tout avantage affiché est **chiffré, daté, conditionné et vérifiable**. Un avantage non validé par le fondateur n'apparaît ni sur le site, ni sur Instagram (Maya), ni dans les métadonnées.

### 4. Mise en œuvre technique (Sacha)

1. **Application d'abonnement.** Utiliser une application compatible avec le prestataire de paiement (par exemple *Shopify Subscriptions*, ou une application tierce reconnue : à comparer sur le portail client, les e-mails automatiques, la facturation récurrente et la 3D Secure aux renouvellements). Deux plans de vente : INITIUM 12,99 € / 3 mois, MAJESTÉ 39,99 € / 3 mois, TTC. Pas de période d'essai gratuite sans validation préalable de Victoire. Aucun abonnement réel encaissé tant que la boutique est sur le plan d'essai (point 10).
2. **Contenu réservé.** Avantages gérés par tag client (`cercle-initium`, `cercle-majeste`) : accès anticipé (collection ou page protégée par tag), drops réservés. Tag retiré à la fin de la période payée.
3. **Crédit Waves.** Application de fidélité ou Shopify Flow + avoirs. Règles : taux par palier, assiette (hors livraison et cotisation), versement après l'expiration du délai de rétractation (à confirmer), annulation en cas de retour, e-mail d'alerte 30 jours avant l'expiration. Non remboursable en espèces.
4. **Bouton de résiliation.** Portail client : « Mon abonnement » > « Résilier mon abonnement » > « Confirmer la résiliation ». 3 clics maximum depuis le compte, sans offre de rétention obligatoire, sans champ superflu, motif facultatif. Page publique `/pages/resilier-abonnement` (lien en pied de page) qui identifie le contrat par e-mail et référence d'abonnement. E-mail de confirmation immédiat (support durable) avec la date de fin. Test complet documenté (captures) avant ouverture.
5. **E-mail de rappel.** Planifier à J-35 (Shopify Flow, Klaviyo ou fonction de l'application) avec le modèle E et l'encadré. Vérifier la délivrabilité (SPF/DKIM). Conserver la preuve d'envoi (journal ou export) : en cas de litige, c'est KYMA qui doit la fournir.
6. **Cases et mentions au paiement.** Hors forfait Plus, les cases personnalisées du checkout ne sont pas disponibles en natif : les placer sur la page du panier (case obligatoire qui bloque le bouton de commande, valeur enregistrée dans les attributs de commande, pour prouver le consentement et la demande de démarrage immédiat).
7. **Rétractation.** La fonction « Renoncer au contrat ici » couvre aussi l'abonnement. Le remboursement partiel au prorata se fait depuis l'administration Shopify.
8. **Pied de page et espace client.** Ajouter « Résilier mon abonnement » et « Conditions du Cercle Waves ».
9. **Carte physique.** Flux d'expédition à définir avec le fondateur (une seule fois, à la première souscription MAJESTÉ). Aucune valeur stockée (numéro ou QR code d'identification uniquement).
10. **Données.** Mettre à jour `confidentialite.html` (finalité « gestion de l'abonnement », application d'abonnement comme sous-traitant, durées de conservation).
11. **Majeurs.** Mention « réservé aux majeurs » et déclaration de majorité à la souscription.

### 5. Points bloquants et vigilance

**🔴 Bloquant avant ouverture de l'abonnement**

| # | Risque | Action | Qui |
|---|---|---|---|
| C1 | **Avantages non validés** : promettre des avantages non définis ou non tenables est une pratique trompeuse (art. L.121-2). | Le fondateur valide la liste finale et chiffrée (taux par palier, durée d'accès anticipé, quantités réservées, nature de la carte). Compléter tous les `[À COMPLÉTER]`. | Fondateur |
| C2 | **« Priorité stock garantie » et « statut élite »** à retirer de tous les supports (site, Instagram, newsletter, fiches). | Appliquer le tableau 3. | Maya, Izaac, Sacha |
| C3 | **Bouton de résiliation en ligne** absent ou compliqué (art. L.215-1-1, décret 2023-417). | Mettre en place et tester (4.4). | Sacha |
| C4 | **E-mail de rappel avant reconduction** absent ou tardif (art. L.215-1) : résiliation gratuite à tout moment et remboursement. | Envoi à J-35, encadré, preuve d'envoi. | Sacha |
| C5 | **Case de démarrage immédiat et information sur le prorata** absentes (art. L.221-5 9°, L.221-25) : rien à payer en cas de rétractation. | Case 2 et information dans l'e-mail de confirmation. | Sacha |
| C6 | **Société non immatriculée** et mentions légales incomplètes : impossible de conclure un abonnement et de prélever (voir point 1). | Immatriculation d'abord. | Fondateur |
| C7 | **Aucun prélèvement avant relecture de l'avocat** des conditions. | Relecture par un avocat. | Fondateur |

**🟠 À régler rapidement**

| # | Risque | Action | Qui |
|---|---|---|---|
| O1 | **TVA** du Crédit Waves (réduction de prix ou bon) et TVA de l'abonnement selon le pays du client (guichet unique au-delà de 10 000 € de ventes UE). | Expert-comptable. | Fondateur |
| O2 | **Validité du crédit et sort à la résiliation** : expiration trop courte ou perte à la résiliation = risque de clause abusive. | Valider les durées (12 mois et 6 mois proposés). | Fondateur, avocat |
| O3 | **Précommande + accès anticipé** : la date d'expédition de chaque drop reste obligatoire (point 3). L'accès anticipé ne la modifie pas. | Afficher la date sur chaque produit. | Sacha |
| O4 | **Médiateur** non désigné (point 7). | Ajouter ses coordonnées (article 15 de la page). | Fondateur |
| O5 | **Mise à jour de `confidentialite.html`, `cgv.html` et du pied de page** (abonnement, résiliation, rétractation). | Victoire met à jour après validation des règles ; Sacha intègre. | Victoire, Sacha |
| O6 | **Préavis de 60 jours pour une hausse de prix** (le texte ne fixe pas de durée). | Valider avec l'avocat. | Avocat |
| O7 | **Accès réservé aux abonnés** (refus de vente, discrimination) : le critère est objectif (abonnement) et non lié à la personne. | Confirmation par l'avocat. | Avocat |
| O8 | **Traitement des avantages utilisés en cas de rétractation** (pas de texte précis). | Confirmer le choix « prorata seul » avec l'avocat. | Avocat |

**🟢 Bonnes pratiques**

| # | Point | Action | Qui |
|---|---|---|---|
| G1 | Second rappel à J-7 en plus du rappel légal à J-35. | Flow supplémentaire. | Sacha |
| G2 | Proposer pause ou rétrogradation au moment de la résiliation, sans bloquer le bouton. | Option dans le portail client. | Sacha |
| G3 | Archiver les versions datées des conditions et la capture des mentions affichées à chaque souscription. | Dossier de preuves. | Sacha |
| G4 | Éviter « club privé », « cercle fermé », « sélection » si l'accès n'est pas sélectif. | Relecture de Maya. | Victoire |
| G5 | Veille : une question parlementaire du 30/06/2026 évoque une limitation des reconductions tacites ; réforme européenne de l'équité numérique en discussion. | Veille trimestrielle. | Victoire |

### 6. Sources de cette section (consultées le 09/10/2026)

- **Résiliation en ligne** : C. conso art. L.215-1-1 (loi n° 2022-1158 du 16/08/2022, art. 17) ; décret n° 2023-417 du 31/05/2023 (D.215-1 à D.215-3), JO du 01/06/2023 ; INC, « Vous pouvez résilier votre contrat d'abonnement en quelques clics » (inc-conso.fr) ; CCI Paris Île-de-France, « Nouvelle fonctionnalité de résiliation des contrats en ligne » ; Deloitte Société d'Avocats ; Seban & Associés ; résumés du décret par la médiation des communications électroniques.
- **Reconduction tacite** : C. conso art. L.215-1 (version en vigueur depuis le 18/08/2022), Légifrance ; réponses ministérielles à l'Assemblée nationale (QE n° 1438, 15e législature) ; question écrite n° 16374 (17e législature).
- **Rétractation et démarrage anticipé** : C. conso art. L.221-5, L.221-18, L.221-25, L.221-28, L.242-13 ; DGCCRF, sanction de février 2024 rapportée par Simon Associés, « Lettre de la Consommation » (mars 2024).
- **Pratiques trompeuses et disponibilité** : C. conso art. L.121-2 et L.121-4 ; DGCCRF, « Pratiques commerciales trompeuses » (economie.gouv.fr).
- **Cashback, fidélité, TVA** : C. conso art. L.212-1 et R.212-1 s. ; BOFiP BOI-TVA-BASE-10-10-30 ; art. 256 ter CGI, directive (UE) 2016/1065. Aucune règle spécifique sur la validité d'un cashback trouvée : analyse par les règles générales.
- **Rétractation en ligne (« Renoncer au contrat ici »)** : voir section (b).

> **Décision du fondateur (09/10/2026)** : le terme **« cashback »** est conservé dans la communication Cercle Waves (mot connu et rassurant pour la cible). Condition à respecter : sous l'avantage, préciser sa nature exacte — par ex. « Cashback versé en crédit KYMA, utilisable sur vos prochains achats, valable [À COMPLÉTER] mois » — pour ne pas laisser croire à un remboursement en argent.
