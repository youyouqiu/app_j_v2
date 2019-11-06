import request from '../utils/request'

/**
 * 广告
 */
export default {
  getAdvertisings: (api: string, params: GetAdvertisingsConditions): Promise<GetAdvertisingsResponse> => {
    return request.post(`${api}/api/ad/getAdvertisings`, {
      body: params,
    })
  }
}

export type App = 1 | 2 | 3 | 4  // 1-经纪人端,2-员工端,3-C端小程序,4-开发商小程序
export type JumpType = 0 | 3  // 0-应用内网页跳转,3-应用内数据跳转

export interface GetAdvertisingsConditions {
  site: 'BROKER_HOME_HEADLINE'
  cityId: string
  app: App
}

interface BasicResponse {
  code: string
  message: string
}

export interface GetAdvertisingsResponseExtensionListItem {
  id: string
  cover: string
  adName: string
  jumpType: JumpType
  link: string
  site: string
  time: any
  timerStr: string
}
export interface GetAdvertisingsResponse extends BasicResponse {
  extension: GetAdvertisingsResponseExtensionListItem[]
}
