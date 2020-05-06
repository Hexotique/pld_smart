import { StyleSheet, Dimensions } from 'react-native';

const taille = Dimensions.get('window').width / 40;

const styles = StyleSheet.create({

    vueItem: {
        borderTopWidth: 1,
        borderTopColor: '#b3b3b3',
        height: 45,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',

    },


    nomItemConteneur: {
        flexDirection: "row",
        flex: 3,
        justifyContent: "flex-start"
    },
    nomItem: {
        fontFamily: "Comfortaa",
        color: '#434343',
        fontWeight: "bold",
        fontSize: taille
    },

    quantiteItem: {
        flex: 1,
        fontFamily: "Comfortaa",
        textAlign: "center"
    },

    prixItem: {
        flex: 1,
        fontFamily: "Comfortaa",
        textAlign: "center"
    },


});

export default styles;