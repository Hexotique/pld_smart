import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootStackPrincipaleParamLists = {
    GardeManger: undefined;
    ListeCourse: undefined;
    ListeTicket: undefined;
}

type GardeMangerRouteProp = RouteProp<RootStackPrincipaleParamLists, 'GardeManger'>;
type GardeMangerNavigationProp = BottomTabNavigationProp<RootStackPrincipaleParamLists, 'GardeManger'>;

export type GardeMangerProp = {
    route: GardeMangerRouteProp;
    navigation: GardeMangerNavigationProp;
}

type ListeCourseRouteProp = RouteProp<RootStackPrincipaleParamLists, 'ListeCourse'>;
type ListeCourseNavigationProp = BottomTabNavigationProp<RootStackPrincipaleParamLists, 'ListeCourse'>;

export type ListeCourseProp = {
    route: ListeCourseRouteProp;
    navigation: ListeCourseNavigationProp;
}

type ListeTicketRouteProp = RouteProp<RootStackPrincipaleParamLists, 'ListeTicket'>;
type ListeTicketNavigationProp = BottomTabNavigationProp<RootStackPrincipaleParamLists, 'ListeTicket'>;

export type ListeTicketProp = {
    route: ListeTicketRouteProp;
    navigation: ListeTicketNavigationProp;
}

export const TabPrincipal = createBottomTabNavigator<RootStackPrincipaleParamLists>();