import request from '../utils/request'

/**
 * 广告
 */
export default {
  getAdvertisings: (api: string, params: GetAdvertisingsConditions): Promise<GetAdvertisingsResponse> => {
    return request.post(`${api}/api/ad/getAdvertisings`, {
      body: params,
    })
  },
  queryAdvertisings: (api: string, params: QueryAdvertisingsConditions): Promise<QueryAdvertisingsResponse> => {
    return request.post(`${api}/api/ad/queryAdvertisings`, {
      body: params,
    })
  }
}

export type App = 1 | 2 | 3 | 4  // 1-经纪人端,2-员工端,3-C端小程序,4-开发商小程序
export type JumpType = 0 | 3  // 0-应用内网页跳转,3-应用内数据跳转

export interface GetAdvertisingsConditions {
  site: string
  cityId: string
  app: App
}
export interface QueryAdvertisingsConditions {
  cityId: string
  app: App,
  adSiteCodes: {}  //后端代码原因必传为一个空对象
}

interface BasicResponse {
  code: string
  message: string
}

export interface GetAdvertisingsResponseExtensionListItem {
  id: string
  cover: string
  adName: string
  jumpType: JumpType
  link: string
  site: string
  time: any
  timerStr: string
}
export interface QueryAdvertisingsResponseExtensionListItem {
  'BROKER_HOME_HOT': GetAdvertisingsResponseExtensionListItem[]
  'BROKER_HOME_HEADLINE': GetAdvertisingsResponseExtensionListItem[]
  'BROKER_HOME_TOP': GetAdvertisingsResponseExtensionListItem[]
  'BROKER_ON_OPEN': GetAdvertisingsResponseExtensionListItem[]
}
export interface GetAdvertisingsResponse extends BasicResponse {
  extension: GetAdvertisingsResponseExtensionListItem[]
}
export interface QueryAdvertisingsResponse extends BasicResponse {
  extension: QueryAdvertisingsResponseExtensionListItem
}
