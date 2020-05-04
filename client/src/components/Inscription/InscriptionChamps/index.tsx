import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Contexte, ContexteProp } from '../../../contexte';


function InscriptionChamps() {
    const contexte: ContexteProp = useContext(Contexte);

    const [valeurPrenom, prenom] = React.useState('');
    const [valeurNom, nom] = React.useState('');
    const [valeurIdentifiant, identifiant] = React.useState('');
    const [valeurMdp, mdp] = React.useState('');

    return (
        <View style={styles.composant}>
            {/* Prenom */}
            <TextInput
                style={styles.champ}
                placeholder="Prénom"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => prenom(text)}
                value={valeurPrenom}
            />
            {/* Nom */}
            <TextInput
                style={styles.champ}
                keyboardType='default'
                placeholder="Nom"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => nom(text)}
                value={valeurNom}
            />
            {/* Mail */}
            <TextInput
                style={styles.champ}
                keyboardType='email-address'
                placeholder="Adresse mail"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => identifiant(text)}
                value={valeurIdentifiant}
            />
            {/* Mot de passe */}
            <TextInput
                style={styles.champ}
                keyboardType='default'
                placeholder="Mot de passe"
                placeholderTextColor="#3b3b3bad"
                secureTextEntry={true}
                onChangeText={text => mdp(text)}
                value={valeurMdp}
            />

            <TouchableOpacity style={styles.bouton} onPress={() => { contexte.inscription({ email: valeurIdentifiant, mdp: valeurMdp, nom: valeurNom, prenom: valeurPrenom }) }}>
                <Text style={styles.texteBouton}>VALIDER</Text>
            </TouchableOpacity>

        </View>
    );
}

export default InscriptionChamps;