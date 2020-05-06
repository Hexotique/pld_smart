import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type RootStackGardeMangerParamListe = {
    GardeManger: undefined;
    Scanner: undefined;
}

type GardeMangerRouteProp = RouteProp<RootStackGardeMangerParamListe, 'GardeManger'>;
type GardeMangerNavigationProp = StackNavigationProp<RootStackGardeMangerParamListe, 'GardeManger'>;

export type GardeMangerProp = {
    route: GardeMangerRouteProp;
    navigation: GardeMangerNavigationProp;
}

type ScannerRouteProp = RouteProp<RootStackGardeMangerParamListe, 'Scanner'>;
type ScannerNavigationProp = StackNavigationProp<RootStackGardeMangerParamListe, 'Scanner'>;

export type ScannerProp = {
    route: ScannerRouteProp;
    navigation: ScannerNavigationProp;
}

export const StackGardeManger = createStackNavigator<RootStackGardeMangerParamListe>();