import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';



function LigneTicket({ nomItem, quantite, prix }: any) {
     return (
          <View style = {styles.conteneur_principal}>
          <View style = {styles.conteneur_prosuit}>
          <Text style = {styles.texte_produit}>{nomItem}</Text>
               </View>

               <View style = {styles.conteneur_quantite}>
               <Text style = {styles.texte_quantite}>{quantite}</Text>
               </View>

               <View style = {styles.conteneur_prix}>
               <Text style = {styles.texte_prix}>{prix}</Text>
               </View>
          </View>
     );
}

export default LigneTicket;
