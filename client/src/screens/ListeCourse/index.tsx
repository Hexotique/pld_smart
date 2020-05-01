import React, { Fragment, useState } from 'react';
import { SafeAreaView, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { TextInput } from 'react-native-gesture-handler';
import ItemListe from '../../components/ItemListe';
import { CheckBox } from 'react-native-elements';

function ListeCourse({ route, navigation }: ListeCourseProp) {
    const listData = [
        { key: "Yaourts" },
        { key: "Miel" },
        { key: "Chips" }
    ];

    const [texteAjout, setTexteAjout] = useState("");
    const [listeItems, setListeItems] = useState(listData);

    const onSubmitHandler = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (e.nativeEvent.text) {
            let temp = listeItems.slice();
            temp.unshift({ key: e.nativeEvent.text });
            setListeItems(temp);
            setTexteAjout("");
        }
    }

    const onGlisseDroitHandler = () => {

    }

    const onCheckHandler = () => {

    }

    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => { navGauche(navigation) }}
            onSwipeLeft={() => { navDroite(navigation) }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={1} />
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
                    items={listeItems}
                    renderItems={({ item, index }) => (
                        <ItemListe
                            texte={item.key}
                            permetDefile={() => { }}
                            droite={
                                <Fragment>
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
                                </Fragment>
                            }
                            droiteHandler={onGlisseDroitHandler}
                        >
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <CheckBox
                                    wrapperStyle={{
                                        alignSelf: 'flex-start',
                                        marginRight: -100
                                    }}
                                    checkedColor="red"
                                    checked
                                />
                                <Text
                                    style={{
                                        flex: 1,
                                        fontFamily: "Comfortaa",
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        color: '#434343',
                                        textAlign: 'center'
                                    }}
                                >{item.key}</Text>
                            </View>
                        </ItemListe>
                    )}
                />
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