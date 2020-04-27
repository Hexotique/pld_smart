import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from "./styles";

interface Proprietes {
    couleur : string,
    titre : string
}

function TitrePage(props: Proprietes) {
    return (
        <View style={styles.container}>
            <View style={[styles.conteneurTitre, {backgroundColor: props.couleur}]}>
                <Text style={styles.titre}>{props.titre}</Text>
                <View style={styles.bande}></View>
                <View style={styles.bande}></View>
            </View>     
        </View>
    );
}

export default TitrePage;