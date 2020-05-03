import 'react-native-gesture-handler';
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// V2
// import AsyncStorage from '@react-native-community/async-storage';
import { Tab } from './app-navigator';

// V0
//import { Tab } from "./navigator";


// V1
// import { TabPrincipal } from './Navigators/EcransPricipaux';
// import { StackAuthentification } from './Navigators/InscriptionConnexion';
// import { StackGardeManger } from './Navigators/FonctionsGardeManger';
// import { StackGlobale } from './Navigators/SwitchPrincipal';

import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";
import Connexion from "./screens/Connexion";
import Inscription from "./screens/Inscription";
import Scanner from './screens/Scanner';

import ProfilClient from './screens/ProfilClient';

export default function App() {
    const [chargement, setChargement] = useState(false);
    const [tokenUtilisateur, setTokenUtilisateur] = useState(true);
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ tabBarVisible: true }}>
                {tokenUtilisateur ?
                    (<>
                        <Tab.Screen name='GardeManger' component={GardeManger} />
                        <Tab.Screen name='ListeCourse' component={ListeCourse} />
                        <Tab.Screen name='ListeTicket' component={ListeTicket} />
                        <Tab.Screen name='Scanner' component={Scanner} />
                        <Tab.Screen name='Profile' component={ProfilClient} />
                    </>) : (<>
                        <Tab.Screen name='Connexion' component={Connexion} />
                        <Tab.Screen name='Inscription' component={Inscription} />
                    </>
                    )
                }
            </Tab.Navigator>





            {/* V1 avec de nested navigation */}
            {/* <StackGlobale.Navigator initialRouteName="Authentification" screenOptions={{ headerShown: false }}>
                <StackGlobale.Screen name="App" component={buildMainTab} />
                <StackGlobale.Screen name="Authentification" component={buildAuthStack} />
            </StackGlobale.Navigator> */}


            {/* V0 de teck */}
            {/* <Tab.Navigator initialRouteName="ListeCourse" screenOptions={{ tabBarVisible: true }}>
                <Tab.Screen name="GardeManger" component={GardeManger} />
                <Tab.Screen name="ListeCourse" component={ListeCourse} />
                <Tab.Screen name="ListeTicket" component={ListeTicket} />
                <Tab.Screen name="Connexion" component={Connexion} />
                <Tab.Screen name="Inscription" component={Inscription} />
                <Tab.Screen name="Scanner" component={Scanner} />
                <Tab.Screen name="ProfilClient" component={ProfilClient} />
            </Tab.Navigator> */}
        </NavigationContainer>
    );
}

// V1 suite
// function buildMainTab() {
//     return (
//         < TabPrincipal.Navigator initialRouteName="ListeCourse" screenOptions={{ tabBarVisible: false }}>
//             <TabPrincipal.Screen name="GardeManger" component={buildGardeMangerStack} />
//             <TabPrincipal.Screen name="ListeCourse" component={ListeCourse} />
//             <TabPrincipal.Screen name="ListeTicket" component={ListeTicket} />
//         </ TabPrincipal.Navigator >
//     )
// }

// function buildAuthStack() {
//     return (
//         <StackAuthentification.Navigator initialRouteName="Connexion" screenOptions={{ headerShown: false }}>
//             <StackAuthentification.Screen name="Connexion" component={Connexion} />
//             <StackAuthentification.Screen name="Inscription" component={Inscription} />
//         </StackAuthentification.Navigator>
//     )
// }

// function buildGardeMangerStack() {
//     return (
//         <StackGardeManger.Navigator initialRouteName='GardeManger' screenOptions={{ headerShown: false }}>
//             <StackGardeManger.Screen name='GardeManger' component={GardeManger} />
//             <StackGardeManger.Screen name='Scanner' component={Scanner} />
//         </StackGardeManger.Navigator>
//     )
// }