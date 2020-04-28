import React, { useState, useRef, useMemo } from 'react';
import { Text, View, Image, Animated, PanResponder } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function _decreaseItemQuantity(quantiteState: any, setQuantiteState: any) {
    if (quantiteState > 0) setQuantiteState(quantiteState - 1);
}

function _increaseItemQuantity(quantiteState: any, setQuantiteState: any) {
    setQuantiteState(quantiteState + 1);
}

function GardeMangerItem({ item, toggleScroll }: any) {
    const [quantiteState, setQuantiteState] = useState(item.quantite);
    const position = useRef(new Animated.ValueXY()).current;
    const limite = -120;
    let modeSuppression: boolean = false;
    let changement: boolean = false;
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dx < -35 && !modeSuppression) {
                toggleScroll(false);
                let newX = gestureState.dx;
                if (newX > limite) {
                    position.setValue({ x: newX, y: 0 });
                }
                changement = true;
            } else if (gestureState.dx > -35 && modeSuppression) {
                toggleScroll(false);
                let newX = gestureState.dx;
                if (newX < -limite) {
                    position.setValue({ x: newX + limite, y: 0 });
                }
                changement = true;
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (changement) {
                if (!modeSuppression) {
                    position.setValue({x: limite, y: 0});
                    modeSuppression = true;
                } else {
                    position.setValue({x: 0, y: 0});
                    modeSuppression = false;
                }
                changement = false;
            }
            position.flattenOffset();
        }
    }), []);
    return (
        <View style={styles.container}>
            <Animated.View style={[position.getLayout()]}
                                {...panResponder.panHandlers}>
                <View style   = {styles.vueItem}>
                    <View style= {styles.nomItemConteneur}>
                        <Text style   = {styles.nomItem}>{item.produit.nom}</Text>
                    </View>
                    
                    <View style = {styles.changerQuantite}>
                        <TouchableOpacity style={styles.boutonQuantite} onPress = {() => _decreaseItemQuantity(quantiteState, setQuantiteState)}>
                            <Image style = {styles.icon} source = {require('../../../assets/moins-icon.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.quantiteItem}>{quantiteState}</Text>
                    <View style = {styles.changerQuantite} >
                        <TouchableOpacity style={styles.boutonQuantite} onPress = {() => _increaseItemQuantity(quantiteState, setQuantiteState)}>
                            <Image style = {styles.icon} source = {require('../../../assets/plus-icon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.vueSwipe}>
                        <Text style={styles.vueSwipeTexte}>SUPPRIMER</Text>
                    </View>
            </Animated.View>
        </View>
        
        
    );
}


export default GardeMangerItem;
