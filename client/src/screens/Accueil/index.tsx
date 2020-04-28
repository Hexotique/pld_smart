import React from 'react';
import { Button, Text, View } from 'react-native';

import { AccueilProp, GardeMangerProp, ListeCourseProp, ListeTicketProp, TicketDetailProp, ConnexionProp } from "../../navigator";

function Accueil({ route, navigation }: AccueilProp) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 8 }}>
                <Button
                    title="Connexion"
                    onPress={() => navigation.navigate('Connexion')}
                />
                <Button
                    title="Inscription"
                    onPress={() => navigation.navigate('Inscription')}
                />
                <Button
                    title="Liste de Courses"
                    onPress={() => navigation.navigate('ListeCourse')}
                />
                <Button
                    title="Garde Manger"
                    onPress={() => navigation.navigate('GardeManger')}
                />
                <Button
                    title="Liste de Tickets"
                    onPress={() => navigation.navigate('ListeTicket')}
                />
                <Button
                    title="Details de Ticket"
                    onPress={() => navigation.navigate('TicketDetail')}
                />
            </View>
        </View>
    );
}

export default Accueil;