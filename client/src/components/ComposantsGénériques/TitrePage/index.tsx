import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from "./styles";

// Rendre le composant générique pour toutes les pages

                //'../../assets/iconTicket.png'
function TitrePage({titre, couleur}: any) {
    return (
        <View style={styles.container}>
            <View style={[styles.conteneurTitre, {backgroundColor: couleur}]}>
                <Text style={styles.titre}>{titre}</Text>
                <View style={styles.bande}></View>
                <View style={styles.bande}></View>
            </View>
            
        </View>
    );
}

export default TitrePage;