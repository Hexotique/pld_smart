import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import GardeMangerJson from '../../../../gardemanger.json'
import Item from '../GardeMangerItem'
import Categorie from '../GardeMangerCategorie'

function GardeMangerListe() {
    const itemMap: Map<String, Array<any>> = new Map<String, Array<any>>();
    GardeMangerJson.GardeManger.items.forEach((item: any) => {
        if (!itemMap.has(item.produit.categorieproduit.nom)) {
            const itemList: Array<any> = [];
            itemList.push(item);
            itemMap.set(item.produit.categorieproduit.nom, itemList);
        } else {
            const itemMapGet = itemMap.get(item.produit.categorieproduit.nom);
            if (itemMapGet) {
                itemMapGet.push(item);
            }
        }
    });
    const keyArray: Array<String> = Array.from(itemMap.keys());
    console.log(itemMap);
    return (
        <View>
            <FlatList
                data={keyArray}
                keyExtractor={(itemKey) => itemKey.toString()}
                renderItem={({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <Categorie item={item}></Categorie>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    data={itemMap.get(item)}
                                    keyExtractor={(itemValue) => itemValue.id_item.toString()}
                                    renderItem={({ item }) =>
                                        <Item item={item}></Item>
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
