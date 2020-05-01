import React, { useRef, useMemo, PropsWithChildren } from 'react';
import { Animated, Dimensions, TouchableOpacity, Easing, PanResponder, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './styles';

type ItemListeProps = {
    texte: string;
    permetDefile: Function;
    gauche?: any;
    droite?: any;
    gaucheHandler?: Function;
    droiteHandler?: Function;
};

function ItemListe(props: PropsWithChildren<ItemListeProps>) {
    const LARGEUR_ECRAN = Dimensions.get('window').width;
    const SEUIL_MVT = LARGEUR_ECRAN / 15;
    const SEUIL_VSN = LARGEUR_ECRAN / 7;
    const SEUIL_ACT = LARGEUR_ECRAN / 4;

    const DUREE_ANIM = 350;

    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const glisseComplete = (direction: string, cb: Function | undefined) => {
        const x = direction === 'droite' ? LARGEUR_ECRAN : -LARGEUR_ECRAN;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: DUREE_ANIM,
            useNativeDriver: false
        }).start()
        if(cb) {
            cb();
        }
    }

    const montreBouton = (direction: string) => {
        const x = direction === 'droite' ? LARGEUR_ECRAN / 4 : -LARGEUR_ECRAN / 4;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: DUREE_ANIM,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false
        }).start(() => props.permetDefile(false));
    }

    const initPosition = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: DUREE_ANIM,
            useNativeDriver: false
        }).start()
    }

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (evt, geste) => false,
        onMoveShouldSetPanResponder: (evt, geste) => true,
        onPanResponderTerminationRequest: (evt, geste) => false,
        onPanResponderGrant: () => {
            position.setOffset({ x: (position.x as any)._value, y: 0 });
            position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (evt, geste) => {
            if (props.gauche && geste.dx >= SEUIL_MVT) {
                props.permetDefile(false);
                position.setValue({ x: geste.dx - SEUIL_MVT, y: 0 });
            } else if (props.droite && geste.dx <= -SEUIL_MVT) {
                props.permetDefile(false);
                position.setValue({ x: geste.dx + SEUIL_MVT, y: 0 });
            }

        },
        onPanResponderRelease: (evt, geste) => {
            position.flattenOffset();
            if (geste.dx > 0) {
                if (props.gauche && geste.dx >= SEUIL_ACT) {
                    glisseComplete('droite', props.droiteHandler)
                } else if (props.gauche && geste.dx >= SEUIL_VSN) {
                    montreBouton('droite');
                } else {
                    initPosition();
                }
            } else {
                if (props.droite && geste.dx <= -SEUIL_ACT) {
                    glisseComplete('gauche', props.gaucheHandler)
                } else if (props.droite && geste.dx <= -SEUIL_VSN) {
                    montreBouton('gauche');
                } else {
                    initPosition();
                }
            }
        },
        onPanResponderTerminate: () => {
            Animated.spring(position, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false
            }).start()
        }
    }), []);

    const gauchePropStyle = () => {
        const opacity = position.x.interpolate({
            inputRange: [35, 75, 320],
            outputRange: [0, 1, 0.25]
        });
        const width = position.x.interpolate({
            inputRange: [0, 70],
            outputRange: [0, 70]
        });
        return { opacity, width };
    }

    const droitePropStyle = () => {
        const opacity = position.x.interpolate({
            inputRange: [-LARGEUR_ECRAN, -120, -35],
            outputRange: [0, 1, 0]
        });
        const width = position.x.interpolate({
            inputRange: [-70, 0],
            outputRange: [70, 0]
        });
        return { opacity, width };
    }

    return (
        <View style={styles.conteneur} >
            {props.gauche &&
                <Animated.View style={[styles.conteneurGauche, gauchePropStyle()]}>
                    {props.gauche}
                </Animated.View>
            }
            <Animated.View
                style={[styles.conteneurPrincipale, position.getLayout()]}
                {...panResponder.panHandlers}
            >
                {props.children}
            </Animated.View>
            {props.droite &&
                <Animated.View style={[styles.conteneurDroite, droitePropStyle()]}>
                    {props.droite}
                </Animated.View>
            }
        </View >
    );
}

export default ItemListe;