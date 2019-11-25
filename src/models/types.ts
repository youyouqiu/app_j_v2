import { LocalApi } from '../constants/requestUrl'
import BuryingPoint from '../utils/BuryPoint'

/**
 * store 汇总
 */
export default interface StoreState {
    global: any
    user: UserState
    config: ConfigState
    location: any
    weather: any
    point: PointState
    dictionaries: any
    getLastNews: any
}

/**
 * user model
 */
export interface UserState {
    userInfo: UserInfo | {}
    status: UserStatus
    refresh_token: '',
    access_token: null,
    jpushID: ''
}
export interface UserInfo {
    id?: string
    createTime?: string // 创建时间
    sex?: 0 | 1 | 2  // 1:男 2:女
    openId?: string
    avatar?: string  // 头像
    userName?: string  // 用户名
    trueName?: string  // 姓名
    nickName?: string
    pinYin?: string
    email?: string
    phoneNumber?: string
    wechatAccount?: string
    city?: string  // 城市id
    address?: string  // 城市名
    filialeId?: string  // 公司id
    filialeNo?: string
    filiale?: string  // 公司全称
    filialeShortName?: string  // 公司简称
    deptId?: string  // 部门id
    deptName?: string  // 所属部门
    type?: number
    isAdmin?: boolean
    isDeleted?: boolean
    isLeader?: boolean
    isResident?: boolean  // 驻场
    modifyName?: boolean
    modifyNickName?: boolean
}
export type UserStatus = 200 | 202 | 401 | 404  // 200:正常 202:自由经纪人 401:登陆后验证失败 404:未登陆

export interface NoticeInfo {
    pushId?: string
    url?: string
    id?: string
    extData?: any
    title?: string
}

/**
 * config model
 */
export interface ConfigState {
    requestUrl: LocalApi
    showQuickPage: showQuickPage
    isFirstUseApp: boolean
    noticeInfo: NoticeInfo
    ADVisible?: boolean
    willUpdate?: boolean
}
export interface showQuickPage {
    routeName?: string
}

/**
 * point model
 */
export interface PointState {
    buryingPoint: typeof BuryingPoint
}
