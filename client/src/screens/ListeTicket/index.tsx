import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import TicketListe from "../../components/ComposantsVueTickets/ListeTickets/ListeTicket";
import { ListeTicketProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { ContexteProp, Contexte } from '../../contexte'
import ModalProduit from '../../components/ComposantsScanner/ModalProduit'
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
    const [ticketMapState, setTicketMapState] = useState(new Map<string, Ticket>());

    function chargerTickets() {
        recupererContenuListeTicketGet()
            .then((data: ListeTickets) => {
                const ticketArray: Array<Ticket> = data.Tickets;
                const ticketMap = new Map<string, Ticket>();
                ticketArray.forEach((ticket: Ticket, indexe: number) => ticketMap.set(ticketArray[indexe].idTicket, ticket))
                //console.log(ticketArray);
                setTicketMapState(ticketMap);
            }).catch((error) => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', chargerTickets);
        return unsubscribe;
    }, [navigation]);

    useEffect(chargerTickets, []);

    const supprimerTicket = (id: string) => {
        setTicketMapState((prevState) => {
            console.log(prevState);
            prevState.delete(id);
            const newState = new Map<string, Ticket>();
            prevState.forEach((value: Ticket, key: string) => {
                newState.set(key, value);
            })
            console.log(newState);
            return newState;
        })
    }

    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={3} />
                <TicketListe ticketArray={[...ticketMapState.values()]} supprimerTicket={supprimerTicket} ></TicketListe>
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
