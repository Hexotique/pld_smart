import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const numColumns = 3;
const marginItem = 10;
const marginGlobale = 20; 

const styles = StyleSheet.create({
    ticket :{
        flex: 1,
        height:180,
        width: ((width - (2*marginGlobale) )/(numColumns)) - (marginItem*2),
        marginTop : 10,
        marginBottom : 10,
        marginLeft : 10,
        marginRight : 10,
        backgroundColor: "#f3f3f37a",
        borderRadius : 20,
        alignItems : 'center',
        borderColor:"#b7b7b7",
        borderWidth:2
    },

    overlay:{
        position: "absolute",
        backgroundColor: "gray",
        opacity: 0.9,
    },
    
    commerce: {
        flex: 1,
        marginTop : 30,
        marginLeft : 5,
        marginRight : 5,
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Arial",
    },
    date: {
        flex: 1,
        marginTop : 10,
        marginLeft : 5,
        marginRight : 5,
        fontWeight: "100",
        fontSize: 10,
        fontFamily: "Arial",
        fontStyle:"italic",
    },
    prix: {
        flex: 1,
        marginTop : 10,
        marginBottom : 10,
        marginLeft : 5,
        marginRight : 5,
        fontSize: 18,
        fontFamily: "Arial",
        fontWeight: "bold",
    },
   
});

export default styles;