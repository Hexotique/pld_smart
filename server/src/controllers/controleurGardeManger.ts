import { Request, Response, NextFunction } from 'express';
import { Produit, GardeManger, Item, Client, Commerce, CategorieProduit, Article } from '../database/models';
import { creerArticle } from './controleurTicket';
import { Op } from 'sequelize';
import { Json } from 'sequelize/types/lib/utils';

interface Ajout {
    nomProduit: string;
    quantite: number;
}

interface AjoutJson {
    ajouts: Array<Ajout>;
}

interface Modification {
    idItem: number;
    quantite: number;
}

interface ModificationJson {
    modifications: Array<Modification>;
}

interface ItemGardeMangerJson {
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
interface GardeMangerJson {
    idGardeManger: string,
    idClient: string,
    items: Array<ItemGardeMangerJson>
}

// Ajout d'un produit au gardemanger par Scan
// Nécessite : un code barre d'article
export const ajouter_produit_scan_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = req.user as Client;
        const gardeManger = await client.getGardeManger();

        let art = await Article.findOne({
            where: { codebar: req.params.codebar }
        });

        if (!art) {
            art = await creerArticle(req.params.codebar);
        }

        if (art) {
            const prod_id = Number(art.get("ProduitId"));
            const prod = await Produit.findByPk(prod_id) as Produit;

            const resultat = await Item.findOrCreate({
                where: {
                    [Op.and]: [
                        { GardeMangerId: gardeManger.id },
                        { ProduitId: prod_id }
                    ]
                },
                defaults: {
                    quantite: 1
                }
            });
            console.log(resultat);
            const item: Item = resultat[0];

            if (resultat[1]) {
                await gardeManger.addItem(item);
                await prod.addItem(item);
            } else {
                item.quantite = Number(item.quantite) + 1;
                await item.save();
            }

            res.status(200).json({ message: 'Success' });
        }

        else {
            res.status(404).json({ message: 'Pas trouvé' });
        }

    }
    catch (error) {
        next(error);
    }
}


interface ProduitJson {
    idProduit: string,
    nom: string,
    categorie : {
        idCategorie : string,
        nomCategorie : string
    }
}

// Ajoute un produit au garde manger
// Nécessite : un nom de produit
//             une quantité
export const ajouter_produit_alamano_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        const reqAjouts: AjoutJson = req.body;

        if (!reqAjouts.ajouts || reqAjouts.ajouts.length === 0) throw ('Pas de données à ajouter');

        let gardeManger: GardeManger = await (req.user as Client).getGardeManger();

        // On effectue séquentiellement toutes le modifications
        for (const ajout of reqAjouts.ajouts) {
            await ajouter(ajout, gardeManger);
        }

        res.status(200).json({ message: 'Success' });
    }
    catch (error) {
        next(error);
    }
}


//A faire : Passer tableau des changements du GM et modifier la base en conséquence
// Pour l'instant : Modifie la quantité d'un item du garde manger
// Nécessite : un id d'Item
//             une quantité
export const modifier_quantite_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        const reqModification: ModificationJson = req.body;

        if (!reqModification.modifications || reqModification.modifications.length === 0) throw ('Pas de modification à effectuer');

        let gardeManger: GardeManger = await (req.user as Client).getGardeManger();

        // On effectue séquentiellement toutes le modifications
        for (const modification of reqModification.modifications) {
            await modifier(modification, gardeManger);
        }

        res.status(200).json({ message: 'Success' });
    }
    catch (error) {
        next(error);
    }
}

// Supprime un produit du garde-manger
// Nécessite : un id de produit
export const supprimer_produit_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.params.idproduit) throw ('parametre idproduit manquant');
        const idProduit: number = Number(req.params.idproduit);

        let gardeManger: GardeManger = await (req.user as Client).getGardeManger();

        await Item.destroy({
            where: {
                ProduitId: idProduit,
                GardeMangerId : gardeManger.id
            }
        });

        res.sendStatus(200);
        console.log('ticket : ' + idProduit + ' supprimé du garde manger d\'id ' + gardeManger.id);
    }
    catch (error) {
        next(error);
    }
}

// Récupère le contenu du garde-manger
export const recuperer_contenu_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        let reponse: GardeMangerJson = {
            idGardeManger: '',
            idClient: '',
            items: []
        };
        const client = req.user as Client;
        const gardemanger = await client.getGardeManger();
        reponse.idGardeManger = gardemanger.id.toString();
        reponse.idClient = client.id.toString();
        const items: Item[] = await gardemanger.getItems();
        for (const item of items) {
            let itemJson: ItemGardeMangerJson = {
                idItem: '',
                quantite: 0,
                produit: {
                    idProduit: '',
                    nom: '',
                    categorie: {
                        idCategorie: '',
                        nomCategorie: ''
                    }
                }
            }
            const produitId: number = Number(item.get('ProduitId'));
            const produit = await Produit.findByPk(produitId) as Produit;
            const categorieProduit = await CategorieProduit.findByPk(Number(produit.get("CategorieProduitId")))
            const nom = produit.nom;
            itemJson.idItem = item.id.toString();
            itemJson.quantite = item.quantite;
            itemJson.produit.idProduit = produitId.toString();
            itemJson.produit.nom = nom;
            itemJson.produit.categorie.idCategorie = String(categorieProduit?.id);
            itemJson.produit.categorie.nomCategorie = String(categorieProduit?.nom);
            reponse.items.push(itemJson);
        }
        res.status(200).json(reponse);

    }
    catch (error) {
        next(error);
    }
}

// Récupère les produits en fonction de la recherche
// Nécessite : une recherche
export const recuperer_produits_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        const recherche : string = req.params.recherche;

        let produits : any = {
            "Produits" : []
        }

        const categoriesProduits = await CategorieProduit.findAll();

        for (const categorie  of categoriesProduits) {
            const produitsCategories = await categorie.getProduits();
            for (const produit of produitsCategories ){
                    let produitJson : ProduitJson = {
                        idProduit : produit.id.toString(),
                        nom : produit.nom,
                        categorie : {
                            idCategorie : categorie.id.toString(),
                            nomCategorie : categorie.nom
                        }
                    }
                    produits.Produits.push(produitJson)
            }
        }
        res.status(200).json(produits);
    }
    catch (error) {
        next(error);
    }
}

// TESTS
// Fonction permettant de faire un ajout d'item
// Prend en paramètre : un garde manger à modifier
//                      un ajout a effectuer
const ajouter = async (ajout: Ajout, gardemanger: GardeManger) => {
    if (!ajout.nomProduit) throw ('parametre nomproduit manquant'); //check la présence du nom dans la requête
    if (!ajout.quantite) throw ('parametre quantité manquant'); //check la présence de la quantité dans la requête

    const nomProduit: string = ajout.nomProduit as string;
    const quantiteProd: number = ajout.quantite as number;

    // Vérification de l'existence du produit dans la BDD et création s'il n'existe pas
    const resultat = await Produit.findOrCreate({ where: { nom: nomProduit }, defaults: { nom: nomProduit } });
    const produit = resultat[0];
    const item = await Item.create({ quantite: quantiteProd });
    await gardemanger.addItem(item);
    await produit.addItem(item);
    console.log('produit : ' + nomProduit + 'ajouté au garder-manger (quantite : ' + quantiteProd + ')');
}

// Fonction permettant de faire une modification d'item
// Prend en paramètre : un garde manger à modifier
//                      une modification a effectuer
const modifier = async (modification: Modification, gardeManger: GardeManger) => {

    if (!modification.idItem) throw ('parametre idItem manquant'); // check la présence de l'id dans la requête
    if (!modification.quantite) throw ('parametre quantité manquant'); //check la présence de la quantité dans la requête
    const quantite: number = Number(modification.quantite);
    const item = await Item.findByPk(modification.idItem) as Item;
    if (item === null) throw ('item inexistant dans la BDD'); // Check que l'item existe bien dans la BDD

    // Met à jour l'attribut quantité (ou supprimer l'item si elle est nulle)
    if (quantite == 0) {
        gardeManger.removeItem(item);
        await item.destroy();
        console.log('produit : ' + modification.idItem + ' retiré du garde manger');
    } else {
        item.quantite = quantite;
        await item.save();
        console.log('produit : ' + modification.idItem + ' mis à jour (quantité : +' + quantite + ')');
    }
}



export const gardemanger_test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gardemanger = await GardeManger.create({});
        const user = await Client.findOne({
            where: {
                id: "1"
            }
        });
        if (user) user.setGardeManger(gardemanger);
        // const produit = await Produit.create({ nom: "Pates" });
        // const item = await Item.create({ quantite: 100 });

        // gardemanger.addItem(item);

        // produit.addItem(item);
        // item.destroy();

        // item.destroy();

        console.log(await gardemanger.getItems());

        // console.log(await item.getProduit());
        // await Produit.findByPk{item.id}

        res.status(200).json(await GardeManger.findByPk(gardemanger.id));
    }
    catch (error) {
        next(error);
    }
}
