import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import {
    recupererContenuGardeMangerGet,
    modifier_quantite_post,
    GardeMangerJson,
    ModificationJson,
    itemGardeMangerJson,
    recuperer_produits_get,
    Produits,
    Produit,
    ajouter_produit_alamano_put,
    AjoutJson
} from '../../api';
import { RootStackParamList } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ContexteProp, Contexte } from '../../contexte';


type GardeMangerProps = {
    navigation: BottomTabNavigationProp<RootStackParamList, "GardeManger">;
}

function GardeManger(props: GardeMangerProps) {

    const contexte: ContexteProp = useContext(Contexte);

    const [keyArrayState, setKeyArrayState] = useState(new Array<String>());
    const [itemMapState, setItemMapState] = useState(new Map<String, Array<itemGardeMangerJson>>());
    const [rafraichirFlatList, setRafraichirFlatList] = useState(false);
    const [produits, setProduits] = useState(new Map<string, Produit>());
    const [chargement, setChargement] = useState(false);

    const enleveItem = (nomCategorie: string, idItem: string) => {
        // Rendu front
        console.log(`suppression item: ${idItem}`);
        setItemMapState(itemMapState => {
            const tableauItems: Array<itemGardeMangerJson> | undefined = itemMapState.get(nomCategorie);
            if (tableauItems) {
                const indexASupprimer: number = tableauItems.findIndex((item: itemGardeMangerJson) => item.idItem === idItem);
                if (indexASupprimer !== undefined) {
                    tableauItems.splice(indexASupprimer, 1);
                }
            }

            return itemMapState;
        });
        setRafraichirFlatList(!rafraichirFlatList);
        // Mise à jour back
        const modificationsJson: ModificationJson = {
            modifications: [
                {
                    idItem: idItem,
                    quantite: 0
                }
            ]
        }
        modifier_quantite_post(modificationsJson);
    }

    const modifieQuantite = (nomCategorie: string, idItem: string, typeOperation: string) => {
        console.log(`modification quantité item: ${idItem}`);
        // Rendu front
        let nouvelleQuantite: number = 0;
        setItemMapState(itemMapState => {
            const tableauItems: Array<itemGardeMangerJson> | undefined = itemMapState.get(nomCategorie);
            if (tableauItems) {
                const indexASupprimer: number = tableauItems.findIndex((item: itemGardeMangerJson) => item.idItem === idItem);
                if (indexASupprimer !== undefined) {
                    if (typeOperation === '-' && tableauItems[indexASupprimer].quantite > 0) tableauItems[indexASupprimer].quantite --;
                    else if (typeOperation === '+') tableauItems[indexASupprimer].quantite ++;
                    nouvelleQuantite = tableauItems[indexASupprimer].quantite;
                }
            }
            return itemMapState;
        });
        setRafraichirFlatList(!rafraichirFlatList);
        // Mise à jour back
        const modificationsJson: ModificationJson = {
            modifications: [
                {
                    idItem: idItem,
                    quantite: nouvelleQuantite
                }
            ]
        }
        modifier_quantite_post(modificationsJson);
    }

    const ajouteProduit = (produit: Produit) => {
        console.log(`ajout produit : ${produit.nom}`);
        const ajouts: AjoutJson = {
            ajouts: [
                {
                    nomProduit: produit.nom,
                    quantite: 1
                }
            ]
        }
        ajouter_produit_alamano_put(ajouts).then(() => {
            chargerGardeManger();
        })
    }

    const chargerGardeManger = () => {
        console.log("chargement garde manger");
        setChargement(true);
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
                setChargement(false);
            }).catch((error) => {
                console.error(error);
            });

    }

    const recupererProduitsBDD = () => {
        console.log('chargement liste de produits');
        recuperer_produits_get()
            .then((produits: Produits) => {
                produits.Produits.forEach((produit: Produit) => {
                    setProduits(produits => produits.set(produit.idProduit, produit));
                })
            }).catch(error => {
                console.error(error);
            })
    }

    React.useEffect(() => {
        recupererProduitsBDD();
        const unsubscribe = props.navigation.addListener('focus', () => {
            chargerGardeManger();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <GestureRecognizer
            onSwipeRight={() => navGauche(props.navigation)}
            onSwipeLeft={() => navDroite(props.navigation)}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={2} />
                {chargement ?
                    (<>
                        <View style={{ flex: 90, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: '40%', resizeMode: 'contain', marginBottom: '20%' }} source={require('../../assets/load.gif')}></Image>
                        </View>
                    </>) : (<>
                        <GardeMangerListe
                            categories={keyArrayState}
                            itemMap={itemMapState}
                            enleveItem={enleveItem}
                            rafraichirFlatList={rafraichirFlatList}
                            modifieQuantite={modifieQuantite}
                            produits={produits}
                            ajouteProduit={ajouteProduit}
                        >
                        </GardeMangerListe>
                    </>
                    )
                }
            </SafeAreaView>
            <BarreNavigation indexe={2} navGauche={() => navGauche(props.navigation)} navDroite={() => navDroite(props.navigation)} boutonCentre={() => { actionCentre(props.navigation) }} />
        </GestureRecognizer>
    );
}

const actionCentre = (nav: any) => {
    nav.navigate('Scanner');
}

const navGauche = (nav: any) => {
    nav.navigate('ListeTicket');
}

const navDroite = (nav: any) => {
    nav.navigate('ListeCourse');
}



export default GardeManger;

