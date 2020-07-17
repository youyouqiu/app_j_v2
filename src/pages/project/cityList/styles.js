import {StyleSheet} from "react-native";
import {scaleSize} from "../../../utils/screenUtil";

const styles = StyleSheet.create({
    current: {
        // paddingHorizontal:scaleSize(40),
        paddingTop: scaleSize(25),
        backgroundColor: '#fff'
    },
    current_txt: {
        paddingLeft: scaleSize(40),
        fontSize: scaleSize(24),
        color: '#868686',
    },
    current_city: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleSize(13),
        paddingLeft: scaleSize(40),
        paddingBottom: scaleSize(24),
        borderBottomWidth: 1,
        borderColor: '#EAEAEA'
    },
    current_cityName: {
        fontSize: scaleSize(32),
        color: '#1F3070'
    },
    Opening: {
        backgroundColor: '#fff'
    },
    Opening_txt: {
        width: '100%',
        color: '#868686',
        height: scaleSize(81),
        fontSize: scaleSize(24),
        backgroundColor: '#fff',
        lineHeight: scaleSize(81),
        paddingLeft: scaleSize(40)
    },
    mark: {
        width: '100%',
        height: scaleSize(70),
        backgroundColor: '#F8F8F8',
        paddingLeft: scaleSize(40)
    },
    Opening_city: {
        width: '100%',
        height: scaleSize(109),
        marginLeft: scaleSize(40),
        backgroundColor: '#fff'
    },
    padL: {
        paddingRight: scaleSize(40)
    },
    cl_refreshLocation: {
        fontSize: scaleSize(28),
        color: '#000',
        marginLeft: scaleSize(20)
    },
    cl_refreshLocationIcon: {
        width: scaleSize(22),
        height: scaleSize(22)
    },
    cl_refreshTouch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cl_refreshLocationIng:{
        paddingRight: scaleSize(32),
        color:'#868686'
    }
});

export default styles
