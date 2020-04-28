interface itemGardeMangerJson {
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
interface GardeMangerJson {
    idGardeManger: string,
    idClient: string,
    items: Array<itemGardeMangerJson>
}



let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJndWlsaGVtLmhlcm1ldEBoZXhvdGlxdWUuY29tIiwiaWF0IjoxNTg3OTc3MzEwfQ.dcfRX6cE93LQoV4y4WvkbLXQzmc-OUU5v1eeUBTcyuQ';
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
    const url: RequestInfo = `${APIBaseURL}/garde-manger/recuperer-contenu`;
    return _setHTTPMethod(url, 'GET')
    .then((response) => {
        console.log("coucou");
        return response.json();})
    .catch((error) => {
        console.log(error);
        console.error(error);
    });

}

