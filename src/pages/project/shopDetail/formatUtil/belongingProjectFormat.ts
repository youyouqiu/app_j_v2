/**
 * @author: zxs
 * @date: 2020/5/18
 */
import {IBuildingPreview} from "@/services/building/buildingList";
import {IPostBuildingListResponseType} from "@/pages/project/shopDetail/types/belongingProjectTypes";
import {ISearchResultCommissionType} from "@/pages/workbench/searchBuilding/types";
const defaultIcon = require('../../../../images/defaultImage/default_3.png');

export const belongingProjectFormat = (originalData: IBuildingPreview): IPostBuildingListResponseType => {

    const {buildingTreeId, buildingTreeName, maxArea, maxPrice, minPrice, minArea, sumShopNumber, surplusShopNumber} = originalData;
    const {treeCategory, sellState, commission, area, discounts, projectType, labels, buildIcon} = originalData;
    const buildingDetail = {} as IPostBuildingListResponseType;
    buildingDetail.buildingTreeId = buildingTreeId || '';
    buildingDetail.buildingTreeName = buildingTreeName || '';
    buildingDetail.maxArea = maxArea || 0;
    buildingDetail.maxPrice = maxPrice || 0;
    buildingDetail.minPrice = minPrice || 0;
    buildingDetail.minArea = minArea || 0;
    buildingDetail.sumShopNumber = sumShopNumber || 0;
    buildingDetail.surplusShopNumber = surplusShopNumber || 0;
    buildingDetail.treeCategory = treeCategory || 1;
    buildingDetail.saleStatus = sellState || 0;
    buildingDetail.commission = commission as ISearchResultCommissionType;
    buildingDetail.area = area || '';
    buildingDetail.discounts = discounts || '';
    buildingDetail.projectType = projectType || 0;
    buildingDetail.labels = labels || [];
    buildingDetail.buildingIcon = buildIcon ? {uri: buildIcon} : defaultIcon;

    return buildingDetail
};


