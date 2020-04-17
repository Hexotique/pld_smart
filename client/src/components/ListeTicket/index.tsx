import React from 'react';
import { FlatList } from 'react-native';
import Item from "../../components/ListeTicketItem";

const dataTicket = [
    {
        "id": "89375",
        "commerce": "Carrefour",
        "prix": "104,78",
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

function TicketListe() {
    return (
        <FlatList
            data={dataTicket}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item }) => <Item
                prix={item.prix}
                commerce={item.commerce}
                date={item.date}
            />}
        />
    );
}

export default TicketListe;