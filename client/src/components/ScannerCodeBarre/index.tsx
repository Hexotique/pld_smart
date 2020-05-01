import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';


interface DonneesCodeBarre {
    data: string,
    rawData: string | undefined,
    type: any,
    bounds: any
}

function ScannerCodeBarre() {
    const [flahAllume, setflahAllume] = useState(false);
    const [reconnaitreCode, setReconnaitreCode] = useState(true);
    const [codeBarre, setCodeBarre] = useState(new String());

    const _codeBarreLu = (donnees: DonneesCodeBarre) => {
        setReconnaitreCode(false);
        setCodeBarre(donnees.data);
        //Alert.alert("data : " + donnees.data + "\nrawData : " + donnees.rawData + "\ntype : " + donnees.type);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.entete}>
                <Text>{codeBarre}</Text>
                <Button title={'Valider'} onPress={() => { setReconnaitreCode(true); setCodeBarre(new String()); }}></Button>
            </View>
            <RNCamera
                style={styles.affichage}
                onBarCodeRead={reconnaitreCode ? _codeBarreLu : () => { }}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                flashMode={flahAllume ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}

            >
            </RNCamera>
        </View>
    );
}

export default ScannerCodeBarre;