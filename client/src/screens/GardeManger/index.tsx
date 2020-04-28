import React from 'react';
import { Button, Text, View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import TitrePage from '../../components/ComposantsGénériques/TitrePage';
import {recupererContenuGardeMangerGet} from '../../api'

function GardeManger() {
    recupererContenuGardeMangerGet().then((data) => {
        console.log(`Les données reçues par http sont ${data} -----------fin de requêtes`);
    }).catch((error) => console.error(error));
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 8}}>
                <TitrePage titre='Mon garde-manger' couleur="#ec7552"></TitrePage>
                <GardeMangerListe></GardeMangerListe>
            </View> 
        </View>
    );
}

export default GardeManger;