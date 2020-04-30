import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 45,
        marginLeft: -120,
        justifyContent: 'center',
        backgroundColor: '#ec7552',
        borderTopWidth: 1,
        borderTopColor: '#b3b3b3'
    },
    vueItem: {
        width: Dimensions.get('window').width,
        marginLeft: 120,
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
        flex: 10,
        justifyContent: "center"
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
    vueSwipe: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 120 + Dimensions.get('window').width,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 5,
        alignItems: 'center'
    },
    vueSwipeTexte: {
        fontFamily: "Impact",
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    }
});

export default styles;