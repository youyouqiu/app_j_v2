import projectService from "@/services/projectService";

export const projectLocation = {

    namespace: 'projectLocation',
    state: {
        cityCode: '',
        cityName: '',
        cityList: '',
        lat: '',
        lng: '',
        defaultCityName: '重庆',
        defaultCityCode: '500000',
    },
    effects: {
        * getCityList({payload}, {call, put}) {
            const res = yield call(projectService.cityListReq, {levels: [1]});
            console.log('getCityList',res);
            yield put({type: 'saveCityList', payload: res})
        }
    },
    reducers: {
        saveCityInfo: (state, {payload}) => {
            console.log('saveCityInfo_payload', payload);
            const {cityCode, cityName, cityList, lat, lng,} = payload;
            return {
                ...state,
                cityCode, cityName, cityList, lat, lng,
            }
        },
        saveCityList(state, {payload}) {
            console.log('saveCityList', payload);
            return {
                ...state,
                cityList: payload.extension
            }
        },
        changeCityInfo(state, {payload}) {
            console.log('changeCityInfo', payload);
            return {
                ...state,
                ...payload
            }
        }
    }
};
