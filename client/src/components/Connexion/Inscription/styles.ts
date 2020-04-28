import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    composant:{
        flex:1,
        alignItems:'center'
    },
    titre:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
        marginBottom:10,
        marginTop:30,
    },

    bouton:{
        backgroundColor: "#fbbd4cff",
        width: width*0.4,
        height:40,
        borderRadius : 10,
        alignItems:'center',
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 2, //IOS
        elevation: 2, // Android
    },

    texteBouton:{
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontSize:18,
        color:'#d91f1fff',
        paddingVertical: '5%',
    }

});

export default styles;