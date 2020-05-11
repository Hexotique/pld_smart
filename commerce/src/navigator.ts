import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    ChoixCommerce: undefined;
    Scanner: undefined;
}

type ChoixCommerceRouteProp = RouteProp<RootStackParamList, 'ChoixCommerce'>;
type ChoixCommerceNavigationProp = StackNavigationProp<RootStackParamList, 'ChoixCommerce'>;

export type ChoixCommerceProp = {
    route: ChoixCommerceRouteProp;
    navigation: ChoixCommerceNavigationProp;
}



type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;
type ScannerNavigationProp = StackNavigationProp<RootStackParamList, 'Scanner'>;

export type ScannerProp = {
    route: ScannerRouteProp;
    navigation: ScannerNavigationProp;
}

export const Tab = createStackNavigator<RootStackParamList>();
