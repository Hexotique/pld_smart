import React from 'react';
import { View } from 'react-native';
import { ListeTicketScreenProp } from '../../navigator'
import Header from "../../components/ComposantsGénériques/Header";
import TicketListe from "../../components/ListeTicket";
import ListeTicketTitre from "../../components/ListeTicketTitre";

const dataTicket = [
    {
        "id": "89375",
        "commerce": "Carrefour",
        "prix": "24,78",
        "date": "20/01/2019"
    },
    {
        "id": "11115",
        "commerce": "Auchan",
        "prix": "30,78",
        "date": "20/01/2019"
    },
    {
        "id": "45642",
        "commerce": "Carrefour",
        "prix": "24,78",
        "date": "20/12/2020"
    }
]

function ListeTicket({ route, navigation }: ListeTicketScreenProp) {
    return (
        <View>
            <ListeTicketTitre></ListeTicketTitre>
            <TicketListe></TicketListe>
        </View>
    );
}

export default ListeTicket;