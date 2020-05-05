import React, { useState } from 'react';
import { Text, View, Image, PanResponder, Animated, Dimensions, Easing, TouchableOpacity } from 'react-native';
import styles from './styles';
import TitrePage from '../TitrePage';
import Modal from 'react-native-modal';
import QRCode from 'react-qr-code';

import { Contexte } from '../../../contexte';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderBackground } from '@react-navigation/stack';

const guide_de_style = require('../../../assets/guide_de_style.json');

interface Propriete {
    indexe: number,
}

function Header(prop: Propriete) {
    const [modalVisible, setModalVisible] = useState(false);

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
    const SEUIL_ACT = HAUTEUR_ECRAN / 34;

    const position = new Animated.ValueXY({ x: 0, y: 0 });

    const ouverture = () => {
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
            if (geste.dy >= SEUIL_MVT && geste.dy <= HAUTEUR_ECRAN / 4) {
                position.setValue({ x: 0, y: geste.dy - SEUIL_MVT });
            }
        },
        onPanResponderRelease: (evt, geste) => {
            position.flattenOffset();
            if (geste.dy >= SEUIL_ACT) {
                ouverture();
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

    const fondTransStyle = () => {
        const backgroundColor = position.y.interpolate({
            inputRange: [0, 70],
            outputRange: ['rgb(255,255,255)', couleur]
        });

        return { backgroundColor };
    }

    const couleurTransStyle = () => {
        const color = position.y.interpolate({
            inputRange: [0, 70],
            outputRange: [couleur, 'rgba(255,255,255,1)']
        });
        return { color };
    }

    const rotateStyle = () => {
        const rotate = position.y.interpolate({
            inputRange: [0, 70],
            outputRange: ['0deg', '180deg']
        });
        return { transform: [{ rotate }] };
    }

    return (
        <View style={styles.conteneur_entete}>
            <Contexte.Consumer>
                {contexte =>
                    <Animated.View style={[styles.profil, profilPropStyle(), fondTransStyle()]}>
                        <View style={{
                            flex: 20,
                            flexDirection: 'row'
                        }}>
                            <View style={{ flex: 14, paddingTop: 5, paddingLeft: 10 }}>
                                <Text style={{ fontFamily: 'Comfortaa-Regular', color: 'white' }}>{contexte.nomComplet}</Text>
                                <Text style={{ fontFamily: 'Comfortaa-Regular', color: 'white' }}>{contexte.email}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 3 }} onPress={() => setModalVisible(true)}>
                                <Icon name="qrcode" size={50} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 3 }} onPress={contexte.deconnexion}>
                                <Icon name="logout" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                }
            </Contexte.Consumer>
            <Animated.View
                style={[styles.ligne1, position.getLayout(), fondTransStyle()]}
                {...panResponder.panHandlers}
            >
                <View style={styles.conteneur_infos_app}>
                    <Animated.Image
                        style={[styles.logo, { tintColor: couleurTransStyle().color }]}
                        source={require('../../../assets/logo.png')}
                    />
                    <Animated.Text style={[styles.nom_app, couleurTransStyle()]}>{nomApp}</Animated.Text>
                </View>
                <View style={styles.conteneur_boutton_triangle}>
                    <Animated.View style={[
                        styles.triangle,
                        { borderTopColor: couleurTransStyle().color },
                        rotateStyle()
                    ]} />
                </View>
            </Animated.View>
            <View style={styles.ligne2}>
                <TitrePage couleur={couleur} titre={titrePage} />
            </View>
            <Modal
                isVisible={modalVisible}
                backdropColor="grey"
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{
                    padding: 30,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 20
                }}>
                    <Contexte.Consumer>
                        {contexte => <QRCode value={contexte.token} size={300} />}
                    </Contexte.Consumer>
                </View>
            </Modal>
        </View>
    );
}

export default Header;