import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        flexDirection: 'row'
    },
    conteneurPrincipale: {
        width: Dimensions.get('window').width,
        height: 50,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'gray'
    },
    conteneurGauche: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'green',
        height: 50
    },
    conteneurDroite: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#d91f1fff",
        height: 50
    },
    textePrincipale: {
        fontFamily: "Comfortaa",
        fontWeight: "bold",
        fontSize: 18,
        color: '#434343'
    }
});

export default styles;