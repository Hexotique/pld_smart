import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import styles from './styles';

interface Propriete {
    fonction: any,
}

function Inscription(props: Propriete) {
    return (
        <View style={styles.composant}>
            <Text style={styles.titre}>Pas de compte ?</Text>
            <TouchableOpacity style={styles.bouton} onPress={props.fonction}>
                <Text style={styles.texteBouton}>INSCRIPTION</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Inscription;