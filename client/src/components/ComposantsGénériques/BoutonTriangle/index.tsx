import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface TriangleProps {
    couleur: string,
    rotation: string,
    fonction: any
}

function BoutonTriangle(props: TriangleProps) {
    return (
        <TouchableOpacity style={[
            styles.triangle,
            { borderTopColor: props.couleur }
        ]}
            onPress={props.fonction}>
        </TouchableOpacity>
    );
}

export default BoutonTriangle;