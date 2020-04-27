import React from 'react';
import { FlatList, View } from 'react-native';
import Item from "../ListeTicketItem";
import styles from './styles';

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
    },
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
    },
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
    },
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
    },
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
    },
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
        "commerce": "Test",
        "prix": "24,78",
        "date": "20/12/2020"
    },
    {
        "id": "11115",
        "commerce": "Test",
        "prix": "30,78",
        "date": "20/01/2019"
    },
    {
        "id": "45642",
        "commerce": "Test",
        "prix": "24,78",
        "date": "20/12/2020"
    },
    {
        "id": "89375",
        "commerce": "Test",
        "prix": "104,78",
        "date": "20/01/2019"
    },
    {
        "id": "11115",
        "commerce": "Test",
        "prix": "30,78",
        "date": "20/01/2019"
    },
    {
        "id": "45642",
        "commerce": "Test",
        "prix": "24,78",
        "date": "20/12/2020"
    },
    {
        "id": "89375",
        "commerce": "Test",
        "prix": "104,78",
        "date": "20/01/2019"
    },
    {
        "id": "11115",
        "commerce": "Test",
        "prix": "30,78",
        "date": "20/01/2019"
    },
    {
        "id": "45642",
        "commerce": "Test",
        "prix": "24,78",
        "date": "20/12/2020"
    },

]


function TicketListe() {
    return (
        <View style={styles.liste}>
            <FlatList 
                data={dataTicket}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => <Item
                    prix={item.prix}
                    commerce={item.commerce}
                    date={item.date}
                />}
                
            />
        </View>
    );
}

export default TicketListe;