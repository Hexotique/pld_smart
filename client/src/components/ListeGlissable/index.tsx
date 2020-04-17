import React, { useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';

import ItemListe from '../ItemListe';

import styles from './styles';

const listData = [
    { key: "Yaourts" },
    { key: "Miel" },
    { key: "Chips" }
]

function ListeGlissable() {
    const [enableScroll, setEnableScroll] = useState(true);

    return (
        <FlatList
            data={listData}
            renderItem={({item}) => <ItemListe text={item.key} toggleScroll={setEnableScroll} />}
        />
    );
}

export default ListeGlissable;