import React, { useState } from 'react';
import { SafeAreaView, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { TextInput } from 'react-native-gesture-handler';

function ListeCourse({ route, navigation }: ListeCourseProp) {
    const [texteAjout, setTexteAjout] = useState("");
    const [setItems, setSetItems] = useState(new Set());
    const [listeItems, setListeItems] = useState([] as Array<{id: string, checked: boolean}>);

    const onSubmitHandler = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (e.nativeEvent.text && !setItems.has(e.nativeEvent.text)) {
            setListeItems(prevListe => {
                prevListe.unshift({
                    id: e.nativeEvent.text,
                    checked: false
                });
                return prevListe;
            });
            setSetItems(prevSet => {
                prevSet.add(e.nativeEvent.text);
                return prevSet;
            })
            setTexteAjout("");
        }
    }

    const enleveItem = (id: string) => {
        setListeItems(prevListe => prevListe.filter(item => item.id !== id));
        setSetItems(prevSet => {
            prevSet.delete(id);
            return prevSet;
        })
    }

    return (
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
            <BarreNavigation navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} indexe={1} />
        </GestureRecognizer>
    );
}

const navGauche = (nav: any) => {
    nav.navigate('GardeManger');
}

const navDroite = (nav: any) => {
    nav.navigate('ListeTicket')
}

export default ListeCourse;