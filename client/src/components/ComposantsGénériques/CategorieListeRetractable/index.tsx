import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function CategorieListeRetractable({ item }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.nomItem}>{item.toString()}</Text>
        </View>
    );
}


export default CategorieListeRetractable;
