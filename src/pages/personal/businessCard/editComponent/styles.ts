/**
 * @author: zxs
 * @date: 2020/6/10
 */
import {Dimensions, Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const d_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  eb_wrapper: {
    height: '100%',
    width: '100%'
  },
  eb_building_img: {
    width: '100%',
    height: d_width * 175 / 375,
    position: 'absolute',
    top: 0
  },
  eb_container: {
    marginTop: scaleSize(234),
    paddingTop: scaleSize(46),
    backgroundColor: '#fff',
    borderTopLeftRadius: scaleSize(24),
    borderTopRightRadius: scaleSize(24)
  },
  eb_building_baseInfo: {
    paddingHorizontal: scaleSize(32)
  },
  eb_label_style: {
    backgroundColor:'#fff'
  },
  eb_label_text_style: {
    color: '#1F3070',
    fontSize: scaleSize(22),
    backgroundColor:'#fff',
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scaleSize(2),
  },
  eb_name: {
    fontSize: scaleSize(32),
    fontWeight: '500',
    lineHeight: scaleSize(40),
    paddingRight:scaleSize(50)
  },
  eb_name_icon_wrapper:{
    height:'100%',
    position:'absolute',
    right:0,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:scaleSize(10),
    top:0
  },
  eb_name_icon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  eb_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(26),
    width: '100%',
  },
  eb_building_row: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleSize(10)
  },
  eb_building_value: {
    fontSize: scaleSize(32),
    color: '#FE5139',
    paddingBottom: scaleSize(24)
  },
  eb_building_text: {
    fontSize: scaleSize(26)
  },
  eb_comment_content: {
    backgroundColor: '#F4F5F9',
    padding: scaleSize(22),
    borderRadius: scaleSize(8),
    flex: 1
  },
  eb_comment_header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eb_comment_title: {
    fontSize: scaleSize(28),
    fontWeight: '500',
    flex: 1
  },
  eb_comment_icon_wrapper: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  eb_comment_icon: {
    width: scaleSize(32),
    height: scaleSize(32),
  },
  eb_comment_tips: {
    paddingVertical: scaleSize(40),
    lineHeight: scaleSize(40),
    fontSize: scaleSize(28),
    color: '#868686',
    width: '100%',
    textAlign: 'left'
  },
  eb_line: {
    backgroundColor: '#F8F8F8',
    height: scaleSize(24),
    width: '100%'
  },
  eb_image_content: {
    paddingHorizontal: scaleSize(32)
  },
  eb_image_container: {
    flexDirection: 'column',
    paddingTop: scaleSize(24)
  },
  eb_images_title: {
    fontSize: scaleSize(28),
    fontWeight: '500',
    paddingBottom: scaleSize(24)
  },
  eb_image_arr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  eb_add_image_content: {
    width: (d_width - scaleSize(64)) / 3.4,
    height: (d_width - scaleSize(64)) / 3.4,
    marginBottom: scaleSize(24),
    borderRadius: scaleSize(8)
  },
  eb_add_icon: {
    width: (d_width - scaleSize(64)) / 3.4,
    height: (d_width - scaleSize(64)) / 3.4,
    marginBottom: scaleSize(20)
  },
  eb_add_text: {
    fontSize: scaleSize(28),
    color: '#868686'
  },
  eb_image: {
    width: (d_width - scaleSize(64)) / 3.4,
    height: (d_width - scaleSize(64)) / 3.4,
    borderRadius: scaleSize(8)
  },
  eb_image_wrapper: {
    width: (d_width - scaleSize(64)) / 3.4,
    height: (d_width - scaleSize(64)) / 3.4,
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(24),
  },
  eb_image_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    bottom: 0,
    paddingVertical: scaleSize(10),
    zIndex: 1,
    width: '100%'
  },
  eb_image_footer_icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(4)
  },
  eb_image_footer_text: {
    fontSize: scaleSize(28),
    color: '#FE5139'
  },
  eb_footer: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(20),
    flexDirection: 'row',
    borderColor: '#EAEAEA',
    borderTopWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(20),
      },
      android: {
        paddingBottom: scaleSize(20),
      }
    }),
  },
  eb_footer_poster: {
    height: scaleSize(108),
    borderRadius: scaleSize(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBCBCB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  eb_footer_poster_text: {
    fontSize: scaleSize(32)
  },
  eb_footer_friend: {
    height: scaleSize(108),
    borderRadius: scaleSize(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1F3070',
    backgroundColor: '#1F3070',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  eb_footer_friend_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  },
  eb_footer_line: {
    width: scaleSize(12)
  },
  eb_footer_save_content: {
    flex: 1,
    height: scaleSize(108),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F3070',
    borderRadius: scaleSize(8)
  },
  eb_footer_save_text: {
    fontSize: scaleSize(32),
    color: '#FFFFFF'
  },
  eb_footer_share_content: {
    flex: 1,
    height: scaleSize(108),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBCBCB'
  },
  eb_footer_share_icon: {
    width: scaleSize(48),
    height: scaleSize(48),
    marginRight: scaleSize(10)
  },
  eb_footer_share_text: {
    fontSize: scaleSize(32),
    color: '#000'
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
