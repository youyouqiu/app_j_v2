import {Platform, StyleSheet} from 'react-native';
import {Theme} from '@new-space/teaset'

// 工具
import {scaleSize} from '../../../utils/screenUtil';
import baseStyles from "@/utils/baseStyle";

export const STYLE = StyleSheet.create({
    pageFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: scaleSize(140)
    },
    nearbyMain: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: scaleSize(24),
    },
    nearbyLine: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#1F3070',
        flex: 1
    },
    nearbyText: {
        color: '#1F3070',
        marginHorizontal: scaleSize(24),
    },
    lineSepar: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#c2c3c4'
    },
    preselectionBuildItem: {
        padding: scaleSize(32),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    preselectionIcon: {
        width: scaleSize(26),
        height: scaleSize(26),
        marginRight: scaleSize(10)
    },
    checkedImg: {
        width: scaleSize(36),
        height: scaleSize(36),
        marginTop: 5,
        marginBottom: 5,
        marginRight: scaleSize(24)
    },
    buildFooter: {
        height: scaleSize(120)
    },
    checkedBtn: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(24),
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    checkedBtnSwitch: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    checkedBtnSwitchText: {
        fontSize: scaleSize(24),
        marginLeft: scaleSize(4)
    },
    checkedBtnText: {
        color: '#fff',
        fontSize: scaleSize(26)
    },
    checkedBtnTouch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        height: '75%',
        marginVertical: scaleSize(24),
        paddingHorizontal: scaleSize(48)
    },
    pageBox: {
        borderTopWidth: scaleSize(2),
        borderTopColor: 'rgba(234,234,234,1)',
        position: 'relative',
        zIndex: 10,
        // backgroundColor: '#000'
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
    user_icon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(10)
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
    topRight_flex_column: {
        display: 'flex',
        flexDirection: 'column',
    },
    topRight_name_wrap: {
        flexDirection: 'column'
    },
    topRight_name: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topRight_time: {
        color: '#868686',
        marginTop: scaleSize(24),
        fontSize: scaleSize(24)
    },
    topRight_timeValue: {
        color: '#3B3B3B'
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
    content: {},
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
        ...baseStyles.rowCenter,
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
        marginRight: scaleSize(32),
    },
    inputRightWarp_phone_num_item: {
        width: scaleSize(31),
        // width: scaleSize(50),
        marginRight: scaleSize(5),
        marginLeft: scaleSize(5),
        color: '#000',
        fontSize: scaleSize(28),
        borderBottomColor: '#CBCBCB',
        borderBottomWidth: 1,
        textAlign: 'center'
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalQRCodeAnimating: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalQRCodeText: {
        fontSize: scaleSize(28),
        color: 'rgba(31,48,112,1)',
        fontWeight: 'bold',
        // paddingTop:scaleSize(15)
    },
    buildingInfo: {
        flexDirection: 'row',
        alignItems: 'center'
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bulidingSearchBtn: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(64),
        borderRadius: scaleSize(32),
        backgroundColor: 'rgba(239,239,239,1)',
    },
    bulidingSearchText: {
        paddingRight: scaleSize(20)
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
    phoneInput: {
        width: scaleSize(38),
        borderBottomWidth: scaleSize(2),
        borderBottomColor: '#fff',
        textAlign: 'center',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(7),
        color: '#000'
    },
    buildingPopoverWrapper: {
        position: 'absolute',
        right: scaleSize(200),
        zIndex: 999,
        ...baseStyles.rowCenter,
        height: '100%',
    },
    buildingPopoverArrow: {
        borderWidth: scaleSize(15),
        borderStyle: 'solid',
        borderLeftColor: 'rgba(0,0,0,0.65)',
        borderRightColor: 'rgba(255,255,255,0)',
        borderTopColor: 'rgba(255,255,255,0)',
        borderBottomColor: 'rgba(255,255,255,0)',
    },
    reportTips: {
        height: scaleSize(60),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff7b2',
    },
    reportTipsText: {
        color: '#868686'
    },
    buildingPopoverContent: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: scaleSize(1),
        ...baseStyles.rowCenter,
        paddingHorizontal: scaleSize(24),
        maxWidth: scaleSize(350),
    },
    buildingPopover_close: {
        width: scaleSize(25),
        height: scaleSize(25)
    },
    buildingPopover_buildName: {
        marginLeft: scaleSize(15),
        color: '#fff',
        fontSize: scaleSize(24),
        paddingVertical: scaleSize(12)
    },
    rb_flatList_item: {
        paddingVertical: scaleSize(16),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(80),
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rb_flatList_item_check: {
        position: 'absolute',
        left: scaleSize(32)
    },
    rb_item_container: {
        backgroundColor: '#fff',
        // flex: 1,
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CBCBCB',
        paddingVertical: scaleSize(32),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(40),
        borderRadius: scaleSize(8),
        flexDirection: 'column',
        // marginLeft: 30
    },
    rb_item_container_top: {
        ...baseStyles.rowCenter
    },
    rb_item_content: {
        flex: 1
    },
    rb_item_column: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleSize(12)
    },
    rb_item_buildingName: {
        fontSize: scaleSize(28),
        color: '#000',
        flex: 1,
    },
    rb_item_label: {
        fontSize: scaleSize(24),
        color: '#868686',
        flex: 1
    },
    rb_item_value: {
        color: '#1a1a1a'
    },
    rb_item_report_btn: {
        backgroundColor: '#1F3070',
        ...baseStyles.rowCenter,
        marginLeft: scaleSize(24),
        height: scaleSize(60),
        width: scaleSize(150),
        borderRadius: scaleSize(30)
    },
    rb_item_report_btn_text: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    rb_item_rule_wrapper: {
        backgroundColor: '#fff',
        paddingTop: scaleSize(20)
    },
    rb_item_rule_dottedLine: {
        width: '100%',
        height: StyleSheet.hairlineWidth
    },
    rb_item_rule_header: {
        ...baseStyles.rowCenter,
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(15),
        marginTop: scaleSize(25),
        // borderTopWidth: scaleSize(2),
        // borderColor: '#CBCBCB',
        // borderStyle: 'solid',
    },
    rb_rule_header_text: {
        flex: 1,
        fontSize: scaleSize(24),
        color: '#868686'
    },
    rb_rule_header_close: {
        color: '#868686',
        fontSize: scaleSize(24),
    },
    rb_rule_header_more: {
        color: '#1F3070',
        fontSize: scaleSize(24),
    },
    rb_item_rule_body: {
        flexDirection: 'column'
    },
    rb_item_rule_top: {
        flexDirection: 'row'
    },
    rb_item_rule_text: {
        flex: 1,
        lineHeight: scaleSize(33),
        color: '#868686',
        fontSize: scaleSize(24)
    },
    rb_footer_loading: {
        height: scaleSize(44),
        ...baseStyles.rowCenter
    },
    rb_footer_loading_text: {
        fontSize: scaleSize(24)
    },
    bs_wrapper: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    bs_wrapper_content: {
        flex: 1,
    },
    bs_header: {
        width: '100%',
        ...baseStyles.rowCenter,
        backgroundColor: '#fff',
        borderColor: '#CBCBCB',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: scaleSize(15),
        paddingHorizontal: scaleSize(32),
        ...Platform.select({
            ios: {
                paddingTop: Theme.isIPhoneX ? scaleSize(70) : scaleSize(44)
            },
            android: {
                paddingTop: scaleSize(50)
            }
        })
    },
    bs_header_input_content: {
        flex: 1,
        paddingHorizontal: scaleSize(20),
        ...baseStyles.rowCenter,
        borderRadius: scaleSize(30),
        backgroundColor: '#EFEFEF'
    },
    bs_header_search_icon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    bs_header_input: {
        flex: 1,
        paddingHorizontal: scaleSize(12),
        height: scaleSize(60),
    },
    bs_header_cancel_content: {
        paddingLeft: scaleSize(32)
    },
    bs_header_cancel: {
        fontSize: scaleSize(24)
    },
    bs_history_content: {
        flex: 1,
        flexDirection: 'column',
    },
    bs_history_header: {
        height: scaleSize(90),
        ...baseStyles.rowCenter,
        paddingHorizontal: scaleSize(32),
        backgroundColor: '#F8F8F8',
    },
    bs_history_header_text: {
        fontSize: scaleSize(24),
        flex: 1
    },
    bs_history_header_icon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    bs_history_body: {
        flex: 1,
        // paddingVertical: scaleSize(12),
    },
    bs_history_body_item: {
        paddingVertical: scaleSize(20),
        paddingHorizontal: scaleSize(32),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#c2c3c4',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bs_history_body_text: {
        fontSize: scaleSize(24),
        marginLeft: scaleSize(18)
    },
    bs_footerContent: {
        ...baseStyles.rowCenter,
        paddingVertical: scaleSize(24)
    },
    bs_footerText: {
        fontSize: scaleSize(24)
    }
});
