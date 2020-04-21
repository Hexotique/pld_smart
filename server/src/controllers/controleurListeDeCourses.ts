import { Request, Response, NextFunction } from 'express';
import { Client, Produit } from '../database/models';


export const produit_ajouter_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.query.nomproduit) throw ('parametre nomproduit manquant');
        const nomProduit : string =  req.query.nomproduit as string; 
        await Produit.create({nom : nomProduit});
        
        res.sendStatus(200);
        console.log('produit : ' + nomProduit + ' ajouté à la BDD');
        
    }
    catch (error) {
        next(error);
    }
}

export const produit_supprimer_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.idproduit) throw ('parametre idproduit manquant');
        const idProduit : number =  Number(req.query.idproduit);


        await Produit.destroy({
            where: {
                id : idProduit,
            }
        });

        res.sendStatus(200);
        console.log('produit : ' + idProduit + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}