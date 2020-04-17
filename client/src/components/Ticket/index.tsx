import React from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from './styles';
import TicketList from '../TicketList';

function Ticket() {
     return (
          <View style={styles.ticket_container}>
               <View>
                    <Text style={styles.nom_enseigne}>Auchan</Text>
               </View>
               <View style={styles.date_numTicket_conteneur}>
                    <Text style={styles.date}>11/04/2020</Text>
                    <Text style={styles.numTicket}>n° 11879</Text>
               </View>
               <View>
                    <TicketList />
               </View>
               <View>
                    <Text style={{ textAlign: 'right', paddingRight: '5%' }} >Total : 35,12 €</Text>
               </View>
          </View>
     );
}

export default Ticket;