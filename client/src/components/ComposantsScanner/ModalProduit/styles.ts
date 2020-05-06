import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    vueCentre: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,

    },
    fermerModal: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
    },
    iconeCroix: {
        height: 30,
        width: 30,
    },
    contenu: {
        flex: 1,
        flexDirection: 'column',
    },
    zoneQuestion: {
        flex: 2,
        backgroundColor: "white",
        alignItems: 'center',
        marginBottom: 20,
    },
    question: {
        color: "#ec7552",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
    },
    zoneNom: {
        flex: 1,
        alignItems: 'center',
    },
    nom: {
        fontSize: 15,
        fontWeight: "bold",
        textTransform: 'uppercase',
    },
    image: {
        flex: 8,
        resizeMode: 'contain',
        marginLeft: 30,
        marginRight: 30,
    },
    zoneBoutons: {
        flex: 3,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    boutonOui: {
        marginRight: 20,
        backgroundColor: "#ec7552",
        width: 60,
        height: 60,
        borderRadius: 35,
        //alignItems: 'center',
    },
    boutonNon: {
        marginLeft: 20,
        backgroundColor: "#ec7552",
        width: 60,
        height: 60,
        borderRadius: 35,
        //alignItems: 'center',
    },
    texteBouton: {
        marginTop: 17,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    modalConteneur: {
        backgroundColor: "#e5e5e5",
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    zoneArticle: {
        flex: 9,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;