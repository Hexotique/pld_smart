import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
    container: {
        marginTop: 5 * rem,
        marginBottom: 5 * rem,
        height: 30 * rem,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignContent: "center"
    },

    conteneurTitre: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: 290 * rem,
        height: 30 * rem,
        alignContent: "center",
        borderTopLeftRadius: 15 * rem,
        borderBottomLeftRadius: 15 * rem,
    },

    titre: {
        //fontWeight: "700",
        marginRight: 20,
        color: "white",
        fontSize: 18 * rem,
        fontFamily: "Comfortaa-Bold",
        textAlign: "center",
        justifyContent: "center"
    },

    bande: {
        backgroundColor: "white",
        width: 6 * rem,
        marginRight: 6*rem
    }
});

export default styles;