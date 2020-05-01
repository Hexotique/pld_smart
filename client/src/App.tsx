import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Tab } from "./navigator";

import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";
import TicketDetail from "./screens/TicketDetail";
import Connexion from "./screens/Connexion";
import Inscription from "./screens/Inscription";

import styles, { navOptions } from "./styles";
import Scanner from './screens/Scaner';

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="ListeCourse" screenOptions={{ tabBarVisible: true }}>
                <Tab.Screen name="GardeManger" component={GardeManger} />
                <Tab.Screen name="ListeCourse" component={ListeCourse} />
                <Tab.Screen name="ListeTicket" component={ListeTicket} />
                <Tab.Screen name="Connexion" component={Connexion} />
                <Tab.Screen name="Inscription" component={Inscription} />
                <Tab.Screen name="Scanner" component={Scanner} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}