import React, { useEffect, useState } from 'react';
import { Image, Text, View, Animated, Button, Easing } from 'react-native';

import { ProfilClientProp } from "../../navigator";

function ProfilClient({ route, navigation }: ProfilClientProp) {
    let pressed = false;
    const topPosition = new Animated.Value(0);
    const leftPostion = new Animated.Value(0);
    const onPressHandler = () => {
        let offset: number;
        pressed ? (offset = 0) : (offset = -100);
        Animated.parallel([
            Animated.spring(
                topPosition,
                {
                    useNativeDriver: false,
                    toValue: offset,
                    tension: 3,
                    friction: 3,
                }
            ),
            Animated.timing(
                leftPostion,
                {
                    useNativeDriver: false,
                    toValue: offset,
                    duration: 3000,
                    easing: Easing.elastic(2)
                }
            )
        ]);
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{ top: topPosition, left: leftPostion }}>
                <Text>Guillhem Martin</Text>
                <Image style={{ height: 200, width: 200 }} source={require('../../assets/client.jpg')}></Image>
            </Animated.View>
            <Button title={'Bouges Guigui !'} onPress={onPressHandler}></Button>
        </View>
    );
}

export default ProfilClient;