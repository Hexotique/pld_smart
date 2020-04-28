import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    champ:{
        backgroundColor: "#ffffff79",
        borderRadius : 20,
        width: width*0.7,
        marginVertical:5,
        textAlign:'right',
        fontSize:20,
        fontWeight:'600',
        padding : 20,
    },

    bouton:{
        backgroundColor: "white", //#ffa500d4
        width: width*0.4,
        height:40,
        borderRadius : 10,
        alignItems:'center',
        marginVertical:8,
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
    },

    composant:{
        flex:1,
        alignItems:'center'
    },

});

export default styles;