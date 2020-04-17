import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listItem: {
        height: 60,
        marginLeft: -100,
        justifyContent: 'center',
        backgroundColor: 'red',
        marginTop: 10
    },
    absoluteCell: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 100 + Dimensions.get('window').width,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    absoluteCellText: {
        fontFamily: "Impact",
        fontSize: 20,
        fontWeight: "bold"
    },
    innerCell: {
        width: Dimensions.get('window').width,
        height: 60,
        marginLeft: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;