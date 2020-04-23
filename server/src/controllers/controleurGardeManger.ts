import { Request, Response, NextFunction } from 'express';
import { Produit, GardeManger, Item, Client, Commerce } from '../database/models';

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
            await effectuerModification(ajout, gardeManger);
        }

        res.status(200).json(await GardeManger.findByPk(gardeManger.id));
    }
    catch (error) {
        next(error);
    }
}

// Fonction permettant de faire toutes les ajouts d'items de manière asynchrone
// Prend en paramètre : un garde manger à modifier
//                      une modification a effectuer
const effectuerModification = async (ajout: Ajout, gardemanger: GardeManger) => {
    if (!ajout.nomProduit) throw ('parametre nomproduit manquant'); //check la présence du nom dans la requête
    if (!ajout.quantite) throw ('parametre quantité manquant'); //check la présence de la quantité dans la requête

    const nomProduit: string = ajout.nomProduit as string;
    const quantite: number = ajout.quantite as number;

    // Vérification de l'existence du produit dans la BDD et création s'il n'existe pas
    const resultat = await Produit.findOrCreate({ where: { nom: nomProduit }, defaults: { nom: nomProduit } });
    const produit = resultat[0];
    const item = await Item.create({ quantite: quantite });
    gardemanger.addItem(item);
    produit.addItem(item);
    console.log('produit : ' + nomProduit + 'ajouté au garder-manger (quantite : ' + quantite + ')');
}

//A faire : Passer tableau des changements du GM et modifier la base en conséquence
// Pour l'instant : Modifie la quantité d'un item du garde manger
// Nécessite : un id d'Item
//             une quantité
export const modifier_quantite_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.idItem) throw ('parametre idItem manquant'); // check la présence de l'id dans la requête
        const idItem: number = Number(req.query.idItem);
        const item = await Item.findByPk(Number(req.query.idItem)) as Item;
        const quantite: number = Number(req.query.quantite);
        const client = req.user as Client;
        const gardemanger = await client.getGardeManger();

        if (item === null) throw ('item inexistant dans la BDD');

        // Met à jour l'attribut quantité (ou supprimer l'item si elle est nulle)
        if (quantite == 0) {
            gardemanger.removeItem(item);
            await item.destroy();
        } else {
            item.quantite = quantite;
            await item.save();
        }

        res.sendStatus(200);
        console.log('produit : ' + idItem + ' retiré du garde manger');
    }
    catch (error) {
        next(error);
    }
}

// Récupère le contenu du garde-manger
export const recuperer_contenu_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        //Check de la validité de l'utilisateur
        if (req.user === null) throw ('Pas de client identifié');
        const client = req.user as Client;

        const gardemanger = await client.getGardeManger();
        gardemanger.getItems().then((gardemanger) => { res.status(200).json(gardemanger); });

    }
    catch (error) {
        next(error);
    }
}

export const gardemanger_test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gardemanger = await GardeManger.create({});
        const produit = await Produit.create({ nom: "Pates" });
        const item = await Item.create({ quantite: 100 });

        gardemanger.addItem(item);

        produit.addItem(item);
        item.destroy();

        item.destroy();

        console.log(await gardemanger.getItems());

        // console.log(await item.getProduit());
        // await Produit.findByPk{item.id}

        res.status(200).json(await GardeManger.findByPk(gardemanger.id));
    }
    catch (error) {
        next(error);
    }
}
