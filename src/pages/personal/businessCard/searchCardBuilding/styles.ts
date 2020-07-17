/**
 * @author: zxs
 * @date: 2020/6/24
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";
import baseStyles from "@/utils/baseStyle";

const styles = StyleSheet.create({
  scb_wrapper: {
    height: '100%',
    width: '100%'
  },
  scb_container: {
    paddingTop: Theme.statusBarHeight,
    height: '100%',
    width: '100%'
  },
  scb_header: {
    paddingHorizontal: scaleSize(32),
    paddingVertical: scaleSize(20),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  scb_header_cancel: {
    fontSize: scaleSize(28),
    paddingLeft: scaleSize(32)
  },
  scb_header_content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
    height: scaleSize(64),
    borderRadius: scaleSize(32),
    paddingHorizontal: scaleSize(24)
  },
  scb_header_icon: {
    width: scaleSize(36),
    height: scaleSize(36),
  },
  scb_header_input: {
    fontSize: scaleSize(28),
    flex: 1,
    paddingHorizontal: scaleSize(20)
  },
  scb_content: {
    // paddingHorizontal: scaleSize(32)
    flex: 1
  },
  scb_footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingTop: scaleSize(16),
    paddingHorizontal: scaleSize(32),
    ...Platform.select({
      ios: {
        paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(20)
      },
      android: {
        paddingBottom: scaleSize(20)
      }
    })
  },
  scb_footer_loading: {
    ...baseStyles.rowCenter,
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20)
  },
  scb_footer_touch: {
    backgroundColor: '#1F3070',
    height: scaleSize(108),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scb_footer_text: {
    fontSize: scaleSize(32),
    color: '#fff'
  },
  scb_building_wrapper: {
    width: '100%',
    paddingHorizontal: scaleSize(32),
    paddingVertical: scaleSize(24),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA'
  },
  scb_building_container: {
    width: '100%',
  },
  scb_building_content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scb_building_checkbox_icon: {
    width: scaleSize(34),
    height: scaleSize(34)
  },
  scb_building_image: {
    width: scaleSize(240),
    height: scaleSize(186),
    marginRight: scaleSize(16),
    marginLeft: scaleSize(16)
  },
  scb_building_info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scb_building_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(10),
    width: '100%',
  },
  scb_building_name: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    flex: 1
  },
  scb_building_price: {
    fontSize: scaleSize(28),
    color: '#FE5139',
    paddingRight: scaleSize(20)
  },
  scb_building_room_number: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  scb_building_address: {
    fontSize: scaleSize(24),
    color: '#868686'
  }
});

export default styles
