import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';


interface DonneesCodeBarre {
    data: any,
    rawData: any,
    type: any,
    bounds: any
}

function _codeBarreLu(donnees: DonneesCodeBarre) {
    Alert.alert("data : " + donnees.data + "\nrawData : " + donnees.rawData + "\ntype : " + donnees.type);
}

function ScannerCodeBarre() {
    const [torchOn, setTorchOn] = useState(false);

    return (
        <View style={{ flex: 90 }}>
            <RNCamera
                style={styles.affichage}
                onBarCodeRead={_codeBarreLu}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                flashMode={torchOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
            >
            </RNCamera>
        </View>
    );
}

export default ScannerCodeBarre;