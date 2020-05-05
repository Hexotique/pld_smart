import { userToken, APIBaseURL } from './configApi';

//Json pour le garde manger 

export interface itemGardeMangerJson {
    idItem: string,
    quantite: number,
    produit: {
        idProduit: string,
        nom: string,
        categorie: {
            idCategorie: string,
            nomCategorie: string
        }
    }
}
export interface GardeMangerJson {
    idGardeManger: string,
    idClient: string,
    items: Array<itemGardeMangerJson>
}

export interface Ajout {
    nomProduit: string;
    quantite: number;
}

export interface AjoutJson {
    ajouts: Array<Ajout>;
}

export interface Modification {
    idItem: string;
    quantite: number;
}

export interface ModificationJson {
    modifications: Array<Modification>;
}

export interface Produits {
    produits: Array<Produit>
}

export interface Produit {
    idProduit: string,
    nom: string,
    categorie: {
        idCategorie: string, 
        nomCategorie: string
    }
}

//Json pour la liste des tickets

export interface Ticket {
    nomGroupe: string,
    idTicket: string,
    montant: number,
    date: string
}

export interface ListeTickets {
    Tickets: Array<Ticket>
}

//Json pour le détail d'un ticket

export interface Achat {
    nomArticle: string,
    nomCategorieProduit: string,
    quantite: number,
    prix: number
}

export interface DetailTicket {
    groupe: string,
    commerce: string,
    donneesTicket: {
        idTicket: string,
        montant: number,
        date: string,
        achats: Array<Achat>
    }
}

//JSON pour les infos d'un client

export interface Client {
    email: string,
    mdp?: string,
    nom?: string,
    prenom?: string,
    token?: string
}


// Méthode pour générer les requètes

function _setHTTPMethod(url: RequestInfo, httpMethod: string, body?: any): Promise<Response> {
    const httpOptions: RequestInit = {
        method: httpMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    };
    if (body) {
        console.log(JSON.stringify(body));
        httpOptions.body = JSON.stringify(body);
    }
    console.log("request sent : " + url);
    return fetch(url, httpOptions);
}

// Garde Manger
export function recupererContenuGardeMangerGet(): Promise<GardeMangerJson> {
    const url: RequestInfo = `${APIBaseURL}/garde-manger/recuperer-contenu`;
    return _setHTTPMethod(url, 'GET')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}

export function ajouter_produit_alamano_put(ajouts: AjoutJson) {
    const url: RequestInfo = `${APIBaseURL}/garde-manger/ajouter-produit-alamano`;
    _setHTTPMethod(url, 'PUT', ajouts)
        .then((response) => {
            // Je sais pas si on fait un truc
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}

export function modifier_quantite_post(modifications: ModificationJson) {
    const url: RequestInfo = `${APIBaseURL}/garde-manger/modifier-quantite`;
    _setHTTPMethod(url, 'POST', modifications)
        .then((response) => {
            console.log(response.status);
        })
        .then((data: any) => console.log(data))
        .catch((error) => {
            console.log(error);
            console.error(error);
        });

}

export function recuperer_produits_get(): Promise<Produits> {
    const url: RequestInfo = `${APIBaseURL}/garde-manger/recuperer-produits`;
    return _setHTTPMethod(url, 'GET')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });   
}

// Interactions OFF
export function recupererProduitViaCodeBarre(code: string): Promise<any> {

    const url = `https://fr.openfoodfacts.org/api/v0/product/${code}.json`;

    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            UserAgent: 'Pot d\'Yaourt - ReactNative - Version 1.0'
        }
    })
}

//Liste Tickets
export function recupererContenuListeTicketGet(): Promise<ListeTickets> {
    const url: RequestInfo = `${APIBaseURL}/ticket/recuperer-tickets`;
    return _setHTTPMethod(url, 'GET')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });

}

export function recupererContenuDetailTicketGet(): Promise<DetailTicket> {
    const url: RequestInfo = `${APIBaseURL}/ticket/recuperer-detail-ticket`;
    return _setHTTPMethod(url, 'GET')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}

export function supprimer_ticket_delete(idTicket: number) {
    const url: RequestInfo = `${APIBaseURL}/ticket/recuperer-detail-ticket/${idTicket}`;
    _setHTTPMethod(url, 'DELETE')
        .then((response) => {
            // Je sais pas si on fait un truc
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}

// Client

export function connexion_client_post(client: Client): Promise<Client> {
    const url: RequestInfo = `${APIBaseURL}/client/connexion`;
    return _setHTTPMethod(url, 'POST', client)
        .then((response) => {
            console.log('res : ' + response.status);
            switch (response.status) {
                case 200: //succès
                    return response.json();
                    break;
                default:
                    return null;
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}

export function inscription_client_put(client: Client): Promise<Client> {
    const url: RequestInfo = `${APIBaseURL}/client/inscription`;
    const httpOptions: RequestInit = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    httpOptions.body = JSON.stringify(client);
    console.log("request sent : " + url);
    console.log(httpOptions);
    return fetch(url, httpOptions)
        .then((response) => {
            console.log('res : ' + response.status);
            switch (response.status) {
                case 201: //succès
                    return response.json();
                    break;
                default:
                    return null;
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
            console.error(error);
        });
}





