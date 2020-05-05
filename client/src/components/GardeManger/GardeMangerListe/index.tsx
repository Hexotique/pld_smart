import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Item from '../GardeMangerItem'
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable';
import { recupererContenuGardeMangerGet, GardeMangerJson, itemGardeMangerJson } from '../../../api'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

import ItemListe from '../../ItemListe';

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


    const boutonSupprimer = (
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
        </React.Fragment>);

    return (
        <View style={styles.container}>
            <View style={styles.ajoutProduit}>
                <TextInput placeholder="Ajoutez un item" style={styles.ajoutProduitTexte}></TextInput>
            </View>
            <FlatList
                contentContainerStyle={{ paddingBottom: 140 }}
                data={keyArrayState}
                renderItem={({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <Categorie item={item} couleur="#f3a993"></Categorie>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    data={itemMapState.get(item)}
                                    keyExtractor={(itemValue) => itemValue.idItem}
                                    renderItem={({ item }) =>
                                        <ItemListe
                                            permetDefile={() => {}}
                                            enleveItem={() => {}}
                                            droite={boutonSupprimer}
                                        >
                                            <View style={styles.vueItem}>
                                                <View style={styles.nomItemConteneur}>
                                                    <Text style={styles.nomItem}>{item.produit.nom}</Text>
                                                </View>

                                                <View style={styles.changerQuantite}>
                                                    <TouchableOpacity style={styles.boutonQuantite} onPress={() => _decreaseItemQuantity(quantiteState, setQuantiteState)}>
                                                        <Image style={styles.icon} source={require('../../../assets/moins-icon.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.quantiteItem}>{}</Text>
                                                <View style={styles.changerQuantite} >
                                                    <TouchableOpacity style={styles.boutonQuantite} onPress={() => _increaseItemQuantity(quantiteState, setQuantiteState)}>
                                                        <Image style={styles.icon} source={require('../../../assets/plus-icon.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </ItemListe>
                                    }
                                />
                            </CollapseBody>
                        </Collapse>
                    </View>
                }
            />
        </View >
    );
}

export default GardeMangerListe;
