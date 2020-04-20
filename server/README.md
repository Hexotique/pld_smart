
# API endpoints

Example: to invoke the function named creerClient: `PUT https://BASEURL/api/client/creerclient`

### Client
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| creerClient  | PUT  | crée un client dans la BD                 | api/client/creerclient  | email, mdp, nom, prenom               | {message: Success, idClient: 1} |
| connecterClient  | GET  | connecte un client  | api/client/connecterclient  | email, mdp | {message: Success, token: abcd} |
| deconnecterClient| GET  | déconnecte un client  | api/client/deconnecterclient  | null | {message: Success} |

### Ticket
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| creerTicket  | PUT  | crée un ticket dans la BD                 | api/ticket/creerticket  | idClient, idMagasin             | {message: Success, idTicket: 1} |
| supprimerTicket  | DELETE  | supprime un ticket de la BD                 | api/ticket/supprimerticket  | idTicket    | {message: Success} |
| recupererListeTickets  | GET | récupère un ticket dans la BD                 | api/ticket/recupererlistetickets  | null | {"tickets": [{idTicket: 1, montant: 10, commerce: "Auchan"}, {...}]} |
| recupererDetailTicket  | GET | récupère un ticket dans la BD  | api/ticket/recupererdetailticket  | idTicket    | {"ticket": {montant: 15, commerce: "Auchan", dateAchat: "13/05/2016"}, "achats": [{nomArticle: "beurre doux", quantite: 3, prix: 2, categorie: "Produits laitiers"}, {..}]} |
| ajouterArticleTicket  | PUT | Ajoute un article au ticket  | api/ticket/ajouterarticleticket  | idTicket, codeBarre, quantite, prix    | {message: "Success"} |
| validerCreationTicket  | PUT | Valide l'ajout des articles achetés au garde manger du client et au ticket.  | api/ticket/validerticket  | idTicket  | {message: "Success"} |

### Garde-manger
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| supprimerProduit  | DELETE  | supprime un produit du garde-manger | api/gardemanger/supprimerproduit  | codeBarre | {message: Success} |
| ajouterProduitALaMano  | PUT  | ajouter un produit au garde-manger saisi par l'utilisateur (V0) | api/gardemanger/ajouterproduitalamano  | nomProduit, quantite | {message: Success} |
| recupererContenuGardeManger  | GET  | récupérer les produits dans le garde manger d'un client | api/gardemanger/recuperercontenugardemanger  | null | {produits : [{nomProduit: "Litre de lait", quantite: 3, categorie: "Produits laitiers"}, {..}]} |

### Liste de courses
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| ajouterProduit  | PUT | ajoute un produit saisi par l'utilisateur à la liste de courses (V0) | api/listedecourses/ajouterproduit  | nomProduit | {message: Success} |
| supprimerProduit  | DELETE | supprime un produit de la liste de courses | api/listedecourses/supprimerproduit  | idProduit | {message: Success} |
