import { Model } from 'dva'
import weatherApi from '../services/weather'

export default <Model>{
  namespace: 'weather',

  state: null,

  effects: {
    *getWeather({ payload }, { call, put }) {
      try {
        const { HeWeather6 } = yield call(weatherApi.fetchWeather, payload)
        yield put({ type: 'getWeatherSuccess', payload: HeWeather6[0] })
      } catch (e) {
        console.log(e)
      }
    },
  },

  reducers: {
    getWeatherSuccess: (_, { payload }) => ({
      ...payload
    }),
  },
}
