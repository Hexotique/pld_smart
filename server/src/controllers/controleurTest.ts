import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { Ticket, Article, Client, Commerce, Achat, GardeManger, Liste, Groupe, CategorieProduit, Produit, Item } from '../database/models';
import sequelize, { Sequelize } from 'sequelize';

const fetch = require("node-fetch");

interface code_article {
    code: string;
}

interface cat_en {
    category: string;
}


export const init_cat = async (req: Request, res: Response, next: NextFunction) => {

    let cats = Array<CategorieProduit>();
    cats = req.body.categories;
    try {
        for (const cat of cats) {
            CategorieProduit.create(cat);
        }
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}


export const init_articles = async (req: Request, res: Response, next: NextFunction) => {

    let arts = Array<code_article>();
    arts = req.body.articles;
    console.log(arts);

    try {
        for (const art of arts) {
            await creerArticle(art.code);
        }
        res.sendStatus(200);
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
                console.log(cat);

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

        const prod = (await Produit.findOrCreate({ where: { nom: nom_prod } }))[0];
        const cate = await CategorieProduit.findOne({ where: { nom: categorie } });

        cate?.addProduit(prod);
        prod.addArticle(art);

        return art;

    } catch (error) {
        console.error(error);
        return null;
    }
}


export const init = async (req: Request, res: Response, next: NextFunction) => {

    try {

        //init clients
        const client1 = await Client.create({ nom: "JOURDAN", prenom: "Chanele", email: "chanele.jourdan@hexotique.com", mdp: bcrypt.hashSync("RahulleBest", bcrypt.genSaltSync(8)) });
        const client2 = await Client.create({ nom: "HERMET", prenom: "Guilhem", email: "guilhem.hermet@hexotique.com", mdp: bcrypt.hashSync("Darkchacha", bcrypt.genSaltSync(8)) });

        //init gardemangers
        const gardemanger1 = await GardeManger.create({});
        const gardemanger2 = await GardeManger.create({});
        client1.setGardeManger(gardemanger1);
        client2.setGardeManger(gardemanger2);

        //init Liste
        const listecourse1 = await Liste.create({});
        const listecourse2 = await Liste.create({});
        client1.setListe(listecourse1);
        client2.setListe(listecourse2);

        //init groupe
        const groupe1 = await Groupe.create({ nom: "Auchan" });

        //init commerce
        const com1 = await Commerce.create({ nom: "Auchan Caluire" })
        groupe1.addCommerce(com1);

        //init categorie produit
        const feculents = (await CategorieProduit.findOrCreate({ where: { nom: "Pâtes alimentaires" } }))[0];
        const boisson = (await CategorieProduit.findOrCreate({ where: { nom: "Boissons" } }))[0];

        //init produit
        const produit1 = await Produit.create({ nom: 'Serpentini' });
        const produit2 = await Produit.create({ nom: 'Soda' });
        feculents.addProduit(produit1);
        boisson.addProduit(produit2);

        //init article
        const article1 = await Article.create({ codebar: "5000112629002", nom: "Dr Pepper" });
        const article2 = await Article.create({ codebar: "5449000000996", nom: "Coca Cola" });
        const article3 = await Article.create({ codebar: "54491069", nom: "Sprite" });

        const article4 = await Article.create({ codebar: "3038350250803", nom: "Serpentini - Panzani - 500 g" });
        const article5 = await Article.create({ codebar: "3038352910200 ", nom: "Le Cannelloni (100 % pur Bœuf) - Panzani - 800 g" });
        const article6 = await Article.create({ codebar: "3038350335005", nom: "Les 3 Minutes Spaghetti - Panzani - 500 g" });

        produit2.addArticle(article1);
        produit2.addArticle(article2);
        produit2.addArticle(article3);

        produit1.addArticle(article4);
        produit1.addArticle(article5);
        produit1.addArticle(article6);

        //init ticket client1
        const tick1 = await Ticket.create({ date_achat: new Date(), montant: 22 });
        const achat11 = await Achat.create({ quantite: 2, prix: 3 });
        const achat12 = await Achat.create({ quantite: 4, prix: 4 });
        article1.addAchat(achat11);
        article4.addAchat(achat12);
        tick1.addAchat(achat11);
        tick1.addAchat(achat12);
        client1.addTicket(tick1);
        com1.addTicket(tick1);

        //init ticket client1
        const tick2 = await Ticket.create({ date_achat: new Date(), montant: 105 });
        const achat21 = await Achat.create({ quantite: 7, prix: 5 });
        const achat22 = await Achat.create({ quantite: 10, prix: 8 });
        article2.addAchat(achat21);
        article5.addAchat(achat22);
        tick2.addAchat(achat21);
        tick2.addAchat(achat22);
        client2.addTicket(tick2);
        com1.addTicket(tick2);

        //remplir gardemanger client 1
        const item11 = await Item.create({ quantite: 2 });
        const item12 = await Item.create({ quantite: 4 });
        produit1.addItem(item11);
        produit2.addItem(item12);
        gardemanger1.addItem(item11);
        gardemanger1.addItem(item12);

        //remplir gardemanger client 1
        const item21 = await Item.create({ quantite: 7 });
        const item22 = await Item.create({ quantite: 10 });
        produit1.addItem(item21);
        produit2.addItem(item22);
        gardemanger2.addItem(item21);
        gardemanger2.addItem(item22);

        // //remplir liste courses client 1
        listecourse1.addProduit(produit1);
        listecourse1.addProduit(produit2);

        // //remplir liste courses client 2
        listecourse2.addProduit(produit1);
        listecourse2.addProduit(produit2);

        res.sendStatus(200);

    }
    catch (error) {
        next(error);
    }
}


export const get_codebar = async (req: Request, res: Response, next: NextFunction) => {

    let cats_en = Array<cat_en>();
    let codes = Array<code_article>();
    cats_en = req.body.cats;
    console.log(cats_en);

    for (const cat of cats_en) {
        let url = `https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${cat.category}&tagtype_2=countries&tag_contains_2=contains&tag_2=france&json=true&page_size=50`;

        try {

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    UserAgent: 'Pot d\'Yaourt - ReactNative - Version 1.0'
                }
            });

            const produits = await response.json();
            for (const produit of produits.products){
                if (produit.categories_lc == "fr") codes.push({code: produit._id });
            }

        }
        catch(error){
            console.log(error);
            await res.json(error).status(500);
            return;
        }
    }
    res.json(codes).status(200); 
    return;
    
}