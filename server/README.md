
# API endpoints

Example: to invoke the function named creerClient: `PUT https://BASEURL/api/client/creerclient`

### Client
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| inscrireClient  | PUT  | crée un client dans la BD                 | api/client/inscription  | email, mdp, nom, prenom               | {idClient: 1, email: 'abu@ama.com', mdp:'!@#321', nom: 'abu', prenom: 'whut'} |
| connecterClient  | POST  | connecte un client  | api/client/connexion  | email, mdp | {email: 'abu@ali.com',token: '@#!abcd'} |

### Ticket
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| creer_ticket_put  | PUT  | crée un ticket dans la BD                 | api/ticket/creer  | idlient, idagasin             | {message: Success, idTicket: 1} |
| supprimer_ticket_delete  | DELETE  | supprime un ticket de la BD                 | api/ticket/supprimer-ticket  | idticket    | {message: Success} |
| recuperer_tickets_get  | GET | récupère un ticket dans la BD                 | api/ticket/recuperer-tickets  | null | {"tickets": [{idTicket: 1, montant: 10, commerce: "Auchan"}, {...}]} |
| recuperer_detail_ticket_get  | GET | récupère un ticket dans la BD  | api/ticket/recuperer-detail-ticket  | idticket    | {"ticket": {montant: 15, commerce: "Auchan", dateAchat: "13/05/2016"}, "achats": [{nomArticle: "beurre doux", quantite: 3, prix: 2, categorie: "Produits laitiers"}, {..}]} |
| ajouterArticleTicket  | PUT | Ajoute un article au ticket  | api/ticket/ajouterarticleticket  | idTicket, codeBarre, quantite, prix    | {message: "Success"} |
| validerCreationTicket  | PUT | Valide l'ajout des articles achetés au garde manger du client et au ticket.  | api/ticket/validerticket  | idTicket  | {message: "Success"} |

### Garde-manger
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| modifier_quantite_post  | POST  | modifie la quantité ou supprime un produit du garde-manger | api/garde-manger/supprimer-produit  | idproduit, quantite | {message: Success} |
| ajouter_produit_alamano_put  | PUT  | ajouter un produit au garde-manger saisi par l'utilisateur (V0) | api/garde-manger/ajouter-produit-alamano  | nomproduit, quantite | {message: Success} |
| recuperer_contenu_get  | GET  | récupérer les produits dans le garde manger d'un client | api/garde-manger/recuperer-contenu  | null | {produits : [{nomProduit: "Litre de lait", quantite: 3, categorie: "Produits laitiers"}, {..}]} |
| recuperer-produits-recherche  | GET  | récupérer les produits en fonction de la recherche | api/garde-manger/recuperer-produits-recherche  | recherche | {"Produits": [{"idProduit": "1","nom": "Pates","categorie": {"idCategorie": "1", "nomCategorie": "Feculents"}}]} |

### Liste de courses
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| ajouter_produit_put  | PUT | ajoute un produit saisi par l'utilisateur à la liste de courses (V0) | api/liste-courses/ajouter-produit  | nomproduit | {message: Success} |
| supprimer_produit_delete  | DELETE | supprime un produit de la liste de courses | api/liste-courses/supprimer-produit  | idproduit | {message: Success} |
