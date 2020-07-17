import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {TREE_CATEGORY} from "@/enmu";
import {ShopCategoryTypeKeyType, ShopCategoryTypeType, TreeCategoryKeyType} from "@/components/new-space/components/Label";
import {BusinessCardModalStateType} from "@/models/businessCard/types";

/**
 * @author: zxs
 * @date: 2020/6/16
 */
export interface EditComponentPropsType {
  navigation: NavigationScreenProp<NavigationRoute>,
  dispatch: any,
  businessCard: BusinessCardModalStateType,
  user: any
}

export interface EditComponentStateType {
  detail: NewExtensionType,
  visible: boolean,
  name: string,
  posterIds: Array<string>,
  slogan: string,
  shareModalVisible: boolean
}

export interface EditComponentCommonType {
  id: string,
  type: string
}

export interface OriginalDataType {
  area: string
  shopId: string
  areaCode: string
  shopName: string
  buildIcon: string
  buildingId: string
  buildingTreeId: string
  buildingTreeName: string
  unitPrice: number
  totalPrice: number
  buildingArea: number
  houseArea: number
  city: string
  cityName: string
  customImages: Array<SystemImagesType>
  district: string
  districtCode: string
  evaluate: string
  featureLabels: Array<string>
  id: string
  labels: Array<string>
  maxArea: number
  maxPrice: number
  minArea: number
  minPrice: number
  sumShopNumber: number
  surplusShopNumber: number
  systemImages: Array<SystemImagesType>
  treeCategory: TreeCategoryKeyType,
  shopCategoryType: ShopCategoryTypeKeyType,
  customShopName: string
  customBuildingTreeName: string
  shopUrl: string
}

export interface NewExtensionType {
  id: string,
  name: string,
  buildingTreeId: string,
  buildingTreeName: string,
  shopName: string,
  sourceId: string,
  shopId: string,
  buildingId: string,
  icon: string,
  treeCategory: TreeCategoryKeyType,
  labels: Array<string>,
  maxArea: number,
  maxPrice: number,
  minArea: number,
  minPrice: number,
  evaluate: string,
  customImages: Array<SystemImagesType>,
  systemImages: Array<SystemImagesType>,
  tipsArr: Array<TipsType>,
  shopCategoryType: ShopCategoryTypeKeyType,
  featureLabels: Array<string>
}

export interface TipsType {
  label: string,
  value: string,
  color: string
}

export interface SystemImagesType {
  fileUrl: string,
  group: string,
  sort: null
}
