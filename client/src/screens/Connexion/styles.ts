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
        backgroundColor:'#f629009d',
    },
    titre: {
        flex :2,
    },
    connexion: {
        flex :2,
    },
    inscription: {
        flex :2,
    },
    

});

export default styles;