import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';


function _codeBarreLu() {
    console.log("code barre lu");
}

function ScannerCodeBarre() {
    //const [torchOn, setTorchOn] = useState(false);

    return (
        <View style={{ flex: 90 }}>
            <RNCamera
                style={styles.affichage}
                onBarCodeRead={_codeBarreLu}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            >
            </RNCamera>
        </View>
    );
}

export default ScannerCodeBarre;