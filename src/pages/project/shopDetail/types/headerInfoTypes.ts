/**
 * @author: zxs
 * @date: 2020/4/28
 */
import {ShopCategoryTypeKeyType, ShopSaleStatusKeyType} from "@/components/new-space/components/Label";
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {IFeatureShopHeaderType} from '@/pages/main/types/featureShopTypes'

export interface IFiledTypes {
    label: string | number | JSX.Element,
    value: string | number | JSX.Element
}

export interface IHeaderInfoPropsType {
    shopId: string,
    headerInfo: IHeaderInfoType,
    dictionaries:any,
    navigation:NavigationScreenProp<NavigationRoute>
    featureShopHeader?: IFeatureShopHeaderType
}

export interface IHeaderInfoType {
    name: string,//商铺名称
    saleStatus: ShopSaleStatusKeyType,//销售状态1待售,2在售,3锁定,4已认购,10已售,18成交审核中,35退售审核中
    shopCategoryType: ShopCategoryTypeKeyType,//商铺类型
    shopCategoryTypeStr: string,//商铺类型
    buildingArea: number,//建筑面积
    houseArea: number | string,//套内面积
    totalPrice: number,//总价
    unitPrice: string,//单价
    shopCategory: number,//商铺类别
    shopCategoryStr: string,//商铺类别
    depth: number | string,//进深
    height: number | string,//层高
    width: number | string,//面宽
    number: string //商铺编号
    preferentialPolicies: string,//优惠政策
    dealreward: string,//奖励
    commission: string,//佣金
    recommendTitle: string,//入选榜单
    recommendId: string,//入选榜单id
    floors:number
}
