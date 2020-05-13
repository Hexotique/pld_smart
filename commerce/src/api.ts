import { APIBaseURL } from './configApi';

//Json pour le garde manger 

var userToken: string = "";

export function setToken(token: string) {
    userToken = token;
}

export interface AchatJSON {
    codeBarre: String,
    quantite: number,
    prix: number
}

export interface TicketJSON {
    donneesMagasin: {
        idCommerce: number,
    },
    donneesTicket: {
        achats: Array<AchatJSON>
    }
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
        httpOptions.body = JSON.stringify(body);
    }
    console.log("request sent : " + url);
    return fetch(url, httpOptions);
}

// Garde Manger
// export function recupererContenuGardeMangerGet(): Promise<GardeMangerJson> {
//     const url: RequestInfo = `${APIBaseURL}/garde-manger/recuperer-contenu`;
//     return _setHTTPMethod(url, 'GET')
//         .then((response) => {
//             return response.json();
//         })
//         .catch((error) => {
//             console.log(error);
//             console.error(error);
//         });
// }

export function creer_ticket__put(ticket: TicketJSON): Promise<any> {
    const url: RequestInfo = `${APIBaseURL}/ticket/creer-ticket`;
    return _setHTTPMethod(url, 'PUT', ticket)
        .then((response) => {
            console.log(response.json());
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
        .then((response) => { return response.json() })
        .catch((e) => console.log(e));
}