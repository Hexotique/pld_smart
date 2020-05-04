import 'react-native-gesture-handler';
import React, { useState, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import { Tab } from './navigator';
import { Contexte, ContexteProp } from './contexte';
import { inscription_client_put, Client, connexion_client_post } from './api';


import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";
import Connexion from "./screens/Connexion";
import Inscription from "./screens/Inscription";
import Scanner from './screens/Scanner';

import { View, Image } from 'react-native';

type action = {
    type: string;
    tokenUtilisateur: any;
}

export default function App() {

    //On crée un state globale de l'application (on peut le faire évoluer)
    //On utilise use reducer car ça permet de gérer différentes actions 
    //et de faire intervenir l'état précedent si besion
    const [state, updateState] = React.useReducer(
        (prevState: any, action: action) => {
            console.log(prevState);
            switch (action.type) {
                //Au lancement de l'app pour récupérer le token dans le cach de l'app
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        token: action.tokenUtilisateur,
                        chargement: false,
                    };
                //A la connexion ou l'inscription ou au premier démarage de l'app
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        deconnecte: false,
                        token: action.tokenUtilisateur,
                    };
                //A la deconnecion
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        deconnecte: true,
                        token: null,
                    };
            }
        },
        {
            // Rajouter des proprietes du state ici
            chargement: true,
            deconnecte: false,
            token: null,
        }
    );

    // Quand on lance l'app ça s'exécute de manière asynchrone
    useEffect(() => {
        AsyncStorage.getItem('Token') //Le cture du token dans le cache de l'app, renvoie null si absent
            .then((token) => {
                updateState({ type: 'RESTORE_TOKEN', tokenUtilisateur: token });
                console.log(token);
            })
            .catch((e) => {
                console.log('impossible de restaurer le token');
            })
    }, []);

    // On crée un contexte de l'app pour rendre la modification du state de l'app accessible partout
    // On utilise useMemo car ça permet de faire moins de calculs mais j'ai pas tout compris cf https://fr.reactjs.org/docs/hooks-reference.html#usememo
    const authContext: ContexteProp = React.useMemo(
        () => ({
            connexion: async (nouveauClient: Client) => {

                console.log(nouveauClient);
                connexion_client_post(nouveauClient)
                    .then((client) => {
                        updateState({ type: 'SIGN_IN', tokenUtilisateur: client.token });
                        console.log(client.token);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.error(error);
                    });
            },
            deconnexion: () => updateState({ type: 'SIGN_OUT', tokenUtilisateur: null }), // déconnexion basique, faut peut être sortir le token du cache ?
            inscription: async (nouveauClient: Client) => {

                console.log(nouveauClient);
                inscription_client_put(nouveauClient)
                    .then((client) => {
                        updateState({ type: 'SIGN_IN', tokenUtilisateur: client.token });
                    })
                    .catch((error) => {
                        console.log(error);
                        console.error(error);
                    });
            },
        }),
        []
    );

    // Affichage d'un écran de chargement pendant la lecture du cache
    if (state.chargement) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 100, width: 100 }} source={require('./assets/logo.png')}></Image>
            </View>
        )
    }

    // Rendu de l'app
    return (
        <Contexte.Provider value={authContext}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
                    {state.token !== null ?
                        (<>
                            {/*Ecrans accessibles quand le token est chargé donc quand on est connecté*/}
                            <Tab.Screen name='GardeManger' component={GardeManger} />
                            <Tab.Screen name='ListeCourse' component={ListeCourse} />
                            <Tab.Screen name='ListeTicket' component={ListeTicket} />
                            <Tab.Screen name='Scanner' component={Scanner} />
                        </>
                        ) : (<>
                            {/*Ecrans accessibles quand le token n'est pas chargé donc quand on est déconnecté*/}
                            <Tab.Screen name='Connexion' component={Connexion} />
                            <Tab.Screen name='Inscription' component={Inscription} />
                        </>
                        )
                    }
                </Tab.Navigator>
            </NavigationContainer>
        </Contexte.Provider>


    );
}