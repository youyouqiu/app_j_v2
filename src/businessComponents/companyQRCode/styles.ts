/**
 * @author: zxs
 * @date: 2020/5/27
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
  cc_wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleSize(700),
    width: scaleSize(500),
    paddingHorizontal: scaleSize(0),
  },
  cc_vs_wrapper: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    left: scaleSize(50),
    width: scaleSize(400),
    height: scaleSize(500),
  }
});

export default styles
