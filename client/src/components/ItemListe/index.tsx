import React, { useRef, useMemo } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import styles from './styles';

type ItemListeProps = {
    text: string;
    toggleScroll: Function;
};

function ItemListe(props: ItemListeProps) {
    const position = useRef(new Animated.ValueXY()).current;
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dx < 35) {
                props.toggleScroll(false);
                let newX = gestureState.dx;
                position.setValue({ x: newX, y: 0 });
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            position.flattenOffset();
        }
    }), []);

    return (
        <View style={styles.listItem} >
            <Animated.View
                style={[position.getLayout()]}
                {...panResponder.panHandlers}
            >
                <View style={styles.absoluteCell}>
                    <Text style={styles.absoluteCellText}>DELETE</Text>
                </View>
                <View style={styles.innerCell}>
                    <Text>
                        {props.text}
                    </Text>
                </View>
            </Animated.View>
        </View >
    );
}

export default ItemListe;