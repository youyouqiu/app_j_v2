/**
 * @author: zxs
 * @date: 2020/6/11
 */
import {BusinessCardModalStateType} from "@/models/businessCard/types";
import {TreeCategoryKeyType} from "@/components/new-space/components/Label";
import {CommissionsType} from "@/pages/personal/businessCard/chooseShop/types";

export interface ChooseBuildingPropsType {
  businessCard: BusinessCardModalStateType,
  projectLocation: any
  dispatch: any
}

export interface ChooseBuildingStateType {
  activeKey: number,
  selectedIds: Array<string>,
  groupCategory: Array<groupCategoryType>,
  buildingList: Array<BuildingDetailType>,
  refreshing:boolean,
  searchText:string
}

export interface CommonType {
  hasMore: boolean
  fetchFlag: boolean
}

export interface BuildingDetailType {
  id:string,
  buildingTreeId: string,
  buildingTreeName: string,
  buildIcon:string,
  minPrice: number,
  minArea: number,
  maxArea: number,
  district: string,
  area: string,
  surplusShopNumber: number,
  sumShopNumber: number,
  treeCategory: TreeCategoryKeyType,
  labels: Array<string>,
  featureLabels: Array<string>,
  projectType: number,
  commission: CommissionsType
}


export interface groupCategoryType {
  groupNumber: number,
  groupType: number,
  groupName: string
}

export interface RequestDataType {
  city: string,
  groupType: number,
  pageSize: number,
  pageIndex: number
}
