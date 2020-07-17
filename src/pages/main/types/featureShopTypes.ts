import {ImageRequireSource, ImageSourcePropType} from "react-native";
import {ShopSaleStatusKeyType, ShopSaleStatusType} from "@/components/new-space/components/Label";

export interface IFeatureShopPropsType {
    cityCode: string,
    refreshingRandom:number
}

export interface ILGConfigTypes {
    start: { x: number, y: number },
    end: { x: number, y: number },
    colors: Array<string>
}

export interface IFeatureColorTypes {
    LGConfig: ILGConfigTypes
}

export interface IFeatureConfigTypes {
    color: string,
    labelIcon: ImageRequireSource,
    arrowIcon: ImageRequireSource,
    lg_config: ILGConfigTypes
}

export interface IFeatureHeaderTypes {
    arrowIcon: ImageRequireSource,
    labelIcon: ImageSourcePropType,
    color: string,
    data:IFeatureShopHeaderType,
}

export interface IFeatureShopResponseType {
    featureIcon: string,
    featureId: string,
    featureSubtitle: string,
    featureTitle: string,
    featureShopList: Array<IFeatureShopListResponseType>
}

export interface IFeatureShopListResponseType {
    buildingTreeId: string,
    buildingTreeName: string,
    saleStatus: ShopSaleStatusKeyType,
    shopId: string,
    shopImage: string,
    shopName: string,
    totalPrice: number
}

export interface IFeatureShopType {
    featureShopHeader: IFeatureShopHeaderType,
    featureShopList: Array<IFeatureShopListResponseType>
}

export interface IFeatureShopHeaderType {
    featureTitle: string,
    featureSubtitle: string,
    featureId:string
}
