import React, { SetStateAction } from 'react';
import {  Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemListe from '../ItemListe';
import { CheckBox } from 'react-native-elements';

type ListeGlissableProps = {
    donnee: Array<any>;
    setDonnee: React.Dispatch<SetStateAction<Array<{
        id: string;
        checked: boolean;
    }>>>;
    enleveItem: Function;
    droite?: any;
    gauche?: any;
    droiteHandler?: Function;
    gaucheHandler?: Function;
};

function ListeGlissable(props: ListeGlissableProps) {
    const onCheckHandler = (id: string) => {
        props.setDonnee(prevListe => prevListe.map(item => {
            if (item.id === id) {
                return ({
                    ...item,
                    checked: !item.checked
                });
            } else {
                return ({
                    ...item
                });
            }
        }));
    }

    const renderItems = () => props.donnee.map((item) => 
        <ItemListe
            key={item.id}
            permetDefile={() => {}}
            enleveItem={() => props.enleveItem(item.id)}
            droite={props.droite}
            checked={item.checked}

        >
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CheckBox
                    wrapperStyle={{
                        alignSelf: 'flex-start'
                    }}
                    checkedColor="red"
                    checked={item.checked}
                    onPress={() => onCheckHandler(item.id)}
                />
                <Text
                    style={{
                        flex: 1,
                        fontFamily: "Comfortaa-Bold",
                        fontSize: 18,
                        color: '#434343',
                        marginLeft: 80
                    }}
                >{item.id}</Text>
            </View>
        </ItemListe>
    )

    return (
        <View>
            <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
                {renderItems()}
            </ScrollView>
        </View>
    );
}

export default ListeGlissable;