import React from 'react';
import { Image, Text, View } from 'react-native';

import { ProfilClientProp } from "../../navigator";

function ProfilClient({ route, navigation }: ProfilClientProp) {
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Guillhem Martin</Text>
            <Image style={{ height: '80%', width: '90%' }} source={require('../../assets/client.jpg')}></Image>
        </View>
    );
}

export default ProfilClient;