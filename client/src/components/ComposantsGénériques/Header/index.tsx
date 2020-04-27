import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import BoutonTriangle from '../BoutonTriangle';
import Logo from '../Logo';
import TitrePage from '../TitrePage';

const guide_de_style = require('../../../assets/guide_de_style.json');

function Header(indexe? : number) {
    
    let couleur : string;
    let titrePage : string;
    let fonction : any;
    const nomApp = guide_de_style.Titres.NomApp;
    
    switch(indexe) { 
   case 1: { 
        couleur = guide_de_style.Couleurs.Fraise;
        titrePage = guide_de_style.Titres.Vue_Liste_Courses;
        fonction = ()=>{};
      break; 
   } 
   case 2: {
        couleur = guide_de_style.Couleurs.Peche;
        titrePage = guide_de_style.Titres.Vue_Garde_Manger;
        fonction = ()=>{};
      break; 
   } 
  default: { 
        couleur = guide_de_style.Couleurs.Banane;
        titrePage = guide_de_style.Titres.Vue_Tickets;
        fonction = ()=>{};
    break; 
 } 
} 
    return (
        <View style={styles.conteneur_entete}>
            <View style = {styles.ligne1}>
                <View style = {styles.conteneur_infos_app}>
                    <Logo couleur={couleur}/>
                    <Text style={[styles.nom_app, {color:couleur}]}>{nomApp}</Text>
                </View> 
                <View style = {styles.conteneur_boutton_triangle}>
                    <BoutonTriangle couleur={couleur} rotation={'180deg'} fonction={() => {console.log('Boutton pressé');}} />
                </View>
            </View>
            <View style = {styles.ligne2}>
                <TitrePage couleur = {couleur} titre ={titrePage} />   
            </View>
        </View>
    );
}

export default Header;