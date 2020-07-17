/**
 * @author: zxs
 * @date: 2020/6/24
 */
import {BuildingItemDataType, SearchCardBuildingResultType} from "@/pages/personal/businessCard/searchCardBuilding/types";

const dataFormat = (original: SearchCardBuildingResultType): BuildingItemDataType => {

  const isShop = Boolean(original.shopId);

  const newData = {} as BuildingItemDataType;
  newData.name = isShop ? original.shopName : original.buildingTreeName;
  newData.id = isShop ? original.shopId : original.buildingTreeId;
  newData.isShop = isShop;
  newData.icon = isShop ? original.shopUrl : original.buildIcon;
  newData.treeCategory = isShop ? original.shopCategoryType : original.treeCategory;
  newData.minPrice = original.minPrice;
  newData.surplusShopNumber = original.surplusShopNumber;
  newData.sumShopNumber = original.sumShopNumber;
  newData.district = isShop ? original.districtName : original.district;
  newData.area = isShop ? original.areaName : original.area;
  newData.minArea = original.minArea || 0;
  newData.maxArea = original.maxArea || 0;
  newData.projectType = original.projectType;
  newData.commission = original.commission;
  newData.labels = original.labels;

  newData.unitPrice = original.unitPrice;
  newData.totalPrice = original.totalPrice;
  return newData

};

export default dataFormat
