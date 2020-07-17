/**
 * @author: zxs
 * @date: 2020/6/11
 */
import {IUserInfo} from "@/services/typings/user";
import {ImageSourcePropType} from "react-native";
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {BusinessCardModalStateType} from "@/models/businessCard/types";

export interface WeChatCodePropsType {
  userInfo: IUserInfo,
  navigation:NavigationScreenProp<NavigationRoute>,
  businessCard:BusinessCardModalStateType,
  dispatch:any
}

export interface WeChatCodeStateType {
  visible: boolean,
  weChatCodeIcon:ImageSourcePropType,
  weChatCodeIconShort:string
}

export interface WeChatCodeCommonType {
  loadingNumber: number
}
