import { createContext } from "react";

export type ContexteProp = {
    connexion: any;
    deconnexion: any;
    inscription: any;
}

export const Contexte = createContext(<ContexteProp>({}));