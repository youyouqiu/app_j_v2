/**
 * @author: zxs
 * @date: 2020/6/24
 */
import {ISearchResultCommissionType} from "@/pages/workbench/searchBuilding/types";
import {ShopCategoryTypeKeyType, TreeCategoryKeyType} from "@/components/new-space/components/Label";
import {NavigationRouter, NavigationScreenProp} from "react-navigation";

export interface SearchCardBuildingStateType {
  inputText: string,
  list: Array<any>,
  refreshing: boolean,
  selectedIds: Array<string>,
  type: string,
  searchRandom: number
}

export interface SearchCardBuildingPropsType {
  navigation: NavigationScreenProp<NavigationRouter>,
  dispatch: any
}

export interface SearchCardBuildingCommonType {
  hasMore: boolean
  showEmptyComponent: boolean
}

export interface SearchCardBuildingResultType {
  buildingTreeId: string
  buildingTreeName: string
  minPrice: number
  surplusShopNumber: number
  sumShopNumber: number
  district: string
  area: string
  minArea: number
  maxArea: number
  commission: ISearchResultCommissionType
  buildIcon: string
  treeCategory: TreeCategoryKeyType
  shopId: string
  shopName: string
  shopCategoryType: ShopCategoryTypeKeyType
  unitPrice: number
  totalPrice: number
  districtName: string
  areaName: string
  shopUrl: string
  projectType: number
  labels: Array<string>
}


export interface BuildingItemPropsType {
  data: BuildingItemDataType,
  checked: boolean,
  onChange: (id: string) => void
}

export interface BuildingItemDataType {
  name: string
  id: string
  minPrice: number
  surplusShopNumber: number
  sumShopNumber: number
  district: string
  area: string
  minArea: number
  maxArea: number
  commission: ISearchResultCommissionType
  icon: string
  treeCategory: TreeCategoryKeyType
  unitPrice: number
  totalPrice: number
  districtName: string
  areaName: string
  isShop: boolean
  projectType: number
  labels: Array<string>
}

export interface BuildingItemStateType {
  checked: boolean
}
