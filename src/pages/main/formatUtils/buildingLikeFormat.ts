/**
 * @author: zxs
 * @date: 2020/4/27
 */
import {IBuildingDetailTypes} from "@/pages/main/types/buildingLikeTypes";
import {SALE_STATE, TREE_CATEGORY} from "@/enmu";


export const buildingLikeFormat = (originalData: Array<any>): Array<IBuildingDetailTypes> => {

    const newData: Array<IBuildingDetailTypes> = [];
    originalData.map((v: IBuildingDetailTypes, i) => {
        const buildingDetail: IBuildingDetailTypes = {
            buildingTreeId: v.buildingTreeId,
            buildingId: v.buildingId,
            buildIcon:v.buildIcon,
            areaFullName: v.areaFullName || '',
            buildingType: v.buildingType || '',
            fullName: v.fullName || '',
            maxPrice: v.maxPrice || '',
            buildingFormat: v.buildingFormat || {},
            minPrice: v.minPrice || '',
            minAcreage: v.minAcreage || '',
            maxAcreage: v.maxAcreage || '',
            treeCategory: v.treeCategory,
            treeCategoryName: TREE_CATEGORY[v.treeCategory],
            sellState: v.sellState,
            sellStateName: SALE_STATE[v.sellState],
            projectType: v.projectType,
            projectTypeName: SALE_STATE[v.sellState],
            labelNames: v.labelNames || [],
            avatarList: v.avatarList || [],
            number: v.number || 100,
            areaName:v.areaName || '',
            discounts:v.discounts || '',
        };
        newData.push(buildingDetail)
    });
    return newData
};
