import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Connexion: undefined;
    Inscription: undefined;
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
    Scanner: undefined;
}

type ConnexionRouteProp = RouteProp<RootStackParamList, 'Connexion'>;
type ConnexionNavigationProp = StackNavigationProp<RootStackParamList, 'Connexion'>;

export type ConnexionProp = {
    route: ConnexionRouteProp;
    navigation: ConnexionNavigationProp;
}

type InscriptionRouteProp = RouteProp<RootStackParamList, 'Inscription'>;
type InscriptionNavigationProp = StackNavigationProp<RootStackParamList, 'Inscription'>;

export type InscriptionProp = {
    route: InscriptionRouteProp;
    navigation: InscriptionNavigationProp;
}

type GardeMangerRouteProp = RouteProp<RootStackParamList, 'GardeManger'>;
type GardeMangerNavigationProp = StackNavigationProp<RootStackParamList, 'GardeManger'>;

export type GardeMangerProp = {
    route: GardeMangerRouteProp;
    navigation: GardeMangerNavigationProp;
}

type ListeCourseRouteProp = RouteProp<RootStackParamList, 'ListeCourse'>;
type ListeCourseNavigationProp = StackNavigationProp<RootStackParamList, 'ListeCourse'>;

export type ListeCourseProp = {
    route: ListeCourseRouteProp;
    navigation: ListeCourseNavigationProp;
}

type ListeTicketRouteProp = RouteProp<RootStackParamList, 'ListeTicket'>;
type ListeTicketNavigationProp = StackNavigationProp<RootStackParamList, 'ListeTicket'>;

export type ListeTicketProp = {
    route: ListeTicketRouteProp;
    navigation: ListeTicketNavigationProp;
}



type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;
type ScannerNavigationProp = StackNavigationProp<RootStackParamList, 'Scanner'>;

export type ScannerProp = {
    route: ScannerRouteProp;
    navigation: ScannerNavigationProp;
}

export const Stack = createStackNavigator<RootStackParamList>();