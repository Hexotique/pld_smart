import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    champ:{
        backgroundColor: "#ffffff79",
        borderRadius : 20,
        width: width*0.7,
        marginBottom:10,
        marginTop:10,
        textAlign:'right',
        fontSize:20,
        fontWeight:'bold',
        color:'#666666',
        padding : 20,
    },
    bouton:{
        backgroundColor: "#ffffff79",
        borderRadius : 10,
        width: width*0.4,
        height:30,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color:'#666666',
    },
    composant:{
        flex:1,
        alignItems:'center'
    },

});

export default styles;