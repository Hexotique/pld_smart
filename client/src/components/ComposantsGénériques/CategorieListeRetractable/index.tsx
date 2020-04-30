import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function CatégorieListeRetractable({ item, couleur }: any) {
    return (

        <View style={[styles.container, {backgroundColor: couleur}]}>
            <Text style={styles.nomItem}>{item.toString()}</Text>
        </View>
    );
}


export default CatégorieListeRetractable;
