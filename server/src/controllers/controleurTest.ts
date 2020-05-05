import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { Ticket, Article, Client, Commerce, Achat, GardeManger, AchatRegulier, Groupe, CategorieProduit, Produit, Item } from '../database/models';
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
            await creerouModifierArticle(art.code);
        }
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}

export const creerouModifierArticle = async (code: string) => {


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

        const promise_art = await Article.findOrCreate({ where : { codebar: code }});
        const art = promise_art[0];

        if(promise_art[1]){
            art.setAttributes({nom: nom_article});
        }

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

        const prod = await Produit.findOrCreate({ where: { nom: nom_prod } });
        const cate = await CategorieProduit.findOne({ where: { nom: categorie } });

        if (prod[1]){
            (await cate?.addProduit(prod[0]));
        }

        if (!prod[0].url_image){
            prod[0].setAttributes({url_image : url_im});
            await (prod[0].save());
        }

        await (prod[0].addArticle(art));
        const tmp_art = (await art.reload());
        return tmp_art;

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

      

        //init groupe
        const groupe1 = await Groupe.create({ nom: "Auchan" });

        //init commerce
        const com1 = await Commerce.create({ nom: "Auchan Caluire" })
        groupe1.addCommerce(com1);

        //init categorie produit
        const feculents = (await CategorieProduit.findOrCreate({ where: { nom: "Pâtes alimentaires" } }))[0];
        const boisson = (await CategorieProduit.findOrCreate({ where: { nom: "Boissons" } }))[0];

        //init produit
        const produit1 = (await Produit.findOrCreate({ where : {nom: 'Ravioli en conserve'} }))[0];
        const produit2 = (await Produit.findOrCreate({ where : {nom: 'Sodas au cola light' }}))[0];
        feculents.addProduit(produit1);
        boisson.addProduit(produit2);

        //init article
        const article1 = (await Article.findOrCreate({ where : {codebar: "3502110009357", nom: "Pepsi max zero-pepsi-1.5 L" }}))[0];
        const article2 = (await Article.findOrCreate({ where : {codebar: "5000112611878", nom: "Coca Cola® zéro sucres-coca-cola-1,75 L e" }}))[0];

        const article4 = (await Article.findOrCreate({ where : {codebar: "3038352880305", nom: "Le Ravioli, Pur Bœuf-panzani-800 g" }}))[0];
        const article5 = (await Article.findOrCreate({ where : {codebar: "3038352880206 ", nom: "Le Ravioli (Pur Bœuf, Farce au Bœuf)-panzani-400 g" }}))[0];

        produit2.addArticle(article1);
        produit2.addArticle(article2);

        produit1.addArticle(article4);
        produit1.addArticle(article5);

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


        res.sendStatus(200);

    }
    catch (error) {
        next(error);
    }
}

//Méthode pour récupérer un ensemble de codes barres de produits à partir de catégories définies dans le body de la requette 
//voir init_jsons> cat_en pour les catégories à utliser pour cette methode
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
    res.status(200).json(codes); 
    return;
    
}

export const test_client_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateur = await (Client.create({
            email: 'test@gmail.com',
            mdp: 'machin',
            nom: 'Chanèle',
            prenom: 'JOURDAN',
        }));
        const ticket1 = await (Ticket.create({
            date_achat: new Date(),
            montant: 200
        }));
        await utilisateur.createTicket({ date_achat: new Date(), montant: 15 }); // créé le ticket et l'ajoute 
        await utilisateur.addTicket(ticket1); //ajoute un ticket existant comme association

        let tickets = await utilisateur?.getTickets();
        console.log(await utilisateur?.getTickets());
        //res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tickets);
    }
    catch (error) {
        next(error);
    }
}