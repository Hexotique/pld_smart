import React from 'react';
import {View} from 'react-native';
import {ListeTicketScreenProp} from '../../navigator'
import Header from "../../components/Header";
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
            <Header></Header>
            <view>
                <ListeTicketTitre></ListeTicketTitre>
            </view>
            <view>
                <TicketListe></TicketListe>
            </view>
        </View>
    );
}

export default ListeTicket;