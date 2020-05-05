import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { ContexteProp, Contexte } from '../../../contexte'


interface TriangleProps {
    couleur: string,
    rotation: string,
    fonction: any
}

function BoutonTriangle(props: TriangleProps) {
    const contexte: ContexteProp = useContext(Contexte);
    return (
        <TouchableOpacity style={[
            styles.triangle,
            { borderTopColor: props.couleur }
        ]}
            // onPress={props.fonction}
            onPress={contexte.deconnexion}
        >
        </TouchableOpacity>
    );
}

export default BoutonTriangle;