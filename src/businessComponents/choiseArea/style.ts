/**
 * @author: zxs
 * @date: 2020/5/6
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
    sb_areaWrapper: {
        // paddingTop: scaleSize(40),
    },
    sb_modalContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: scaleSize(8),
        borderColor: '#EAEAEA',
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        // top: scaleSize(114)
    },

    sb_scrollViewWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    sb_scrollView_left: {
        flex: 1,
        paddingRight: scaleSize(24),
        paddingLeft: scaleSize(24),
        height: scaleSize(400),
    },
    sb_scrollView_right: {
        flex: 1,
        paddingRight: scaleSize(24),
        paddingLeft: scaleSize(24),
        height: scaleSize(400),
    },
    sb_modalFooter: {
        padding: scaleSize(24),
        width: '100%',
        backgroundColor: '#fff',
    },
    sb_modalFooterContent: {
        paddingTop: scaleSize(24),
        width: '100%',
        borderTopColor: '#ea646d',
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sb_footerBtnGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sb_footerDivision: {
        width: scaleSize(74)
    },
    sb_btnBase: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(88),
        borderRadius: scaleSize(8)
    },
    sb_cancelBtn: {
        borderColor: '#CBCBCB',
        borderWidth: StyleSheet.hairlineWidth
    },
    sb_cancelBtnText: {
        fontSize: scaleSize(28)
    },
    sb_configBtn: {
        borderColor: '#1F3070',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#1F3070'
    },
    sb_configBtnText: {
        fontSize: scaleSize(28),
        color: '#fff',
    },
    sb_cityLeft_selected: {},
    sb_cityLeft: {
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    sb_cityLeftDivision: {
        width: scaleSize(4),
        height: scaleSize(26),
        marginRight: scaleSize(30)
    },
    sb_cityLeftDivision_selected: {
        width: scaleSize(4),
        height: scaleSize(26),
        marginRight: scaleSize(30)
    },
    sb_cityLeftText: {
        fontSize: scaleSize(26),
        flex: 1
    },
    sb_cityLeftText_selected: {
        color: '#4B6AC5'
    },
    sb_checkboxIcon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    sb_footerSelectContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24),
    },
    sb_footerSelectLabel: {
        fontSize: scaleSize(26),
        paddingRight: scaleSize(6),
    },
    sb_footerSelectItem: {
        height: scaleSize(40),
        paddingRight: scaleSize(14),
        paddingLeft: scaleSize(14),
        marginRight: scaleSize(6),
        marginLeft: scaleSize(6),
        marginBottom: scaleSize(10),
        borderRadius: scaleSize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CBCBCB'
    },
    sb_footerSelectText: {
        fontSize: scaleSize(22),
        color: '#868686'
    }
});

export default styles
