import React from 'react';
import { Button, Text, View } from 'react-native';

import ListeGlissable from '../../components/ListeGlissable';
import Header from '../../components/ComposantsGénériques/Header';


import { ListeCourseProp } from "../../navigator";

function ListeCourse({ route, navigation }: ListeCourseProp) {
    return (
        <View style={{flex:1}}>
            <Header indexe={1} />
            <ListeGlissable />
        </View>
    );
}

export default ListeCourse;