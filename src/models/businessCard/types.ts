/**
 * @author: zxs
 * @date: 2020/6/12
 */
import {BuildingDetailType} from "@/pages/personal/businessCard/chooseBuilding/types";
import {ShopDetailType} from "@/pages/personal/businessCard/chooseShop/types";
import {OriginalDataType} from "@/pages/personal/businessCard/editComponent/types";

export interface BusinessCardModalStateType {
  weChatCodeIcon: string,
  describe: string,
  labels: Array<string>,
  buildingList: Array<BuildingDetailType>
  shopList: Array<ShopDetailType>,
  editDetail: OriginalDataType,
  selectedBuildings:SelectedBuildingsType
}

export interface SelectedBuildingsType {
  exist: boolean,
  sourceIds: Array<string>
}
