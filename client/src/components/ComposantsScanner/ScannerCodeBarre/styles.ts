import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const entireScreenHeight: number = Dimensions.get('window').height;
const rem: number = entireScreenWidth / 380;

export const rayon = 40 * rem;

const styles = StyleSheet.create({
    affichage: {
        position: 'absolute',
        height: entireScreenHeight,
        width: entireScreenWidth,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    entete: {
        flex: 5,
    },
    rond: {
        zIndex: 5,
        marginTop: 10 * rem,
        marginLeft: 10 * rem,
        backgroundColor: '#ababab6e',
        height: rayon,
        width: rayon,
        borderRadius: (rayon / 2),
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;