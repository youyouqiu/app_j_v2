import messageService, {GetCustomerDynamicResponse} from '../services/message';
// @ts-ignore
import XGpush from '@new-space/react-native-xinge-push'


export type systemMessageType =
    "ReportRulesUpOk"
    | "BrokerJoinCompany"
    | "BrokerExitCompany"
    | "BrokerStationing"
    | "CancelBrokerStationing";
export type activityMessageType = "BrokersAppPush_Event";
export type businessMessageType =
    "BrokerStationing_ReportRemind"
    | "ReportRepetition"
    | "RemindComfirmBeltLook"
    | "RemindProtectBeltLook"
    | "RemindNotSign"
    | "BusinessConfirmSigned"
    | "BusinessConfirmBeltLook"
    | "BusinessConfirmSubscription"
    | "BusinessConfirmExchangeShops"
    | "BusinessConfirmExchangeCustomer";
export type projectMessageType = "BrokerProjectDynamic" | "DisparkBrokerReport" | "SellChatUpdate";

export class newsType {// 11-系统消息，12-活动推荐，13-业务信息，14-项目动态，15-客户动态
    static system = 11;
    static activity = 12;
    static business = 13;
    static project = 14;
    static customer = 15;
    static arr = [
        {type: newsType.system, title: '系统通知'},
        {type: newsType.activity, title: '活动推荐'},
        {type: newsType.business, title: '业务信息'},
        {type: newsType.project, title: '项目动态'},
        {type: newsType.customer, title: '客户动态'},
    ];
    static getTitle = function (type: 11 | 12 | 13 | 14 | 15) {
        return newsType.arr.find((i) => i.type === type)?.title ?? '';
    }
}

export interface sysMessageListParam {
    type: newsType;
    messageType?: systemMessageType | activityMessageType | businessMessageType | projectMessageType;
    simpleContent?: string;
    sendTime?: string;
    number?: number;
    messageTypeName?: string;
}

interface newsInfoResponse {
    count: number;
    sysMessageList: sysMessageListParam[];
}

const GetLastNews = {
    namespace: 'getLastNews',
    state: {
        newsInfo: {
            count: 0,
            sysMessageList: [
                {type: newsType.system},
                {type: newsType.activity},
                {type: newsType.business},
                {type: newsType.project},
                {type: newsType.customer},
            ]
        } as newsInfoResponse,
        dtInfo: {},
        flag: true,
        searchNum: 0
    },
    effects: {
        * getList({}, {call, put}: any) {
            const result = yield call(messageService.list);
            yield put({
                type: 'setNewsInfo',
                payload: {
                    data: result.extension || {},
                }
            })
        }
    },
    reducers: {
        setNewsInfo(state: any, {payload: {data}}: any) {
            // 统一在设置消息数量的时候进行app 外部 Icon设置
            XGpush.setApplicationIconBadgeNumber && XGpush.setApplicationIconBadgeNumber(data.count || 0)
            return {
                ...state,
                newsInfo: data,
                count: data.count,
                flag: false,
                searchNum: state.searchNum + 1,
            }
        }
    }

}

export default GetLastNews