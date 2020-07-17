import {BaseDetailType, baseType, ReportInfoType, VisitInfoType, zcInfoType} from "@/types/singDetail/subscriptionInfoTypes";

export interface SignDetailStateType {
    visible: boolean,
    baseInfo: BaseDetailType,
    zcInfo: zcInfoType,
    loading: boolean,
    signInfo: baseType,
    subscriptionInfo: baseType,
    visitInfo: VisitInfoType,
    reportInfo:ReportInfoType
}
