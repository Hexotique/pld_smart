import React from 'react';
import { Button, Text, View } from 'react-native';

import { AccueilProp } from "../../navigator";

function Accueil({ route, navigation }: AccueilProp) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 8 }}>
                <Button
                    title="Liste de Courses"
                    onPress={() => navigation.navigate('ListeCourse')}
                />
            </View>
        </View>
    );
}

export default Accueil;