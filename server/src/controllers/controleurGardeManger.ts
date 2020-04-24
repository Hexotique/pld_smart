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

interface itemGardeMangerJson {
    idItem: string,
    quantite: number,
    produit: {
        idProduit: string,
        nom: string
    }
}
interface GardeMangerJson {
    idGardeManger: string,
    idClient: string,
    items: Array<itemGardeMangerJson>
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

        res.status(200).json({message: 'Success'});
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

        res.status(200).json({message: 'Success'});
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
        reponse.idClient=client.id.toString();
        const items: Item[] = await gardemanger.getItems();
        for (const item of items) {
            let itemJson: itemGardeMangerJson = {
                idItem: '',
                quantite: 0,
                produit: {
                    idProduit: '',
                    nom: ''
                }
            }
            const produitId: number = Number(item.get('ProduitId'));
            const produit = await Produit.findByPk(produitId) as Produit;
            const nom = produit.nom;
            itemJson.idItem= item.id.toString();
            itemJson.quantite=item.quantite;
            itemJson.produit.idProduit=produitId.toString();
            itemJson.produit.nom=nom;
            reponse.items.push(itemJson);
        }
        res.status(200).json(reponse);

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
    const quantite: number = ajout.quantite as number;

    // Vérification de l'existence du produit dans la BDD et création s'il n'existe pas
    const resultat = await Produit.findOrCreate({ where: { nom: nomProduit }, defaults: { nom: nomProduit } });
    const produit = resultat[0];
    const item = await Item.create({ quantite: quantite });
    gardemanger.addItem(item);
    produit.addItem(item);
    console.log('produit : ' + nomProduit + 'ajouté au garder-manger (quantite : ' + quantite + ')');
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
