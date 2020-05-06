import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, Vibration } from 'react-native';
import Toast from 'react-native-simple-toast';
import { StatusBar } from 'react-native';



import { Tab } from './navigator';
import { Contexte, ContexteProp } from './contexte';
import { inscription_client_put, Client, connexion_client_post, setToken } from './api';
import GardeManger from "./screens/GardeManger";
import ListeCourse from "./screens/ListeCourse";
import ListeTicket from "./screens/ListeTicket";
import Connexion from "./screens/Connexion";
import Inscription from "./screens/Inscription";
import Scanner from './screens/Scanner';


type action = {
    type: string;
    [key: string]: any;
}



export default function App() {

    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');

    //On crée un state globale de l'application (on peut le faire évoluer)
    //On utilise use reducer car ça permet de gérer différentes actions 
    //et de faire intervenir l'état précedent si besion

    const setClient = async (client: any) => {
        try {
            if (client) {
                await AsyncStorage.setItem("email", client.email);
                await AsyncStorage.setItem("nomComplet", client.nomComplet);
                await AsyncStorage.setItem("token", client.token);
            } else {
                await AsyncStorage.removeItem("email");
                await AsyncStorage.removeItem("nomComplet");
                await AsyncStorage.removeItem("token");
            }
        } catch (e) {
            console.error(e);
        }
    }

    const [state, updateState] = React.useReducer(
        (prevState: any, action: action) => {
            console.log(prevState);
            switch (action.type) {
                //Au lancement de l'app pour récupérer le token dans le cach de l'app
                case 'RESTORE_CLIENT':
                    setToken(action.token);
                    return {
                        ...prevState,
                        email: action.email,
                        nomComplet: action.nomComplet,
                        token: action.token,
                        chargement: false
                    };
                //A la connexion ou l'inscription ou au premier démarage de l'app
                case 'SIGN_IN':
                    setToken(action.token);
                    setClient({
                        email: action.email,
                        nomComplet: action.nomComplet,
                        token: action.token
                    });
                    return {
                        ...prevState,
                        email: action.email,
                        nomComplet: action.nomComplet,
                        token: action.token
                    };
                //A la deconnecion
                case 'SIGN_OUT':
                    setClient(null);
                    return {
                        ...prevState,
                        email: null,
                        nomComplet: null,
                        token: null
                    };
            }
        },
        {
            // Rajouter des proprietes du state ici
            chargement: true,
            token: null,
            email: null,
            nomComplet: null
        }
    );

    const getClient = async () => {
        try {
            const email = await AsyncStorage.getItem("email");
            const nomComplet = await AsyncStorage.getItem("nomComplet");
            const token = await AsyncStorage.getItem("token");
            updateState({ type: 'RESTORE_CLIENT', email, nomComplet, token });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getClient();
    }, []);

    // Quand on lance l'app ça s'exécute de manière asynchrone


    const connexion = async (nouveauClient: Client) => {
        console.log(nouveauClient);
        connexion_client_post(nouveauClient)
            .then((client) => {
                if (client === null) {
                    Toast.show('connexion impossible', Toast.SHORT);
                    Vibration.vibrate([0, 80, 80, 80])
                } else {
                    const nouveauClient = {
                        email: client.email,
                        nomComplet: `${client.prenom} ${client.nom}`,
                        token: client.token
                    }
                    updateState({ type: 'SIGN_IN', ...nouveauClient });
                    setClient(nouveauClient);
                }
            })
            .catch((error) => {
                console.log('Connexion failed');
            });
    }

    const deconnexion = () => updateState({
        type: 'SIGN_OUT',
    });

    const inscription = async (nouveauClient: Client) => {
        console.log(nouveauClient);
        inscription_client_put(nouveauClient)
            .then((client) => {
                if (client === null) {
                    Toast.show('Inscription impossible', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else {
                    const nouveauClient = {
                        email: client.email,
                        nomComplet: `${client.prenom} ${client.nom}`,
                        token: client.token
                    }
                    updateState({ type: 'SIGN_IN', ...nouveauClient });
                    setClient(nouveauClient);
                }
            })
            .catch((error) => {
                console.log('Inscription failed');
            });
    }

    // On crée un contexte de l'app pour rendre la modification du state de l'app accessible partout
    // On utilise useMemo car ça permet de faire moins de calculs mais j'ai pas tout compris cf https://fr.reactjs.org/docs/hooks-reference.html#usememo
    const authContext: ContexteProp = React.useMemo(
        () => ({
            connexion,
            deconnexion, // déconnexion basique, faut peut être sortir le token du cache ?
            inscription,
            email: "",
            nomComplet: "",
            token: ""
        }),
        []
    );

    // Rendu de l'app
    return (
        state.chargement ?
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 100, width: 100 }} source={require('./assets/load.gif')}></Image>
            </View>
            :
            <Contexte.Provider value={{ ...authContext, email: state.email, nomComplet: state.nomComplet, token: state.token }}>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
                        {state.token ?
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