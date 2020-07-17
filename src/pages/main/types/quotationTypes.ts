/**
 * @author: zxs
 * @date: 2020/4/27
 */
export interface IQuotationPropsType {
    projectLocation:any,
    refreshingRandom:number
}

export interface IQuotationDetailType {
    cityName: string,
    dateMonth: string

    //价格浮动比例方式 1 上升 2 下降
    floatType: number

    //当前月份的行情单价格信息
    price: number,

    //浮动的比例 100为单位
    proportion: number
}
