/**
 * @author: zxs
 * @date: 2020/4/28
 */
import {IHeaderInfoType} from "@/pages/project/shopDetail/types/headerInfoTypes";
import {ShopSaleStatusKeyType} from "@/components/new-space/components/Label";
import {IReportOtherInfoType, IReportRuleTypes} from "@/pages/project/shopDetail/types/ReportRuleTypes";
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {Animated, ImageRequireSource} from "react-native";
import {object} from "prop-types";
import {IFeatureShopHeaderType} from '@/pages/main/types/featureShopTypes'

export interface IShopDetailResponseExtensionType {
  basicInfo: IShopDetailResponseBasicInfoType,
  buildingId: string,
  buildingTreeId: string,
  //案场进度
  caseSystem: string,
  cityCode: string,
  commission: string,
  dealreward: string,
  id: string,
  //带看流程
  lookProcess: string,
  //佣金方案
  moneyProgramme: string,
  preferentialPolicies: string,
  recommendTitle: string,
  recommendId: string,
  //卖点分析
  sellingPointAnalysis: string,
  takelookreward: string,
  buildingTreeIcon: string,
  shopTreeExtdata: IShopDetailResponseShopTreeExtDataType
}

export interface IShopDetailResponseShopTreeExtDataType extends Object {
  apartmentType: string,
  houseId: string,
  trueHeight: string,
  facility: Array<string>,
  buyDictionary: Array<IBuyDictionaryType>,
  shopCategory: number
}

export interface IBuyDictionaryType {
  key: string,
  label: string,
  value: string
}

export interface IShopDetailResponseBasicInfoType {
  buildingArea: number,
  buildingNo: string,
  buildinglevel: string,
  depth: number,
  floorNo: string,
  freeArea: number,
  hasFree: boolean,
  hasStreet: boolean,
  height: number,
  houseArea: number,
  isCorner: boolean,
  isFaceStreet: boolean,
  name: string,
  number: string,
  saleStatus: ShopSaleStatusKeyType,
  shopCategory: number,
  shopCategoryType: number,
  status: string,
  streetDistance: number,
  totalPrice: number,
  toward: string,
  width: number,
  floors:number
}

export interface IShopDetailPropsTypes {
  dispatch: any,
  dictionaries: any,
  user: any,
  navigation: NavigationScreenProp<NavigationRoute>,
}

export interface IShopDetailFormatReturnType {
  headerInfo: IHeaderInfoType,
  //配套信息
  facility: Array<string>,
  //案场进度 带看流程 佣金方案
  reportOtherInfo: IReportOtherInfoType,
  //商铺基本信息
  baseInfo: IShopDetailBaseInfoType,
  //卖点信息
  sellingPoint: Array<ISellingPointType>
}

export interface IShopDetailBaseInfoType {
  buildingTreeId: string,
  buildingId: string,
  cityCode: string,
  buildingTreeIcon: string
}

export interface ICommonType {
  shopId: string,
  buildingTreeId: string,
  buildingId: string,
  layouts: any,
  baseHeight: number,
  hasRule: boolean,
}

export interface IShopDetailStateType {
  headerInfo: IHeaderInfoType,
  facility: Array<string>,
  reportOtherInfo: IReportOtherInfoType,
  baseInfo: IShopDetailBaseInfoType,
  fdVisible: boolean,
  headerOpacity0: Animated.Value
  headerOpacity1: Animated.Value,
  sharePosition: Animated.Value,
  sellingPoint: Array<ISellingPointType>,
  reportRule: Array<IReportRuleTypes>,
  featureShopHeader?: IFeatureShopHeaderType,
  statusBarBackgroundColor:string
}

export interface ISellingPointType {
  key: string,
  label: string,
  value: string
  icon: ImageRequireSource,
}

export interface ISellingPointConstantType {
  [key: string]: { icon: ImageRequireSource }
}
