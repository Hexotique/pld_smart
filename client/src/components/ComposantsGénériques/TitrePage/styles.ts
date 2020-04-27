import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        marginBottom: 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: "flex-end"
        // justifyContent: 'space-evenly',
    },

    conteneurTitre: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: "#ec7552"
    },

    titre: {
        fontWeight: "500",
        color: "black",
        fontSize: 25,
        fontFamily: "Impact",
        textAlign: "center",
    },
});

export default styles;