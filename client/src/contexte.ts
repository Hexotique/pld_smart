import { createContext } from "react";

export type ContexteProp = {
    connexion: any;
    deconnexion: any;
    inscription: any;
    email: string;
    nomComplet: string;
    token: string;
}

export const Contexte = createContext(<ContexteProp>({}));