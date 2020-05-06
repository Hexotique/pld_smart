import React, { useState } from 'react';
import { Alert, View, TouchableOpacity, Image, TouchableWithoutFeedback, Text, Vibration } from 'react-native';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import Modal from 'react-native-modal';
import { supprimer_ticket_delete } from '../../../../api';

import { Alerte } from '../../../ComposantsGénériques/Alerte';


export interface ModalTicketProps {
    show: boolean;
    chargement: boolean;
    close: any;
    id: number;
    supprimerTicket: any;
}

function ModalTicket(props: React.PropsWithChildren<ModalTicketProps>) {
    const [visible, setVisible] = useState(false);

    const supprimerTicket = () => {
        console.log('suppression ticket : ' + props.id);
        supprimer_ticket_delete(props.id)
            .then((succes) => {
                if (succes) {
                    props.close();
                    props.supprimerTicket();
                } else {
                    Toast.show('nous n\'avons pas pu effectuer la suppression', Toast.SHORT);
                    Vibration.vibrate([0, 80, 80, 80]);
                }
            })
            .catch((e) => {
                console.log(e);
                console.error(e);
            });
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
                                        <TouchableOpacity onPress={() => setVisible(true)}>
                                            <Text style={styles.boutonSuppr}>   SUPPRIMER   </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.fermerModal}>
                                        <TouchableOpacity onPress={props.close}>
                                            <Image style={styles.iconeCroix} source={require("../../../../assets/close.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {props.chargement ?
                                    (<>
                                        <View style={{ flex: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: "#e5e5e5" }}>
                                            <Image style={{ width: '40%', resizeMode: 'contain', marginBottom: '20%', backgroundColor: "#e5e5e5", }} source={require('../../../../assets/load.gif')}></Image>
                                        </View>
                                    </>) : (<>
                                        {props.children}
                                    </>
                                    )
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity >
                <Alerte
                    visible={visible}
                    setVisible={setVisible}
                    texte={"Etes-vous sûr de vouloir supprimer ce ticket ? Cette action est définitive."}
                    couleur="#fbbd4c"
                    funcValide={ () => {
                        setVisible(false);
                        supprimerTicket();
                    }}
                    funcAnnule={() => { setVisible(false) }}
                />
            </Modal >
            : null
    );
}

export default ModalTicket;

