import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "../../../../utils/screenUtil";
import {Theme} from '@new-space/teaset'
import baseStyles from "../../../../utils/baseStyle";

const styles = StyleSheet.create({
    fu_footerWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        paddingTop: scaleSize(16),
        ...Platform.select({
            ios: {
                paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(20)
            },
            android: {
                paddingBottom: scaleSize(20)
            }
        })
    },
    fu_footerContent: {
        height: scaleSize(108),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8)
    },
    fu_footerContentText: {
        color: '#fff',
        fontSize: scaleSize(32)
    },
    fu_modalContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    fu_look_modalWrapper: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    fu_look_modalContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: scaleSize(24),
        width: scaleSize(541),
        height: scaleSize(633)
    },
    fu_look_modalHeader: {
        width: '100%',
        ...baseStyles.rowCenter,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: scaleSize(24),
        flex: 1
    },
    fu_look_modalHeader_close: {
        width: scaleSize(45),
        height: scaleSize(45)
    },
    fu_look_modalContent: {
        ...baseStyles.rowCenter,
    },
    fu_look_modalLoadingContent: {
        width: 152,
        height: 152,
    },
    fu_modalContent: {
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: scaleSize(32),
        paddingBottom: Theme.isIPhoneX ? scaleSize(32) : scaleSize(0)
    },
    fu_modalContentTop: {
        width: '100%',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32)
    },
    fu_modalTitle: {
        fontSize: scaleSize(24),
        marginBottom: scaleSize(32)
    },
    fu_modalTextInput: {
        height: scaleSize(250),
        padding: scaleSize(16),
        paddingTop: scaleSize(16),
        borderRadius: scaleSize(8),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CBCBCB',
        backgroundColor: '#F8F8F8',
        fontSize: scaleSize(28)
    },
    fu_modalFooter: {
        paddingTop: scaleSize(32),
        ...baseStyles.rowCenter
    },
    fu_modalCancelBtn: {
        height: scaleSize(108),
        flex: 1,
        ...baseStyles.rowCenter
    },
    fu_modalCancelBtnText: {
        fontSize: scaleSize(32),
        fontWeight: 'bold',
        color: '#1F3070'
    },
    fu_modalDivision: {
        width: scaleSize(32)
    },
    fu_modalConfirmBtn: {
        height: scaleSize(108),
        backgroundColor: '#1F3070',
        flex: 1,
        ...baseStyles.rowCenter
    },
    fu_modalConfirmBtnText: {
        fontSize: scaleSize(32),
        fontWeight: 'bold',
        color: '#fff'
    },
    fu_modalToast: {
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fu_modalToastText: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff',
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        borderRadius: scaleSize(8),
        fontSize: scaleSize(32)
    },
    s_stepItem: {
        flexDirection: 'row',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32)
    },
    s_stepItemLeft_iconContent: {
        flexDirection: 'row',
        height: scaleSize(50),
        width: scaleSize(50),
    },
    s_stepItemLeft: {
        width: scaleSize(150),
        position: 'relative',
    },
    s_stepItemLeftContainer: {
        flexDirection: 'row',
        paddingTop: scaleSize(32),
        width: '100%',
        zIndex: 2
    },
    s_stepItemLeft_icon: {
        width: scaleSize(50),
        height: scaleSize(50),
        position: 'relative',
        zIndex: 2
    },
    s_stepItemLeft_lineWrap: {
        position: 'absolute',
        height: '100%',
        zIndex: 1,
        backgroundColor: '#EAEAEA',
        width: StyleSheet.hairlineWidth,
        left: scaleSize(25)
    },
    s_stepItemLeft_line: {
        backgroundColor: '#EAEAEA',
        width: StyleSheet.hairlineWidth
    },
    s_stepItemLeft_textContent: {
        flex: 1,
        height: scaleSize(50),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    s_stepItemLeft_text: {
        fontSize: scaleSize(28),
        fontWeight: 'bold'
    },
    s_stepItemRight: {
        flexDirection: 'column',
        borderColor: '#EAEAEA',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: scaleSize(24),
        paddingTop: scaleSize(32),
        flex: 1,
    },
    s_stepItem_subContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: scaleSize(4),
        paddingBottom: scaleSize(8)
    },
    s_stepItem_label: {
        width: scaleSize(165),
        color: '#868686',
        fontSize: scaleSize(24),
    },
    s_stepItem_price: {
        color: '#FE5139',
        fontSize: scaleSize(26),
        fontWeight: 'bold'
    },
    s_stepItem_buildingInfo: {
        flexDirection: 'column',
        flex: 1
    },
    s_stepItem_titleWrap: {
        flexDirection: 'row',
        marginBottom: scaleSize(10),
        width: '100%',
    },
    s_stepItem_title: {
        fontSize: scaleSize(28),
        flex: 1,
        fontWeight: 'bold'
    },
    s_stepItem_buildingNo: {
        fontSize: scaleSize(24),
    },
    s_stepItem_userInfo_wrap: {
        flexDirection: 'column',
        flex: 1
    },
    s_stepItem_userInfo_baoBei: {},
    s_stepItem_userInfo: {
        flexDirection: 'row',
        width: '100%',
        alignItems:'center',
    },
    s_stepItem_nameContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    s_stepItem_name: {
        fontSize: scaleSize(28),
        paddingRight: scaleSize(10),
        fontWeight: 'bold'
    },
    s_stepItem_sexIcon: {
        width: scaleSize(28),
        height: scaleSize(28)
    },
    s_stepItem_mobile: {
        fontSize: scaleSize(28),
        textAlign: 'left',
        fontWeight: 'bold'
    },
    s_stepItem_time: {
        fontSize: scaleSize(28),
        flex: 1,
        fontWeight: 'bold'
    },
    s_stepItem_timeRightIcon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    s_stepItem_backIcon: {
        width: scaleSize(120),
        height: scaleSize(120),
        position: 'absolute',
        bottom: scaleSize(24),
        zIndex: 1,
        right: scaleSize(32)
    },
    s_footerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(100),
    },
    fu_look_footer: {
        paddingBottom: scaleSize(32),
        paddingTop: scaleSize(44),
        paddingRight: scaleSize(16),
        paddingLeft: scaleSize(16),
        ...baseStyles.rowCenter
    },
    fu_look_cancelBtn: {
        height: scaleSize(72),
        ...baseStyles.rowCenter,
        borderRadius: scaleSize(36),
        borderColor: '#CBCBCB',
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1
    },
    fu_look_cancelBtnText: {
        fontSize: scaleSize(28),
    },
    fu_look_btnCenter: {
        width: scaleSize(28)
    },
    fu_look_confirmBtn: {
        height: scaleSize(72),
        ...baseStyles.rowCenter,
        borderRadius: scaleSize(36),
        borderColor: '#1F3070',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#1F3070',
        flex: 1
    },
    fu_look_confirmBtnText: {
        color: '#fff',
        fontSize: scaleSize(28)
    },
    fu_followTypeContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    fu_followType: {
        width: scaleSize(146),
        height: scaleSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleSize(32),
        marginRight: scaleSize(20),
        backgroundColor: '#F8F8F8',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#F8F8F8',
        borderRadius: scaleSize(2)
    },
    fu_followType_select: {
        backgroundColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#1F3070'
    },
    fu_followTypeText: {
        color: '#868686',
        fontSize: scaleSize(24)
    },
    fu_followTypeText_select: {
        color: '#1F3070'
    },
    fu_icon: {
        width: scaleSize(21),
        height: scaleSize(23),
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0
    }
});
export default styles
