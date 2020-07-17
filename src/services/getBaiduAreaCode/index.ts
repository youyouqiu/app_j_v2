/**
 * Created by Kary on 2020/05/27 14:23.
 */
import request from '../../utils/request';

export const getBaiduAreaCode = function (city: string, address: string) {
  return request.getPure(`http://api.map.baidu.com/geocoding/v3/?city=${city}&address=${address}&output=json&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`)
};