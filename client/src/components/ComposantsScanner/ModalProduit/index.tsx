import React from 'react';
import { View, Button, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { ajouter_produit_scan_put } from '../../../api'
import { Icon } from 'react-native-elements'
import Ticket from 'src/components/ComposantsVueTickets/DetailTicket/Ticket';

function ajoutProduit(codebarre: string) {
    ajouter_produit_scan_put(codebarre);
}

export interface Propriete {
    show: boolean,
    close: any,
    codebarre: string,
    url: string,
    nom: string,
}

function ModalProduit(props: Propriete) {
    console.log('code barre : ' + props.codebarre);
    return (
        props.show ?

            <Modal
                backdropColor='grey'
                isVisible={props.show}
            >
                <TouchableOpacity onPressOut={props.close}
                    activeOpacity={1} style={styles.container} >
                    <View style={styles.vueCentre}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalConteneur}>
                                <View style={styles.fermerModal}>
                                    <TouchableOpacity onPress={props.close}>
                                        <Image style={styles.iconeCroix} source={require("../../../assets/close.png")} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <View style={styles.zoneQuestion}>
                                        <Text style={styles.question}>      Souhaitez-vous ajouter {"\n"} ce produit au garde manger ?</Text>
                                    </View>
                                    <View style={styles.zoneNom}>
                                        <Text style={styles.nom}>{props.nom}</Text>
                                    </View>
                                    <Image style={styles.image} source={{ uri: props.url }}></Image>
                                    <View style={styles.zoneBoutons}>
                                        <TouchableOpacity style={styles.boutonOui} onPress={() => { ajoutProduit(props.codebarre); props.close(); }}>
                                            <Text style={styles.texteBouton}>OUI</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.boutonNon} onPress={props.close}>
                                            <Text style={styles.texteBouton}>NON</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal >


            : null
    );
}


export default ModalProduit;