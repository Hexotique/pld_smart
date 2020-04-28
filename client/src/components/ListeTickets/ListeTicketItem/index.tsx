import React, { useState }  from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';
import ModalTicket from '../../ModalTicket/index';
import Ticket from '../../DetailTicket/Ticket';
//import Dialog from 'react-native';
//import DialogContent from 'react-native';

 function Item({prix, commerce, date}:any) {

    const [montrerModal, setMontrerModal] = useState(false);

    const onCloseHandler = () => {
        setMontrerModal(false);
    }
        return (
            <View>
            <TouchableOpacity onPress={() => setMontrerModal(true)}>
                <View style={styles.ticket}>
                    <Text style={styles.commerce} >{commerce}</Text>
                    <Text style={styles.date}>{date}</Text>
                   <Text style={styles.prix}>{prix} €</Text>
                </View>
            </TouchableOpacity>

            <ModalTicket show={montrerModal} close={onCloseHandler}>
                <Ticket></Ticket>
            </ModalTicket>
            </View>
        );
}

export default Item;


/* 
<Dialog onTouchOutside={() => setMontrerModal(false)}></Dialog>
            
*/