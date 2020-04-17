import { StyleSheet } from 'react-native';
import Constants from "expo-constants";


const styles = StyleSheet.create({
     ticket_container: {
          flex: 1,
          borderRadius: 5,
          flexDirection: 'column',
          //justifyContent: 'center',
          backgroundColor: '#fff2ccff'
     },
     nom_enseigne: {
          color: 'black',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center'
     },
     date_numTicket_conteneur: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
     },
     date: {
          fontStyle: 'italic',
          paddingLeft: '5%'
     },
     numTicket: {
          paddingRight: '5%'
     }

});

export default styles;