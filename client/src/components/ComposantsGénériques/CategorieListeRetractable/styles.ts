import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 45,
        marginLeft: 10,
        marginRight: 15,
        marginTop: 3,
        paddingLeft: 10,
        borderRadius: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#cc4125'
    },
    nomItem: {
        flex: 1,
        fontFamily: "Comfortaa",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },

});

export default styles;