import React, { useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import { recupererProduitViaCodeBarre } from '../../api';
import ModalProduit from '../ModalProduit';

interface DonneesCodeBarre {
    data: string,
    rawData: string | undefined,
    type: any,
    bounds: any
}

function ScannerCodeBarre() {
    const [flahAllume, setflahAllume] = useState(false);
    const [reconnaitreCode, setReconnaitreCode] = useState(true);
    const [articleScanne, setArtiCleScanne] = useState(['non reconnu', '../../assets/Flag_Blank.png'])
    const [montrerModal, setMontrerModal] = useState(false);

    const _codeBarreLu = (donnees: DonneesCodeBarre) => {
        console.log(donnees.data);
        setReconnaitreCode(false);
        recupererProduitViaCodeBarre(donnees.data)
            .then((res) => {
                setArtiCleScanne([res.product.product_name, res.product.image_small_url]);
                setMontrerModal(true);
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
            <RNCamera
                style={styles.affichage}
                onBarCodeRead={reconnaitreCode ? _codeBarreLu : () => { }}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                flashMode={flahAllume ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}

            >
            </RNCamera>
            <ModalProduit show={montrerModal} close={onCloseHandler} nom={articleScanne[0]} url={articleScanne[1]} />
        </View>
    );
}

export default ScannerCodeBarre;