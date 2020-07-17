import {Model} from 'dva'
import locationApi from '../services/location'
import BuryPoint from '../utils/BuryPoint'
import projectService from "../services/projectService";

export default <Model>{
    namespace: 'location',

  state: {
    locationCityName:'',//定位失败时为空，成功时赋值给conversionName   对应的值一定会是定位的城市code
    locationCityCode:'',//定位失败时为空，成功时赋值给conversionCode   对应的值一定会是定位的城市code
    conversionName: '重庆',
    conversionCode: '500000',
    cityList: [],
    status: 'error'
  },

  effects: {
    *getLocationInfo(_, { put, call }) {
      try {
        const coordinate = yield locationApi.fetchCoordinate();
        BuryPoint.setLogBodyData(coordinate);
        let location = yield locationApi.fetchLocationInfo(coordinate)
        let locationInfo = location.result;
        const res = yield call(projectService.cityListReq, {levels: [1]});
        const cityList = res.extension;
        const {city} = locationInfo.addressComponent;
        const { lng, lat } = locationInfo.location;
        let currentCity = cityList.find((x: any) => x.name === city.substr(0, city.length - 1));
        locationInfo = {
          ...locationInfo,
          conversionCode: currentCity ? currentCity.code : '500000',
          conversionName: currentCity ? currentCity.name : '重庆',
          locationCityCode: currentCity ? currentCity.code : '',
          locationCityName: currentCity ? currentCity.name : '',
          cityList,
          status: 'success'
        }
        yield put({ type: 'getLocationSuccess', payload: locationInfo })
        yield put({ type: 'weather/getWeather', payload: `${lng},${lat}` })
        yield put({ type: 'global/saveCoordinateAndCityName', payload: {
          latitude: lat,
          longitude: lng,
          cityName: locationInfo.conversionName,
          cityCode: locationInfo.conversionCode,
          cityList
        } })
      } catch (e) {
        console.log('getLocationInfo error:', e)
        // TODO
      }
    },
    *getCityList(_, {put, call}) {
        const res = yield call(projectService.cityListReq, {levels: [1]});
        yield put({type: 'saveCityList', payload: res.extension})
    }
  },
  reducers: {
    getLocationSuccess: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    saveCityList: (state, {payload}) => ({
        ...state,
        cityList: payload
    })
  },

}
