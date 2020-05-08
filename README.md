# PLD SMART - Pot d'Yaourt

### Présentation du Sujet
Actuellement, à chaque achat, un ticket de caisse papier est imprimé et souvent perdu dans la journée. Comment garder une preuve de son achat et une trace des produits achetés sans consommer du papier ?

D’autre part, la gestion de son garde-manger prend souvent du temps au quotidien : Que me reste-t-il dans mon placard ? Quels sont les produits que je devrai acheter la prochaine fois ? Quelle recette puis-je préparer à partir des aliments qu’il me reste à consommer ?

L’application mobile que nous avons imaginée est l’union de ces deux problématiques, proposant à la fois une centralisation des tickets de caisse et une gestion du garde-manger.

### Mise en situation
A partir de cette application, les consommateurs (donc tout citoyen de plus de 15 ans environ) disposent de l’ensemble de leurs tickets de caisse centralisés en un même endroit. Lors du passage en caisse, le caissier scanne les articles et au lieu d’imprimer le ticket, le client fournit un identifiant (via un QR code par exemple) et le ticket est directement enregistré dans le portefeuille client.

Une fois les courses faites et le ticket enregistré, l’application fait un inventaire des produits achetés et peut proposer des recettes en relation. Le garde-manger virtuel peut être mis à jour en fonction des produits consommés, des recettes réalisées ou d’éventuels produits achetés sans utilisation de l’application. Quand celui-ci est vide, une liste de course intelligente est générée, établie selon les habitudes, les besoins et les envies de recettes du consommateur.

Par ailleurs, l’application a un intérêt pour les commerces, car elle propose une centralisation de tous les achats effectués dans le magasin, ce qui peut fournir une aide précieuse pour la comptabilité.

Fonctionalités | Implémentées
-----------------|------------
Visualiser la liste de ses tickets|Oui
Tri des tickets | Non
Suppression de ticket |Oui
Visualiser son garde manger |Oui
Supprimer des produits de son garde manger|Oui
Modifier quantités dans le garde manger|Oui
Swipe "tinder" pour mettre à jour le garde manger|Non
Commande Vocale |Non
Scanner le code barre d'un produit pour l'ajouter au garde manger |Oui
Saisie manuelle d'un produit à ajouter au garde manger |Oui mais à améliorer
Historique des achats pour un produit donné | Non
Visualiser sa liste de courses |Oui
Ajouter ou supprimer des produits à la main dans la liste de courses | Oui
Auto-complétion du champs de saisie pour les ajouts à la liste de courses|Non
Configuration d'achats réguliers |Non
Suggestion d'achats automatique dans la liste de courses|Oui
Ajout d'ingrédients à la liste de courses à partir d'une recette|Non
Générer un QR code à chaque utilisateur |Oui
Module d'inscription/Connexion | Oui
Insérer des tickets dans la BDD (interface commerces) | Oui, simulable via l'API

### IHM

![Vue liste de ticket](https://github.com/Hexotique/pld_smart/blob/master/ressources/listeTickets.jpg)

![Vue Garde Manger](https://github.com/Hexotique/pld_smart/blob/master/ressources/gardeManger.jpg)

![Vue liste de tickets](https://github.com/Hexotique/pld_smart/blob/master/ressources/listeCourses.jpg)
