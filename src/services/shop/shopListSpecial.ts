import request from '@/utils/request'
import { RequestPagination, ResponseCommon } from '../typings/types'
import { ISearchResultCommissionType } from "@/pages/workbench/searchBuilding/types"

export default {
  /**
   * 房源首页-铺优选-更多列表
   * https://api.ci.xinkongjian.tech:4020/project/341/interface/api/5263
   */
  postShopListSpecial: (condition: RequestCondition): Promise<ResponseCommon<ShopSpecial>> => {
    return request.post(`${request.getUrl().api}/v2/api/home/feature/shop/list`, {
      body: condition
    })
  },
}

export type RequestCondition = Condition | RequestPagination
export interface Condition {
  featureId: string  // 特色分类的ID
}

export interface ShopSpecial {
  featureId: string
  featureTitle: string
  featureSubtitle: string
  homeFeatureShops: TShopPreview[]
  pageIndex: number
  pageSize: number
  totalCount: number
}

export interface TShopPreview {
  featureId: string | null  // 特色分类的ID
  buildingTreeId: string | null  // 楼期ID
  buildingTreeName: string | null  // 楼期名称
  shopImage: string | null  // 商铺图片
  shopName: string | null  // 商铺名称
  shopId: string | null  // 商铺ID
  saleStatus: 1 | 2 | 3 | 4 | 10 | null  // 商铺销售状态(1待售,2在售,3锁定,4已认购,10已售,18成交审核中,35退售审核中)
  shopHeight: number | null  // 商铺层高
  shopWidth: number | null  // 商铺开间
  shopOutsideArea: number | null  // 商铺可外摆距离
  shopIsCorner: boolean | null  // 是否转角铺
  shopIsDoubleLayer: boolean | null  // 是否一拖二
  totalPrice: number | null  // 商铺总价
  unitPrice: number | null  // 商铺单价
  buildingArea: number | null  // 商铺建面
  city: string | null  // 城市Code
  cityName: string | null  // 城市名称
  districtName: string | null  // 区县名称
  areaName: string | null  // 区域名称
  shopCategoryType: 1 | 2 | 3 | 4 | null  // 商铺类型(1 商铺,2 车库,3 写字楼,4 公寓)
  featureLabels: string[] | null  // 商铺特色标签
  commission: ISearchResultCommissionType  // 佣金方案
  discounts: string | null  // 优惠政策
}
