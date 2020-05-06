import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Connexion: undefined;
    Inscription: undefined;
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
    Scanner: undefined;
    Profile: undefined;
}

type ConnexionRouteProp = RouteProp<RootStackParamList, 'Connexion'>;
type ConnexionNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Connexion'>;

export type ConnexionProp = {
    route: ConnexionRouteProp;
    navigation: ConnexionNavigationProp;
}

type InscriptionRouteProp = RouteProp<RootStackParamList, 'Inscription'>;
type InscriptionNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Inscription'>;

export type InscriptionProp = {
    route: InscriptionRouteProp;
    navigation: InscriptionNavigationProp;
}

type GardeMangerRouteProp = RouteProp<RootStackParamList, 'GardeManger'>;
type GardeMangerNavigationProp = BottomTabNavigationProp<RootStackParamList, 'GardeManger'>;

export type GardeMangerProp = {
    route: GardeMangerRouteProp;
    navigation: GardeMangerNavigationProp;
}

type ListeCourseRouteProp = RouteProp<RootStackParamList, 'ListeCourse'>;
type ListeCourseNavigationProp = BottomTabNavigationProp<RootStackParamList, 'ListeCourse'>;

export type ListeCourseProp = {
    route: ListeCourseRouteProp;
    navigation: ListeCourseNavigationProp;
}

type ListeTicketRouteProp = RouteProp<RootStackParamList, 'ListeTicket'>;
type ListeTicketNavigationProp = BottomTabNavigationProp<RootStackParamList, 'ListeTicket'>;

export type ListeTicketProp = {
    route: ListeTicketRouteProp;
    navigation: ListeTicketNavigationProp;
}

type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;
type ScannerNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Scanner'>;

export type ScannerProp = {
    route: ScannerRouteProp;
    navigation: ScannerNavigationProp;
}

export const Tab = createBottomTabNavigator<RootStackParamList>();
