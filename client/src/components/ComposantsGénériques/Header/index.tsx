import React from 'react';
import { Text, View, Image, PanResponder, Animated, Dimensions, Easing } from 'react-native';
import styles from './styles';
import BoutonTriangle from '../BoutonTriangle';
import Logo from '../Logo';
import TitrePage from '../TitrePage';

const guide_de_style = require('../../../assets/guide_de_style.json');

interface Propriete {
    indexe: number,
}

function Header(prop: Propriete) {
    let couleur: string;
    let titrePage: string;
    let fonction: any;
    const nomApp = guide_de_style.Titres.NomApp;

    switch (prop.indexe) {
        case 1: {
            couleur = guide_de_style.Couleurs.Fraise;
            titrePage = guide_de_style.Titres.Vue_Liste_Courses;
            fonction = () => { };
            break;
        }
        case 2: {
            couleur = guide_de_style.Couleurs.Peche;
            titrePage = guide_de_style.Titres.Vue_Garde_Manger;
            fonction = () => { };
            break;
        }
        default: {
            couleur = guide_de_style.Couleurs.Banane;
            titrePage = guide_de_style.Titres.Vue_Tickets;
            fonction = () => { };
            break;
        }
    }

    const DUREE_ANIM = 350;

    const HAUTEUR_ECRAN = Dimensions.get('window').height;
    const SEUIL_MVT = HAUTEUR_ECRAN / 35;
    const SEUIL_VSN = HAUTEUR_ECRAN / 34;
    const SEUIL_ACT = HAUTEUR_ECRAN / 4;

    const position = new Animated.ValueXY({ x: 0, y: 0 });

    const ouvetureComplet = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: HAUTEUR_ECRAN / 2 },
            duration: DUREE_ANIM,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false
        }).start();
    }

    const semiOuverture = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: HAUTEUR_ECRAN / 10 },
            duration: DUREE_ANIM,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false
        }).start();
    }

    const initPosition = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: DUREE_ANIM,
            useNativeDriver: false
        }).start()
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, geste) => false,
        onMoveShouldSetPanResponder: (evt, geste) => true,
        onPanResponderTerminationRequest: (evt, geste) => false,
        onPanResponderGrant: () => {
            position.setOffset({ x: 0, y: (position.y as any)._value });
            position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (evt, geste) => {
            if (geste.dy >= SEUIL_MVT) {
                position.setValue({ x: 0, y: geste.dy - SEUIL_MVT });
            } 
        },
        onPanResponderRelease: (evt, geste) => {
            position.flattenOffset();
            if (geste.dy >= SEUIL_ACT) {
                ouvetureComplet();
            } else if (geste.dy >= SEUIL_VSN) {
                semiOuverture();
            } else {
                initPosition();
            }
        },
        onPanResponderTerminate: () => {
            Animated.spring(position, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false
            }).start()
        }
    });

    const profilPropStyle = () => {
        const height = position.y.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 200]
        });
        return { height };
    }

    return (
        <View style={styles.conteneur_entete}>
            <Animated.View style={[styles.profil, profilPropStyle()]}>
                <Text>hola c'est moi</Text>
            </Animated.View>
            <Animated.View
                style={[styles.ligne1, position.getLayout()]}
                {...panResponder.panHandlers}
            >
                <View style={styles.conteneur_infos_app}>
                    <Logo couleur={couleur} />
                    <Text style={[styles.nom_app, { color: couleur }]}>{nomApp}</Text>
                </View>
                <View style={styles.conteneur_boutton_triangle}>
                    <BoutonTriangle couleur={couleur} rotation={'180deg'} fonction={() => { console.log('Boutton pressé'); }} />
                </View>
            </Animated.View>
            <View style={styles.ligne2}>
                <TitrePage couleur={couleur} titre={titrePage} />
            </View>
        </View>
    );
}

export default Header;