/**
 * @author: zxs
 * @date: 2020/5/27
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
  cf_wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:scaleSize(32),
  },
  cf_reset_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cf_reset_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(16)
  },
  cf_reset_text: {
    color: '#868686',
    fontSize: scaleSize(24)
  },
  cf_btn_group:{
    flexDirection: 'row',
    paddingTop:scaleSize(40)
  },
  cf_btn_save:{
    flex:1,
    height: scaleSize(72),
    borderRadius: scaleSize(44),
    borderColor: '#CBCBCB',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cf_btn_share:{
    backgroundColor: '#1F3070',
  },
  cf_btn_line:{
    width: scaleSize(20),
    height:scaleSize(20)
  }
});

export default styles
