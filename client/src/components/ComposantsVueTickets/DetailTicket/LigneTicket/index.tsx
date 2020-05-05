import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';


function LigneTicket({ nomItem, quantite, prix }: any) {
     return (
               <View style   = {styles.vueItem}>
                    <View style= {styles.nomItemConteneur}>
                         <Text style   = {styles.nomItem}>{nomItem}</Text>
                    </View>
                    
                    <Text style = {styles.quantiteItem}>{quantite}</Text>
                    <Text style = {styles.prixItem}>{prix}</Text>
               </View>
      );
}

export default LigneTicket;
