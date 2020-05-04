import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;
const hauteurBarreNav : number = 0.1 * entireScreenWidth;

const styles = StyleSheet.create({
    conteneur_navBar: {
        position:'absolute',
        bottom:0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ffffffa5',
        paddingLeft: '2%',
        width:entireScreenWidth,
        height: hauteurBarreNav,
        paddingBottom: hauteurBarreNav*2
    },
});

export default styles;