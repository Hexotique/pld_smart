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

//Json pour les tickets

export interface Ticket {
    nomGroupe: string,
    idTicket: string,
    montant: number,
    date: string
}

export interface ListeTickets {
    Tickets: Array<Ticket>
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
