import { Request, Response, NextFunction } from 'express';
import { Client, Produit, Liste } from '../database/models';

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

        let listeCourse: Liste = await (req.user as Client).getListe();

        for (const ajout of reqAjouts.ajouts) {
            await ajouter(ajout.nomProduit, listeCourse);
        }
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

        let listeCourse: Liste = await (req.user as Client).getListe();

        for (const suppression of reqSuppression.suppressions) {
            await supprimer(suppression.idProduit, listeCourse);
        }
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
        const client = req.user as Client;
        const listeCourse = await client.getListe();
        const produitsListe: Array<Produit> = await listeCourse.getProduits();
        let detailsProduitsListe = new Array<ProduitListeJson>();
        for (const produit of produitsListe) {
            const detailElement = <ProduitListeJson>{
                idProduit: produit.id,
                nom: produit.nom
            };
            detailsProduitsListe.push(detailElement);
        }
        let reponse = <ListeCoursesJson>{
            produits: detailsProduitsListe
        };
        res.status(200).json(reponse);
    }
    catch (error) {
        next(error);
    }
}

//TESTS
export const produit_test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listeCourse = await Liste.findByPk(1);
        const produit = await Produit.findByPk(1);
        
        if (listeCourse === null || produit === null) throw ("is null")
        
        // listeCourse.addProduit(produit);
        
        console.log("Espace -----------------------");
        console.log(await produit.getListe());
        console.log("Espace -----------------------");
        console.log(await listeCourse.getProduits());
        
        res.status(200).json(await Liste.findByPk(listeCourse.id));
    }
    catch (error) {
        next(error);
    }
}

// Fonction permettant d'ajouter un produit à une liste de crouses
// Prend en paramètre : une liste de courses à modifier
//                      un nom de produit à ajouter
const ajouter = async (nomProduit: string, listeCourse: Liste) => {
    // Vérification de l'existence du produit dans la BDD et création s'il n'existe pas
    const result = await Produit.findOrCreate({ where: { nom: nomProduit }, defaults: { nom: nomProduit } });

    // Ajout du produit à la liste de courses
    await listeCourse.addProduit(result[0]);
    console.log('produit : ' + nomProduit + ' ajouté à la liste de course');
}

// Fonction permettant de supprimer un produit à une liste de crouses
// Prend en paramètre : une liste de courses à modifier
//                      un id de produit à supprimer
const supprimer = async (idProduit: number, listeCourse: Liste) => {
    //Supprime le produit de la liste
    const produit = await Produit.findByPk(idProduit) as Produit;
    await listeCourse.removeProduit(produit);
    console.log('produit : ' + idProduit + 'supprimé de la liste de course');
}