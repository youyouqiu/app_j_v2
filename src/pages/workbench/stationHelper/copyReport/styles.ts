import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import baseStyles, {baseStyles_paddingMerge} from "@/utils/baseStyle";
import {Theme} from "@new-space/teaset";

const styles = StyleSheet.create({
    cr_flatList_header: {
        ...baseStyles.rowCenter,
        ...baseStyles_paddingMerge(40, 0, 30, 0)
    },
    cr_flatList_header_time: {
        color: '#868686',
        fontSize: scaleSize(25)
    },
    cr_flatList_header_click: {
        color: '#1F3070',
        fontSize: scaleSize(25)
    },
    cr_content: {
        flex: 1,
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        backgroundColor: '#F8F8F8'
    },
    cr_headerIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: scaleSize(32)
    },
    cr_headerIconRedPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0,
        backgroundColor: '#E11717'
    },
    cr_headerIcon_1: {
        width: scaleSize(45),
        height: scaleSize(45),
    },
    cr_headerIcon_2: {
        width: scaleSize(45),
        height: scaleSize(45),
        marginLeft: scaleSize(32)
    },
    cr_noData: {
        width: '100%',
    },
    cr_noDataTips: {
        width: '100%',
        ...baseStyles.columnCenter,
        paddingTop:scaleSize(15)
    },
    cr_noDataTips_text: {
        width: '100%',
        textAlign: 'center',
        color: '#868686',
        fontSize: scaleSize(28),
        paddingTop:scaleSize(10)
    },
    cr_recordContent: {
        flexDirection: 'row',
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16)
    },
    cr_checkbox: {
        width: scaleSize(44),
        height: scaleSize(44),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cr_recordLeft: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: scaleSize(32),
    },
    cr_recordLeft_mask: {
        position: 'absolute',
        zIndex: 10,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cr_recordLeft_mask_container: {
        width: scaleSize(44),
        height: scaleSize(44),
        paddingRight: scaleSize(32),
    },
    cr_checkedIconStyle: {
        width: scaleSize(44),
        height: scaleSize(44),
    },
    cr_uncheckedIconStyle: {
        width: scaleSize(44),
        height: scaleSize(44),
    },
    cr_recordRight: {
        flex: 1
    },
    cr_recordRight_container: {
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(40),
        paddingTop: scaleSize(14)
    },
    cr_recordRight_content: {
        borderRadius: scaleSize(40),
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderColor: '#EAEAEA',
        borderWidth: StyleSheet.hairlineWidth,
        paddingRight: scaleSize(24),
        paddingLeft: scaleSize(24)
    },
    cr_recordRight_header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: scaleSize(72)
    },
    cr_recordRight_have_copy: {
        color: '#868686'
    },
    cr_recordRight_header_time: {
        fontSize: scaleSize(24),
        color: '#CBCBCB',
        flex: 1
    },
    cr_recordRight_header_copy: {
        fontSize: scaleSize(24),
        color: '#1F3070'
    },
    cr_recordRight_body: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        paddingTop: scaleSize(24),
    },
    cr_recordRight_body_base: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: scaleSize(24)
    },
    cr_recordRight_body_label: {
        fontSize: scaleSize(28),
        color: '#868686',
        height: '100%'
    },
    cr_recordRight_body_value: {
        flex: 1,
        fontSize: scaleSize(28),
        paddingLeft: scaleSize(12)
    },
    cr_recordRight_body_phone_value: {
        ...baseStyles.columnCenter
    },
    cr_recordRight_body_phone_container: {
        ...baseStyles.rowCenter
    },
    cr_recordRight_body_phone_text: {
        fontSize: scaleSize(28),
        paddingLeft: scaleSize(12)
    },
    cr_recordRight_body_phone_icon: {
        width: scaleSize(32),
        height: scaleSize(32),
        paddingBottom: scaleSize(3),
        marginLeft: scaleSize(10)
    },
    cr_recordRight_footer: {
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24),
        flexDirection: 'row',
        alignItems: 'center'
    },
    cr_recordRight_footer_icon: {
        width: scaleSize(40),
        height: scaleSize(40)
    },
    cr_recordRight_footer_user: {
        flex: 1,
        paddingLeft: scaleSize(16),
        fontSize: scaleSize(24)
    },
    cr_recordRight_footer_company: {
        fontSize: scaleSize(24)
    },
    cr_modal_container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        ...baseStyles.rowCenter,
        flex: 1
    },
    cr_modal_content: {
        backgroundColor: '#fff',
        width: '90%',
        maxHeight:'70%',
        borderRadius: scaleSize(20),
    },
    cr_modal_header: {
        ...baseStyles.columnCenter,
        width: '100%',
        paddingBottom: scaleSize(24),
        paddingTop: scaleSize(24),
        backgroundColor: '#1F3070',
        borderTopLeftRadius: scaleSize(20),
        borderTopRightRadius: scaleSize(20)
    },
    cr_modal_header_1: {
        fontSize: scaleSize(36),
        color: '#fff'
    },
    cr_modal_header_2: {
        fontSize: scaleSize(28),
        paddingTop: scaleSize(12),
        color: '#fff'
    },
    cr_modal_body: {
        padding: scaleSize(24),
        ...baseStyles.columnCenter,
        minHeight:scaleSize(500),
        // flex:1,
    },
    cr_modal_body_text_1: {
        fontSize: scaleSize(32),
        color: '#000',
        width: '100%',
        textAlign: 'center'
    },
    cr_modal_body_text_2: {
        fontSize: scaleSize(28),
        color: '#868686',
        paddingTop: scaleSize(18),
        width: '100%',
        textAlign: 'center',
        lineHeight: scaleSize(40)
    },
    cr_modal_scroll_content:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20)
    },
    cr_modal_chatContain: {
        flex:1,
        width:'100%',
    },
    cr_modal_chatContent: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#A6EA5F',
        borderRadius: scaleSize(10),
        minWidth: scaleSize(200),
        maxWidth: scaleSize(450),
        ...baseStyles_paddingMerge(15, 30, 15, 30)
    },
    cr_modal_chatContent_text:{
      lineHeight:scaleSize(35)
    },
    cr_modal_chatItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: scaleSize(5),
        paddingBottom: scaleSize(5)
    },
    cr_modal_chatItem_2: {
        maxWidth: scaleSize(280)
    },
    cr_chatSanJiao: {
        width: scaleSize(22),
        height: scaleSize(38),
        position: 'relative',
        left: -2,
        top: 7
    },
    cr_chatIcon: {
        width: scaleSize(70),
        height: scaleSize(70),
        marginLeft: scaleSize(15)
    },
    cr_modal_footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: scaleSize(42)
    },
    cr_modal_footer_btn: {
        ...baseStyles.rowCenter,
        height: scaleSize(72),
        width: scaleSize(270),
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(36)
    },
    cr_modal_footer_btnText: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    cr_footer: {
        ...baseStyles.columnCenter,
        ...baseStyles_paddingMerge(0, 0, 16, 0),
        ...Platform.select({
            ios: {
                paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(32)
            },
            android: {
                paddingBottom: scaleSize(32)
            }
        })
    },
    cr_footer_content: {
        ...baseStyles.rowCenter,
        ...baseStyles_paddingMerge(16, 32, 0, 32),
    },
    cr_footer_tips: {
        borderColor: '#EAEAEA',
        backgroundColor: '#FFF6E7',
        fontSize: scaleSize(24),
        textAlign: 'center',
        color: '#868686',
        ...baseStyles_paddingMerge(12, 0, 12, 0),
        width: '100%'
    },
    cr_footer_checkbox_label: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: scaleSize(10)
    },
    cr_footer_checkbox_label_text1: {
        fontSize: scaleSize(24)
    },
    cr_footer_checkbox_label_text2: {
        fontSize: scaleSize(24),
        color: '#CBCBCB',
        paddingTop: scaleSize(5)
    },
    cr_footer_btn: {
        borderRadius: scaleSize(8),
        width: scaleSize(300),
        ...baseStyles.rowCenter,
        backgroundColor: '#1F3070',
        ...baseStyles_paddingMerge(40, 0, 40, 0)
    },
    cr_footer_btn_text: {
        fontSize: scaleSize(28),
        color: '#fff'
    },
    cr_fixed: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(70),
        borderRadius: scaleSize(44),
        backgroundColor: '#4EDC4F',
        right: scaleSize(20),
        bottom: scaleSize(250),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        zIndex: 1
    },
    cr_fixed_icon: {
        width: scaleSize(48),
        height: scaleSize(48),
        marginRight: scaleSize(10)
    },
    cr_fixed_text: {
        color: '#fff',
        fontSize: scaleSize(32)
    },
    cr_listFooter_loading: {
        ...baseStyles.rowCenter,
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20)
    },
    cr_clean_container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        ...baseStyles.rowCenter
    },
    cr_clean_content: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: scaleSize(8),
    },
    cr_clean_tips: {
        fontSize: scaleSize(28),
        color: '#868686',
        width: '100%',
        textAlign: 'center',
        paddingBottom: scaleSize(32),
        lineHeight: scaleSize(40),
        ...baseStyles_paddingMerge(60, 32, 40, 32)
    },
    cr_clean_footer: {
        height: scaleSize(87),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#CBCBCB',
        ...baseStyles.rowCenter
    },
    cr_clean_btn: {
        height: '100%',
        flex: 1,
        ...baseStyles.rowCenter,
    },
    cr_clean_btn_border: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA'
    },
    cr_clean_cancel: {
        fontSize: scaleSize(28),
        color: '#4D4D4D'
    },
    cr_clean_confirm: {
        fontSize: scaleSize(28),
        color: '#4B6AC5'
    }
});
export default styles;
