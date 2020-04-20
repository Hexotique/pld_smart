import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header_container: {
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: 'brown',
        paddingLeft: 20,
        alignItems: 'center',
        height: 60
    },
    header_title: {
        flex: 6,
        fontWeight: "bold",
        color: "white",
        fontSize: 30,
        fontFamily: "Impact"
    },
    profile_image: {
        height: 40,
        width: 40,
        marginRight: 10
    },
});

export default styles;