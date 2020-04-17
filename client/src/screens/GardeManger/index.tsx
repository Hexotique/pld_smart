import React from 'react';
import { Button, Text, View } from 'react-native';
import Header from '../../components/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import TitrePage from '../../components/TitrePage'

function Home() {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 8}}>
                <TitrePage titre='Mon garde-manger' imageSrc='GardeManger'></TitrePage>
                <GardeMangerListe></GardeMangerListe>
            </View> 
        </View>
    );
}

export default Home;