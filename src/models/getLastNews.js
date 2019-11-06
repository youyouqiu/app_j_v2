
import messageService from '../services/message';

 const GetLastNews = {
    namespace: 'getLastNews',
    state: {
        newsInfo: {},
        dtInfo:{},
        isNews:false,
        flag:true
    },
    effects: {
        *getList({ payload}, { call, put }) {
            const result = yield call(messageService.list,payload)
            // console.log(result,'result')
            const resultDt = yield call(messageService.dtInfo, payload)
            // console.log(resultDt,'resultDt')
            yield put({
                type: 'getNewsInfo',
                payload: {
                    data: result.extension || {},
                    dataDt: resultDt.extension || {}
                }
            })
        }

    },
    reducers: {
        getNewsInfo(state, { payload: { data , dataDt} }) {
            // console.log(data , dataDt,'data , dataDt')
            return{
                ...state,
                newsInfo:data,
                dtInfo:dataDt,
                count:data.count,
                dtCount:dataDt.number,
                flag:false,
                isNews:Boolean(data.count + dataDt.number)
            }
        }
    }

}

export default GetLastNews