import React from 'react';
import { Button, Text, View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import TitrePage from '../../components/ComposantsGénériques/TitrePage'

function Home() {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 8}}>
                <TitrePage titre='Mon garde-manger' couleur="#ec7552"></TitrePage>
                <GardeMangerListe></GardeMangerListe>
            </View> 
        </View>
    );
}

export default Home;