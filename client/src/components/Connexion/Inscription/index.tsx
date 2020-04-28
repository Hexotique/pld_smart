import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import styles from './styles';


function Inscription() {
    return (
        <View style={styles.composant}>
            <Text style={styles.titre}>Pas de compte ?</Text>
            <TouchableOpacity style={styles.bouton} onPress={() => { }}>
                <Text style={styles.texteBouton}>INSCRIPTION</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Inscription;