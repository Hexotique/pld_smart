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

// options          = {navOptions}
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="ListeCourse" screenOptions={{ tabBarVisible: false }}>
                <Tab.Screen name="GardeManger" component={GardeManger} />
                <Tab.Screen name="ListeCourse" component={ListeCourse} />
                <Tab.Screen name="ListeTicket" component={ListeTicket} />
                <Tab.Screen name="Connexion" component={Connexion} />
                <Tab.Screen name="Inscription" component={Inscription} />
            </Tab.Navigator>
            {/* <Stack.Navigator initialRouteName = "Accueil" screenOptions={{headerShown: false}}>
            <Stack.Screen    options          = {navOptions} name = "Accueil" component      = {Accueil} />
            <Stack.Screen    options          = {navOptions} name = "Connexion" component    = {Connexion} />
            <Stack.Screen    options          = {navOptions} name = "Inscription" component  = {Inscription} />
            <Stack.Screen    options          = {navOptions} name = "GardeManger" component  = {GardeManger} />
            <Stack.Screen    options          = {navOptions} name = "ListeCourse" component  = {ListeCourse} />
            <Stack.Screen    options          = {navOptions} name = "ListeTicket" component  = {ListeTicket} />
            <Stack.Screen    options          = {navOptions} name = "TicketDetail" component = {TicketDetail} />
            </Stack.Navigator> */}
        </NavigationContainer>
    );
}