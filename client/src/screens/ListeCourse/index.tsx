import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData, View, Dimensions, Image } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Alerte } from '../../components/ComposantsGénériques/Alerte';

import { achat_regulier_get } from '../../api';

import { ContexteProp, Contexte } from '../../contexte';


function ListeCourse({ route, navigation }: ListeCourseProp) {
    const contexte: ContexteProp = useContext(Contexte);
    const [listeRec, setListeRec] = useState([""]);
    const [modalVisible, setModalVisible] = useState(false);
    const [texteAjout, setTexteAjout] = useState("");
    const [setItems, setSetItems] = useState(new Set());
    const [listeItems, setListeItems] = useState([] as Array<{ id: string, checked: boolean }>);
    const [chargement, setChargement] = useState(false);

    const recupStorage = async () => {
        setChargement(true);
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
        setChargement(false);

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
                    {chargement ?
                        (<>
                            <View style={{ flex: 90, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: '40%', resizeMode: 'contain', marginBottom: '20%' }} source={require('../../assets/load.gif')}></Image>
                            </View>
                        </>) : (<>
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
                        </>
                        )
                    }
                </SafeAreaView>
                <BarreNavigation
                    navGauche={() => navGauche(navigation)}
                    navDroite={() => navDroite(navigation)}
                    indexe={1}
                    boutonCentre={() => setModalVisible(true)}
                />
            </GestureRecognizer>
            <Alerte
                visible={modalVisible}
                setVisible={setModalVisible}
                texte="Nous avons établi des recommandations basées sur vos achats réguliers. Voulez-vous les ajouter à la liste de courses ?"
                couleur='rgba(217,31,31,1)'
                funcValide={recHandler}
                funcAnnule={() => setModalVisible(false)}
            />
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