import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
    conteneur_entete: {
        flex:15,
        flexDirection: 'column',
        backgroundColor: 'white',
        //height: '9%',
        marginBottom: 10 * rem,
        zIndex: 10
    },
    ligne1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 3,
        zIndex: 100,
        paddingLeft: 20 * rem,
        paddingRight: 20 * rem
    },
    ligne2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    conteneur_infos_app: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        
    },
    conteneur_boutton_triangle: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    nom_app: {
        //flex: 15,
        fontFamily: "Lobster-Regular",
        fontSize: 22 * rem,
    },
    profil: {
        position: 'absolute',
        backgroundColor: 'white', 
        width: entireScreenWidth,
        zIndex: 5,
        elevation: 3
    }
});

export default styles;