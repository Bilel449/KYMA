# KYMA — Copy du site Shopify (v2, Maya — corrections Arthur cycle 1/2 appliquées)

Statut : BROUILLON PUBLIABLE sous réserve des balises. Relecture attendue : Arthur (QA), Victoire (juridique).
Source : `brand/BRAND.md` (tech pack v3 retenu). Ton : calme, confiant, élégant, « KYMA ne crie jamais ». Aucune exclamation, aucune urgence artificielle, aucun faux compteur de stock.

## Légende des balises
- `[À COMPLÉTER : …]` : information manquante à fournir avant mise en ligne.
- `[À VALIDER : …]` : proposition à valider par le fondateur ou Victoire.
- `[SI CERTIFIÉ : …]` / `[SI CONFIRMÉ : …]` : texte à n'activer qu'avec la preuve en main. Sans preuve, utiliser le texte de repli indiqué.
- `[SI PRÉSÉRIE VALIDÉE : …]` : affirmation d'unicité de chaque pièce, à n'activer qu'une fois les préséries validées. Texte de repli par défaut : « Pensé pour que chaque pièce soit unique. »
- Dans les titres, `*mot*` = mot en DM Serif Display italique, lilas foncé `#9B7A9B`.
- Les labels sont écrits en capitales ici ; l'interlettrage (2,5 à 5 px) se règle en CSS.

## Points d'attention transmis à Clémentine / Arthur
1. **Coloris** : le copy suit le tech pack v3, soit 5 coloris (Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow). La mémoire projet en cite 6 (dont Midnight Current, Amber Flow, Mint Surge). Point d'arbitrage n°1 du fondateur : si la liste change, seuls les blocs 3.01 et les captions Instagram sont à ajuster.
2. **Fournisseur** : aucun nom cité (consultation non signée).
3. **Date d'expédition** : la durée indicative (~18 semaines) n'est volontairement pas écrite. Seule la date « Expédition au plus tard le [À COMPLÉTER : date] », une fois validée, s'affiche.
4. **Prix** : non codé en dur dans le copy. Le prix vient de la fiche produit Shopify (179 € TTC retenu, 199 € à l'étude).
5. **Unicité de chaque pièce** : issue du tech pack (motif non répété, découpe dans une zone différente du rouleau). Toute affirmation d'unicité est encadrée par `[SI PRÉSÉRIE VALIDÉE : …]` avec un repli : « Pensé pour que chaque pièce soit unique. »
6. **Visuels** : rendus actuels = maquettes. Le copy ne promet pas de photos du produit fabriqué.
7. **Aucune allégation environnementale générique** dans ce document. « Petites séries » est employé comme fait de production, sans bénéfice environnemental affirmé.

---

## 1. Hero d'accueil

### Proposition A — Le courant
- **Label** : DROP 1 — PRÉCOMMANDE OUVERTE
- **Titre** : Chaque pièce suit son *courant*.
- **Sous-titre** : Un hoodie zippé oversize, imprimé d'un motif de vagues fluide. Cinq coloris, une seule pièce. [SI PRÉSÉRIE VALIDÉE : Le motif ne se répète jamais.]
- **CTA** : Découvrir le Drop 1

### Proposition B — Le mouvement
- **Label** : KYMA PARIS — L'ART DU FLOW
- **Titre** : Le mouvement, *porté*.
- **Sous-titre** : Streetwear unisexe né de la vague. Un premier hoodie, un motif fluide, une coupe qui laisse l'air passer.
- **CTA** : Découvrir la pièce

### Proposition C — L'unicité
- **Label** : DROP 1 — PRÉCOMMANDE
- **Version conditionnelle** `[SI PRÉSÉRIE VALIDÉE]` :
  - **Titre** : Une pièce. Aucune *identique*.
  - **Sous-titre** : Le motif KYMA Wave ne se répète jamais : chaque hoodie est découpé dans une zone différente du tissu imprimé.
- **Version de repli (par défaut tant que les préséries ne sont pas validées)** :
  - **Titre** : Une pièce, pensée pour être *unique*.
  - **Sous-titre** : Pensé pour que chaque pièce soit unique. Le motif KYMA Wave est un marbré fluide, tonal, qui ne cherche jamais à se répéter.
- **CTA** (identique dans les deux versions) : Choisir mon coloris

### Recommandation : C, en version de repli jusqu'à validation des préséries
- Elle porte l'idée la plus propre à KYMA (le motif qui ne cherche pas à se répéter), donc reconnaissable sans logo, comme le veut la charte.
- Le titre est court, sans effet de manche, avec un seul mot en italique.
- Le label annonce honnêtement qu'il s'agit d'une précommande.
- Le CTA est concret et mène droit au choix du coloris.
- Bascule vers la version conditionnelle (« Aucune identique ») uniquement après validation des préséries. En cas de doute, A est le repli sûr.

---

## 2. Bandeau d'annonce (barre du haut)

1. **Précommande Drop 1** : Drop 1 — précommande ouverte. Expédition au plus tard le [À COMPLÉTER : date].
2. **Livraison** : Livraison en France. [À COMPLÉTER : délai et tarif de livraison, ou franco éventuel].
3. **Cercle Waves** : Cercle Waves — inscrivez-vous pour suivre le courant de près.

Recommandation : la variante 1 au lancement (elle porte l'information essentielle), puis rotation douce avec 2 et 3.

---

## 3. Sections de l'accueil

### Ordre recommandé
Hero → 01 Le Drop 1 → 02 Le motif → 03 La pièce → 04 Le savoir-faire → 05 Cercle Waves → 06 Instagram.

Logique : on montre d'abord ce que l'on vend (coloris), puis ce qui le rend singulier (motif), puis la pièce et sa fabrication pour rassurer, et enfin la communauté. L'achat reste accessible à chaque étape par le CTA de la section.

### 01 — Le Drop 1
- **Label** : 01 — LE DROP 1
- **Titre** : Cinq coloris, un même *flux*.
- **Texte** : Lilac Whirl, Ivory Tide, Silver Drift, Noir Absolu, Crimson Flow. Cinq nuances du même mouvement, en petite série.
- **Lien** : Voir les coloris

### 02 — Le motif
- **Label** : 02 — LE MOTIF
- **Titre** : [SI PRÉSÉRIE VALIDÉE : Un motif qui ne se répète *jamais*.] Repli : Un motif qui suit son *flux*.
- **Texte** : Le KYMA Wave est un marbré fluide, volutes et tourbillons, toujours tonal. Il capte le rythme des vagues sans chercher à les copier.
- **Lien** : Découvrir le motif

### 03 — La pièce
- **Label** : 03 — LA PIÈCE
- **Titre** : [SI PRÉSÉRIE VALIDÉE : Chaque hoodie est *unique*.] Repli : Une pièce, un *seul* geste.
- **Texte** : Le motif est imprimé sur tout le tissu. [SI PRÉSÉRIE VALIDÉE : Chaque pièce est découpée dans une zone différente du rouleau : votre hoodie ne ressemble qu'à lui-même.] Repli : Pensé pour que chaque pièce soit unique.
- **Lien** : Découvrir la pièce

### 04 — Le savoir-faire
- **Label** : 04 — LE SAVOIR-FAIRE
- **Titre** : Une matière dense, une coupe *libre*.
- **Texte** : French terry épais à l'intérieur gratté, épaules tombantes, zip intégral en métal brossé, capuche double épaisseur sans cordon. [SI CERTIFIÉ GOTS : Coton biologique certifié GOTS.] [SI CONFIRMÉ : Confectionné au Portugal.] Repli sans preuve : omettre ces deux phrases.
- **Lien** : Lire le détail de la pièce
- Note : grammage à n'afficher qu'une fois confirmé : [À COMPLÉTER : grammage définitif].

### 05 — Cercle Waves
- **Label** : 05 — CERCLE WAVES
- **Titre** : Rejoindre le *cercle*.
- **Texte** : Cercle Waves réunit celles et ceux qui suivent KYMA de près. Deux paliers, INITIUM et MAJESTÉ.
- **Lien** : Entrer dans le Cercle

### 06 — Instagram
- **Label** : 06 — INSTAGRAM
- **Titre** : Dans le *sillage*.
- **Texte** : Coulisses, textures et premiers regards, sur @kymasinsta.
- **Lien** : Suivre @kymasinsta

---

## 4. Précommande

### 4.1 Fiche produit — bloc sous le bouton
**Titre du bloc** : Précommande, en toute transparence

> La fabrication démarre après la clôture de la précommande. Votre paiement est enregistré à la commande.
>
> **Expédition au plus tard le [À COMPLÉTER : date].**
> Si cette échéance devait être affectée, nous vous écrivons sans attendre.
>
> Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Voir les [CGV] et la page [Retours]. [À COMPLÉTER : liens vers les pages CGV et Retours]
>
> Livraison en France. [À COMPLÉTER : délais et frais de livraison.]
> Guide des tailles : XS à XXL, coupe oversize.

Note : l'engagement « nous vous écrivons sans attendre » doit être confirmé par le fondateur, sinon le remplacer par « nous vous informons par e-mail ».

### 4.2 Bouton produit
- **Libellé** : Précommander
- **Sous-libellé optionnel** (sous le bouton, gris pierre) : Expédition au plus tard le [À COMPLÉTER : date]

### 4.3 Page panier
- **Titre** : Votre panier
- **Bandeau de rappel** (affiché si le panier contient une précommande) : Votre panier contient une précommande. Expédition au plus tard le [À COMPLÉTER : date]. Le paiement est enregistré à la commande.
- **Case à cocher avant paiement** : J'ai compris que cet article est une précommande, expédiée au plus tard le [À COMPLÉTER : date], et que le motif de ma pièce est unique et différera des visuels.
- **Bouton** : Passer au paiement
- **Lien secondaire** : Continuer à explorer

### 4.4 E-mail de confirmation de précommande
**Objet** : Votre précommande KYMA est enregistrée

**Corps** :

> Bonjour {{ customer.first_name }},
>
> Merci. Votre précommande {{ order_name }} est bien enregistrée.
>
> {{ line_items récapitulatif : produit, coloris, taille, quantité }}
>
> Ce que cela signifie : la fabrication de votre hoodie démarre après la clôture de la précommande. Expédition au plus tard le [À COMPLÉTER : date]. Si cette échéance devait être affectée, vous en serez informé(e) par e-mail sans attendre.
>
> [SI PRÉSÉRIE VALIDÉE : Votre pièce est découpée dans une zone qui n'appartient qu'à elle.] Repli : Pensé pour que chaque pièce soit unique. Elle arrivera accompagnée d'une carte portant son numéro dans la collection. [À CONFIRMER : packaging définitif]
>
> Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. Voir les [CGV] et la page [Retours]. [À COMPLÉTER : liens vers les pages CGV et Retours]
>
> Une question : [À COMPLÉTER : adresse e-mail de contact].
>
> Dans le sillage,
> KYMA Paris

---

## 5. Popup / bloc newsletter

- **Label** : CERCLE WAVES
- **Titre** : Suivre le *courant*.
- **Texte** : Recevez les nouvelles de KYMA : ouverture des drops, coulisses, premiers regards. Une lettre rare, jamais pressante.
- **Avantage possible** : [À VALIDER : accès anticipé aux prochaines ouvertures pour les inscrits] (aucune remise proposée).
- **Champ** : Votre adresse e-mail
- **Bouton** : Rejoindre le courant
- **Mention de consentement** (Victoire validera) : En vous inscrivant, vous acceptez de recevoir les e-mails de KYMA. Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque message. Voir notre politique de confidentialité. [À VALIDER VICTOIRE : formulation RGPD, case à cocher non pré-cochée, identité du responsable de traitement.]
- **Message de remerciement** : Merci. Vous faites désormais partie du sillage. Un e-mail de confirmation vous attend.
- **Message d'erreur** : Cette adresse semble incomplète. Pouvez-vous la vérifier ?
- **Bouton de fermeture** : Plus tard (affichage du popup : [À VALIDER : déclenchement discret, pas à l'arrivée sur la page])

---

## 6. Page Cercle Waves

**Label** : CERCLE WAVES
**Titre** : Rejoindre le *cercle*.
**Introduction** : Cercle Waves est le programme de fidélité de KYMA. Il accompagne celles et ceux qui suivent la marque, du premier pas jusqu'à la proximité. Deux paliers, qui se découvrent dans l'ordre.

### Palier 1 — INITIUM
- **Label** : 01 — INITIUM
- **Texte** : L'entrée dans le cercle. Pour toute personne qui rejoint KYMA.
- **Avantages** :
  - [À VALIDER : nouvelles du drop en avant-première par e-mail]
  - [À VALIDER : accès au contenu coulisses]
  - [À VALIDER : autre avantage d'entrée, à définir par le fondateur]
- **Condition d'accès** : [À VALIDER : inscription gratuite, ou lié à un premier achat]

### Palier 2 — MAJESTÉ
- **Label** : 02 — MAJESTÉ
- **Texte** : Le palier supérieur, pour celles et ceux qui portent KYMA depuis ses origines.
- **Avantages** :
  - [À VALIDER : accès anticipé aux prochaines ouvertures]
  - [À VALIDER : autre avantage de palier supérieur]
- **Condition de passage à MAJESTÉ** : [À VALIDER : critère d'accès, ex. nombre d'achats ou ancienneté. Ne rien chiffrer avant décision du fondateur.]

Note : l'« accès anticipé aux prochaines ouvertures » est désormais l'avantage MAJESTÉ ; si le même avantage est proposé à INITIUM ou aux inscrits newsletter (section 5), le fondateur doit trancher pour que les paliers restent distincts.

### CTA d'inscription
- **Bouton** : Rejoindre le cercle
- **Formulaire** : prénom, e-mail
- **Consentement** : même mention que le bloc newsletter (section 5). [À VALIDER VICTOIRE]
- **Confirmation** : Bienvenue dans le cercle. Votre place est enregistrée.
- **Mentions** : [À VALIDER VICTOIRE : règlement du programme de fidélité / lien vers les conditions]

---

## 7. Micro-copy

### Boutons
| Contexte | Texte |
|---|---|
| Ajouter au panier (article en stock) | Ajouter au panier |
| Précommande | Précommander |
| Taille non sélectionnée | Choisir une taille |
| Taille indisponible (sélecteur) | Taille indisponible |
| Produit épuisé | Épuisé pour le moment |
| Épuisé, avec alerte e-mail | Me prévenir du retour |
| Ajout confirmé | Ajouté au panier |
| Guide des tailles | Guide des tailles |

Aucune mention de stock restant, aucun compte à rebours.

### Page 404
- **Label** : 404
- **Titre** : Cette page s'est *retirée*.
- **Texte** : Comme le ressac, elle ne revient pas toujours au même endroit. Retrouvez le courant depuis l'accueil.
- **Bouton** : Retourner à l'accueil

### Panier vide
- **Titre** : Votre panier est *calme*.
- **Texte** : Rien ne s'y trouve encore. Le Drop 1 vous attend.
- **Bouton** : Découvrir le Drop 1

### Footer
- **Signature de marque (une ligne)** : KYMA Paris — L'art du flow.
- **Ligne de droits** : © KYMA [À COMPLÉTER : année et raison sociale]
- **Navigation** (suggestion) : La pièce · Le motif · Cercle Waves · Contact · Livraison · Précommande · Retours · CGV · Mentions légales · Confidentialité

---

## 8. Instagram — 3 captions d'ouverture du site (bonus)

Rappel : hashtags 3 à 6 maximum. Lien en bio vers le site (domaine : [À COMPLÉTER : nom de domaine définitif]).

### Caption 1 — Sobre
Le site s'ouvre, comme une marée qui monte.
Le Drop 1 est en précommande : un hoodie, cinq coloris, [SI PRÉSÉRIE VALIDÉE : un motif qui ne se répète jamais.] Repli : un motif fluide, pensé pour que chaque pièce soit unique.
Plongez. Lien en bio.

- **Alt-text (3 options)** :
  1. Hoodie zippé oversize KYMA au motif marbré lilas sur fond beige, lumière douce.
  2. Détail du motif KYMA Wave, volutes lilas tonales sur tissu poudré.
  3. Page d'accueil du site KYMA : titre du hero retenu (section 1) sur fond beige.
- **Hashtags** : #kyma #lartduflow #cerclewaves #streetwearunisexe #parisstreetwear
- **CTA** : Plongez.

### Caption 2 — Le motif
Aucune vague n'est identique à la précédente.
[SI PRÉSÉRIE VALIDÉE : Chaque hoodie du Drop 1 est découpé dans une zone différente du tissu imprimé.] Repli : Pensé pour que chaque pièce soit unique. Le site est ouvert, la précommande aussi.
Le sillage s'élargit.

- **Alt-text (3 options)** :
  1. Gros plan sur un tissu marbré lilas et crème, volutes fluides.
  2. Panneaux de tissu imprimés du motif KYMA Wave côte à côte. [SI PRÉSÉRIE VALIDÉE : chacun différent.]
  3. Main posée sur la manche d'un hoodie KYMA, motif marbré en lumière naturelle.
- **Hashtags** : #kyma #lartduflow #streetwearunisexe #parisstreetwear #cerclewaves
- **CTA** : Le sillage s'élargit.

### Caption 3 — Le cercle
Une nouvelle adresse pour KYMA, et une porte ouverte sur Cercle Waves.
Inscrivez-vous pour suivre le courant de près : coulisses, ouvertures, premiers regards.
Rejoignez le courant.

- **Alt-text (3 options)** :
  1. Visuel beige portant le mot « Cercle Waves » en lettres espacées, trois vagues lilas dégressives.
  2. Hoodie KYMA Lilac Whirl porté en extérieur à Paris, lumière diffuse. [À CONFIRMER : visuel final]
  3. Écran de téléphone affichant la page Cercle Waves du site KYMA.
- **Hashtags** : #kyma #cerclewaves #lartduflow #parisstreetwear
- **CTA** : Rejoignez le courant.

---

## Récapitulatif des balises ouvertes
- Fondateur : date « Expédition au plus tard le [date] », frais et délais de livraison, nom de domaine, e-mail de contact, avantages et conditions des paliers INITIUM / MAJESTÉ, grammage définitif, raison sociale, liste finale des coloris (5 ou 6), validation des préséries (bascule des textes `[SI PRÉSÉRIE VALIDÉE]`), liens vers les pages CGV et Retours.
- Victoire : cohérence des CGV et de la page Retours avec la phrase « Vous pouvez annuler votre précommande à tout moment avant l'expédition, et jusqu'à 14 jours après réception. » (cas d'une série non lancée non couvert par cette phrase), mention RGPD, règlement du programme de fidélité, formulation de la case de confirmation précommande (texte imposé par Arthur), preuves GOTS et « Made in Portugal » avant d'activer les phrases balisées.
