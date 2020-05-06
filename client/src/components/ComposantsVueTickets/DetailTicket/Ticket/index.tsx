import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import ListeDetailTicket from '../ListeDetailTicket';
import { Achat } from '../../../../api'

interface Propriete {
     idTicket: number,
     groupe: string,
     date: string,
     achatsMap: Map<String, Array<Achat>>,
     categorieArray: Array<String>,
     prix: number
}


function Ticket(props: Propriete) {

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