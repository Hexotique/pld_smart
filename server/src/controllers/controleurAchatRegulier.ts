import { Request, Response, NextFunction } from 'express';
import { Client, Produit, AchatRegulier } from '../database/models';
import { Op } from 'sequelize';

const NB_ELEMENTS_INTERVALLE: number = 10;
const COEFFICIENT_CAP_MAX: number = 6;
const COEFFICIENT_CAP_MIN: number = 3;
const MARGE_MOYENNE : number = 1/3;

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

interface AchatRegulierJson {
    nom?: string
}

interface ListeCourseJson {
    ListeCourse: Array<AchatRegulierJson>
}

// Ajout les achatsrégulier
// Nécessite :  un id client
//              les produits associé aux achats
 export const ajout_achat_regulier = async (idclient: number, produits: Set<Produit>) => {

    try {
        for (const produit of produits) {
            const result = await AchatRegulier.findOrCreate({
                where: {
                    [Op.and]: [
                        { ClientId: idclient },
                        { ProduitId: produit.id }
                    ]
                },
                defaults: {
                    ClientId: idclient,
                    ProduitId: produit.id,
                    coefficient: 1,
                    intervales: "",
                    moyenne: 0,
                    ecart_type: 0,
                    date_dernier_achat: new Date()
                }
            });
            const achatregulier = result[0];

            //Si ce produit a déjà été acheté
            if (!result[1]) {
                let diff = Math.abs(Date.now() - achatregulier.date_dernier_achat.getTime());
                let intervale: number = Math.round(Math.ceil(diff / (1000 * 3600 * 24)));

                let intervales: Array<number> = achatregulier.intervales.split(',').map(Number);
                intervales.push(intervale);

                if (achatregulier.intervales === "") { // cas de bord pour enlever le 0 qui est créé lors de la conversion string to Array
                    intervales.shift();
                }

                //si on a aumoins 2 intervales <--> 3 achats
                if (intervales.length >= 2) {
                    if (intervales.length  > NB_ELEMENTS_INTERVALLE) {
                        intervales.shift();
                    }

                    const moyenne = intervales.reduce((nbPrecedent, nbActuel) => nbPrecedent + nbActuel, 0) / achatregulier.intervales.length;
                    let ecart: number = 0;

                    //si moyenne, pas à 0, on calcule  l'écart type
                    if (moyenne) {
                        ecart = Math.sqrt(intervales.map(x => Math.pow(x - moyenne, 2)).reduce((a, b) => a + b) / achatregulier.intervales.length);
                    }

                    if (achatregulier.coefficient <= COEFFICIENT_CAP_MAX) {
                        achatregulier.coefficient++;
                    }

                    achatregulier.moyenne = moyenne;
                    achatregulier.ecart_type = ecart;
                }

                achatregulier.date_dernier_achat = new Date();
                achatregulier.intervales = intervales.join(',');

                await achatregulier.save();


            }
        }
    }
    catch (error) {

    }
}


// Nettoyage des achatsréguliers
// Nécessite :  un id client
export const clean_achat_regulier = async (idclient: number) => {

    try {
        const achatsReguliersClient = await AchatRegulier.findAll({
            where: {
                ClientId: idclient
            }
        });

        for (const achatRegulier of achatsReguliersClient) {
            let intervales: Array<number> = achatRegulier.intervales.split(',').map(Number);    
            let diff = Math.abs(Date.now() - achatRegulier.updatedAt.getTime());
            let intervale: number = Math.round(Math.ceil(diff / (1000 * 3600 * 24)));
            let difference_ponderee = 1;

            if (achatRegulier.moyenne) {
                difference_ponderee = (intervale - achatRegulier.moyenne) / achatRegulier.moyenne;
            }

            // Si aumoins deux intervalles
            // Si l'écart est suffisament grand, on considère qu'il faut nettoyer les achats
            if (intervales.length > 2 && difference_ponderee > 3/7) {
                achatRegulier.coefficient > 0 ? achatRegulier.coefficient-- : 0;
                intervales.shift();
                achatRegulier.intervales = intervales.join(',');

                if (intervales.length <= 2) {
                    achatRegulier.moyenne = 0;
                    achatRegulier.ecart_type = 0;
                }

                await achatRegulier.save();
            }

            // Si au plus deux intervales et dernier achat datant de plus de 70 jours, on efface 
            else if (intervales.length <= 2 && intervale > 70) {
                achatRegulier.destroy();
            }
        }
        

    } catch (error) {

    }

}

export const recuperer_liste_course = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        const client = req.user as Client;

        const achatsReguliersClient = await AchatRegulier.findAll({
            where: {
                [Op.and]: {
                    ClientId: client.id
                }
            }
        });

        const reponse: ListeCourseJson = {
            ListeCourse: []
        }

        for (const achatRegulier of achatsReguliersClient) {

            let diff = Math.abs(Date.now() - achatRegulier.date_dernier_achat.getTime());
            let intervale: number = Math.round(Math.ceil(diff / (1000 * 3600 * 24)));
            let difference_ponderee = 1;
            let ecart = 1;

            if (achatRegulier.moyenne) {
                difference_ponderee = Math.abs(achatRegulier.moyenne - intervale) / achatRegulier.moyenne;
                ecart = achatRegulier.ecart_type/achatRegulier.moyenne;
            }

            if (achatRegulier.coefficient >= COEFFICIENT_CAP_MIN
                && difference_ponderee < MARGE_MOYENNE && ecart < 0.3 ) { 

                const produitAssocie: Produit | null = await Produit.findByPk(Number(achatRegulier.get("ProduitId")))
                const achatJson: AchatRegulierJson = {
                    nom: produitAssocie?.nom
                }
                reponse.ListeCourse.push(achatJson)
            }
        }
        res.status(200).json(reponse);

    } catch (error) {
        next(error);
    }
} 


