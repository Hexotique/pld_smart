import React, { useState, useEffect } from 'react';
import { TouchableHighlight, SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import { recupererProduitViaCodeBarre } from '../../../api';
import ModalProduit from '../ModalProduit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { rayon } from './styles';
import { Alerte } from '../Alerte';

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

var ticket: Map<String, PaireDonneesArticle>;

function ScannerCodeBarre({ idCommerce }: any) {

    const [flashAllume, setflahAllume] = useState(false);
    const [reconnaitreCode, setReconnaitreCode] = useState(true);
    const [articleScanne, setArtiCleScanne] = useState(['non reconnu', '../../assets/Flag_Blank.png'])
    const [montrerModal, setMontrerModal] = useState(false);
    const [code, setCode] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);



    useEffect(() => { ticket = new Map<String, PaireDonneesArticle>(); console.log('ok') }, []);

    const ajouterArticleTicket = (codeBarre: string, quantite: number, prix: number) => {
        console.log(codeBarre + " : " + quantite + " " + prix);
        ticket.set(codeBarre, { quantite: quantite, prix: prix });
    }

    const _codeBarreLu = (donnees: DonneesCodeBarre) => {
        setCode(donnees.data as string);
        setReconnaitreCode(false);
        if (donnees.type === [RNCamera.Constants.BarCodeType.qr]) {
            console.log("QR code : " + code);
            setAlertVisible(true);
            setReconnaitreCode(false);
            ticket = new Map<String, PaireDonneesArticle>();
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
    }

    const onCloseHandler = () => {
        setMontrerModal(false);
        setReconnaitreCode(true);
        setArtiCleScanne(['non reconnu', '../../assets/Flag_Blank.png']);
        setMontrerModal(false);
    }

    const recHandler = () => {
        setAlertVisible(false);
        setReconnaitreCode(true);
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
            <ModalProduit
                show={montrerModal}
                close={onCloseHandler}
                nom={articleScanne[0]}
                url={articleScanne[1]}
                codebarre={code}
                ajouterArticleTicket={ajouterArticleTicket}
            />
            <View style={styles.boutonBas}>
                <Button type='clear' title='Annuler'></Button>
            </View>
            <Alerte
                visible={alertVisible}
                setVisible={setAlertVisible}
                texte="Voulez vous valider ce ticket ?"
                couleur='rgba(217,31,31,1)'
                funcValide={recHandler}
                funcAnnule={() => { setAlertVisible(false); setReconnaitreCode(true) }}
            />
        </SafeAreaView>
    );
}

export default ScannerCodeBarre;