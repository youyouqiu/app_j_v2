/**
 * Created by Kary on 2020/05/27 10:09.
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

export default StyleSheet.create({
  'item-view': {
    paddingVertical: scaleSize(37),
    paddingHorizontal: scaleSize(32),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff'
  },
  'type-name': {
    backgroundColor: '#CDD8FF',
    borderRadius: scaleSize(2),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(4),
    color: '#1F3070',
    fontSize: scaleSize(22),
    marginRight: scaleSize(10),
  },
  'name': {
    // color: '#1F3070',
    color: '#000',
    fontSize: scaleSize(32),
    flex: 1
  },
  'name-active': {
    color: '#1F3070'
  },
  'number': {
    color: '#868686',
    fontSize: scaleSize(26),
    marginLeft: 'auto'
  }
})