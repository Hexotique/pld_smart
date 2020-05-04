
import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import GardeMangerListe from '../../components/GardeManger/GardeMangerListe';
import { recupererContenuGardeMangerGet } from '../../api';
import { GardeMangerProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';

function GardeManger({ route, navigation }: GardeMangerProp) {
    recupererContenuGardeMangerGet().then((data) => {
        console.log(`Les données reçues par http sont ${data} -----------fin de requêtes`);
    }).catch((error) => console.error(error));

    return (
        <GestureRecognizer
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}
            style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={2} />
                <GardeMangerListe></GardeMangerListe>
            </SafeAreaView>
            <BarreNavigation indexe={2} navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} />
        </GestureRecognizer>
    );
}

const navGauche = (nav: any) => {
    nav.navigate('ListeTicket');
}
const navDroite = (nav: any) => {
    nav.navigate('ListeCourse')
}



export default GardeManger;

