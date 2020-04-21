import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { Client } from '../database/models';

export const auth_inscription_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const user = await Client.findOne({
            where: {
                username: data.username
            }
        });
        if (user !== null) {
            next("Utilisateur existant");
        }
        else {
            return Client.create({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
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
        if (!req.body.username || !req.body.password) {
            return next("Champs manquants")
        }
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error) {
                return next(error);
            }
            if(info) {
                return res.status(401).json(info);
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_CODE as string);
                return res.status(200).json({
                    username: user.username,
                    token
                });
            });
        })(req, res, next);
    } catch (error) {
        return next(error);
    }
}