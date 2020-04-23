import { Request, Response, NextFunction } from 'express';
import {Client, Produit, ListeCourses, Item} from '../database/models';


// Ajoute un produit à la liste de course
// Nécessite : un nom de produit
export const produit_ajouter_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.query.nomproduit) throw ('parametre nomproduit manquant');//check la présence du nom dans la requête
        const nomProduit: string = req.query.nomproduit as string;

        // Vérification de l'existence du produit dans la BDD et création s'il n'existe pas
        const result = await Produit.findOrCreate({ where: { nom: nomProduit }, defaults: { nom: nomProduit } });
        var produit = result[0];

        // Ajout du produit
        const client = req.user as Client;
        const listecourses = await client.getListeCourses();
        listecourses.addProduit(produit);
        res.sendStatus(200);
        console.log('produit : ' + nomProduit + ' ajouté à la liste de course');

    }
    catch (error) {
        next(error);
    }
}

// Supprime un produit à la liste de course
// Nécessite : un id de produit
export const produit_supprimer_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.idproduit) throw ('parametre idproduit manquant'); //check la présence de l'Id dans la requête
        const idProduit: number = Number(req.query.idproduit);

        //Supprime le produit de la liste
        const client = req.user as Client;
        const listecourses = await client.getListeCourses();
        const produit = await Produit.findByPk(idProduit) as Produit;
        await listecourses.removeProduit(produit);

        res.sendStatus(200);
        console.log('produit : ' + idProduit + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

export const produit_test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listeCourse = await ListeCourses.findByPk(1);
        const produit = await Produit.findByPk(1);

        if(listeCourse === null || produit === null) throw ("is null")

        // listeCourse.addProduit(produit);
       
        console.log("Espace -----------------------");
        console.log(await produit.getListeCourses());
        console.log("Espace -----------------------");
        console.log(await listeCourse.getProduits());

        res.status(200).json(await ListeCourses.findByPk(listeCourse.id));
    }
    catch (error) {
        next(error);
    }
}