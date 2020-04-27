import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import styles from './styles';

export interface TriangleProps {
    couleur : string,
    rotation : string,
    fonction : any
}

function BoutonTriangle(props: TriangleProps) {
    return (
        <TouchableHighlight  underlayColor = {'transparent'}  style = {[  
            styles.triangle, 
            {borderBottomColor : props.couleur} 
        ]}
        onPress = {props.fonction}>
            <Text> ceci est un test</Text>
        </TouchableHighlight>
    );
}

export default BoutonTriangle;