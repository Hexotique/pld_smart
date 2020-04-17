import React, { useState } from 'react';
import { Text, View, Image, FlatList, Button } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



function GardeMangerItem({ item }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.nomItem}>{item.produit.nom}</Text>
            <Text style={styles.quantiteItem}>{item.quantite}</Text>
            <View style={styles.changerQuantite} >
                <TouchableOpacity onPress={() => { }}>
                    <Image style={styles.icon} source={require('../../../assets/moins-icon.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.changerQuantite} >
                <TouchableOpacity onPress={() => { }}>
                    <Image style={styles.icon} source={require('../../../assets/plus-icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default GardeMangerItem;
