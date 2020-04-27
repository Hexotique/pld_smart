import React, { useState }  from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';
import ModalTicket from '../../ModalTicket/index';
import Ticket from '../../DetailTicket/Ticket';

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



{/* <TouchableOpacity onPress={() => { }}>
            <View style={styles.ticket}>
                <View style={styles.colonne1}>
                    <View style={styles.ligneCommerce}>
                        <Text style={styles.commerce} >{commerce}</Text>
                        <Text style={styles.prix}>{prix} €</Text>
                    </View>
                    <View style={styles.ligne2}>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <View style={styles.colonne2}>
                    <Image style={styles.image} source={require('../../../assets/fleche.png')} />
                </View>
            </View>
            </TouchableOpacity> */}