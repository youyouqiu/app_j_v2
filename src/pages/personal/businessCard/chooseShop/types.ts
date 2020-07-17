/**
 * @author: zxs
 * @date: 2020/6/11
 */
import {BusinessCardModalStateType} from "@/models/businessCard/types";
import {ShopCategoryTypeKeyType, TreeCategoryKeyType} from "@/components/new-space/components/Label";

export interface ChooseShopPropsType {
  businessCard: BusinessCardModalStateType,
  projectLocation: any
  dispatch: any
}

export interface ChooseShopStateType {
  activeKey: string,
  selectedIds: Array<string>,
  groupCategory: Array<GroupCategoryType>,
  shopList: Array<ShopDetailType>,
  refreshing:boolean
}

export interface CommonType {
  hasMore: boolean,
  fetchFlag:boolean
}

export interface CommissionsType {
  commissionsType: number,
  commissionsValue: number,
  dealPrize: number,
  percentageType: number,
  takeLookPrize: number
}

export interface ShopDetailType {
  id:string,
  shopId:string,
  buildingTreeId: string,
  buildingTreeName: string,
  buildIcon:string,
  districtName: string,
  areaName: string,
  surplusShopNumber: number,
  sumShopNumber: number,
  treeCategory: TreeCategoryKeyType,
  labels: Array<string>,
  unitPrice:number,
  commission:CommissionsType,
  shopUrl:string,
  shopName:string,
  totalPrice:number,
  buildingArea:number,
  featureLabels:Array<string>,
  shopCategoryType:ShopCategoryTypeKeyType
}


export interface GroupCategoryType {
  groupNumber: number,
  groupType: number,
  groupName: string,
  featureId:string,
  key:string
}

export interface RequestDataType {
  city: string,
  groupType: number,
  pageSize: number,
  pageIndex: number,
  key:string,
  featureId:string
}

export interface BuildingItemOnSelectedParamsType {
  buildingTreeId:string,
  selected:boolean
}
