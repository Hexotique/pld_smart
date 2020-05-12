import React from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Text, Vibration } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';


export interface Propriete {
    show: boolean,
    close: any,
    codebarre: string,
    url: string,
    nom: string,
    ajouterArticleTicket: any,
}

function ModalProduit(props: Propriete) {
    console.log('code barre : ' + props.codebarre);

    const [valPrix, setValPrix] = React.useState('');
    const [valQuantite, setValQuantite] = React.useState('');

    const valider = () => {
        if (valQuantite !== '' && valQuantite !== '') {
            props.ajouterArticleTicket(props.codebarre, valQuantite, valPrix);
            props.close();
            setValPrix('');
            setValQuantite('');
        } else {
            Toast.show('Champs manquants', Toast.SHORT)
            Vibration.vibrate([0, 80, 80, 80])
        }
    }

    return (
        props.show ?

            <Modal
                backdropColor='grey'
                isVisible={props.show}
            >
                <TouchableOpacity onPressOut={props.close}
                    activeOpacity={1} style={styles.container} >
                    <View style={styles.vueCentre}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalConteneur}>
                                <View style={styles.fermerModal}>
                                    <TouchableOpacity onPress={props.close}>
                                        <Image style={styles.iconeCroix} source={require("../../../assets/close.png")} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <View style={styles.zoneQuestion}>
                                        <Text style={styles.question}>      Souhaitez-vous ajouter {"\n"} ce produit au garde manger ?</Text>
                                    </View>
                                    <View style={styles.zoneNom}>
                                        <Text style={styles.nom}>{props.nom}</Text>
                                    </View>
                                    <Image style={styles.image} source={{ uri: props.url }}></Image>
                                    <View style={styles.zoneSaisie}>
                                        <TextInput
                                            placeholder="Prix"
                                            placeholderTextColor="#3b3b3bad"
                                            autoCapitalize='none'
                                            onChangeText={prix => setValPrix(prix)}
                                            keyboardType='numeric'
                                        />
                                        <TextInput
                                            placeholder="Quantite"
                                            placeholderTextColor="#3b3b3bad"
                                            autoCapitalize='none'
                                            onChangeText={quantite => setValQuantite(quantite)}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <View style={styles.zoneBoutons}>
                                        <TouchableOpacity style={styles.boutonOui} onPress={() => valider()}>
                                            <Text style={styles.texteBouton}>OUI</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.boutonNon} onPress={props.close}>
                                            <Text style={styles.texteBouton}>NON</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal >


            : null
    );
}


export default ModalProduit;