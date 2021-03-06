import React, { useState, PropsWithChildren } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable';
import { itemGardeMangerJson, Produit } from '../../../api'
import styles from './styles';

import ItemListe from '../../ItemListe';
import { Alerte } from '../../../components/ComposantsGénériques/Alerte';

type GardeMangerListeProps = {
    categories: Array<String>,
    itemMap: Map<String, Array<itemGardeMangerJson>>,
    enleveItem: Function,
    modifieQuantite: Function,
    rafraichirFlatList: boolean,
    produits: Map<string, Produit>,
    ajouteProduit: Function
};

function GardeMangerListe(props: PropsWithChildren<GardeMangerListeProps>) {

    const [listeRechercheProduits, setListeRechercheProduits] = useState(new Array<Produit>());
    const [query, setQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selProduit, setSelProduit] = useState<Produit>({idProduit: "", nom: "", categorie: { idCategorie: "", nomCategorie: ""}});

    const trouverProduits = (query: string) => {
        //method called everytime when we change the value of the input
        let listeProduitsTemp: Array<Produit> = [];
        if (query === '') {
          //if the query is null then return blank
          setListeRechercheProduits(listeProduitsTemp);
          return;
        }
        
        props.produits.forEach((produit, idProduit) => {
            //making a case insensitive regular expression to get similar value from the list of products
            const regex = new RegExp(`${query.trim()}`, 'i');
            if (produit.nom.search(regex) >=0) listeProduitsTemp.push(produit);
        })
        
        //return the filtered film array according the query from the input
        setListeRechercheProduits(listeProduitsTemp);
    }

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
            <View style={[styles.ajoutProduit, {zIndex: (query.length === 0 ? 1 : 2)}]}>
                <Autocomplete
                    inputContainerStyle={styles.ajoutProduitConteneur}
                    containerStyle={styles.ajoutProduitAutocompletion}
                    style={styles.ajoutProduitTexte}
                    onChangeText={(text: string) => {setQuery(text); trouverProduits(query)}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    defaultValue={query}
                    keyExtractor={(item: Produit) => item.idProduit}
                    data={query.length > 0 ? listeRechercheProduits: []}
                    placeholder="Ajouter un item"
                    renderItem={({item}: any) => (
                        <View style={{flexDirection: "row", height: 45, justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity onPress={() => {
                                setSelProduit(item);
                                setModalVisible(true)}
                            }>
                                <Text>{item.nom}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <View style={[styles.listeGardeManger, {zIndex: (query.length === 0 ? 2 : 1)}]}>
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
            </View>
            <Alerte
                visible={modalVisible}
                setVisible={setModalVisible}
                texte={`Etes-vous sûr de vouloir ajouter : ${(selProduit as Produit).nom} à votre garde manger ?`}
                couleur='rgba(217,31,31,1)'
                funcValide={() => {
                    props.ajouteProduit(selProduit);
                    setQuery('');
                    setModalVisible(false);
                }}
                funcAnnule={() => setModalVisible(false)}
            />            
        </View >
    );
}

export default GardeMangerListe;
