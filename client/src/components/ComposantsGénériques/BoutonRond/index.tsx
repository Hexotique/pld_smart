import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

interface RondProps {
    icon: string
    couleur: string,
    fonction?: any,
    rayon: number
}

function BoutonRond(props: RondProps) {
    return (
        <TouchableOpacity style={[
            styles.rond,
            { backgroundColor: props.couleur },
            {
                height: props.rayon * rem,
                width: props.rayon * rem,
                borderRadius: rem * (props.rayon / 2),
            }
        ]}
            onPress={props.fonction}>
            <Icon name={props.icon} size={props.rayon * rem / 1.5} color={'white'} />

        </TouchableOpacity>
    );
}

export default BoutonRond;