import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'
// @ts-ignore
import Theme from 'teaset/themes/Theme'

const alignWidth = '47%'

export default {
    shareReport: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#EAEAEA',
        borderWidth: StyleSheet.hairlineWidth,
        height: scaleSize(88),
    },
    shareReportImg: {
        width: scaleSize(40),
        height: scaleSize(40),
        marginLeft: scaleSize(8)
    },
    shareReportText: {
        fontSize: scaleSize(28),
        color: '#000'
    },
    bd_ShopUniqueItem: <ViewStyle>{
        width: alignWidth,
        flexDirection: 'row',
    },
    bd_shopUniqueContent: <ViewStyle>{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: scaleSize(10),
        marginHorizontal: scaleSize(2),
    },
    bd_bd_ShopUniqueItem_flex: <ViewStyle>{
        height: scaleSize(53),
        marginTop: scaleSize(24),
        flexDirection: 'row',
        alignItems: 'center',
    },
    bd_bd_ShopUniqueItem_flex_right: {
        width: scaleSize(158),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CBCBCB'
    },
    bd_bd_ShopUniqueItem_flex_right_text: <TextStyle>{
        flex: 1,
        textAlign: 'center',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    bd_bd_ShopUniqueItem_flex_left: {
        width: scaleSize(135),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4B6AC5',
        backgroundColor: '#4B6AC5'
    },
    bd_bd_ShopUniqueItem_flex_left_text: <TextStyle>{
        flex: 1,
        color: '#FFF',
        textAlign: 'center',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    bd_wrapper: {
        height: '100%'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bd_header: {},
    bd_content: {
        paddingBottom: scaleSize(140)
    },
    bd_seatNumText: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500',
        lineHeight: scaleSize(45)
    },
    bd_seatNum: {
        flex: 1,
    },
    bd_subWrapper: <ViewStyle>{
        borderBottomWidth: scaleSize(24),
        borderColor: '#F8F8F8',
        borderStyle: 'solid',
    },
    bd_carouselImage: {
        width: '100%',
        height: 275
    },
    bd_headContainer: {
        marginTop: scaleSize(32),
        marginHorizontal: scaleSize(32),
    },
    // 全局布局
    bd_subContainer: {
        marginTop: scaleSize(40),
        marginBottom: scaleSize(24),
        marginHorizontal: scaleSize(32),
    },
    bd_titleContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bd_title: {
        flex: 1,
        marginRight: scaleSize(24),
        color: '#000000',
        fontWeight: '500',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(45),
    },
    bd_type: {
        fontSize: scaleSize(22),
        backgroundColor: '#EAEAEA',
        color: '#868686',
        paddingLeft: scaleSize(6),
        paddingRight: scaleSize(6),
        marginRight: scaleSize(8)
    },
    bd_status: {
        fontSize: scaleSize(22),
        backgroundColor: '#E4F1FF',
        color: '#49A1FF',
        paddingLeft: scaleSize(6),
        paddingRight: scaleSize(6)
    },
    bd_priceAndArea: {
        flexDirection: 'row',
        marginTop: scaleSize(32),
    },
    bd_priceText: {
        color: '#FE5139',
        fontSize: scaleSize(34)
    },
    bd_priceItem: {
        flex: 1
    },
    bd_areaText: {
        fontSize: scaleSize(34),
    },
    bd_areaItem: {
        alignItems: 'flex-start',
        paddingLeft: scaleSize(60),
        flex: 1.4
    },
    bd_otherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: scaleSize(124),
        borderColor: '#EAEAEA',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: scaleSize(8),
        marginTop: scaleSize(40),
    },
    'field-1': (widthRatio: number, separator: boolean): ViewStyle => {
        const style: ViewStyle = {
            width: `${widthRatio * 100}%`,
            height: scaleSize(33),
            marginTop: scaleSize(26),
            marginBottom: scaleSize(21),
            justifyContent: 'center',
        }
        if (separator) {
            Object.assign(style, <ViewStyle>{
                borderLeftWidth: StyleSheet.hairlineWidth,
                borderLeftColor: '#CBCBCB',
            })
        }
        return style
    },
    'field-1-row-1': (separator: boolean, color: string): TextStyle => ({
        width: separator ? '90%' : '100%',
        position: 'absolute',
        left: separator ? scaleSize(38) : 0,
        top: scaleSize(-25),
        color,
        fontSize: scaleSize(32),
        lineHeight: scaleSize(45),
        textAlignVertical: 'bottom',
    }),
    'field-1-row-1-unit': <TextStyle>{
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
    },
    'field-1-row-2': (separator: boolean): TextStyle => ({
        width: separator ? '90%' : '100%',
        position: 'absolute',
        left: separator ? scaleSize(38) : 0,
        top: scaleSize(23),
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    }),
    'field-2': <ViewStyle>{
        flex: 1,
        height: scaleSize(33),
        justifyContent: 'center',
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#CBCBCB',
    },
    'field-2-row-1': <TextStyle>{
        width: '100%',
        position: 'absolute',
        top: scaleSize(-21),
        textAlign: 'center',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
    },
    'field-2-row-2': <TextStyle>{
        width: '100%',
        position: 'absolute',
        top: scaleSize(22),
        color: '#CBCBCB',
        textAlign: 'center',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    'field-2-type': (length: number): ViewStyle => ({
        width: length === 5 ? '23%' : '25%',
        height: scaleSize(33),
        justifyContent: 'center',
    }),
    bd_labelItemType: {
        fontSize: scaleSize(24),
        color: '#CBCBCB',
        paddingTop: scaleSize(6)
    },
    bd_separator: {
        width: scaleSize(1),
        height: scaleSize(38),
        backgroundColor: '#CBCBCB',
    },
    bd_subHeader: <TextStyle>{
        fontWeight: '500',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(45),
    },
    bd_descItemContent: <ViewStyle>{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginHorizontal: scaleSize(2),
    },
    bd_descItem: (single: boolean): ViewStyle => ({
        width: single ? '100%' : alignWidth,
        flexDirection: 'row',
        marginTop: scaleSize(24),
    }),
    bd_descLabel: {
        width: scaleSize(120),
        color: '#868686',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    bd_descValue: {
        flex: 1,
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    bd_introduce: {
        marginTop: scaleSize(24),
        color: '#868686',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(38),
    },
    bd_matchItemContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bd_matchItem: {
        width: '20%',
        marginTop: scaleSize(24),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bd_matchItemImage: {
        width: scaleSize(50),
        height: scaleSize(50),
    },
    bd_matchItemLabel: {
        marginTop: scaleSize(17),
        fontSize: scaleSize(26),
        lineHeight: scaleSize(40),
    },
    bd_footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: scaleSize(140),
        borderTopColor: '#EAEAEA',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16),
        backgroundColor: '#FFF',
    },
    bd_footerContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1F3070',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(8)
    },
    bd_footerContentText: {
        fontSize: scaleSize(32),
        color: '#fff'
    },
    bd_animatedHeader: {
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
    bd_animatedHeaderItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bd_animatedHeaderTextWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: scaleSize(6)
    },
    bd_animatedHeaderText: {
        color: '#868686'
    },
    bd_animatedHeaderLine: {
        width: scaleSize(56),
        height: scaleSize(6),
        backgroundColor: '#1F3070'
    },
    bd_headerIcon: {
        width: scaleSize(64),
        height: scaleSize(64)
    },
    bd_headerAbsolute: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 999,
        height: Theme.navBarContentHeight + Theme.statusBarHeight,
    },
    bd_headerContainer: {
        paddingRight: scaleSize(30),
        paddingLeft: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: Theme.statusBarHeight,
    },
    bd_headerIconDivision: {
        flex: 1,
        fontSize: scaleSize(32),
        textAlign: 'center'
    },
    bd_headerAnimated: {
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
    callContainer: <ViewStyle>{
        marginTop: scaleSize(34),
    },
    call: <ViewStyle>{
        borderColor: '#EAEAEA',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: scaleSize(8),
        padding: scaleSize(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleSize(10),
    },
    residentUserInfo: <ViewStyle>{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIcon: <ImageStyle>{
        width: scaleSize(40),
        height: scaleSize(40),
        marginRight: scaleSize(12),
    },
    callIcon: <ImageStyle>{
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(8),
    },
    callText: <TextStyle>{
        color: '#4B6AC5',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(32),
    },
    residentUserText: <TextStyle>{
        flex: 1,
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
    },
    callBtn: <ViewStyle>{
        paddingVertical: scaleSize(12),
        paddingHorizontal: scaleSize(20),
        borderColor: '#4B6AC5',
        borderWidth: scaleSize(2),
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        alignItems: 'center',
    },
}
