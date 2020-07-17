import {RequestPagination} from './types'
import {ShopSaleStatusKeyType} from '@/components/new-space/components/Label';

// 楼盘详情
export interface IProjectDetail {
  buildingTreeId?: string
  buildingId?: string
  basicInfo?: IProjectDetailBasicInfo
  projectType?: 1 | 2 | 3 // 项目类型 1 独家 2 平行 3 电商
  treeLabels?: string // 楼期标签（使用逗号隔开，前端自己遍历）
  maxAcreage?: number // 最大面积
  minAcreage?: number // 最小面积
  commission?: string // 佣金方案
  moneyProgramme?: string // 佣金方案
  reward?: string // 奖励
  minPrice?: number // 最小价格
  maxPrice?: number // 最大价格
  saleStatus: 1 | 2 | 3 | 4 // 楼盘销售状态
  fullName?: string // 期组名称
  summary?: string // 简介
  shopsStock?: number // 可售商铺总数
  writeShopsNumber?: number // 录入商铺总数
  treeCategory?: 1 | 2 | 3 | 4 // 层级类型(1 商铺,2 车库,3 写字楼,4 公寓)
  treeProjectSpecial?: string[] // 层级的配套信息 冗余字段 多个使用|字典key|,通过配套信息回填的
  facilities?: string
  facility?: IFacilities[] // 基础设施
  caseSystem?: string // 案场制度
  lookProcess?: string // 带看流程
  targetCustomers?: string // 目标客群
  resistanceRhetoric?: string // 抗性说辞
  sellingPointAnalysis?: string // 卖点分析
  preferentialPolicies?: string // 优惠政策
  dealreward?: string // 成交奖
  takelookreward?: string // 带看奖
}

// 销讲资料item
export interface IFiltItem {
  buildingTreeId: string
  createTime: string
  fileExt: string
  fileGuid: string
  fileName: string
  fileSize: number
  fileUrl: string
}

// 配套设施
export interface IFacilities {
  buildingTreeId?: string
  facilityid?: string
  facilitykey?: string
  facilityvalue?: string
}

export interface IAibdtEbtrance {
  evaluate: '潜力之星' | '市场热门' | '强力推荐'
  formatName: string
}

// 楼盘详情的basicInfo
export interface IProjectDetailBasicInfo {
  // [key: string]: any
  address?: string // 地址
  cityDefine?: {
    code: string
    name: string
  }
  districtDefine?: {
    code: string
    name: string
  }
  areaDefine?: {
    code: string
    name: string
  }
  areaFullName?: string // 地址全称
  cityName?: string // 城市名称
  city?: string // 城市code
  districtName?: string
  areaName?: string
  buildingType?: string // 楼栋类型
  propertyTerm?: number // 产权年限
  buildingNum?: number // 楼栋总数
  landExpireDate?: string // 土地到期时间
  floorSurface?: number // 占地面积
  builtupArea?: number // 建设面积
  greeningRate?: number // 绿化率
  shops?: number // 商铺总数
  pmc?: string // 物业公司
  pmf?: number // 物管费
  icon?: string // 封魔
  mapType?: string // 地图类型
  longitude?: string // 经度
  latitude?: string // 纬度
  txLongitude?: string // 腾讯经度
  txLatitude?: string // 腾讯纬度
  plotRatio?: number // 容积率
  developers?: { // 开发商信息	
    developerId?: string // 开发商id
    developerName?: string // 开发商名称
  }
  facilities?: string // 楼盘地图上的配套信息 冗余字段,只有查询会使用到|值| 是否有医院这种数据,有值表示有
  housesNumber?: number // 规划户数	
  housPMF?: number // 住宅物业费	
  parkingProportionMolecule?: number // 车位分子	
  parkingProportionDenominator?: number // 车位分母	
  basementParkingSpace?: number // 地下停车位	
  parkingSpace?: number // 地面停车位	
  totalParking?: number // 总车位信息	
  populations?: number // 居住人口	
  // preferentialPolicies?: string // 优惠政策	郑强勇说不用这个
  tradeMixPlanning?: string // 业态规划 原始字段 逗号分隔的字符	
  tradeMixPlanningList?: string[] // 业态规划	
  summary?: string // 楼期简介	
}

// 驻场信息
interface IResident {
  id: string // userId
  trueName: string // 真实姓名
  phone: string // 电话
  avatar: string // 头像
  viewCount: number // 咨询次数
}

// 对楼盘的关注状态
interface IFollowState {
  isFavorite: boolean // 是否关注
  isNotify: boolean // 是否开盘通知我
  isSubscribe: boolean // 是否订阅该项目动态
}

// 报备规则
interface IReportRules {
  id?: string
  buildingId?: string
  reportTime?: string // 报备开始时间	
  canReport?: boolean // 能否报备	
  validityDay?: number // 报备有效期	
  beltProtectDay?: number // 带看保护期
  reportValidity?: string // 报备有效期//前端组件不支持需要转换	
  takeLookValidity?: string // 带看保护期//前端组件不支持需要转换	
  liberatingStart?: string // 接访开始时间
  liberatingEnd?: string // 接访结束时间
  mark?: string // 备注
}

// 主推楼盘item
interface IMainShopItem {
  icon?: string // 封面
  saleStatus?: ShopSaleStatusKeyType // 商铺类型
  area?: number // 面积
  shopName?: string // 商铺名称
  price?: number // 价格
  id?: string
}

// 项目动态item
interface IDynamicItem {
  buildingId: string
  buildingTreeId: string
  title: string // 动态标题
  content: string // 内容
  createTime: string // 创建时间
  label: string // 标签
  sort: string // 标签顺序
  imageFiles: string[] // 动态文件
}

interface IDynamicRequest extends RequestPagination {
  buildingTreeIds?: string[]
  labels?: string[]
}

interface IHostListRequest extends RequestPagination {
  treeId: string
}

interface ICollectRequest {
  buildingTreeIds: Array<string>
}

interface ISellStatisticsRequest extends RequestPagination {
  buildingTreeId: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  saleStatus?: string[]
  status?: string[]
  buildingNos: string
}

interface ISellStatisticsItem {
  buildingId: string
  buildingTreeId: string
  buildingNo: string
  count: number
  name: string
}

interface IAddResidentRequest {
  userId: string
  buildingTreeId: string
}

interface IBuildingTreeFiles {
  imageCount?: number
  images?: IBuildingTreeFilesItem[]
}

interface IBuildingTreeFilesItem {
  buildingTreeId?: string // 楼盘期组ID
  fileGuid?: string // 文件GUID
  fileUrl?: string // 文件url
  fileExt?: string // 文件类型
  from?: string // 来源（如：pc-upload、wx-upload）
  group?: string // 分组
  name?: string // 名字
  isIcon?: boolean // 是否封面
  images?: {
    SMALL?: string // 
    ICON?: string
    MEDIUM?: string
    ORIGINAL?: string
    ROW?: string
  }
  size?: number
}