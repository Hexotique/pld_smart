import { Request, Response, NextFunction } from 'express';
import { Client, Produit, AchatRegulier } from '../database/models';

interface Ajout {
    nomProduit: string
}

interface AjoutJson {
    ajouts: Array<Ajout>
}

interface Suppression {
    idProduit: number
}

interface SuppressionJson {
    suppressions: Array<Suppression>
}

interface ProduitListeJson {
    idProduit: number,
    nom: string
}

interface ListeCoursesJson {
    produits: Array<ProduitListeJson>
}

// Ajoute un produit à la liste de course
// Nécessite : un nom de produit
export const produit_ajouter_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const reqAjouts: AjoutJson = req.body;
        if (!reqAjouts.ajouts || reqAjouts.ajouts.length == 0) throw ('Rien à ajouter');//check la présence d'jouts à effectuer dans la requête

        // let listeCourse: Liste = await (req.user as Client).getListe();

        // for (const ajout of reqAjouts.ajouts) {
        //     await ajouter(ajout.nomProduit, listeCourse);
        // }
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}

// Supprime un produit à la liste de course
// Nécessite : un id de produit
export const produit_supprimer_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const reqSuppression: SuppressionJson = req.body;
        if (!reqSuppression.suppressions || reqSuppression.suppressions.length == 0) throw ('Rien à supprimer');//check la présence de suppressions à effectuer dans la requête

        // let listeCourse: Liste = await (req.user as Client).getListe();

        // for (const suppression of reqSuppression.suppressions) {
        //     await supprimer(suppression.idProduit, listeCourse);
        // }
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}

// Récupère la liste de courses avec le nom des produits qu'elle contient
export const recuperer_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        res.status(200).json("TODO");
    }
    catch (error) {
        next(error);
    }
}
