import React from 'react';
import { SafeAreaView } from 'react-native';
import ScannerCodeBarre from '../../components/ComposantsScanner/ScannerCodeBarre'


function Scanner() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScannerCodeBarre />
        </SafeAreaView>
    );
}


export default Scanner;
