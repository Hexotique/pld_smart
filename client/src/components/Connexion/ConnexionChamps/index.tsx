import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

function ConnexionChamps() {

    const [valeurIdentifiant, identifiant] = React.useState('');
    const [valeurMdp, mdp] = React.useState('');

    return (
        <View style={styles.composant}>
            <TextInput
                style={styles.champ}
                keyboardType='email-address'
                placeholder="Identifiant"
                placeholderTextColor="#666666"

                onChangeText={text => identifiant(text)}
                value={valeurIdentifiant}
            />
            <TextInput
                style={styles.champ}
                keyboardType='default'
                placeholder="Mot de passe"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                onChangeText={text => mdp(text)}
                value={valeurMdp}
            />
            
             <TouchableOpacity onPress={() => {}}>
                 <Text style={styles.bouton}>CONNEXION</Text>
             </TouchableOpacity>
             
        </View>
    );
}

export default ConnexionChamps;