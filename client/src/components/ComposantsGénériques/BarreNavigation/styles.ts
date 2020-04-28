import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
    conteneur_navBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: '2%',
        height: '9%',
        paddingBottom: 50 * rem
    },
});

export default styles;