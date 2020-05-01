import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScannerProp } from "../../navigator";
import ScannerCodeBarre from '../../components/ScannerCodeBarre'

function Scanner({ route, navigation }: ScannerProp) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScannerCodeBarre />
        </SafeAreaView>
    );
}



export default Scanner;
