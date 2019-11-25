
import messageService from '../services/message';

 const GetLastNews = {
    namespace: 'getLastNews',
    state: {
        newsInfo: {
            count: 0,
            sysMessageList: [
                {type: 1},
                {type: 2},
                {type: 3},
                {type: 4}
            ]
        },
        dtInfo:{},
        isNews:false,
        flag:true,
        searchNum: 0
    },
    effects: {
        *getList({ payload}, { call, put }) {
            const result = yield call(messageService.list,payload)
            yield put({
                type: 'getNewsInfo',
                payload: {
                    data: result.extension || {},
                    // dataDt: resultDt.extension || {}
                }
            })
        }

    },
    reducers: {
        getNewsInfo(state, { payload: { data} }) {
            return{
                ...state,
                newsInfo:data,
                count:data.count,
                flag:false,
                searchNum: state.searchNum + 1,
                isNews:Boolean(data.count)
            }
        }
    }

}

export default GetLastNews