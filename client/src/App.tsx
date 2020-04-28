import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Tab } from "./navigator";

import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";

import styles, { navOptions } from "./styles";

// options          = {navOptions}
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="ListeCourse" screenOptions={{tabBarVisible:false}}>
                <Tab.Screen name="GardeManger" component={GardeManger} />
                <Tab.Screen name="ListeCourse" component={ListeCourse} />
                <Tab.Screen name="ListeTicket" component={ListeTicket} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}