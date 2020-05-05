import React from 'react';
import { View, Button, TouchableOpacity, Image, TouchableWithoutFeedback, Text} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements'



export interface ModalTicketProps {
    show: boolean;
    close: any;
}

function ModalTicket(props: React.PropsWithChildren<ModalTicketProps>) {
    
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
                                            <TouchableOpacity  onPress={props.close}>
                                                    <Text style={styles.boutonSuppr}>  SUPPRIMER  </Text>
                                            </TouchableOpacity>  
                                        </View>
                                        <View style={styles.fermerModal}>
                                            <TouchableOpacity  onPress={props.close}>
                                                <Image style={styles.iconeCroix} source={require("../../assets/close.png")}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>                                   
                                        {props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>  
                </TouchableOpacity>
            </Modal>


            : null
    );
}


export default ModalTicket;