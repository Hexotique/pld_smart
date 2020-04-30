import { userToken, APIBaseURL } from './configApi';

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

