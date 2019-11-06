import { Location } from 'react-native-baidumap-sdk'
import request from '../utils/request'
import qs from 'qs'

const key = 'BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI'

export default {
  // 获取经纬度（BD09）
  fetchCoordinate: (): Promise<Coordinate> => {
    return new Promise((resolve, reject) => {
      Location.init()
        .then(() => {
          Location.addLocationListener(listener => {
            const { latitude, longitude } = listener
            Location.stop()
            // 安卓定位失败反悔的经纬度为java最小数
            if (latitude === 5e-324) {
              reject(new Error('invalid location'))
            }
            resolve({ latitude, longitude })
          })
          Location.start()
        }).catch(e => {
          reject(new Error(e.message))
        })
    })
  },
  // 经纬度 -> 地址信息
  fetchLocationInfo: (coordinate: Coordinate): Promise<GeocoderResponse> => {
    const params = {
      location: `${coordinate.latitude},${coordinate.longitude}`,
      output: 'json',
      pois: 1,
      latest_admin: 1,
      ak: key,
    }
    const url = `https://api.map.baidu.com/geocoder/v2/?${qs.stringify(params)}`
    return request.getPure(url)
  },
}

export type Coordinate = {
  latitude: number
  longitude: number
}
export interface GeocoderResponse {

}
