# Statut de KYMA — comparatif fiscal et social (SASU, EURL, micro-entreprise)

> **Auteur** : Abdou (comptable et conseiller financier KYMA) · **Date** : 10/10/2026 · **Binôme** : Victoire, angle juridique dans `shopify/conformite.md`, section « Statut juridique — comparatif (avec Abdou), 09/10/2026 ».
> **Fichier versionné (dépôt public)** : aucune donnée confidentielle. Les simulations utilisent des **bénéfices illustratifs** (15 000 € et 40 000 €), pas les chiffres du business plan.
> **Rappel unique** : je ne suis pas expert-comptable inscrit à l'Ordre ; le choix du statut et de la rémunération doit être validé par un expert-comptable diplômé (et par un avocat pour les statuts).
> **Sources** : sites officiels (impots.gouv.fr, urssaf.fr, legifrance.gouv.fr) inaccessibles depuis l'environnement ; chiffres tirés d'extraits de recherche (cabinets, presse spécialisée) du 09–10/10/2026, à vérifier sur les sites officiels. Calculs en Python, arrondis à l'euro.

## 1. Réponse courte

**Je rejoins Victoire : SASU**, avec deux précisions chiffrées :
1. **Au démarrage, ne pas se rémunérer** : en SASU, aucune cotisation sociale n'est due sans rémunération (contrairement au gérant d'EURL, qui paie des cotisations minimales même à zéro). C'est le meilleur statut pour une phase où la trésorerie doit financer la production.
2. **Quand KYMA dégagera des bénéfices**, l'EURL (gérant non salarié) coûte **moins cher en charges sociales** sur une rémunération (environ 45 % du net contre environ 80 % en SASU). L'écart est réel (≈ 10 points de bénéfice) mais ne compense pas, selon moi, les arguments de Victoire (levée de fonds, crédibilité, évolutivité) ; en SASU, on peut le réduire en combinant une petite rémunération et des dividendes.

**La micro-entreprise est déconseillée pour des raisons chiffrées aussi** : les cotisations sont calculées sur le **chiffre d'affaires**, pas sur le bénéfice ; si la production et le marketing absorbent plus de ~60 % du CA (seuil de bascule, § 3), elle coûte plus cher que l'EURL, et les précommandes encaissées gonflent le CA soumis à cotisations avant même la production.

**La franchise en base de TVA n'est pas réservée à la micro-entreprise** : une SASU peut en bénéficier sous les seuils. C'est une vraie décision à prendre avec l'expert-comptable (§ 5).

## 2. Tableau comparatif fiscal et social

| Critère | SASU (à l'IS) | EURL (à l'IS sur option ; IR par défaut) | Micro-entreprise (EI au régime micro) |
|---|---|---|---|
| Imposition du bénéfice | **IS** : 15 % jusqu'à 42 500 € de bénéfice (CA < 10 M€, capital entièrement libéré, détenu à 75 % au moins par des personnes physiques), 25 % au-delà | IS sur option (mêmes taux) ; par défaut, bénéfice imposé à l'IR du gérant | IR sur le CA après abattement forfaitaire de **71 %** (ventes de marchandises), ou versement libératoire de **1 %** du CA (sous condition de revenu fiscal de référence) ; aucune charge réelle déductible |
| Statut social du dirigeant | **Assimilé salarié** (régime général, sans assurance chômage) | **Travailleur non salarié (TNS)** | TNS (micro-social) |
| Charges sociales sur la rémunération | ≈ **75–80 % du net** (patronales + salariales ; ex. 1 000 € nets ≈ 1 800 € de coût) | ≈ **45 % du net** (ex. 1 000 € nets ≈ 1 450 € de coût) | **12,3 % du CA** (achat-revente) + formation professionnelle ≈ 0,1 % ; dès le premier euro encaissé |
| Sans rémunération | **0 € de cotisations** (pas de protection sociale non plus) | Cotisations **minimales** dues (montant 2026 à vérifier sur urssaf.fr) | 0 € si 0 € de CA |
| Dividendes | **PFU 31,4 %** en 2026 (12,8 % d'IR + 18,6 % de prélèvements sociaux, hausse de la CSG par la LFSS 2026), **pas de cotisations sociales** | PFU, mais la part qui dépasse **10 % du capital + primes + compte courant** supporte les **cotisations TNS (≈ 45 %)** | Sans objet |
| Protection sociale | Bonne (maladie, retraite de base et complémentaire, prévoyance), pas de chômage | Plus faible pour les mêmes cotisations, retraite moins favorable | Faible, proportionnelle au CA |
| TVA | Assujettie ; franchise en base possible sous les seuils | Idem | Idem (franchise par défaut sous les seuils) |
| Plafond de CA | Aucun | Aucun | **203 100 €** de ventes (seuils 2026–2028 ; une source cite encore 188 700 € : à vérifier) |
| Déficit et stocks | Déficit reportable sur les bénéfices futurs ; stocks et charges réelles déduits | Idem | Aucun déficit possible ; stock et coûts de production non déductibles |
| ACRE | Exonération partielle la 1re année ; **réduite depuis le 01/07/2026** (décret n° 2026-69 du 06/02/2026 : 25 % au lieu de 50 % pour les micro-entrepreneurs) : portée exacte pour un président de SASU ou un gérant d'EURL **à vérifier** | Idem | Taux minoré 75 % de 12,3 % ≈ 9,2 % pendant 4 trimestres ; délai de demande **à vérifier** (Isabelle) |
| Coût de création | ≈ **250 €** (annonce légale 141–199 € HT, greffe 33,83 €, bénéficiaires effectifs 19,33–21,41 €) + statuts (0 € soi-même, ≈ 79 € HT plateforme, 1 000–2 000 € avocat) | ≈ **177 € HT** + statuts | **≈ 0–24 €** |
| Coût de tenue | Comptabilité d'engagement, bilan et liasse fiscale, approbation et dépôt des comptes, TVA (CA3) : expert-comptable **[À COMPLÉTER : devis]** | Idem | Livre des recettes, registre des achats ; déclaration mensuelle ou trimestrielle du CA |
| CFE | Exonérée l'année de création ; ensuite cotisation minimale selon la commune et le CA (à vérifier) | Idem | Idem |
| Passage en société plus tard | — | Transformation EURL → SAS : coût estimé 500–2 000 € (guide secondaire cité par Victoire) | Transfert du fonds, des contrats (précommandes, abonnements), de la marque, du compte Shopify et des stocks |

## 3. Simulation : combien le fondateur garde-t-il ? (bénéfices illustratifs)

Hypothèses : R = bénéfice avant rémunération du dirigeant et avant impôt ; capital de 1 000 € sans compte courant ; charges SASU ≈ 80 % du net (hypothèse haute de la fourchette), TNS ≈ 45 % du net ; IR sur les rémunérations au taux marginal de **11 %** (hypothèse : fondateur seul, sans autres revenus ; à adapter) ; micro : coûts = 65 % du CA (hypothèse illustrative).

| Option | R = 15 000 € : net avant IR | Net après IR | % de R | R = 40 000 € : net avant IR | Net après IR | % de R |
|---|---|---|---|---|---|---|
| SASU, 100 % rémunération | 8 333 € | 7 508 € | 50 % | 22 222 € | 20 022 € | 50 % |
| SASU, 100 % dividendes (après IS 15 %) | 8 746 € | 8 746 € | 58 % | 23 324 € | 23 324 € | 58 % |
| EURL à l'IS, 100 % rémunération | 10 345 € | 9 207 € | 61 % | 27 586 € | 24 552 € | 61 % |
| EURL à l'IS, 100 % dividendes | 5 407 € | 5 407 € | 36 % | 14 374 € | 14 374 € | 36 % |
| Micro (CA = R ÷ 0,35) | 9 686 € | 8 319 € | 55 % | 25 829 € | 22 183 € | 55 % |
| Micro + versement libératoire 1 % | 9 257 € | 9 257 € | 62 % | 24 686 € | 24 686 € | 62 % |

**Formule de la ligne « EURL à l'IS, 100 % dividendes »** (vérifiée) : dividende distribuable D = R − IS(R) ; part exonérée de cotisations E = 10 % × (capital + primes d'émission + solde moyen du compte courant d'associé) = 10 % × 1 000 € = 100 € ; net = E × (1 − 31,4 %) [PFU] + (D − E) × (1 − 45 % − 12,8 %) [cotisations TNS ≈ 45 % du dividende brut, ordre de grandeur Keobiz : 2 205 € sur 4 900 € ; puis IR forfaitaire de 12,8 %, la part soumise aux cotisations TNS n'étant pas soumise aux prélèvements sociaux de 18,6 %].
- R = 15 000 € : IS = 2 250 € ; D = 12 750 € ; 100 × 0,686 = 68,60 € ; 12 650 × 0,422 = 5 338,30 € ; **net = 5 406,90 € ≈ 5 407 €**.
- R = 40 000 € : IS = 6 000 € ; D = 34 000 € ; 68,60 € + 33 900 × 0,422 = 14 305,80 € ; **net = 14 374,40 € ≈ 14 374 €**.
- Approximation : en réalité, les cotisations TNS sur dividendes sont calculées par l'Urssaf sur l'assiette sociale (avec régularisation l'année suivante, CSG en partie déductible) ; l'écart de quelques points ne change pas la conclusion (à éviter).

Lecture :
- **EURL (rémunération)** : la plus économique pour sortir de l'argent, ~10 points devant la SASU.
- **SASU (dividendes)** : bon rendement **mais aucune protection sociale** (ni retraite, ni indemnités journalières) ; la pratique courante est un **mixte** : petite rémunération pour valider des droits, le reste en dividendes, à calibrer avec l'expert-comptable.
- **EURL (dividendes)** : à éviter (cotisations TNS sur la part au-delà de 10 % du capital).
- **Micro** : bon chiffre **seulement** parce que l'hypothèse de coûts (65 %) est modérée ; la micro coûte plus cher que l'EURL dès que les coûts dépassent **~60 % du CA** (cotisations micro = 12,4 % ÷ (1 − taux de coûts) du bénéfice, contre ~31 % du bénéfice pour un TNS : 24,8 % du bénéfice à 50 % de coûts, 35,4 % à 65 %, 49,6 % à 75 %). Et la micro ne permet ni de déduire un déficit de lancement, ni de lisser l'année des précommandes (CA encaissé, production non déductible).
- À R = 40 000 €, la micro dépasse déjà le seuil de franchise de TVA (CA ≈ 114 000 €).

## 4. Points propres au modèle de KYMA
1. **Précommandes** : encaissées d'avance, elles sont des **avances clients** en société (pas de produit avant la livraison, donc pas d'IS sur de l'argent qui finance la production) ; en micro, elles sont du **CA encaissé** soumis immédiatement à 12,3 % de cotisations.
2. **TVA sur les précommandes** : exigible **à l'encaissement de l'acompte** pour une livraison de biens depuis le 01/01/2023 (CGI art. 269, 2-a) si la société est assujettie.
3. **Année 1 possiblement déficitaire** (prototypes, 3D, marque, site) : en société à l'IS, le déficit est reportable sur les bénéfices des drops suivants ; en micro, il est perdu.
4. **Cercle Waves** : la cotisation est une prestation de services (en micro, CA « services » soumis à un taux différent de 12,3 % : à vérifier ; le plafond services est plus bas, 83 600 €).
5. **Levée de fonds / love money** : en SASU, un apport au capital ou en compte courant d'associé ; le compte courant peut être remboursé sans fiscalité.

## 5. Franchise en base de TVA : à décider même en SASU

| Point | Règle / effet | Source / certitude |
|---|---|---|
| Seuils 2026 | **85 000 €** de ventes (seuil majoré **93 500 €**) ; 37 500 € / 41 250 € pour les services. La baisse à 25 000 € (LF 2025) a été suspendue puis abandonnée ; le PLF 2026 n'a pas modifié les seuils | Sources secondaires concordantes ; à vérifier sur impots.gouv.fr |
| Qui | Toute entreprise sous les seuils, **société comprise** | Élevée |
| Effet sur le prix | Aucune TVA facturée (« TVA non applicable, art. 293 B du CGI ») : à 179 € affichés, KYMA garde **179 €** au lieu de 149,17 € HT, soit **+29,83 € par hoodie** | Calcul |
| Contrepartie | Aucune TVA récupérable sur les achats. Gain net par pièce ≈ 29,83 € − 20 % × achats HT soumis à TVA par pièce (ex. 50 € d'achats → +19,83 € ; 100 € → +9,83 €) | Calcul illustratif |
| Achats au Portugal | Une entreprise en franchise qui dépasse **10 000 €** d'acquisitions intracommunautaires par an doit **autoliquider la TVA française** sans pouvoir la déduire ; en dessous, le fournisseur facture la **TVA portugaise (23 %)** | Règle du régime dérogatoire (« PBRD ») : à confirmer par l'expert-comptable |
| Sortie du régime | Dépassement du seuil majoré = TVA due **dès le jour du dépassement** : à prix affiché inchangé, la marge baisse de 16,7 % du prix d'un coup | À anticiper dans les prix |
| Ventes à l'étranger UE | La franchise française ne couvre pas les ventes à distance au-delà de **10 000 €** par an vers d'autres États membres (TVA du pays du client, OSS) | Élevée |
| Image | Mention « TVA non applicable » sur un produit à 179 € : neutre pour le client particulier | — |

**Règle par défaut** (à confirmer par l'expert-comptable) : **franchise en base en année 1 si le CA prévisionnel reste sous les seuils** (ventes de biens : 85 000 € ; services, dont les cotisations Cercle Waves : 37 500 € ; en activité mixte, les deux limites s'appliquent) ; **réévaluer dès que le CA atteint 70 % d'un seuil** ; passer à la TVA par option si les achats au Portugal dépassent 10 000 € par an (TVA autoliquidée non déductible) ou si le gain par pièce devient faible (achats HT élevés). Simuler les deux régimes avec le devis usine avant l'immatriculation. Si KYMA vise plus de 85 000 € de ventes dès la 2e année, la franchise ne sert qu'à l'année de lancement et complique le passage.

## 6. Recommandation chiffrée (à confirmer par l'expert-comptable)
1. **SASU à l'IS** (accord avec Victoire), **président non rémunéré** pendant la phase de lancement ; rémunération mixte (salaire modeste + dividendes) dès que les bénéfices le permettent.
2. **Capital** : quelques milliers d’euros (assez pour être crédible auprès d’un fabricant, sans immobiliser toute la trésorerie), **le reste de l'apport en compte courant d'associé** (remboursable sans impôt). Capital **entièrement libéré** pour garder le taux d'IS de 15 %.
3. **Franchise en base de TVA** : par défaut en année 1 si le CA prévisionnel reste sous les seuils (ventes 85 000 €, services 37 500 €), réévaluation dès 70 % d'un seuil ; décision finale avec le devis usine (§ 5).
4. **ACRE** : vérifier l'éligibilité et la demander dans les délais.
5. **Expert-comptable** : devis avant immatriculation (tenue, bilan, TVA, paie du président le cas échéant).

## 7. Décisions à prendre (fondateur)
1. SASU (recommandée) ou EURL.
2. Rémunération : zéro au lancement, puis mixte.
3. Montant du capital et du compte courant.
4. Franchise en base de TVA ou assujettissement dès la création.
5. Choix de l'expert-comptable (devis).

## 8. Points de vigilance
- 🔴 **Ne rien encaisser avant l'immatriculation** (Victoire ST1, ST3).
- 🟠 **Capital non entièrement libéré** = perte du taux d'IS de 15 %.
- 🟠 **SASU sans rémunération** = aucune protection sociale (maladie, retraite) : vérifier la couverture personnelle du fondateur.
- 🟠 **Franchise de TVA** : surveiller le CA au fil de l'année (seuil majoré de 93 500 €) et les acquisitions au Portugal (10 000 €).
- 🟠 **PFU 31,4 %, seuils micro 203 100 €, ACRE** : chiffres 2026 issus de sources secondaires, à confirmer sur les sites officiels.
- 🟢 Recalculer le comparatif chaque année avec les chiffres réels.

## Sources (extraits de recherche, 09–10/10/2026)
- IS 15 % / 25 % et conditions : propulsebyca.fr, legalstart.fr, hayot-expertise.fr (« IS 2026 ») ; amendement PLF 2026 relevant le seuil à 100 000 € **non retenu** selon les sources les plus récentes (legifiscal.fr).
- PFU 31,4 % en 2026 (LFSS 2026, art. 12, loi n° 2025-1403) : auguste-patrimoine.fr, meilleurtaux.com, guichetdusavoir.org.
- Charges SASU / TNS : hayot-expertise.fr (« SASU vs EURL », « Charges sociales SASU 2026 »), legalstart.fr, lefreelance.fr.
- Dividendes d'EURL au-delà de 10 % : keobiz.fr, hayot-expertise.fr (« Cotisations TNS 2026 »), lscompta.fr.
- Micro-entreprise : taux 12,3 % (lecoindesentrepreneurs.fr, finactuel.fr) ; plafonds 2026–2028 de 203 100 € / 83 600 € (cci-paris-idf.fr, propulsebyca.fr) ; ACRE réduite au 01/07/2026, décret n° 2026-69 (legifiscal.fr, centre-inffo.fr).
- Franchise en base : sparkreceipt.com, superindep.fr, legifiscal.fr (PLF 2026).
- Coûts de création : `finance/couts-reels-recherche.md` (Isabelle) ; keobiz.fr, lecoindesentrepreneurs.fr, swim.legal.
- TVA sur acomptes : CGI art. 269, 2-a ; BOI-TVA-BASE-20-10 ; Eurex (08/12/2022).
- Angle juridique : `shopify/conformite.md`, section « Statut juridique — comparatif (avec Abdou), 09/10/2026 » (Victoire).
