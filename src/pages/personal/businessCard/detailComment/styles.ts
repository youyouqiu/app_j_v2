/**
 * @author: zxs
 * @date: 2020/6/16
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const styles = StyleSheet.create({
  dc_wrapper: {
    height: '100%',
    width: '100%'
  },
  dc_instr_container: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(40),
    flex: 1
  },
  dc_instr_content_item: {
    paddingBottom: scaleSize(40),
  },
  dc_instr_header: {
    fontSize: scaleSize(28),
    color: '#000000',
    fontWeight: '500',
    paddingBottom: scaleSize(28)
  },
  dc_instr_header_name: {
    color: '#1F3070'
  },
  dc_instr_content: {
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(24),
    paddingVertical: scaleSize(28)
  },
  dc_instr_input: {
    lineHeight: scaleSize(40),
    height: scaleSize(200)
  },
  dc_instr_footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: scaleSize(40),
  },
  dc_instr_clean: {
    color: '#1F3070',
    fontSize: scaleSize(24)
  },
  dc_instr_number: {
    color: '#868686',
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(66)
  },
  dc_instr_template_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dc_temp_wrapper: {},
  dc_temp_item: {
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(20),
    borderRadius: scaleSize(8),
    backgroundColor: '#F4F5F9',
    marginBottom: scaleSize(20)
  },
  dc_temp_header: {
    flexDirection: 'row',
    paddingBottom: scaleSize(30)
  },
  dc_temp_header_title: {
    fontSize: scaleSize(26),
    flex: 1,
    fontWeight: '500'
  },
  dc_temp_header_right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  dc_temp_header_right_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(10)
  },
  dc_temp_header_right_text: {
    fontSize: scaleSize(26),
    color: '#1F3070'
  },
  dc_temp_header_content: {
    lineHeight: scaleSize(34),
    fontSize: scaleSize(28)
  },
  dc_temp_header_explain: {
    fontSize: scaleSize(24),
    color: '#868686',
    paddingTop: scaleSize(20),
    width: '100%',
    textAlign: 'right'
  },
  dc_footer_wrapper: {
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
  dc_footer_touch: {
    backgroundColor: '#1F3070',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: scaleSize(108),
    borderRadius: scaleSize(8)
  },
  dc_footer_touch_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  },
});
export default styles
