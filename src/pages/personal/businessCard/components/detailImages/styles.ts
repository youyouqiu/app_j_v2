/**
 * @author: zxs
 * @date: 2020/6/16
 */
import {Dimensions, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
const d_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
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
    position: 'absolute',
    top: 0,
    right: 0,
    paddingLeft: scaleSize(20),
    paddingBottom: scaleSize(20),
    zIndex: 1,
  },
  eb_image_footer_icon: {
    width: scaleSize(50),
    height: scaleSize(50),
    marginRight: scaleSize(4)
  },
  eb_image_footer_text: {
    fontSize: scaleSize(28),
    color: '#FE5139'
  },
});
export default styles
