import React from 'react';
import { FlatList, View } from 'react-native';
import Item from "../ListeTicketItem";
import styles from './styles';
import { Ticket } from '../../../../api';

interface Propriete {
    ticketArray: Array<Ticket>;
    supprimerTicket: any;
}


function TicketListe(props: Propriete) {
    return (
        <View style={styles.liste}>
            <View >
                <FlatList
                    contentContainerStyle={{ paddingBottom: 140 }}
                    data={props.ticketArray}
                    keyExtractor={(itemValue) => itemValue.idTicket.toString()}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({ item }) => <Item
                        supprimerTicket={() => props.supprimerTicket(item.idTicket)}
                        idTicket={item.idTicket}
                        prix={Math.round(Number(item.montant) * 100) / 100}
                        commerce={item.nomGroupe}
                        date={(item.date.substring(8, 10)).concat('/', item.date.substring(5, 7)).concat('/', item.date.substring(0, 4))}
                    />
                    }
                />
            </View>
        </View>
    );
}

export default TicketListe;