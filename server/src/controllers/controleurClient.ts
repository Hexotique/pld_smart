import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { Client, Ticket } from '../database/models';

export const inscription_client_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateur = await Client.findOne({
            where: {
                email: req.body.email
            }
        });
        if (utilisateur !== null) {
            next("Utilisateur existant");
        }
        else {
            return Client.create({
                ...req.body,
                mdp: bcrypt.hashSync(req.body.mdp, bcrypt.genSaltSync(8))
            }).then((nouvelUtilisateur: Client) => {
                nouvelUtilisateur.createGardeManger();
                nouvelUtilisateur.createListeCourses();
                res.status(201).json(nouvelUtilisateur.get());
            });
        }
    }
    catch (error) {
        next(error);
    }
}

export const connexion_client_post = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.mdp) {
            return next("Champs manquants")
        }
        passport.authenticate('local', { session: false }, (error, utilisateur, info) => {
            if (error) {
                return next(error);
            }
            if (info) {
                return next(info.message);
            }
            req.login(utilisateur, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign({ id: utilisateur.id, email: utilisateur.email }, process.env.SECRET_CODE as string);
                return res.status(200).json({
                    email: utilisateur.email,
                    token
                });
            });
        })(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const test_client_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateur = await (Client.create({
            email: 'test@gmail.com',
            mdp: 'machin',
            nom: 'Chanèle',
            prenom: 'JOURDAN',
        }));
        const ticket1 = await (Ticket.create({
            date_achat: new Date(),
            montant: 200
        }));
        await utilisateur.createTicket({ date_achat: new Date(), montant: 15 }); // créé le ticket et l'ajoute 
        await utilisateur.addTicket(ticket1); //ajoute un ticket existant comme association

        let tickets = await utilisateur?.getTickets();
        console.log(await utilisateur?.getTickets());
        //res.setHeader('Content-Type', 'application/json');
        res.json(tickets).status(200);
    }
    catch (error) {
        next(error);
    }
}
