import { Application, Request } from 'express';

import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import { Client } from '../database/models';

const signin = async (username: string, password: string, done: Function) => {
    return await Client.findOne({
        where: {
            username
        }
    }).then((user: Client | null) => {
        if (user === null) {
            done(null, false, { message: "Utilisateur non existant"});
        } else if (!bcrypt.compareSync(password, user.password)) {
            done(null, false, { message: "Mot de passe invalide" });
        } else {
            done(null, user);
        }
    }).catch((error: Error) => {
        done(error);
    });
}

export const initPassport = (app: Application) => {
    passport.use(new passportLocal.Strategy(signin));

    passport.serializeUser((user: Client, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (userId: string, done) => {
        await Client.findByPk(userId).then((user: Client | null) => {
            if (user) {
                done(null, user.get());
            } else {
                done(null, false);
            }
        }).catch((error: Error) => {
            done(error, false);
        });
    });

    passport.use(new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_CODE
    }, async (jwtPayload, done) => {
        return Client.findOne({
            where: {
                id: jwtPayload.id
            }
        }).then((user: Client | null) => {
            return done(null, user);
        }).catch((error: Error) => {
            return done(error)
        });
    }));

    app.use(passport.initialize());
}
