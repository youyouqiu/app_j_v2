import {IBuildingPreview} from "@/services/building/buildingList";
import {ISearchResultCommissionType} from "@/pages/workbench/searchBuilding/types";
import {TreeCategoryKeyType} from "@/components/new-space/components/Label";
import {ImageSourcePropType} from "react-native";

/**
 * @author: zxs
 * @date: 2020/5/18
 */
export interface IBelongingProjectPropsTypes {
    buildingTreeId: string,
    cityCode:string
}

export interface IBelongingProjectStateTypes {
    buildingDetail: IPostBuildingListResponseType
}

export interface IPostBuildingListResponseType {
    buildingTreeId: string,
    buildingTreeName: string,
    minPrice: number,
    maxPrice: number,
    minArea: number,
    maxArea: number,
    //剩余商铺数量
    surplusShopNumber: number,
    //总商铺数量
    sumShopNumber: number,
    //1 商铺,2 车库,3 写字楼,4 公寓
    treeCategory: TreeCategoryKeyType,
    commission: ISearchResultCommissionType,
    saleStatus: number,
    area: string,
    discounts: string,
    // 项目类型(独家,平行,电商)
    projectType: number,
    //项目标签
    labels:Array<string>,
    buildingIcon:ImageSourcePropType
}
