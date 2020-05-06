
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import { recupererContenuGardeMangerGet,
        modifier_quantite_post,
        GardeMangerJson,
        ModificationJson,
        itemGardeMangerJson, 
        recuperer_produits_get,
        Produits,
        Produit} from '../../api';
import { GardeMangerProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { ContexteProp, Contexte } from '../../contexte'

const modifications: Map<string, number> = new Map<string, number>();
const ajouts: Map<string, string> = new Map<string, string>();

function GardeManger({ route, navigation }: GardeMangerProp) {


    const contexte: ContexteProp = useContext(Contexte);

    const [keyArrayState, setKeyArrayState] = useState(new Array<String>());
    const [itemMapState, setItemMapState] = useState(new Map<String, Array<itemGardeMangerJson>>());
    const [rafraichirFlatList, setRafraichirFlatList] = useState(false);
    const [nomsProduits, setNomsProduits] = useState(new Map<string, string>());

    

    const enleveItem = (nomCategorie: string, idItem: string) => {
        setItemMapState(itemMapState => {
            const tableauItems: Array<itemGardeMangerJson> | undefined = itemMapState.get(nomCategorie);
            if (tableauItems) {
                const indexASupprimer: number = tableauItems.findIndex((item: itemGardeMangerJson) => item.idItem === idItem);
                if (indexASupprimer !== undefined) {
                    tableauItems.splice(indexASupprimer, 1);
                    modifications.set(idItem, 0);
                }
            }

            return itemMapState;
        });
        console.log(modifications);
        setRafraichirFlatList(!rafraichirFlatList);
    }

    const modifieQuantite = (nomCategorie: string, idItem: string, typeOperation: string) => {
        setItemMapState(itemMapState => {
            const tableauItems: Array<itemGardeMangerJson> | undefined = itemMapState.get(nomCategorie);
            if (tableauItems) {
                const indexASupprimer: number = tableauItems.findIndex((item: itemGardeMangerJson) => item.idItem === idItem);
                console.log(indexASupprimer);
                if (indexASupprimer !== undefined) {
                    if(typeOperation === '-' && tableauItems[indexASupprimer].quantite > 0) tableauItems[indexASupprimer].quantite--;
                    else if(typeOperation === '+') tableauItems[indexASupprimer].quantite++;
                    modifications.set(idItem, tableauItems[indexASupprimer].quantite);
                }
            }
            return itemMapState;
        });
        console.log(modifications);
        setRafraichirFlatList(!rafraichirFlatList);
    }

    
    useEffect(() => {
        console.log("chargement garde manger");
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

        recuperer_produits_get()
            .then((produits: Produits) => {
                console.log(produits);
                produits.Produits.forEach((produit: Produit) => {
                    setNomsProduits(nomsProduits => nomsProduits.set(produit.idProduit, produit.nom));
                })
            }).catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <GestureRecognizer
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={2} />
                <GardeMangerListe 
                    categories={keyArrayState}
                    itemMap={itemMapState}
                    enleveItem = {enleveItem}
                    rafraichirFlatList={rafraichirFlatList}
                    modifieQuantite={modifieQuantite}
                    nomsProduits={nomsProduits}
                >
                </GardeMangerListe>
            </SafeAreaView>
            <BarreNavigation indexe={2} navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} boutonCentre={() => { actionCentre(navigation) }} />
        </GestureRecognizer>
    );
}

function actionCentre(nav: any) {
    nav.navigate('Scanner');
    mettreAJourBack();
}

const navGauche = (nav: any) => {
    nav.navigate('ListeTicket');
    mettreAJourBack();
}
const navDroite = (nav: any) => {
    nav.navigate('ListeCourse');
    mettreAJourBack();
}

const mettreAJourBack = () => {
    console.log("mise à jour du back");
    const modificationsJson: ModificationJson = {modifications: []};
    modifications.forEach((quantite, idItem) => {
        modificationsJson.modifications.push({idItem: idItem, quantite: quantite});
    });
    modifications.clear();
    console.log(modificationsJson);
    modifier_quantite_post(modificationsJson);
}



export default GardeManger;

