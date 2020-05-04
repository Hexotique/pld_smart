import React, { useContext } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { InscriptionProp } from '../../navigator'
import InscriptionChamps from "../../components/Inscription/InscriptionChamps"
import InscriptionTitre from "../../components/Inscription/InscriptionTitre"
import styles from './styles';
import { ContexteProp, Contexte } from '../../contexte'


function Connexion({ route, navigation }: InscriptionProp) {
    const contexte: ContexteProp = useContext(Contexte);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/fond-inscription.jpg')} style={styles.fondImage} >
            </ImageBackground>
            <View style={styles.fondTransparent}></View>
            <View style={styles.titre}><InscriptionTitre></InscriptionTitre></View>
            <View style={styles.inscription}><InscriptionChamps></InscriptionChamps></View>
        </View>
    );
}

export default Connexion;
