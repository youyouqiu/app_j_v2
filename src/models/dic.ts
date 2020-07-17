import {Model} from "dva";
import dicService from "../services/dicService";

export interface IDictionariesType<T> {
    [key1: string]: T,
}

export interface IDictionariesValue1Type {
    key: string,
    label: string,
    value: string
}

export interface IDictionariesValue2Type {
    [key: string]: string
}

const dicModel: Model = {
    namespace: 'dictionaries',
    state: {
        search_shops_area: [],//商铺面积
    },
    effects: {
        * getDictionaryDefines({payload}, {call, put}) {
            const responseData = yield call(dicService.dictionaryDefinesReq, {requestData: payload.requestData});
            yield put({type: 'saveSearchShopAreaDic', payload: responseData.extension})
        },
    },
    reducers: {
        saveSearchShopAreaDic: (state, {payload}) => {
            let dicList: any = {};
            payload.map((item: any) => {
                dicList[item.groupId.toLocaleLowerCase()] = item.dictionaryDefines;
                let obj: any = {};
                item.dictionaryDefines.map((item2: any) => {
                    obj[item2.value] = item2.key;
                });
                dicList[item.groupId.toLocaleLowerCase() + '_obj'] = obj
            });
            return {
                ...state,
                ...dicList
            }
        }
    }
};

export default dicModel
