import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';


const image = require('../../../assets/logo.png');

export interface PropsLogo{
    couleur : string
    style : any
}

function Logo(propsLogo : PropsLogo) {
    return (
         <View style = {propsLogo.style}>
            <Image 
                style={[styles.profile_image, { tintColor : propsLogo.couleur}] }
                source={image}
            />
        </View>
    );
}

export default Logo;