import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import { ScannerProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import ScannerCodeBarre from '../../components/ScannerCodeBarre'

function Scanner({ route, navigation }: ScannerProp) {
    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={3} />
                <ScannerCodeBarre />
            </SafeAreaView>
            <BarreNavigation indexe={3} navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} />
        </GestureRecognizer >
    );
}

const navGauche = (nav: any) => {
    nav.navigate('ListeCourse');
}
const navDroite = (nav: any) => {
    nav.navigate('GardeManger')
}

export default Scanner;
