
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import { recupererContenuGardeMangerGet, GardeMangerJson, itemGardeMangerJson } from '../../api';
import { GardeMangerProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { ContexteProp, Contexte } from '../../contexte'


function GardeManger({ route, navigation }: GardeMangerProp) {


    const contexte: ContexteProp = useContext(Contexte);

    const [listeQuantites, setListeQuantites] = useState(new Map<String, number>());

    const [keyArrayState, setKeyArrayState] = useState(new Array<String>());
    const [itemMapState, setItemMapState] = useState(new Map<String, Array<itemGardeMangerJson>>());
    const [rafraichirFlatList, setRafraichirFlatList] = useState(false);
    const [enableScroll, setEnableScroll] = useState(true);

    const enleveItem = (nomCategorie: string, idItem: string) => {
        setItemMapState(itemMapState => {
            const tableauItems: Array<itemGardeMangerJson> | undefined = itemMapState.get(nomCategorie);
            if (tableauItems) {
                console.log(tableauItems);
                const indexASupprimer: number = tableauItems.findIndex((item: itemGardeMangerJson) => item.idItem === idItem);
                console.log(indexASupprimer);
                if (indexASupprimer !== undefined) {
                    tableauItems.splice(indexASupprimer, 1);
                }
            }

            return itemMapState;
        });
        setRafraichirFlatList(!rafraichirFlatList);
    }
    

    useEffect(() => {
        recupererContenuGardeMangerGet()
            .then((data: GardeMangerJson) => {
                const itemMap: Map<String, Array<itemGardeMangerJson>> = new Map<String, Array<itemGardeMangerJson>>();
                data.items.forEach((item: itemGardeMangerJson) => {
                    if (!itemMap.has(item.produit.categorie.nomCategorie)) {
                        const itemList: Array<itemGardeMangerJson> = [];
                        itemList.push(item);
                        itemMap.set(item.produit.categorie.nomCategorie, itemList);
                    } else {
                        const itemMapGet = itemMap.get(item.produit.categorie.nomCategorie);
                        if (itemMapGet) {
                            itemMapGet.push(item);
                        }
                    }
                });
                const keyArray: Array<String> = Array.from(itemMap.keys());

                setKeyArrayState(keyArray);
                setItemMapState(itemMap);

            }).catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <GestureRecognizer
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={2} />
                <GardeMangerListe categories={keyArrayState} itemMap={itemMapState} enleveItem = {enleveItem} rafraichirFlatList={rafraichirFlatList}></GardeMangerListe>
            </SafeAreaView>
            <BarreNavigation indexe={2} navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} boutonCentre={() => { actionCentre(navigation) }} />
        </GestureRecognizer>
    );
}

function actionCentre(nav: any) {
    nav.navigate('Scanner');
}

const navGauche = (nav: any) => {
    nav.navigate('ListeTicket');
}
const navDroite = (nav: any) => {
    nav.navigate('ListeCourse')
}



export default GardeManger;

