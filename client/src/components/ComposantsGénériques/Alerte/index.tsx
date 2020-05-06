import React, { PropsWithChildren } from 'react';
import { Dimensions, Text, View } from 'react-native';

import Modal from 'react-native-modal';
import BoutonRond from '../BoutonRond';

type AlerteProps = {
    visible: boolean;
    setVisible: Function;
    texte: string;
    couleur: string;
    funcValide: Function;
    funcAnnule: Function;
};

export function Alerte(props: PropsWithChildren<AlerteProps>) {
    return (
        <Modal
            isVisible={props.visible}
            backdropColor="grey"
            onBackButtonPress={() => props.setVisible(false)}
            onBackdropPress={() => props.setVisible(false)}
        >
            <View style={{
                padding: 30,
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 20,
                elevation: 5
            }}>
                <Text style={{
                    padding: 20,
                    textAlign: 'center',
                    color: 'rgba(217,31,31,1)',
                    fontFamily: 'Comfortaa-Bold'
                }}>
                    {props.texte}
                    </Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: 'center',
                    width: Dimensions.get("screen").width
                }}>
                    <BoutonRond icon={'check'} couleur={props.couleur} rayon={50} fonction={props.funcValide} />
                    <BoutonRond icon={'close'} couleur={props.couleur} rayon={50} fonction={props.funcAnnule} />
                </View>
            </View>
        </Modal>
    );
}