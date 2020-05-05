import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Item from "../ListeTicketItem";
import styles from './styles';
import { recupererContenuListeTicketGet, ListeTickets, Ticket } from '../../../../api'

//Décommenter quand on a besoin de beaucoup de tickets pour gérer le style (plus simple)
/*
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

]*/


function TicketListe() {

    const [ticketArrayState, setTicketArrayState] = useState(new Array<Ticket>());

    useEffect(() => {
        recupererContenuListeTicketGet()
            .then((data: ListeTickets) => {
                const ticketArray: Array<Ticket> = data.Tickets;
                setTicketArrayState(ticketArray);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.liste}>
            <View >
                <FlatList
                    contentContainerStyle={{ paddingBottom: 140 }}
                    data={ticketArrayState}
                    keyExtractor={(itemValue) => itemValue.idTicket.toString()}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({ item }) => <Item
                        id={item.idTicket}
                        prix={item.montant}
                        commerce={item.nomGroupe}
                        date={(item.date.substring(8, 10)).concat('/', item.date.substring(5, 7)).concat('/', item.date.substring(0, 4))}
                    />
                    //Avant le lien avec le back : (plus simple de décommenter si c'est pour gérer le style)
                    /*data={dataTicket}
                    keyExtractor={(item, index) => item + index.toString()}                    
                    renderItem={({ item }) => <Item
                        prix={item.prix}
                        commerce={item.commerce}
                        date={item.date}
                    />*/}
                />

            </View>
        </View>
    );
}

export default TicketListe;