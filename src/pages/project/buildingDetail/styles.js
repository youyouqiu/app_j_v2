import {StyleSheet} from 'react-native'
import {deviceWidth, scaleSize} from "../../../utils/screenUtil";
import Theme from "teaset/themes/Theme";

const buildingStyle = StyleSheet.create({
    detailWrapper: {
        height: '100%',
    },
    header: {},
    headerImage: {
        width: deviceWidth,
        height: 550 * deviceWidth / 750
    },
    contentLoading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerAbsolute: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 999,
        height: Theme.navBarContentHeight + Theme.statusBarHeight,
    },
    headerContainer: {
        paddingRight: scaleSize(30),
        paddingLeft: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: Theme.statusBarHeight,
    },
    headerAnimated: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: -1,
        paddingRight: scaleSize(30),
        paddingLeft: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: Theme.statusBarHeight,
    },
    pd_subHeader: {
        position: 'absolute',
        width: '100%',
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: Theme.navBarContentHeight + Theme.statusBarHeight,
        backgroundColor: '#fff',
        height: scaleSize(96),
    },
    pd_subHeaderItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pd_subHeaderTextWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: scaleSize(6)
    },
    pd_subHeaderText: {
        color: '#868686'
    },
    pd_subHeaderLine: {
        width: scaleSize(56),
        height: scaleSize(6),
        backgroundColor: '#1F3070'
    },
    headerIcon: {
        width: scaleSize(64),
        height: scaleSize(64),
    },
    navigationBar: {
        position: 'absolute',
        top: scaleSize(148),
        width: '100%',
        paddingRight: scaleSize(30),
        paddingLeft: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
        height: scaleSize(88),
        backgroundColor: '#fff'
    },
    headerIconDivision: {
        flex: 1,
        fontSize: scaleSize(32),
        textAlign: 'center'
    },
    headerContent: {},
    headerContentTop: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scaleSize(32),
    },
    headerTitleWrap: {
        flexDirection: 'column',
        flex: 1
    },
    headerTitle: {
        fontSize: scaleSize(36),
        color: '#000000',
        paddingBottom: scaleSize(16)
    },
    headerAddress: {
        color: '#868686',
        fontSize: scaleSize(26)
    },
    addressWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressLabel: {
        backgroundColor: '#FFDDD8',
        color: '#FE5139',
        textAlign: 'center',
        fontSize: scaleSize(20),
        height: scaleSize(27),
        lineHeight: scaleSize(27)
    },
    headerMapWrap: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scaleSize(8),
        paddingBottom: scaleSize(8),
        paddingLeft: scaleSize(16),
    },
    headerMap: {
        width: scaleSize(46),
        height: scaleSize(46),
    },
    headerMapLabelWrap: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    headerMapLabel: {
        fontSize: scaleSize(24),
        color: '#000000',
    },
    headerBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerBottomItem: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    headerBottomItemDivision: {
        width: scaleSize(1),
        height: scaleSize(30),
        backgroundColor: '#EAEAEA'
    },
    bottomItemPrice: {
        color: '#FE5139',
        fontSize: scaleSize(34),
    },
    bottomItemPriceUnit: {
        fontSize: scaleSize(20)
    },
    bottomItemValue: {
        fontSize: scaleSize(32),
        color: '#000000'
    },
    bottomItemLabel: {
        fontSize: scaleSize(24),
        color: '#CBCBCB',
        paddingTop: scaleSize(4)
    },
    subContent: {
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(32),
        borderBottomWidth: scaleSize(24),
        borderColor: '#F8F8F8',
        borderStyle: 'solid',
    },
    subHeader: {
        fontSize: scaleSize(32),
        paddingTop: scaleSize(40),
        paddingBottom: scaleSize(24),
        fontWeight:'bold',
        color: '#000000',
    },
    BIDescWrap: {
        flexDirection: 'row'
    },
    BIDescContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: scaleSize(10),
        paddingBottom: scaleSize(12),
        paddingTop: scaleSize(12)
    },
    BIDescLabel: {
        fontSize: scaleSize(24),
        color: '#868686',
        minWidth:scaleSize(130)
    },
    BIDescText: {
        fontSize: scaleSize(24),
        color: '#000000',
        flex:1,
    },
    PIText: {
        fontSize: scaleSize(28),
        color: '#5D5D5D',
        lineHeight: scaleSize(52),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
        paddingBottom: scaleSize(16)
    },
    PIListItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
        paddingTop: scaleSize(30),
        paddingBottom: scaleSize(30)
    },
    pi_users: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
    },
    pi_usersRight: {
        flexDirection: 'column',
        justifyContent:'center',
        flex: 1,
    },
    pi_usersItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: scaleSize(30),
        paddingBottom: scaleSize(30),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
    },
    pi_usersIcon: {
        width: scaleSize(60),
        height: scaleSize(60),
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    },
    PIListIcon: {
        width: scaleSize(60),
        height: scaleSize(60),
    },
    pi_usersName: {
        color: '#000000',
        fontSize: scaleSize(28),
        paddingLeft: scaleSize(40),
        flex: 1
    },
    PIListLabel: {
        color: '#000000',
        fontSize: scaleSize(28),
        paddingLeft: scaleSize(40),
        flex: 1
    },
    PIListRightIconWrap: {
        height: scaleSize(56),
        flexDirection: 'row',
        alignItems: 'center'
    },
    PIListRightIcon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    PIListBtn: {
        backgroundColor: '#fff',
        borderColor: '#4B6AC5',
        width: scaleSize(176),
        height: scaleSize(56),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PIListBtnIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
        tintColor: '#4B6AC5',
    },
    PIListBtnText: {
        color: '#4B6AC5',
        fontSize: scaleSize(24),
        paddingLeft: scaleSize(8),
    },
    SIItem: {
        flexDirection: 'row',
        paddingBottom: scaleSize(24),
        marginBottom: scaleSize(24),
    },
    SIItemIcon: {
        width: scaleSize(60),
        height: scaleSize(60)
    },
    SIItemRight: {
        paddingLeft: scaleSize(24),
        flexDirection: 'column',
        flex:1
    },
    SIItemTitle: {
        fontSize: scaleSize(28),
        color: '#000000',
        flex: 1
    },
    SIItemDesc: {
        fontSize: scaleSize(24),
        color: '#868686',
        paddingTop: scaleSize(8)
    },
    reportRuleContent: {
        borderBottomWidth: 0
    },
    RRTable: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
    },
    RRTableRow: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        paddingTop:scaleSize(10),
        paddingBottom:scaleSize(10),
        minHeight: scaleSize(72)
    },
    RRTableLabelWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(210),
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
    },
    RRTableLabel: {
        fontSize: scaleSize(24),
        color: '#868686',
    },
    RRTableValue: {
        fontSize: scaleSize(24),
        color: '#000000',
    },
    RRTableValueWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20)
    },
    detailFooter: {
        height: Theme.isIPhoneX ? scaleSize(160) : scaleSize(140),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingTop: scaleSize(16),
        paddingBottom: Theme.isIPhoneX ? scaleSize(36) : scaleSize(16),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA'
    },
    detailFooterLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    detailFooterIcon: {
        width: scaleSize(32),
        height: scaleSize(32),
        marginRight: scaleSize(16)
    },
    detailFooterLabel: {
        fontSize: scaleSize(24),
        color: '#000',
    },
    detailFooterCenterWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    detailFooterCenter: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#EAEAEA',
        height: scaleSize(44),
        marginRight: scaleSize(40),
        marginLeft: scaleSize(40)
    },
    detailFooterRight: {
        flexDirection: 'row',
    },
    detailFooterBtn1: {
        borderColor: '#CBCBCB',
        borderWidth: StyleSheet.hairlineWidth,
        height: scaleSize(108),
        marginRight: scaleSize(16)
    },
    detailFooterBtn2: {
        borderColor: '#1F3070',
        borderWidth: StyleSheet.hairlineWidth,
        height: scaleSize(108),
        backgroundColor: '#1F3070'
    },
    detailFooterBtn1TitleStyle: {
        fontSize: scaleSize(28),
        color: '#000000'
    },
    detailFooterBtn2TitleStyle: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    shareSlot: {
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: scaleSize(32),
        paddingHorizontal: scaleSize(32)
    },
    shareSlotImage: {
        width: scaleSize(686),
        height: scaleSize(500),
        marginBottom: scaleSize(27),
    },
    shareSlotInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: scaleSize(13),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#EAEAEA'
    },
    shareSlotBuildInfo: {
        flex: 1,
        justifyContent: 'space-between',
        marginRight: scaleSize(6)
    },
    shareSlotBuildInfoName: {
        color: '#000',
        fontSize: scaleSize(32)
    },
    shareSlotBuildInfoAddress: {
        color: '#868686',
        fontSize: scaleSize(24),
        marginVertical: scaleSize(16)
    },
    shareSlotBuildInfoPrice: {
        color: '#FA553F',
        fontSize: scaleSize(32)
    },
    shareSlotQRCode: {
        width: scaleSize(120),
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareSlotQRCodeImage: {
        width: scaleSize(106),
        height: scaleSize(106),
        borderRadius: scaleSize(53)
    },
    shareSlotQRCodeText: {
        color: '#4D4D4D',
        fontSize: scaleSize(28)
    }
});

export default buildingStyle
