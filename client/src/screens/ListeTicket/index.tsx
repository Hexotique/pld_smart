import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import TicketListe from "../../components/ComposantsVueTickets/ListeTickets/ListeTicket";
import { ListeTicketProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { ContexteProp, Contexte } from '../../contexte'
import { ListeTickets, Ticket, recupererContenuListeTicketGet } from '../../api'


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

function ListeTicket({ route, navigation }: ListeTicketProp) {
    const contexte: ContexteProp = useContext(Contexte);
    const [ticketArrayState, setTicketArrayState] = useState(new Array<Ticket>());

    useEffect(() => {
        recupererContenuListeTicketGet()
            .then((data: ListeTickets) => {
                const ticketArray: Array<Ticket> = data.Tickets;
                //console.log(ticketArray);
                setTicketArrayState(ticketArray);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={3} />
                <TicketListe ticketArray={ticketArrayState}></TicketListe>
            </SafeAreaView>
            <BarreNavigation indexe={3} navGauche={() => navGauche(navigation)} navDroite={() => navDroite(navigation)} />
        </GestureRecognizer >
    );
}

const navGauche = (nav: any) => {
    nav.navigate('ListeCourse');
}
const navDroite = (nav: any) => {
    nav.navigate('GardeManger')
}

export default ListeTicket;
