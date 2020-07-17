/**
 * @author: zxs
 * @date: 2020/4/29
 */
import {ShopCategoryTypeKeyType, ShopSaleStatusKeyType} from "@/components/new-space/components/Label";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import fa_IR from "@/components/XKJDatePicker/date-picker/datepicker/locale/fa_IR";

export interface ISearchResultStateType {
    visible: boolean,
    choiceType: string,
    shopList: Array<ISearchResultResponseType>,
    totalPriceSelectValues: Array<IChoiceLabelDataPropsType>,
    unitPriceSelectValues: Array<IChoiceLabelDataPropsType>,
    areaSelectValues: Array<IChoiceLabelDataPropsType>,
    regionSelectedValues: IRegionType,
    refreshing: boolean,
    fetchRandom: number,
    regionChoiceLabel: string
}

export interface ISearchResultCommonType {
    hasMore: boolean,
    showEmptyComponent: boolean,
    fetchFlag: boolean,
}

export interface IScreenItemTypes {
    key: string,
    label: string
}

export interface ISearchResultPropsTypes {
    config: any,
    dispatch: any,
    dictionaries: any,
    navigation: NavigationScreenProp<NavigationRoute>,
    projectLocation: any
}

export interface ISearchResultResponseType {
    areaName: string,
    buildingArea: number,
    buildingTreeId: string,
    buildingTreeName: string,
    city: string,
    cityName: string,
    commission: ISearchResultCommissionType,
    discounts: string,
    districtName: string,
    featureLabels: Array<string>,
    saleStatus: ShopSaleStatusKeyType,
    shopCategoryType: ShopCategoryTypeKeyType,
    shopId: string,
    shopName: string,
    shopUrl: string,
    totalPrice: number,
    unitPrice: number,
}

export interface ISearchResultCommissionType {
    commissionsType: number,
    commissionsValue: number,
    dealPrize: number,
    percentageType: number,
    takeLookPrize: number
}

export interface IshopAreasType {
    minArea: number | string,
    maxArea: number | string
}

export interface IShopPriceType {
    minPrice: number,
    maxPrice: number
}


export interface ISearchRequestType {
    pageIndex: number,
    pageSize: number,
    shopTotalPrices: Array<IShopPriceType>,
    shopUnitPrices: Array<IShopPriceType>,
    city: string,
    district: string,
    shopAreas: Array<IshopAreasType>,
    areas: Array<string>,
    shopType: number,
    featureType1: any,
    featureType2: Array<number>
}

export interface IOtherDataType {
    shopAreasName: Array<string | number>
}
