import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

     vueCentre: {
          flex: 1,
          justifyContent: "center",
          marginTop: 22
     },
     
     modalConteneur: {
          flex: 0.8,
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 20,
          borderRadius: 20,
          padding: 5,
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