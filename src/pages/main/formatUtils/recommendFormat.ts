/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {IBuildingDetailType} from "@/pages/main/types/recommendTypes";
import {SALE_STATE, TREE_CATEGORY} from "@/enmu";

export const mainRecommendFormat = (originalData: Array<any>) => {
  let newData = [] as Array<IBuildingDetailType>;
  originalData.forEach((v) => {
    let buildingDetail = {} as IBuildingDetailType;
    buildingDetail.buildingTreeId = v.buildingTreeId;
    buildingDetail.buildingTreeName = v.buildingTreeName;
    buildingDetail.projectType = v.projectType;
    buildingDetail.sellStateStr = SALE_STATE[v.sellState] || '';
    buildingDetail.icon = {uri: v.icon} || require('../../../images/defaultImage/default_1.png');
    buildingDetail.reason = v.reason;
    buildingDetail.treeCategoryStr = TREE_CATEGORY[v.treeCategory];
    buildingDetail.discounts = v.discounts;
    newData.push(buildingDetail)
  });
  return newData
};
