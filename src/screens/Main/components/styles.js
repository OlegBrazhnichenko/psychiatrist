import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        width: '100%'
    },
    refreshButton: {
        alignSelf:"center",
        position: 'absolute',
        bottom:10,
    },
    refreshButtonImage: {
        width: 70,
        height: 70
    },
    card: {
        padding: 10,
        marginTop: -50,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'

    },
    cardText: {
        fontSize: 30,
        backgroundColor:'red',
        borderRadius: 10,
        padding: 20,
        color: '#000000',
        textAlign: 'center'
    },
    cardExample: {
        textAlign: 'center',
        fontSize: 20,
        color: '#3a3a3a',
        marginTop: 20,
    },
})