/**
 * @author: zxs
 * @date: 2020/6/10
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const styles = StyleSheet.create({
  xjj: {
    width: scaleSize(77),
    height: scaleSize(33)
  },
  cb_wrapper: {
    height: '100%',
    width: '100%',
  },
  cb_page_wrapper:{
    flex:1
  },
  cb_content:{
    flex:1
  },
  cb_container: {
    flex:1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA'
  },
  cb_left_content: {
    width: scaleSize(200),
    height: '100%',
    backgroundColor: '#F4F5F9',
  },
  cb_left_btn: {
    width: '100%',
    height: scaleSize(88),
    lineHeight: scaleSize(88),
    backgroundColor: '#F4F5F9',
    color: '#000',
    textAlign: 'center'
  },
  cb_left_btn_num: {
    position: 'absolute',
    top: scaleSize(10),
    right: scaleSize(10),
    height: scaleSize(30),
    width: scaleSize(30),
    lineHeight: scaleSize(30),
    textAlign: 'center',
    borderRadius: scaleSize(15),
    zIndex: 1,
    backgroundColor: '#FA5641',
    color: '#fff'
  },
  cb_left_btn_active: {
    backgroundColor: '#fff',
    color: '#1F3070'
  },
  cb_input_wrapper: {
    backgroundColor: '#F4F5F9',
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(32)
  },
  cb_input_container: {
    height: scaleSize(64),
    backgroundColor: '#fff',
    borderRadius: scaleSize(32),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:scaleSize(24)
  },
  cb_input_icon: {
    width: scaleSize(36),
    height: scaleSize(36)
  },
  cb_input: {
    height: scaleSize(64),
    lineHeight:scaleSize(64),
    width: '100%',
    paddingLeft: scaleSize(20),
    color:'#CBCBCB',
    fontSize:scaleSize(28)
  },
  cb_right_content: {
    flex: 1,
    paddingLeft: scaleSize(10)
  },
  cb_building_item_wrapper: {
    flexDirection: 'row',
    paddingVertical: scaleSize(26),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingRight: scaleSize(10)
  },
  cb_building_image_wrapper: {
    marginRight: scaleSize(10)
  },
  cb_building_image: {
    width: scaleSize(204),
    height: scaleSize(160),
  },
  cb_building_image_checkbox: {
    width: scaleSize(34),
    height: scaleSize(34),
    position: 'absolute',
    top: scaleSize(10),
    left: scaleSize(10),
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: scaleSize(25)
  },
  cb_building_info: {
    flex: 1,
    paddingRight: scaleSize(10)
  },
  cb_building_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(10),
    width: '100%',
  },
  cb_building_label_wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cb_building_name: {
    fontSize: scaleSize(32),
    fontWeight: '500',
    flex: 1
  },
  cb_shop_name: {
    fontSize: scaleSize(32),
    fontWeight: '500',
    flex: 1
  },
  cb_shop_building_name: {
    fontSize: scaleSize(24),
    color: '#a0a0a0'
  },
  cb_shop_building_name_line: {
    height: scaleSize(10),
    width: scaleSize(10),
    backgroundColor: '#a0a0a0',
    borderRadius: scaleSize(5),
    marginRight: scaleSize(16)
  },
  cb_building_price: {
    fontSize: scaleSize(28),
    color: '#FE5139',
    paddingRight: scaleSize(8),
  },
  cb_building_unitPrice:{
    fontSize: scaleSize(28),
    paddingRight: scaleSize(8),
  },
  cb_building_number: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  cb_building_area: {
    fontSize: scaleSize(24),
    color: '#868686',
    flex: 1,
  },
  cb_list_footer_wrapper: {
    height: scaleSize(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cb_list_footer_text: {
    fontSize: scaleSize(26)
  },
  cb_footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingTop: scaleSize(16),
    paddingHorizontal: scaleSize(32),
    backgroundColor:'#fff',
    ...Platform.select({
      ios: {
        paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(20)
      },
      android: {
        paddingBottom: scaleSize(20)
      }
    })
  },
  cb_footer_touch: {
    backgroundColor: '#1F3070',
    height: scaleSize(108),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cb_footer_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  }
});

export default styles
