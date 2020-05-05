import React, { useState } from 'react';
import { View, TouchableHighlight } from 'react-native';
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

function ScannerCodeBarre() {

    const [flashAllume, setflahAllume] = useState(false);
    const [reconnaitreCode, setReconnaitreCode] = useState(true);
    const [articleScanne, setArtiCleScanne] = useState(['non reconnu', '../../assets/Flag_Blank.png'])
    const [montrerModal, setMontrerModal] = useState(false);

    var code = ""; //trouver meilleure façon de récup le code barre ?
    const _codeBarreLu = (donnees: DonneesCodeBarre) => {
        console.log(donnees.data);
        code = donnees.data;
        setReconnaitreCode(false);
        recupererProduitViaCodeBarre(donnees.data)
            .then((res) => {
                setArtiCleScanne([res.product.product_name, res.product.image_small_url]);
                setMontrerModal(true);
            }).catch((error) => {
                console.log(error);
                setMontrerModal(false);
                setReconnaitreCode(true);
                setArtiCleScanne(['non reconnu', '../../assets/Flag_Blank.png']);
                setMontrerModal(false);
            });

        //Alert.alert("data : " + donnees.data + "\nrawData : " + donnees.rawData + "\ntype : " + donnees.type);
    }

    const onCloseHandler = () => {
        setMontrerModal(false);
        setReconnaitreCode(true);
        setArtiCleScanne(['non reconnu', '../../assets/Flag_Blank.png']);
        setMontrerModal(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableHighlight
                style={styles.rond}
                onPress={() => { setflahAllume(!flashAllume) }}
            >
                <Icon name={flashAllume ? iconOff : iconOn} size={rayon / 1.5} color={'#474747ff'} />
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
        </View>
    );
}

export default ScannerCodeBarre;