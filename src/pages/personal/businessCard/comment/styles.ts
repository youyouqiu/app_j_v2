/**
 * @author: zxs
 * @date: 2020/6/11
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const styles = StyleSheet.create({
  c_wrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    height: '100%',
    width: '100%'
  },
  c_content: {
    padding: scaleSize(32)
  },
  c_comment_header: {
    flexDirection: 'row',
    paddingBottom: scaleSize(24)
  },
  c_header_text_1: {
    fontSize: scaleSize(28),
    fontWeight: '500'
  },
  c_comment_content: {
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(24),
    paddingVertical: scaleSize(28)
  },
  c_text_input: {
    lineHeight: scaleSize(38)
  },
  c_comment_footer: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    paddingTop: scaleSize(80),
  },
  c_comment_clean: {
    color: '#1F3070',
    fontSize: scaleSize(24)
  },
  c_comment_number: {
    color: '#868686',
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(66)
  },
  c_comments_item: {
    padding: scaleSize(24),
    borderRadius: scaleSize(8),
    backgroundColor: '#F4F5F9',
    marginBottom: scaleSize(32)
  },
  c_item_header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(24)
  },
  c_item_header_title: {
    fontSize: scaleSize(26),
    fontWeight: '500',
    flex: 1
  },
  c_item_header_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(10)
  },
  c_item_header_add: {
    fontSize: scaleSize(26),
    color: '#1F3070'
  },
  c_item_content: {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(38)
  },
  c_item_tips: {
    fontSize: scaleSize(24),
    color: '#868686',
    paddingTop: scaleSize(20),
    width: '100%',
    textAlign: 'right'
  },
  c_header_text_2: {
    fontSize: scaleSize(28),
    fontWeight: '500',
    color: '#1F3070'
  },
  c_line: {
    height: scaleSize(24),
    backgroundColor: '#F8F8F8',
    width: '100%'
  },

  c_footer: {
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
  c_footer_touch: {
    backgroundColor: '#1F3070',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    height: scaleSize(108),
    flex: 1
  },
  c_footer_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  }
});

export default styles
