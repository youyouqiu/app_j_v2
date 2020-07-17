import request from '@/utils/request'
import { ResponseCommon, ResponsePagination, RequestPagination } from '../typings/types'

export default {
  /**
   * 项目动态统计接口 [20200509-v2.3.2p] 用于： 项目动态列表界面
   */
  postTrendsLabel: (condition: TrendsLabelCondition): Promise<ResponseCommon<TrendsLabels>> => {
    return request.post(`${request.getUrl().api}/v2/api/buildingtree/dynamic/statistic`, {
      body: condition
    })
  },

  /**
   * 房源首页-项目动态/房源详情-项目动态/项目动态列表
   * https://api.ci.xinkongjian.tech:4020/project/341/interface/api/5158
   */
  postTrendsList: (condition: TrendsListCondition & RequestPagination): Promise<ResponsePagination<Trends[]>> => {
    return request.post(`${request.getUrl().api}/v2/api/buildingtree/dynamic/list`, {
      body: condition
    })
  },
}

export interface TrendsLabelCondition {
  buildingTreeId: string  // 期组ID
}
export interface TrendsListCondition {
  buildingTreeId: string  // 期组ID
  labelId?: string // 标签，为空则查全部
}
export interface TrendsLabels {
  labelList: Label[]  // 标签列表
  buildingTreeName: string  // 楼盘期组名
}
export interface Label {
  labelId: string  // 标签ID
  labelName: string  // 标签名称
  count: number  // 满足条件的动态数量
}
export interface Trends {
  id: string  // 动态ID
  buildingTreeId: string  // 楼盘期组ID
  title: string  // 标题
  content: string  // 正文
  createTime: string  // 创建时间
  label: string  // 标签名称
  imageFiles: string[]  // 动态文件
}
