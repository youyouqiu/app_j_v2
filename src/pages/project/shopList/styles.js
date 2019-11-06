import {StyleSheet} from "react-native";
import {scaleSize} from "../../../utils/screenUtil";

export default StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff'
    },
    tipsContent: {
        padding: scaleSize(34),
        flexDirection: 'row',
        alignItems: 'center',
        // borderT
    },
    tipsRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    subscriptionLock: {
        width: scaleSize(26),
        height: scaleSize(26)
    },
    tipsRightText: {
        fontSize: scaleSize(24),
        color: '#000000',
        paddingLeft: scaleSize(6)
    },
    disorderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: scaleSize(30)
    },
    tipsCircular: {
        width: scaleSize(12),
        height: scaleSize(12),
        borderRadius: scaleSize(6)
    },
    tipsStatusText: {
        fontSize: scaleSize(24),
        paddingLeft: scaleSize(10),
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EAEAEA',
    },
    floorItem: {
        flexDirection: 'column',
        paddingTop: scaleSize(40),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32)
    },
    floorHeader: {
        flexDirection: 'row',
        alignContent: 'center',
        flex: 1
    },
    floorRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    floorNumber: {
        color: '#000',
        fontSize: scaleSize(36)
    },
    floorLabelWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: scaleSize(6)
    },
    floorLabel: {
        backgroundColor: '#4B6AC5',
        fontSize: scaleSize(22),
        height: scaleSize(32),
        width: scaleSize(50),
        textAlign: 'center',
        borderRadius: scaleSize(2),
        color: '#fff'
    },
    floorIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(6)
    },
    floorRightText: {
        fontSize: scaleSize(28)
    },
    floorRightIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginLeft: scaleSize(6)
    },
    floorContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: scaleSize(32)
    },
    roomItemWrap: {
        width: '25%',
        paddingRight: scaleSize(10),
        marginBottom: scaleSize(24),
    },
    roomItem: {},
    roomNumWrap: {
        flexDirection: 'row',
        paddingRight: scaleSize(8),
        paddingLeft: scaleSize(8),
        borderTopRightRadius: scaleSize(6),
        borderTopLeftRadius: scaleSize(6)
    },
    roomNum: {
        flex: 1,
        textAlign: 'center',
        fontSize: scaleSize(24),
        paddingTop: scaleSize(6),
        paddingBottom: scaleSize(6),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff',
    },
    roomLockWrap: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left:scaleSize(8),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: scaleSize(0)
    },
    roomLock: {
        width: scaleSize(26),
        height: scaleSize(26),
    },
    roomArea: {
        textAlign: 'center',
        fontSize: scaleSize(24),
        paddingTop: scaleSize(6),
        paddingBottom: scaleSize(6),
    },
    roomPrise: {
        textAlign: 'center',
        width:'100%',
        fontSize: scaleSize(24),
        paddingTop: scaleSize(6),
        paddingBottom: scaleSize(6),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        borderTopWidth: 0,
        borderBottomLeftRadius: scaleSize(6),
        borderBottomRightRadius: scaleSize(6)
    }
})
