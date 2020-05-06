import { StyleSheet } from 'react-native';
// import Constants from "expo-constants";


const styles = StyleSheet.create({
     conteneur_ticket: {
          flex         : 1,
          borderRadius : 20,
          flexDirection: 'column',
          justifyContent: 'center',

     },
     entete: {
          flex: 1,
          paddingTop: -10,
          paddingBottom: 20
     },

     liste: {
          flex: 6,
     },

     total: {
          flex: 1,
     },

     nom_enseigne: {
          color     : 'black',
          fontSize  : 32,
          fontWeight: 'bold',
          textAlign : 'center'
     },
     date_numTicket_conteneur: {
          flexDirection : 'row',
          justifyContent: 'space-evenly',
     },
     date: {
          fontStyle  : 'italic',
          paddingLeft: '5%'
     },
     numTicket: {
          paddingRight: '5%'
     },
     prix:{
          fontWeight: "bold",
          fontSize: 16,
          textAlign   : 'right',
          paddingRight: '5%'
     }
});

export default styles;