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
        httpOptions.body = JSON.stringify(body);
    }
    console.log("request sent : " + url);
    return fetch(url, httpOptions);
}

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

