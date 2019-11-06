import request from '../utils/request'
import {Location} from 'react-native-baidumap-sdk'
import {checkPermission} from "../utils/utils";

let locationListener = null;
const projectService = {
    buildingDetailReq: (api, buildingTreeId) => {
        return request.get(api + '/v2.0/api/buildings/details/' + buildingTreeId)
    },
    reportRuleReq: (api, buildingTreeId) => {
        return request.get(api + '/v2.0/api/buildings/treerule/' + buildingTreeId)
    },
    filesReq: (api, buildingTreeId) => {
        return request.get(api + '/v2.0/api/buildingtree/files/' + buildingTreeId)
    },
    shopsSearchReq: (api, requestData) => {
        return request.post(api + '/v2.0/api/shops/search', {body: requestData})
    },
    buildingNosReq: (api, requestData) => {
        return request.post(api + '/v2.0/api/buildings/buildingno', {body: requestData})
    },
    shopDetailReq: (api, shopId) => {
        return request.get(api + '/v2.0/api/shops/details/' + shopId)
    },
    advertisementReq: (_public, requestData) => {
        return request.post(_public + '/v2.0/api/ad/queryAdvertisings', {body: requestData})
    },
    buildingListReq: (api, requestData) => {
        return request.post(api + '/v2.0/api/buildings/list', {body: requestData})
    },
    trendReq: (_public, cityCode) => {
        return request.get(_public + '/v2.0/api/buildingcitypricetrend/query/' + cityCode)
    },
    buildingShopTotalNumberReq: (api, cityCode) => {
        return request.get(api + '/v2.0/api/buildings/querybuildingshoptotalnumber?city=' + cityCode)
    },
    recommendBuildingReq: (api, requestData) => {
        return request.post(api + '/v2.0/api/buildings/queryadbuildings', {body: requestData})
    },
    addVisitReq: (_public, requestData) => {
        return request.post(_public + '/api/ad/addVisit', {body: requestData})
    },
    cityNameReq: ({latitude, longitude}) => {
        let url = `https://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&pois=1&latest_admin=1&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`;
        return request.getPure(url)
    },
    coordinateReq: () => {
        return new Promise((async (resolve) => {
            const res = await checkPermission('location');
            if (!res) resolve();
            await Location.init();
            console.log('开始获取定位');
            locationListener = Location.addLocationListener((location) => {
                const {latitude, longitude} = location;
                Location.stop();
                console.log('定位结果', latitude, longitude);
                locationListener.remove();
                resolve({latitude, longitude})
            });
            Location.start()
        }))
    },
    cityListReq: ({levels}) => {
        return request.post(request.getUrl().api + '/api/areadefines/list', {body: {levels: levels}})
    },
    baiduTotx: (latitude, longitude) => {
        return request.getPure(`https://apis.map.qq.com/ws/coord/v1/translate?locations=${latitude},${longitude}&type=3&key=VEBBZ-WOSKI-37RGW-56BGE-ODU5Z-TUB2Z`)
    },
    shareRelationReq: (api, requestData) => {
        return request.post(api + '/api/clientapplet/wx/share/ralation', {body: requestData})
    },
    oldUsersRegisterReq: (auth, requestData) => {
        return request.post(auth + '/api/user/oldusers/register', {body: requestData})
    },
    queryAwardSaleReq: (api, requestData) => {
        return request.post(api + '/api/buildings/queryawardsale', {body: requestData})
    },
    queryFilesReq: (api, shopId) => {
        return request.get(api + '/v2.0/api/shops/files/' + shopId)
    }
};
export default projectService


// export default {
//     projectDetailReq: projectService,
//     reportRuleReq: projectService,
//     filesReq: projectService,
//     shopsSearchReq: projectService,
// }



