import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import BoutonRond from '../BoutonRond';

const guide_de_style = require('../../../assets/guide_de_style.json');

interface Propriete {
    indexe: number,
    navGauche: any,
    navDroite: any
}

function BarreNavigation(props: Propriete) {

    let couleur1: string;
    let couleur2: string;
    let couleur3: string;
    let icon1: string;
    let icon2: string;
    let icon3: string;
    // let fonction1: any;
    // let fonction2: any;
    // let fonction3: any;

    switch (props.indexe) {
        case 1: {
            couleur1 = guide_de_style.Couleurs.Peche;
            couleur2 = guide_de_style.Couleurs.Fraise;
            couleur3 = guide_de_style.Couleurs.Banane;
            icon1 = guide_de_style.Icones.Garde_Manger;
            icon2 = guide_de_style.Icones.Liste_Courses;
            icon3 = guide_de_style.Icones.Tickets;
            // fonction1 = () => { };
            // fonction2 = () => { };
            // fonction3 = () => { };

            break;
        }
        case 2: {
            couleur1 = guide_de_style.Couleurs.Banane;
            couleur2 = guide_de_style.Couleurs.Peche;
            couleur3 = guide_de_style.Couleurs.Fraise;
            icon1 = guide_de_style.Icones.Tickets;
            icon2 = guide_de_style.Icones.Garde_Manger;
            icon3 = guide_de_style.Icones.Liste_Courses;
            // fonction1 = () => { };
            // fonction2 = () => { };
            // fonction3 = () => { };
            break;
        }
        default: {
            couleur1 = guide_de_style.Couleurs.Fraise;
            couleur2 = guide_de_style.Couleurs.Banane;
            couleur3 = guide_de_style.Couleurs.Peche;
            icon1 = guide_de_style.Icones.Liste_Courses;
            icon2 = guide_de_style.Icones.Tickets;
            icon3 = guide_de_style.Icones.Garde_Manger;
            // fonction1 = () => { };
            // fonction2 = () => { };
            // fonction3 = () => { };
            break;
        }
    }
    return (
        <View style={styles.conteneur_navBar}>
            <BoutonRond fonction={props.navGauche} couleur={couleur1} icon={icon1} rayon={60} />
            <BoutonRond couleur={couleur2} icon={icon2} rayon={85} />
            <BoutonRond fonction={props.navDroite} couleur={couleur3} icon={icon3} rayon={60} />
        </View>
    );
}

export default BarreNavigation;