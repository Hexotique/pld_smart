import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Contexte, ContexteProp } from '../../../contexte';

interface Proprite {
    fonction: any,
}

function ConnexionChamps(props: Proprite) {
    const contexte: ContexteProp = useContext(Contexte);

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

            <TouchableOpacity style={styles.bouton} onPress={() => { contexte.connexion({ email: valeurIdentifiant, mdp: valeurMdp }) }}>
                <Text style={styles.texteBouton}>CONNEXION</Text>
            </TouchableOpacity>

        </View>
    );
}

export default ConnexionChamps;