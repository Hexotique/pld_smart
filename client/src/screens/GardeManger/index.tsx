import React from 'react';
import { Button, Text, View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import TitrePage from '../../components/ComposantsGénériques/TitrePage';


function Home() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 8 }}>
                <Header indexe={2} />
                <GardeMangerListe></GardeMangerListe>
            </View>
        </View>
    );
}

export default Home;