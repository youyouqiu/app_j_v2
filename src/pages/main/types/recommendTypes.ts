/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {ImageSourcePropType} from "react-native";
import {NavigationRoute, NavigationScreenProp} from "react-navigation";

export interface IRecommendPropsType {
  projectLocation: any,
  navigation: NavigationScreenProp<NavigationRoute>,
  refreshingRandom: number
}

export interface IRecommendStateType {
  currentDate: ICurrentDateType,
  buildingList: Array<IBuildingDetailType>,
  buildingDetail: IBuildingDetailType,
  idx: number,
  cityCode:string
}

export interface IRecommendCacheType {
  [key: string]: Array<IBuildingDetailType>
}

export interface ICurrentDateType {
  year: string,
  month: string,
  day: string,
  week: string
}

export interface IBuildingDetailType {
  buildingTreeId: string,
  buildingTreeName: string,
  projectType: number,
  sellState: number,
  sellStateStr: string,
  reason: string,
  treeCategory: number,
  treeCategoryStr: string,
  icon: ImageSourcePropType,
  discounts: boolean
}
