/**
 * @author: zxs
 * @date: 2020/6/10
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const styles = StyleSheet.create({
  bi_wrapper: {
    height: '100%'
  },
  bi_container: {
    flexDirection: 'column',
    paddingHorizontal: scaleSize(32),
  },
  bi_item: {
    paddingBottom: scaleSize(40)
  },
  bi_label: {
    fontSize: scaleSize(28),
    fontWeight: '500',
    paddingBottom: scaleSize(24)
  },
  bi_image_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bi_image_container: {
    width: scaleSize(216),
    height: scaleSize(216),
    marginBottom: scaleSize(20)
  },
  bi_footer_wrapper: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(16),
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    ...Platform.select({
      ios: {
        paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(20)
      },
      android: {
        paddingBottom: scaleSize(20)
      }
    })
  },
  bi_footer_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bi_footer_all: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bi_footer_save: {
    backgroundColor: '#1F3070',
    borderRadius: scaleSize(8),
    height: scaleSize(108),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  bi_footer_save_text: {
    color: '#fff',
    fontSize: scaleSize(32)
  },
  bi_footer_all_icon: {
    width: scaleSize(50),
    height: scaleSize(50),
    marginRight: scaleSize(20)
  },
  bi_footer_all_text: {
    fontSize: scaleSize(32)
  }
});
export default styles
