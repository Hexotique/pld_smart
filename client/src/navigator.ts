
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
    Accueil: undefined;
    ListeCourse: undefined;
}

type AccueilRouteProp = RouteProp<RootStackParamList, 'Accueil'>;
type AccueilNavigationProp = StackNavigationProp<RootStackParamList, 'Accueil'>;

export type AccueilProp = {
    route: AccueilRouteProp;
    navigation: AccueilNavigationProp;
}

type ListeCourseRouteProp = RouteProp<RootStackParamList, 'ListeCourse'>;
type ListeCourseNavigationProp = StackNavigationProp<RootStackParamList, 'ListeCourse'>;

export type ListeCourseProp = {
    route: ListeCourseRouteProp;
    navigation: ListeCourseNavigationProp;
}

export const Stack = createStackNavigator<RootStackParamList>();