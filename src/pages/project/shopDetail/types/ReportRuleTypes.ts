import {LayoutChangeEvent} from "react-native";

/**
 * @author: zxs
 * @date: 2020/5/7
 */
export interface ReportRulePropsTypes {
    reportOtherInfo: IReportOtherInfoType,
    reportRule:Array<IReportRuleTypes>,
    onLayout?:(params:LayoutChangeEvent)=>void
    page:string
}

export interface IReportRuleTypes {
    key: string,
    data: { label: string, value: string }
}

export interface IReportOtherInfoType extends Object{
    //案场进度
    caseSystem: string,
    //带看流程
    lookProcess: string,
    //佣金方案
    moneyProgramme:string
}


