import React from 'react';
import { View } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';

function ListeCourse({ route, navigation }: ListeCourseProp) {
    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => { navGauche(navigation) }}
            onSwipeLeft={() => { navDroite(navigation) }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={1} />
                <ListeGlissable />
            </View>
            <BarreNavigation navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} indexe={1} />
        </GestureRecognizer>
    );
}

const navGauche = (nav: any) => {
    nav.navigate('GardeManger');
}
const navDroite = (nav: any) => {
    nav.navigate('ListeTicket')
}

export default ListeCourse;