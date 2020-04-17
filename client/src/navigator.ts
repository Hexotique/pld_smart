
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
    Accueil: undefined;
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
    TicketDetail: undefined;     
}

type AccueilRouteProp = RouteProp<RootStackParamList, 'Accueil'>;
type AccueilNavigationProp = StackNavigationProp<RootStackParamList, 'Accueil'>;

export type AccueilProp = {
    route: AccueilRouteProp;
    navigation: AccueilNavigationProp;
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

type TicketDetailRouteProp = RouteProp<RootStackParamList, 'TicketDetail'>;
type TicketDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TicketDetail'>;

export type TicketDetailProp = {
    route: TicketDetailRouteProp;
    navigation: TicketDetailNavigationProp;
}

export const Stack = createStackNavigator<RootStackParamList>();