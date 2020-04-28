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
                placeholderTextColor="#3b3b3bad"

                onChangeText={text => identifiant(text)}
                value={valeurIdentifiant}
            />
            <TextInput
                style={styles.champ}
                keyboardType='default'
                placeholder="Mot de passe"
                placeholderTextColor="#3b3b3bad"
                secureTextEntry={true}
                onChangeText={text => mdp(text)}
                value={valeurMdp}
            />
            
             <TouchableOpacity style={styles.bouton} onPress={() => {}}>
                 <Text style={styles.texteBouton}>CONNEXION</Text>
             </TouchableOpacity>
             
        </View>
    );
}

export default ConnexionChamps;