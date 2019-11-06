import request from '../utils/request'

/**
 * 消息
 */
export default {
  // 重要提醒 && 业务信息
  list: ({api}: any) => {
    return request.get(`${request.getUrl().api}/v2.0/api/message/getsysmessagelist`)
  },
  // 客户动态
  dtInfo: (api: any): Promise<GetCustomerDynamicResponse> => {
    const url = `${request.getUrl().api}/v2.0/api/customerInfo/getcustomerdynamic/`
    return request.get(url)
  },
  // 客户动态消息列表
  dtList: (api: string, params: any) => {
    return request.post(`${api}/v2.0/api/customerInfo/getcustomerdynamiclist`, {
      body: params
    })
  },
  // 其他消息列表
  otherList: (api: string, params: any) => {
    return request.post(`${api}/v2.0/api/message/getsysmessagedetailslist`, {
      body: params
    })
  },
  // 阅读消息
  read: (api: string, params: ReadConditions): Promise<void> => {
    return request.post(`${api}/v2.0/api/message/readmessage`, {
      body: params
    })
  },

  // 阅读动态消息
  readDt: (api: string, params: ReadConditions): Promise<void> => {
    return request.post(`${api}/v2.0/api/customerInfo/readcustomerdynamic`, {
      body: params
    })
  },
  // 删除消息
  delete: (api: string, params: ReadConditions): Promise<void> => {
    return request.post(`${api}/v2.0/api/message/emptymessage`, {
      body: params
    })
  },
  // 删除动态消息
  deleteDt: (api: string, params: ReadConditions): Promise<void> => {
    return request.post(`${api}/v2.0/api/customerInfo/emptycustomerdynamic`, {
      body: params
    })
  },
  // 经纪人端首页获取待办消息
  waitMessage: (api: string): Promise<WaitMessageResponse> => {
    return request.get(`${api}/api/message/waitmessage`)
  },
  closeBacklog: (api: string, messageId: string) => {
    return request.post(`${api}/api/message/waitmessage/close/${messageId}`, {
      method: 'PUT',
      body: undefined,
    })
  },
}
export type CustomerDynamicType = 1 | 2 | 3 | 4  // 1-重要预警，2-业务信息，3-客户动态，4-活动推荐
/** 
 * RemindNotSign-需要跟进签约
 * RemindComfirmBeltLook-还有到访未确认
 * RemindProtectBeltLook-保护期即将到期
 * ReportRepetition-报备重客
 */
export type MessageType = 'RemindNotSign' | 'RemindComfirmBeltLook' | 'RemindProtectBeltLook' | 'ReportRepetition'
export type WaitMessageResponseListItem = {
  messageId: string
  title: string
  messageType: MessageType
  dataContent: string
  allowClose: boolean
}

export interface ReadConditions {
  type: CustomerDynamicType
}

export interface GetCustomerDynamicExtension {
  type: CustomerDynamicType
  simpleContent: string
  sendTime: string
  number: number
  messageTypeName: string
}
export interface WaitMessageResponseExtension<T> {
  messageTotal: number
  waitMessageList: T[]
}

interface BasicResponse {
  code: string
  message: string
}
export interface GetCustomerDynamicResponse extends BasicResponse {
  extension: GetCustomerDynamicExtension
}
export interface WaitMessageResponse extends BasicResponse {
  extension: WaitMessageResponseExtension<WaitMessageResponseListItem>
}
