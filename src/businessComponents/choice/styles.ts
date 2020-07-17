/**
 * @author: zxs
 * @date: 2020/5/9
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
  cp_wrapper: {
    height: scaleSize(400),
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 1
  },
  cp_tab_item: {
    height: '100%',
    paddingHorizontal: scaleSize(32)
  },
  sr_screen_wrapper: {
    flex: 1,
  },
  sr_screen_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20)
  },
  sr_screen_text: {
    fontSize: scaleSize(28),
    color: '#868686',
    maxWidth: scaleSize(120),
  },
  sr_screen_text_active: {
    color: '#1F3070'
  },
  sr_screen_icon: {
    width: scaleSize(20),
    height: scaleSize(20)
  },
  sr_modal_transparent: {
    backgroundColor: 'rgba(255,255,255,0)',
  },
  sr_modal_content: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  sr_modal_mask: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1
  },
  sr_footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleSize(32),
    paddingVertical: scaleSize(28),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    backgroundColor: '#fff',
    zIndex: 99
  },
  sr_reset_wrapper: {
    flexDirection: 'column',
    paddingLeft: scaleSize(24),
    paddingRight: scaleSize(56)
  },
  sr_reset_icon: {
    width: scaleSize(50),
    height: scaleSize(50),
    marginBottom: scaleSize(10)
  },
  sr_reset_text: {
    fontSize: scaleSize(28)
  },
  sr_confirm: {
    flex: 1,
    backgroundColor: '#1F3070',
    borderRadius: scaleSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleSize(108)
  },
  sr_confirm_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  },
  sb_areaWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: scaleSize(8),
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    width: '100%',
    backgroundColor: '#fff',
  },
  sb_modalFooterContent: {
    paddingTop: scaleSize(24),
    width: '100%',
    borderTopColor: '#EAEAEA',
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
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(32)
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
