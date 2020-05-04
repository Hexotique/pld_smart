import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({

    conteneur_image: {
        flex: 1,
    },

    profile_image: {
        height: 27 * rem,
        width: 32 * rem,
        //marginRight: 2 * rem
    },
});

export default styles;