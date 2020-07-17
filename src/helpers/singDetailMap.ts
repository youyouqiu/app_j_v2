/**
 * 签约单详情后端数据映射
 * @param originalData
 */
import {
    BaseDetailType,
    baseType,
    BasicInfoType, ReportInfoType,
    signEnum,
    singDetailMapReturnType,
    visitCustomerInfoType,
    VisitInfoType,
    zcCustomerType
} from "@/types/singDetail/subscriptionInfoTypes";
import moment from "moment";


const singDetailMap = (originalData: any): singDetailMapReturnType => {
    const signInfoMap = originalData.dealInfo;
    const subscriptionInfoMap = originalData.subscriptionInfo;
    const visitMap = originalData.takeLookInfo;
    const reportInfoMap = originalData.reportInfo;

    //签约信息
    let signInfo: baseType = {} as baseType;
    if (signInfoMap) {
        signInfo = {
            type: signEnum.sign,
            orderNumber: signInfoMap.subScriptionNo,
            shopName: signInfoMap.shopName,
            customerInfo: signInfoMap.customers,
            amount: `￥${String(signInfoMap.dealAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            markTime: signInfoMap.markTime,
            actualTime: moment(signInfoMap.dealTime).format('YYYY-MM-DD')
        };
    }


    //认购信息
    const subscriptionInfo: baseType = {
        type: signEnum.subscription,
        orderNumber: subscriptionInfoMap.subScriptionNo,
        shopName: subscriptionInfoMap.shopName,
        customerInfo: subscriptionInfoMap.customers,
        amount: `￥${String(subscriptionInfoMap.subScriptionAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        markTime: moment(subscriptionInfoMap.markTime).format('YYYY-MM-DD HH:mm:ss'),
        actualTime: moment(subscriptionInfoMap.subScriptionTime).format('YYYY-MM-DD'),
        subscriptionId: subscriptionInfoMap.subScriptionId,
        status: subscriptionInfoMap.status,
        hasHistory: false,
        historyText: ''
    };

    //到访信息
    let _customerInfo: visitCustomerInfoType = {
        customerName: '',
        customerPhone: []
    };
    visitMap.customers.map((item: any) => {
        _customerInfo.customerName = item.clientName;
        _customerInfo.customerPhone.push(item.clientPhone)
    });
    const visitInfo: VisitInfoType = {
        customerInfo: _customerInfo,
        visitTime: moment(visitMap.reportTime).format('YYYY-MM-DD HH:mm:ss'),
        actualTime: moment(visitMap.markTime).format('YYYY-MM-DD HH:mm:ss'),
        files: visitMap.files,
        reportId: visitMap.reportId,
    };

    //报备信息
    const {expectedBeltTime, reportNo, reportTime, templateItems, customers} = reportInfoMap;
    let reportCustomerInfo: visitCustomerInfoType = {
        customerName: '',
        customerPhone: []
    };
    customers.map((item: any) => {
        reportCustomerInfo.customerName = item.clientName;
        reportCustomerInfo.customerSex = item.clientSex;
        reportCustomerInfo.customerPhone.push(item.clientPhone)
    });
    const reportInfo: ReportInfoType = {
        customers: reportCustomerInfo,
        expectedBeltTime: expectedBeltTime ? moment(expectedBeltTime).format('YYYY-MM-DD HH:mm') : '',
        reportNo,
        reportTime,
        templateItems: templateItems || []
    };

    return {signInfo, subscriptionInfo, visitInfo, reportInfo};
};

const baseDetailMap = (originalData: any = {}): BaseDetailType => {
    const {areaFullName, buildingType, icon}: BasicInfoType = originalData.basicInfo;
    const {trueName, phone} = (originalData.residentUserInfo || [])[0];
    const zcInfo: zcCustomerType = {
        phoneNumber: phone,
        trueName: trueName
    };
    return {
        fullName: originalData.fullName,
        zcInfo: zcInfo,
        basicInfo: {areaFullName, buildingType, icon},
        saleStatus: originalData.saleStatus
    };
};

export {singDetailMap, baseDetailMap}
