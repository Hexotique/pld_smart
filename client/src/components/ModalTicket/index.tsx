import React from 'react';
import { View, Button} from 'react-native';
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
                //animationType="fade"
                //transparent={true}
                backdropColor='grey'
                isVisible={props.show}

                /*onRequestClose={
                    props.close
                }*/
            >
                <View style={styles.vueCentre}>

                    <View style={styles.modalConteneur}>
                        {
                        <Button title="close button" onPress={props.close} ></Button>
                          }
                        {/* <Icon name='cancel' color='red' /> */}
                        {props.children}
                    </View>
                </View>
            </Modal>

            : null
    );
}


export default ModalTicket;