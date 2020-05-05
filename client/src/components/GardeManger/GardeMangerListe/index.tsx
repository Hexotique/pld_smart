import React, { useState, useEffect, PropsWithChildren } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Item from '../GardeMangerItem'
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable';
import { recupererContenuGardeMangerGet, GardeMangerJson, itemGardeMangerJson, modifier_quantite_post } from '../../../api'
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

import ItemListe from '../../ItemListe';

type ItemListeProps = {
    categories: Array<String>,
    itemMap: Map<String, Array<itemGardeMangerJson>>,
    enleveItem: Function,
    modifieQuantite: Function,
    rafraichirFlatList: boolean
};

function GardeMangerListe(props: PropsWithChildren<ItemListeProps>) {



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
                extraData={props.rafraichirFlatList}
                contentContainerStyle={{ paddingBottom: 140 }}
                data={props.categories}
                keyExtractor={(itemValue) => itemValue.toString()}
                renderItem={({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <Categorie item={item} couleur="#f3a993"></Categorie>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    extraData={props.rafraichirFlatList}
                                    data={props.itemMap.get(item)}
                                    keyExtractor={(itemValue) => itemValue.idItem}
                                    renderItem={({ item }) =>
                                        <ItemListe
                                            permetDefile={() => {}}
                                            enleveItem={() => {props.enleveItem(item.produit.categorie.nomCategorie, item.idItem)}}
                                            droite={boutonSupprimer}
                                        >
                                            <View style={styles.vueItem}>
                                                <View style={styles.nomItemConteneur}>
                                                    <Text style={styles.nomItem}>{item.produit.nom}</Text>
                                                </View>

                                                <View style={styles.changerQuantite}>
                                                    <TouchableOpacity style={styles.boutonQuantite} onPress={() =>props.modifieQuantite(item.produit.categorie.nomCategorie, item.idItem, '-')}>
                                                        <Image style={styles.icon} source={require('../../../assets/moins-icon.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.quantiteItem}>{item.quantite}</Text>
                                                <View style={styles.changerQuantite} >
                                                    <TouchableOpacity style={styles.boutonQuantite} onPress={() => props.modifieQuantite(item.produit.categorie.nomCategorie, item.idItem, '+')}>
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
