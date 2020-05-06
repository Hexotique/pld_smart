import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import TicketListe from "../../components/ComposantsVueTickets/ListeTickets/ListeTicket";
import { ListeTicketProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';
import { ContexteProp, Contexte } from '../../contexte'
import { ListeTickets, Ticket, recupererContenuListeTicketGet } from '../../api'


function ListeTicket({ navigation }: ListeTicketProp) {

    const contexte: ContexteProp = useContext(Contexte);

    const [ticketMapState, setTicketMapState] = useState(new Map<string, Ticket>());
    const [chargement, setChargement] = useState(false);

    function chargerTickets() {
        setChargement(true);
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
        setChargement(false);
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
                {chargement ?
                    (<>
                        <View style={{ flex: 90, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: '40%', resizeMode: 'contain', marginBottom: '20%' }} source={require('../../assets/load.gif')}></Image>
                        </View>
                    </>) : (<>
                        <TicketListe ticketArray={[...ticketMapState.values()]} supprimerTicket={supprimerTicket} ></TicketListe>
                    </>
                    )
                }
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
