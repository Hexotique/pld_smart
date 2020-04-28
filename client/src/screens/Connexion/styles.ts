import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({

    fondImage: {
        flex:1,
        width: width,
        height: height,
   },

   fondTransparent:{
        
   },
     
});

export default styles;