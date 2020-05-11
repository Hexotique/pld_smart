import React, { useState } from 'react';
import { TouchableHighlight, SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import { recupererProduitViaCodeBarre } from '../../../api';
import ModalProduit from '../ModalProduit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { rayon } from './styles';

const iconOn = require('../../../assets/guide_de_style.json').Icones.Flash_On;
const iconOff = require('../../../assets/guide_de_style.json').Icones.Flash_Off;

interface DonneesCodeBarre {
    data: string,
    rawData: string | undefined,
    type: any,
    bounds: any
}

interface PaireDonneesArticle {
    quantite: number,
    prix: number,
}

function ScannerCodeBarre() {

    const [flashAllume, setflahAllume] = useState(false);
    const [reconnaitreCode, setReconnaitreCode] = useState(true);
    const [articleScanne, setArtiCleScanne] = useState(['non reconnu', '../../assets/Flag_Blank.png'])
    const [montrerModal, setMontrerModal] = useState(false);
    const [code, setCode] = useState('');

    var ticket: Map<String, PaireDonneesArticle> = new Map<String, PaireDonneesArticle>();

    const ajouterArticleTicket = (codeBarre: string, quantite: number, prix: number) => {
        const ancienneQuantite = ticket.get(codeBarre)?.quantite;
        if (ancienneQuantite === undefined) {
            ticket.set(codeBarre, { quantite: quantite, prix: prix });
        } else {
            ticket.set(codeBarre, { quantite: quantite + ancienneQuantite, prix: prix })
        }
    }

    const _codeBarreLu = (donnees: DonneesCodeBarre) => {
        setCode(donnees.data as string);
        setReconnaitreCode(false);
        if (donnees.type === [RNCamera.Constants.BarCodeType.qr]) {

        } else {
            recupererProduitViaCodeBarre(donnees.data)
                .then((res) => {
                    setArtiCleScanne([res.product.product_name, res.product.image_url]);
                    setMontrerModal(true);
                }).catch((error) => {
                    console.log(error);
                    setMontrerModal(false);
                    setReconnaitreCode(true);
                    setArtiCleScanne(['non reconnu', '../../assets/Flag_Blank.png']);
                    setMontrerModal(false);
                });
        }
        //Alert.alert("data : " + donnees.data + "\nrawData : " + donnees.rawData + "\ntype : " + donnees.type);
    }

    const onCloseHandler = () => {
        setMontrerModal(false);
        setReconnaitreCode(true);
        setArtiCleScanne(['non reconnu', '../../assets/Flag_Blank.png']);
        setMontrerModal(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableHighlight
                style={styles.rond}
                onPress={() => { setflahAllume(!flashAllume) }}
            >
                <Icon style={{ transform: [{ rotateZ: '45deg' }] }} name={flashAllume ? iconOff : iconOn} size={rayon / 1.5} color={'#474747ff'} />
            </TouchableHighlight>
            <RNCamera
                style={styles.affichage}
                onBarCodeRead={reconnaitreCode ? _codeBarreLu : () => { }}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                flashMode={flashAllume ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            >
            </RNCamera>
            <ModalProduit show={montrerModal} close={onCloseHandler} nom={articleScanne[0]} url={articleScanne[1]} codebarre={code} />
            <View style={styles.boutonBas}>
                <Button type='clear' title='Annuler'></Button>
            </View>
        </SafeAreaView>
    );
}

export default ScannerCodeBarre;