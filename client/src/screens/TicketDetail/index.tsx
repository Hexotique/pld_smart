/* eslint-disable prettier/prettier */
import React, { useState, Component }  from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import Ticket from '../../components/DetailTicket/Ticket';
import ModalTicket from '../../components/ModalTicket';
import { TicketDetailProp } from '../../navigator';
import styles from './styles';


function TicketDetail({ route, navigation }: TicketDetailProp) {
     
/* 	 const [montrerModal, setMontrerModal] = useState(false);

     const onCloseHandler = () => {
          setMontrerModal(false);
     }


	 return (
		<View style={styles.vueCentre}>

               <Button title = "test modal" onPress={() => setMontrerModal(true)}>
               </Button>

               <ModalTicket show={montrerModal} close={onCloseHandler}>
                    <Ticket></Ticket>
               </ModalTicket>


          </View>
     ); */
};



export default TicketDetail;