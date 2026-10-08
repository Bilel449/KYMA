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
| `pages/legal/cercle-waves-conditions.html` | Page `/pages/cercle-waves-conditions` (**ne pas publier avant d'avoir défini les règles**) |

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

**Visuels (rendus).** Sous chaque visuel qui est un rendu, Sacha affiche la mention : « **Visuel de présentation (rendu) — chaque pièce ayant un motif unique, la vôtre sera différente.** » Une mention « non contractuel » ne rend pas licite un visuel trompeur. Le rendu doit donc rester fidèle à la coupe, au coloris et aux finitions réels. Remplacer les rendus par des photos du produit fabriqué dès le shooting des préséries.

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
18. Règles du Cercle Waves : gratuit ou payant, critères d'accès à INITIUM et à ORIGINE, avantages, points, durée de validité.

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
| 16 | **Cercle Waves** sans règles : un programme flou peut être une pratique trompeuse. | Définir les règles, compléter le squelette et le faire valider avant toute promotion. | Fondateur, Maya |
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
