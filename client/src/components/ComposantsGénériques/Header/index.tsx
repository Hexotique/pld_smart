import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import BoutonTriangle from '../BoutonTriangle';
import Logo from '../Logo';

const guide_de_style = require('../../../assets/guide_de_style.json');

function Header() {
    return (
        <View style={styles.conteneur_entete}>
            <View style = {styles.ligne1}>
                <View style = {styles.conteneur_infos_app}>
                    <Logo couleur={guide_de_style.Couleurs.Fraise} style={styles.logo}/>
                    <Text style={[styles.nom_app, {color:guide_de_style.Couleurs.Fraise }]}>{guide_de_style.Titres.NomApp}</Text>
                </View> 
                <View style = {styles.conteneur_boutton_triangle}>
                    <BoutonTriangle couleur={guide_de_style.Couleurs.Fraise} rotation={'180deg'} fonction={() => {console.log('Boutton pressé');}} />
                </View>
            </View>
            <View style = {styles.ligne2}>
                <Text style = {{backgroundColor : guide_de_style.Couleurs.Fraise}}>{guide_de_style.Titres.Vue_Tickets}</Text>   
            </View>
        </View>
    );
}

export default Header;