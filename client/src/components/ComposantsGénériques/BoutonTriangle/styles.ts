import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth: number = Dimensions.get('window').width;
const rem: number = entireScreenWidth / 380;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8 * rem,
    borderRightWidth: 8 * rem,
    borderTopWidth: 14 * rem,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  },

});

export default styles;