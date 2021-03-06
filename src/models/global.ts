import {Model} from 'dva'
import articleService from "../services/articleService"
import projectService from "../services/projectService";
import {buildingCityScreenByCityCodeReq} from "@/services/component";

const globalModel: Model = {
    namespace: 'global',
    state: {
        consultationTypes: [],  //资讯分类
        consultationTypesLoading: false, // 资讯lodaing
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
        * getArticleTypes({}, {call, put, select}) {
            let location = yield select((state: any) => state.location);
            yield put({type: 'setArticleTypesLoading', payload: true})
            const responseData = yield call(articleService.articleTypesReq, {
                'source': 2,
                'cityId': location.locationCityCode
            });
            yield put({type: 'saveArticleTypes', payload: responseData.extension})
        },
        * getBuildingNos({payload}, {call, put}) {
            let reqData = {
                requestData: payload
            };
            const responseData = yield call(projectService.buildingNoListReq, reqData);
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
        * saveBuildingInfo({payload}, {put}) {
            yield put({type: 'buildingInfo', payload: payload})
        }
    },
    reducers: {
        saveArticleTypes(state, {payload}) {
            return {
                ...state,
                consultationTypes: payload,
                consultationTypesLoading: false
            }
        },
        setArticleTypesLoading(state, {payload}) {
            return {
                ...state,
                consultationTypesLoading: payload,
            }
        },
        saveBuildingNos(state, {payload}) {
            return {
                ...state,
                buildingNos: payload,
            }
        },
        saveCoordinateAndCityName(state, {payload}) {
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
            return {
                ...state,
                cityName: payload.cityName,
                cityCode: payload.cityCode,
            }
        },
        saveBuildingCityScreen(state, {payload}) {
            const {extension, code} = payload;
            let buildingCityScreen: any = state.buildingCityScreen;
            if(code.includes('_0')){
                buildingCityScreen[code] = extension;
            }else {
                buildingCityScreen[code] = [{code: code + '_0', name: '全部'}, ...extension] || {};
            }

            return {
                ...state,
                buildingCityScreen
            }
        },
        buildingInfo(state, {payload}) {
            return {
                ...state,
                buildingTreeId: payload.buildingTreeId,
                buildingName: payload.buildingName,
                buildingId: payload.buildingId
            }
        },
        cleanLocation(state) {
            return {
                ...state,
                latitude: '',
                longitude: '',
                cityList: [],
                cityCode: null,
                cityName: null,
            }
        }
    },
};

export default globalModel
