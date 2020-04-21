import { Request, Response, NextFunction } from 'express';
import { Ticket } from '../database/models';


export const creer_ticket_put = async (req: Request, res: Response, next: NextFunction) => {
    // ajouter l'association entre client, ticket et magasin
    try {
        console.log(req);
        if (!req.query.idmagasin) throw ('parametre idmagasin manquant');
        const idMagasin : number =  Number(req.query.idmagasin); // à intégrer
        await Ticket.create(); // intégrer les attributs pour créer le ticket
        
        res.sendStatus(200);
        console.log('Ticket cree');
    }
    catch (error) {
        next(error);
    }
}

export const supprimer_ticket_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.idticket) throw ('parametre idticket manquant');
        const idTicket : number =  Number(req.query.idticket);


        await Ticket.destroy({
            where: {
                id : idTicket,
            }
        });

        res.sendStatus(200);
        console.log('ticket : ' + idTicket + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

export const recuperer_tickets_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // A faire : recuperer les tickets associés au client
        let tickets = await Ticket.findAll();
        console.log(tickets);

        res.sendStatus(200).json(tickets);
        console.log('Tickets envoyés');
    }
    catch (error) {
        next(error);
    }
}

export const recuperer_detail_ticket_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // A faire : associer la requete a un client
        if (!req.query.idticket) throw ('parametre idticket manquant');
        const idTicket : number =  Number(req.query.idticket);

        let ticket = await Ticket.findByPk(idTicket);
        console.log(ticket);

        res.sendStatus(200).json(ticket);
        console.log('ticket : ' + idTicket + ' trouvé');
    }
    catch (error) {
        next(error);
    }
}