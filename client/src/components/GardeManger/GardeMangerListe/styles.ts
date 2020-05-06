import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 90,
    },

    // Zone de texte et liste autocomplétée
    ajoutProduit: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    ajoutProduitConteneur: {
        borderWidth: 0,
        margin: 0,
        padding: 0,
        height: 45,
        backgroundColor: "#fff2ee",
    },

    ajoutProduitAutocompletion: {
        width: Dimensions.get('window').width,
        flex: 1,
        position: "absolute",
        top: 45,
        left: 0,
        borderWidth: 0,
        margin: 0,
        padding: 0,
    },

    ajoutProduitTexte: {
        textAlign: "center",
        borderWidth: 0
    },

    // Liste du garde manger

    listeGardeManger: {
        position: "absolute",
        top: 90,
        left: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        
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