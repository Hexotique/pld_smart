import React, { useContext, useEffect } from 'react';
import { View, ImageBackground, Text, Keyboard, KeyboardEvent, Animated, Dimensions, Easing } from 'react-native';
import { ConnexionProp } from '../../navigator'
import ConnexionChamps from "../../components/Connexion/ConnexionChamps"
import ConnexionTitre from "../../components/Connexion/ConnexionTitre"
import Inscription from "../../components/Connexion/Inscription"
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { ContexteProp, Contexte } from '../../contexte'

function Connexion({ route, navigation }: ConnexionProp) {

    const { width, height } = Dimensions.get('window');

    const contexte: ContexteProp = useContext(Contexte);

    const bottomPositionTitre = new Animated.Value(4 * height / 5);
    const bottomPositionConnexion = new Animated.Value(2 * height / 5);
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
                bottomPositionConnexion,
                {
                    useNativeDriver: false,
                    toValue: 0,
                    duration: 0,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(
                bottomPositionInscription,
                {
                    useNativeDriver: false,
                    toValue: 1 * height / 5 - e.endCoordinates.height,
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
                bottomPositionConnexion,
                {
                    useNativeDriver: false,
                    toValue: 2 * height / 5,
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
            <ImageBackground source={require('../../assets/fond-connexion.jpg')} style={styles.fondImage} >
            </ImageBackground>
            <View style={styles.fondTransparent}></View>
            <Animated.View style={[styles.titre, { bottom: bottomPositionTitre }]}><ConnexionTitre></ConnexionTitre></Animated.View>
            <Animated.View style={[styles.connexion, { bottom: bottomPositionConnexion }]}><ConnexionChamps fonction={() => contexte.connexion()}></ConnexionChamps></Animated.View>
            <Animated.View style={[styles.inscription, { bottom: bottomPositionInscription }]}><Inscription fonction={() => navigation.navigate('Inscription')}></Inscription></Animated.View>
        </View>
    );
}

export default Connexion;
