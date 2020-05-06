import React, { useContext, useEffect } from 'react';
import { View, ImageBackground, Text, Dimensions, Animated, Easing, Keyboard, KeyboardEvent } from 'react-native';
import { InscriptionProp } from '../../navigator'
import InscriptionChamps from "../../components/Inscription/InscriptionChamps"
import InscriptionTitre from "../../components/Inscription/InscriptionTitre"
import styles from './styles';
import { ContexteProp, Contexte } from '../../contexte'


function Connexion({ route, navigation }: InscriptionProp) {
    const contexte: ContexteProp = useContext(Contexte);
    const { width, height } = Dimensions.get('window');

    const bottomPositionTitre = new Animated.Value(4 * height / 5);
    const bottomPositionInscription = new Animated.Value(1 * height / 5);

    function onKeyboardDidShow(e: KeyboardEvent): void {
        console.log(e.endCoordinates.height)
        Animated.parallel([
            Animated.timing(
                bottomPositionTitre,
                {
                    useNativeDriver: false,
                    toValue: 4 * height / 5 - e.endCoordinates.height,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(
                bottomPositionInscription,
                {
                    useNativeDriver: false,
                    toValue: 0,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
        ]).start();
    }

    function onKeyboardDidHide(): void {
        Animated.parallel([
            Animated.timing(
                bottomPositionTitre,
                {
                    useNativeDriver: false,
                    toValue: 4 * height / 5,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(
                bottomPositionInscription,
                {
                    useNativeDriver: false,
                    toValue: 1 * height / 5,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
        ]).start();
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return (): void => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/fond-inscription.jpg')} style={styles.fondImage} >
            </ImageBackground>
            <View style={styles.fondTransparent}></View>
            <Animated.View style={[styles.titre, { bottom: bottomPositionTitre }]}><InscriptionTitre></InscriptionTitre></Animated.View>
            <Animated.View style={[styles.inscription, { bottom: bottomPositionInscription }]}><InscriptionChamps></InscriptionChamps></Animated.View>
        </View>
    );
}

export default Connexion;
