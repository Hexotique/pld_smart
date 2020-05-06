import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

     container: {
          flex: 1
     },
     
     vueCentre: {
          flex: 1,
          justifyContent: "center",
          marginTop: 22,
          
     },
     bouttons: {
          flexDirection: "row",
     },
     supprimerModal:{
          flexDirection: "row",
          flex:0.6,
          paddingLeft: 10,
     },
     fermerModal: {
          flexDirection: "row",
          flex:0.4,
          justifyContent: "flex-end",
          paddingRight: 10,
     },
     iconeCroix: {
          height: 30,
          width: 30,
     },
     boutonSuppr: {
          backgroundColor: "white",
          borderRadius : 7,
     },
     modalConteneur: {
          backgroundColor: "#e5e5e5",
          flex: 0.8,
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 20,
          borderRadius: 20,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
     }
});

export default styles;