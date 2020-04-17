import { StyleSheet } from 'react-native';
import Constants from "expo-constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#dd7e6bff",
    color: 'white',
    borderRadius: 5,
    paddingLeft: '5%',
    fontWeight: 'bold',
    marginLeft: '2%',
    marginRight: '2%'
  },
  title: {
    fontSize: 24
  }

});

export default styles;