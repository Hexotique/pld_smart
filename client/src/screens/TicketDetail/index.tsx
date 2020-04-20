/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Text, View } from 'react-native';

import Ticket from '../../components/DetailTicket/Ticket';

import { TicketDetailProp } from '../../navigator'

/*
const Ticketdata = new Array<Category>();
let newcat1: Category = { categorieProduit: "Epicerie", data: new Array<Purchase>() };
let newpurch11: Purchase = { article: "tablette de Chocolat", quantite: 4, prix: 11 };
let newpurch12: Purchase = { article: "Quinoa", quantite: 4, prix: 11 };
newcat1.data.push(newpurch11);
newcat1.data.push(newpurch12);


let newcat2: Category = { categorieProduit: "Hygiène", data: new Array<Purchase>() };
let newpurch21: Purchase = { article: "Savon", quantite: 4, prix: 11 };
let newpurch22: Purchase = { article: "Javel", quantite: 4, prix: 11 };
newcat2.data.push(newpurch21);
newcat2.data.push(newpurch22);

Ticketdata.push(newcat1);
Ticketdata.push(newcat2);
*/

function TicketDetail({ route, navigation }: TicketDetailProp) {
     return (
               <Ticket></Ticket>
     );
}

export default TicketDetail;