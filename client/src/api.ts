export interface itemGardeMangerJson {
    idItem: string,
    quantite: number,
    produit: {
        idProduit: string,
        nom: string,
        categorie : {
            idCategorie : string,
            nomCategorie : string
        }
    }
}
export interface GardeMangerJson {
    idGardeManger: string,
    idClient: string,
    items: Array<itemGardeMangerJson>
}



let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJndWlsaGVtLmhlcm1ldEBoZXhvdGlxdWUuY29tIiwiaWF0IjoxNTg4MDc0MDA5fQ.PM3dAxFviLwFV2SKZODd1kYto-Hhrvmclpsc7eaAktE';
const APIBaseURL = '192.168.0.25:3000/api';

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
    return fetch(url, httpOptions);
}

export function recupererContenuGardeMangerGet(): Promise<GardeMangerJson> {
    const url: RequestInfo = `http://${APIBaseURL}/garde-manger/recuperer-contenu`;
    return _setHTTPMethod(url, 'GET')
    .then((response) => {
        return response.json();})
    .catch((error) => {
        console.log(error);
        console.error(error);
    });

}

