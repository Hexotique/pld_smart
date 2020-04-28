import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    composant:{
        flex:1,
        alignItems:'center'
    },
    titre:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        marginBottom:30,
        marginTop:30,
    },
    bouton:{
        backgroundColor: "#ffffff79",
        borderRadius : 10,
        width: width*0.4,
        height:35,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color:'#666666',
    }

});

export default styles;