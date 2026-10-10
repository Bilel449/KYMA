# KYMA — Note de conformité juridique du site Shopify

> **Auteur** : Victoire (juriste KYMA) · **Version** : v1 du 08/10/2026 (section Cercle Waves du 09/10/2026 ; sections « Entraide 09/10/2026 » et « Statut juridique » en fin de note ; corrections d'Arthur du 10/10/2026 appliquées ; concordance avec les notes d'Abdou du 10/10/2026 en section 9 du statut) · **Boutique** : kymas-store.myshopify.com (essai, rien de publié)
> **Destinataires** : Arthur (validation), Clémentine, Izaac, Maya, Sacha, fondateur.
> **Rappel unique** : les textes de `shopify/pages/legal/` et cette note sont des **modèles**. Ils doivent être relus et validés par un avocat (droit de la consommation / RGPD) avant toute mise en ligne.

**Hypothèses retenues** (à confirmer par le fondateur) : Drop 1 = hoodie zippé oversize, 5 coloris (tech pack v3), 179 € TTC. Vente en précommande, production lancée après encaissement, délai indicatif d'environ 18 semaines après validation fabricant. SASU envisagée, non immatriculée. Composition annoncée « 100 % coton bio GOTS » sans certificat. Fabrication au Portugal sans fabricant signé. Motif unique par pièce, sans personnalisation à la demande. Visuels = rendus/maquettes. Cercle Waves sans règles. Newsletter prévue.

**Fichiers livrés** (HTML simple, à coller dans *Shopify > Paramètres > Politiques* ou *Boutique en ligne > Pages*) :

| Fichier | Où le coller dans Shopify |
|---|---|
| `pages/legal/mentions-legales.html` | Politiques > « Mentions légales » (Legal notice) |
| `pages/legal/cgv.html` | Politiques > « Conditions d'utilisation / de vente » (Terms of service) |
| `pages/legal/retours-remboursements.html` | Politiques > « Politique de remboursement » |
| `pages/legal/livraison.html` | Politiques > « Politique d'expédition » |
| `pages/legal/confidentialite.html` | Politiques > « Politique de confidentialité » (remplacer le modèle Shopify) |
| `pages/legal/cookies.html` | Page `/pages/cookies` |
| `pages/legal/cercle-waves-conditions.html` | Page `/pages/cercle-waves-conditions` (**v3.2 du 10/10/2026 : avantages alignés sur la section « Entraide 09/10/2026 » et sur les notes d'Abdou ; ne pas publier avant validation des avantages et des valeurs entre crochets, voir le tableau D bis**) |

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

**Visuels (rendus).** Sous chaque visuel qui est un rendu, Sacha affiche la mention : « **Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer.** » (formule mise à jour le 08/10/2026 : repli conforme au tableau d'unicité tant que les préséries ne sont pas validées — à confirmer par Victoire) Une mention « non contractuel » ne rend pas licite un visuel trompeur : l'art. L.121-2 s'apprécie sur l'ensemble de la présentation du produit (jurisprudence spécifique sur les visuels « non contractuels » : non vérifiée). Le rendu doit donc rester fidèle à la coupe, au coloris et aux finitions réels. Remplacer les rendus par des photos du produit fabriqué dès le shooting des préséries. **[Mise à jour 09/10/2026 : cette formule est jugée insuffisante seule et doit être remplacée par la version de la section « Entraide 09/10/2026 », partie E, correction R1.]**

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
18. Règles du Cercle Waves : gratuit ou payant, critères d'accès à INITIUM et à ORIGINE, avantages, points, durée de validité. **[Tranché le 09/10/2026 : abonnement payant INITIUM / MAJESTÉ, voir la dernière section. Restent à fournir : valeur et durée de chaque avantage, quantités réservées, nature de la carte. Voir le tableau D bis.]**

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
- **Visuels non contractuels** : C. conso art. L.121-2 (pratiques trompeuses, appréciation globale de la présentation) ; DGCCRF (délit de tromperie). Jurisprudence spécifique sur les visuels ou photos « non contractuels » : **non vérifiée** (une référence secondaire, Cass. 1re civ., 06/05/2010, n° 08-14.461, valeur contractuelle des documents publicitaires précis, n'a pas été relue) [08/10/2026].
- **Accessibilité** : directive (UE) 2019/882 (European Accessibility Act), applicable depuis le 28/06/2025, avec exemption des micro-entreprises pour les services (sources secondaires) [08/10/2026].

---

## Cercle Waves (abonnement) : ajout du 09/10/2026

> **Décision du fondateur** : le Cercle Waves devient un abonnement payant. **INITIUM 12,99 € TTC par trimestre** et **MAJESTÉ 39,99 € TTC par trimestre**, renouvellement automatique. L'ancien palier ORIGINE disparaît. Cette section **remplace** les points 16 et 18 ci-dessus. Texte de la page : `pages/legal/cercle-waves-conditions.html` (v3.2, voir la section « Entraide 09/10/2026 » en fin de note). Les avantages et leurs valeurs ne sont pas validés par le fondateur.
> **Rappel unique** : modèles à faire relire par un avocat en droit de la consommation avant publication, et par l'expert-comptable pour la TVA du crédit.
> **Sources** : l'accès direct à Légifrance et à economie.gouv.fr est bloqué depuis l'environnement de travail. Les règles ci-dessous viennent d'extraits de recherche (Légifrance, INC, DGCCRF, questions parlementaires) et de sources secondaires. **Relire les articles sur Légifrance** avant publication.

### 1. Cadre en vigueur (synthèse)

| Sujet | Règle | Conséquence pour KYMA | Certitude |
|---|---|---|---|
| **Informations précontractuelles et prix** | C. conso art. L.111-1, L.112-1 (prix TTC), L.221-5 (contrat à distance : caractéristiques, prix TTC, durée, conditions de reconduction et de résiliation, rétractation, médiation). Art. L.221-14 : bouton « commande avec obligation de paiement ». Art. L.221-13 : confirmation sur support durable. | Afficher avant le clic : prix TTC par trimestre, renouvellement automatique, date du prochain prélèvement, durée, façon de résilier, rétractation (texte au 2 ci-dessous). | Élevée |
| **Rétractation 14 jours (service)** | Art. L.221-18 : 14 jours à compter de la conclusion. Art. L.221-25 : si le client demande **expressément** que le service démarre avant la fin des 14 jours, il ne paie, en cas de rétractation, que le **montant proportionnel au service déjà fourni** ; si la demande n'a pas été recueillie, ou si l'information sur ce paiement manque (art. L.221-5 9°), il ne doit **rien**. La DGCCRF a sanctionné en 2024 un professionnel qui n'avait pas informé du paiement dû (amende administrative jusqu'à 75 000 € pour une personne morale, art. L.242-13). L'exception de l'art. L.221-28 1° (service pleinement exécuté) ne joue pas : un trimestre n'est pas exécuté en 14 jours. | Case de démarrage immédiat obligatoire, non pré-cochée. Calcul : prix du trimestre × jours écoulés ÷ jours de la période. **Avantage déjà utilisé** : aucune retenue en plus du prorata (risque de pénalité dissuasive). Crédit non utilisé annulé, achats déjà faits conservés, carte non renvoyée. Fonction « Renoncer au contrat ici » obligatoire (voir (b)). | Élevée sur le principe ; **moyenne** sur les avantages utilisés (pas de texte spécifique, choix prudent) |
| **Reconduction tacite** | Art. L.215-1 : le professionnel informe le consommateur **par écrit (lettre ou e-mail dédiés)**, **au plus tôt 3 mois et au plus tard 1 mois avant** le terme de la période permettant de refuser la reconduction, avec la date limite dans un **encadré visible**. À défaut : résiliation gratuite à tout moment à compter de la reconduction, remboursement sous 30 jours des sommes versées d'avance après la dernière reconduction, déduction faite du service fourni. | Rappel à envoyer **au moins 1 mois avant le renouvellement** (cible J-35), pas à J-7. E-mail dédié, avec encadré. Un second rappel à J-7 est une bonne pratique, non suffisant seul. C'est une **information légale obligatoire**, pas une prospection : elle part **même si le client a refusé les e-mails marketing** et ne contient aucune offre (voir E7). | Élevée (texte) ; **moyenne** sur l'application à un contrat résiliable à tout moment (lecture la plus sûre retenue) |
| **Résiliation en ligne** | Art. L.215-1-1 (loi n° 2022-1158 du 16/08/2022) et décret n° 2023-417 du 31/05/2023 (en vigueur depuis le 01/06/2023) : si le contrat peut être conclu en ligne, le professionnel offre une fonctionnalité de résiliation **gratuite, directe, permanente et facile d'accès**, libellée « résilier votre contrat » ou formule analogue sans ambiguïté, qui ne demande que les informations d'identification (identité, coordonnées, références du contrat, date d'effet souhaitée, motif facultatif), puis une page récapitulative et un bouton de confirmation. Le professionnel **confirme la réception sur support durable** et indique la date de fin et les effets. Aucune création de compte ne peut être exigée si le contrat n'en nécessitait pas. Sanction : amende administrative (75 000 € pour une personne morale selon les sources, à vérifier) ; la DGCCRF a mis fin à sa tolérance. | Le « bouton 3 clics » est un raccourci des médias : le texte parle de quelques validations. Nous visons **3 clics maximum** depuis le compte (« Mon abonnement » > « Résilier mon abonnement » > « Confirmer »). Lien public « Résilier mon abonnement » en pied de page. Aucun parcours dissuasif (offre de rétention bloquante, champs inutiles). | Élevée (principe) ; **moyenne** sur les rubriques exactes (relire D.215-1 à D.215-3) |
| **Cashback** | Aucun texte spécifique sur la validité d'un cashback ou d'un avoir de fidélité, ni durée minimale légale (aucune fiche DGCCRF trouvée). S'appliquent : pratiques trompeuses (art. L.121-2), clauses abusives (art. L.212-1 et R.212-1 s., déséquilibre significatif), information claire sur taux, assiette, conditions et expiration. Le client **paie** pour obtenir l'avantage : une perte automatique du crédit acquis à la résiliation est un risque de clause abusive. Fiscalité : une prime de fidélité s'analyse en réduction de prix (BOFiP) ; un avoir utilisable chez le même vendeur peut relever des « bons » (art. 256 ter CGI, directive (UE) 2016/1065 ; usage unique = TVA à l'émission, usages multiples = TVA à l'utilisation). Un crédit **remboursable en argent** changerait de nature (paiement / monnaie électronique : à vérifier). **[10/10/2026 : Abdou retient la qualification « réduction de prix sur l'achat suivant », probablement pas un « bon » (`finance/cercle-waves-economie.md`) : concordant, voir section « Statut juridique », point 9.]** | Choisir un **avoir (Crédit Waves)** non remboursable en espèces, appliqué comme réduction du prix de l'achat suivant, jamais présenté comme de « l'argent remboursé ». Afficher taux, assiette, date de versement, validité (≥ 12 mois recommandé), usage partiel, maintien après résiliation (6 mois proposés), recrédit si la commande est annulée. Versement **après** l'expiration du délai de rétractation de la commande, annulation en cas de retour. TVA à faire valider par l'expert-comptable. | **Moyenne** : pas de texte précis ; avocat et expert-comptable |
| **« Priorité stock garantie »** | Art. L.121-2 (allégation fausse ou trompeuse sur la disponibilité) ; art. L.121-4 (fausse rareté, sanction sans preuve d'altération). Une promesse précise peut devenir **contractuelle**. | **À retirer.** KYMA produit en petites séries après précommande : aucune garantie de stock n'est tenable (rupture, défaut de production). Une part réservée n'est possible que chiffrée et respectée. | Élevée |
| **« Statut élite »** | Art. L.121-2 : exclusivité alléguée alors que l'accès s'obtient en payant 39,99 € sans sélection : risque d'induire en erreur sur la nature et les qualités de l'offre. Risque modéré, plus fort si le statut est présenté comme rare ou mérité. | **À retirer.** Utiliser « palier MAJESTÉ ». « Accès réservé aux abonnés MAJESTÉ » est exact. | Moyenne à élevée |
| **Carte physique** | Carte de membre nominative, accessoire de l'abonnement ; contrat mixte (bien + service). Pas un moyen de paiement tant qu'elle ne contient aucune valeur stockée. Si une valeur y est stockée ou si elle permet de payer ailleurs : risque de monnaie électronique ou d'instrument de paiement (agrément ACPR). Livraison : art. L.216-1 (date ou délai, à défaut 30 jours). Rétractation : KYMA ne demande pas le renvoi (choix simple ; sinon art. L.221-23 : frais de renvoi au client s'il en a été informé). Allégations sur la carte (matière, « numérotée ») seulement si exactes. **[10/10/2026 : envoi après le délai de rétractation, proposition d'Abdou, retenue dans la v3.2 du règlement : voir point 9 du statut.]** | Carte « sans valeur monétaire, non rechargeable, pas un moyen de paiement ». Envoi inclus dans le prix. Délai d'envoi affiché : expédiée au plus tard [21] jours après la souscription (donc après les 14 jours de rétractation), livrée au plus tard [30] jours après. | Moyenne à élevée |

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
> **Cercle Waves, palier [INITIUM / MAJESTÉ].** [12,99 € / 39,99 €] TTC par trimestre, payés aujourd'hui puis tous les 3 mois. Prochain prélèvement le [JJ/MM/AAAA], puis tous les 3 mois, jusqu'à votre résiliation. Renouvellement automatique. Résiliation à tout moment en ligne : Mon compte > Mon abonnement > Résilier. Effet à la fin de la période payée. Carte de membre expédiée après le délai de rétractation, au plus tard le [JJ/MM/AAAA].

*Case 1 (obligatoire, non pré-cochée)* :
> J'ai lu et j'accepte les conditions du Cercle Waves et les CGV. Je comprends que mon abonnement est renouvelé automatiquement tous les 3 mois au prix de [12,99 € / 39,99 €] TTC, et que je peux le résilier à tout moment en ligne.

*Case 2 (obligatoire pour démarrer tout de suite, non pré-cochée)* :
> Je demande expressément que mon abonnement commence immédiatement, avant la fin du délai de rétractation de 14 jours. Je reconnais que, si je me rétracte, je devrai payer un montant proportionnel au service déjà fourni jusqu'à ma demande (prix du trimestre × jours écoulés ÷ nombre de jours du trimestre).

*Bouton final* :
> **Je m'abonne : commande avec obligation de paiement**

Sur un forfait Shopify hors Plus, le libellé du bouton de paiement du checkout n'est pas librement modifiable. Si seul le libellé par défaut est disponible, ajouter juste au-dessus : « En cliquant sur ce bouton, vous vous abonnez au Cercle Waves avec obligation de paiement. » Formule à faire valider par l'avocat.

**D. E-mail de confirmation.** Il contient : palier, prix TTC par trimestre, dates du premier et du prochain prélèvement, renouvellement automatique, avantages (comme dans les conditions), date d'envoi de la carte, lien direct de résiliation, formulaire type de rétractation, lien « Renoncer au contrat ici », copie des conditions et des CGV, coordonnées du service client et du médiateur.

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
| Cashback 5 % / 10 % | « Argent remboursé », « jusqu'à 10 % » sans dire quel palier, « gagnez de l'argent », « cashback » **sans** préciser sa nature (décision du fondateur du 09/10/2026 : le mot « cashback » est conservé à condition d'être accompagné de sa nature exacte). | « **Cashback [5 %] (INITIUM) / [10 %] (MAJESTÉ) du prix de vos achats de produits, versé en Crédit Waves** (avoir), utilisable sur vos prochains achats. Versé après l'expiration du délai de rétractation, valable [12] mois, non remboursable en espèces. » |
| Accès prioritaire aux drops | « Accès garanti », « toujours servi en premier », « sans file d'attente » si faux. | « **Accès anticipé de [24 h / 48 h]** avant l'ouverture au public. Il ne garantit pas la disponibilité : les quantités sont limitées. » |
| Précommandes en avant-première | « Avant tout le monde » (non vérifiable) ; date d'expédition différente non annoncée. | « Précommandez avant l'ouverture au public ([durée]). La date d'expédition est affichée sur chaque produit. » |
| Drops réservés aux membres | « Drops introuvables ailleurs » ; « édition limitée » sans quantité. | « Produits réservés aux abonnés [MAJESTÉ], dans la limite de [N] pièces par coloris, quantité indiquée sur la page du produit. » |
| Carte physique | « Carte exclusive en métal », « numérotée » si faux ; « carte de crédit / de paiement » ; « carte offerte dès la souscription » (elle est envoyée après les 14 jours de rétractation). | « **Carte de membre** envoyée avec votre abonnement, après le délai de rétractation (sans valeur monétaire, pas un moyen de paiement). » Matière, nom imprimé et numérotation seulement si exacts. |
| « Priorité stock garantie » | **Retirer**, toute formule avec « garantie ». | Seulement chiffré : « [N] pièces par coloris réservées aux abonnés pendant l'accès anticipé. » |
| « Statut élite » | **Retirer**. | « Palier MAJESTÉ ». Pas de « cercle fermé », « sélection », « VIP » si l'accès s'obtient par paiement. |
| Engagement | « Sans engagement » (le contrat est reconduit par périodes de 3 mois), « gratuit », « 0 € » sans condition. | « **Résiliable à tout moment en ligne, sans frais.** Renouvellement automatique tous les 3 mois. » |

Règle générale : tout avantage affiché est **chiffré, daté, conditionné et vérifiable**. Un avantage non validé par le fondateur n'apparaît ni sur le site, ni sur Instagram (Maya), ni dans les métadonnées.

### 4. Mise en œuvre technique (Sacha)

1. **Application d'abonnement.** Utiliser une application compatible avec le prestataire de paiement (par exemple *Shopify Subscriptions*, ou une application tierce reconnue : à comparer sur le portail client, les e-mails automatiques, la facturation récurrente et la 3D Secure aux renouvellements). Deux plans de vente : INITIUM 12,99 € / 3 mois, MAJESTÉ 39,99 € / 3 mois, TTC. Pas de période d'essai gratuite sans validation préalable de Victoire. Aucun abonnement réel encaissé tant que la boutique est sur le plan d'essai (point 10).
2. **Contenu réservé.** Avantages gérés par tag client (`cercle-initium`, `cercle-majeste`) : accès anticipé (collection ou page protégée par tag), drops réservés. Tag retiré à la fin de la période payée.
3. **Crédit Waves.** Appliqué comme une **remise** sur la commande suivante (réduction automatique ou code à usage unique par compte), de préférence à un « crédit en magasin » ou une carte cadeau Shopify, que Shopify traite comme un moyen de paiement (incohérent avec la qualification « réduction de prix » : voir E17). Règles : taux par palier, assiette (hors livraison et cotisation), versement après l'expiration du délai de rétractation (à confirmer), annulation du cashback en cas de retour, **recrédit du Crédit Waves utilisé si la commande est annulée**, e-mail d'alerte 30 jours avant l'expiration. Non remboursable en espèces. Le récapitulatif de commande et la facture montrent le prix, le Crédit Waves appliqué et le prix payé.
4. **Bouton de résiliation.** Portail client : « Mon abonnement » > « Résilier mon abonnement » > « Confirmer la résiliation ». 3 clics maximum depuis le compte, sans offre de rétention obligatoire, sans champ superflu, motif facultatif. Page publique `/pages/resilier-abonnement` (lien en pied de page) qui identifie le contrat par e-mail et référence d'abonnement. E-mail de confirmation immédiat (support durable) avec la date de fin. Test complet documenté (captures) avant ouverture.
5. **E-mail de rappel.** Planifier à J-35 avec le modèle E et l'encadré, **par un outil qui l'envoie à tous les abonnés, y compris ceux qui ont refusé les e-mails marketing** (voir E7 : aucune solution n'est confirmée à J-35 ; le rappel de 3 jours de Shopify Subscriptions est insuffisant). Vérifier la délivrabilité (SPF/DKIM). Conserver la preuve d'envoi (journal ou export) : en cas de litige, c'est KYMA qui doit la fournir.
6. **Cases et mentions au paiement.** Hors forfait Plus, les cases personnalisées du checkout ne sont pas disponibles en natif : les placer sur la page du panier (case obligatoire qui bloque le bouton de commande, valeur enregistrée dans les attributs de commande, pour prouver le consentement et la demande de démarrage immédiat).
7. **Rétractation.** La fonction « Renoncer au contrat ici » couvre aussi l'abonnement. Le remboursement partiel au prorata se fait depuis l'administration Shopify.
8. **Pied de page et espace client.** Ajouter « Résilier mon abonnement » et « Conditions du Cercle Waves ».
9. **Carte physique.** Flux d'expédition à définir avec le fondateur (une seule fois, **après l'expiration du délai de rétractation de 14 jours**, soit au plus tard le [21]e jour après la souscription). Aucune valeur stockée (numéro ou QR code d'identification uniquement). Les avantages ne dépendent pas de la carte.
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
| O1 | **TVA** du Crédit Waves (réduction de prix ou bon) et TVA de l'abonnement selon le pays du client (guichet unique au-delà de 10 000 € de ventes UE). | Expert-comptable. Abdou propose « réduction de prix » (`finance/cercle-waves-economie.md`). | Fondateur |
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

> **Décision du fondateur (09/10/2026)** : le terme **« cashback »** est conservé dans la communication Cercle Waves (mot connu et rassurant pour la cible). Condition à respecter : sous l'avantage, préciser sa nature exacte — par ex. « Cashback versé en crédit KYMA, utilisable sur vos prochains achats, valable [À COMPLÉTER] mois » — pour ne pas laisser croire à un remboursement en argent. **[Mise en œuvre : voir la section « Entraide 09/10/2026 », partie B.]**

---

## Entraide 09/10/2026 — formulations Cercle Waves et récit 3D

> **Auteur** : Victoire · **Demande** : plan de Clémentine du 09/10/2026 · **Pour** : Maya (formulations), Sacha (intégration), Izaac (récit 3D), Arthur (validation), fondateur (valeurs).
> **Fichiers lus** : `brand/BRAND.md`, la présente note, `pages/legal/cercle-waves-conditions.html` (réécrit en **v3**, corrigé en **v3.1** puis **v3.2** le 10/10/2026), `theme/templates/page.cercle-waves.json`, `theme/sections/kyma-product-story-scroll.liquid`, `theme/templates/index.json`, `contenu/recherche-abonnement-fidelite.md` et `contenu/recherche-rappel-renouvellement.md` (Isabelle), `finance/statut-comparatif.md` et `finance/cercle-waves-economie.md` (Abdou). Les autres fichiers du thème n'ont pas été relus.
> **Rappel unique** : modèles à faire valider par un avocat en droit de la consommation. **Sources** : Légifrance, DGCCRF et INC restent inaccessibles depuis l'environnement ; la numérotation des alinéas de l'art. L.121-4 est donnée de mémoire (la liste est connue : fausse rareté ou fausse limitation dans le temps, droits légaux présentés comme spécificité de l'offre, mention « gratuit » trompeuse, label sans autorisation) et **doit être relue sur Légifrance**. La Cour de cassation juge que les pratiques de la liste L.121-4 sont trompeuses « en toutes circonstances », sans preuve d'altération du comportement du consommateur (Cass. crim., 28/01/2020, n° 19-80496, F-PBI, affaire de grilles Loto/EuroMillions ; confirmé par Isabelle le 10/10/2026 d'après Dalloz actualité, Revue des contrats 2020 n° 2 et n° 3, Gaz. Pal. 31/03/2020). **Cet arrêt ne concerne que la liste L.121-4 : il n'est pas invoqué pour les visuels ni pour les mentions « non contractuel ».** Directive (UE) 2024/825 : l'allégation environnementale générique et le label de durabilité non certifié sont interdits depuis le 27/09/2026 [recherche web du 09/10/2026, sources secondaires].

### A. Les cinq règles à suivre pour chaque avantage

1. **Chiffré, daté, conditionné, tenable** (art. L.121-2 et L.121-3 : une omission d'information essentielle est aussi trompeuse). Un avantage qui n'existe pas encore (aucun drop prévu, par exemple) ne peut pas être vendu comme acquis : la date de première application est affichée avant l'achat.
2. **Ce que tout le monde a déjà n'est pas un avantage.** « Accès classique aux drops » (INITIUM) est l'accès du public : le présenter comme un avantage d'un abonnement payant est trompeur sur ce que le client achète. À remplacer ou à supprimer.
3. **Aucun superlatif invérifiable** : « maximale », « avant tout le monde », « garantie », « élite », « exclusifs » (sauf si la quantité et la période sont fixées et respectées).
4. **Pas d'avantage « à la discrétion » de KYMA sans engagement minimal** : « teasing » sans durée ni contenu est un avantage illusoire.
5. **Cashback : la nature du crédit est dite à côté du mot** (décision du fondateur). Jamais « argent », « remboursé en espèces », « gagnez », « rentabilisez ».

### B. Table avant → après des avantages (pour Maya)

**Mode d'emploi.** Colonne « Face de la carte » = texte court (champ `perks`). Colonne « Précision » = ce qui doit figurer sous la carte ou au verso, ou dans les conditions (article indiqué). `[valeur]` = valeur à fixer par le fondateur ; « proposition » = valeur que je suggère.

**INITIUM (12,99 € TTC par trimestre)**

| # | Avant (site actuel) | Problème | Après : face de la carte | Précision (verso / conditions) | Valeur |
|---|---|---|---|---|---|
| I1 | « Cashback 5 % sur chaque achat » + « Versé en crédit KYMA sur vos prochains achats. » | « Chaque achat » est faux (livraison, cotisation, cartes cadeaux exclues, versement différé) ; nature du crédit, durée et non-conversion absentes. | **« Cashback 5 % sur vos achats de produits »** | **Note sous l'avantage (remplace `cashback_note`)** : « Cashback versé en crédit KYMA (Crédit Waves), pas en espèces : utilisable sur vos prochains achats pendant [12] mois. Hors livraison et cotisation. Voir les conditions. » Art. 7.1 : versé 14 jours après réception, non remboursable ni convertible, plusieurs crédits cumulables, cumul avec codes promo possible, aucun minimum d'achat. | 5 % (décision fondateur) ; validité **[12] mois (proposition)** |
| I2 | « Accès classique aux drops » | Droit du public présenté comme avantage payant (L.121-2 ; L.121-4 si assimilé à un droit légal). | **« Accès anticipé de [24 h] à chaque drop »** (ou supprimer la ligne) | Art. 7.2 : fenêtre avant l'ouverture au public, ne garantit pas la disponibilité, ne change ni la date d'expédition ni la rétractation. | **[24 h] (proposition)** |
| I3 | « Carte physique beige, écriture argentée » | « Argentée » peut se lire « en argent » ; statut de la carte non précisé ; carte INITIUM absente des conditions v2. | **« Carte de membre physique beige, écriture argentée »** | « Sans valeur monétaire, pas un moyen de paiement. Envoyée une fois, après le délai de rétractation de 14 jours, frais d'envoi inclus ; vos avantages ne dépendent pas de la carte. » Art. 7.5. N'écrire « nominative » ou « numérotée » que si c'est vrai. | Expédiée au plus tard **[21] jours** après la souscription (proposition d'Abdou : envoi après le délai de rétractation) |
| I4 | « Teasing léger des nouvelles collections » | « Léger » et « teasing » : ni durée ni contenu, avantage non vérifiable. | **« Aperçu des nouvelles collections [3] jours avant l'ouverture au public »** | Art. 7.3 : visuels et informations dans l'espace client ; prévenu par e-mail seulement si la personne a accepté les e-mails de KYMA. | **[3] jours (proposition)** |

**MAJESTÉ (39,99 € TTC par trimestre)**

| # | Avant | Problème | Après : face de la carte | Précision (verso / conditions) | Valeur |
|---|---|---|---|---|---|
| M1 | « Cashback 10 % sur chaque achat » | Idem I1. | **« Cashback 10 % sur vos achats de produits »** | Même note que I1. | 10 % (décision fondateur) ; **[12] mois (proposition)** |
| M2 | « Accès prioritaire aux drops » | « Prioritaire » ne dit pas ce que c'est ; peut se lire « stock garanti ». | **« Accès anticipé de [48 h] à chaque drop »** | Art. 7.2. Ajouter : « Les quantités sont limitées : l'accès anticipé ne garantit pas la disponibilité. » | **[48 h] (proposition)**, soit le repère observé par Isabelle |
| M3 | « Précommandes avant tout le monde » | « Avant tout le monde » : faux si des influenceurs ou proches ont un accès plus tôt ; superlatif invérifiable. Double emploi avec M2. | **Fusionner dans M2 : « Accès anticipé de [48 h] à chaque drop, précommandes comprises »** | « Précommandez avant l'ouverture au public. La date d'expédition est affichée sur chaque produit. » | Idem M2 |
| M4 | « Accès anticipé privatif (teasing) » | « Privatif » détourné ; « teasing » sans contenu ; double emploi avec M2. | **« Aperçu des nouvelles collections [7] jours avant l'ouverture au public »** | Art. 7.3. | **[7] jours (proposition)** |
| M5 | « Drops exclusifs réservés aux membres » | « Exclusifs » promet qu'on ne les trouvera pas ailleurs ; aucun engagement de nombre ni de quantité : avantage illusoire. | **« Produits réservés aux abonnés MAJESTÉ (au moins [1] par an)** » | Art. 7.4 : quantité et période de réservation sur la page du produit ; KYMA peut ensuite ouvrir au public, ce qui est indiqué. Ne pas écrire « exclusif », « introuvable ailleurs ». | **[1] par an (proposition)** ; à retirer si le fondateur ne peut pas s'y engager |
| M6 | « Priorité stock garantie » | **Retirer** : « garantie » = promesse contractuelle intenable (petite série, aléas de production). Fausse sécurité de disponibilité (L.121-2). | **Supprimé.** Si le fondateur veut protéger les MAJESTÉ d'un épuisement par les INITIUM : « [N] pièces par coloris réservées aux abonnés MAJESTÉ pendant leur fenêtre » | Art. 7.2 (variante prévue, entre crochets). | **Par défaut : aucune quantité réservée** (la fenêtre de 48 h suffit) |
| M7 | « Statut élite · Rareté maximale » | « Élite » : sélection alléguée alors que l'accès s'obtient en payant (L.121-2). « Rareté maximale » : superlatif invérifiable, et fausse rareté si les séries ne sont pas limitées ou rééditées (L.121-4). | **« Le palier supérieur du Cercle Waves »** (`lead` existant) ; pas de ligne de statut | Pour la rareté, seulement un fait : « Éditions limitées à [N] pièces par coloris » avec le chiffre réel et sans réédition identique. | — |
| M8 | « Carte physique gris clair, écriture dorée » | « Dorée » peut se lire « en or ». | **« Carte de membre physique gris clair, écriture dorée »** | Idem I3. | Idem I3 |

**Ce que Maya peut dire, sans risque, autour de ces avantages** : « Deux paliers », « Le palier supérieur », « Accès anticipé », « Aperçu », « Cashback en Crédit Waves », « Résiliable à tout moment en ligne ». **À proscrire** : élite, VIP, privilège, cercle fermé, sélection, garanti, avant tout le monde, exclusif sans quantité, maximale, « rentabilisez votre abonnement », « gagnez », « carte offerte dès la souscription ». Le Cercle ne doit pas être décrit comme sélectif ni mérité : tout majeur peut s'abonner.

### C. Autres textes de la page Cercle Waves à corriger (fichier `page.cercle-waves.json`)

> **Principe confirmé par Arthur le 10/10/2026 : aucune collecte d'adresse e-mail avant l'immatriculation de la société.** Pas de responsable de traitement identifiable, pas de politique de confidentialité publiable, pas de liste d'attente. Le bloc « Rejoindre » passe donc en deux phases : **phase 1** (avant le Kbis) = annonce sans formulaire ; **phase 2** (après Kbis, politique de confidentialité publiée, forfait Shopify payant, validation d'Arthur et du fondateur) = liste d'attente avec deux cases, textes ci-dessous.

| Où | Avant | Après | Pourquoi |
|---|---|---|---|
| Ouverture, `text` | « Cercle Waves est le programme de fidélité de KYMA. Il accompagne celles et ceux qui suivent la marque, du premier pas jusqu'à la proximité. Deux paliers, qui se découvrent dans l'ordre. » | « Le Cercle Waves est l'abonnement de KYMA : deux paliers payants, INITIUM et MAJESTÉ, avec cashback versé en crédit KYMA, accès anticipé aux drops et carte de membre. Vous choisissez votre palier, vous pouvez en changer ou résilier en ligne à tout moment. » (Maya peut réécrire le ton, pas les faits.) | « Programme de fidélité » laisse croire à une adhésion gratuite. « Dans l'ordre » est faux si on peut choisir MAJESTÉ directement. « Cashback » seul laisserait croire à un remboursement en argent : sa nature est dite à côté du mot. |
| Paliers, `terms_text` | « Abonnement trimestriel, renouvelé automatiquement, résiliable à tout moment. Conditions : » | « Abonnement trimestriel : INITIUM 12,99 € TTC, MAJESTÉ 39,99 € TTC, renouvelé automatiquement tous les 3 mois. Résiliable à tout moment en ligne, sans frais, en quelques clics. Rétractation possible sous 14 jours. Réservé aux majeurs. Conditions : » | Mentions précontractuelles (L.221-5). Éviter « en 3 clics » tant que Sacha n'a pas chronométré le parcours. |
| Paliers, `terms_label` | « règlement Cercle Waves » | « conditions du Cercle Waves » | Cohérence avec la page légale. |
| Cartes, `condition` (les deux) | « Condition d'accès : [À COMPLÉTER] » | « Les quantités sont limitées : l'accès anticipé ne garantit pas la disponibilité d'une taille ou d'un coloris. » | Le champ est affiché tel quel. Aucune condition d'accès n'existe (voir art. 3 des conditions). |
| Cartes, `aria` | « … 12,99 € par trimestre TTC. … » | Ajouter « , renouvelé automatiquement » après « TTC » | Cohérence avec l'affichage visuel. |
| Passage, `text` | « Les paliers se découvrent dans l'ordre. Le passage à MAJESTÉ : [À COMPLÉTER : critère décidé par le fondateur]. » | « Vous pouvez choisir directement l'un ou l'autre palier. Passer à MAJESTÉ prend effet tout de suite (vous payez la différence au prorata) ; passer à INITIUM prend effet à la fin du trimestre en cours. » | Art. 9 des conditions. Si le fondateur impose un critère, il faut l'écrire ici et à l'art. 3. |
| Passage, `title_*` | « Dans l'ordre, sans détour. » | À réécrire par Maya, par exemple « D'un palier à l'autre, sans détour. » | Même raison. |
| Passage, `sym1` / `sym2` | « L'entrée dans le cercle. » / « Le palier supérieur. » | Inchangé. | Faits. |
| Rejoindre, **PHASE 1 (avant immatriculation)** : `title`, `text`, formulaire | « Entrer dans le cercle. » / « Prénom et adresse e-mail suffisent… » / formulaire e-mail avec bouton « Rejoindre le cercle » et succès « Bienvenue dans le cercle. Votre place est enregistrée. » | **Pas de formulaire, pas de champ, pas de bouton d'envoi.** Titre : « Le cercle se prépare. » Texte : « Le Cercle Waves n'est pas encore ouvert. Il n'y a rien à saisir pour l'instant : les paliers et leurs avantages seront détaillés ici à l'ouverture. » (Maya peut ajouter un renvoi vers @kymasinsta, sans formulaire.) | Aucune donnée personnelle ne doit être collectée tant que la société n'existe pas (responsable de traitement, politique de confidentialité, forfait payant : voir point 10 de la section (d)). Un formulaire « Rejoindre » confirmant une « place » induirait aussi en erreur sur la nature de l'offre. |
| Rejoindre, **PHASE 2 (après Kbis, confidentialité publiée, forfait payant, « VALIDÉ » d'Arthur et du fondateur)** : `title`, `button`, `success` | — | Titre « Être prévenu de l'ouverture » ; bouton « Me prévenir » ; succès « Merci. Nous vous écrirons à l'ouverture du Cercle Waves. Cette inscription n'est pas un abonnement. » Une fois l'abonnement actif, ce bloc redevient un lien vers le paiement. | Un simple formulaire e-mail ne peut pas s'appeler « rejoindre » ni confirmer une « place » : le visiteur croirait être abonné ou avoir une place réservée. |
| Rejoindre, PHASE 2, **case 1 (OBLIGATOIRE, non pré-cochée)** : remplace `consent` | « J'accepte de recevoir les e-mails de KYMA (…) [À VALIDER VICTOIRE …] » | « J'accepte que KYMA utilise mon adresse e-mail pour m'informer de l'ouverture du Cercle Waves. Je peux me désinscrire à tout moment via le lien présent dans le message ou en écrivant à [À COMPLÉTER : e-mail]. Mon adresse est supprimée de cette liste après l'envoi de ce message, sauf si j'ai aussi accepté la newsletter ci-dessous. Responsable du traitement : [À COMPLÉTER : raison sociale]. Voir la [politique de confidentialité]. » | **Une seule finalité** : prévenir de l'ouverture. Consentement libre, spécifique, éclairé, univoque (RGPD art. 4 et 7). La case bloque l'envoi du formulaire, car sans elle KYMA n'a aucune base pour écrire. Le message d'ouverture est un message d'information sur un service que la personne a demandé : il ne contient aucune offre. |
| Rejoindre, PHASE 2, **case 2 (FACULTATIVE, non pré-cochée)** : nouvelle case, distincte | — | « Je souhaite aussi recevoir la newsletter de KYMA (ouvertures de drops, coulisses, offres). Je peux me désinscrire à tout moment via le lien présent dans chaque message. Responsable du traitement : [À COMPLÉTER : raison sociale]. Voir la [politique de confidentialité]. » | Consentement séparé pour la prospection (CPCE art. L.34-5). Ne pas cocher n'empêche pas de valider le formulaire. **Pas de lien entre les deux cases ni avec l'abonnement** : l'accès anticipé ne doit jamais dépendre de la case 2. Double opt-in recommandé pour la newsletter (point 22). Sacha enregistre séparément les deux consentements (date, texte affiché). |
| Rejoindre, `terms` | « Conditions du programme : [À COMPLÉTER : lien. …] » | « Conditions du Cercle Waves : [lien vers /pages/cercle-waves-conditions]. » (phase 2 seulement) | Page rédigée (v3.2), non publiée. |
| Accueil `index.json`, section `cercle`, `text` | « … Deux paliers, INITIUM et MAJESTÉ. » | Ajouter « , par abonnement trimestriel » avant le point. | L'accueil ne doit pas laisser croire à un programme gratuit. |

### D. Valeurs proposées au fondateur (toutes marquées « proposition »)

| Paramètre | Proposition | Repère (Isabelle, 09/10/2026) | Remarque |
|---|---|---|---|
| Cashback INITIUM / MAJESTÉ | 5 % / 10 % (décision) | Marché 3–5 % | 10 % est au-dessus des repères : rentabilité à valider avec l'expert-comptable. |
| Validité d'un Crédit Waves | **12 mois** à compter du versement | 12 mois (Gymshark) | Pas de minimum légal trouvé ; 12 mois limite le risque de clause abusive. |
| Alerte avant expiration | 30 jours, par e-mail | — | E-mail de service, pas de prospection. |
| Sort des crédits à la résiliation | Utilisables jusqu'à leur expiration, et au moins **6 mois** après la fin de l'abonnement | — | Remplace « 6 mois seulement » de la v2 : le client a payé pour cet avantage, le perdre à la résiliation est un risque de clause abusive. |
| Versement du cashback | 14 jours après réception des produits (précommande : après expédition et réception) | — | Délai de rétractation écoulé : pas de crédit à reprendre. Un achat passé pendant l'abonnement garde son cashback même après résiliation. |
| Plafond / minimum | Aucun plafond, aucun minimum d'utilisation | — | Si le fondateur veut un plafond, l'écrire à l'art. 7.1 et sous la carte. |
| Cumul avec codes promo | Oui (cashback calculé sur le prix payé après remise), sauf mention contraire sur le code | — | |
| Accès anticipé | **MAJESTÉ [48 h], INITIUM [24 h]** | 48 h (SNIPES, 2 jours) | MAJESTÉ s'ouvre toujours avant INITIUM. |
| Aperçu des collections | MAJESTÉ [7] jours, INITIUM [3] jours avant l'ouverture au public | — | Dans l'espace client, pas par e-mail promotionnel. |
| Produits réservés MAJESTÉ | Au moins **[1] par an**, quantité indiquée sur la page | — | À retirer si le fondateur ne peut pas s'engager sur un chiffre. |
| Quantités réservées pendant l'accès anticipé | Aucune par défaut | — | Variante : [N] pièces par coloris réservées MAJESTÉ. |
| Envoi de la carte | **Expédiée au plus tard [21] jours après la souscription** (donc après le délai de rétractation de 14 jours), livrée au plus tard [30] jours après, frais inclus | — | Proposition d'Abdou (économie : pas de carte envoyée en cas de rétractation) reprise dans la v3.2. Date ou délai obligatoire (L.216-1). Carte INITIUM et MAJESTÉ (cartes du fondateur). |
| Fenêtre d'annonce | Dates d'accès anticipé annoncées au moins 48 h à l'avance, **dans l'espace client** ; par e-mail seulement pour les personnes qui ont accepté de recevoir les e-mails de KYMA | — | L'annonce d'un accès anticipé invite à acheter : ce n'est pas un e-mail de service. |
| Calendrier type d'un drop | J-7 aperçu MAJESTÉ · J-3 aperçu INITIUM · J-2 accès anticipé MAJESTÉ · J-1 accès anticipé INITIUM · J ouverture au public | — | Indicatif. |

**Chiffres à connaître avant de fixer les taux.** Le cashback ne couvre la cotisation qu'au-delà de **260 € d'achats par trimestre pour INITIUM** (12,99 ÷ 5 %), soit 2 hoodies à 179 € ; et de **400 € pour MAJESTÉ** (39,99 ÷ 10 %), soit 3 hoodies. À 179 €, un hoodie génère 8,95 € (INITIUM) ou 17,90 € (MAJESTÉ). Conséquence rédactionnelle : ne jamais écrire que l'abonnement « se rentabilise » ou « rapporte ». (Calculs vérifiés par Abdou le 10/10/2026. Il y ajoute le coût réel pour KYMA et la question du taux de 10 % : `finance/cercle-waves-economie.md`.)

### D bis. Toutes les valeurs entre crochets du règlement v3.2 : décisions du fondateur

> Chaque ligne correspond à un crochet de `pages/legal/cercle-waves-conditions.html`. « Proposition » = ma suggestion, jamais une décision. Colonne de droite : le fondateur coche ou écrit sa valeur. **La page ne peut pas être publiée tant que cette colonne n'est pas remplie et que les champs d'identité ne sont pas levés par le Kbis.**

| # | Article | Valeur à fixer | Proposition de Victoire | Contrainte ou remarque | Décision du fondateur |
|---|---|---|---|---|---|
| 1 | 1, 8, 10, 15 | Identité : raison sociale, forme, capital, siège, RCS, TVA, e-mail, téléphone ; nom de domaine | Aucune : recopier le Kbis. Pas de publication avant le Kbis. | Voir la section « Statut juridique ». | ☐ rempli le : ____ |
| 2 | 2 | Taux de TVA ou franchise en base | À fixer avec Abdou et l'expert-comptable selon le régime (la franchise est ouverte à une SASU : `finance/statut-comparatif.md` § 5). | Si franchise : mention « TVA non applicable, art. 293 B du CGI » à adapter dans l'art. 2, les CGV, les fiches et les factures. | ☐ ____ |
| 3 | 2, 7.2, 7.3 | Accès anticipé : [24 h] INITIUM, [48 h] MAJESTÉ ; aperçu : [3] jours INITIUM, [7] jours MAJESTÉ | 24 h / 48 h ; 3 jours / 7 jours | MAJESTÉ s'ouvre toujours avant INITIUM. | ☐ oui ☐ autre : ____ |
| 4 | 2, 7.4 | Produits réservés MAJESTÉ : [1] par période de 12 mois | 1 par période de 12 mois, ou retirer l'avantage | Un chiffre promis doit être tenu. | ☐ oui ☐ retirer ☐ autre : ____ |
| 5 | 3 | Zone de résidence des abonnés | France au lancement (livraison France), UE plus tard | UE : TVA du pays du client (guichet unique OSS) et livraison à prévoir. | ☐ France ☐ UE ☐ autre : ____ |
| 6 | 3 | Critère d'accès à MAJESTÉ | Aucun (choix libre des paliers) | S'il y a un critère, le décrire art. 3, art. 9 et sur la page. | ☐ aucun ☐ critère : ____ |
| 7 | 4 | Libellé exact du bouton | « Je m'abonne : commande avec obligation de paiement » si le thème ou l'appli le permet, sinon la phrase placée au-dessus du bouton (section 2.C) | Sacha confirme ce que Shopify autorise. | ☐ oui ☐ autre : ____ |
| 8 | 5 | Moyens de paiement | Cartes bancaires et portefeuilles du prestataire retenu (par exemple Shopify Payments), compatibles avec les prélèvements récurrents | Sacha et le fondateur confirment. | ☐ ____ |
| 9 | 5 | Paiement refusé : nombre de tentatives et délai | **3 tentatives sur 7 jours** (J+1, J+3, J+7), un e-mail à chaque échec ; avantages suspendus après l'échec final, puis fin de l'abonnement sans frais | Dépend du réglage de l'appli d'abonnement ; 3D Secure possible. | ☐ oui ☐ autre : ____ |
| 10 | 6 | Rappel de reconduction | **J-35** (e-mail dédié, envoyé **même aux clients qui ont refusé les e-mails marketing**) + J-7 en bonne pratique | Légal : entre 3 mois et 1 mois avant le terme. Voir E7 pour la mise en place. | ☐ oui ☐ autre : ____ |
| 11 | 6 | Préavis de hausse de prix : [60] jours | 60 jours | Doit dépasser le rappel J-35 pour que le client puisse refuser. Avocat (point O6). | ☐ oui ☐ autre : ____ |
| 12 | 7.1 | Date de versement du cashback | 14 jours après la réception des produits (date de livraison du transporteur) | Précommande : après expédition. | ☐ oui ☐ autre : ____ |
| 13 | 7.1 | Plafond de cashback | Aucun plafond ; aucun minimum d'utilisation (Abdou propose d'étudier un plafond par trimestre ou un taux MAJESTÉ de 7 à 8 % : décision économique) | Tout plafond doit figurer sous l'avantage. | ☐ aucun ☐ plafond : ____ |
| 14 | 7.1 | Validité du Crédit Waves ; alerte avant expiration ; maintien après résiliation | [12] mois ; [30] jours ; [6] mois minimum après la fin | Voir O2. | ☐ oui ☐ autre : ____ |
| 14 bis | 7.1 | Recrédit d'un Crédit Waves utilisé sur une commande annulée : durée de validité minimale si la date d'origine est dépassée | **[30] jours** à compter de l'annulation | Sans recrédit, le client perdrait un avantage payé. | ☐ oui ☐ autre : ____ |
| 15 | 7.2 | Délai d'annonce d'une fenêtre d'accès anticipé | Au moins 48 h avant, **dans l'espace client** ; par e-mail seulement pour les personnes qui ont accepté de recevoir les e-mails de KYMA | L'e-mail d'annonce n'est pas un e-mail de service (v3.1). | ☐ oui ☐ autre : ____ |
| 16 | 7.2 | Quantités réservées aux MAJESTÉ pendant leur fenêtre : [N] pièces par coloris | Aucune quantité réservée | Si retenue, afficher le nombre sur la page du produit. | ☐ aucune ☐ N = ____ |
| 17 | 7.4 | Date de lancement du Cercle (début de la période de 12 mois) | Pas de date proposée : la date d'ouverture de l'abonnement, jamais avant le Kbis, l'appli testée et un premier drop daté | Voir E1. | ☐ date : ____ |
| 18 | 7.5 | Délai d'expédition de la carte ; délai de livraison | **Expédiée au plus tard 21 jours** après la souscription (après les 14 jours de rétractation, proposition d'Abdou), reçue en principe sous 5 jours ouvrés et **au plus tard 30 jours** après la souscription | Date ou délai obligatoire (L.216-1) ; sans date, 30 jours. Voir E16 (contrat mixte). | ☐ oui ☐ autre : ____ |
| 19 | 7.5 | Carte « nominative » ou « numérotée » | Ne rien écrire tant que le nom ou un numéro n'est pas imprimé sur la carte | Allégation non exacte = pratique trompeuse. | ☐ nominative ☐ numérotée ☐ aucune |
| 20 | 7.5 | Carte perdue ou volée : remplacement gratuit ou payant | **Un premier remplacement gratuit** par abonnement ; ensuite payant au coût de fabrication et d'envoi, de [N] € TTC annoncé dans l'article avant la souscription | Un frais non annoncé est inopposable. | ☐ oui ☐ autre : ____ |
| 21 | 7.6 | Premier drop concerné par l'accès anticipé, l'aperçu et les produits réservés | Le Drop 1 si l'abonnement ouvre avant l'ouverture publique de ses précommandes ; sinon le drop suivant. Date affichée sur la page avant la souscription. | Voir E1 (omission trompeuse sinon). | ☐ drop : ____ date : ____ |
| 22 | 8 | Point de départ de la rétractation avec une carte envoyée après J+14 | Phrase de l'art. 8 à faire valider par l'avocat | Voir E16. | ☐ avocat : ____ |
| 23 | 11 | Référence exacte des garanties applicables aux contenus et services numériques | À confirmer par l'avocat | | ☐ avocat : ____ |
| 24 | 12 | Préavis de modification des conditions : [30] jours | 30 jours | Voir aussi O6. | ☐ oui ☐ autre : ____ |
| 25 | 13 | Délai pour présenter ses observations avant suspension : [15] jours | 15 jours | | ☐ oui ☐ autre : ____ |
| 26 | 14 | Prestataire de paiement | Le prestataire retenu par le fondateur (par exemple Shopify Payments) | Doit figurer dans la politique de confidentialité. | ☐ ____ |
| 27 | 15 | Service client : e-mail, téléphone, délai de réponse | Réponse sous **5 jours ouvrés** | Le téléphone est obligatoire (mentions légales). | ☐ oui ☐ autre : ____ |
| 28 | 15 | Médiateur de la consommation | Aucune : à désigner (convention signée) | Point 7 de la section (d). | ☐ ____ |

### E. Relecture du récit 3D (`kyma-product-story-scroll.liquid`, `index.json`)

**Résultat de la vérification des allégations dans les trois fichiers lus.**

| Allégation | Résultat |
|---|---|
| GOTS | Absente. |
| Bio / coton biologique | Absente. |
| Made in Portugal | Absente en clair, **mais présente comme valeur de fiche** : `Lieu de fabrication | [À CONFIRMER : Portugal]`. Le gabarit affiche toute ligne dont la valeur n'est pas vide : sur un site publié, le visiteur lirait « [À CONFIRMER : Portugal] ». Même risque pour `Corps | [À CONFIRMER : 100 % coton]` et `Doublure | [À COMPLÉTER]`. |
| « Chaque pièce est unique » | Pas en clair, mais **« un motif qui ne se répète jamais »** (étape 1) est une affirmation absolue équivalente. Les formules « pensé(e) pour être unique » (hero, légende) sont conformes au tableau (a). |
| Autres allégations matière | « **laiton plaqué or brossé** » (étape 4) et « **métal argent brossé** » (étape 5) : appellations de matériaux non prouvées (pas de fiche technique) ; « plaqué or » est une dénomination de métal précieux qui suppose une couche d'or minimale (à vérifier avant usage) ; « argent brossé » peut se lire « en argent ». |

**La mention « Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer. » est insuffisante**, pour trois raisons :
1. **Elle n'est visible qu'à la toute fin.** Dans le gabarit, la légende est dans le bloc de sortie (`outro`) de la section épinglée de 700 vh : pendant les sept étapes de la présentation (capuche, tirette, intérieur), aucune mention n'est à l'écran.
2. **Elle ne dit pas que ce n'est pas une photo du produit fabriqué.** « Visuel de présentation 3D » peut se lire comme un rendu fidèle d'un produit existant. Or le produit n'est pas encore fabriqué ni photographié.
3. **Elle ne dit pas en quoi la pièce peut différer** (motif, nuances de couleur, finitions, écran). Une mention « non contractuelle » ne rend de toute façon pas licite un visuel trompeur : l'art. L.121-2 s'apprécie sur l'ensemble de la présentation (jurisprudence spécifique sur les visuels : non vérifiée). Le rendu doit rester fidèle à la coupe, au coloris et aux finitions annoncés dans le tech pack.

**Corrections exactes (texte avant → après)**

| # | Où | Avant | Après |
|---|---|---|---|
| R1 | Légende (réglage `caption` de la section, `index.json` « piece » et valeur par défaut du schéma ; aussi `caption_hoodie` de la section « drop ») | « Visuel de présentation 3D — pensé pour que chaque pièce soit unique ; la vôtre pourra différer. » | « **Modèle 3D de présentation, pas une photo du produit fabriqué. Le motif de chaque pièce est pensé pour être unique : la vôtre différera de ce modèle. Les couleurs dépendent de votre écran.** » |
| R2 | Affichage de la légende (Sacha, `.liquid`) | Légende dans l'étape finale seulement | **Légende permanente dans la zone épinglée** (`kyma-pstory__sticky`), visible à chaque étape, aussi dans le rendu statique (mouvement réduit, sans JavaScript, sans WebGL) |
| R3 | Sections « drop » et « motif », `caption` | « Illustration du coloris. » | « Rendu 3D du coloris, pas une photo du produit fabriqué. » (section drop) · « Illustration du motif, pas une photo du produit fabriqué. Chaque pièce est pensée pour être unique. » (section motif) |
| R4 | Étape 1 (`text`) | « … un motif qui ne se répète jamais. Faites défiler : la pièce se dévoile. » | « … un motif pensé pour ne pas se répéter. Faites défiler : la pièce se dévoile. » |
| R5 | Étape 4 (`text`) | « Sculptée « Kyma », en laiton plaqué or brossé. Le seul éclat de la pièce. » | « Sculptée « Kyma », en laiton, finition dorée brossée. Le seul éclat de la pièce. » (revenir à « plaqué or » seulement avec la fiche technique du fabricant et après vérification de la dénomination) |
| R6 | Étape 5 (`text`) | « Zip intégral en métal argent brossé, du col jusqu'à l'ourlet. » | « Zip intégral en métal, finition argentée brossée, du col jusqu'à l'ourlet. » |
| R7 | Étape 6 (`spec`) | `Corps \| [À CONFIRMER : 100 % coton]` · `Bords-côtes \| 95 % coton, 5 % élasthanne` · `Doublure \| [À COMPLÉTER]` | **Laisser les valeurs vides** tant que le fabricant n'a pas confirmé la composition (le gabarit n'affiche pas une ligne sans valeur) ; Sacha masque le bloc `<dl>` s'il est vide et affiche à la place : « La composition complète figure sur la fiche produit. » Les valeurs seront ajoutées à l'identique de l'étiquette (jamais « bio » ni « GOTS » sans le tableau (a)). **Réponse à Maya** : la ligne « Bords-côtes \| 95 % coton, 5 % élasthanne » **ne revient pas** tant que le fabricant n'a pas confirmé la composition par écrit (fiche technique). Le tech pack est un document interne : il ne prouve pas l'étiquette finale, et une composition affichée qui diffère de l'étiquette est une pratique trompeuse. |
| R8 | Étape 7 (`spec`) | `Lieu de fabrication \| [À CONFIRMER : Portugal]` · `Imaginé à \| Paris` | `Lieu de fabrication \|` (valeur vide jusqu'au contrat signé et à l'attestation d'origine) · `Imaginé à \| Paris` (conservé, vrai si la conception est bien faite à Paris ; confirmer avec le fondateur) |
| R9 | Étape 3 (`text`) | « Le motif KYMA Wave court sur tout le dos, d'une épaule à l'autre, comme un courant. » | Conservé, **sous réserve** que le tech pack confirme l'impression all-over ; à recontrôler sur les préséries. |
| R10 | Images fixes (`still_alt`, mouvement réduit) | vide | « Rendu 3D du hoodie Ressac, [coloris], étape [capuche / dos / tirette / zip / intérieur]. Pas une photo du produit fabriqué. » |
| R11 | Hero `index.json`, note | « Expédition au plus tard le [À COMPLÉTER : date] » | Inchangé dans sa formule. **Ne pas publier tant que la date n'est pas renseignée** : sinon le crochet s'affiche. |

**Sont conformes (sans changement)** : « pensé pour être unique » (hero), « Pensé pour que chaque pièce soit unique », « Double épaisseur, sans cordon ni œillets », « doublure en jersey ton sur ton » (descriptif de conception, à recontrôler sur les préséries), « Imaginé à Paris », les noms de coloris et leurs descriptions poétiques, le sélecteur « Coloris du modèle 3D ».

**Remarques complémentaires.** (i) Le nom de produit « Ressac » (URL `ressac-hoodie-zippe-oversize`) n'a fait l'objet d'aucune recherche d'antériorité : à inclure dans le dépôt de marque (point 4). (ii) Le modèle 3D doit rester fidèle au produit : toute différence de coupe ou de finition entre le GLB et la préserie corrigée par Izaac avant ouverture des précommandes. (iii) Le thème rend accessible le texte de chaque étape ; la légende R1 doit l'être aussi (texte réel, pas dans le canvas).

### F. Modèles 3D sous licence (shortlist d'Isabelle)

Isabelle livre une shortlist de modèles 3D sous licence (`shopify/3d/recherche-modeles-3d.md`). **Je n'en vérifie pas les licences maintenant**, mais je le ferai dès qu'elle sera disponible. Grille que j'appliquerai : usage commercial autorisé ; modification autorisée ; **mise à disposition publique du fichier GLB** (le navigateur le télécharge : beaucoup de licences interdisent de redistribuer le fichier brut) ; attribution (et où l'afficher) ; droits sur les textures et logos de tiers ; modèle non généré par IA (décision du fondateur : aucune image IA) ; preuve d'achat ou de licence conservée au nom de la société ; durée et exclusivité. **[Appliquée le 09/10/2026 : voir la partie H.]**

### G. Points de vigilance (cette entraide)

**🔴 Bloquant avant publication**

| # | Risque | Action | Qui |
|---|---|---|---|
| E1 | **Avantages vendus mais pas encore disponibles** (accès anticipé, aperçu et produits réservés sans drop prévu) : omission trompeuse (L.121-3) et avantage illusoire. | Afficher la date de première application (art. 7.6) et l'état du prochain drop sur la page ; ne pas ouvrir l'abonnement avant d'avoir au moins un drop ou un événement daté. Dans l'e-mail de confirmation, répéter cette date. | Fondateur, Sacha |
| E2 | **Les textes « Priorité stock garantie », « Statut élite · Rareté maximale », « Accès classique », « avant tout le monde »** sont encore dans `page.cercle-waves.json` (champ `perks`). | Appliquer le tableau B, ligne par ligne. | Maya (textes), Sacha (intégration) |
| E3 | **Champs affichant des crochets** (`[À COMPLÉTER]`, `[À CONFIRMER : Portugal]`) dans le récit 3D et la page Cercle. | Vider ou renseigner avant tout partage de l'URL ; pas de publication avec crochets. | Sacha |
| E4 | **Légende 3D visible seulement à la dernière étape** et libellée « Visuel de présentation 3D ». | Correctifs R1 à R3 : légende permanente, texte « Modèle 3D de présentation, pas une photo du produit fabriqué. … ». | Sacha |
| E5 | **Allégations de matière non prouvées** : « plaqué or », « argent brossé ». | Correctifs R5, R6 jusqu'à la fiche technique. | Izaac, Sacha |
| E6 | **Formulaire e-mail intitulé « Rejoindre le cercle »** alors que l'adhésion est payante, et **collecte d'adresses avant l'immatriculation**. | Correctifs de la partie C : phase 1 = annonce « Le cercle se prépare » sans formulaire ; phase 2 (après Kbis) = liste d'attente avec deux cases distinctes. | Maya, Sacha |

**🟠 À régler rapidement**

| # | Risque | Action | Qui |
|---|---|---|---|
| E7 | **Information avant reconduction (art. L.215-1) : aucune solution examinée n'envoie un rappel à J-35** (Isabelle, 10/10/2026, extraits de recherche, confiance moyenne). *Shopify Subscriptions* : rappel automatique 3 jours avant (insuffisant). *Loop* : 1 à 25 jours (insuffisant). *Seal* et *Appstle* : e-mail « prochaine échéance » éditable, délai non documenté. *Shopify Flow* : pas de déclencheur « N jours avant », et son action « Send marketing email » ne touche que les clients qui ont accepté le marketing. Sans rappel conforme, le client peut résilier gratuitement à tout moment et se faire rembourser les sommes versées d'avance. **Le rappel est une information légale obligatoire, pas une prospection : il ne doit jamais dépendre du consentement marketing** (un client désabonné de la newsletter doit le recevoir) et ne contient aucune offre. | **1. Solution par défaut : test de Seal ou d'Appstle.** Sacha vérifie dans l'admin (a) que le réglage « jours avant » accepte **35** ; (b) que le texte est éditable (modèle E avec encadré, date limite, lien de résiliation) ; (c) que l'e-mail part à **tous** les abonnés, même ceux qui ont refusé le marketing. Il demande par écrit au support de l'éditeur de confirmer le délai et l'existence d'un journal d'envoi horodaté. **2. Repli si le test échoue : e-mail manuel hebdomadaire** envoyé par le fondateur, chaque lundi, aux abonnés dont le renouvellement tombe 5 semaines plus tard (export de l'appli), comme message de service et non via une liste marketing. **3. Preuve d'envoi à conserver** pour chaque abonné : date d'envoi, destinataire, contenu exact (journal de l'appli, export ou copie des e-mails) ; durée du contrat plus 5 ans (prescription de droit commun, à confirmer par l'avocat). **4. Ne jamais se contenter du rappel de 3 jours de Shopify Subscriptions**, et ne pas utiliser Shopify Flow « Send marketing email » pour ce rappel. | Sacha (test, journal) ; repli : fondateur |
| E8 | **Cashback de 10 % et carte physique à 12,99 €** : équilibre économique non vérifié ; un changement ultérieur à la baisse est encadré (art. 12 des conditions). | Valider les taux avec l'expert-comptable avant publication (partie D ; analyse d'Abdou dans `finance/cercle-waves-economie.md`). | Fondateur, expert-comptable |
| E9 | **TVA** du Crédit Waves et de la carte. | Voir O1 ; qualification « réduction de prix » proposée par Abdou. | Expert-comptable |
| E10 | **Mise à jour de `confidentialite.html` et de `cgv.html`** (abonnement, Crédit Waves, carte, accès anticipé). | Je les mets à jour après validation des valeurs. | Victoire |
| E11 | **Nominative / numérotée** pour la carte : à écrire seulement si le nom ou un numéro est imprimé. | Confirmer avec le fondateur. | Fondateur |
| E16 | **Carte envoyée après les 14 jours de rétractation (contrat mixte bien + service).** Pour la partie « bien » de la carte, le délai de rétractation peut courir à compter de la **réception** (art. L.221-18). Un client pourrait soutenir que le délai de 14 jours de l'abonnement n'a pas commencé avant la réception de la carte. Risque limité : l'objet principal est le service, les avantages ne dépendent pas de la carte, et le prorata s'applique si le client a demandé le démarrage immédiat. | Faire valider par l'avocat la phrase de l'art. 8 (« envoi de la carte après les 14 jours ne rouvre pas de délai »). Indiquer la date d'envoi avant la souscription, sur la page, au paiement et dans l'e-mail. Ne pas communiquer « carte offerte dès la souscription ». Certitude **moyenne**. | Avocat, Sacha, Maya |
| E17 | **Crédit Waves implémenté comme « crédit en magasin » ou carte cadeau Shopify**, que Shopify traite comme un moyen de paiement : incohérent avec la qualification « réduction de prix » (Abdou), et la facture peut afficher un prix plein payé en partie par un « paiement ». | Appliquer le Crédit Waves comme **remise** sur la commande (réduction automatique ou code à usage unique par compte), l'afficher au **panier** (et non comme un prix barré sur la fiche produit : règle du prix de référence, art. L.112-1-1, application aux réductions personnalisées non vérifiée), et faire figurer sur la facture le prix, la réduction et le prix payé. Recréditer le Crédit Waves si la commande est annulée (art. 7.1). | Sacha, Abdou |

**🟢 Bonnes pratiques**

| # | Point | Action | Qui |
|---|---|---|---|
| E12 | Chronométrer le parcours de résiliation avant d'écrire « en 3 clics ». | Test documenté, captures. | Sacha |
| E13 | Le compte client affiche : solde de Crédit Waves, date d'expiration de chaque crédit, date du prochain prélèvement. | Intégrer au portail. | Sacha |
| E14 | Réviser les valeurs d'avantages à chaque nouveau drop (dates d'accès anticipé annoncées dans l'espace client au moins 48 h avant ; e-mail seulement aux personnes qui ont accepté de recevoir les e-mails de KYMA). | Calendrier partagé. | Maya, Sacha |
| E15 | Recontrôler le récit 3D après les préséries : coupe, finitions, impression all-over. | Comparaison modèle / pièce. | Izaac |

### H. Licences de la shortlist de modèles 3D (`shopify/3d/recherche-modeles-3d.md`) — 09/10/2026

> **Base** : la shortlist d'Isabelle, lue le 09/10/2026. Je n'ai pu ouvrir **aucune** page de marketplace ni aucun texte de licence : Isabelle a elle-même travaillé sur des extraits de recherche. Tous les feux ci-dessous sont donc des **évaluations de risque sur extraits, jamais une validation**. Les textes complets de licence (versions datées) doivent être lus avant tout achat, et la réponse écrite du vendeur conservée. **Aucun achat avant : réponse écrite du vendeur + accord du fondateur + feu de ma part.**
> **Le risque commun** : une page WebGL envoie le fichier GLB au navigateur du visiteur, qui peut le récupérer. La plupart des licences « royalty free » interdisent de redistribuer l'asset brut ou de le rendre extractible. Deuxième risque : le récit 3D (contrat « v2 » d'Izaac : panneaux gauche/droit, tirette, doublure, coloris) impose de **modifier lourdement** le modèle (retopologie, rigging, retexture) ; la licence doit l'autoriser expressément. Troisième risque : fidélité au produit. Un modèle générique du commerce ne représente pas le hoodie Ressac (capuche sans cordon, poches biais, oversize) ; il doit être modifié jusqu'à lui ressembler, sinon le visuel est trompeur (partie E).
> **Aucun modèle n'est vert aujourd'hui.** Aucun n'a de licence lue en entier, aucun vendeur n'a confirmé l'usage WebGL.

#### H1. Feux par modèle

| # | Modèle (plateforme) | Feu | Pourquoi | Condition pour passer au vert |
|---|---|---|---|---|
| 1 | Oversized Hoodie, polygonal-miniatures (RenderHub) | 🟠 | GLB natif (bon point), mais licence **non trouvée** et prix non trouvé. Photogrammétrie d'un vêtement réel : risque de **marque, étiquette ou logo de tiers cuits dans la texture**, et plis figés qui rendent la retexture difficile (modification). | Texte de licence lu ; réponse écrite du vendeur (H2) ; confirmation qu'aucun logo ou étiquette tiers n'apparaît ; test de retexture réalisable. |
| 2 | Zip Hoodie Wash, Clothing Axis (RenderHub, **Extended Use**) | 🟠 (le plus proche du vert) | Extended Use = usage commercial « dans divers médias et applications », mais texte complet non lu et **aucune clause web/temps réel trouvée**. Projet CLO fourni (modification possible), GLB fourni. 300 000 polygones : décimation obligatoire, donc **dérivé**. | Réponse écrite du vendeur couvrant WebGL, dérivés et GLB servi au navigateur ; texte Extended Use lu en entier. |
| 3 | Ultimate Oversized Zip Hoodie CLO 3D (CGTrader, 6 $) | 🔴 en l'état | « Custom License » **non lue**. Si c'est la Royalty Free standard de CGTrader : droit « strictement limité au produit incorporé », modèle qui ne doit pas être récupérable seul, viewer WebGL non clairement couvert. Pas de GLB : KYMA le fabriquerait elle-même (dérivé servi au public). Aucun avis. | Lecture de la « Custom License » ; réponse écrite du vendeur (H2) ; sinon écarter. Orange si la licence permet expressément la modification et l'affichage web. |
| 4 | Hoodie Zip Generic, Frezzy (RenderHub / Superhive, 27 $) | 🟠 | Extended Use côté RenderHub (texte non lu) ; licence Superhive non trouvée ; **pas de GLB** ; oversize non confirmé. Intérêt faible pour ce brief. | Idem n° 2 ; priorité basse. |
| 5 | Hoodies zippés Clothing Axis (autres références, Superhive) | 🟠 | « Royalty Free » Superhive : en général usage commercial dans un produit fini mais **pas de redistribution de l'asset brut** (non vérifié) ; modèles trop lourds. Même famille que le n° 2. | Réponse écrite ; préférer le n° 2 (même vendeur). |
| 6 | Hoodie, CG StudioX (Reallusion) | 🔴 | Licence non trouvée ; format Character Creator / iClone, sans glTF natif ; zip et oversize non confirmés ; contenu Reallusion souvent limité en redistribution de l'asset brut (non vérifié). Seul atout : 2 342 polygones. | Écarter, sauf si le vendeur confirme par écrit le point H2 et si un export fidèle est possible. |
| 7 | Stussy Zip Hoodie Low Poly PBR (RenderHub) | 🔴 **à écarter** | **Editorial Use Only** et marque tierce (Stüssy) : interdit pour un site marchand ; risque de contrefaçon et de pratique commerciale trompeuse. | Aucune. |
| — | BinaryCloth (prestation sur mesure, dès 39 $) | 🟠 | Licence non trouvée ; sur mesure : tout se règle par contrat. | Contrat écrit avec cession de droits (H4) et GLB livré. |
| — | Freelance CLO3D à partir du tech pack v3 | 🟢 **si** contrat de cession signé | Le modèle est fait pour KYMA, aux mesures du tech pack : fidélité maximale et plus de redistribution à craindre. | Clause H4 signée ; justificatif de licence commerciale du logiciel (CLO / Marvelous Designer) du freelance ; liste de tout élément tiers. |
| — | Embed Sketchfab (viewer hébergé) | 🟠 | Évite de servir le GLB depuis notre site, mais : la licence Sketchfab Standard n'autorise pas la redistribution comme asset autonome (source secondaire) ; cookies et traceurs tiers du viewer (consentement CNIL, mise à jour de `cookies.html` et du bandeau) ; moins de contrôle sur le récit au défilement (tirette, panneaux) ; dépendance à un tiers. | Mêmes réponses écrites (H2) ; test de Sacha sur le récit ; consentement cookies avant chargement du viewer. |

**Lecture d'ensemble** : aucun achat sur étagère n'est recommandable sans réponse écrite. **Ma préférence juridique** est le freelance CLO3D avec cession de droits (seule option « verte » en droit), puis le n° 2 si le vendeur répond positivement par écrit. Les GLB déjà présents dans le thème (`ressac-v2-*.glb`) : **documenter qui les a créés et avec quels outils** (cession, absence d'IA, absence d'élément tiers), pour la même raison.

#### H2. Question écrite à poser au vendeur avant achat (anglais, prête à envoyer)

À envoyer **tel quel** pour chaque modèle (messagerie du vendeur sur la plateforme, pour conserver la trace). Compléter les crochets. **Conserver la réponse** (capture datée + e-mail) avec la facture.

> **Subject: Licence question before purchase — "[MODEL TITLE]" ([MODEL URL])**
>
> Hello,
>
> I am considering buying "[MODEL TITLE]" ([MODEL URL]) under the "[LICENCE NAME, e.g. Extended Use / Royalty Free / Custom License]" for the e-commerce website of my clothing brand KYMA ([COMPANY NAME], France). Before purchasing, could you please confirm the following in writing?
>
> 1. **Web display.** May I use the model, and files derived from it (converted to glTF/GLB, decimated, re-topologised, re-textured), in an interactive real-time 3D viewer (WebGL / three.js) on our commercial website? The GLB file is delivered to each visitor's browser, so a technically skilled visitor could download it from the browser.
> 2. **Browser delivery is not "redistribution".** Do you confirm that serving the file this way is not a breach of the licence (no "redistribution", "standalone file" or "extractable asset" clause is violated)? If it is, is there another licence tier or an extension (and at what price) that covers it?
> 3. **Modification.** May I modify the model (change the proportions to make it oversized, remove the drawstrings, change the pockets, re-colour and re-texture it with our own print, rig it, add morph targets, bake textures) and use the modified version commercially?
> 4. **Ownership of our changes.** Do we remain free to use our own textures, prints and modifications as we wish, and to use renders and videos of the model in our marketing (website, social media, advertising)?
> 5. **Third-party content.** Is the model, including textures and labels, entirely your original work? Does it contain any third-party brand, logo, label or scanned/photographed content you do not own? Was any AI-generated content used to create it?
> 6. **Scope.** Is the licence perpetual, worldwide, non-exclusive, valid for unlimited visitors and impressions, and can it be issued to our company ([COMPANY NAME])? Will you provide a licence document or invoice in the company's name?
>
> A reply by e-mail or through the platform is sufficient. We will keep your answer with our purchase records. Thank you very much.
>
> Kind regards,
> [NAME], [ROLE], KYMA

**Ajout à insérer selon le modèle** (à placer avant « Kind regards ») :
- N° 1 (photogrammétrie) : « 7. Was this model made from a scan or photographs of a real garment? If so, do you confirm that no brand name, logo or label of a third party is visible or baked into the textures? »
- N° 2, 4, 5 (RenderHub) : « 7. Does your "Extended Use" licence cover real-time/interactive web use (WebGL), not only renders and videos? »
- N° 3 (CGTrader) : « 7. Please send me the full text of your "Custom License", or tell me whether the standard CGTrader Royalty Free licence applies. »
- N° 6 (Reallusion) : « 7. May the model be exported from Character Creator/iClone to glTF and used in a web viewer? »
- Sketchfab : « 7. May the purchased model be uploaded to my own Sketchfab account and embedded on my website, and may I modify it and use the Viewer API to change materials? »

**Règle de décision.** Une réponse vague (« yes, you can use it commercially ») ne répond pas aux points 1 à 3 : relancer. Un « non » ou l'absence de réponse sur les points 1, 2 ou 3 = rouge. Pas de réponse en 7 jours = rouge.

#### H3. Solutions de repli

1. **Freelance CLO3D** (recommandé) : modèle créé à partir du tech pack v3, livré avec les fichiers source et un GLB optimisé (objectif d'Isabelle : moins de 100 000 triangles, environ 5 Mo). Contrat avec la clause H4. Coût (repères d'Isabelle, non vérifiés) : de l'ordre de 250 $ à plusieurs centaines d'euros pour un vêtement, bien plus pour un modèle articulé au contrat « v2 » (panneaux, tirette, doublure) : à préciser dans le devis, **avec retopologie, bake et export GLB inclus**.
2. **Embed Sketchfab** : seulement avec réponse écrite du vendeur (question 7 Sketchfab ci-dessus) et si Sacha confirme que le récit au défilement reste réalisable. Prévoir le consentement cookies avant le chargement du viewer et la mise à jour de `cookies.html` et de `confidentialite.html`.
3. **BinaryCloth ou autre prestation sur mesure** : mêmes exigences contractuelles que le freelance.
4. **Quoi qu'il en soit** : conserver licence, facture et échanges au nom de la société ; refaire la vérification si le modèle change de version ; ne livrer au navigateur que le GLB de production (pas le fichier source CLO ou les textures d'origine).

#### H4. Clause type de cession de droits (freelance / prestataire 3D) — modèle à faire relire par un avocat

> **Article [X] — Propriété intellectuelle et cession de droits**
>
> **X.1 Livrables.** Le Prestataire remet au Client les fichiers suivants, ensemble les « Livrables » : le modèle 3D du hoodie KYMA « Ressac » (fichier source [CLO / Marvelous Designer / Blender] et patrons), les textures et matériaux, le fichier optimisé pour le temps réel au format glTF/GLB, et toutes déclinaisons de coloris commandées.
>
> **X.2 Cession.** Le Prestataire cède au Client, à titre **exclusif**, **pour le monde entier** et **pour toute la durée légale de protection des droits d'auteur**, l'ensemble des droits patrimoniaux sur les Livrables, savoir :
> (a) le droit de **reproduction**, sur tous supports et par tous procédés connus ou inconnus à ce jour (fichiers numériques, serveurs, sites internet, applications, réseaux sociaux, impression, supports publicitaires) ;
> (b) le droit de **représentation**, par tout moyen de communication au public, notamment l'affichage interactif en temps réel (WebGL), la diffusion en ligne et la mise à disposition du fichier au navigateur des visiteurs du site du Client ;
> (c) le droit d'**adaptation, de modification, de transformation et de dérivation** (retopologie, retexture, animation, rigging, changement de coloris, conversion de format, intégration dans d'autres œuvres), y compris par des tiers désignés par le Client ;
> (d) le droit d'**exploitation commerciale**, à toute fin liée à l'activité du Client : site marchand, publicité, communication, packaging, presse, salons, ainsi que la **cession ou la concession à des tiers** de ces droits ;
> (e) le droit de **distribution** des Livrables et de leurs dérivés.
> Cette cession couvre toutes les finalités commerciales du Client. Elle prend effet **au paiement intégral du prix** prévu à l'article [Y].
>
> **X.3 Droit moral.** Le Prestataire conserve son droit moral inaliénable sur l'œuvre. Il **autorise expressément** les modifications, adaptations et dérivations décrites à l'article X.2(c), et renonce, dans la mesure permise par la loi, à exiger une mention de son nom. Le Client peut, sans y être tenu, mentionner le Prestataire.
>
> **X.4 Éléments du Client.** Le tech pack, le motif « KYMA Wave », le logo, les noms et les marques du Client restent sa propriété exclusive. Le Prestataire n'acquiert aucun droit dessus et s'interdit de les réutiliser, de les divulguer ou de les exploiter pour lui-même ou pour un tiers.
>
> **X.5 Originalité et garanties.** Le Prestataire garantit : (a) que les Livrables sont **originaux**, qu'il en est le seul auteur et qu'il est libre de céder les droits ci-dessus ; (b) qu'ils ne contiennent **aucun élément protégé appartenant à un tiers** (modèle, texture, tissu numérique, logo, marque, photographie, étiquette), sauf éléments listés à l'annexe [Z] avec la licence correspondante, qui doit autoriser l'usage commercial, la modification et l'affichage web ; (c) qu'**aucun outil d'intelligence artificielle générative** n'a été utilisé pour créer les Livrables, y compris leurs textures ; (d) qu'il détient une **licence commerciale valide** des logiciels utilisés (CLO, Marvelous Designer ou équivalent) pour toute la durée de la mission ; (e) que les Livrables ne portent atteinte à aucun droit de tiers. Le Prestataire garantit le Client contre toute réclamation de tiers à ce titre et prend en charge les frais et dommages en résultant, dans les limites de l'article [limitation de responsabilité].
>
> **X.6 Confidentialité.** Le Prestataire garde confidentiels le tech pack, les motifs, les visuels et les Livrables jusqu'à leur publication par le Client. Il ne les montre pas dans son portfolio, sur Fiverr, Malt, ComeUp, réseaux sociaux ou ailleurs sans l'accord écrit préalable du Client.
>
> **X.7 Sources et conservation.** Le Prestataire remet les fichiers source et supprime ses copies sur demande du Client à la fin de la mission, sauf obligation légale.
>
> **X.8 Prix.** La rémunération prévue à l'article [Y] rémunère la réalisation des Livrables **et** la cession de droits ci-dessus. Aucune redevance supplémentaire n'est due.
>
> *Notes pour le fondateur et l'avocat.* (1) L'art. L.131-3 du Code de la propriété intellectuelle exige que chaque droit cédé soit **mentionné distinctement** avec son étendue, sa destination, son lieu et sa durée : c'est pourquoi la clause les énumère (à vérifier sur Légifrance, texte non consulté). (2) La cession globale d'œuvres futures est nulle : la clause doit viser des livrables **déterminés** (art. X.1). (3) Une œuvre commandée n'est **pas** cédée automatiquement : sans clause écrite, le prestataire garde ses droits. (4) Faire signer par une personne physique ou morale identifiée (SIREN), facture au nom de la société. (5) Pour un prestataire établi hors de France, faire vérifier la loi applicable.

#### H5. Points de vigilance (modèles 3D)

**🔴 Bloquant**

| # | Risque | Action | Qui |
|---|---|---|---|
| L1 | **Achat d'un modèle avant réponse écrite du vendeur** sur l'affichage WebGL, la modification et le GLB servi au navigateur. | Envoyer la question H2 ; ne rien acheter sans réponse écrite, accord du fondateur et feu de Victoire. | Izaac (envoi), fondateur |
| L2 | **Modèle Stüssy (n° 7) et toute licence « Editorial Use Only »** : interdits sur un site marchand. | Écarter définitivement. | Izaac |
| L3 | **Modèle générique non fidèle au produit** présenté sur le site : visuel trompeur (partie E). | Modifier jusqu'à fidélité avec le tech pack ; contrôler sur préséries. | Izaac |

**🟠 À régler rapidement**

| # | Risque | Action | Qui |
|---|---|---|---|
| L4 | **GLB téléchargeable par le navigateur** (risque commun à tout achat) : interdiction de redistribution dans la plupart des licences. | Obtenir la clause écrite (H2) ou passer au modèle sur mesure avec cession (H4). | Izaac, fondateur |
| L5 | **Provenance des GLB `ressac-v2-*.glb` déjà dans le thème** non documentée : auteur, outils, éléments tiers, absence d'IA (décision du fondateur : aucune IA). | Izaac documente l'origine de chaque fichier ; cession écrite si un tiers est intervenu. | Izaac, fondateur |
| L6 | **Embed Sketchfab** : cookies et traceurs tiers avant consentement. | N'activer le viewer qu'après consentement ; mettre à jour `cookies.html` et la politique de confidentialité. | Sacha, Victoire |

**🟢 Bonnes pratiques**

| # | Point | Action | Qui |
|---|---|---|---|
| L7 | Dossier de preuves 3D : licence en PDF datée, facture au nom de la société, échanges avec le vendeur, captures de la page de vente. | Dossier partagé. | Izaac |
| L8 | Ne livrer au navigateur que le GLB de production, optimisé (moins de 100 000 triangles, environ 5 Mo), jamais les sources ni les textures d'origine. | Contrôle avant mise en ligne. | Sacha |
| L9 | Retirer toute attribution exigée par une licence CC-BY ou équivalente dans un endroit visible (mentions légales ou pied de page de la page 3D). | Selon la licence retenue. | Sacha |

---

## Statut juridique — comparatif (avec Abdou), 09/10/2026

> **Auteur** : Victoire · **Binôme** : Abdou (angle fiscal et social, `finance/statut-comparatif.md`, livré le 10/10/2026). Le recoupement est fait en **section 9** ci-dessous : aucune contradiction. **Je ne chiffre aucun coût fiscal ni social ; les montants cités sont des repères de sources secondaires, à confirmer par Abdou.**
> **Hypothèses** (`brand/BRAND.md`, note de conformité) : fondateur unique, personne physique ; SASU « envisagée », rien d'immatriculé ; marque non déposée ; aucun fabricant signé ; précommandes encaissées avant production (≈ 50 % du volume) ; abonnement Cercle Waves (12,99 € et 39,99 € TTC par trimestre) ; levée de fonds possible plus tard (à confirmer par le fondateur).
> **Sources** : service-public.fr, INPI, Légifrance et economie.gouv.fr sont inaccessibles depuis l'environnement (erreur réseau le 09/10/2026). Tout ce qui suit vient d'extraits de recherche et de guides secondaires (cabinets, CCI, Infogreffe, éditeurs). Les articles cités de mémoire sont suivis de « (à relire) ». **Relire chaque article sur Légifrance** avant de s'y fier. Modèle à faire valider par un avocat, et par Abdou pour tout ce qui est fiscal ou social.

### 1. Réponse courte

**SASU**, créée **avant** les précommandes, l'ouverture du compte de paiement, la signature du fabricant et le dépôt de marque. L'EURL est un second choix valable. La micro-entreprise est juridiquement possible mais mal adaptée à KYMA. Raisons, détaillées plus bas : (1) un fabricant, une banque ou un investisseur attend une société ; (2) la SASU peut accueillir des associés sans changer de forme ; (3) la marque, le motif et le domaine appartiennent dès le début à la société, sans transfert ultérieur ; (4) pas de transfert de contrats clients (précommandes, abonnements) en cas de changement de statut. **Certitude** : élevée sur l'orientation, moyenne sur les détails (sources secondaires).

### 2. Tableau comparatif juridique

| Critère | SASU | EURL | Micro-entreprise / EI |
|---|---|---|---|
| **Nature** | Société (SAS à associé unique), personne morale | Société (SARL à associé unique), personne morale | Personne physique ; la micro-entreprise est un régime simplifié de l'EI, pas un statut distinct |
| **Responsabilité** | Limitée aux apports. Le dirigeant reste responsable de ses fautes de gestion (art. L.651-2 C. com.), de ses infractions et des cautions qu'il signe | Idem | Patrimoines professionnel et personnel séparés de plein droit depuis le 15/05/2022 (loi n° 2022-172), avec exceptions (voir 3.1) |
| **Capital** | Libre, 1 € possible. Au moins la moitié des apports en numéraire libérée à la création, le solde sous 5 ans (L.225-3 appliqué à la SAS selon les guides, à relire) | Libre, 1 € possible. Au moins un cinquième libéré à la création (L.223-7, à relire) | Aucun |
| **Gouvernance** | Statuts très libres ; un président (le fondateur) ; décisions de l'associé unique consignées ; comptes approuvés chaque année et déposés au greffe | Cadre légal de la SARL plus rigide ; un gérant ; mêmes obligations de comptes | Aucune structure ; l'entrepreneur décide seul ; pas de dépôt de comptes |
| **Fabricant et banques** | Bon : Kbis, SIREN, capital, TVA intracommunautaire, comptes déposés | Bon, équivalent | Plus faible : contrat signé par une personne physique, pas de capital, pas de bilan public |
| **Levée de fonds** | Très bon : entrée d'associés sans transformation, actions de préférence, BSA/BSA-AIR, pacte (à confirmer par l'avocat) | Moyen : la SARL accueille des associés mais ne peut pas émettre de valeurs mobilières donnant accès au capital (à relire) ; transformation en SAS possible mais coûteuse | Impossible : il faut d'abord créer une société et y transférer l'activité |
| **Précommandes et abonnement** | Adapté : la société encaisse, contracte et rembourse ; dettes de la société | Adapté | Possible, mais les encaissements d'avance consomment vite les plafonds (pour Abdou) ; transfert de contrats clients si passage en société |
| **Marque et PI** | Titulaire naturel de la marque, du motif, du domaine | Idem | Titulaire = le fondateur ; cession à prévoir ensuite |
| **Création** | Statuts, dépôt de capital, annonce légale, dossier au guichet unique ; en pratique 1 à 3 semaines | Idem | Déclaration en ligne ; la plus rapide (quelques jours) |
| **Domiciliation** | Siège au domicile du président ou chez une société de domiciliation | Idem | Adresse d'activité = souvent le domicile, visible publiquement |
| **RC pro** | Souscrite au nom de la société | Idem | Souscrite à titre personnel/professionnel |
| **Pages légales** | Mentions de société (voir 4) | Idem, avec « EURL » et « gérant » | Mention « EI », pas de capital, adresse du domicile |

### 3. Analyse par thème

#### 3.1 Responsabilité et protection du patrimoine personnel

- **SASU / EURL.** L'associé unique ne risque en principe que son apport (art. L.227-1 pour la SAS, à relire). La protection tombe dans trois cas : (a) **cautions personnelles** signées pour la banque ou le fabricant (pratique courante pour une jeune société, négociable, jamais obligatoire par la loi) ; (b) **faute de gestion** avec insuffisance d'actif : le tribunal peut mettre tout ou partie des dettes à la charge du dirigeant (art. L.651-2 C. com. ; exemples de fautes retenues : absence de comptabilité, poursuite d'une exploitation déficitaire, CA Agen, 13/11/2024) ; (c) **responsabilité personnelle du dirigeant** pour ses infractions (pratiques commerciales trompeuses, abus de biens sociaux) et en matière fiscale (à relire). Le président qui prélève de l'argent dans la société hors rémunération, dividendes ou compte courant régulier s'expose à l'abus de biens sociaux, même seul associé.
- **EI / micro-entreprise.** Depuis le 15/05/2022, l'entrepreneur a **deux patrimoines distincts de plein droit**, sans formalité ; la résidence principale est insaisissable de droit. Mais : (a) le créancier professionnel peut demander à l'entrepreneur de **renoncer par écrit** à la limitation de son gage pour un engagement précis (art. L.526-25, à relire) ; l'entrepreneur peut aussi accorder une sûreté sur son patrimoine personnel ; (b) l'administration fiscale et les organismes sociaux peuvent poursuivre sur l'ensemble des patrimoines pour l'impôt sur le revenu et les prélèvements sociaux (art. L.526-24, selon une source secondaire) ; (c) d'autres exceptions existent en cas de fraude ou de manquements graves (**je n'ai pas pu les vérifier**, art. L.526-22 à relire) ; (d) en cas de mélange des comptes ou de comptabilité absente, la séparation se prouve mal.
- **Lecture.** Sur le papier, la protection patrimoniale est comparable depuis 2022. En pratique, la société est plus nette : structure formelle, comptabilité obligatoire, comptes déposés, preuve de séparation. **Le point qui compte le plus est celui des cautions**, quel que soit le statut : ne jamais signer une caution illimitée ni une renonciation sans l'avis d'un avocat. **Certitude** : moyenne (pas d'accès aux textes).

#### 3.2 Capital, libération et gouvernance

- Pas de minimum légal de capital pour la SASU ni l'EURL. Un capital de 1 € est légal mais présente la société comme dépourvue de fonds propres, ce qui pèse auprès du fabricant et de la banque. **Le montant du capital et la part en compte courant d'associé sont une décision financière : à fixer avec Abdou.**
- Le capital en numéraire est déposé sur un compte bloqué (banque, plateforme en ligne ou notaire) ; la banque remet l'**attestation de dépôt des fonds**, pièce indispensable au dossier d'immatriculation. Un dossier sans cette attestation est rejeté (sources secondaires).
- **Gouvernance SASU** : les statuts peuvent déjà prévoir ce qui servira plus tard (agrément des nouveaux associés, clause d'inaliénabilité, règles de majorité). Rédiger des statuts « prêts pour des associés » coûte peu à la création et évite une réécriture.
- **Dirigeant** : président de SASU (assimilé salarié) ou gérant d'EURL (en principe travailleur non salarié) : différence sociale et fiscale **pour Abdou**.

#### 3.3 Crédibilité auprès du fabricant et des banques

- Le fabricant portugais contractera avec une entité identifiable : dénomination, SIREN, numéro de TVA intracommunautaire, représentant légal. Une société permet de négocier un **acompte plutôt qu'un paiement intégral d'avance** et de plafonner la responsabilité. Je n'ai trouvé aucune source sur les exigences réelles des fabricants : **demander par écrit au fabricant** ce qu'il exige (Kbis, caution, acompte, assurance) avant de signer.
- Les banques et plateformes de paiement demandent les documents d'identité de la société : pour Shopify Payments, le compte « société privée » demande les informations de la société, du représentant et la liste des bénéficiaires effectifs ; le compte « entreprise individuelle » demande le SIRET (source : guide secondaire, non officiel). Pièces acceptées : Kbis ou avis de situation SIREN (forums Shopify).
- **TVA intracommunautaire sur les achats au Portugal** : le régime de TVA (franchise ou non) conditionne la TVA facturée par le fabricant et le numéro à communiquer : **pour Abdou, avant la signature**.

#### 3.4 Levée de fonds future

- **SASU puis SAS** : l'arrivée d'un second associé ne change pas la forme sociale ; on adapte les statuts et on signe un pacte. La SAS est la forme la plus courante auprès des investisseurs (sources secondaires). Le **financement participatif en capital ou en prêt** passe par des plateformes agréées (règlement (UE) 2020/1503 et AMF, non vérifié) ; la **prévente avec contreparties** (type Ulule) est une précommande : mêmes obligations de livraison que sur le site, et mêmes mentions.
- **EURL** : possible mais plus rigide ; une transformation en SAS coûte de l'ordre de 500 à 2 000 € selon un guide secondaire (**à chiffrer par Abdou**).
- **EI / micro** : aucun investisseur ne peut entrer. Passer en société plus tard suppose de transférer le fonds, les contrats, la marque, le domaine, le compte Shopify et les stocks, avec des coûts et un risque de rupture.

#### 3.5 Précommandes et Cercle Waves (encaissements d'avance)

1. **Qui encaisse.** Les fonds appartiennent à la société, qui doit les rembourser en cas de rétractation, d'impossibilité de livrer ou de résolution (art. L.216-1 et s. C. conso). En cas de défaillance, les clients sont des créanciers de la société comme les autres. **Je n'ai trouvé aucune obligation légale de cantonner (séquestrer) les sommes reçues pour une vente à distance de biens** (à confirmer par l'avocat). Bonne pratique : compte bancaire dédié aux précommandes, trésorerie de remboursement provisionnée, aucun prélèvement personnel.
2. **Responsabilité pénale.** Encaisser en sachant que l'on ne livrera pas, ou afficher une date que l'on sait intenable, reste une infraction (pratique trompeuse, escroquerie) quel que soit le statut : la forme sociale ne protège pas le dirigeant.
3. **Shopify Payments** peut constituer des **réserves** (retenue d'une partie des fonds) selon l'analyse de risque du compte ; le centre d'aide ne traite pas expressément des précommandes, mais l'expérience de marchands signale des retenues de 30 à 120 jours (forums, anecdotes). Conséquence : ne pas compter sur un versement immédiat ; provisionner la trésorerie avec Abdou. [Shopify Help Center, « Overview of reserves », consulté 09/10/2026.]
4. **Cercle Waves.** Un abonnement à renouvellement automatique suppose un cocontractant clair, des CGV et conditions au nom de la société, et un prélèvement récurrent sur le compte de la société. Le Crédit Waves est une dette envers les clients (avoir) : traitement comptable et TVA **pour Abdou**. Les obligations de la section Cercle Waves (rappel J-35, résiliation en ligne, rétractation) sont les mêmes dans tous les statuts.
5. **Micro-entreprise.** Les encaissements d'avance comptent dans le chiffre d'affaires et peuvent rapprocher plus vite des plafonds et des seuils de franchise de TVA. Plafonds 2026-2028 selon les guides : 203 100 € pour la vente de marchandises (ancien plafond : 188 700 € ; une source divergente cite encore l'ancien) ; franchise de TVA à 85 000 € (tolérance 93 500 €) : **chiffres à confirmer par Abdou**. (La franchise en base de TVA n'est pas réservée à la micro-entreprise : une SASU peut en bénéficier sous les mêmes seuils, voir section 9.)

#### 3.6 Dépôt de la marque KYMA : au nom de la personne ou de la société ?

**Recommandation : au nom de la SASU**, dès que le SIREN est attribué.

- **Pourquoi la société.** Elle exploitera la marque : le titulaire de la marque est l'exploitant, sinon il faut une licence écrite. Un investisseur, un fabricant ou une plateforme attendent que les actifs de PI soient dans la société. Pas de cession à organiser plus tard, donc pas de frais ni d'impôt de cession (pour Abdou : une cession onéreuse de marque est assimilée à une cession d'actif avec droits d'enregistrement, selon une source secondaire).
- **Pourquoi pas avant l'immatriculation, au nom de la « société en formation ».** Le fondateur peut déposer pour le compte d'une société en formation, et la société reprend ensuite le dépôt (source secondaire). Mais la reprise des actes accomplis pour une société en formation doit être **expresse** (état des actes annexé aux statuts ou mandat) ; la jurisprudence a évolué, dont des arrêts du 29/11/2023 que je n'ai pas pu lire (art. L.210-6 C. com. et art. 1842 C. civ., à relire). Tant qu'elle n'est pas reprise, la personne qui a agi est engagée personnellement. Le gain de quelques jours ne justifie pas ce flou.
- **Solution de repli si l'urgence est réelle** (annonce publique imminente, signe qu'un tiers dépose un nom proche, immatriculation qui traîne au-delà de 3 à 4 semaines) : dépôt **au nom du fondateur**, personne physique, puis **cession écrite à la société** après son immatriculation, avec inscription de la cession au Registre national des marques pour qu'elle soit opposable aux tiers (art. L.714-7 CPI, à relire ; frais d'inscription non trouvés, à vérifier sur le barème INPI). Entre-temps, une licence écrite et gratuite du fondateur à la société évite un vide.
- **Priorité.** Le droit sur la marque s'acquiert par le **premier dépôt** : chaque semaine de retard est un risque. Le compte @kymasinsta et les annonces publiques augmentent l'exposition. La **recherche d'antériorités** (INPI, EUIPO/TMview, WIPO) peut et doit être faite **dès maintenant**, car « kyma » est un mot grec courant.
- **Coût.** Tarif INPI en vigueur depuis le 02/07/2026 : **190 € pour une classe** ; **40 € par classe supplémentaire** selon des guides (non repris dans l'extrait officiel lu), soit **230 € pour les classes 25 et 35**. La protection court pour 10 ans, renouvelable (renouvellement 290 € pour une classe selon une source non officielle). Extension UE (EUIPO) : revendiquer la **priorité de 6 mois** de la Convention de Paris, après le dépôt INPI ; tarif EUIPO non vérifié.
- **Autres actifs à mettre au nom de la société** : logo et motif « KYMA Wave » (**cession écrite des droits d'auteur** du créateur à la société, art. L.131-3 CPI), nom de domaine, boutique Shopify (transfert de propriété du compte), comptes de réseaux sociaux (e-mail professionnel de la société). Le nom de produit « Ressac » doit être couvert par la recherche d'antériorités.

#### 3.7 Démarches et délais de création (guichet unique INPI)

Depuis le 01/01/2023, le **guichet unique** de l'INPI (formalites.entreprises.gouv.fr) est la seule voie pour toute formalité de création, de modification ou de cessation (sources secondaires).

| Étape | SASU | Délai indicatif |
|---|---|---|
| 1 | Vérifier la disponibilité du nom et recherche d'antériorités de la marque | 1 à 3 jours |
| 2 | Rédiger les statuts (objet social large : création, fabrication sous-traitée et vente de vêtements, e-commerce, abonnement et fidélité ; siège ; président ; durée) | 1 à 3 jours |
| 3 | Déposer le capital et obtenir l'attestation de dépôt des fonds | quelques jours selon la banque ou le notaire |
| 4 | Publier l'annonce légale de constitution | 1 à 2 jours |
| 5 | Saisir le dossier sur le guichet unique : statuts signés, attestation de dépôt des fonds, justificatif de siège, pièce d'identité, déclaration de non-condamnation, annonce légale, déclaration des bénéficiaires effectifs | 1 jour |
| 6 | Instruction et immatriculation (Kbis, SIREN, SIRET) | 3 à 7 jours ouvrés dans les guides, avec des estimations divergentes (24 h par étape pour d'autres) |
| 7 | Après le Kbis : compte bancaire définitif, régime de TVA, Shopify Payments, assurance, adhésion Refashion, convention de médiation, dépôt de marque | variable |

- **Total réaliste** : 1 à 3 semaines si le dossier est complet ; l'incomplétude du dossier est la première cause de retard (sources secondaires). **Coût** : un guide secondaire cite 250 à 500 € hors honoraires ; **devis à demander, chiffrage par Abdou**.
- **Micro-entreprise** : déclaration en ligne sur le même guichet, sans capital, sans statuts ni annonce légale, délai de quelques jours. Un commerçant s'immatricule aussi au RCS (à relire).
- **Ne rien signer ni encaisser au nom de KYMA avant le Kbis** (fabricant, domaine, plan Shopify payant, graphistes, 3D). Le compte d'essai Shopify existant est transféré à la société après le Kbis (ST12). Voir ST3.

#### 3.8 Domiciliation

| Option | Avantages | Limites |
|---|---|---|
| **Domicile du président** | Gratuit ; le dirigeant peut y installer le siège de façon permanente sauf disposition contraire de la loi ou du contrat (Infogreffe) | Les sources divergent sur une durée maximale de 5 ans selon les clauses du bail ou du règlement de copropriété (art. L.123-11-1 C. com., à relire) ; prévenir le bailleur ou le syndic ; l'adresse devient publique (Kbis, mentions légales) |
| **Société de domiciliation agréée** | Adresse professionnelle ; domicile du fondateur non publié ; contrat de domiciliation écrit | Coût mensuel (devis) ; courrier à relever |
| **Local ou espace de coworking** | Crédibilité, adresse de retours possible | Coût, bail |

Le choix pèse sur les pages légales : une **personne physique** ne bénéficie de l'anonymat de son domicile qu'à titre non professionnel (art. 6 III LCEN, à relire), alors que la société n'a besoin d'afficher que son siège. **Adresse de retours et de service client** : distincte du siège, à fixer avec le fabricant et le transporteur.

#### 3.9 Assurance RC professionnelle et responsabilité produit

- **Pas d'obligation légale** de RC pro pour la vente en ligne de vêtements (guides Shopify, Shine, Assurup), mais elle est **fortement conseillée** et peut être exigée par un partenaire.
- **Garantie à retenir** : RC exploitation **et RC produits après livraison** (dommages causés par un produit livré : allergie, blessure, défaut). La garantie dommages au stock et la cyber-assurance sont des options.
- **Pourquoi c'est important pour KYMA.** (a) Celui qui **appose sa marque** sur un produit est assimilé au producteur pour la responsabilité du fait des produits défectueux (ancien art. 1386-6, devenu 1245-5 C. civ. ; la CJUE a précisé la notion en 2024, aff. C-157/23 ; art. à relire). La victime peut s'adresser à KYMA même si le fabricant est au Portugal. La directive (UE) 2024/2853 doit être transposée et modifiera ce régime (à suivre). (b) Le règlement (UE) 2023/988 (**GPSR**, applicable depuis le 13/12/2024) impose que l'offre en ligne indique le **nom, l'adresse postale et l'adresse électronique du fabricant** (art. 19 selon des guides, à relire) ; une marque qui fait fabriquer sous son nom peut être qualifiée de fabricant (art. 3, à relire). La **société** devient donc le contact affiché sur les fiches produit et sur l'étiquette ou l'emballage.
- **À faire** : souscrire avant la première expédition (et avant la signature du fabricant s'il l'exige), au nom de la société, avec une garantie couvrant la vente à distance dans l'UE et la contrefaçon ; demander au fabricant son attestation d'assurance et un **recours contractuel** en cas de défaut. **Prime : devis, chiffrage par Abdou.**

### 4. Ce que le statut change pour les pages légales

| Page | Si SASU (hypothèse actuelle) | Si EURL | Si EI / micro |
|---|---|---|---|
| **Mentions légales** (`mentions-legales.html`) | Dénomination, « SASU », capital, siège, RCS et SIREN, n° de TVA intracommunautaire, président (directeur de la publication), e-mail, téléphone, hébergeur, médiateur, IDU. Le modèle est déjà rédigé pour cette hypothèse | « EURL », gérant au lieu de président | Nom, prénom et mention « EI » ou « entrepreneur individuel » (décret n° 2022-725 du 28/04/2022 pour les documents commerciaux, afficher par prudence sur le site) ; SIREN ; adresse ; pas de capital ; « TVA non applicable, art. 293 B du CGI » en franchise |
| **CGV** (`cgv.html`) | Vendeur = la société ; identité complète en tête ; clause de **transfert** à un successeur (voir 5) | Idem, « EURL » | Vendeur = EI ; adresse du domicile ; mention EI |
| **Cercle Waves** | Cocontractant = la société ; prélèvements à son nom | Idem | Idem avec le nom de l'EI |
| **Retours** | Adresse de retours distincte du siège | Idem | Idem |
| **Confidentialité** | Responsable du traitement = la société ; DPA Shopify accepté par la société ; registre au nom de la société | Idem | Responsable = l'EI (la personne) |
| **Cookies** | Aucun changement | Aucun | Aucun |
| **Fiches produit et étiquette** | Nom, adresse postale et e-mail de la société (GPSR) ; marque KYMA | Idem | Nom de l'EI ; l'adresse de l'EI devient le contact public |
| **Facturation** | Mentions de société : SIREN, forme, capital, TVA | Idem | Mention EI, SIREN, franchise de TVA le cas échéant |

### 5. Obligations qui en découlent (pages légales, CGV et au-delà)

1. **Aucune page légale n'est publiable sans SIREN** : `[À COMPLÉTER]` ne peut être levé qu'après le Kbis (point 1).
2. **Identité du vendeur dans les CGV** : dénomination, forme, capital, siège, RCS, TVA, téléphone et e-mail (art. L.111-1 et L.221-5 C. conso). La **forme juridique ne doit jamais être déduite** : copier le Kbis.
3. **Clause de transfert du contrat** dans les CGV et les conditions du Cercle Waves : en cas de transformation, de fusion ou de reprise par une société du groupe, le professionnel peut transférer ses droits et obligations **sous réserve d'en informer le client et sans réduire ses droits**. Sans cette clause, la cession d'un contrat en cours (précommande, abonnement) exige l'accord du client (art. 1216 C. civ., à relire). Une **simple transformation** de SASU en SAS ne crée pas de nouvelle personne morale et n'en a pas besoin ; **le passage d'une EI à une société, si**. C'est un argument de plus pour la société d'emblée. Clause à faire valider par l'avocat (équilibre des clauses, art. L.212-1).
4. **Médiation de la consommation** : convention signée au nom de l'entité qui vend.
5. **Éco-organismes** : Refashion et emballages demandent le SIREN ; l'IDU est ensuite inscrit dans les mentions légales et les CGV.
6. **Fabricant, GPSR et étiquette** : l'identité de la société sur l'étiquette ou l'emballage, selon le règlement GPSR (à confirmer avec le fabricant).
7. **Mise à jour des textes** : je mets à jour `mentions-legales.html`, `cgv.html` et `confidentialite.html` dès réception du Kbis (point E10 de l'entraide). Tant que le statut n'est pas arrêté, le modèle reste rédigé pour une SASU.

### 6. Recommandation (à confirmer avec Abdou pour les chiffres et avec un avocat)

**Créer une SASU**, avec ces conditions :

1. **Immatriculer d'abord, vendre ensuite.** Rien n'est signé ni encaissé avant le Kbis : ni contrat fabricant, ni domaine, ni précommande, ni abonnement.
2. **Statuts « prêts pour des associés »** : objet social large, agrément des nouveaux associés, siège domicilié, président = fondateur. Le capital et le compte courant sont fixés avec Abdou.
3. **Marque** : recherche d'antériorités maintenant ; dépôt INPI **au nom de la SASU** (classes 25 et 35, avec « Ressac » dans la recherche) dès le SIREN ; repli en nom propre avec cession écrite si l'urgence est réelle ; extension UE dans les 6 mois de priorité.
4. **PI** : cession écrite des droits (logo, motif Wave, rendus, 3D) à la société dès l'immatriculation ; domaine, boutique Shopify et réseaux au nom de la société.
5. **Argent** : compte bancaire professionnel dédié, provision de remboursement des précommandes, aucune caution illimitée ni renonciation sans avocat.
6. **Assurance** : RC exploitation et RC produits avant la première expédition.
7. **Domiciliation** : société de domiciliation si le fondateur souhaite ne pas publier son domicile ; sinon domicile après vérification du bail ou du règlement de copropriété.
8. **Choisir l'EURL à la place** seulement si les chiffres d'Abdou montrent un avantage social ou fiscal net pour un dirigeant non salarié **et** si le fondateur renonce à une levée de fonds. **Ne pas choisir la micro-entreprise** : pas de levée possible, crédibilité plus faible, transfert de contrats plus tard, domicile public.

**À confirmer avec Abdou (chiffres)** : capital et compte courant ; régime social et fiscal du dirigeant (président assimilé salarié ou gérant non salarié) ; IS ou IR ; franchise de TVA ou assujettissement et TVA sur achats au Portugal ; plafonds de la micro-entreprise ; coût de création et de domiciliation ; prime de RC pro ; impact de la réserve Shopify sur la trésorerie ; traitement comptable et TVA du Crédit Waves ; fiscalité d'une éventuelle cession de marque.

**À confirmer avec un avocat** : statuts ; clause de reprise des actes (si un acte est signé avant le Kbis) ; caution et renonciation ; clause de transfert de contrat ; absence d'obligation de cantonnement des fonds de précommande ; contrat fabricant (PI, garantie, assurance) ; GPSR et responsabilité du fait des produits ; recherche d'antériorités.

### 7. Points de vigilance (statut juridique)

**🔴 Bloquant avant mise en vente**

| # | Risque | Action | Qui |
|---|---|---|---|
| ST1 | **Statut non arrêté et non immatriculé** : pas de SIREN, donc pas de compte de paiement, de CGV complètes ni de contrat fabricant sûr. | Décider (SASU recommandée), immatriculer sur le guichet unique, puis lever les `[À COMPLÉTER]`. | Fondateur, Abdou |
| ST2 | **Marque non déposée et titularité à trancher** : risque de perte du nom par un dépôt tiers (le premier déposant gagne). | Recherche d'antériorités maintenant ; dépôt au nom de la SASU dès le SIREN, ou repli en nom propre avec cession écrite. | Fondateur, conseil en PI |
| ST3 | **Engagements pris avant l'immatriculation** (fabricant, domaine, outils, prestataires 3D ou graphiques) : la personne qui signe est engagée personnellement tant que la société ne les a pas repris (art. L.210-6 C. com., à relire). | Ne rien signer au nom de KYMA avant le Kbis, ou lister les actes dans une annexe aux statuts ou donner un mandat exprès. | Fondateur, avocat |
| ST4 | **Droits d'auteur du logo, du motif Wave et des visuels** détenus par le créateur et non par la société. | Cession écrite détaillée (art. L.131-3 CPI), signée dès l'immatriculation. Voir la clause H4 pour la 3D. | Fondateur |

**🟠 À régler rapidement**

| # | Risque | Action | Qui |
|---|---|---|---|
| ST5 | **Cautions personnelles et renonciations** demandées par la banque ou le fabricant : perte de la protection du patrimoine. | Refuser les cautions illimitées ; plafonner montant et durée ; avis d'un avocat avant de signer. | Fondateur, avocat |
| ST6 | **Encaissements d'avance** non cantonnés et mêlés à la trésorerie courante : défaut de remboursement en cas de rétractation ou d'arrêt de la production ; faute de gestion possible. | Compte dédié et provision de remboursement ; aucune dépense hors production avant l'expédition. | Fondateur, Abdou |
| ST7 | **Réserve Shopify Payments** sur les précommandes non expédiées : fonds retenus. | Interroger le support Shopify par écrit avant l'ouverture ; prévoir la trésorerie. | Sacha, Abdou |
| ST8 | **RC pro et RC produits absentes**, alors que KYMA répond du produit comme « producteur apparent ». | Devis et souscription avant la première expédition. | Fondateur, Abdou |
| ST9 | **GPSR** : identité du fabricant (nom, adresse postale, e-mail) absente des fiches et de l'étiquette ou de l'emballage. | Ajouter ces champs sur les fiches ; vérifier l'étiquette avec le fabricant. | Sacha, Izaac, fondateur |
| ST10 | **Domiciliation** : siège au domicile sans vérification du bail ou du règlement de copropriété ; adresse personnelle publiée. | Vérifier, prévenir le bailleur ou le syndic, ou choisir une société de domiciliation. | Fondateur |
| ST11 | **Transfert de contrats clients** (précommandes, abonnements) non prévu : accord des clients exigé en cas de changement de statut. | Clause de transfert dans les CGV et les conditions du Cercle Waves. | Victoire, avocat |
| ST12 | **Boutique Shopify, domaine et réseaux** au nom d'une personne physique. | Transférer la propriété à la société après le Kbis (e-mail professionnel, titulaire du domaine). Le compte d'essai Shopify existant suit le même chemin. | Fondateur, Sacha |

**🟢 Bonnes pratiques**

| # | Point | Action | Qui |
|---|---|---|---|
| ST13 | Statuts « SAS-ready » et pacte simple dès l'arrivée d'un second associé. | Avocat lors de la rédaction des statuts. | Fondateur |
| ST14 | Dossier de preuves du statut : statuts, Kbis, attestation de dépôt des fonds, attestations d'assurance, contrat de domiciliation. | Dossier partagé. | Fondateur |
| ST15 | Veille : transposition de la directive (UE) 2024/2853 (responsabilité produit), plafonds 2026-2028, évolution des règles de reconduction tacite. | Relecture trimestrielle. | Victoire, Abdou |

### 8. Sources de cette section (consultées le 09/10/2026 ; extraits de recherche et sources secondaires, accès direct aux sources officielles impossible)

- **Guichet unique, délais, SASU** : Swim Legal, « Délais INPI création d'entreprise » et « Immatriculation SASU : étapes, documents et procédure Guichet unique » (swim.legal) ; Copeps, « Comment créer une SASU sur le guichet unique » (copeps.fr) ; LegalPlace, « Temps de création d'entreprise » (legalplace.fr). Question écrite n° 9869 (16e législature), Assemblée nationale, sur le guichet unique.
- **Capital et dépôt des fonds** : LegalPlace, « Dépôt de capital SASU » ; Hayot Expertise, « Apport en numéraire : libération du capital » ; Selectra, « Déposer son capital en ligne ».
- **Entrepreneur individuel, séparation des patrimoines** : loi n° 2022-172 du 14/02/2022 ; CCI Paris Île-de-France, « Nouveau statut des entrepreneurs individuels » ; Lefebvre Dalloz, « Protéger le patrimoine personnel de l'entrepreneur individuel » ; Fiducial, « Insaisissabilité des biens immobiliers non professionnels » ; actu-juridique.fr (art. L.526-22, L.526-24, L.526-25). Mention « EI » : décret n° 2022-725 du 28/04/2022, selon Legifiscal, GHR et Obat.
- **Responsabilité du dirigeant** : art. L.227-1 et L.651-2 C. com. ; CA Agen, 13/11/2024 (doctrine.fr) ; Cass. com., 13/12/2023, n° 21-14.579 (Dalloz actualité).
- **Société en formation, reprise des actes** : art. L.210-6 C. com. et art. 1842 C. civ. ; Gazette du Palais (2021) ; Le Monde du Droit, « Société en formation : anticiper et formaliser la reprise d'engagements » ; actu-juridique.fr, « Les conditions de reprise d'un acte passé au nom d'une société en formation, un important revirement jurisprudentiel » (arrêts du 29/11/2023).
- **Marque** : INPI, document tarifaire applicable depuis le 02/07/2026 (inpi.fr, extrait lu : 190 € pour une classe) ; Weblex, « Redevances des procédures INPI 2026 » ; Copeps et Keobiz sur le coût du dépôt, le dépôt par une société en formation et la cession de marque. Convention de Paris (priorité de 6 mois) : connaissance générale, à relire.
- **Domiciliation** : Infogreffe, « Où domicilier le siège social de sa société ? » ; CCI Paris Île-de-France, « Quelle domiciliation pour une société commerciale ? » ; Copeps ; LegalPlace (art. L.123-11-1 C. com.).
- **Micro-entreprise** : Legifiscal, « Nouveaux seuils micro-entreprises année 2026 » ; Propulse by CA ; Hayot Expertise, « Plafonds micro-entreprise 2026 ».
- **Comparatifs de statuts** : Finalib, Advizexperts, L'Expert-Comptable.com (guides 2026 ; chiffres sociaux non repris).
- **Assurance** : Shopify, « Assurances e-commerce » (shopify.com/fr/blog/assurances-ecommerce) ; Shine ; Assurup ; Coover.
- **Responsabilité produit et GPSR** : art. 1245-5 C. civ. (ancien 1386-6) ; CJUE, 19/12/2024, aff. C-157/23 (Dalloz actualité, LegalNews) ; règlement (UE) 2023/988, art. 19 (Vimm, donneespersonnelles.fr, GS1 ; applicable depuis le 13/12/2024) ; directive (UE) 2024/2853.
- **Shopify** : Shopify Help Center, « Overview of reserves in Shopify Payments » (help.shopify.com) ; forum Shopify Community (documents demandés par Shopify Payments pour une société).
- **Financement participatif** : règlement (UE) 2020/1503 ; Ulule et guides sectoriels (non officiels).
- **Rappel avant reconduction (E7)** : Isabelle, `shopify/contenu/recherche-rappel-renouvellement.md` (10/10/2026) : help.shopify.com (Subscriptions, Flow triggers), help.loopwork.co, intercom.help/appstle, sealsubscriptions.com ; extraits de recherche, confiance moyenne.
- **Notes d'Abdou** : `finance/statut-comparatif.md` et `finance/cercle-waves-economie.md` (10/10/2026), qui s'appuient eux-mêmes sur des extraits de recherche.

### 9. Concordance avec les notes d'Abdou (10/10/2026)

> Lues le 10/10/2026 : `finance/statut-comparatif.md` et `finance/cercle-waves-economie.md`. **Résultat : aucune contradiction.** Une précision à apporter (franchise de TVA) et deux conséquences juridiques (Crédit Waves, carte) intégrées dans la v3.2 du règlement. Je ne juge pas les chiffres fiscaux et sociaux d'Abdou.

**9.1 Statut**

| Sujet | Abdou | Victoire | Verdict |
|---|---|---|---|
| Forme | SASU recommandée, EURL second choix, micro déconseillée | Idem | **Concordant** |
| Rémunération du président | Aucune au lancement (pas de cotisation en SASU sans rémunération), mixte salaire modeste et dividendes ensuite | Rien à redire sur le plan juridique. Condition : tout prélèvement hors rémunération, dividendes ou compte courant d'associé régulier est un risque d'abus de biens sociaux (3.1) | **Concordant**, avec cette condition |
| Capital | Quelques milliers d'euros, **entièrement libéré** (conserve le taux d'IS de 15 %), le reste en compte courant | Capital libre ; au moins la moitié des apports en numéraire libérée à la création (2) | **Compatible** : la libération totale est un choix fiscal d'Abdou, à inscrire dans les statuts et à justifier par l'attestation de dépôt des fonds |
| Plafonds micro | 203 100 € (marchandises), 83 600 € (services) | 203 100 € (3.5.5) | **Concordant** |
| Franchise de TVA | **Ouverte à une SASU** sous les seuils de 85 000 € / 93 500 € | Je l'évoquais à propos de la micro-entreprise (3.5.5) | **Précision à retenir** : la franchise est un choix de **régime**, pas de forme. 3.5.5 est complété. Conséquence juridique : si elle est retenue, « TVA non applicable, art. 293 B du CGI » doit figurer sur les factures, les CGV, les fiches produit et l'art. 2 des conditions du Cercle (D bis, ligne 2) |
| Coûts de création | ≈ 250 € plus statuts ; EURL → SAS : 500 à 2 000 € | 250 à 500 € hors honoraires ; 500 à 2 000 € | **Concordant** (même source) |
| TVA sur précommandes | Exigible à l'encaissement de l'acompte pour une livraison de biens (CGI art. 269, 2-a) | Non traité | **Complémentaire** : le prix affiché reste TTC, aucun impact sur les CGV ; à connaître pour la trésorerie |
| Ne rien encaisser avant le Kbis | Oui (renvoie à ST1 et ST3) | Idem | **Concordant** |

**9.2 Crédit Waves = réduction de prix sur l'achat suivant (Abdou, § 5.2)**

| Point | Analyse juridique | Verdict |
|---|---|---|
| Compatibilité avec la v3 du règlement | La v3 parlait d'un « avoir utilisable pour de nouveaux achats ». Appliqué à l'achat suivant comme une réduction, c'est la même chose pour le consommateur. L'art. 7.1 (v3.2) emploie les deux termes (avoir, appliqué comme une réduction du prix) | **Compatible** |
| Recrédit en cas d'annulation | Si une commande réduite par un Crédit Waves est annulée (rétractation, retour), le client est remboursé de la somme **payée** ; sans recrédit il perdrait la réduction. Clause **ajoutée** (art. 7.1, v3.2) : recrédit avec la date d'origine, ou [30] jours | **Ajout nécessaire** (D bis, ligne 14 bis) |
| Information du consommateur | Le panier et la facture montrent le prix, la réduction et le prix payé (nécessaire aussi à la base de TVA d'Abdou). Pas de présentation en prix barré sur la fiche produit : règle du prix de référence (art. L.112-1-1), application aux réductions personnalisées **non vérifiée** | **Compatible**, sous réserve de l'affichage au panier (E17) |
| Outil | Un « crédit en magasin » ou une carte cadeau Shopify est un moyen de paiement : contredit la qualification « réduction ». Préférer une remise (réduction automatique ou code à usage unique par compte) | **Aligné** avec Abdou et Sacha (E17, section 4.3) |
| Qualification fiscale (pas un « bon », art. 256 ter) | Hors de mon périmètre. Mon cadre signalait les deux lectures (cashback, section 1) ; la proposition d'Abdou lève mon doute sur le plan du consommateur | **À faire valider par l'expert-comptable** (O1) |
| Remboursement en argent | Non, comme décidé (sinon monnaie électronique ou moyen de paiement) | **Concordant** |

**9.3 Carte envoyée après le délai de rétractation (Abdou, § 6)**

| Point | Analyse juridique | Verdict |
|---|---|---|
| Compatibilité avec la v3 | La v3 / v3.1 annonçait une carte envoyée « au plus tard 14 jours » après la souscription : **incompatible**. Abdou propose J+15 et s'interroge sur « 21 jours ». Retenu dans la v3.2 : **expédiée au plus tard [21] jours** après la souscription, reçue en principe sous [5] jours ouvrés et **au plus tard [30] jours** après (cohérent avec la règle des 30 jours par défaut, art. L.216-1) | **Adapté dans la v3.2** |
| Information avant l'achat | La date d'envoi est une information précontractuelle (L.111-1, L.221-5, L.216-1) : sur la page du Cercle, au paiement et dans l'e-mail de confirmation (sections 2.C et 2.D) | **Compatible** |
| Les avantages ne dépendent pas de la carte | Écrit à l'art. 7.5 : le client n'est pas privé d'avantages pendant les 21 premiers jours | **Compatible** |
| Rétractation | Si le client se rétracte avant l'envoi, la carte n'est pas envoyée (art. 7.5 et 8, v3.2). **Risque résiduel** : contrat mixte bien + service, point de départ du délai pour la partie « bien » à la réception (L.221-18) | **Compatible sous réserve de l'avocat** (E16, D bis ligne 22). Risque limité par le prorata (L.221-25) |
| Communication | Pas de « carte offerte dès la souscription » | À relayer à Maya (section B) |

**9.4 Autres points d'Abdou qui touchent le règlement**

- **Assiette du cashback** hors part réglée en Crédit Waves : déjà écrite (art. 7.1).
- **Validité de 12 mois** : concordant (D).
- **Taux MAJESTÉ (10 % ou 7 à 8 %) et plafond par trimestre** : décision économique ; si retenue, à écrire à l'art. 7.1 et sous la carte (D bis, ligne 13).
- **Cotisation traitée comme prestation de services à 20 % de TVA, TVA à l'encaissement** : sans effet sur le règlement, qui affiche des prix TTC.
