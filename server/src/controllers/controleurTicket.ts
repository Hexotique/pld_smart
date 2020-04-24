import { Request, Response, NextFunction } from 'express';
import { Ticket, Article, Client, Commerce, Achat } from '../database/models';

const fetch = require("node-fetch");

interface DonneesMagasin {
    idCommerce: number;
}

interface DonneesClient {
    idClient: number;
}

interface DonneesAchat {
    codeBarre: string;
    quantite: number;
    prix: number;
}

interface DonneesTicket {
    montant: number;
    achats: Array<DonneesAchat>;
}

interface TicketJson {
    donneesMagasin: DonneesMagasin;
    donneesClient: DonneesClient;
    donneesTicket: DonneesTicket;
}

// Crée un ticket
// Nécessite : un id de Commerce
//             un client
//             une liste d'articles (pas encore pris en compte)
export const creer_ticket_put = async (req: Request, res: Response, next: NextFunction) => {

    // ajouter la création des articles du ticket
    try {
        console.log(req);
        //Check que le body n'est pas vide
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) throw ('Aucun article à ajouter au ticket');
        const donnees: TicketJson = req.body;


        // Check de la présence des données nécessaires dans le corps de la requete
        if (!donnees.donneesMagasin.idCommerce) throw ('parametre idmagasin manquant');
        if (!donnees.donneesClient.idClient) throw ('parametre idclient manquant');
        if (!donnees.donneesTicket) throw ('Pas de données de ticket');
        if (!donnees.donneesTicket.achats || donnees.donneesTicket.achats.length === 0) throw ('Pas d\'achats dans le ticket');
        const donneesAchats: Array<DonneesAchat> = donnees.donneesTicket.achats;

        // Check de l'existence du commerce et du client dans la BDD
        const magasin = await Commerce.findByPk(Number(donnees.donneesMagasin.idCommerce));
        if (magasin === null) throw ('magasin inexistant dans la BDD');

        const client = await Client.findByPk<Client>(donnees.donneesClient.idClient)
        if (client === null) throw ('client inexistant dans la BDD');

        // Tableau qui permettra de vérifier si l'article est déjà créé ou non en base
        const articlePromises$: Array<Promise<Article>> = new Array<Promise<Article>>();

        // Tableau qui permettra de récupérer l'ensemble des achats créés en base
        const achatsPromises$: Array<Promise<Achat>> = new Array<Promise<Achat>>();

        // Montant total du ticket à calculer durant l'ajout des achats
        let montant: number = 0;

        // Création des achats et récupération des articles associés dans la base
        donneesAchats.forEach((donneesAchat: DonneesAchat) => {
            montant += donneesAchat.quantite * donneesAchat.prix;

            // On tente de récupérer l'article associé à l'achat dans la base pour check s'il existe ou non
            const article$ = Article.findOne({
                where: { codebar: donneesAchat.codeBarre }
            });
            articlePromises$.push(article$);

            // On crée l'achat
            const achat$: Promise<Achat> = Achat.create({ quantite: donneesAchat.quantite, prix: donneesAchat.prix });
            achatsPromises$.push(achat$);
        });

        const articles: Array<Article> = await Promise.all(articlePromises$);
        const achats: Array<Achat> = await Promise.all(achatsPromises$);

        // Si un des articles n'existe pas en base on le crée grâce à OpenFoodFact
        for (const index in articles) {
            if (!articles[index]) {
                let art = await creerArticle(donneesAchats[index].codeBarre); 
                if(art){
                    articles[index] = art;
                }
                else{
                    montant-= achats[index].quantite*achats[index].prix;
                    let achat_tmp = achats[index];
                    articles.splice(Number(index), 1);
                    achats.splice(Number(index), 1);
                    Achat.destroy({ where: {id : achat_tmp.id}});
                }
            }
        }

        // Création du ticket
        const ticket = await Ticket.create({ date_achat: new Date(), montant: montant });

        // Tableaux qui vont check que les relations ticket/achat/article sont bien réalisées en base
        const achatsAjoutesDansArticle$: Array<Promise<void>> = new Array<Promise<void>>();
        const achatsAjoutesDansTicket$: Array<Promise<void>> = new Array<Promise<void>>();

        // Ajout des relations
        achats.forEach((achat, index) => {
            achatsAjoutesDansArticle$.push(articles[index].addAchat(achat));
            achatsAjoutesDansTicket$.push(ticket.addAchat(achat));
        });
        await Promise.all(achatsAjoutesDansArticle$);
        await Promise.all(achatsAjoutesDansTicket$);
        await magasin.addTicket(ticket);
        await client.addTicket(ticket);

        // Il faut peut-être renvoyer le ticket ?
        res.json(ticket).sendStatus(200);
        console.log('Ticket cree');
    }
    catch (error) {
        next(error);
    }
}


// Supprime un ticket
// Nécessite : un id de ticket
export const supprimer_ticket_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.params.idticket) throw ('parametre idticket manquant');
        const idTicket: number = Number(req.params.idticket);

        // il faudrait faire une suppression en cascade ici plutôt que ça mais en attendant...
        await Achat.destroy({
            where: {
                TicketId: idTicket,
            }
        });

        // suppression du ticket
        await Ticket.destroy({
            where: {
                id: idTicket,
            }
        });

        res.sendStatus(200);
        console.log('ticket : ' + idTicket + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

// Récupère tous les tickets d'un ticket
// Nécessite : un client -> Readme pas à jour
export const recuperer_tickets_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        //Check de la validité de l'utilisateur
        if (req.user === null) throw ('Pas de client identifié');
        const client = req.user as Client;

        client.getTickets().then((tickets) => { res.status(200).json(tickets); });

        console.log('Tickets envoyés');
    }
    catch (error) {
        next(error);
    }
}

// Récupère tous les tickets d'un ticket
// Nécessite : un id de ticket
// Pas besoin de client car idTicket unique, les client dans le front ne peut accéder que à ses propres tickets
export const recuperer_detail_ticket_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        if (!req.params.idticket) throw ('parametre idticket manquant'); // check de la présence de l'ID du ticket

        // Check existence du commerce dans la BDD
        const ticket = await Ticket.findByPk(Number(req.params.idticket));
        if (ticket === null) throw ('ticket inexistant dans la BDD');

        res.status(200).json(ticket);
        console.log('ticket : ' + req.params.idticket + ' trouvé');
    }
    catch (error) {
        next(error);
    }
}

export const test_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const ticket: TicketJson = req.body;
        console.log(ticket);

        res.status(200).json(ticket);


        // const tick = await Ticket.create({ date_achat: new Date(), montant: 200.6 });
        // console.log('ticket créé');
        // const art = await Article.create({ codebar: "01010101", nom: "Confit de Canard 250g" });
        // console.log('article créé');
        // const achat = await Achat.create({ prix: 20.2, quantite: 2 });
        // console.log('achat créé');

        // art.addAchat(achat);
        // console.log('achat ajouté à l\'article');
        // tick.addAchat(achat);
        // console.log('achat ajouté àu ticket');

        // res.status(200).json(await Ticket.findByPk(tick.id));
    }
    catch (error) {
        next(error);
    }
}


export const creerArticle = async (code : string) => {

    const url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;

    try {       

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                UserAgent: 'Pot d\'Yaourt - ReactNative - Version 1.0'
            }
        });
        
        const produit = await response.json();

        if (produit.status === 0 || produit.status_verbose === "product not found" || !produit.product.product_name ) { //si article pas trouvé ou incomplet
            return null;
        }

        let nom_produit: string = produit.product.product_name_fr ? produit.product.product_name_fr : produit.product.product_name;
        let marque: string = produit.product.brands_tags[0] ? produit.product.brands_tags[0] : "";
        let poids: string = produit.product.quantity ? produit.product.quantity : "";
        let nom_article: string;

        if (poids && marque === "") {
            nom_article = nom_produit;
        }
        else if (poids === "") {
            nom_article = nom_produit + '-' + marque;
        }
        else if (marque === "") {
            nom_article = nom_produit + '-' + poids;
        }
        else {
            nom_article = nom_produit + '-' + marque + '-' + poids;
        }

        const art = await Article.create({ nom: nom_article, codebar: code });
        console.log(art);
        return art;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const test_creation_article = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await (Article.create({
            codebar: '1239',
            nom: 'machin6'
        }));
        res.json(article).status(200);
    }
    catch (error) {
        next(error);
    }
}

export const test_creation_commerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await (Commerce.create({
            nom: "Carrefour"
        }));
        res.json(article).status(200);
    }
    catch (error) {
        next(error);
    }
}