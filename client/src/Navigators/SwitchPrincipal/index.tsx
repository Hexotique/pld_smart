import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type RootStackPrincipaleParamListe = {
    Authentification: undefined;
    App: undefined;
}

type AuthentificationRouteProp = RouteProp<RootStackPrincipaleParamListe, 'Authentification'>;
type AuthentificationNavigationProp = StackNavigationProp<RootStackPrincipaleParamListe, 'Authentification'>;

export type AuthentificationProp = {
    route: AuthentificationRouteProp;
    navigation: AuthentificationNavigationProp;
}

type AppRouteProp = RouteProp<RootStackPrincipaleParamListe, 'App'>;
type AppNavigationProp = StackNavigationProp<RootStackPrincipaleParamListe, 'App'>;

export type AppProp = {
    route: AppRouteProp;
    navigation: AppNavigationProp;
}

export const StackGlobale = createStackNavigator<RootStackPrincipaleParamListe>();