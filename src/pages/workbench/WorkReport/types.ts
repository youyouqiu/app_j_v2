// 数量统计 cube
export type TCube = {
  kh?: number  // 拥有客户数
  wx?: number  // 微信绑定数
  qy?: number  // 完成签约数
}
// 数量统计 table
export type TTable = {
  bb?: number  // 报备
  df?: number  // 到访
  rg?: number  // 认购
  qy?: number  // 签约
  tf?: number  // 退房
}
// 转化率
export type TRate = {
  bb2df?: number  // 报备->到访
  df2rg?: number  // 到访->认购
  rg2qy?: number  // 认购->签约
  bb2qy?: number  // 报备->签约
}
// 签约数
export type TChart = {
  xzl?: number  // 写字楼
  sp?: number   // 商铺
  ck?: number   // 车库
  gy?: number   // 公寓
}
// 个人纪录
export type TRecord = {
  bbBuild?: string | null   // 最多报备楼盘层级（null表示暂无数据)
  bbCount?: number | null   // 最多报备数（null表示暂无数据）
  dfBuild?: string | null   // 最多到访楼盘层级（null表示暂无数据）
  dfCount?: number | null   // 最多到访数（null表示暂无数据）
  yjjsRate?: number | null  // 佣金结算比（null表示暂无数据）
}
export type TLoading = 'summary' | 'businessData' | 'saleType' | 'personalMax'
export type TLoadingObj = {
  [key in TLoading]: boolean
}
