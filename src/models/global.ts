import {Model} from 'dva'
import articleService from "../services/articleService"
import projectService from "../services/projectService";
import {buildingCityScreenByCityCodeReq} from "../services/component";

const globalModel: Model = {
    namespace: 'global',
    state: {
        consultationTypes: [],  //资讯分类
        buildingNos: [], //楼栋列表
        latitude: '',
        longitude: '',
        cityList: [],
        cityCode: '',
        cityName: '',
        defaultCityName: '重庆',
        defaultCityCode: '500000',
        buildingCityScreen: {},
        buildingTreeId: '',
        buildingName: '',
        buildingId: ''
    },
    effects: {
        * getArticleTypes({payload}, {call, put}) {
            const responseData = yield call(articleService.articleTypesReq, {requestUrl: payload.requestUrl});
            yield put({type: 'saveArticleTypes', payload: responseData.extension})
        },
        * getBuildingNos({payload}, {select, call, put}) {
            let config = yield select((state: any) => state.config);
            let reqData = {
                api: config.requestUrl.api,
                requestData: payload
            };
            const responseData = yield call(projectService.buildingNosReq, reqData);
            yield put({type: 'saveBuildingNos', payload: responseData.extension})
        },
        * getBuildingCityScreenByCityCode({payload}, {call, put}) {
            const res = yield call(buildingCityScreenByCityCodeReq, payload);
            const payloadData = {
                extension: res.extension,
                code: payload.code,
            };
            yield put({type: 'saveBuildingCityScreen', payload: payloadData})
        },
        *saveBuildingInfo({payload}, {put}){
            yield put({type:'buildingInfo',payload:payload})
        }
    },
    reducers: {
        saveArticleTypes(state, {payload}) {
            return {
                ...state,
                consultationTypes: payload,
            }
        },
        saveBuildingNos(state, {payload}) {
            return {
                ...state,
                buildingNos: payload,
            }
        },
        saveCoordinateAndCityName(state, {payload}) {
            console.log(payload, 'saveCoordinateAndCityName')
            return Object.assign({}, {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
                cityName: payload.cityName,
                cityCode: payload.cityCode,
                cityList: payload.cityList
            })
        },
        changeCity(state, {payload}) {
            console.log(payload, 'changeCity')
            return {
                ...state,
                cityName: payload.cityName,
                cityCode: payload.cityCode,
            }
        },
        saveBuildingCityScreen(state, {payload}) {
            const {extension, code} = payload;
            let buildingCityScreen: any = state.buildingCityScreen;
            buildingCityScreen[code] = [{code:code+'_0',name:'全部'},...extension] || {};
            return {
                ...state,
                buildingCityScreen
            }
        },
        buildingInfo(state, {payload}){
            console.log('payload',payload);
            return{
                ...state,
                buildingTreeId:payload.buildingTreeId,
                buildingName:payload.buildingName,
                buildingId: payload.buildingId
            }
        },
        cleanLocation(state){
            return{
                ...state,
                latitude: '',
                longitude: '',
                cityList: [],
                cityCode: '',
                cityName: '',
            }
        }
    },
};

export default globalModel
