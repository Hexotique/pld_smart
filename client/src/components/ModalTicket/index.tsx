import React from 'react';
import { View, Modal, Button } from 'react-native';
import styles from './styles';


export interface ModalTicketProps {
    show: boolean;
    close: any;
}

function ModalTicket(props: React.PropsWithChildren<ModalTicketProps>) {
    return (
        props.show ?

            <Modal
                animationType="fade"
                transparent={true}
                visible={props.show}
                onRequestClose={
                    props.close
                }
            >
                <View style={styles.vueCentre}>

                    <View style={styles.modalConteneur}>
                        {/* make  a better button for closig
                        <Button title="close button" onPress={props.close} ></Button>  */} 
                        {props.children}
                    </View>
                </View>
            </Modal>

            : null
    );
}


export default ModalTicket;