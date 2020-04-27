import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        marginBottom: 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignContent: "center"
    },

    conteneurTitre: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: 350,
        alignContent: "center",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    titre: {
        marginTop: 7,
        fontWeight: "700",
        marginRight: 30,
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },

    bande: {
        backgroundColor: "white",
        height: 50,
        width: 8,
        marginRight: 10
    }
});

export default styles;