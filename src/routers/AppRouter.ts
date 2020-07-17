import {createStackNavigator} from 'react-navigation'
import BottomTab from './BottomTab'

// 公共页面
import TextDetail from '../pages/publicPages/textDetail'
import GroupInternal from '../businessComponents/Search/GroupInternal'
import ForgetPwd from '../pages/login/forgetPwd'

// 跳转页面
import ReportList from '../pages/workbench/report/index'
import ReportSearch from '../pages/workbench/report/reportSearch'
import BulidingSearch from '../pages/workbench/report/bulidingSearch'
import VisitInfo from '../pages/workbench/report/visitInfo'
import VisitDetail from '../pages/workbench/report/visitDetail'
import ReportSuccess from '../pages/workbench/report/reportSuccess'
import AddReport from '../pages/workbench/report/addReport'
import ReportBuilding from '../pages/workbench/report/reportBuilding'
import ReportTest from '../pages/workbench/report/reportTest'
import SingList from '../pages/workbench/singManage/index'
import SingDetail from '../pages/workbench/singManage/detail'
import SingHistory from '../pages/workbench/singManage/history'
import SingSearch from '../pages/workbench/singManage/search'
import ScanPage from '../pages/publicPages/scan'
import CustomerList from '../pages/workbench/customerManage/index'
import StationHelper from '../pages/workbench/stationHelper/index'
import Calculate from '../pages/workbench/calculate/index'
import CalculateDetail from '../pages/workbench/calculate/detail'
import Collection from '../pages/personal/collection'
import CusList from '../pages/workbench/customerManage/cusList/index'
import CusLJ from '../pages/workbench/customerManage/simpleList'
import ReCusList from '../pages/workbench/customerManage/simpleList'
import AddCustom from '../pages/workbench/customerManage/addCustom'
import StationStatistical from '../pages/workbench/stationHelper/stationStatistical'
import CusSearch from '../pages/workbench/customerManage/search'
import CustomDetail from '../pages/workbench/customerManage/customDetail/index'
import DynamicLogging from '../pages/workbench/customerManage/customDetail/weChatInfo/dynamicLogging'
import ArticleList from '../pages/workbench/article/articleList'
import PhotosPreView from '../businessComponents/photosPreView/index'
import System from '../pages/personal/system'
import BuildingDetail from '../pages/project/newBuildingDetail'
import ShopList from '../pages/project/shopList/index'
import ShopDetail from '../pages/project/shopDetail/shopDetail'
import PersonalInfo from '../pages/personal/info'
import MessageDetail from '../pages/message/detail'
import CityList from '../pages/project/cityList/cityList'
import BuildingList from '../pages/project/buildingList'
import BaiduMap from '../businessComponents/map/baiduMap'
import MapWebView from "../businessComponents/map/mapWebView"
import BuildingSearch from "../pages/project/buildingSearch/buildingSearch"
import TestComponent from "../components/testComponent/TestComponent"
import CompanyCode from '../pages/publicPages/companyCode/index'
import BusinessScanPage from '../pages/publicPages/businessScan/businessScan'
import Registration from '../pages/publicPages/agreement/registration'
import Privacy from '../pages/publicPages/agreement/privacy'
import MarketingData from '../pages/project/marketingData/MarketingData'
import XKJWebView from "../components/XKJWebView";
import SearchBuilding from "../pages/workbench/searchBuilding/searchBuilding/SearchBuilding";
import SearchResult from "../pages/workbench/searchBuilding/searchResult/SearchResult";
import WorkReport from '../pages/workbench/WorkReport'
import FollowUp from "../pages/workbench/customerManage/followUp/FollowUp";
import BuildingDetailPhotos from '@/pages/project/newBuildingDetail/components/Photos'
import CopyReport from "../pages/workbench/stationHelper/copyReport";
import Poster from '@/pages/project/poster'
import ShopListSpecial from '@/pages/project/shopListSpecial'
import BuildingTrends from '@/pages/project/buildingTrends'
import MapHouse from '@/pages/workbench/mapHouse/index'
import MapHouseHistory from '@/pages/workbench/mapHouse/history/index'
import Login from "@/pages/login";
import BusinessCard from "@/pages/personal/businessCard/Index";
import EditWeChatCode from "@/pages/personal/businessCard/editWeChatCode/EditWeChatCode";
import ChooseBuilding from "@/pages/personal/businessCard/chooseBuilding/ChooseBuilding";
import EditComponent from "@/pages/personal/businessCard/editComponent/EditComponent";
import BuildingImage from "@/pages/personal/businessCard/buildingImage/BuildingImage";
import Comment from "@/pages/personal/businessCard/comment/Comment";
import EditUserDescribe from "@/pages/personal/businessCard/editUserDescribe/EditUserDescribe";
import ChooseShop from "@/pages/personal/businessCard/chooseShop/ChooseShop";
import DetailComment from "@/pages/personal/businessCard/detailComment/DetailComment";
import SearchCardBuilding from "@/pages/personal/businessCard/searchCardBuilding/searchCardBuilding";

const MainStack = createStackNavigator({
  // 底部导航
  BottomTabNav: {
    screen: BottomTab
  },
  groupInternal: {
    screen: GroupInternal
  },
  // 个人中心到忘记密码页面
  personalForgetPwd: {
    screen: ForgetPwd
  },
  // 报备列表
  reportList: {
    screen: ReportList,
  },
  stationStatistical: {
    screen: StationStatistical
  },
  // 报备搜索
  reportSearch: {
    screen: ReportSearch,
  },
  // 楼盘搜索
  bulidingSearch: {
    screen: BulidingSearch,
  },
  // 录入到访信息
  visitInfo: {
    screen: VisitInfo
  },
  // 到访详情
  visitDetail: {
    screen: VisitDetail
  },
  // 报备成功
  reportSuccess: {
    screen: ReportSuccess
  },
  // 新增报备
  addReport: {
    screen: AddReport
  },
  // 报备楼盘列表
  reportBuilding: {
    screen: ReportBuilding
  },
  // 测试页面
  reportTest: {
    screen: ReportTest
  },
  // 签约列表
  singList: {
    screen: SingList
  },
  // 签约详情
  singDetail: {
    screen: SingDetail
  },
  // 签约搜索
  singSearch: {
    screen: SingSearch
  },
  singHistory: {
    screen: SingHistory
  },
  customerList: {
    screen: CustomerList
  },
  stationHelper: {
    screen: StationHelper
  },
  calculate: {
    screen: Calculate
  },
  calculateDetail: {
    screen: CalculateDetail
  },
  collection: {
    screen: Collection
  },
  articleList: {
    screen: ArticleList
  },
  photosPreView: {
    screen: PhotosPreView
  },
  addCustom: {
    screen: AddCustom
  },
  customDetail: {
    screen: CustomDetail
  },
  scanPage: {
    screen: ScanPage
  },
  buildingDetail: {
    screen: BuildingDetail
  },
  shopDetail: {
    screen: ShopDetail
  },
  // 系统设置页面
  system: {
    screen: System
  },
  // 个人信息页面
  personalInfo: {
    screen: PersonalInfo
  },
  // 消息详情
  messageDetail: {
    screen: MessageDetail
  },
  //微信动态
  dynamicLogging: {
    screen: DynamicLogging
  },
  cityList: {
    screen: CityList
  },
  cusList: {
    screen: CusList
  },
  reCusList: {
    screen: ReCusList
  },
  // 客户选择
  cusLJ: {
    screen: CusLJ
  },
  // 客户搜索
  cusSearch: {
    screen: CusSearch
  },
  shopList: {
    screen: ShopList
  },
  buildingList: {
    screen: BuildingList
  },
  baiduMap: {
    screen: BaiduMap
  },
  mapWebView: {
    screen: MapWebView
  },
  buildingSearch: {
    screen: BuildingSearch
  },
  testComponent: {
    screen: TestComponent
  },
  // 公司二维码
  companyCode: {
    screen: CompanyCode
  },
  businessScanPage: {
    screen: BusinessScanPage
  },
  // 铺侦探平台注册服务协议
  registration: {
    screen: Registration
  },
  // 铺侦探平台隐私服务协议
  privacy: {
    screen: Privacy
  },
  marketingData: {
    screen: MarketingData
  },
  xkjWebView: {
    screen: XKJWebView
  },
  searchBuilding: {
    screen: SearchBuilding
  },
  workReport: {
    screen: WorkReport,
  },
  searchResult: {
    screen: SearchResult,
  },
  followUp: {
    screen: FollowUp
  },
  textDetail: {
    screen: TextDetail
  },
  // 房源 -> 楼盘详情 -> 楼盘相册
  buildingDetailPhotos: {
    screen: BuildingDetailPhotos,
  },
  //复制报备
  copyReport: {
    screen: CopyReport,
  },
  // 铺优选
  shopListSpecial: {
    screen: ShopListSpecial
  },
  // 项目动态
  buildingTrends: {
    screen: BuildingTrends
  },
  // 地图找铺
  mapHouse: {
    screen: MapHouse
  },// 地图找铺 搜索历史
  mapHouseHistory: {
    screen: MapHouseHistory
  },
  businessCard: {
    screen: BusinessCard
  },
  editWeChatCode: {
    screen: EditWeChatCode
  },
  editUserDescribe: {
    screen: EditUserDescribe
  },
  chooseBuilding: {
    screen: ChooseBuilding
  },
  editComponent: {
    screen: EditComponent
  },
  buildingImage: {
    screen: BuildingImage
  },
  comment: {
    screen: Comment
  },
  chooseShop: {
    screen: ChooseShop
  },
  detailComment: {
    screen: DetailComment
  },
  SearchCardBuilding: {
    screen: SearchCardBuilding
  },
  login: {
    screen: Login,
    navigationOptions: () => ({header: null})
  },
}, {
  // 快速定制导航条，所以这里会将全部的导航置空
  defaultNavigationOptions: () => ({
    header: null,
    gesturesEnabled: true
  }),
});

/**
 * 路由拦截，未登录则跳转登录页面
 */
const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {

  const needLoginRouteName = ['collection', 'customerService', 'system', 'businessCard'];
  //@ts-ignore
  let {user} = global.store.getState();
  if (user.status === 404 && "routeName" in action && needLoginRouteName.includes(action.routeName)) {
    const routes = [
      ...state.routes,
      {key: 'id-' + Date.now(), routeName: 'login', params: {}},
    ];
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return defaultGetStateForAction(action, state);
};

const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  // 海报分享
  poster: {
    screen: Poster,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  transparentCard: true,
  cardOverlayEnabled: true,
  transitionConfig: () => ({
    screenInterpolator: () => null,
    transitionSpec: {duration: 0},
  }),
  defaultNavigationOptions: () => ({
    gesturesEnabled: false,
  })
})

export default RootStack
