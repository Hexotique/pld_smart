import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from "./styles";

function ListeTicketTitre() {
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Mes tickets de caisse</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../../assets/iconTicket.png')} />
            </View>
        </View>
    );
}

export default ListeTicketTitre;