import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    conteneur_entete: {
        //flex: 1,
        flexDirection : 'column',
        backgroundColor: 'white',
        paddingLeft: 20,
        height: '15%'
    },
    ligne1: {
        marginRight: '7%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ligne2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"flex-end"
    },
    conteneur_infos_app:{
        flex:8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start"        
        
    },
    conteneur_boutton_triangle:{
        flex:2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"        
    },
    nom_app: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Lobster"
        
    },
    logo : {
    }
});

export default styles;