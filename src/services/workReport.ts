/**
 * swagger url: http://192.168.100.161:7000/swagger/index.html#/
 */
import request from '../utils/request'
import { ResponseCommon } from './typings/types'

const getApi = () => request.getUrl().api
export default {
  // 获取工作报表登录信息
  summary: (): Promise<ResponseCommon<Summary>> => {
    return request.get(`${getApi()}/api/statistics/work/summary`)
  },

  // 搜索工作报表业务数据
  businessData: (conditions: DateConditions): Promise<ResponseCommon<BusinessData>> => {
    return request.post(`${getApi()}/api/statistics/work/businessdata`, {
      body: conditions
    })
  },

  // 搜索工作报表销售类型
  saleType: (conditions: DateConditions): Promise<ResponseCommon<SaleType>> => {
    return request.post(`${getApi()}/api/statistics/work/saletype`, {
      body: conditions
    })
  },

  // 搜索工作报表个人最多
  personalMax: (conditions: DateConditions): Promise<ResponseCommon<PersonalMax>> => {
    return request.post(`${getApi()}/api/statistics/work/personalmax`, {
      body: conditions
    })
  },
}

// request conditions
export interface DateConditions {
  // 统计开始时间
  startTime: string
  // 统计结束时间
  endTime: string
}

// response
export interface Summary {
  // 拥有客户数/位 （包含自有客户和微信客户）
  customerCount: number
  // 微信绑定数/位
  wxBindCount: number
  // 完成签约/万 （不留小数点，直接舍去）
  dealAmount: number
}
export interface BusinessData {
  // 报备数
  reportCount: number
  // 到访数
  visitCount: number
  // 认购数
  subscriptionCount: number
  // 签约数
  signedCount: number
  // 退房数
  checkoutCount: number
  // 报备到到访的转化率
  report2VisitRate: number
  // 到访到认购的转化率
  visit2SubcriptionRate: number
  // 认购到签约的转化率
  subscription2SignedRate: number
  // 报备到认购的转化率
  report2SignedRate: number
}
export interface SaleType {
  // 商铺 签约数
  shopDealCount: number
  // 公寓 签约数
  apartmentDealCount: number
  // 写字楼 签约数
  officeDealCount: number
  // 车库 签约数
  garageDealCount: number
}
export interface PersonalMax {
  // 最多报备数（null表示暂无数据）
  maxReportCount: number | null
  // 最多报备楼盘层级ID（null表示暂无数据）
  maxReportBuildingTreeId: string | null
  // 最多报备楼盘层级（null表示暂无数据)
  maxReportBuildingTreeName: string | null
  // 最多到访数（null表示暂无数据）
  maxVisitCount: number | null
  // 最多到访楼盘层级ID（null表示暂无数据）
  maxVisitBuildingTreeId: string | null
  // 最多到访楼盘层级（null表示暂无数据）
  maxVisitBuildingTreeName: string | null
  // 佣金结算比（null表示暂无数据）
  // 已结算完全的签约单 / 签约单 = 比例 % (取小数点2位)
  commissionSettlementRatio: number | null
}
