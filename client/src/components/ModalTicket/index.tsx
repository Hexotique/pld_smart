import React from 'react';
import { Alert, View, Button, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'
import { supprimer_ticket_delete } from '../../api';



export interface ModalTicketProps {
    show: boolean;
    close: any;
    id: number;
}

function ModalTicket(props: React.PropsWithChildren<ModalTicketProps>) {
    const supprimerTicket = () => {
        Alert.alert(
            "Suppression du ticket",
            "Etes-vous sûr de vouloir supprimer ce ticket ? Cette action est définitive.",
            [
                {
                    text: 'Oui',
                    onPress: () => {
                        console.log('suppression ticket : ' + props.id);
                        props.close;
                    }
                },
                {
                    text: 'Annuler',
                    onPress: () => {
                        console.log("Annuler suppression ticket");
                        props.close;
                    },
                    style: "cancel"
                }
            ]
        );
    }

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
                                <View style={styles.bouttons}>
                                    <View style={styles.supprimerModal}>
                                        <TouchableOpacity onPress={props.close}>
                                            <Text style={styles.boutonSuppr}>  SUPPRIMER  </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.fermerModal}>
                                        <TouchableOpacity onPress={props.close}>
                                            <Image style={styles.iconeCroix} source={require("../../assets/close.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {props.children}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity >
            </Modal >
            : null
    );
}

export default ModalTicket;

