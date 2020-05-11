import { Request, Response, NextFunction } from 'express';
import { Client, Commerce, Groupe } from '../database/models';
import sequelize, { Op } from 'sequelize';


const fetch = require("node-fetch");

interface CommerceJSON {
    id: number,
    nom: string,
}

// Récupère tous les tickets d'un ticket
// Nécessite : un client -> Readme pas à jour
export const recuperer_commerces_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        const commerces = await Commerce.findAll();

        let message: Array<CommerceJSON> = new Array<CommerceJSON>();

        commerces.forEach((element) => {
            message.push({
                id: element.id,
                nom: element.nom
            });
        })

        res.status(200).json(message);

        console.log('Tickets envoyés');
    }
    catch (error) {
        next(error);
    }
}
