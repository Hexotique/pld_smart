import { Request, Response, NextFunction } from 'express';
import { Produit, GardeManger, Client } from '../database/models';
import { Item } from '../database/models/Item';


export const ajouter_produit_alamano_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.query.nomproduit) throw ('parametre nomproduit manquant');
        if (!req.query.quantite) throw ('parametre quantité manquant');
        const nomProduit: string = req.query.nomproduit as string;
        const quantite: string = req.query.quantite as string;
        await Produit.create({ nom: nomProduit });
        //ajouter produit dans le garde manger (avec la quantité)

        res.sendStatus(200);
        console.log('produit : ' + quantite + ' ' + nomProduit + ' ajouté à la BDD');

    }
    catch (error) {
        next(error);
    }
}

export const supprimer_produit_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.codebarre) throw ('parametre codebarre manquant');
        const codeBarre: number = Number(req.query.codebarre);
        const idProduit: number = 1;
        //chercher l'ID du produit correspondant au code barre

        await Produit.destroy({
            where: {
                id: idProduit,
            }
        });

        res.sendStatus(200);
        console.log('produit : ' + codeBarre + ' (id = ' + idProduit + ') supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

export const recuperer_contenu_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        //récupérer l'ensemble des produits du garde manger

        res.sendStatus(200);
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

        res.status(200).json(await GardeManger.findByPk(gardemanger.id));
    }
    catch (error) {
        next(error);
    }
}
