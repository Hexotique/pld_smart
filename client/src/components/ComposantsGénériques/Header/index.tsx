import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';

function Header() {
    return (
        <View style={styles.header_container}>
            <Image style={styles.header_app_image} source={require('../../../assets/yaourtGardeMiam.png')}/>
            <Text style={styles.header_title}>Pot d'Yaourt</Text>
            <Image style={styles.profile_image} source={require('../../../assets/default-photo.png')} />
        </View>
    );
}

export default Header;