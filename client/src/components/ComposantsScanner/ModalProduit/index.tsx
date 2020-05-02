import React from 'react';
import { View, Button, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'



export interface Propriete {
    show: boolean,
    close: any,
    url: string,
    nom: string,
}

function ModalProduit(props: Propriete) {
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
                                    <Text>{props.nom}</Text>
                                    <Image style={{ flex: 1 }} source={{ uri: props.url }}></Image>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>


            : null
    );
}


export default ModalProduit;