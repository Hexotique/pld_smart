import React, { useState, useEffect } from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from './styles';
import ListeDetailTicket from '../ListeDetailTicket';
import { recupererContenuDetailTicketGet, Achat, DetailTicket } from '../../../../api'

interface Propriete {
     idTicket: number,
     groupe: string,
     date: string,
     achatsMap: Map<String, Array<Achat>>,
     categorieArray: Array<String>,
     prix: number
}


function Ticket(props: Propriete) {

     console.log(props.achatsMap);
     /*const [keyArrayState, setKeyArrayState] = useState(new Array<String>());
     const [itemMapState, setItemMapState] = useState(new Map<String, Array<Achat>>());
     const [enableScroll, setEnableScroll] = useState(true);
     useEffect(() => {
          recupererContenuDetailTicketGet()
               .then((data: DetailTicket) => {
                    const itemMap: Map<String, Array<Achat>> = new Map<String, Array<Achat>>();
                    data.donneesTicket.achats.forEach((item: Achat) => {
                         if (!itemMap.has(item.nomCategorieProduit)) {
                              const itemList: Array<Achat> = [];
                              itemList.push(item);
                              itemMap.set(item.nomCategorieProduit, itemList);
                         } else {
                              const itemMapGet = itemMap.get(item.nomCategorieProduit);
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
     }, []);*/

     return (
          <View style={styles.conteneur_ticket}>
               <View style={styles.entete}>
                    <View>
                         <Text style={styles.nom_enseigne}>{props.groupe}</Text>
                    </View>
                    <View style={styles.date_numTicket_conteneur}>
                         <Text style={styles.date}>{props.date}</Text>
                         <Text style={styles.numTicket}>n°{props.idTicket}</Text>
                    </View>
               </View>

               <View style={styles.liste}>
                    <ListeDetailTicket achatsMap={props.achatsMap} categoriesArray={props.categorieArray} />
               </View>
               <View style={styles.total}>
                    <Text style={styles.prix} >TOTAL : {props.prix} €</Text>
               </View>
          </View>
     );
}

export default Ticket;