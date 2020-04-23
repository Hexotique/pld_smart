import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { Ticket, Article, Client, Commerce, Achat, GardeManger, ListeCourses, Groupe, CategorieProduit, Produit, Item } from '../database/models';

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

        //init listecourses
        // const listecourse1 = await ListeCourses.create({});
        // const listecourse2 = await ListeCourses.create({});
        // client1.setListeCourses(listecourse1);
        // client2.setListeCourses(listecourse2);

        //init groupe
        const groupe1 = await Groupe.create({ nom: "Auchan" });

        //init commerce
        const com1 = await Commerce.create({ nom: "Auchan Caluire" })
        groupe1.addCommerce(com1);

        //init categorie produit
        const feculents = await CategorieProduit.create({ nom: "Feculents" });
        const boisson = await CategorieProduit.create({ nom: "Boisson" });

        //init produit
        const produit1 = await Produit.create({ nom: 'Pates' });
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

        produit1.addArticle(article1);
        produit1.addArticle(article2);
        produit1.addArticle(article3);

        produit2.addArticle(article4);
        produit2.addArticle(article5);
        produit2.addArticle(article6);

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
        // listecourse1.addProduit(produit1);
        // listecourse1.addProduit(produit2);
        
        // //remplir liste courses client 2
        // listecourse2.addProduit(produit1);
        // listecourse2.addProduit(produit2);

    }
    catch (error) {
        next(error);
    }
}