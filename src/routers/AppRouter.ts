import {
    createStackNavigator,
    NavigationRouteConfigMap,
    StackNavigatorConfig
} from 'react-navigation'
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
import BuildingDetail from '../pages/project/buildingDetail'
import ShopList from '../pages/project/shopList/shopList'
import ShopDetail from '../pages/project/shopDetail/shopDetail'
import PersonalInfo from '../pages/personal/info'
import MessageDetail from '../pages/message/detail'
import CityList from '../pages/project/cityList/cityList'
import BuildingList from "../pages/project/buildingList/buildingList"
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
import BuildingDetailPhotos from '../pages/project/buildingDetail/Photos'

const routeConfigMap: NavigationRouteConfigMap = {
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
    followUp:{
        screen:FollowUp
    },
    textDetail: {
        screen: TextDetail
    },
    // 房源 -> 楼盘详情 -> 楼盘相册
    buildingDetailPhotos: {
        screen: BuildingDetailPhotos,
    }
}

const stackConfig: StackNavigatorConfig = {
    // 快速定制导航条，所以这里会将全部的导航置空
    defaultNavigationOptions: () => ({
        header: null,
        gesturesEnabled: true
    }),
    // headerMode: 'screen',
    // transitionConfig: iOS
    //     ? dynamicModalTransition
    //     : () => ({
    //         screenInterpolator: StackViewStyleInterpolator.forHorizontal
    //     }),
    // transitionConfig: iOS ? dynamicModalTransition : StackViewStyleInterpolator.forHorizontal,
    // cardOverlayEnabled: true
    // transparentCard: true,
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    // mode: 'modal'
    // initialRouteName:'customerList'
}

export default createStackNavigator(routeConfigMap, stackConfig)
