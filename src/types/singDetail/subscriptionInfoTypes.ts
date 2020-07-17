export enum signEnum {
    sign = '签约',
    subscription = '认购'
}

type signType = signEnum.sign | signEnum.subscription


export interface customerInfoType {
    //客户姓名
    clientName: string,

    //客户电话
    clientPhone: string
}

export interface visitCustomerInfoType {
    customerName: string,
    customerPhone: Array<string>,
    customerSex?: string | number
}

export interface FileType {
    type: string,
    fileUrl: string
}

/**
 * 签约/认购类型声明
 */
export interface baseType {
    //签约or认购
    type: signType

    //项目经理
    projectManagerName?: string,

    //订单号
    orderNumber?: number,

    //签约商铺
    shopName?: string,

    //客户信息
    customerInfo?: Array<customerInfoType>,

    //签约或认购提交时间
    markTime: string,

    //实际签约时间或实际认购时间
    actualTime: string,

    //实际签约金额或实际认购金额
    amount: string,

    //是否显示历史变更/退房原因按钮
    hasHistory?: boolean,

    //历史变更按钮文案
    historyText?: string,

    //认购ID
    subscriptionId?: string,

    //商铺认购状态：1-已认购，2-已成交，3-已换房，4-已换客，5-已退房，6-退房审核中
    status?: number | string

}

/**
 * 到访类型声明
 */
export interface VisitInfoType {
    //报备ID
    reportId: string,

    //到访客户详情
    customerInfo: visitCustomerInfoType,

    //
    visitTime: string,

    //实际到访时间
    actualTime: string,

    files: Array<FileType>
}

/**
 *报备类型声明
 */
export interface ReportInfoType {
    //报备时间
    reportTime: string,

    //报备号
    reportNo: string,

    //预计到访/带看时间。注：为null表示没有填写
    expectedBeltTime: string,

    //报备模板
    templateItems: string,

    //报备客户（多个电话）
    customers: visitCustomerInfoType
}

export interface singDetailMapReturnType {
    signInfo: baseType,
    subscriptionInfo: baseType,
    visitInfo: VisitInfoType,
    reportInfo: ReportInfoType
}

export interface zcCustomerType {
    trueName: string,
    phoneNumber: string
}

export interface zcInfoType {
    [key: string]: zcCustomerType
}


export interface BasicInfoType {
    //封面
    icon: string,

    //楼盘全称区域
    areaFullName: string,

    //楼盘类型
    buildingType: string
}

/**
 * 签约基本信息
 */
export interface BaseDetailType {
    //楼盘基础信息
    basicInfo: BasicInfoType,

    //驻场
    zcInfo: zcCustomerType,

    //期组名称
    fullName: string,

    //销售状态 1 在售 2代售 3售罄 4 停售
    saleStatus: string
}
