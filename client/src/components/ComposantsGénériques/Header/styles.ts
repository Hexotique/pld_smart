import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
    conteneur_entete: {
        flex: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: '2%',
        //height: '9%',
        marginBottom: 10 * rem,
    },
    ligne1: {
        marginTop: 1 * rem,
        marginRight: '7%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        justifyContent: "flex-start"

    },
    conteneur_boutton_triangle: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    nom_app: {
        //flex: 15,
        fontWeight: "bold",
        fontSize: 18 * rem,
        fontFamily: "Lobster"
    }
});

export default styles;