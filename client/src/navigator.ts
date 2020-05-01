
import { RouteProp, NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
    Accueil: undefined;
    Connexion: undefined;
    Inscription: undefined;
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
    TicketDetail: undefined;
    Scanner: undefined;
}

type AccueilRouteProp = RouteProp<RootTabParamList, 'Accueil'>;
type AccueilNavigationProp = StackNavigationProp<RootTabParamList, 'Accueil'>;

export type AccueilProp = {
    route: AccueilRouteProp;
    navigation: AccueilNavigationProp;
}

type ConnexionRouteProp = RouteProp<RootTabParamList, 'Connexion'>;
type ConnexionNavigationProp = StackNavigationProp<RootTabParamList, 'Connexion'>;

export type ConnexionProp = {
    route: ConnexionRouteProp;
    navigation: ConnexionNavigationProp;
}

type InscriptionRouteProp = RouteProp<RootTabParamList, 'Inscription'>;
type InscriptionNavigationProp = StackNavigationProp<RootTabParamList, 'Inscription'>;

export type InscriptionProp = {
    route: InscriptionRouteProp;
    navigation: InscriptionNavigationProp;
}

type GardeMangerRouteProp = RouteProp<RootTabParamList, 'GardeManger'>;
type GardeMangerNavigationProp = StackNavigationProp<RootTabParamList, 'GardeManger'>;

export type GardeMangerProp = {
    route: GardeMangerRouteProp;
    navigation: GardeMangerNavigationProp;
}

type ListeCourseRouteProp = RouteProp<RootTabParamList, 'ListeCourse'>;
type ListeCourseNavigationProp = StackNavigationProp<RootTabParamList, 'ListeCourse'>;

export type ListeCourseProp = {
    route: ListeCourseRouteProp;
    navigation: ListeCourseNavigationProp;
}

type ListeTicketRouteProp = RouteProp<RootTabParamList, 'ListeTicket'>;
type ListeTicketNavigationProp = StackNavigationProp<RootTabParamList, 'ListeTicket'>;

export type ListeTicketProp = {
    route: ListeTicketRouteProp;
    navigation: ListeTicketNavigationProp;
}

type TicketDetailRouteProp = RouteProp<RootTabParamList, 'TicketDetail'>;
type TicketDetailNavigationProp = StackNavigationProp<RootTabParamList, 'TicketDetail'>;

export type TicketDetailProp = {
    route: TicketDetailRouteProp;
    navigation: TicketDetailNavigationProp;
}

type ScannerRouteProp = RouteProp<RootTabParamList, 'TicketDetail'>;
type ScannerNavigationProp = StackNavigationProp<RootTabParamList, 'TicketDetail'>;

export type ScannerProp = {
    route: ScannerRouteProp;
    navigation: ScannerNavigationProp;
}

export const Tab = createBottomTabNavigator<RootTabParamList>();