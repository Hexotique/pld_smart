import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData, View, AppState, Dimensions } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

import { achat_regulier_get } from '../../api';
import BoutonRond from '../../components/ComposantsGénériques/BoutonRond';


function ListeCourse({ route, navigation }: ListeCourseProp) {
    //const contexte: ContexteProp = useContext(Contexte);
    const [listeRec, setListeRec] = useState([""]);
    const [modalVisible, setModalVisible] = useState(false);
    const [texteAjout, setTexteAjout] = useState("");
    const [setItems, setSetItems] = useState(new Set());
    const [listeItems, setListeItems] = useState([] as Array<{ id: string, checked: boolean }>);

    const recupStorage = async () => {
        try {
            const liste = await AsyncStorage.getItem("listeCourse");
            const set = await AsyncStorage.getItem("setItems");
            if (liste && set) {
                setListeItems(JSON.parse(liste));
                setSetItems(new Set(JSON.parse(set)));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const modifStorage = async () => {
        try {
            await AsyncStorage.setItem("listeCourse", JSON.stringify(listeItems));
            await AsyncStorage.setItem("setItems", JSON.stringify(Array.from(setItems)));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        //AsyncStorage.removeItem("listeCourse");
        //AsyncStorage.removeItem("setItems");
        recupStorage();
        achat_regulier_get().then((response) => {
            let tempListe: Array<string> = [];
            response.ListeCourse.forEach((element: any) => {
                tempListe.push(element.nom);
            });
            setListeRec(tempListe);
        });
    }, []);

    useEffect(() => {
        modifStorage();
    }, [setItems, listeItems])


    const ajoutItem = (nomProduit: string) => {
        if (!setItems.has(nomProduit)) {
            setListeItems(prevListe => {
                prevListe.unshift({
                    id: nomProduit,
                    checked: false
                });
                modifStorage();
                return prevListe;
            });
            setSetItems(prevSet => {
                prevSet.add(nomProduit);
                modifStorage();
                return prevSet;
            });
            setTexteAjout("");
        }
    }

    const onSubmitHandler = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (e.nativeEvent.text) {
            ajoutItem(e.nativeEvent.text);
        }
    }

    const enleveItem = (id: string) => {
        setListeItems(prevListe => prevListe.filter(item => item.id !== id));
        setSetItems(prevSet => {
            prevSet.delete(id);
            return prevSet;
        });
    }

    const recHandler = () => {
        listeRec.forEach((rec) => ajoutItem(rec));
        setModalVisible(false);
    }

    return (
        <React.Fragment>
            <GestureRecognizer
                style={{ flex: 1 }}
                onSwipeRight={() => { navGauche(navigation) }}
                onSwipeLeft={() => { navDroite(navigation) }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Header indexe={1} />
                    <View style={{ flex: 90 }}>
                        <TextInput
                            style={{
                                height: 50,
                                backgroundColor: "#fff2ee",
                                textAlign: 'center'
                            }}
                            placeholder="Ajoutez un item..."
                            value={texteAjout}
                            onChangeText={setTexteAjout}
                            onSubmitEditing={onSubmitHandler}
                        />
                        <ListeGlissable
                            donnee={listeItems}
                            setDonnee={setListeItems}
                            enleveItem={enleveItem}
                            droite={
                                <React.Fragment>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='clip'
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontFamily: 'Sans Serif'
                                        }}
                                    >
                                        SUPPRIMER
                                </Text>
                                </React.Fragment>
                            }
                        />
                    </View>
                </SafeAreaView>
                <BarreNavigation
                    navGauche={() => navGauche(navigation)}
                    navDroite={() => navDroite(navigation)}
                    indexe={1}
                    boutonCentre={() => setModalVisible(true)}
                />
            </GestureRecognizer>
            <Modal
                isVisible={modalVisible}
                backdropColor="grey"
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{
                    padding: 30,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 20,
                    elevation: 5
                }}>
                    <Text style={{
                        padding: 20,
                        textAlign: 'center',
                        color: 'rgba(217,31,31,1)',
                        fontFamily: 'Comfortaa-Bold'
                    }}>
                        Nous avons établi des recommandations basées sur vos achats réguliers. Voulez-vous les ajouter à la liste de courses ?
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: 'center',
                        width: Dimensions.get("screen").width
                    }}>
                        <BoutonRond icon={'check'} couleur={'rgba(217,31,31,1)'} rayon={50} fonction={recHandler} />
                        <BoutonRond icon={'close'} couleur={'rgba(217,31,31,1)'} rayon={50} fonction={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    );
}

const navGauche = (nav: any) => {
    nav.navigate('GardeManger');
}

const navDroite = (nav: any) => {
    nav.navigate('ListeTicket')
}

export default ListeCourse;