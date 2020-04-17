import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';



function TicketLine({ item_name, quantity, price }: any) {
     return (
          <View style={styles.main_container}>
               <View style={styles.product_container}>
                    <Text style={styles.product_tag}>{item_name}</Text>
               </View>

               <View style={styles.quantity_container}>
                    <Text style={styles.quantity_tag}>{quantity}</Text>
               </View>

               <View style={styles.price_container}>
                    <Text style={styles.price_tag}>{price}</Text>
               </View>
          </View>
     );
}

export default TicketLine;
