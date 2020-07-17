import request from '../utils/request'
import { ResponseCommon } from './typings/types'

// 广告位置
export type AdType = 'BROKER_ON_OPEN' | 'BROKER_HOME_TOP'
  | 'BROKER_HOME_HOT' | 'BROKER_HOME_HEADLINE' | 'NEW_BANNER' | 'BUILDING_BANNER'
export type AppType = 1 | 2 | 3 | 4  // 应用类型 1-经纪人端, 2-员工端, 3-C端小程序, 4-开发商小程序
export type AdJumpType = 0 | 3  // 广告跳转类型 0-应用内网页跳转, 3-应用内数据跳转

// key: AdType, value: 需要获取的条数
export type AdSiteCodes = {
  [key in AdType]?: number
}

export interface AdsRequestConditions<T extends AdSiteCodes> {
  cityId: string  // 城市标识
  app: AppType  // 应用类型
  adSiteCodes: T  // 广告的所在位置和条数
}

// 单条广告
export interface Ad {
  id: string
  cover: string  // 封面
  adName: string
  jumpType: AdJumpType
  link: string
  site: string
  time: any
  timerStr: string,
  source: string
}
// 广告列表 key: 广告位置, value: 对应位置的广告lise
export type Ads<T extends keyof AdSiteCodes> = {
  [key in T]?: Ad[]
}

export default {
  /**
   * APP端获取广告信息 1.5
   * https://api.ci.xinkongjian.tech:4020/project/86/interface/api/288
   */
  queryAdvertisings: <T extends AdSiteCodes, K extends keyof T>(conditions: AdsRequestConditions<T>): Promise<ResponseCommon<Ads<K>>> => {
    return request.post(`${request.getUrl().public}/api/ad/queryAdvertisings`, {
      body: conditions
    })
  },
}
