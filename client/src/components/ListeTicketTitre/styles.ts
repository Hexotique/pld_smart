import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginBottom:10,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
        alignItems: 'center',
        // justifyContent: 'space-evenly',
    },
    titre: {
        flex : 6,
        fontWeight: "500",
        color: "black",
        fontSize: 15,
        fontFamily: "Impact",
        textAlign: "center",
    },
    imageContainer: {
        flex: 2,
      //  justifyContent: "flex-end",
       // alignItems: "center",
    },
    image: {
        height: 30,
        width: 30,
        marginBottom: 3,
        zIndex: 999,
    },
});

export default styles;