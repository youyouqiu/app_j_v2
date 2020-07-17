import React from 'react'
import {
  Animated, Easing, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, Text, TouchableOpacity, View,
  ImageBackground, Platform
} from 'react-native'
import styles from './styles'
import HeaderInfo from './components/headerInfo'
import MatchingInfo from './components/matchingInfo'
import ReportRule from './components/reportRule'
import projectService from '../../../services/projectService/index'
import {connect} from 'react-redux'
import {Theme} from '@new-space/teaset'
import {scaleSize} from '@/utils/screenUtil'
import {wxApi} from '@/utils/wxUtils'
import {Toast} from '@new-space/teaset'
import buryPoint from '@/utils/BuryPoint'
import {debounceLast, verifyUser} from '@/utils/utils'
import ProjectManager from "@/pages/project/shopDetail/components/ProjectManager";
import {
  ICommonType,
  IShopDetailBaseInfoType,
  IShopDetailPropsTypes,
  IShopDetailResponseExtensionType,
  IShopDetailStateType
} from "@/pages/project/shopDetail/types/shopDetailTypes";
import shopDetailFormat from "@/pages/project/shopDetail/formatUtil/shopDetailFormat";
import {IHeaderInfoType} from "@/pages/project/shopDetail/types/headerInfoTypes";
import {ResponseCommon} from "@/services/typings/types";
import {IReportOtherInfoType, IReportRuleTypes} from "@/pages/project/shopDetail/types/ReportRuleTypes";
import FunctionDesk from "@/pages/project/shopDetail/components/functionDesk";
import shopJson from "@/pages/project/shopDetail/shopJson";
import request from "@/utils/request";
import navigation from "@/utils/navigation";
import {loan_types} from "@/utils/calculate";
import HeaderBar from "@/pages/project/shopDetail/components/headerBar";
import SellingPoint from "@/pages/project/shopDetail/components/sellingPoint";
import BelongingProject from "@/pages/project/shopDetail/components/belongingProject";
import reportRuleFormat from "@/pages/project/shopDetail/formatUtil/ReportRuleFormat";
import ReportCountDown from "@/businessComponents/ReportCountDown";
import ShopDetailFooter from "@/pages/project/shopDetail/components/shopDetailFooter";


const shareIcon = require('@/images/icons/project/share_white.png');


const loanIcon = require('./images/loan.jpg');

class ShopDetail extends React.Component<IShopDetailPropsTypes, IShopDetailStateType> {

  common: ICommonType = {
    shopId: '',
    buildingTreeId: '',
    buildingId: '',
    layouts: {},
    baseHeight: 0,
    hasRule: false,
  };


  constructor(props: any) {
    super(props);
    this.common = {
      shopId: props.navigation.state.params.shopId,
      buildingTreeId: props.navigation.state.params.buildingTreeId,
    } as ICommonType;
    this.state = {
      headerInfo: {} as IHeaderInfoType,
      sellingPoint: [],
      facility: [],
      reportOtherInfo: {} as IReportOtherInfoType,
      baseInfo: {} as IShopDetailBaseInfoType,
      fdVisible: false,
      reportRule: [] as Array<IReportRuleTypes>,
      headerOpacity0: new Animated.Value(0),
      headerOpacity1: new Animated.Value(1),
      sharePosition: new Animated.Value(scaleSize(32)),
      featureShopHeader: props.navigation.state.params.featureShopHeader,
      statusBarBackgroundColor: 'rgba(255,255,255,0)'
    } as IShopDetailStateType;
    this.common.baseHeight = (Theme.navBarContentHeight || 0) + Theme.statusBarHeight + scaleSize(96);
  }

  componentDidMount() {
    this.initDictionary();
    this.getShopDetail();
    this.getReportRule();
  }

  initDictionary = () => {
    this.props.dispatch({
      type: 'dictionaries/getDictionaryDefines',
      payload: {requestData: ['SHOP_CATEGORY', 'HOUSE_TYPE', 'SHOP_TOWARD', 'PARKING_TYPE', 'LEVEL_OFFICE_LEVEL', 'APART_TYPE',]}
    })
  };

  /**商铺详情*/
  getShopDetail = async () => {
    const {shopId} = this.common;
    console.log('getShopDetail', shopId);
    const response: ResponseCommon<IShopDetailResponseExtensionType> = await projectService.shopDetailNewReq(shopId);
    console.log('getShopDetail', response);
    if (response.code === '0') {
      const {headerInfo, facility, reportOtherInfo, baseInfo, sellingPoint} = shopDetailFormat(response.extension, this.props.dictionaries);
      this.setState({headerInfo, facility, reportOtherInfo, baseInfo, sellingPoint})
    }
  };

  /**报备规则*/
  getReportRule = async () => {
    const {buildingTreeId} = this.common;
    const response = await projectService.reportRuleReq(buildingTreeId);
    console.log('getReportRule', response);
    if (response.code === '0') {
      const reportRule = reportRuleFormat(response.extension);
      this.setState({reportRule});
      reportRule && (this.common.hasRule = true);
    }
  };

  handleShare = async () => {
    const {buildingTreeId, buildingId, buildingTreeIcon} = this.state.baseInfo;
    const buildingTreeName = this.state.headerInfo.name;
    const {userInfo = {}} = this.props.user;
    if (!buildingTreeId || !buildingId || !buildingTreeName) return;

    let path = `/pages/share/index?share_user_id=${userInfo.id}&build_tree_id=${buildingTreeId}&build_id=${buildingId}`;
    if (userInfo.isResident) {
      path += `&company_id=${userInfo.filialeId || ''}&type=2`
    } else {
      path += `&type=1`
    }

    let thumbImage = buildingTreeIcon || `${request.getUrl().cqAuth}/images/defaultProject.png`;

    const data = {
      type: 'miniProgram',
      webpageUrl: 'https://www.baidu.com/',
      title: `${userInfo.trueName || ''}邀请你报备${buildingTreeName}！`,
      description: 'description',
      thumbImage: thumbImage,
      userName: 'gh_76def9e899ca',
      path: path
    };
    wxApi.handleShareToSession(data)
      .then(() => {
      }).catch(e => {
      Toast.message(e.message)
    });
    buryPoint.add({
      target: '分享报备小程序_button',
      page: '房源-房源详情',
      action_param: {
        buildingid: buildingId,
        companyid: userInfo.filialeId
      }
    })
  };

  onClick = (type: string) => {
    this.setState((prev: IShopDetailStateType) => ({
      fdVisible: !prev.fdVisible
    }), () => {
      if (type === 'gzt') {
        this.props.navigation.navigate('Workbench')
      } else if (type === 'building') {
        const {buildingTreeId} = this.common;
        this.props.navigation.navigate('buildingDetail', {buildingTreeId})
      } else if (type === 'main') {
        this.props.navigation.navigate('Main')
      }
    })
  };

  isCanReport = () => {
    if (!this.common.hasRule) {
      Toast.message('此楼盘未生成报备规则');
      return false
    }
    const userCityCode = this.props.user?.userInfo?.city || '';
    const {cityCode} = this.state.baseInfo;
    if (userCityCode !== cityCode) {
      Toast.message('无法报备其他城市楼盘');
      return false
    }
    return true
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const {headerOpacity0, headerOpacity1} = this.state;
    Animated.timing(headerOpacity0, {
      toValue: offsetY / 150,
      duration: 0,
      easing: Easing.linear,
    }).start();
    Animated.timing(headerOpacity1, {
      toValue: 1 - (offsetY / 150),
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  onScrollBeginDrag = () => {
    const {sharePosition} = this.state;
    Animated.timing(sharePosition, {
      toValue: scaleSize(-194),
      duration: 500,
      easing: Easing.linear,
    }).start()
  };

  onScrollEndDrag = () => {
    const {sharePosition} = this.state;
    debounceLast(() => {
      Animated.timing(sharePosition, {
        toValue: scaleSize(32),
        duration: 500,
        easing: Easing.linear,
      }).start()
    }, 1500)()
  };

  modalToggle = () => {
    this.setState((prev: IShopDetailStateType) => {
      const statusBarBackgroundColor = !prev.fdVisible ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0)';
      return {
        fdVisible: !prev.fdVisible,
        statusBarBackgroundColor: Platform.OS === 'android' ? statusBarBackgroundColor : 'rgba(255,255,255,0)'
      }
    })
  };

  gotoReport = async () => {
    try {
      const verifyUserContent = (
        <View style={styles.bd_verify_content}>
          <Text>您还未完善报备需要的个人信息</Text>
          <Text>(姓名、经纪公司)</Text>
        </View>
      );
      await verifyUser('stronge', '', verifyUserContent, true);
      if (!this.isCanReport()) return;
      const {buildingTreeId, buildingId} = this.state.baseInfo;
      const {headerInfo} = this.state;
      let param = {
        buildTreeId: buildingTreeId,
        buildingId: buildingId,
        buildingName: headerInfo.name
      };
      this.props.navigation.navigate('addReport', {buildingInfo: [param], type: 'formBuild'});
      buryPoint.add({target: '报备客户_button', page: '商铺详情'})
    } catch (e) {

    }
  };

  loanOnPress = () => {
    buryPoint.add({
      page: '单个房源详情',
      target: '房贷计算器_button',
    })
    const {headerInfo} = this.state;
    navigation.navigate('calculate', {commercialTotal: headerInfo.totalPrice})
  };


  render() {
    const {headerOpacity0, headerOpacity1, fdVisible, statusBarBackgroundColor, reportOtherInfo, headerInfo, facility, sharePosition, sellingPoint, baseInfo} = this.state;
    const {reportRule} = this.state;
    const {buildingTreeId, shopId} = this.common;
    const isResident = this.props.user?.userInfo?.isResident;

    const reportStartTime: string = reportRule.length > 0 ? reportRule[0].data.value : '';
    return (
      <View style={styles.bd_wrapper}>
        <StatusBar translucent={true} barStyle='dark-content' backgroundColor={statusBarBackgroundColor}/>

        {/**导航栏*/}
        <HeaderBar headerOpacity1={headerOpacity1}
                   headerOpacity0={headerOpacity0}
                   modalToggle={this.modalToggle}
                   shopCategoryTypeStr={headerInfo.shopCategoryTypeStr}/>

        {/**工作台*/}
        <FunctionDesk visible={fdVisible} modalClose={this.modalToggle} onClick={this.onClick}/>

        {/**分享*/}
        {
          isResident ? <Animated.View style={[styles.sd_share_wrapper, {right: sharePosition}]}>
            <TouchableOpacity style={styles.sd_share_btn} onPress={this.handleShare}>
              <ImageBackground style={styles.sd_share_btn_bg} source={require('@/images/icons/project/share_btn.png')}>
                <Image style={styles.sd_share_icon} source={shareIcon}/>
                <Text style={styles.sd_share_text}>分享报备</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View> : null
        }
        <View style={styles.bd_content}>
          <ScrollView bounces={false}
                      onScroll={this.onScroll}
                      scrollEventThrottle={16}
                      showsVerticalScrollIndicator={false}
                      onScrollEndDrag={this.onScrollEndDrag}
                      onScrollBeginDrag={this.onScrollBeginDrag}>

            {/**头部信息*/}
            <HeaderInfo featureShopHeader={this.state.featureShopHeader} shopId={shopId} headerInfo={headerInfo} navigation={this.props.navigation}/>

            {/**卖点信息*/}
            {sellingPoint.length > 0 ? (
              <SellingPoint sellingPoint={sellingPoint}/>
            ) : null}

            {/**项目经理*/}
            <ProjectManager buildingTreeId={buildingTreeId}/>

            {/**配套信息*/}
            {facility.length > 0 ? <MatchingInfo facility={facility}/> : null}

            {/**房贷计算器*/}
            <TouchableOpacity activeOpacity={0.8} style={styles.sd_loanIcon_wrapper} onPress={this.loanOnPress}>
              <Image style={styles.sd_loanIcon} source={loanIcon}/>
            </TouchableOpacity>

            {/**归属项目*/}
            {/* {buildingTreeId && baseInfo.cityCode ? (
              <BelongingProject cityCode={baseInfo.cityCode} buildingTreeId={buildingTreeId} />
            ) : null} */}

            {/**销售规则*/}
            {/* {reportRule.length > 0 ? (
              <ReportRule reportRule={reportRule} reportOtherInfo={reportOtherInfo}/>
            ) : null} */}
            <ReportRule reportRule={reportRule} reportOtherInfo={reportOtherInfo} page='单个房源详情'/>

          </ScrollView>

          {/**报备按钮*/}
          <ShopDetailFooter buildingTreeId={buildingTreeId} gotoReport={this.gotoReport} startTime={reportStartTime}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({config, dictionaries, user}: any) => ({
  requestUrl: config.requestUrl,
  dictionaries,
  user,
});

export default connect(mapStateToProps)(ShopDetail)
