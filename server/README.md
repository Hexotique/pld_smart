
# API endpoints

Example: to invoke the function named creerClient: `PUT https://BASEURL/api/client/creerclient`

### Client
| Name              | Type | Description                            | URL             | Body		| Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| inscription_client_put  | PUT  | crée un client dans la BD                 | api/client/inscription  | {email: '123@hexotique.com', mdp: '123' , nom: 'Jean', prenom: 'Dupont'}               | {email: '123@hexotique.com', nom: 'Jean', prenom: 'Dupont', token: 'abcde'} |
| connexion_client_post  | POST  | connecte un client  | api/client/connexion  | {email: '123@hexotique.com', mdp: '123'} | {email: '123@hexotique.com', nom: 'Jean', prenom: 'Dupont', token: 'abcde'} |

### Ticket
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| creer_ticket_put  | PUT  | crée un ticket dans la BD                 | api/ticket/creer-ticket  | {donneesMagasin: {idCommerce: '1'}, donneesClient: {idClient: '1'}, donneesTicket: {achats: [{codeBarre: '489814', quantite: '2', prix: '3,5'}, {...}]}}             | {id: '1', date_achat: '12/04/2020', montant: '120', createdAt: '12/04/2020', updatedAt: '12/04/2020'} |
| supprimer_ticket_delete  | DELETE  | supprime un ticket de la BD                 | api/ticket/supprimer-ticket/:idticket  | null   | null |
| recuperer_tickets_get  | GET | Récupère la liste de tickets de l'utilisateur dans la BD                 | api/ticket/recuperer-tickets  | null | {"Tickets": [{idTicket: '1', montant: '10', nomGroupe: 'Auchan', date: '12/04/2020'}, {...}]} |
| recuperer_detail_ticket_get  | GET | récupère un ticket dans la BD  | api/ticket/recuperer-detail-ticket/:idticket  | null    | {groupe: {nom: 'Carrefour'}, commerce: {nom: 'Carrefour Market'}, donneesTicket: {idTicket: '1', montant: '100', date: '12/04/2020', achats: [{nomArticle: 'lait', nomCategorieProduit: 'Produits laitiers', quantite: '2', prix: '1.2'}, {...}]}} |
|

### Garde-manger
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| modifier_quantite_post  | POST  | modifie la quantité ou supprime un produit du garde-manger | api/garde-manger/supprimer-produit  | idproduit, quantite | {message: Success} |
| ajouter_produit_alamano_put  | PUT  | ajouter un produit au garde-manger saisi par l'utilisateur (V0) | api/garde-manger/ajouter-produit-alamano  | nomproduit, quantite | {message: Success} |
| recuperer_contenu_get  | GET  | récupérer les produits dans le garde manger d'un client | api/garde-manger/recuperer-contenu  | null | {produits : [{nomProduit: "Litre de lait", quantite: 3, categorie: "Produits laitiers"}, {..}]} |
| supprimer_produit_delete  | DELETE  | Supprimer un produit du garde-manger d'un client | api/garde-manger/supprimer-produit  | idproduit | OK |
| recuperer-produits  | GET  | récupérer les produits | api/garde-manger/recuperer-produits  | null | {"Produits": [{"idProduit": "1","nom": "Pates","categorie": {"idCategorie": "1", "nomCategorie": "Feculents"}}]} |

### Liste de courses
| Name              | Type | Description                            | URL             | Parameters         | Example response                                                                                                                      |
|-------------------|------|----------------------------------------|-----------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
| ajouter_produit_put  | PUT | ajoute un produit saisi par l'utilisateur à la liste de courses (V0) | api/liste-courses/ajouter-produit  | nomproduit | {message: Success} |
| supprimer_produit_delete  | DELETE | supprime un produit de la liste de courses | api/liste-courses/supprimer-produit  | idproduit | {message: Success} |
