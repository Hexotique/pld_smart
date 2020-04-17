import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ticket :{
        flex: 1,
        flexDirection:"row",
        align:"center",
        marginTop : 5,
        marginLeft : 20,
        marginRight:20,
        backgroundColor: "#ffdd8a",
        borderRadius : 15,
    },
    ligne1 :{
        flex: 1,
        flexDirection:"row",
        marginLeft: 6,
    },
    ligne2 :{
        flex: 1,
        flexDirection:"row",
        marginLeft: 6,
    },
    colonne1:{
        flex :5,
    },
    colonne2:{
        flex :2,
    },
    commerce: {
        fontWeight: "bold",
        fontSize: 13,
        fontFamily: "Arial",
        textAlign:"left",
        flex:4,
        marginTop: 5,
    },
    prix: {
        fontWeight: "bold",
        fontSize: 13,
        fontFamily: "Arial",
        textAlign:"right",
        marginTop: 5,
        flex:2,
    },
    image: {
        flex:3,
        marginLeft: 20,
        height: 10,
        width: 20,
        marginBottom: 13,
        marginTop: 13,
    },
    date: {
        fontWeight: "100",
        fontSize: 12,
        fontFamily: "Arial",
        float:"right",
        flex:2,
        marginBottom: 5,
        marginTop: 4,
        marginLeft:15,
        fontStyle:"italic",
    },


});

export default styles;