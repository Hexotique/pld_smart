import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
     main_container: {
          flex: 1,
          flexDirection: 'row',
          paddingLeft: '4%',
          paddingRight: '4%',
          marginVertical: '1%',
          alignItems: 'center',
     },
     product_container: {
          paddingVertical:'1%',
          flex: 50,
          backgroundColor: '#e6b8afff',
          borderRadius: 5,
          paddingLeft: '5%',
          paddingRight: '5%',
     },
     quantity_container: {
          paddingVertical:'1%',
          flex: 25,
          alignItems: 'center',
          borderRadius: 5,
     },
     price_container: {
          paddingVertical:'1%',
          flex: 25,
          backgroundColor: '#e6b8afff',
          alignItems: "center",
          borderRadius: 5,
     },
     product_tag: {
          // fontFamily:
          // fontSize:
     },
     quantity_tag: {
          // fontFamily:
          // fontSize:
     },
     price_tag: {
          // fontFamily:
          // fontSize:
     },
});

export default styles;