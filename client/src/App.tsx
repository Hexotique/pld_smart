import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Stack } from "./navigator";
import Header from "./components/ComposantsGénériques/Header";

import Accueil from "./screens/Accueil";
import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";
import TicketDetail from "./screens/TicketDetail";

import styles, { navOptions } from "./styles";

export default function App() {
    return (
        <NavigationContainer>
            <Header />
            <Stack.Navigator initialRouteName = "Accueil">
            <Stack.Screen    options          = {navOptions} name = "Accueil" component      = {Accueil} />
            <Stack.Screen    options          = {navOptions} name = "GardeManger" component  = {GardeManger} />
            <Stack.Screen    options          = {navOptions} name = "ListeCourse" component  = {ListeCourse} />
            <Stack.Screen    options          = {navOptions} name = "ListeTicket" component  = {ListeTicket} />
            <Stack.Screen    options          = {navOptions} name = "TicketDetail" component = {TicketDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}