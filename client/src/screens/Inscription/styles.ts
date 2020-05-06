import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({

    fondImage: {
        flex: 1,
        width: width,
        height: height,
    },

    fondTransparent: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: '#f629009d',
    },
    titre: {
        position: 'absolute',
        left: 0,
        right: 0
    },

    inscription: {
        position: 'absolute',
        left: 0,
        right: 0
    },


});

export default styles;