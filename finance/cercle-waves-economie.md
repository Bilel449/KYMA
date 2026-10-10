# Cercle Waves — économie, TVA et comptabilité (méthode et simulations sur prix publics)

> **Auteur** : Abdou (comptable et conseiller financier KYMA) · **Date** : 10/10/2026 · **Pour** : fondateur, Victoire, Maya, Sacha, Arthur.
> **Fichier versionné (dépôt public)** : uniquement des prix publics (12,99 €, 39,99 €, 5 %, 10 %, 179 €, 199 €) et des tarifs publics de prestataires. Les marges réelles du hoodie sont dans `finance/private/` (non versionné).
> **Rappel unique** : je ne suis pas expert-comptable inscrit à l'Ordre ; le traitement TVA et comptable ci-dessous doit être validé par un expert-comptable diplômé avant la première souscription.
> Calculs en Python, arrondis au centime. TVA 20 %.

## 1. Prix publics : HT et TVA

| Palier | Prix TTC / trimestre | HT | TVA | Sur 4 trimestres TTC (si l'abonné reste un an) | HT |
|---|---|---|---|---|---|
| INITIUM | 12,99 € | 10,83 € | 2,16 € | 51,96 € | 43,30 € |
| MAJESTÉ | 39,99 € | 33,33 € | 6,66 € | 159,96 € | 133,30 € |

## 2. Vérification des calculs de Victoire (et d'Arthur)

| Calcul | Résultat | Verdict |
|---|---|---|
| Cashback par hoodie à 179 € | INITIUM 5 % = **8,95 €** ; MAJESTÉ 10 % = **17,90 €** | ✅ exact |
| Seuil « le cashback couvre la cotisation » | INITIUM 12,99 ÷ 5 % = **259,80 €** (« 260 € ») ; MAJESTÉ 39,99 ÷ 10 % = **399,90 €** (« 400 € ») d'achats par trimestre | ✅ exact (calcul **vu du client**, en TTC ; le ratio est le même en HT) |
| « Soit 2 hoodies » / « soit 3 hoodies » à 179 € | 2 × 179 = 358 € ≥ 259,80 ; 2 × 179 = 358 € < 399,90 ≤ 3 × 179 = 537 € | ✅ exact |
| Rétractation MAJESTÉ au 4e jour d'une période de 91 jours | 39,99 × 4 ÷ 91 = 1,7578 → **1,76 € retenus**, **38,23 € remboursés** | ✅ exact (la période réelle compte 90 à 92 jours : la formule « jours écoulés ÷ jours de la période » reste juste) |
| Même cas INITIUM | 12,99 × 4 ÷ 91 = **0,57 € retenus**, 12,42 € remboursés | (ajout) |

**Deux précisions** :
1. À **199 €**, le cashback devient 9,95 € (INITIUM) et 19,90 € (MAJESTÉ) ; **2 hoodies à 199 € = 398 €, juste sous le seuil MAJESTÉ de 399,90 €** : le message « 3 hoodies » reste vrai.
2. Ces seuils disent quand le **client** récupère sa cotisation. Ils ne disent pas quand le programme **coûte** à KYMA : voir § 4.

> **Usage interne uniquement.** Les seuils 259,80 € / 399,90 € et les soldes du § 4 sont des outils internes. Ne jamais les reformuler au client en « se rentabilise », « rapporte », « gagnez » (Victoire, `shopify/conformite.md` § D).

## 3. Coûts du programme pour KYMA (par abonné)

| Poste | Central | Prudent | Source |
|---|---|---|---|
| Frais de paiement sur la cotisation | 1,5 % + 0,25 € → 0,44 € (INITIUM) / 0,85 € (MAJESTÉ) | 2,7 % + 0,25 € → 0,60 € / 1,33 € | Shopify Payments FR, Basic (Isabelle, `finance/couts-reels-recherche.md`) ; barème à vérifier dans l'admin |
| Carte physique PVC imprimée | 1,50 € | 3,00 € | 0,15–3 € / u pour 100 cartes selon finition (hellopro.fr, accio) ; hypothèse sans devis |
| Enveloppe | 0,20 € | 0,20 € | hypothèse |
| Affranchissement lettre verte 20 g | 1,52 € | 1,52 € | La Poste, tarif au 01/01/2026 |
| **Carte envoyée, total (une fois)** | **3,22 €** | **4,72 €** | Amortie sur 4 trimestres (central) ou 2 (prudent) |
| Appli d'abonnement | ≈ 0,30 € / abonné / trimestre (hypothèse : ≈ 100 abonnés, plan Appstle à 10 $ / mois) | idem | Appstle : gratuit jusqu'à 500 $ / mois de revenus d'abonnement, puis 10 / 30 / 100 $ / mois, 0 % de commission ; Seal : gratuit jusqu'à 50 abonnements, puis 5,95–9,95 $ / mois (Isabelle). Coût négligeable au démarrage ; Recharge (99 $ / mois) ou Bold (+1 à 2 %) à éviter |
| Crédit Waves (avoirs) | 0 € si avoir natif Shopify ou Shopify Flow | — | voir § 6 (attention au traitement TVA de l'outil) |

**Marge du programme avant cashback, par abonné et par trimestre** : INITIUM **9,28 €** (central) / **7,56 €** (prudent) ; MAJESTÉ **31,37 €** / **29,34 €**.

## 4. Coût réel du cashback et seuil où le programme coûte plus qu'il ne rapporte

**Méthode.** Le cashback est versé en Crédit Waves (avoir), pas en argent. Il ne coûte que **s'il est utilisé**. Quand il l'est, il réduit le prix payé sur un achat suivant : KYMA perd le **montant HT** du crédit (la TVA baisse avec le prix : voir § 5). Coût par trimestre = taux de cashback × achats TTC × **taux d'utilisation** ÷ 1,2.

| Coût du cashback par hoodie utilisé | 179 € | 199 € |
|---|---|---|
| INITIUM 5 % | 8,95 € TTC → **7,46 € HT** | 9,95 € TTC → 8,29 € HT |
| MAJESTÉ 10 % | 17,90 € TTC → **14,92 € HT** | 19,90 € TTC → 16,58 € HT |

**Sensibilité (requalification)** : si le Crédit Waves était requalifié en **bon** à titre onéreux ou en **moyen de paiement** (TVA calculée sur le prix plein, voir § 5.2), le coût par crédit utilisé deviendrait le **TTC** : **8,95 €** (INITIUM) et **17,90 €** (MAJESTÉ) par hoodie à 179 € (9,95 € / 19,90 € à 199 €), soit +20 % ; les seuils P* du tableau ci-dessous baisseraient d'autant (÷ 1,2).

Soit, en pourcentage du chiffre d'affaires HT des abonnés : **5 % × taux d'utilisation** (INITIUM) et **10 % × taux d'utilisation** (MAJESTÉ).

**Solde du programme par abonné et par trimestre** (cotisation HT − frais − carte − appli − cashback utilisé), selon les achats de produits TTC du trimestre et le taux d'utilisation des crédits :

*Central*
| Achats TTC / trimestre | INITIUM u = 50 % | 70 % | 100 % | MAJESTÉ u = 50 % | 70 % | 100 % |
|---|---|---|---|---|---|---|
| 0 € | 9,28 | 9,28 | 9,28 | 31,37 | 31,37 | 31,37 |
| 179 € (1 hoodie) | 5,55 | 4,05 | 1,82 | 23,91 | 20,93 | 16,45 |
| 358 € (2 hoodies) | 1,82 | −1,17 | −5,64 | 16,45 | 10,49 | 1,54 |
| 537 € (3 hoodies) | −1,91 | −6,39 | −13,10 | 9,00 | 0,05 | −13,38 |
| 716 € (4 hoodies) | −5,64 | −11,61 | −20,56 | 1,54 | −10,40 | −28,30 |

*Prudent*
| Achats TTC / trimestre | INITIUM u = 50 % | 70 % | 100 % | MAJESTÉ u = 50 % | 70 % | 100 % |
|---|---|---|---|---|---|---|
| 179 € | 3,84 | 2,34 | 0,11 | 21,88 | 18,89 | 14,42 |
| 358 € | 0,11 | −2,88 | −7,35 | 14,42 | 8,45 | −0,50 |
| 537 € | −3,62 | −8,10 | −14,81 | 6,96 | −1,99 | −15,41 |

**Seuil d'achats trimestriels au-delà duquel le programme, pris isolément, coûte plus qu'il ne rapporte** : P* = (marge avant cashback × 1,2) ÷ (taux × u).

| Seuil P* (TTC / trimestre) | u = 50 % | u = 70 % | u = 100 % |
|---|---|---|---|
| INITIUM central | 445 € | 318 € | **223 €** |
| INITIUM prudent | 363 € | 259 € | **182 €** |
| MAJESTÉ central | 753 € | 538 € | **376 €** |
| MAJESTÉ prudent | 704 € | 503 € | **352 €** |

À u = 100 % et sans frais, on retrouve exactement les seuils de Victoire (259,80 € et 399,90 €) : vu du client comme vu de KYMA, la cotisation « paie » le cashback jusqu'à ce niveau. Les frais de paiement et la carte **abaissent** le seuil côté KYMA (~182–223 € et ~352–376 €) ; un taux d'utilisation inférieur à 100 % le **relève**.

**Mais ce seuil n'est pas le bon critère de décision.** Un abonné qui dépasse P* coûte au programme, mais il **achète** : chaque hoodie rapporte la marge sur coûts variables de KYMA (notée *m*). Le programme est rentable si les achats **supplémentaires** qu'il provoque compensent le cashback versé sur les achats qui auraient eu lieu de toute façon. Contribution d'un hoodie supplémentaire acheté par un abonné (u = 100 %, 179 €) = *m* − 7,46 € (INITIUM) ou *m* − 14,92 € (MAJESTÉ). Exemples illustratifs (*m* fictif, pas la marge réelle de KYMA) :

| *m* illustratif | INITIUM | MAJESTÉ |
|---|---|---|
| 20 € | 12,54 € | **5,08 €** |
| 40 € | 32,54 € | 25,08 € |
| 60 € | 52,54 € | 45,08 € |

Lecture : avec une marge unitaire faible, **le cashback de 10 % absorbe l'essentiel de la marge** de chaque hoodie acheté par un MAJESTÉ. Le calcul avec la marge réelle est dans `finance/private/cercle-waves-prive.md`.

**Repères** : le marché observé par Isabelle se situe à 3–5 % de cashback ; 10 % est au-dessus (Victoire, E8). Le seul programme à crédit plus élevé (Vicci+) convertit **la cotisation elle-même** en crédit, ce qui est un autre modèle.

## 5. TVA

### 5.1 La cotisation
- Prestation de services (accès anticipé, aperçus, carte, droit au cashback) : **TVA 20 %**, exigible **à l'encaissement** (règle des prestations de services). Chaque prélèvement trimestriel est une opération à facturer (facture ou ticket conforme, mention du palier et de la période).
- **Rétractation** : le remboursement (total ou au prorata) réduit la base imposable et la TVA collectée du mois du remboursement.
- **Carte physique** : accessoire de l'abonnement, comprise dans le prix (pas de facturation séparée), TVA 20 % de toute façon.
- **Clients d'autres pays de l'UE** : tant que le total des ventes à distance de biens et des services électroniques à des particuliers d'autres États membres reste **sous 10 000 € par an**, TVA française ; au-delà, TVA du pays du client via le guichet unique (OSS). La qualification de l'abonnement (service fourni par voie électronique ou non) est à confirmer par l'expert-comptable (Victoire O1).
- **Franchise en base** : si KYMA choisit la franchise (voir `finance/statut-comparatif.md`), aucune TVA n'est facturée (« TVA non applicable, art. 293 B du CGI ») et les calculs HT ci-dessus deviennent TTC = HT.

### 5.2 Le Crédit Waves : bon (art. 256 ter CGI) ou réduction de prix ?
| Question | Réponse | Certitude |
|---|---|---|
| Le Crédit Waves est-il un « bon » au sens de l'art. 256 ter du CGI (directive (UE) 2016/1065) ? | **Probablement non.** Un bon suppose d'être **remis à titre onéreux** : le BOFiP précise que les bons **remis gratuitement** par l'émetteur ne relèvent pas de l'art. 256 ter (BOI-TVA-CHAMP-10-10-40-50). Le Crédit Waves n'est pas vendu : il est accordé en fonction d'un achat. | Moyenne : le client paie une cotisation qui donne **droit** au cashback ; l'administration pourrait y voir une contrepartie. À faire trancher par l'expert-comptable. |
| Si c'était un bon : à usage unique ou à usages multiples ? | À **usage unique** si, à l'émission, le lieu de livraison et la TVA due sont connus (tous les produits KYMA à 20 %, livraison en France) ; **à usages multiples** s'il peut servir pour des livraisons dans d'autres États membres (TVA du pays du client via OSS) ou sur des produits à taux différents. Bon à usage unique = TVA due **à l'émission** ; bon à usages multiples = TVA due **à l'utilisation**. | Élevée sur la règle (BOFiP) |
| Traitement retenu (proposition) | **Réduction de prix accordée sur l'achat suivant** : la TVA est calculée sur le prix **effectivement payé** après déduction du crédit (CGI art. 267, II-2° : les rabais, remises et ristournes consentis directement aux clients sont exclus de la base). Aucune TVA à l'octroi du crédit ; aucune TVA sur la part payée en crédit. | Moyenne : pas de doctrine trouvée sur les programmes de fidélité eux-mêmes |
| Alternative | Rabais ultérieur sur l'achat **qui a généré** le crédit (avoir rectificatif). Écarté : le crédit peut ne jamais être utilisé, l'avoir serait prématuré. | — |
| Crédit remboursable en argent ? | **Non** (décision Victoire) : sinon il changerait de nature (moyen de paiement, monnaie électronique). | Élevée |

**Exemple** (proposition à valider) : un abonné MAJESTÉ a 17,90 € de crédit et achète un hoodie à 179 €. Il paie 161,10 € TTC. Base HT = 161,10 ÷ 1,2 = **134,25 €** ; TVA = **26,85 €** (au lieu de 29,83 €). KYMA a bien « payé » 14,92 € HT de cashback.

**⚠️ Point technique (Sacha)** : si le Crédit Waves est créé comme **crédit en magasin ou carte cadeau** dans Shopify, Shopify le traite comme un **moyen de paiement** et calcule la TVA sur 179 € : la déclaration de TVA tirée des rapports Shopify serait alors **trop élevée**, ou le traitement « réduction de prix » contredit par les pièces. Deux solutions : (a) appliquer le crédit comme **remise** sur la commande (code ou réduction automatique), ou (b) garder le crédit en magasin et corriger la base TVA en comptabilité, avec une procédure écrite validée par l'expert-comptable. À trancher **avant** la première commande d'un abonné.

Note : la cotisation ne doit pas être présentée comme convertible en crédit ; si un jour KYMA vend un « crédit prépayé » (type Vicci+), il deviendrait un **bon à titre onéreux** (art. 256 ter) : autre traitement.

## 6. Comptabilité (plan comptable général, schéma à valider)

| Événement | Écriture (comptes PCG) |
|---|---|
| Encaissement de la cotisation | 512 / 411 au débit ; **706** Prestations de services (HT) et **44571** TVA collectée au crédit. Frais de paiement : 627 (services bancaires). |
| Clôture d'exercice en cours de trimestre | Part de la cotisation non courue → **487** Produits constatés d'avance (prorata des jours restants). |
| Carte et envoi | 606 (fournitures) ou 6236 (imprimés), 6261 (frais postaux). |
| Appli d'abonnement, Shopify | 651 / 6135 (licences, abonnements logiciels) ; facture irlandaise : autoliquidation 4452 / 44566. |
| Octroi d'un Crédit Waves | Pas d'écriture de TVA. Suivi extra-comptable du solde (export de l'appli). |
| Clôture : crédits octroyés non encore utilisés | Provision ou charge à payer = solde des crédits **HT × taux d'utilisation attendu** : par exemple 709 (rabais, remises, ristournes accordés) / **4198** (RRR à accorder et autres avoirs à établir), ou provision pour risques (6815 / 151). Fiscalement, la déduction d'une provision pour bons de réduction d'un programme de fidélité a été admise par un avis du Conseil d'État de 2009 (source secondaire) : à confirmer. |
| Utilisation d'un crédit | Vente enregistrée au prix payé (ou prix plein + **709** pour la remise) ; reprise de la provision ou de la charge à payer correspondante. |
| Expiration d'un crédit (12 mois proposés) | Reprise de la provision : produit. |
| Rétractation de l'abonnement | 706 et 44571 au débit pour la part remboursée ; frais de paiement non remboursés (perte). |

**Coût d'une rétractation pour KYMA** : MAJESTÉ au 4e jour = 1,47 € HT conservés − 0,85 € de frais − 3,22 € de carte = **−2,60 €** ; INITIUM = 0,48 − 0,44 − 3,22 = **−3,18 €** (central). **Proposition** : envoyer la carte **après** le délai de rétractation (J+15) ; à concilier avec le délai d'envoi annoncé (Victoire propose « au plus tard 14 jours » : passer à « 21 jours » ?).

## 7. Points à décider (fondateur)
1. **Taux MAJESTÉ** : garder 10 % (au-dessus du marché, 3–5 %) ou passer à 7–8 % ; ou plafonner le cashback par trimestre (à écrire à l'art. 7.1 des conditions et sous la carte).
2. **Assiette** : cashback sur le prix payé **hors** part réglée en Crédit Waves (sinon le crédit génère du crédit) ; à écrire noir sur blanc.
3. **Validité** : 12 mois (proposition Victoire) : favorable aux comptes (expiration = reprise de provision) tout en limitant le risque de clause abusive.
4. **Outil** : remise plutôt que crédit en magasin (TVA, § 5.2).
5. **Carte** : envoi après le délai de rétractation.

## 8. Points de vigilance
- 🔴 **TVA du Crédit Waves** : traitement « réduction de prix » à faire valider par l'expert-comptable **avant** la première souscription ; vérifier le comportement de Shopify (crédit en magasin = moyen de paiement).
- 🟠 **Cashback 10 %** : le programme est perdant par abonné MAJESTÉ dès ~350–540 € d'achats par trimestre selon le taux d'utilisation ; il n'est rentable que s'il provoque des achats supplémentaires.
- 🟠 **OSS** : surveiller le seuil de 10 000 € de ventes à des particuliers d'autres États membres.
- 🟠 **Provision de clôture** : suivre le solde des crédits non utilisés (export mensuel de l'appli).
- 🟢 Indicateurs à suivre chaque mois : nombre d'abonnés par palier, taux de résiliation, achats moyens par abonné, taux d'utilisation des crédits, crédits expirés.

## Sources (consultées le 09–10/10/2026 ; accès direct à bofip.impots.gouv.fr et legifrance.gouv.fr bloqué depuis l'environnement : extraits de recherche)
- BOFiP **BOI-TVA-CHAMP-10-10-40-50** (bons, art. 256 ter CGI : définition, usage unique / multiples, bons remis gratuitement hors champ) ; legifiscal.fr, « Les bons : les règles de TVA ».
- BOFiP **BOI-TVA-BASE-10-20-10** (base d'imposition, bons de réduction) ; CGI art. 267, II-2° (rabais, remises, ristournes) ; directive (UE) 2016/1065.
- Exigibilité des prestations de services à l'encaissement : CGI art. 269, 2-c (à relire).
- Provision pour programmes de fidélité : avis du Conseil d'État, 2009, rapporté par fiscalonline.com (source secondaire).
- Shopify Payments, Appstle, Seal, Recharge, Bold : `shopify/contenu/recherche-abonnement-fidelite.md` et `finance/couts-reels-recherche.md` (Isabelle).
- La Poste, tarif lettre verte 2026 (1,52 € pour 20 g) ; hellopro.fr, « Combien coûte une carte de fidélité ».
- Cadre juridique (rétractation, reconduction, cashback) : `shopify/conformite.md`, sections « Cercle Waves » et « Entraide 09/10/2026 » (Victoire).
