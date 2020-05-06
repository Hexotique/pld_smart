import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Vibration } from 'react-native';
import styles from './styles';
import { Contexte, ContexteProp } from '../../../contexte';
import Toast from 'react-native-simple-toast';



function InscriptionChamps() {
    const contexte: ContexteProp = useContext(Contexte);
    let champsSaisie = Array<any>();

    const allerAuChamp = (id: number) => {
        champsSaisie[id].focus();
    }

    const [valeurPrenom, prenom] = React.useState('');
    const [valeurNom, nom] = React.useState('');
    const [valeurIdentifiant, identifiant] = React.useState('');
    const [valeurMdp, mdp] = React.useState('');

    return (
        <View style={styles.composant}>
            {/* Prenom */}
            <TextInput
                ref={champSaisie => champsSaisie[0] = champSaisie}
                style={styles.champ}
                placeholder="Prénom"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => prenom(text)}
                value={valeurPrenom}
                returnKeyType='next'
                onSubmitEditing={() => allerAuChamp(1)}
            />
            {/* Nom */}
            <TextInput
                ref={champSaisie => champsSaisie[1] = champSaisie}
                style={styles.champ}
                keyboardType='default'
                placeholder="Nom"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => nom(text)}
                value={valeurNom}
                returnKeyType='next'
                onSubmitEditing={() => allerAuChamp(2)}
            />
            {/* Mail */}
            <TextInput
                style={styles.champ}
                ref={champSaisie => champsSaisie[2] = champSaisie}
                keyboardType='email-address'
                placeholder="Adresse mail"
                placeholderTextColor="#3b3b3bad"
                onChangeText={text => identifiant(text)}
                value={valeurIdentifiant}
                autoCapitalize='none'
                autoCompleteType='email'
                textContentType='emailAddress'
                returnKeyType='next'
                onSubmitEditing={() => allerAuChamp(3)}
            />
            {/* Mot de passe */}
            <TextInput
                style={styles.champ}
                ref={champSaisie => champsSaisie[3] = champSaisie}
                autoCapitalize='none'
                keyboardType='default'
                placeholder="Mot de passe"
                placeholderTextColor="#3b3b3bad"
                secureTextEntry={true}
                onChangeText={text => mdp(text)}
                value={valeurMdp}
                autoCompleteType='password'
                textContentType='newPassword'
                returnKeyType='done'
                onSubmitEditing={() => { contexte.inscription({ email: valeurIdentifiant, mdp: valeurMdp, nom: valeurNom, prenom: valeurPrenom }) }}
            />

            <TouchableOpacity style={styles.bouton} onPress={() => {
                if (valeurIdentifiant === '') {
                    Toast.show('Email manquant', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else if (valeurMdp === '') {
                    Toast.show('Mot de passe manquant', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else if (valeurNom === '') {
                    Toast.show('Nom manquant', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else if (valeurPrenom === '') {
                    Toast.show('Prenom manquant', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else if (!valeurIdentifiant.includes('@')) {
                    Toast.show('mail invalide', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else if (valeurMdp.length < 6) {
                    Toast.show('mot de passe trop court, 6 charactères minimum', Toast.SHORT)
                    Vibration.vibrate([0, 80, 80, 80])
                } else {
                    contexte.inscription({ email: valeurIdentifiant, mdp: valeurMdp, nom: valeurNom, prenom: valeurPrenom })
                }
            }}>
                <Text style={styles.texteBouton}>VALIDER</Text>
            </TouchableOpacity>

        </View>
    );
}

export default InscriptionChamps;