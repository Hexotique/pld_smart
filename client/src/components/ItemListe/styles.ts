import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listItem: {
        height: 80,
        marginLeft: -100,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    absoluteCell: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    absoluteCellText: {
        
    },
    innerCell: {
        width: Dimensions.get('window').width,
        height: 80,
        marginLeft: 100,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;