import { createContext } from "react";

export type ContexteProp = {
    connexion: any;
    deconnexion: any;
    inscription: any;
    email: string;
    nomComplet: string;
}

export const Contexte = createContext(<ContexteProp>({}));