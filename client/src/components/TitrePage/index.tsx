import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from "./styles";

                //'../../assets/iconTicket.png'
function TitrePage({titre, imageSrc}: any) {
    console.log(imageSrc);
    let imageComponent;
    switch (imageSrc) {
        case 'GardeManger':
            imageComponent = <Image style={styles.image} source={require('../../assets/GardeMangerIcon.JPG')} />;
            break;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>{titre}</Text>
            <View style={styles.imageContainer}>
                {imageComponent}
            </View>
        </View>
    );
}

export default TitrePage;