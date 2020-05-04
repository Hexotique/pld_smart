import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard, KeyboardEvent } from 'react-native';
import styles from './styles';
import { Contexte, ContexteProp } from '../../../contexte';

interface Proprite {
    fonction: any,
}

function ConnexionChamps(props: Proprite) {
    const contexte: ContexteProp = useContext(Contexte);
    let champsSaisie = Array<any>();

    const allerAuChamp = (id: number) => {
        champsSaisie[id].focus();
    }

    const [valeurIdentifiant, identifiant] = React.useState('');
    const [valeurMdp, mdp] = React.useState('');

    return (
        <View style={styles.composant}>
            <TextInput
                ref={champSaisie => champsSaisie[0] = champSaisie}
                style={styles.champ}
                keyboardType='email-address'
                placeholder="Identifiant"
                placeholderTextColor="#3b3b3bad"
                autoCapitalize='none'
                onChangeText={text => identifiant(text)}
                value={valeurIdentifiant}
                autoCompleteType='email'
                textContentType='emailAddress'
                returnKeyType='next'
                onSubmitEditing={() => allerAuChamp(1)}
            />
            <TextInput
                ref={champSaisie => champsSaisie[1] = champSaisie}
                style={styles.champ}
                keyboardType='default'
                placeholder="Mot de passe"
                placeholderTextColor="#3b3b3bad"
                secureTextEntry={true}
                onChangeText={text => mdp(text)}
                value={valeurMdp}
                autoCapitalize='none'
                autoCompleteType='password'
                textContentType='password'
                returnKeyType='done'
                onSubmitEditing={() => { contexte.connexion({ email: valeurIdentifiant, mdp: valeurMdp }) }}
            />

            <TouchableOpacity style={styles.bouton} onPress={() => { contexte.connexion({ email: valeurIdentifiant, mdp: valeurMdp }) }}>
                <Text style={styles.texteBouton}>CONNEXION</Text>
            </TouchableOpacity>

        </View>
    );
}

export default ConnexionChamps;