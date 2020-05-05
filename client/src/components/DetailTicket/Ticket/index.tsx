import React from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from './styles';
import ListeDetailTicket from '../ListeDetailTicket';


//A implémenter pour faire le lien avec le Back
function supprimerTicket() { 
}


function Ticket() {
     return (
          <View style = {styles.conteneur_ticket}>
               <View style={styles.entete}>
                    <View>
                         <Text style = {styles.nom_enseigne}>Auchan</Text>
                    </View>
                    <View style = {styles.date_numTicket_conteneur}>
                         <Text style = {styles.date}>11/04/2020</Text>
                         <Text style = {styles.numTicket}>n° 11879</Text>
                    </View>
               </View>

               <View style={styles.liste}>
                    <ListeDetailTicket />
               </View>
               <View style={styles.total}>
                    <Text style = {styles.prix} >TOTAL : 35, 12 €</Text>
               </View>
          </View>
     );
}

export default Ticket;