
import { RouteProp, NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
    Accueil: undefined;
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
    TicketDetail: undefined;     
}

type AccueilRouteProp = RouteProp<RootTabParamList, 'Accueil'>;
type AccueilNavigationProp = StackNavigationProp<RootTabParamList, 'Accueil'>;

export type AccueilProp = {
    route: AccueilRouteProp;
    navigation: AccueilNavigationProp;
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

export const Tab = createBottomTabNavigator<RootTabParamList>();