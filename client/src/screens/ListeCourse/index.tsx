import React from 'react';
import { View } from 'react-native';
import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';
import { ListeCourseProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';

function ListeCourse({ route, navigation }: ListeCourseProp) {
    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => { navigation.navigate('GardeManger') }}
            onSwipeLeft={() => { navigation.navigate('ListeTicket') }}>
            <View style={{ flex: 1 }}>
                <Header indexe={1} />
                <ListeGlissable />
            </View>
        </GestureRecognizer>
    );
}

export default ListeCourse;