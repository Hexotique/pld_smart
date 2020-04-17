import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Stack } from "./navigator";
import Header from "./components/Header";

import Accueil from "./screens/Accueil";
import ListeCourse from "./screens/ListeCourse";

import styles, { navOptions } from "./styles";

export default function App() {
    return (
        <NavigationContainer>
            <Header />
            <Stack.Navigator initialRouteName="Accueil">
                <Stack.Screen options={navOptions} name="Accueil" component={Accueil} />
                <Stack.Screen options={navOptions} name="ListeCourse" component={ListeCourse} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}