import { Request, Response, NextFunction } from 'express';
import { Ticket, Article, Client, Commerce } from '../database/models';
import { Achat } from '../database/models/Achat';

// Crée un ticket
// Nécessite : un id de Commerce
//             un client
//             une liste d'articles (pas encore pris en compte)
export const creer_ticket_put = async (req: Request, res: Response, next: NextFunction) => {

    // ajouter la création des articles du ticket
    try {
        console.log(req);
        if (!req.query.idmagasin) throw ('parametre idmagasin manquant'); // check de la présence de l'ID du magasin        

        // Check existence du commerce dans la BDD
        const magasin = await Commerce.findByPk(Number(req.query.idmagasin));
        if (magasin === null) throw ('magasin inexistant dans la BDD');

        //Check de la validité de l'utilisateur
        if (req.user === null) throw ('Pas de client identifié');
        const client = req.user as Client;

        const ticket = await Ticket.create({ date_achat: new Date(), montant: Math.random() });

        // intégrer les attributs pour créer le ticket et son prix
        // ticket.addAchat()

        await magasin.addTicket(ticket);
        await client.addTicket(ticket);



        // Il faut peut-être renvoyer le ticket ?
        res.sendStatus(200);
        console.log('Ticket cree');
    }
    catch (error) {
        next(error);
    }
}


// Supprime un ticket
// Nécessite : un id de ticket
export const supprimer_ticket_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        if (!req.query.idticket) throw ('parametre idticket manquant');
        const idTicket: number = Number(req.query.idticket);

        // il faudrait faire une suppression en cascade ici plutôt que ça mais en attendant...
        await Achat.destroy({
            where: {
                TicketId: idTicket,
            }
        });

        // suppression du ticket
        await Ticket.destroy({
            where: {
                id: idTicket,
            }
        });

        res.sendStatus(200);
        console.log('ticket : ' + idTicket + ' supprimé de la BDD');
    }
    catch (error) {
        next(error);
    }
}

// Récupère tous les tickets d'un ticket
// Nécessite : un client -> Readme pas à jour
export const recuperer_tickets_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        //Check de la validité de l'utilisateur
        if (req.user === null) throw ('Pas de client identifié');
        const client = req.user as Client;

        client.getTickets().then((tickets) => { res.status(200).json(tickets); });

        console.log('Tickets envoyés');
    }
    catch (error) {
        next(error);
    }
}

// Récupère tous les tickets d'un ticket
// Nécessite : un id de ticket
// Pas besoin de client car idTicket unique, les client dans le front ne peut accéder que à ses propres tickets
export const recuperer_detail_ticket_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req);

        if (!req.query.idticket) throw ('parametre idticket manquant'); // check de la présence de l'ID du ticket

        // Check existence du commerce dans la BDD
        const ticket = await Ticket.findByPk(Number(req.query.idticket));
        if (ticket === null) throw ('ticket inexistant dans la BDD');

        res.status(200).json(ticket);
        console.log('ticket : ' + req.query.idticket + ' trouvé');
    }
    catch (error) {
        next(error);
    }
}

export const test_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tick = await Ticket.create({ date_achat: new Date(), montant: 200.6 });
        console.log('ticket créé');
        const art = await Article.create({ codebar: "01010101", nom: "Confit de Canard 250g" });
        console.log('article créé');
        const achat = await Achat.create({ prix: 20.2, quantite: 2 });
        console.log('achat créé');

        art.addAchat(achat);
        console.log('achat ajouté à l\'article');
        tick.addAchat(achat);
        console.log('achat ajouté àu ticket');

        res.status(200).json(await Ticket.findByPk(tick.id));
    }
    catch (error) {
        next(error);
    }
}