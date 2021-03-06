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
            const nouvelUtilisateur = await Client.create({
                ...req.body,
                mdp: bcrypt.hashSync(req.body.mdp, bcrypt.genSaltSync(8))
            });
            await nouvelUtilisateur.createGardeManger();
            const token = jwt.sign({ id: nouvelUtilisateur.id, email: nouvelUtilisateur.email }, process.env.SECRET_CODE as string);
            res.status(201).json({
                email: nouvelUtilisateur.email,
                nom: nouvelUtilisateur.nom,
                prenom: nouvelUtilisateur.prenom,
                token: token
            });
            return nouvelUtilisateur;
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
                    nom: utilisateur.nom,
                    prenom: utilisateur.prenom,
                    token: token
                });
            });
        })(req, res, next);
    } catch (error) {
        return next(error);
    }
}

