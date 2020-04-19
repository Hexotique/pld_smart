import React from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from './styles';
import ListeDetailTicket from '../ListeDetailTicket';

function Ticket() {
     return (
          <View style = {styles.conteneur_ticket}>
               <View>
                    <Text style = {styles.nom_enseigne}>Auchan</Text>
               </View>
               <View style = {styles.date_numTicket_conteneur}>
               <Text style = {styles.date}>11/04/2020</Text>
               <Text style = {styles.numTicket}>n° 11879</Text>
               </View>
               <View>
                    <ListeDetailTicket />
               </View>
               <View>
                    <Text style = {styles.prix} >Total : 35, 12 €</Text>
               </View>
          </View>
     );
}

export default Ticket;