import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type RootStackAuthentificationParamListe = {
    Connexion: undefined;
    Inscription: undefined;
}

type ConnexionRouteProp = RouteProp<RootStackAuthentificationParamListe, 'Connexion'>;
type ConnexionNavigationProp = StackNavigationProp<RootStackAuthentificationParamListe, 'Connexion'>;

export type ConnexionProp = {
    route: ConnexionRouteProp;
    navigation: ConnexionNavigationProp;
}

type InscriptionRouteProp = RouteProp<RootStackAuthentificationParamListe, 'Inscription'>;
type InscriptionNavigationProp = StackNavigationProp<RootStackAuthentificationParamListe, 'Inscription'>;

export type InscriptionProp = {
    route: InscriptionRouteProp;
    navigation: InscriptionNavigationProp;
}

export const StackAuthentification = createStackNavigator<RootStackAuthentificationParamListe>();