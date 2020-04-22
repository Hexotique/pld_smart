import { Request, Response, NextFunction } from 'express';
import { Client, Produit, ProduitCourse, ListeCourses } from '../database/models';


export const produit_ajouter_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.query.nomproduit) throw ('parametre nomproduit manquant');
        const nomProduit: string = req.query.nomproduit as string;
        await Produit.create({ nom: nomProduit });
        //ajouter produit dans la liste de course

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
        const idProduit: number = Number(req.query.idproduit);


        await Produit.destroy({
            where: {
                id: idProduit,
            }
        });

        res.sendStatus(200);
        console.log('produit : ' + idProduit + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

export const produit_test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listeCourse = await ListeCourses.create({});
        const produit = await Produit.create({ nom: "Moules" });
        const produitCourse = await ProduitCourse.create({ quantite: 100 });

        listeCourse.addProduitCourse(produitCourse);
        produit.addProduitCourse(produitCourse);

        res.status(200).json(await ListeCourses.findByPk(listeCourse.id));
    }
    catch (error) {
        next(error);
    }
}