/**
 * @author: zxs
 * @date: 2020/6/12
 */
import request from "@/utils/request";

const businessCardService = {
  getWeChatCode: () => {
    return request.get(request.getUrl().api + '/api/card/wechat')
  },
  saveWeChatCode: (iconUrl: string) => {
    return request.post(request.getUrl().api + '/api/card/wechat/save', {body: iconUrl})
  },
  getUserDescribe: () => {
    return request.get(request.getUrl().api + '/api/card/describe')
  },
  saveUserDescribe: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/describe/save', {body: requestData})
  },
  getBuildingGroupTypes: (cityCode: string) => {
    return request.get(request.getUrl().api + '/api/card/buildingtree/group/number?city=' + cityCode)
  },
  getShopGroupTypes: (cityCode: string) => {
    return request.get(request.getUrl().api + '/api/card/shop/group/number?city=' + cityCode)
  },
  getBuildingByGroupType: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/buildingtree/group/list', {body: requestData})
  },
  getShopByGroupType: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/shop/group/list', {body: requestData})
  },
  saveSelectedBuilding: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/buildingtree/select/save', {body: requestData})
  },
  saveSelectedShop: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/shop/select/save', {body: requestData})
  },
  getSelectedBuilding: () => {
    return request.get(request.getUrl().api + '/api/card/buildingtree')
  },
  getSelectedShop: () => {
    return request.get(request.getUrl().api + '/api/card/shop')
  },
  deleteSelectedBuilding: (buildingTreeId: string) => {
    return request.delete(request.getUrl().api + '/api/card/focus?id=' + buildingTreeId)
  },
  getEditDetail: ({id, type}: any) => {
    if (type === 'shop') {
      return request.get(request.getUrl().api + '/api/card/shop/detail?id=' + id)
    } else {
      return request.get(request.getUrl().api + '/api/card/buildingtree/detail?id=' + id)
    }
  },
  saveDetailName: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/name/save', {body: requestData})
  },
  getBuildingEvaluate: (buildingTreeId: string) => {
    return request.get(request.getUrl().api + '/api/card/evaluate?buildingTreeId=' + buildingTreeId)
  },
  saveDetailEvaluate: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/evaluate/save', {body: requestData})
  },
  saveDetailImage: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/image/save', {body: requestData})
  },
  getDetailImages: (id: string) => {
    return request.get(request.getUrl().api + '/api/card/image?id=' + id)
  },
  getShareImage: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/card/broker/image ')
  },
};

export default businessCardService
