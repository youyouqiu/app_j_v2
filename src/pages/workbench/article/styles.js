import {scaleSize} from "../../../utils/screenUtil";
import {StyleSheet} from 'react-native'

export const conStyle = {
    csItemContent: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#EAEAEA'
    },
    csItemContains: {
        flexDirection: 'row',
        paddingLeft: scaleSize(40),
        paddingTop: scaleSize(32),
        paddingBottom: scaleSize(32),
        paddingRight: scaleSize(40)
    },
    csItemRight: {
        width: scaleSize(228),
        height: scaleSize(172),
        borderRadius: scaleSize(8)
    },
    csItemLeft: {
        flexDirection: 'column',
        flex: 1,
        // paddingTop:scaleSize(20),
        // paddingBottom:scaleSize(20),
        paddingRight: scaleSize(20)
    },
    csItemTitle: {
        flex: 1,
        color: '#000000',
        fontSize: scaleSize(30)
    },
    csItemTime: {
        color: '#868686',
        fontSize: scaleSize(26)
    },
    csItemTimeWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    csItemTimeIcon:{
        width: scaleSize(30),
        height: scaleSize(30)
    }
};
