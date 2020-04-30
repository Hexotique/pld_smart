import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Item from '../GardeMangerItem'
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable';
import {recupererContenuGardeMangerGet, GardeMangerJson, itemGardeMangerJson} from '../../../api'
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

function GardeMangerListe() {
    const [keyArrayState, setKeyArrayState] = useState(new Array<String>());
    const [itemMapState, setItemMapState] = useState(new Map<String, Array<itemGardeMangerJson>>());
    const [enableScroll, setEnableScroll] = useState(true);
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
        <View style={styles.container}>
            <View style={styles.ajoutProduit}>
                <TextInput placeholder="Ajoutez un item" style={styles.ajoutProduitTexte}></TextInput>
            </View>
            <FlatList
                data         = {keyArrayState}
                keyExtractor = {(itemKey) => itemKey.toString()}
                renderItem   = {({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <Categorie item = {item}></Categorie>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    data         = {itemMapState.get(item)}
                                    keyExtractor = {(itemValue) => itemValue.idItem.toString()}
                                    renderItem   = {({ item }) =>
                                        <Item item = {item} toggleScroll={setEnableScroll}></Item>
                                    }
                                />
                            </CollapseBody>
                        </Collapse>
                    </View>
                }
            />
        </View>
    );
}

export default GardeMangerListe;
