import { Request, Response, NextFunction } from 'express';
import { Ticket, Article, Client, Commerce, Achat, Groupe, Produit, CategorieProduit, Item, GardeManger } from '../database/models';
import { json } from 'body-parser';
import { Json } from 'sequelize/types/lib/utils';
import sequelize, { Op } from 'sequelize';
import { ajout_achat_regulier } from './controleurAchatRegulier';


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
    achats: Array<DonneesAchat>;
}

interface TicketJson {
    donneesMagasin: DonneesMagasin;
    donneesClient: DonneesClient;
    donneesTicket: DonneesTicket;
}

//Méthode pour enlever les articles qui ne sont pas dans OFF (null) et leurs achats associés de manière async
const retirer_AchatArticle_null = async (achats: Array<Achat>, articles: Array<Article>) => {

    for (let index = 0; index < achats.length; index++) {
        if (!articles[index]) {
            const achat_tmp = achats[index];
            articles.splice(Number(index), 1);
            achats.splice(Number(index), 1);
            achat_tmp.destroy();
        }
    }

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

        // Check de l'existence du commerce dans la BDD
        const magasin = await Commerce.findByPk(Number(donnees.donneesMagasin.idCommerce));
        if (magasin === null) throw ('magasin inexistant dans la BDD');

        // Check de l'existence du client dans la BDD
        const client = await Client.findByPk<Client>(donnees.donneesClient.idClient)
        if (client === null) throw ('client inexistant dans la BDD');

        // Tableau qui permettra de vérifier si l'article est déjà créé ou non en base
        const articlePromises: Array<Promise<Article>> = new Array<Promise<Article>>();

        // Tableau qui permettra de récupérer l'ensemble des achats créés en base
        const achatsPromises: Array<Promise<Achat>> = new Array<Promise<Achat>>();

        // Montant total du ticket à calculer durant l'ajout des achats
        let montant: number = 0;

        // Création des achats et récupération des articles associés dans la base
        donneesAchats.forEach((donneesAchat: DonneesAchat) => {
            montant += donneesAchat.quantite * donneesAchat.prix;

            // On tente de récupérer l'article associé à l'achat dans la base pour check s'il existe ou non
            const article = Article.findOne({
                where: { codebar: donneesAchat.codeBarre }
            });
            articlePromises.push(article);

            // On crée l'achat
            const achat: Promise<Achat> = Achat.create({ quantite: donneesAchat.quantite, prix: donneesAchat.prix });
            achatsPromises.push(achat);
        });

        const articles: Array<Article> = await Promise.all(articlePromises);
        const achats: Array<Achat> = await Promise.all(achatsPromises);
        const quantites: Array<number> = new Array<number>();

        for (const index in articles) {
            if (!articles[index]) {

                let art = await creerArticle(donneesAchats[index].codeBarre);
                if (art) {
                    articles[index] = art;
                    quantites.push(achats[index].quantite);
                }

                //Si l'article n'est pas trouvé sur OFF on l'enlève le montant du ticket
                else {
                    montant -= achats[index].quantite * achats[index].prix;
                }
            }
            else {
                quantites.push(achats[index].quantite);
            }
        }

        //On enlève tous les achats qui sont null et leur articles associés
        await retirer_AchatArticle_null(achats, articles);
        
        // récupération des produits associés à chaque article
        const produitsPromises: Array<Promise<Produit>> = new Array<Promise<Produit>>();
        for (const article of articles) {
            const produitId: number = await (article.get('ProduitId') as number);
            produitsPromises.push(Produit.findByPk(article.get('ProduitId') as number));
        }
        const produits: Array<Produit> = await Promise.all(produitsPromises);

        // Ajout aux achats régulier du client
        await ajout_achat_regulier(client.id, new Set (produits));

        // Création du ticket
        const ticket: Ticket = await Ticket.create({ date_achat: new Date(), montant: montant });

        // Tableaux qui vont check que les relations ticket/achat/article sont bien réalisées en base
        const achatsAjoutesDansArticle: Array<Promise<void>> = new Array<Promise<void>>();
        const achatsAjoutesDansTicket: Array<Promise<void>> = new Array<Promise<void>>();

        // Ajout des relations
        articles.forEach((article, index) => {
            achatsAjoutesDansArticle.push(article.addAchat(achats[index]));
            achatsAjoutesDansTicket.push(ticket.addAchat(achats[index]));
        });
        await Promise.all(achatsAjoutesDansArticle);
        await Promise.all(achatsAjoutesDansTicket);
        await magasin.addTicket(ticket);
        await client.addTicket(ticket);



        //Récupération du garde manger du client
        const gardeManger: GardeManger = await client.getGardeManger();
        for (const index in produits) {

            const resultat = await Item.findOrCreate({
                where: {
                    [Op.and]: [
                        { GardeMangerId: gardeManger.id },
                        { ProduitId: produits[index].id }
                    ]
                },
                defaults: {
                    quantite: quantites[index]
                }
            });
            console.log(resultat);
            const item: Item = resultat[0];
            if (resultat[1]) {
                await gardeManger.addItem(item);
                await produits[index].addItem(item);
            } else {
                item.quantite = Number(item.quantite) + Number(quantites[index]);
                await item.save();
            }
        }

        // On renvoie le ticket
        res.status(200).json(ticket);
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

        //client.getTickets().then((tickets) => { res.status(200).json(tickets); });

        let message: any;
        Json: message = {
            "Tickets": [

            ]

        };

        let tickets = await client.getTickets()

        for (const ticket of tickets) {
            const commerce = await Commerce.findByPk(Number(ticket.get("CommerceId")));
            const groupe = await Groupe.findByPk(Number(commerce?.get("GroupeId")));

            let element = {
                "nomGroupe": groupe?.nom,
                "idTicket": ticket.id,
                "montant": ticket.montant,
                "date": ticket.date_achat
            }

            message["Tickets"].push(element);
        }

        res.status(200).json(message);

        console.log('Tickets envoyés');
    }
    catch (error) {
        next(error);
    }
}

// Récupère tous les détails d'un ticket
// Nécessite : un id de ticket
// Pas besoin de client car idTicket unique, les client dans le front ne peut accéder que à ses propres tickets
export const recuperer_detail_ticket_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        if (!req.params.idticket) throw ('parametre idticket manquant'); // check de la présence de l'ID du ticket

        // Check existence du commerce dans la BDD
        const ticket = await Ticket.findByPk(Number(req.params.idticket));
        if (ticket === null) throw ('ticket inexistant dans la BDD');

        // Check if the user is the owner of the ticket
        const client = await Client.findByPk(Number(ticket.get("ClientId")));
        if (!(ticket.get("ClientId") === (req.user as Client).id)) throw ("L'utilisateur connecté n'est pas le propriétaire du ticket");

        const commerce = await Commerce.findByPk(Number(ticket.get("CommerceId")));
        const groupe = await Groupe.findByPk(Number(commerce?.get("GroupeId")));

        let message: any;
        Json: message = {
            "groupe": { "nom": groupe?.nom },
            "commerce": { "nom": commerce?.nom },
            "donneesTicket": {
                "idTicket": ticket.id,
                "montant": ticket.montant,
                "date": ticket.date_achat,
                "achats": [
                ]
            }
        };

        let achats = await ticket.getAchats();

        for (const achat of achats) {
            let article = await Article.findByPk(Number(achat.get("ArticleId")));
            let produit = await Produit.findByPk(Number(article?.get("ProduitId")));
            let categorieProduit = await CategorieProduit.findByPk(Number(produit?.get("CategorieProduitId")));

            let element = {
                "nomArticle": article?.nom,
                "nomCategorieProduit": categorieProduit?.nom,
                "quantite": achat.quantite,
                "prix": achat.prix
            }

            message["donneesTicket"]["achats"].push(element);
        }

        res.status(200).json(message);
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

    }
    catch (error) {
        next(error);
    }
}


export const creerArticle = async (code: string) => {

    const url = `https://fr.openfoodfacts.org/api/v0/product/${code}.json`;

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

        if (produit.status === 0 || produit.status_verbose === "product not found" || !produit.product.product_name) { //si article pas trouvé ou incomplet
            return null;
        }

        let nom_produit: string = produit.product.product_name_fr ? produit.product.product_name_fr : produit.product.product_name;
        let marque: string = produit.product.brands_tags[0] ? produit.product.brands_tags[0] : "";
        let poids: string = produit.product.quantity ? produit.product.quantity : "";
        let url_im: string = produit.product.image_url ? produit.product.image_url : null;
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

        //Trouver la bonne catégorie -------------------------------------------------
        let categorie: string = "Autres";
        let nom_prod = nom_produit; // par défaut, le nom de l'article
        const categories: string = produit.product.categories;

        if (categories) {
            let cats = categories.split(",");
            let index: number = 0;
            cats.reverse();

            for (let cat of cats) {

                cat = await cat.trim();

                let resultat = await CategorieProduit.findOne({ where: sequelize.where(sequelize.fn('lower', sequelize.col('nom')), sequelize.fn('lower', cat)) });

                if (resultat) {
                    console.log(resultat);
                    categorie = cat;
                    break;
                }
                index++;
            };

            //Trouver ou créer le produit ----------------------------------------------
            index--;
            for (let i = index; i >= 0; i--) { //on parcours le tableau en reverse

                if (i === 0) {
                    nom_prod = cats[0].trim();
                }
                else {
                    let tmp = await cats[i].trim();
                    let resultat = await Produit.findOne({ where: { nom: tmp } });
                    if (resultat) {
                        console.log(resultat);
                        nom_prod = tmp;
                        break;
                    }
                }
            }
        }

        const prod = await Produit.findOrCreate({ where: { nom: nom_prod } });
        const cate = await CategorieProduit.findOne({ where: { nom: categorie } });

        if (prod[1]) {
            (await cate?.addProduit(prod[0]));
        }

        if (!prod[0].url_image) {
            prod[0].setAttributes({ url_image: url_im });
        }

        await (prod[0].addArticle(art));
        await (prod[0].save());
        const tmp_art = (await art.reload());
        return tmp_art;

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
        res.status(200).json(article);
    }
    catch (error) {
        next(error);
    }
}

export const test_creation_commerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerce = await (Commerce.create({
            nom: "Spar"
        }));
        res.status(200).json(commerce);
    }
    catch (error) {
        next(error);
    }
}