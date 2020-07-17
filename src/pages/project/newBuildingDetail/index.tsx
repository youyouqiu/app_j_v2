import React, {PureComponent, RefObject} from 'react'
import {
  View,
  Text,
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Easing,
  ImageBackground,
  StatusBar,
  DeviceEventEmitter,
  Modal
} from 'react-native'
import {NavigationScreenProps} from 'react-navigation'
import style from './style'
import HeaderInfo from './components/headerInfo'
import ProjectManager from './components/projectManager'
import ProjectInfo from './components/projectInfo'
import FeaturedList from './components/featuredList'
import ProjectNews from './components/projectNews'
import ProjectBdt from './components/projectBdt'
import ProjectDesc from './components/projectDesc'
import ProjectFacility from './components/projectFacility'
import ProjectLookList from './components/projectLookList'
import {Line} from '@/components/new-space'
import {scaleSize} from '@/utils/screenUtil'
import WeChatButton from '@/businessComponents/wechatShare/weChatButton'
import BuryingPoint, {BehaviorLog} from '@/utils/BuryPoint'
import projectService from '@/services/projectService'
import {IProjectDetail, IResident, IFollowState, IMainShopItem, IDynamicItem, IFiltItem, IBuildingTreeFiles, IAibdtEbtrance} from '@/services/typings/project'
import {IBuildingPreview} from '@/services/building/buildingList'
import {verifyUser, debounceLast, logout} from '@/utils/utils'
import {Toast, Overlay} from '@new-space/teaset'
import {connect, DispatchProp} from 'react-redux'
import {ConnectState, UserModelState, IPointState} from '@/models/connect';
import storage from '@/utils/storage'
import {STORAGE_KEY} from '@/constants/index'
// @ts-ignore
import Theme from '@new-space/teaset/themes/Theme'
import {wxApi} from '@/utils/wxUtils'
import ReportRule from "@/pages/project/shopDetail/components/reportRule";
import {IReportOtherInfoType, IReportRuleTypes} from "@/pages/project/shopDetail/types/ReportRuleTypes";
import {SwitchView} from "@/components/new-space";
import reportRuleFormat from "@/pages/project/shopDetail/formatUtil/ReportRuleFormat";
import Footer from "@/pages/project/newBuildingDetail/components/footer/footer";
import businessCardService from "@/services/businessCardService/businessCardService";
import navigation from "@/utils/navigation";
import {BusinessCardModalStateType, SelectedBuildingsType} from "@/models/businessCard/types";

const SwitchViewItem = SwitchView.Item;

interface IBuildDetailProps extends NavigationScreenProps {
  user: UserModelState,
  point: IPointState,
  config: any
}

interface IBuildDetailState {
  tabs: Array<{ label: string, key: string }>
  headerOpacity1: Animated.Value
  headerOpacity0: Animated.Value
  sharePosition: Animated.Value
  buildingTreeId: string
  buildingDetail?: IProjectDetail
  marketingList?: IFiltItem[]
  residentList?: IResident[]
  followStatus?: IFollowState
  reportRules: Array<IReportRuleTypes>
  mainShopList?: IMainShopItem[]
  dynamicList?: IDynamicItem[]
  hotlist?: IBuildingPreview[]
  visible: boolean
  kptx: boolean
  xmdt: boolean
  saleControl: boolean
  activeTabKey: string
  filesInfo?: IBuildingTreeFiles,
  reportOtherInfo?: IReportOtherInfoType,
  aibdtEbtrance?: IAibdtEbtrance
  selectedBuildings: SelectedBuildingsType,
  businessCardModalVisible: boolean,
  businessCardModalTips: string,
  businessCardModalConfirmText: string
  posterId: any[]
  showInitModal: boolean
  initModalStatus: number
}

class BuildingDetail extends PureComponent<IBuildDetailProps & DispatchProp, IBuildDetailState> {

  private overlayDyBBPopView: any
  private overlayDyDTPopView: any
  private isScroll = false
  private scrollRef: RefObject<any>
  private layouts: { [key: string]: number } = {}
  private baseHeight: number

  constructor(props: IBuildDetailProps & DispatchProp) {
    super(props)
    this.scrollRef = React.createRef()
    this.baseHeight = Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(96)
    this.state = {
      headerOpacity1: new Animated.Value(1),
      headerOpacity0: new Animated.Value(0),
      sharePosition: new Animated.Value(scaleSize(32)),
      tabs: [
        {label: '基本信息', key: 'jbxx'},
        {label: '项目经理', key: 'xmjl'},
        {label: '项目信息', key: 'xmxx'},
        {label: '销售规则', key: 'xsgz'},
        {label: '主推', key: 'zt'},
        {label: '基础设施', key: 'jcss'},
        {label: '项目动态', key: 'xmdt'},
        // {label: '项目简介', key: 'xmjj'},
        {label: '楼盘推荐', key: 'lptj'},
      ],
      aibdtEbtrance: undefined,
      buildingDetail: undefined,
      followStatus: undefined,
      residentList: [],
      mainShopList: [],
      visible: false,
      activeTabKey: 'jbxx',
      dynamicList: [],
      reportRules: [],
      hotlist: [],
      showInitModal: false,
      initModalStatus: 0,
      buildingTreeId: props.navigation?.state?.params?.buildingTreeId,
      filesInfo: {},
      marketingList: [],
      // 这个只在第一次的收藏时候出现，并且都是默认选中，所以都使用true的默认值
      kptx: true,
      xmdt: true,
      posterId: [],
      saleControl: false,
      selectedBuildings: {} as SelectedBuildingsType,
      businessCardModalVisible: false,
      businessCardModalTips: '',
      businessCardModalConfirmText: '确定'
    }
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.businessCard?.selectedBuildings !== prevState.selectedBuildings) {
      console.log('getDerivedStateFromProps', nextProps.businessCard?.selectedBuildings);
      return {
        ...prevState,
        selectedBuildings: nextProps?.businessCard?.selectedBuildings
      }
    }
  };

  common = {
    hasRule: false
  };

  componentDidMount() {
    this.getIsFirst()
    this.getProjectDetail() // 获取楼盘基本详情
    this.getProjectResident() // 获取楼盘项目经理
    this.getProjectFollow() // 获取楼盘点击关注，订阅等信息
    this.getProjectReportRule() // 获取报备规则
    this.getProjectTreeFiles() // 获取报备规则
    this.getProjectMainShops() // 获取楼盘主推商铺列表
    this.getProjectDynamicList() // 获取楼盘主推商铺列表
    this.getProjectHotlist() // 看过此楼盘的人也看过
    this.buryingPoint()
    this.getQueryAwardSale() // 获取销讲资料
    this.getSaleControl() // 获取销控图纸是否存在
    this.getIsHavePoster()
    const {user} = this.props
    if (user.status !== 404) {
      this.getSelectedBuildings()
    }
    storage.remove(STORAGE_KEY.COLLECT_PROJECT_IDS)
  }

  getIsFirst = async () => {
    try {
      let res = await storage.get(STORAGE_KEY.PROJECT_INIT)
      if (res === 1) {
      } else {
        storage.set(STORAGE_KEY.PROJECT_INIT, 1)
        this.setState({
          showInitModal: true
        })
      }
    } catch (e) {
      this.setState({
        showInitModal: true
      })
      storage.set(STORAGE_KEY.PROJECT_INIT, 1)
    }
  }

  getIsHavePoster = async () => {
    const {buildingTreeId} = this.state;
    try {
      let res = await projectService.buildingHasPoster([buildingTreeId])
      if (res && res.code === '0') {
        this.setState({
          posterId: res?.extension[0]?.posterId || []
        })
      }
    } catch (e) {

    }
  }

  getSaleControl = async () => {
    const {buildingTreeId} = this.state;
    const response = await projectService.getSaleControl(buildingTreeId);
    this.setState({
      saleControl: response.extension,
    })
  }

  getQueryAwardSale = async () => {
    const {buildingTreeId} = this.state;
    const requestData = {
      buildingTreeId,
      status: 8
    };
    const response = await projectService.queryAwardSaleReq(requestData);
    this.setState({
      marketingList: response.extension,
    })
  };

  isCanReport = () => {

    if (!this.common.hasRule) {
      Toast.message('此楼盘未生成报备规则');
      return false
    }
    const {buildingDetail} = this.state
    const userCityCode = this.props.user?.userInfo?.city || '';
    const basicInfo = buildingDetail?.basicInfo;
    if (!userCityCode || !basicInfo?.city || userCityCode !== basicInfo?.city) {
      Toast.message('无法报备其他城市楼盘')
      return false
    }
    return true
  };

  getSelectedBuildings = async () => {
    this.props.dispatch({
      type: 'businessCard/businessCardSelectedBuildings',
      payload: this.state.buildingTreeId
    });
  };

  getProjectTreeFiles = async () => {
    let {buildingTreeId} = this.state
    try {
      let res = await projectService.getbuildingTreeFiles(buildingTreeId)
      this.setState({
        filesInfo: res.extension
      })
    } catch (e) {
    }
  }

  getProjectHotlist = async () => {
    let {buildingTreeId} = this.state
    const body = {
      treeId: buildingTreeId,
      pageIndex: 0,
      pageSize: 10
    }
    try {
      let res = await projectService.getProjectHotlist(body)
      this.setState({
        hotlist: res.extension || []
      })
    } catch (e) {
    }
  }

  getProjectDynamicList = async () => {
    let {buildingTreeId} = this.state
    try {
      let body = {
        pageIndex: 0,
        pageSize: 999,
        buildingTreeId
      }
      let res = await projectService.getProjectDynamicList(body)
      this.setState({
        dynamicList: res.extension || []
      })
    } catch (e) {
    }
  }

  /**报备规则*/
  getProjectReportRule = async () => {
    const {buildingTreeId} = this.state;
    const response = await projectService.reportRuleReq(buildingTreeId);
    if (response.code === '0') {
      const reportRules = reportRuleFormat(response.extension);
      this.setState({reportRules});
      reportRules && (this.common.hasRule = true);
    }
  };

  getProjectMainShops = async () => {
    let {buildingTreeId} = this.state
    try {
      let res = await projectService.getProjectMainShops(buildingTreeId)
      this.setState({
        mainShopList: res.extension || []
      })
    } catch (e) {
    }
  }

  getProjectFollow = async () => {
    if (!this.props.user?.userInfo?.id) return;
    let {buildingTreeId} = this.state
    try {
      let res = await projectService.getBuildingFollow(buildingTreeId)
      this.setState({
        followStatus: res.extension
      })
    } catch (e) {
    }
  }

  getProjectResident = async () => {
    let {buildingTreeId} = this.state
    try {
      let res = await projectService.getBuildingResident(buildingTreeId)
      this.setState({
        residentList: res.extension || []
      })
    } catch (e) {
      console.log(e, 'eee')
    }
  }

  getProjectDetail = async () => {
    let {buildingTreeId} = this.state
    try {
      let res = await projectService.getBuildingDetail(buildingTreeId);
      if (res.code === '0') {
        const reportOtherInfo: IReportOtherInfoType = {
          caseSystem: res.extension.caseSystem || '',
          lookProcess: res.extension.lookProcess || '',
          moneyProgramme: res.extension.moneyProgramme || '',
        };
        this.getAibdtEbtrance(res.extension)
        this.setState({
          buildingDetail: res.extension,
          reportOtherInfo
        })
      }
    } catch (e) {
      console.log(e)
    }
  };

  getAibdtEbtrance = async (reportOtherInfo: IProjectDetail) => {
    if (!reportOtherInfo.buildingId) {
      return
    }
    let res = await projectService.getAibdtEbtrance(reportOtherInfo.buildingId, reportOtherInfo.basicInfo?.cityName || '', reportOtherInfo.basicInfo?.districtName || '');
    this.setState({
      aibdtEbtrance: res.extension,
    })
  }

  buryingPoint = () => {
    const params = {
      page: '楼盘详情页',
      target: '页面',
      action: 'view',
      action_param: {
        id: this.state.buildingTreeId,
      }
    } as BehaviorLog;
    BuryingPoint.add(params)
  }

  goBack = () => {
    this.props.navigation.goBack()
    DeviceEventEmitter.emit('buildingDetailBack')
  }

  collect = async (isFavorite: boolean) => {
    this.buryPoint('收藏_button')
    const {buildingTreeId, followStatus} = this.state
    let body = {
      buildingTreeIds: [buildingTreeId]
    }
    try {
      let res = await projectService.collectBuilding(isFavorite, body)
      if (res.code === '0') {
        this.setState({
          followStatus: {
            ...followStatus,
            isFavorite: !followStatus?.isFavorite
          } as IFollowState
        })
      }
      if (isFavorite) {
        try {
          let faStorage = await storage.get(STORAGE_KEY.COLLECT_PROJECT_IDS)
          if (faStorage[buildingTreeId]) {
            return
          }
          await storage.set(STORAGE_KEY.COLLECT_PROJECT_IDS, {...faStorage, buildingTreeId: true})
        } catch (e) {
          this.setSelectModal(true)
          await storage.set(STORAGE_KEY.COLLECT_PROJECT_IDS, {buildingTreeId: true})
        } finally {
        }
      }
    } catch (e) {
    }
  }

  onPressDyBB = async (isNotify: boolean, showModal: boolean = false) => {
    const {buildingTreeId, followStatus} = this.state
    try {
      if (!isNotify && showModal) { // 取消订阅，并且需要展示取消订阅弹出框的时候
        let overlayView = (
          <Overlay.PopView
            ref={v => this.overlayDyBBPopView = v}
            style={[style['alignCenter'], style['justifyCenter']]}
            modal={true}
          >
            <View style={[style['justifyCenter'], style['alignCenter'], style['dyOverlay']]}>
              <ImageBackground style={[style['qxdyBg']]} source={require('@/images/pictures/qxdyBackImg.png')}>
                <Image style={[style['bells']]} source={require('@/images/icons/project/bells.png')}/>
                <Text style={[style['font-32'], style['whiteText']]}>取消报备通知</Text>
              </ImageBackground>
              <View style={[style['dyOverlayContent'], style['flexCloum'], style['alignCenter'], style['justifyBetween']]}>
                <View style={[style['dyOverlayContentText']]}>
                  <Text style={[style['font-28'], style['lineHeight40']]}>
                    取消报备通知将不会接收到项目可以报备的提醒，确定要取消吗？
                  </Text>
                </View>
                <View style={[style['dyOverlayBtn'], style['flexRow'], style['alignCenter'], style['justifyBetween']]}>
                  <TouchableOpacity style={[style['dyOverlayBtnItem'], style['dyOverlayBtnItemClose']]}
                                    onPress={() => this.overlayDyBBPopView && this.overlayDyBBPopView.close()}>
                    <Text style={[style['font-28'], style['blackText']]}>关闭</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[style['dyOverlayBtnItem'], style['dyOverlayBtnItemSure']]} onPress={() => {
                    this.overlayDyBBPopView && this.overlayDyBBPopView.close();
                    this.onPressDyBB(false);
                  }}>
                    <Text style={[style['font-28'], style['whiteText']]}>确认</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Overlay.PopView>
        );
        Overlay.show(overlayView);
        return
      }
      let res = await projectService.setBuildingFollowReport(isNotify, buildingTreeId)
      if (res.code === '0') {
        this.buryPoint('可以报备时通知我_button')
        showModal && Toast.message('报备通知设置成功')
        this.setState({
          followStatus: {
            ...followStatus,
            isNotify: !followStatus?.isNotify
          } as IFollowState
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  onPressDYDT = async (isSubscribe: boolean, showModal: boolean = false) => {
    const {buildingTreeId, followStatus} = this.state
    try {
      if (!isSubscribe && showModal) { // 取消订阅，并且需要展示取消订阅弹出框的时候
        this.buryPoint('订阅项目动态_button', {isSubscribe: !isSubscribe})
        let overlayView = (
          <Overlay.PopView
            ref={v => this.overlayDyDTPopView = v}
            style={[style['alignCenter'], style['justifyCenter']]}
            modal={true}
          >
            <View style={[style['justifyCenter'], style['alignCenter'], style['dyOverlay']]}>
              <ImageBackground style={[style['qxdyBg']]} source={require('@/images/pictures/qxdyBackImg.png')}>
                <Image style={[style['bells']]} source={require('@/images/icons/project/bells.png')}/>
                <Text style={[style['font-32'], style['whiteText']]}>取消项目动态</Text>
              </ImageBackground>
              <View style={[style['dyOverlayContent'], style['flexCloum'], style['alignCenter'], style['justifyBetween']]}>
                <View style={[style['dyOverlayContentText']]}>
                  <Text style={[style['font-28'], style['lineHeight40']]}>
                    取消订阅将不会接收到最新的项目动态信息，确定要取消订阅吗？
                  </Text>
                </View>
                <View style={[style['dyOverlayBtn'], style['flexRow'], style['alignCenter'], style['justifyBetween']]}>
                  <TouchableOpacity style={[style['dyOverlayBtnItem'], style['dyOverlayBtnItemClose']]}
                                    onPress={() => this.overlayDyDTPopView && this.overlayDyDTPopView.close()}>
                    <Text style={[style['font-28'], style['blackText']]}>关闭</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[style['dyOverlayBtnItem'], style['dyOverlayBtnItemSure']]} onPress={() => {
                    this.overlayDyDTPopView && this.overlayDyDTPopView.close();
                    this.onPressDYDT(false);
                  }}>
                    <Text style={[style['font-28'], style['whiteText']]}>确认</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Overlay.PopView>
        );
        Overlay.show(overlayView);
        return
      }
      let res = await projectService.setBuildingFollowDymic(isSubscribe, buildingTreeId)
      if (res.code === '0') {
        showModal && Toast.message('订阅楼盘动态成功')
        this.setState({
          followStatus: {
            ...followStatus,
            isSubscribe: !followStatus?.isSubscribe
          } as IFollowState
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  footerClick = async (type: 1 | 2) => {
    try {
      await verifyUser('stronge', '', <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Text>您还未完善报备需要的个人信息</Text>
        <Text>(姓名、经纪公司)</Text>
      </View>, true)
      const canReport = this.isCanReport();
      if (!canReport) return;
      const {buildingTreeId, buildingDetail} = this.state;
      let param = {
        buildTreeId: buildingTreeId,
        buildingId: buildingDetail?.buildingId,
        buildingName: buildingDetail?.fullName
      };
      if (type === 1) {
        this.props.navigation.navigate('customerList', param);
        this.props.point.buryingPoint.add({
          target: '批量报备客户_button',
          page: '房源-房源详情',
          action_param: {
            buildingid: buildingDetail?.buildingId
          }
        })
      } else if (type === 2) {
        this.props.navigation.navigate('addReport', {
          buildingInfo: [param],
          type: 'formBuild'
        });
        this.props.point.buryingPoint.add({
          target: '报备客户_button',
          page: '房源-房源详情',
          action_param: {
            buildingid: buildingDetail?.buildingId
          }
        })
      }
    } catch (e) {
    }
  }

  gotoMap = () => {
    this.buryPoint('查看地图_button')
    const {buildingDetail} = this.state || {}
    const {basicInfo} = buildingDetail || {}
    this.props.navigation.navigate('baiduMap', {
      name: buildingDetail?.fullName,
      address: buildingDetail?.basicInfo?.areaFullName,
      latitude: basicInfo?.latitude,
      longitude: basicInfo?.longitude,
      txLatitude: basicInfo?.txLatitude,
      txLongitude: basicInfo?.txLongitude
    })
    this.props.point.buryingPoint.add({target: '地图_button', page: '房源-房源详情'})
  }

  setSelectModal = (visible: boolean) => {
    this.setState({
      visible
    })
  }

  gotoAi = async () => {
    this.buryPoint('包打听_button')
    try {
      await verifyUser('noVerifyFree', '')
      const {buildingDetail} = this.state
      const {navigation, config} = this.props
      buildingDetail?.buildingTreeId && navigation.push('xkjWebView', {
        isBdt: true,
        title: buildingDetail?.fullName,
        url: `${config?.requestUrl?.AIurl}/${buildingDetail.buildingTreeId}?time=1}`,
      })
    } catch (e) {
    }
  }

  gotoShopList = async () => {
    const {saleControl} = this.state
    this.buryPoint(saleControl ? '房源销控_图纸_button' : '房源销控_正常_button')
    try {
      await verifyUser('noVerifyFree')
      const {buildingDetail} = this.state
      this.props.navigation.navigate('shopList', {
        buildingTreeId: buildingDetail?.buildingTreeId,
        fullName: buildingDetail?.fullName,
        buildingId: buildingDetail?.buildingId,
        saleControl: saleControl
      });
      this.props.point.buryingPoint.add({target: '销控列表_button', page: '房源-房源详情'})
    } catch (e) {
    }
  }

  buryPoint = (target: string, action_param?: any) => {
    BuryingPoint.add({
      page: '楼盘详情页',
      target,
      action_param: {
        buildingTreeId: this.state.buildingTreeId,
        ...action_param,
      },
    })
  }

  sureOperation = async (kptx: boolean, xmdt: boolean) => {
    this.buryPoint('收藏成功_开盘提醒、项目动态_button', {
      btns: [{
        name: '开盘提醒',
        checked: kptx,
      }, {
        name: '项目动态',
        checked: xmdt,
      }]
    })
    const {followStatus} = this.state
    this.setState({
      visible: false
    })
    if (kptx && !followStatus?.isNotify) { // 选择了开盘提醒，并且在主页未选择
      await this.onPressDyBB(true, false)
    }
    if (xmdt && !followStatus?.isSubscribe) { // 选择了订阅项目动态，并且在主页未选择
      await this.onPressDYDT(true, false)
    }
    if (!kptx && followStatus?.isNotify) { // 取消了开盘提醒，并且在主页已选择
      await this.onPressDyBB(false, false)
    }
    if (!xmdt && followStatus?.isSubscribe) { // 取消了订阅项目动态，并且在主页已选择
      await this.onPressDYDT(false, false)
    }
  }

  isCanScroll = true;

  scrollTo = async (key: string) => {
    try {
      this.isCanScroll = false
      const y = this.layouts[key]
      await this.scrollRef.current.scrollTo({x: 0, y: y - this.baseHeight, animated: false});
      await this.setState({activeTabKey: key});
      setTimeout(() => {
        this.isCanScroll = true;
      }, 1000)
      /*this.setState({activeTabKey: key}, () => {
        const y = this.layouts[key]
        this.scrollRef.current.scrollTo({x: 0, y: y - this.baseHeight, animated: false})
      })*/
    } catch (e) {

    }
  }

  onLayout = (key: string, e: LayoutChangeEvent) => {
    this.layouts[key] = e.nativeEvent.layout.y
  }

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!this.isCanScroll) return;
    this.isCanScroll = false
    const offsetY = event.nativeEvent.contentOffset.y
    const {layouts} = this
    const {headerOpacity1, headerOpacity0, activeTabKey, tabs} = this.state
    const hideTabs = this.handleTabs();
    const _tabs = tabs.reduce((res, curr) => {
      if (!hideTabs.includes(curr.key)) res.push(curr)
      return res
    }, [] as Array<{ label: string, key: string }>)
    Animated.timing(headerOpacity0, {
      toValue: offsetY / 150,
      duration: 0,
      easing: Easing.linear,
    }).start()
    Animated.timing(headerOpacity1, {
      toValue: 1 - (offsetY / 150),
      duration: 0,
      easing: Easing.linear,
    }).start()

    let _activeTabKey = '';
    const y = offsetY + 150 // offsetY 差一点
    for (let i = 0; i <= _tabs.length - 1; i++) {
      if (layouts.hasOwnProperty(_tabs[i].key)) {
        if (i < (_tabs.length - 1)) {
          if (y >= layouts[_tabs[i].key] && y < layouts[_tabs[i + 1].key]) {
            _activeTabKey = _tabs[i].key
            break;
          }
        } else {// 最后一个
          if (y >= layouts[_tabs[i].key]) {
            _activeTabKey = _tabs[i].key;
            break;
          }
        }
      }
    }
    this.setState({activeTabKey: _activeTabKey}, () => {
      this.isCanScroll = true
    })

  }

  onScrollEndDrag = () => {
    const {sharePosition} = this.state
    debounceLast(() => {
      Animated.timing(sharePosition, {
        toValue: scaleSize(32),
        duration: 500,
        easing: Easing.linear,
      }).start()
    }, 1500)()
  }

  onScrollBeginDrag = () => {
    const {sharePosition} = this.state
    this.isScroll = true
    Animated.timing(sharePosition, {
      toValue: scaleSize(-194),
      duration: 500,
      easing: Easing.linear,
    }).start()
  }

  gotoMarket = async () => {
    this.buryPoint('销讲资料_button')
    const {buildingDetail} = this.state
    try {
      BuryingPoint.add({
        page: '房源-房源详情',
        target: '销讲资料_button',
      });
      await verifyUser('weak', '加入公司之后即可查看楼盘实时信息')
      buildingDetail?.buildingTreeId && this.props.navigation.navigate('marketingData', {buildingTreeId: buildingDetail.buildingTreeId})
    } catch (e) {
    }
  };

  shareMini = () => {
    this.buryPoint('分享报备_button')
    const {buildingDetail} = this.state
    const {config, user} = this.props
    const {userInfo = {}} = user
    if (!buildingDetail?.buildingTreeId || !buildingDetail.buildingId || !buildingDetail.fullName) return
    let path = `/pages/share/index?share_user_id=${userInfo.id}&build_tree_id=${buildingDetail.buildingTreeId}&build_id=${buildingDetail.buildingId}`
    if (userInfo.isResident) {
      path += `&company_id=${userInfo.filialeId || ''}&type=2`
    } else {
      path += `&type=1`
    }
    let thumbImage = buildingDetail?.basicInfo?.icon || `${config?.requestUrl.cqAuth}/images/defaultProject.png`
    const data = {
      type: 'miniProgram',
      webpageUrl: 'https://www.baidu.com/',
      title: `${userInfo.trueName || ''}邀请你报备${buildingDetail.fullName}！`,
      description: 'description',
      thumbImage: thumbImage,
      userName: 'gh_76def9e899ca',
      path: path
    }
    wxApi.handleShareToSession(data).then(() => {
    })
    this.props.point.buryingPoint.add({
      target: '分享报备小程序_button',
      page: '房源-房源详情',
      action_param: {
        buildingid: buildingDetail.buildingId,
        companyid: userInfo.filialeId
      }
    })
  }

  handleTabs = () => {
    const {buildingDetail, residentList, mainShopList, hotlist, tabs} = this.state
    return tabs.reduce((res, curr) => {
      if (
        (curr.key === 'jcss' && !(buildingDetail?.treeCategory === 3 || buildingDetail?.treeCategory === 4))
        || ((curr.key === 'lptj') && !hotlist?.length)
        || ((curr.key === 'zt') && !mainShopList?.length)
        || ((curr.key === 'xmjl') && !residentList?.length)
      ) {
        res.push(curr.key)
      }
      return res
    }, [] as string[])
  }

  gotoBusinessCard = async () => {
    const {exist, sourceIds} = this.state.selectedBuildings;
    if (this.props.user.status === 404) {
      logout()
      return
    }
    if (!this.props?.user?.userInfo?.filialeId || this.props?.user?.userInfo?.filialeId === '10000') {
      this.setState(({
        businessCardModalVisible: true,
        businessCardModalTips: '请先加入公司，再使用此功能',
        businessCardModalConfirmText: '去加入'
      }));
      return
    }
    if (exist) {
      this.setState(({
        businessCardModalVisible: true,
        businessCardModalTips: '从个人名片删除后，编辑过的信息模板将不再保存，确定要删除吗？',
        businessCardModalConfirmText: '确定删除'
      }));
      return
    }
    if (sourceIds.length >= 3) {
      this.setState(({
        businessCardModalVisible: true,
        businessCardModalTips: '个人名片可添加的房源数量已满',
        businessCardModalConfirmText: '去管理'
      }));
      return
    }
    sourceIds.push(this.state.buildingTreeId);
    const requestData = sourceIds.map((v, i) => ({sourceId: v, sort: i}));
    const res = await businessCardService.saveSelectedBuilding(requestData).catch(err => {
      console.error('submitSelectedBuilding', err)
    });
    if (res && res.code === '0') {
      this.getSelectedBuildings();
      this.setState(({
        businessCardModalVisible: true,
        businessCardModalTips: '加入个人名片成功，你可以去编辑房源信息并分享给客户',
        businessCardModalConfirmText: '去编辑'
      }));
    }
  };

  businessCardModalToggle = (type?: 'cancel' | 'confirm') => {
    this.setState(prev => ({
      businessCardModalVisible: !prev.businessCardModalVisible
    }), async () => {
      if (type === 'confirm') {
        const {businessCardModalConfirmText, selectedBuildings, buildingDetail} = this.state;
        if (businessCardModalConfirmText === '去加入') {
          navigation.navigate('personalInfo')
        } else if (['去编辑', '去管理'].includes(businessCardModalConfirmText)) {
          navigation.navigate('businessCard')
        } else if (businessCardModalConfirmText === '确定删除') {
          const requestData = selectedBuildings.sourceIds
            .filter((v1) => v1 !== buildingDetail?.buildingTreeId)
            .map((v, i) => ({sourceId: v, sort: i}));
          const res = await businessCardService.saveSelectedBuilding(requestData).catch(err => {
            console.error('submitSelectedBuilding', err)
          });
          if (res.code === '0') {
            Toast.message('删除成功');
            this.getSelectedBuildings()
          }
        }
      }
    })
  };

  share = () => {
    // 商铺2 楼盘1 首页3 sourceId 对应期组或者商铺id
    const {buildingDetail} = this.state
    const {userInfo} = this.props.user
    if (this.props.user.status === 404) {
      this.props.navigation.navigate('login')
      return
    }
    try {
      let thumbImage = this.state?.buildingDetail?.basicInfo?.icon;
      const path = `pages/share/index?type=${1}&brokerId=${userInfo?.id}&sourceId=${buildingDetail?.buildingTreeId}`;
      const data = {
        type: 'miniProgram',
        webpageUrl: 'https://www.baidu.com/',
        title: `${buildingDetail?.fullName}`,
        description: 'description',
        thumbImage: thumbImage,
        userName: 'gh_c12e5ce23095',
        path: path
      };
      wxApi.handleShareToSession(data).catch(e => {
        Toast.message(e.message)
      });
    } catch (e) {
      Toast.message('分享失败')
    }
  }

  render(): Element {
    const {
      headerOpacity1,
      saleControl,
      aibdtEbtrance,
      activeTabKey,
      marketingList,
      buildingDetail,
      reportOtherInfo,
      sharePosition,
      filesInfo,
      residentList,
      followStatus,
      reportRules,
      mainShopList,
      dynamicList,
      hotlist,
      visible,
      headerOpacity0,
      tabs,
      xmdt,
      kptx,
      selectedBuildings,
      businessCardModalVisible,
      businessCardModalTips,
      businessCardModalConfirmText,
      posterId,
      initModalStatus,
      showInitModal
    } = this.state
    const isResident = this.props.user?.userInfo?.isResident;
    const userStatus = this.props.user?.status;
    const hideTabs = this.handleTabs();
    const reportStartTime: string = reportRules.length > 0 ? reportRules[0].data.value : '';
    return (
      <View style={style['main']}>
        <StatusBar translucent={true} barStyle='dark-content' backgroundColor='rgba(255,255,255,0)'/>
        <View style={style['headerAbsolute']}>

          {/**header-透明*/}
          <Animated.View style={[style['headerContainer'], {opacity: headerOpacity1}]}>
            <View style={[style['headerLeft']]}>
              <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                <Image style={[style['headerIcon']]} source={require('../../../images/icons/project/back_white.png')}/>
              </TouchableOpacity>
            </View>

            <View style={[style['headerRight']]}>
              <TouchableOpacity activeOpacity={0.8} style={[style['padding-left-30']]} onPress={this.gotoBusinessCard}>
                {selectedBuildings.exist ? (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/business_selected_white.png')}/>
                ) : (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/businessCard_white.png')}/>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={[style['padding-left-30']]} onPress={() => this.collect(!followStatus?.isFavorite)} activeOpacity={0.8}>
                {followStatus?.isFavorite ? (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/collect.png')}/>
                ) : (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/unCollect.png')}/>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/**header-白色*/}
          <Animated.View style={[style['headerAnimated'], {opacity: headerOpacity0}]}>
            <View style={[style['headerLeft']]}>
              <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                <Image style={[style['headerIcon']]} source={require('../../../images/icons/project/back_black.png')}/>
              </TouchableOpacity>
            </View>
            <Text style={style['headerIconDivision']}>{buildingDetail?.fullName || '项目详情'}</Text>

            <View style={[style['headerRight']]}>
              <TouchableOpacity activeOpacity={0.8} onPress={this.gotoBusinessCard} style={[style['padding-left-30']]}>
                {selectedBuildings.exist ? (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/business_selected_dark.png')}/>
                ) : (
                  <Image style={[style['headerIcon']]} source={require('@/images/icons/project/businessCard_black.png')}/>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[style['padding-left-30']]} onPress={() => this.collect(!followStatus?.isFavorite)} activeOpacity={0.8}>
                {
                  followStatus?.isFavorite
                    ?
                    <Image style={[style['headerIcon']]} source={require('@/images/icons/project/like_red.png')}/>
                    :
                    <Image style={[style['headerIcon']]} source={require('@/images/icons/project/like_black.png')}/>
                }
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/**动态tabs*/}
        <Animated.ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[style['pd_subHeader'], {opacity: headerOpacity0}]}>
          {tabs.map(item => (
            <SwitchView current={hideTabs.includes(item.key) ? 2 : 1}>
              <SwitchViewItem type={1}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.scrollTo(item.key)} key={item.key} style={style['pd_subHeaderItem']}>
                  <View style={[style['pd_subHeaderTextWrap']]}>
                    <Text style={[style['pd_subHeaderText'], {color: activeTabKey === item.key ? '#1F3070' : '#868686'}]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={[style['pd_subHeaderLine'], {backgroundColor: activeTabKey === item.key ? '#1F3070' : '#fff'}]}/>
                </TouchableOpacity>
              </SwitchViewItem>
              <SwitchViewItem type={2}>{null}</SwitchViewItem>
            </SwitchView>
          ))}
        </Animated.ScrollView>
        <ScrollView ref={this.scrollRef} onScroll={this.onScroll}
                    showsVerticalScrollIndicator={false}
                    onScrollEndDrag={this.onScrollEndDrag} onScrollBeginDrag={this.onScrollBeginDrag}>

          {/**头部信息*/}
          <HeaderInfo
            {...this.props}
            userStatus={userStatus}
            saleControl={saleControl}
            filesInfo={filesInfo}
            marketingList={marketingList}
            onLayout={(e: LayoutChangeEvent) => this.onLayout('jbxx', e)} gotoMarket={this.gotoMarket}
            gotoShopList={this.gotoShopList} buildingDetail={buildingDetail}
          />
          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>

          {/**项目经理*/}
          {hideTabs.includes('xmjl') ? null : (
            <View onLayout={(e: LayoutChangeEvent) => this.onLayout('xmjl', e)}>
              <ProjectManager buildingDetail={buildingDetail} residentList={residentList}/>
              <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>
            </View>
          )}

          {/**项目信息*/}
          <ProjectInfo onLayout={(e: LayoutChangeEvent) => this.onLayout('xmxx', e)} gotoMap={this.gotoMap} onPressDy={this.onPressDyBB}
                       followStatus={followStatus} buildingDetail={buildingDetail} dispatch={this.props.dispatch}/>

          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>

          {/**包打听*/}
          <ProjectBdt aibdtEbtrance={aibdtEbtrance} onPress={this.gotoAi}/>
          {/* <TouchableOpacity onPress={this.gotoAi} style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['bdtContent']]}>
            <Image style={[style['bdtImage']]} source={require('@/images/pictures/AIBDT.png')} />
          </TouchableOpacity> */}
          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>

          {/**销售规则*/}
          <ReportRule reportRule={reportRules!}
                      onLayout={(e: LayoutChangeEvent) => this.onLayout('xsgz', e)}
                      reportOtherInfo={reportOtherInfo!}
                      page='楼盘详情页'/>

          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>

          {/**主推*/}
          {hideTabs.includes('zt') ? null : (
            <View onLayout={(e: LayoutChangeEvent) => this.onLayout('zt', e)}>
              <FeaturedList buildingDetail={buildingDetail} {...this.props}
                            mainShopList={mainShopList}/>
              <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>
            </View>
          )}

          {/**基础设施*/}
          {hideTabs.includes('jcss') ? null : (
            <View onLayout={(e: LayoutChangeEvent) => this.onLayout('jcss', e)}>
              <ProjectFacility buildingDetail={buildingDetail}/>
              <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>
            </View>
          )}

          {/**项目动态*/}
          <ProjectNews buildingTreeId={this.state.buildingTreeId} navigation={this.props.navigation} onLayout={(e: LayoutChangeEvent) => this.onLayout('xmdt', e)} onPressDy={this.onPressDYDT} followStatus={followStatus} dynamicList={dynamicList}/>
          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/>

          {/**项目简介*/}
          {/* <ProjectDesc onLayout={(e: LayoutChangeEvent) => this.onLayout('xmjj', e)} buildingDetail={buildingDetail}/>
          <Line height={scaleSize(24)} width='100%' backgroundColor='#F8F8F8'/> */}

          {/**推荐列表*/}
          {hideTabs.includes('lptj') ? null : (
            <ProjectLookList navigation={this.props.navigation} onLayout={(e: LayoutChangeEvent) => this.onLayout('lptj', e)} hotlist={hotlist}/>
          )}
        </ScrollView>

        {isResident ? (
          <Animated.View style={[style['share'], {right: sharePosition}]}>
            <TouchableOpacity activeOpacity={0.8} onPress={this.shareMini} style={[style['shareBtn']]}>
              <ImageBackground style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['shareBtnBg']]}
                               source={require('@/images/icons/project/share_btn.png')}>
                <Image style={[style['shareImg']]} source={require('@/images/icons/project/share_white.png')}/>
                <Text style={[style['whiteText'], style['font-32']]}>分享报备</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        <View style={style['detailFooter']}>
          {/* 批量报备 */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.footerClick(1)} style={{...style['detailFooterLeft']}}>
            <Image style={style['detailFooterIcon']} source={require('../../../images/icons/massReport.png')}/>
            <Text style={style['detailFooterLabel']}>批量报备</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.share()} style={{...style['detailFooterLeft']}}>
            <Image style={style['detailFooterIcon']} source={require('../../../images/icons/huoke.png')}/>
            <Text style={style['detailFooterLabel']}>微信获客</Text>
          </TouchableOpacity>
          {
            posterId.length > 0
            ?
            <WeChatButton
              style={{...style['detailFooterLeft']}}
              imageStyle={{width: scaleSize(50), height: scaleSize(50)}}
              textStyle={{...style['textInButton']}}
              projectInfo={{...buildingDetail, ...buildingDetail?.basicInfo, images: filesInfo?.images}}
              pageFrom='楼盘详情'
            />
            :
            null
          }

          <View style={[style['detailFooterBtn'], style['flexRow']]}>
            <Footer gotoReport={() => this.footerClick(2)} startTime={reportStartTime}/>
          </View>
        </View>

        <Modal visible={visible} presentationStyle='overFullScreen' transparent={true}>
          <TouchableOpacity activeOpacity={1} style={[style['selectModal']]} onPress={() => {
            this.setSelectModal(false)
          }}>
            <View style={[style['selectModalContent']]}>
              <TouchableOpacity activeOpacity={1}>
                <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween']]}>
                  <Text style={[style['font-40']]}>收藏成功</Text>
                  <TouchableOpacity activeOpacity={0.8} style={[style['padding-left-30']]} onPress={() => {
                    this.setSelectModal(false)
                  }}>
                    <Image style={[style['right_close']]} source={require('@/images/icons/close_bold.png')}/>
                  </TouchableOpacity>
                </View>
                <Text style={[style['font-26'], style['grayText'], style['selectModalContentRow2']]}>
                  收藏成功后，您会第一时间收到服务推送
                </Text>
                <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['selectModalContentItem']]}>
                  <Text style={[style['font-32']]}>开盘提醒<Text style={[style['font-24'], style['grayText']]}>（报备开始时间的通知）</Text></Text>
                  <TouchableOpacity activeOpacity={0.8} style={[style['padding-left-30']]} onPress={() => {
                    this.setState({kptx: !this.state.kptx})
                  }}>
                    {
                      kptx
                        ?
                        <Image style={[style['selectIcon']]} source={require('@/images/icons/project/select.png')}/>
                        :
                        <Image style={[style['selectIcon']]} source={require('@/images/icons/project/unSelect.png')}/>
                    }
                  </TouchableOpacity>
                </View>
                <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['selectModalContentItem']]}>
                  <Text style={[style['font-32']]}>项目动态<Text style={[style['font-24'], style['grayText']]}>（不错过房源销控，动态消息提醒）</Text></Text>
                  <TouchableOpacity activeOpacity={0.8} style={[style['padding-left-30']]} onPress={() => {
                    this.setState({xmdt: !this.state.xmdt})
                  }}>
                    {
                      xmdt
                        ?
                        <Image style={[style['selectIcon']]} source={require('@/images/icons/project/select.png')}/>
                        :
                        <Image style={[style['selectIcon']]} source={require('@/images/icons/project/unSelect.png')}/>
                    }
                  </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  this.sureOperation(kptx, xmdt)
                }} style={[style['sureBtn'], style['justifyCenter'], style['alignCenter']]}>
                  <Text style={[style['whiteText'], style['font-32']]}>确定</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal visible={businessCardModalVisible}
               transparent={true}
               animationType='fade'>
          <TouchableOpacity activeOpacity={1}
                            onPress={() => this.businessCardModalToggle()}
                            style={style.businessCard_modal_wrapper}>
            <View style={style.businessCard_modal_container}>
              <View style={style.businessCard_modal_content}>
                <Text style={style.businessCard_modal_content_text}>{businessCardModalTips}</Text>
              </View>
              <View style={style.businessCard_modal_footer}>
                <TouchableOpacity style={style.businessCard_modal_footer_btn}
                                  activeOpacity={1}
                                  onPress={() => this.businessCardModalToggle()}>
                  <Text style={[style.businessCard_modal_footer_btn_text, {color: '#4D4D4D'}]}>取消</Text>
                </TouchableOpacity>
                <View style={style.businessCard_modal_footer_line}/>
                <TouchableOpacity style={style.businessCard_modal_footer_btn}
                                  activeOpacity={1}
                                  onPress={() => this.businessCardModalToggle('confirm')}>
                  <Text style={style.businessCard_modal_footer_btn_text}>{businessCardModalConfirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal visible={showInitModal} transparent={true} presentationStyle='overFullScreen'>
          <TouchableOpacity activeOpacity={0.95} onPress={() => {
            if (this.state.initModalStatus === 0) {
              this.setState({initModalStatus: 1})
              return
            }
            this.setState({showInitModal: false})
          }}>
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode='stretch'
              source={initModalStatus === 0 ? require('@/images/guide/guide_project_1.png') : require('@/images/guide/guide_project_2.png')}
            />
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = ({user, point, config, businessCard}: ConnectState) => ({
  user,
  config,
  point,
  businessCard
})
// @ts-ignore
export default connect(mapStateToProps)(BuildingDetail)
