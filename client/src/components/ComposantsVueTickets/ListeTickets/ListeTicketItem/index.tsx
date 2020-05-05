import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './styles';
import ModalTicket from '../../DetailTicket/ModalTicket';
import Ticket from '../../DetailTicket/Ticket';
import { recupererContenuDetailTicketGet, Achat, DetailTicket } from '../../../../api';
import ListeDetailTicket from '../../DetailTicket/ListeDetailTicket';
//import Dialog from 'react-native';
//import DialogContent from 'react-native';


function Item({ prix, commerce, date, idTicket }: any) {

    const [montrerModal, setMontrerModal] = useState(false);
    const [CategoriesArrayState, setCategoriesArrayState] = useState(new Array<String>());
    const [achatsMapState, setAchatsMapState] = useState(new Map<String, Array<Achat>>());

    const onCloseHandler = () => {
        setMontrerModal(false);
    }

    const onOpenHandler = () => {
        recupererContenuDetailTicketGet(idTicket)
            .then((ticket: DetailTicket) => {
                const achatsMap: Map<String, Array<Achat>> = new Map<String, Array<Achat>>();
                ticket.donneesTicket.achats.forEach((achat: Achat) => {
                    if (!achatsMap.has(achat.nomCategorieProduit)) {
                        const achatListe: Array<Achat> = [];
                        achatListe.push(achat);
                        achatsMap.set(achat.nomCategorieProduit, achatListe);
                    } else {
                        const achatMapGet = achatsMap.get(achat.nomCategorieProduit);
                        if (achatMapGet) {
                            achatMapGet.push(achat);
                        }
                    }
                });
                const categoriesArray: Array<String> = Array.from(achatsMap.keys());

                console.log(achatsMap);

                setCategoriesArrayState(categoriesArray);
                setAchatsMapState(achatsMap);
                setMontrerModal(true);
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <View>
            <TouchableOpacity onPress={onOpenHandler}>
                <View style={styles.ticket}>
                    <Text style={styles.commerce} >{commerce}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.prix}>{prix} €</Text>
                </View>
            </TouchableOpacity>

            <ModalTicket id={idTicket} show={montrerModal} close={onCloseHandler}>
                <Ticket
                    idTicket={idTicket}
                    groupe={commerce}
                    date={date}
                    achatsMap={achatsMapState}
                    categorieArray={CategoriesArrayState}
                    prix={prix}></Ticket>
            </ModalTicket>
        </View>
    );
}

export default Item;


/*
<Dialog onTouchOutside={() => setMontrerModal(false)}></Dialog>

*/