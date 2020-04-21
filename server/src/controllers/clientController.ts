import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { Client } from '../database/models';

export const auth_inscription_put = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Client.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user !== null) {
            next("Utilisateur existant");
        }
        else {
            return Client.create({
                ...req.body,
                mdp: bcrypt.hashSync(req.body.mdp, bcrypt.genSaltSync(8))
            }).then((newUser: Client) => {
                res.status(201).json(newUser.get());
            });
        }
    }
    catch (error) {
        next(error);
    }
}

export const auth_connexion_post = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.mdp) {
            return next("Champs manquants")
        }
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error) {
                return next(error);
            }
            if(info) {
                return next(info.message);
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_CODE as string);
                return res.status(200).json({
                    email: user.email,
                    token
                });
            });
        })(req, res, next);
    } catch (error) {
        return next(error);
    }
}