import request from '@/utils/request'
import {Location} from 'react-native-baidumap-sdk'
import {checkPermission} from "@/utils/utils";
import {ResponseCommon} from '../typings/types'
import {
    IProjectDetail,
    IResident,
    IFollowState,
    IReportRules,
    IMainShopItem,
    IDynamicItem,
    ICollectRequest,
    IHostListRequest,
    IDynamicRequest,
    ISellStatisticsRequest,
    ISellStatisticsItem,
    IAddResidentRequest,
    IBuildingTreeFiles,
    IAibdtEbtrance
} from '../typings/project'
import {IBuildingPreview} from '../building/buildingList'

let locationListener: any = null;
const projectService = {
  buildingDetailReq: (buildingTreeId: string) => {
    return request.get(request.getUrl().api + '/v2.0/api/buildingtree/querybuildingtreedetail/' + buildingTreeId)
  },
  reportRuleReq: (buildingTreeId: string) => {
    return request.get(request.getUrl().api + '/v2.0/api/buildings/treerule/' + buildingTreeId)
  },
  filesReq: (api: string, buildingTreeId: string) => {
    return request.get(api + '/v2.0/api/buildingtree/files/' + buildingTreeId)
  },
  getSigningList: (city: string) => {
    return request.get(request.getUrl().api + '/v2.0/api/signing/month/curr/' + city)
  },
  getShareData: (requestData: any) => {
    return request.post(request.getUrl().api + '/v2.0/api/buildingtree/poster/brokers/share/query', {body: requestData})
  },
  buildingHasPoster: (requestData: any) => {
    return request.post(request.getUrl().api + '/v2.0/api/buildingtree/querybuildingtreeposter', {body: requestData})
  },
  addShareAvatar: (requestData: any) => {
    return request.post(request.getUrl().api + '/v2.0/api/buildingtree/poster/brokers/share', {body: requestData})
  },
  shopsSearchReq: (requestData: any) => {
    return request.post(request.getUrl().api + '/v2.0/api/shops/search', {body: requestData})
  },
  buildingNoListReq: (requestData: any) => {
    return request.post(request.getUrl().api + '/v2/api/buildingno/list', { body: requestData })
    // return request.post(request.getUrl().api + '/v2/api/buildingno/sell/statistics', {body: requestData})
  },
  shopDetailReq: (api: string, shopId: string) => {
    return request.get(api + '/v2.0/api/shops/getshopdetail/' + shopId)
  },
  advertisementReq: (_public: string, requestData: any) => {
    return request.post(_public + '/v2.0/api/ad/queryAdvertisings', {body: requestData})
  },
  buildingListReq: (api: string, requestData: any) => {
    return request.post(api + '/v2.0/api/buildings/list', {body: requestData})
  },
  trendReq: (cityCode: string) => {
    return request.get(request.getUrl().public + '/v2.0/api/buildingcitypricetrend/query/' + cityCode)
  },
  buildingShopTotalNumberReq: (cityCode: string) => {
    return request.get(request.getUrl().api + '/v2.0/api/buildings/querybuildingshoptotalnumber?city=' + cityCode)
  },
  recommendBuildingReq: (api: string, requestData: any) => {
    return request.post(api + '/v2.0/api/buildings/queryadbuildings', {body: requestData})
  },
  addVisitReq: (_public: string, requestData: any) => {
    return request.post(_public + '/api/ad/addVisit', {body: requestData})
  },
  cityNameReq: ({latitude, longitude}: { latitude: string, longitude: string }) => {
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
  cityListReq: ({levels}: { levels: any }) => {
    return request.post(request.getUrl().api + '/api/areadefines/list', {body: {levels: levels}})
  },
  baiduTotx: (latitude: string, longitude: string) => {
    return request.getPure(`https://apis.map.qq.com/ws/coord/v1/translate?locations=${latitude},${longitude}&type=3&key=VEBBZ-WOSKI-37RGW-56BGE-ODU5Z-TUB2Z`)
  },
  shareRelationReq: (api: string, requestData: any) => {
    return request.post(api + '/api/clientapplet/wx/share/ralation', {body: requestData})
  },
  oldUsersRegisterReq: (auth: string, requestData: any) => {
    return request.post(auth + '/api/user/oldusers/register', {body: requestData})
  },
  queryAwardSaleReq: (requestData: any) => {
    return request.post(request.getUrl().api + '/api/buildings/queryawardsale', { body: requestData })
  },
  queryFilesReq: (shopId: string) => {
    return request.get(request.getUrl().api + '/v2.0/api/shops/files/' + shopId)
  },
  getBuildingDetail: (treeId: string): Promise<ResponseCommon<IProjectDetail>> => {
    return request.get(`${request.getUrl().api}/v2/api/buildingtree/detail?treeid=${treeId}`)
  },
  getBuildingResident: (treeId: string): Promise<ResponseCommon<IResident[]>> => {
    return request.get(`${request.getUrl().api}/v2/api/buildingtree/resident/list?treeid=${treeId}`)
  },
  getBuildingFollow: (treeId: string): Promise<ResponseCommon<IFollowState>> => {
    return request.get(`${request.getUrl().api}/v2/api/buildingtree/follow/state?treeid=${treeId}`)
  },
  setBuildingFollowReport: (isNotify: boolean, treeId: string): Promise<ResponseCommon<IFollowState>> => {
    const body = {
      buildingTreeIds: [treeId]
    }
    return request.post(`${request.getUrl().api}/v2/api/customer/sellstart/${isNotify ? 'notify' : 'cancelnotify'}`, {body})
  },
  getProjectReportRule: (treeId: string): Promise<ResponseCommon<IReportRules>> => {
    return request.get(`${request.getUrl().api}/v2/api/buildings/treerule?treeid=${treeId}`)
  },
  getProjectMainShops: (treeId: string): Promise<ResponseCommon<IMainShopItem[]>> => {
    return request.get(`${request.getUrl().api}/v2/api/shops/main/list?treeid=${treeId}`)
  },
  getProjectDynamicList: (body: IDynamicRequest): Promise<ResponseCommon<IDynamicItem[]>> => {
    return request.post(`${request.getUrl().api}/v2/api/buildingtree/dynamic/list`, {body: body})
  },
  setBuildingFollowDymic: (isSubscribe: boolean, treeId: string): Promise<ResponseCommon<IFollowState>> => {
    const body = {
      buildingTreeIds: [treeId]
    }
    return request.post(`${request.getUrl().api}/v2/api/customer/dynamic/${isSubscribe ? 'subscribe' : 'unsubscribe'}`, {body})
  },
  getProjectHotlist: (body: IHostListRequest): Promise<ResponseCommon<IBuildingPreview[]>> => {
    return request.post(`${request.getUrl().api}/v2/api/building/hotlist`, {body})
  },
  collectBuilding: (isFavorite: boolean, body: ICollectRequest): Promise<ResponseCommon<null>> => {
    return request.post(`${request.getUrl().api}/v2/api/customer/favorite${isFavorite ? '' : '/cancel'}`, {body})
  },
  setBuildingSellStatis: (body: ISellStatisticsRequest): Promise<ResponseCommon<ISellStatisticsItem[]>> => {
    return request.post(`${request.getUrl().api}/v2/api/buildingno/sell/statistics`, {body})
  },
  getFeatureShop: (cityCode: string) => {
    return request.get(request.getUrl().api + '/v2/api/home/feature/shop?cityCode=' + cityCode)
  },
  advertisementReqOld: (requestData: any) => {
    return request.post(request.getUrl().public + '/api/ad/queryAdvertisings', {body: requestData})
  },
  shopDetailNewReq: (shopId: string) => {
    return request.get(request.getUrl().api + '/v2/api/shops/detail?shopsId=' + shopId)
  },
  buildingResidentReq: (treeId: string) => {
    return request.get(request.getUrl().api + '/v2/api/buildingtree/resident/list?treeId=' + treeId)
  },
  addResidentQuiry: (body: IAddResidentRequest) => {
    return request.post(`${request.getUrl().api}/v2/api/building/resident/inquiry/add`, {body})
  },
  getBuildingFloorList: (body: any) => {
    return request.post(`${request.getUrl().api}/v2/api/floor/list`, {body})
  },
  getBuildingShopList: (body: any) => {
    return request.post(`${request.getUrl().api}/v2/api/pincontrol/list`, {body})
  },
  getbuildingTreeFiles: (treeId: string): Promise<ResponseCommon<IBuildingTreeFiles>> => {
    return request.get(request.getUrl().api + '/v2/api/buildingtree/files?treeId=' + treeId)
  },
  getAibdtEbtrance: (buildId: string, city: string, district: string): Promise<ResponseCommon<IAibdtEbtrance>> => {
    return request.get(request.getUrl().api + `/api/massivedata/buildingtree/entrance?buildingid=${buildId}&city=${city}&district=${district}`)
  },
  getSaleControl: (buildTreeId: string): Promise<ResponseCommon<boolean>> => {
    return request.get(request.getUrl().api + `/v2/api/shops/sellchart/exist?buildingTreeId=${buildTreeId}`)
  },
  getPosterIds: (requestData: Array<string>) => {
    return request.post(request.getUrl().api + 'v2.0/api/buildingtree/querybuildingtreeposter', {body: requestData})
  },
  getBusinessCardInfo: ({buildingTreeId}:any) => {
    console.log('getBusinessCardInfo',buildingTreeId);
    return request.get(request.getUrl().api + '/api/card/buidlingtree/exist?type=1&buildingTreeId=' + buildingTreeId)
  }
};

export default projectService
