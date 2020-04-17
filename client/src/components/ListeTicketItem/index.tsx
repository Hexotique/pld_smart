import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';



 function Item({prix, commerce, date}:any) {
        return (
            <TouchableOpacity onPress={() => { }}>
            <View style={styles.ticket}>
                <View style={styles.colonne1}>
                    <View style={styles.ligne1}>
                        <Text style={styles.commerce} >{commerce}</Text>
                        <Text style={styles.prix}>{prix} €</Text>
                    </View>
                    <View style={styles.ligne2}>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <View style={styles.colonne2}>
                    <Image style={styles.image} source={require('../../assets/fleche.png')} />
                </View>
            </View>
            </TouchableOpacity>
        );
}

export default Item;