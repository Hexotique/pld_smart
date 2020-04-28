import React from 'react';
import { View } from 'react-native';
import Header from '../../components/ComposantsGénériques/Header';
import TicketListe from "../../components/ListeTicket";
import ListeTicketTitre from "../../components/ListeTicketTitre";
import { ListeTicketProp } from "../../navigator";
import GestureRecognizer from 'react-native-swipe-gestures';
import BarreNavigation from '../../components/ComposantsGénériques/BarreNavigation';

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
    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeRight={() => navGauche(navigation)}
            onSwipeLeft={() => navDroite(navigation)}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header indexe={3} />
                <ListeTicketTitre></ListeTicketTitre>
                <TicketListe></TicketListe>
            </View>

            <BarreNavigation indexe={3} navGauche={()=>navGauche(navigation)} navDroite={()=>navDroite(navigation)}/>

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