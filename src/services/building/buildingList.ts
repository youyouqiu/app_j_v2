/**
 * yapi url: https://api.ci.xinkongjian.tech:4020/project/341/interface/api/cat_1801
 */
import request from '@/utils/request'
import { RequestPagination, ResponsePagination } from '@/services/typings/types'
import { ISearchResultCommissionType } from "@/pages/workbench/searchBuilding/types";

export default {
  /**
  * 楼盘列表(含搜索)
  * https://api.ci.xinkongjian.tech:4020/project/341/interface/api/5178
  */
  postBuildingList: (conditions: BuildingListSearchConditions): Promise<ResponsePagination<IBuildingPreviewWithShare[]>> => {
    return request.post(`${request.getUrl().api}/v2.0/api/buildingtree/Search`, {
      body: conditions
    })
  },
}

export interface BuildingTreeArea {
  minArea?: number  // 最小面积
  maxArea?: number  // 最大面积
}
export interface BuildingTreePrice {
  minPrice?: number  // 最低价格 单位万元
  maxPrice?: number  // 最高价格 单位万元
}
export interface BuildingListSearchConditions {
  keyWord?: string  // 楼盘搜索关键字
  city?: string  // 城市code
  district?: string  // 区域
  areas?: string[]  // 片区
  buildingTreeAreas?: BuildingTreeArea[]  // 楼盘面积区间
  buildingTreeTotalPrices?: BuildingTreePrice[]  // 总价区间
  buildingTreeUnitPrices?: BuildingTreePrice[]  // 单价区间
  treeCategory?: number  // 楼期类型(1 商铺,2 车库,3 写字楼,4 公寓)
  projectType?: number  // 项目类型(1 独家,2 平行分销,3 电商)
  maxCommission?: boolean  // 是否高佣金
  cashPrize?: boolean  // 是否现金奖
  batelyBegin?: boolean  // 是否近期开盘
  discounts?: boolean  // 是否有优惠
  buildingTreeOderBy?: number  // 楼期排序(0-默认,1-销量优先,2-在售优先,3-在售商铺数降序,4-在售商铺数升序,5-价格降序排序,6-价格升序排序)
  buildingTreeIds?: Array<string>
}

export type BuildingListRequestConditions = BuildingListSearchConditions & RequestPagination

export interface IBuildingPreview {
  buildingTreeId?: string  // 楼期id
  buildingTreeName?: string  // 楼期名称
  sellState?: 1 | 2 | 3 | 4  // 销售状态 1 在售 2待售 3售罄 4 停售
  minPrice?: number  // 最低价格
  maxPrice?: number  // 最高价格
  surplusShopNumber?: number  // 剩余商铺数量
  sumShopNumber?: number  // 总商铺数量
  district?: string  // 区域
  area?: string  // 片区
  minArea?: number  // 最小建面
  maxArea?: number  // 最大建面
  projectType?: number  // 项目类型(独家,平行,电商)
  treeCategory?: 1 | 2 | 3 | 4  // 楼期类型(商铺,车库,写字楼,公寓)
  labels?: string[]  // 项目标签List
  commission?: ISearchResultCommissionType  // 佣金比例
  discounts?: string  // 优惠政策
  featureLabels?: string[]  // 特色标签List
  buildIcon?: string  // 楼盘图片
  city?: string // 城市代码
  cityName?: string  // 城市名字
  buildingFormat?: {
    buildingId: string
    avgRent?: number
    formatName?: string
    formatNumber?: number
  }
}

export interface IBuildingPreviewWithShare extends IBuildingPreview {
  avatarList?: string[]  // 微信头像地址List
  number?: number  // 分享的经纪人人数
}
