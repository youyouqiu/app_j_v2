/**
 * @author: zxs
 * @date: 2020/5/18
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

export const styles = StyleSheet.create({
  c_shop_commission: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: scaleSize(18)
  },
  c_shop_commission_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  c_shop_commission_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FE5139'
  },
  c_shop_commission_prizeIcon: {
    width: scaleSize(99),
    height: scaleSize(36),
    marginLeft: scaleSize(8)
  },
  c_shop_commission_icon: {
    width: scaleSize(34),
    height: scaleSize(34),
    marginRight: scaleSize(10),
  },
  c_shop_commission_text: {
    fontSize: scaleSize(24),
    color: '#FE5139',
  },
  c_shop_feature_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  c_shop_feature_icon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  c_shop_feature_text: {
    fontSize: scaleSize(24),
    flex: 1
  }
});
