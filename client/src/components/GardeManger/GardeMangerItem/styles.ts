import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 35,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 3,
        paddingLeft: 10,
        borderRadius: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#e6b8af'
    },
    nomItem: {
        flex: 6,
        fontFamily: "Comfortaa"
    },
    quantiteItem: {
        flex: 2,
        fontFamily: "Comfortaa"
    },
    changerQuantite: {
        flex: 1,
    },
    icon: {
        height: 20,
        width: 20
    },
});

export default styles;