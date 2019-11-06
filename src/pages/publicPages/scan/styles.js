import {StyleSheet} from 'react-native'
import {scaleSize} from "../../../utils/screenUtil";

export const scanStyle = StyleSheet.create({
    wrapper: {
        height: '100%',
    },
    content: {
        flex: 1,
    },
    coverContent: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleLight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(520)
    },
    lightIcon: {
        width: scaleSize(34),
        height: scaleSize(34)
    },
    lightTips: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    tips: {
        fontSize: scaleSize(28),
        textAlign: 'center',
        paddingTop: scaleSize(40),
        color: '#fff'
    }
});
