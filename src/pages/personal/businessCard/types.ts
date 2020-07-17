import {IUserInfo} from "@/services/typings/user";
import {BusinessCardModalStateType} from "@/models/businessCard/types";
import {ImageSourcePropType} from "react-native";
import {BuildingDetailType} from "@/pages/personal/businessCard/chooseBuilding/types";
import {ShopDetailType} from "@/pages/personal/businessCard/chooseShop/types";

/**
 * @author: zxs
 * @date: 2020/6/9
 */
export interface BusinessCardPropsType {

}

export interface HeaderPropsType {
  title: string,
  length:number
}

export interface AddAreaPropsType {
  path: string,
  title: string
}

export interface FooterPropsType {

}

export interface FooterStateType {
  visible: boolean
}

export interface UserInfoPropsType {
  userInfo: IUserInfo,
  dispatch: any,
  businessCard: BusinessCardModalStateType
}

export interface UserInfoStateType {
  visible: boolean,
  pickImgVisible: boolean,
}

export interface UserInfoCommonType {
  userName: string
}

export interface BuildingItemPropsType {
  onSelected?: any,
  data: BuildingDetailType,
  selectedIds:Array<string>
}

export interface ShopItemPropsType {
  onSelected?: any,
  data: ShopDetailType,
  selectedIds:Array<string>
}

export interface OnSelectedParamsType {
  id:string,
  selected:boolean
}

export interface WechatCodePropsType {
  businessCard: BusinessCardModalStateType,
  dispatch: any
}

export interface WechatCodeStateType {
  weChatCodeIcon: string
}

export interface BuildingsComponentPropsType {
  businessCard: BusinessCardModalStateType,
  dispatch: any
}

export interface ShopComponentPropsType {
  businessCard: BusinessCardModalStateType,
  dispatch: any
}

export interface BuildingsComponentStateType {
  buildingList:Array<BuildingDetailType>
}

export interface ShopComponentStateType {
  shopList:Array<ShopDetailType>
}
