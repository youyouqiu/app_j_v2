import request from '../utils/request'
import qs from 'qs'

const key = '305116012f444850890f3c89c9d45978'

export default {
  fetchWeather: (location: string): Promise<WeatherResponse> => {
    const params = {
      location,
      key: key,
    }
    const url = `https://free-api.heweather.net/s6/weather/now?${qs.stringify(params)}`
    return request.getPure(url)
  },
}

export interface WeatherResponse {

}
