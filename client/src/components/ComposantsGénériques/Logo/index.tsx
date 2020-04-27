import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';


const image = require('../../../assets/logo.png');

export interface PropsLogo {
    couleur: string
}

function Logo(propsLogo: PropsLogo) {
    return (
        // <View style = {styles.conteneur_image}>
            <Image
                style={[styles.profile_image, { tintColor: propsLogo.couleur }]}
                source={image}
            />
        //</View>
    );
}

export default Logo;