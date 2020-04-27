import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from "./styles";

// Rendre le composant générique pour toutes les pages

                //'../../assets/iconTicket.png'
function TitrePage({titre, imageSrc}: any) {
    console.log(imageSrc);
    let imageComponent;
    switch (imageSrc) {
        case 'GardeManger':
            imageComponent = <Image style={styles.image} source={require('../../../assets/GardeMangerIcon.jpg')} />;
            break;
    }
    return (
        <View style={styles.container}>
            <View style={styles.conteneurTitre}>
                <Text style={styles.titre}>{titre}</Text>
            </View>
            
        </View>
    );
}

export default TitrePage;