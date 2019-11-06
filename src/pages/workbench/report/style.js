import {StyleSheet} from 'react-native';

// 工具
import {scaleSize} from '../../../utils/screenUtil';

export const STYLE = StyleSheet.create({
    pageBox: {
        borderTopWidth: scaleSize(2),
        borderTopColor: 'rgba(234,234,234,1)',
        position: 'relative'
    },
    line: {
        borderBottomWidth: scaleSize(2),
        borderBottomColor: 'rgba(234,234,234,1)',
        marginTop: scaleSize(32),
        marginBottom: scaleSize(32),
    },
    strongLine: {
        width: '100%',
        height: scaleSize(24),
        backgroundColor: 'rgba(248,248,248,1)',
    },
    LinearGradient: {
        width: scaleSize(78),
        height: scaleSize(36),
        borderRadius: scaleSize(18),
        marginLeft: scaleSize(8),
    },
    click: {
        paddingTop: scaleSize(32),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
    },
    fontMiddle: {
        fontSize: scaleSize(24),
        color: 'rgba(0,0,0,1)',
        width: scaleSize(300),
    },
    titleRightImg: {
        width: scaleSize(45),
        height: scaleSize(45),
        marginRight: scaleSize(32),
    },
    warp: {
        width: '100%',
        borderWidth: scaleSize(2),
        borderColor: 'rgba(234,234,234,1)',
        borderRadius: scaleSize(8),
        padding: scaleSize(24),
        backgroundColor: 'rgba(255,255,255,1)',
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRightFont: {
        lineHeight: scaleSize(30),
        fontSize: scaleSize(24),
        color: 'rgba(134,134,134,1)',
    },
    topImg: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(8),
    },
    content: {

    },
    contentFont: {
        fontSize: scaleSize(32),
        fontWeight: 'bold',
        color: 'rgba(0,0,0,1)',
    },
    contentPhones: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    contentPhonesFont: {
        fontSize: scaleSize(28),
        color: 'rgba(0,0,0,1)',
        marginTop: scaleSize(8),
    },
    phoneWarp: {
        width: scaleSize(175),
        height: scaleSize(55),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(75,106,197,1)',
        borderRadius: scaleSize(8),
    },
    noPhoneWarp: {
        width: scaleSize(175),
        height: scaleSize(55),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(151,151,151,1)',
        borderRadius: scaleSize(8),
    },
    contentTimeWarp: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    contentTime: {
        fontSize: scaleSize(24),
        color: 'rgba(134,134,134,1)',
        marginTop: scaleSize(24),
    },
    btnWarp: {
        width: '100%',
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16),
        borderTopWidth: scaleSize(2),
        borderColor: 'rgba(234,234,234,1)',
    },
    btn: {
        height: scaleSize(108),
        marginLeft: scaleSize(32),
        marginRight: scaleSize(32),
        backgroundColor: 'rgba(31,48,112,1)',
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBC: {
        backgroundColor: 'rgba(171,178,186,1);',
    },
    btnText: {
        textAlign: 'center',
        lineHeight: scaleSize(108),
        color: 'rgba(255,255,255,1)',
        fontSize: scaleSize(32),
    },
    ruleBtn: {
        width: scaleSize(176),
        height: scaleSize(72),
        marginTop: scaleSize(8),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(203,203,203,1)',
        borderRadius: scaleSize(8),
    },
    inputWarp: {
        width: scaleSize(170),
        height: scaleSize(46),
        borderRadius: scaleSize(22),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(203,203,203,1)',
        backgroundColor: 'rgba(248,248,248,1)',
    },
    inputContext: {
        textAlign: 'center',
        lineHeight: scaleSize(46),
        color: 'rgba(134,134,134,1)',
        fontSize: scaleSize(24),
    },
    sexYes: {
        backgroundColor: 'rgba(31,48,112,1)',
        borderColor: 'rgba(31,48,112,1)',
    },
    sexYesFont: {
        color: 'rgba(255,255,255,1)',
    },
    sexNo: {
        backgroundColor: 'rgba(248,248,248,1)',
    },
    sexNoFont: {
        color: 'rgba(134,134,134,1)',
    },
    inputRightWarp: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWarp: {
        width: scaleSize(70),
        height: scaleSize(70),
        borderColor: 'rgba(203,203,203,1)',
        borderWidth: scaleSize(2),
        backgroundColor: 'rgba(255,255,255,1)',
        textAlign: 'center',
        lineHeight: scaleSize(70),
    },
    textWarpSmall: {
        width: scaleSize(60),
        height: scaleSize(60),
        borderColor: 'rgba(203,203,203,1)',
        borderWidth: scaleSize(2),
        backgroundColor: 'rgba(255,255,255,1)',
        textAlign: 'center',
        lineHeight: scaleSize(70),
    },
    inputYesBorder: {
        borderColor: 'rgba(31,48,112,1)',
    },
    inputNoBorder: {
        borderColor: 'rgba(203,203,203,1)',
    },
    modalWarp: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaleSize(16),
    },
    modalText: {
        width: scaleSize(300),
        marginLeft: scaleSize(26),
        fontSize: scaleSize(24),
        color: 'rgba(0,0,0,1)',
    },
    modalQRCodeWarp: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalQRCodeAnimating: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalQRCodeText: {
        fontSize: scaleSize(28),
        color: 'rgba(31,48,112,1)',
        fontWeight: 'bold',
    },
    buildingTypeText: {
        height: scaleSize(33),
        paddingLeft: scaleSize(8),
        paddingRight: scaleSize(8),
        backgroundColor: 'rgba(244,245,249,1)',
        fontSize: scaleSize(22),
        color: 'rgba(102,115,155,1)',
        lineHeight: scaleSize(33),
        borderRadius: scaleSize(2),
        textAlign: 'center',
        marginRight: scaleSize(4),
    },
    searchTitle: {
        height: scaleSize(80),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchTitleText: {
        color: '#000000',
        fontSize: scaleSize(24),
    },
    searchRight: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchArrowImg: {
        marginLeft: scaleSize(8),
        width: scaleSize(16),
        height: scaleSize(30),
    },
    bulidingSearchWarp: {
        backgroundColor: '#fff',
        padding: scaleSize(32),
        paddingBottom: scaleSize(16),
    },
    bulidingSearchBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(64),
        borderRadius: scaleSize(32),
        backgroundColor: 'rgba(239,239,239,1)',
    },
    flatList: {
        width: '100%',
        display: 'flex',
        paddingBottom: scaleSize(20)
    },
    more: {
        color: '#868686',
        fontSize: scaleSize(24),
        textAlign: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    },
    imgUploadWarp: {
        width: scaleSize(218),
        height: scaleSize(218),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(203,203,203,1)',
        borderRadius: scaleSize(8),
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgUploadText: {
        fontSize: scaleSize(24),
        color: 'rgba(134,134,134,1)',
        marginTop: scaleSize(24),
    },
    imgPreviewWarp: {
        width: scaleSize(218),
        height: scaleSize(218),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(203,203,203,1)',
        borderRadius: scaleSize(8),
        borderStyle: 'dashed',
        marginLeft: scaleSize(16),
        position: 'relative',
    },
    imgDelete: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
    },
    imgPreview: {
        width: scaleSize(215),
        height: scaleSize(215),
        borderRadius: scaleSize(8),
    },
    bigBtns: {
        paddingTop: scaleSize(9),
        paddingBottom: scaleSize(9),
        paddingLeft: scaleSize(18),
        paddingRight: scaleSize(18),
    },
})
