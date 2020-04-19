import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
     conteneur_principal: {
          flex          : 1,
          flexDirection : 'row',
          paddingLeft   : '4%',
          paddingRight  : '4%',
          marginVertical: '1%',
          alignItems    : 'center',
     },
     conteneur_prosuit: {
          paddingVertical: '1%',
          flex           : 50,
          backgroundColor: '#e6b8afff',
          borderRadius   : 5,
          paddingLeft    : '5%',
          paddingRight   : '5%',
     },
     conteneur_quantite: {
          paddingVertical: '1%',
          flex           : 25,
          alignItems     : 'center',
          borderRadius   : 5,
     },
     conteneur_prix: {
          paddingVertical: '1%',
          flex           : 25,
          backgroundColor: '#e6b8afff',
          alignItems     : "center",
          borderRadius   : 5,
     },
     texte_produit: {
          // fontFamily:
          // fontSize:
     },
     texte_quantite: {
          // fontFamily:
          // fontSize:
     },
     texte_prix: {
          // fontFamily:
          // fontSize:
     },
});

export default styles;