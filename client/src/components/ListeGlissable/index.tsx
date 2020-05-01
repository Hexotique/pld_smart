import React, { useState } from 'react';
import {  View, FlatList, ListRenderItem } from 'react-native';

import ItemListe from '../ItemListe';

import styles from './styles';

type ListeGlissableProps = {
    items: Array<any>;
    renderItems: ListRenderItem<any>;
};

function ListeGlissable(props: ListeGlissableProps) {
    return (
        <View style={{ flex: 90 }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 140 }}
                data={props.items}
                renderItem={props.renderItems}
            />
        </View>
    );
}

export default ListeGlissable;