import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 90,
    },
    ajoutProduit: {
        height: 45,
        backgroundColor: "#fff2ee",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    ajoutProduitTexte: {
        textAlign: "center"
    },
    vueItem: {
        width: Dimensions.get('window').width,
        height: 45,
        flexDirection  : "row",
        paddingLeft    : 10,
        paddingRight: 10,
        justifyContent : 'flex-start',
        alignItems     : 'center',
        backgroundColor: 'white',

    },
    

    nomItemConteneur: {
        flexDirection: "row",
        flex: 6,
        justifyContent: "center",
    },
    nomItem: {
        fontFamily: "Comfortaa",
        color: '#434343',
        fontWeight: "bold"
    },

    quantiteItem: {
        flex      : 1,
        fontFamily: "Comfortaa",
        textAlign: "center"
    },
    changerQuantite: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    boutonQuantite: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    icon: {
        height: 20,
        width : 20
    },

});

export default styles;