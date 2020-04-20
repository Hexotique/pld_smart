import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        marginBottom: 20,
        flexDirection: 'row',
        paddingLeft: 30,
        // justifyContent: 'space-evenly',
    },
    titre: {
        flex : 6,
        fontWeight: "500",
        color: "black",
        fontSize: 25,
        fontFamily: "Impact",
        textAlign: "center",
    },
    imageContainer: {
        flex: 2,
    },
    image: {
        height: 30,
        width: 30,
        marginBottom: 3,
    },
});

export default styles;