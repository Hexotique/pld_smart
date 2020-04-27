import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import GardeMangerJson from '../../../../gardemanger.json'
import Item from '../GardeMangerItem'
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable'

function GardeMangerListe() {
    const itemMap: Map<String, Array<any>> = new Map<String, Array<any>>();
    GardeMangerJson.items.forEach((item: any) => {
        if (!itemMap.has(item.produit.categorie.nomCategorie)) {
            const itemList: Array<any> = [];
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
    console.log(itemMap);
    const [enableScroll, setEnableScroll] = useState(true);
    return (
        <View>
            <FlatList
                data         = {keyArray}
                keyExtractor = {(itemKey) => itemKey.toString()}
                renderItem   = {({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <Categorie item = {item}></Categorie>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    data         = {itemMap.get(item)}
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
