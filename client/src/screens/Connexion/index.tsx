import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { ConnexionProp } from '../../navigator'
import ConnexionChamps from "../../components/Connexion/ConnexionChamps"
import ConnexionTitre from "../../components/Connexion/ConnexionTitre"
import Inscription from "../../components/Connexion/Inscription"
import styles from './styles';


function Connexion({ route, navigation }: ConnexionProp) {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/fond-connexion.png')} style={styles.fondImage} >
            </ImageBackground>
            <View style={styles.fondTransparent}></View>
            <View style={styles.titre}><ConnexionTitre></ConnexionTitre></View>
            <View style={styles.connexion}><ConnexionChamps fonction={() => connexion(navigation)}></ConnexionChamps></View>
            <View style={styles.inscription}><Inscription fonction={() => inscription(navigation)}></Inscription></View>
        </View>
    );
}

function inscription(nav: any) {
    nav.navigate('Inscription');
}

function connexion(nav: any) {
    nav.navigate('App');
}

export default Connexion;
