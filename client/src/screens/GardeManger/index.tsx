import React from 'react';
import { View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import { GardeMangerProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';

// navigation.navigate('ListeCourse')

function Home({ route, navigation }: GardeMangerProp) {
    return (
        <GestureRecognizer
            onSwipeRight={() => { navigation.navigate('ListeTicket') }}
            onSwipeLeft={() => { navigation.navigate('ListeCourse') }}
            style = {{flex: 1}}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 8 }}>
                    <Header indexe={2} />
                    <GardeMangerListe></GardeMangerListe>
                </View>
            </View>
        </GestureRecognizer>
    );
}

export default Home;