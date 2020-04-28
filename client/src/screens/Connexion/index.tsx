import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { ConnexionProp } from '../../navigator'
import styles from './styles';


function Connexion({ route, navigation }: ConnexionProp) {
    return (
        <View>
            <ImageBackground source={require('../../assets/fond-connexion.png')} style={styles.fondImage} >
            </ImageBackground>
            <View style={styles.fondTransparent}>
            </View>
        
        </View>
    );
}

export default Connexion;
