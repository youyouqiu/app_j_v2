/**
 * @author: zxs
 * @date: 2020/6/9
 */
import {Dimensions, Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const d_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  bc_wrapper: {
    height: '100%',
    width: '100%'
  },
  bc_container1: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(40),
    backgroundColor: '#F4F5F9'
  },
  bc_container2: {
    paddingHorizontal: scaleSize(32),
    backgroundColor: '#fff'
  },
  bc_card_wrapper: {
    paddingBottom: scaleSize(40),
  },
  bc_card_content: {
    flexDirection: 'column',
    height: scaleSize(344),
    paddingHorizontal: scaleSize(26),
    paddingTop: scaleSize(30),
    backgroundColor: '#fff'
  },
  bc_card_info: {
    maxWidth: scaleSize(300),
  },
  bc_card_other_info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    maxWidth: scaleSize(400)
  },
  bc_card_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(16)
  },
  bc_card_row_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(10)
  },
  bc_card_row_label: {
    color: '#fff',
    fontSize: scaleSize(34),
  },
  bc_card_user_icon_wrapper: {
    position: 'absolute',
    right: 0,
    zIndex: -2,
    height: scaleSize(344),
    width: scaleSize(344) * 367 / 345,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bc_card_user_icon: {
    position: 'absolute',
    height: scaleSize(344),
    width: scaleSize(344) * 367 / 345,
  },
  bc_card_user_icon_text: {
    fontSize: scaleSize(34),
    color: '#1F3070',
    paddingRight: scaleSize(40)
  },
  bc_card_bg: {
    height: scaleSize(344),
    width: scaleSize(344) * 489 / 345,
    position: 'absolute',
    left: 0,
    zIndex: -1
  },
  bc_card_phone: {
    fontSize: scaleSize(28)
  },
  bc_card_location: {
    color: '#B5C4FA',
    fontSize: scaleSize(24),
    width: scaleSize(340)
  },
  bc_wx_btn_wrapper: {
    paddingBottom: scaleSize(40),
    paddingHorizontal: scaleSize(32),
    backgroundColor: '#F4F5F9'
  },
  bc_wx_btn_touch: {
    borderColor: '#1F3070',
    borderWidth: 2,
    borderRadius: scaleSize(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(88),
    backgroundColor: '#fff'
  },
  bc_wx_btn_icon: {
    width: scaleSize(44),
    height: scaleSize(44),
    marginRight: scaleSize(10)
  },
  bc_wx_btn_text: {
    fontSize: scaleSize(28),
    color: '#1F3070',
    fontWeight: '500'
  },
  bc_intro_wrapper: {
    paddingBottom: scaleSize(40),
    paddingHorizontal: scaleSize(32),
    backgroundColor: '#F4F5F9'
  },
  bc_intro_container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: scaleSize(8),
    padding: scaleSize(24)
  },
  bc_intro_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: scaleSize(30)
  },
  bc_intro_header_icon: {
    width: scaleSize(27),
    height: scaleSize(27)
  },
  bc_intro_header_label: {
    fontSize: scaleSize(28),
    flex: 1,
    fontWeight: '500'
  },
  bc_intro_content: {},
  bc_intro_content_text: {
    lineHeight: scaleSize(40),
    color: '#868686'
  },
  bc_intro_labels: {
    flexDirection: 'row',
    paddingTop: scaleSize(20),
    flexWrap: 'wrap'
  },
  bc_intro_label: {
    borderRadius: scaleSize(4),
    borderColor: '#a2cdff',
    borderWidth: StyleSheet.hairlineWidth,
    color: '#a2cdff',
    fontSize: scaleSize(24),
    marginRight: scaleSize(20),
    backgroundColor: '#fff',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(6),
    marginBottom: scaleSize(10)
  },
  bc_recommend_building_wrapper: {
    backgroundColor: '#fff',
    paddingTop: scaleSize(30)
  },
  bc_recommend_tips_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(30)
  },
  bc_recommend_tips_line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EAEAEA',
    flex: 1
  },
  bc_recommend_tips: {
    fontSize: scaleSize(22),
    color: '#868686',
    paddingHorizontal: scaleSize(30)
  },
  bc_btn_wx_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bc_btn_icon: {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  bc_btn_wx_text: {},
  bc_btn_building_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bc_btn_building_text: {},
  bc_add_area_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(260),
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(10),
    borderColor: '#979797',
    borderStyle: 'dashed',
    borderWidth: 1
  },
  bc_add_area_icon: {
    width: scaleSize(66),
    height: scaleSize(66),
    marginRight: scaleSize(10)
  },
  bc_add_area_title: {
    color: '#868686',
    fontSize: scaleSize(32),
    fontWeight: '500'
  },
  bc_footer_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(20),
    ...Platform.select({
      ios: {
        paddingBottom: Theme.isIPhoneX ? scaleSize(30) : scaleSize(20)
      },
      android: {
        paddingBottom: scaleSize(20),
      }
    }),
  },
  bc_footer_touch: {
    backgroundColor: '#1F3070',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: scaleSize(108),
    borderRadius: scaleSize(8)
  },
  bc_footer_touch_icon: {
    width: scaleSize(48),
    height: scaleSize(48),
    marginRight: scaleSize(10)
  },
  bc_footer_touch_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  },
  bc_footer_container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bc_footer_btn_group: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    paddingTop: scaleSize(40),
    paddingBottom: scaleSize(20)
  },
  bc_footer_btn_row: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bc_footer_btn_touch: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bc_footer_btn_text: {
    fontSize: scaleSize(26),
  },
  bc_footer_btn_icon: {
    width: scaleSize(60),
    height: scaleSize(60),
    marginBottom: scaleSize(20)
  },
  bc_footer_cancel: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        height: Theme.isIPhoneX ? scaleSize(110) : scaleSize(100),
        paddingBottom: Theme.isIPhoneX ? scaleSize(10) : scaleSize(0)
      },
      android: {
        height: scaleSize(100),
      }
    }),
  },
  bc_footer_cancel_text: {
    fontSize: scaleSize(30)
  },
  bc_header_title_wrapper: {
    paddingBottom: scaleSize(20)
  },
  bc_header_title: {
    fontSize: scaleSize(28),
    fontWeight: '500'
  },
  bc_recommend_wrapper: {
    paddingBottom: scaleSize(40)
  },
  bc_recommend_content: {
    flexDirection: 'column'
  },
  bc_recommend_building_detail: {
    flexDirection: 'row',
    paddingBottom: scaleSize(30)
  },
  bc_recommend_building_name: {
    fontSize: scaleSize(28),
    fontWeight: '500',
  },
  flex_line: {
    flex: 1
  },
  bc_recommend_building_info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(16)
  },
  bc_recommend_building_area: {
    fontSize: scaleSize(22),
    color: '#868686'
  },
  bc_recommend_building_price: {
    fontSize: scaleSize(26),
    color: '#FE5139'
  },
  bc_recommend_building_unit_price: {
    fontSize: scaleSize(22),
    color: '#868686'
  },
  bc_recommend_building_image_wrapper: {
    width: scaleSize(256),
    height: scaleSize(256) * 92 / 128,
    marginRight: scaleSize(16),
    borderRadius: scaleSize(8)
  },
  bc_recommend_building_image: {
    width: scaleSize(256),
    height: scaleSize(256) * 92 / 128,
    borderRadius: scaleSize(8)
  },
  bc_recommend_detail_right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bc_recommend_detail_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bc_label_style: {
    backgroundColor:'#fff'
  },
  bc_label_text_style: {
    color: '#1F3070',
    fontSize: scaleSize(22),
    backgroundColor:'#fff',
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scaleSize(2),
  },
  bc_recommend_feature_labels_icon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  bc_recommend_feature_labels_text: {
    fontSize: scaleSize(24),
    flex: 1
  },
  bc_recommend_building_footer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    bottom: 0,
    height: scaleSize(80),
    borderBottomLeftRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(8)
  },
  bc_recommend_building_footer_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  bc_recommend_building_footer_icon: {
    width: scaleSize(36),
    height: scaleSize(36),
    marginRight: scaleSize(10)
  },
  bc_recommend_building_edit_text: {
    fontSize: scaleSize(28),
    color: '#FFFFFF'
  },
  bc_recommend_building_delete_text: {
    fontSize: scaleSize(26),
    color: '#FE5139'
  },
  bc_code_container1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scaleSize(50),
    backgroundColor: '#F4F5F9'
  },
  bc_code_icon_wrapper: {
    width: scaleSize(400),
    height: scaleSize(400),
    borderRadius: scaleSize(8),
    borderWidth: 1,
    borderColor: '#979797',
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleSize(40),
    backgroundColor: '#fff'
  },
  bc_code_add_icon: {
    width: scaleSize(390),
    height: scaleSize(390),
  },
  bc_code_container2: {
    padding: scaleSize(32),
    flex: 1
  },
  bc_code_text1: {
    fontSize: scaleSize(44),
    fontWeight: '500',
    color: '#000',
    paddingBottom: scaleSize(20)
  },
  bc_code_text2: {
    fontSize: scaleSize(24),
    color: '#868686',
    paddingBottom: scaleSize(14)
  },
  bc_code_text3: {
    fontSize: scaleSize(32),
    color: '#1F3070',
    height: scaleSize(40),
    lineHeight: scaleSize(40)
  },
  bc_code_text4: {
    fontSize: scaleSize(32),
    color: '#1F3070',
    fontWeight: '500',
    paddingBottom: scaleSize(20)
  },
  bc_code_text5: {
    fontSize: scaleSize(28),
    color: '#000',
    lineHeight: scaleSize(48)
  },
  bc_code_text6: {
    fontSize: scaleSize(28),
    color: '#FE5139',
    paddingTop: scaleSize(20)
  },
  bc_edit_input: {
    paddingHorizontal: scaleSize(26),
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(24),
    backgroundColor: '#F4F5F9',
    lineHeight: scaleSize(42),
    color: '#868686',
    fontSize: scaleSize(28),
    height: scaleSize(240),
    borderRadius: scaleSize(8)
  },
  bc_modal_container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bc_modal_content: {
    backgroundColor: '#fff',
    width: scaleSize(540),
    borderRadius: scaleSize(8)
  },
  bc_modal_header: {
    fontSize: scaleSize(32),
    color: '#4D4D4D',
    width: '100%',
    textAlign: 'center',
    paddingVertical: scaleSize(24)
  },
  bc_modal_input: {
    borderColor: '#CBCBCB',
    borderWidth: StyleSheet.hairlineWidth,
    height: scaleSize(64),
    marginVertical: scaleSize(24),
    marginHorizontal: scaleSize(24),
    paddingHorizontal: scaleSize(12)
  },
  bc_modal_footer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA'
  },
  bc_modal_footer_line: {
    width: StyleSheet.hairlineWidth,
    height: '100%',
    backgroundColor: '#EAEAEA'
  },
  bc_modal_footer_btn: {
    flex: 1,
    height: scaleSize(86),
    lineHeight: scaleSize(86),
    textAlign: 'center',
    color: '#4D4D4D',
  },
  bc_modal_footer_confirm: {
    color: '#1F3070'
  }
});

export default styles
