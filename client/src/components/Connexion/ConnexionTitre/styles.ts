import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    composant:{
        flex:1,
        alignItems:'center'
    },

    titre:{
        fontSize:50,
        fontWeight:'bold',
        fontStyle:'italic',
        color:'white',
        marginBottom:10,
        marginTop:10,
        textShadowColor: 'red', // IOS
        textShadowOffset: { height: 2, width: 2 }, // IOS
        textShadowRadius: 6, //IOS
    }

});

export default styles;