import React, { useState } from 'react';
import {  View, FlatList } from 'react-native';

import ItemListe from '../ItemListe';

import styles from './styles';

type ListeGlissableProps = {
    items: Array<{ key: string; }>;
    gauche?: any;
    droite?: any;
    gaucheHandler?: Function;
    droiteHandler?: Function;
};

function ListeGlissable(props: ListeGlissableProps) {
    const [modeDefile, setModeDefile] = useState(true);

    return (
        <View style={{ flex: 90 }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 140 }}
                data={props.items}
                renderItem={({ item }) => (
                    <ItemListe
                        texte={item.key}
                        permetDefile={setModeDefile}
                        gauche={props.gauche}
                        droite={props.droite}
                        gaucheHandler={props.gaucheHandler}
                        droiteHandler={props.droiteHandler}
                    />
                )}
            />
        </View>
    );
}

export default ListeGlissable;