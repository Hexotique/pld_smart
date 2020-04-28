import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
    rond: {
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default styles;