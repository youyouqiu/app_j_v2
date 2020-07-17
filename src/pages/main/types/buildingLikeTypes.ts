/**
 * @author: zxs
 * @date: 2020/4/27
 */
import {ImageSourcePropType} from "react-native";
import {BuildingSaleStatusKeyType, TreeCategoryKeyType} from "@/components/new-space/components/Label";

export interface IBuildingLikeTypes {
    buildingTreeIds: Array<IBuildingTreeIds>,
    config: any,
    projectLocation:any,
    refreshingRandom:number
}

export interface IBuildingLikeStateTypes {
    buildingList:Array<IBuildingDetailTypes>
}

export interface IBuildingTreeIds {
    buildingTreeId: string,
    adId: string
}

export interface IBuildingDetailTypes {
    buildingTreeId:string,
    buildingId:string,
    fullName: string,
    minPrice: string,
    maxPrice: string,
    buildingType: string,
    areaFullName: string,
    buildIcon: string,
    minAcreage:string,
    maxAcreage:string,
    treeCategory:TreeCategoryKeyType,
    treeCategoryName:string,
    sellState:BuildingSaleStatusKeyType,
    sellStateName:string,
    projectType:number,
    projectTypeName:string,
    labelNames:Array<string>,
    avatarList:Array<string>,
    number:number,
    areaName:string,
    discounts:string,
    buildingFormat?: {
      avgRent?: string | number
      formatNumber?: string | number
      formatName?: string
      buildingTreeId?: string
    }
}
