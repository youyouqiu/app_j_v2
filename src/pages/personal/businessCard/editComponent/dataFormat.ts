/**
 * @author: zxs
 * @date: 2020/6/16
 */
import {NewExtensionType, OriginalDataType, TipsType} from "@/pages/personal/businessCard/editComponent/types";

export const dataFormat = (originalData: OriginalDataType = {} as OriginalDataType): NewExtensionType => {

  console.log('dataFormat', originalData);
  const newData = {} as NewExtensionType;

  const isShop = originalData.shopId;
  newData.id = originalData.id;
  newData.icon = isShop ?originalData.shopUrl:originalData.buildIcon;
  newData.sourceId = isShop ? originalData.shopId : originalData.buildingTreeId;
  newData.buildingId = originalData.buildingId;

  newData.shopCategoryType = originalData.shopCategoryType;
  newData.featureLabels = originalData.featureLabels;
  newData.buildingTreeId = originalData.buildingTreeId;

  newData.buildingTreeName = originalData.buildingTreeName;
  newData.shopName = originalData.shopName;

  if (isShop) {
    newData.name = originalData.customShopName || originalData.buildingTreeName + '-' + originalData.shopName
  } else {
    newData.name = originalData.customBuildingTreeName || originalData.buildingTreeName
  }

  newData.treeCategory = originalData.treeCategory;
  newData.labels = originalData.labels;
  newData.evaluate = originalData.evaluate;
  newData.customImages = originalData.customImages;
  newData.systemImages = originalData.systemImages;

  const tipsArr: Array<TipsType> = [];
  const tips = {} as TipsType;
  if (isShop) {
    tips.label = '参考单价';
    tips.value = (originalData.unitPrice.toString() || '-') + '元/㎡';
    tipsArr.push({...tips});
    tips.label = '参考总价';
    tips.value = (originalData.totalPrice.toString() || '-') + '万/套';
    tipsArr.push({...tips});
    tips.label = '套内/建面';
    tips.value = (originalData.houseArea || '-') + '/' + (originalData.buildingArea || '-') + '㎡';
    tips.color = '#1F3070';
    tipsArr.push({...tips});
  } else {
    if (originalData.minPrice && originalData.maxPrice) {
      tips.label = '价格范围';
      tips.value = originalData.minPrice + '-' + originalData.maxPrice + '万';
      tipsArr.push({...tips})
    }
    if (originalData.minArea && originalData.maxArea) {
      tips.label = '建面范围';
      tips.value = originalData.minArea + '-' + originalData.maxArea + '㎡';
      tipsArr.push({...tips})
    }
  }

  newData.tipsArr = tipsArr;

  return newData
};
