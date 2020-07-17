import * as React from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, StatusBar, Platform, Modal} from "react-native";
import styles from './style'
import Recommend from "@/pages/main/components/Recommend";
import Dynamic from "@/pages/main/components/Dynamic";
import FeatureShop from "@/pages/main/components/FeatureShop";
import {mainLabels} from "@/pages/main/constants";
import Quotation from "@/pages/main/components/quotation";
import BuildingLike from "@/pages/main/components/buildingLike";
import projectService from "@/services/projectService";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {IAdvertisementDetailType, IAdvertisementType, IMainStateType} from "@/pages/main/types/mainTypes";
import {IBuildingTreeIds} from "@/pages/main/types/buildingLikeTypes";
import BannerAd from "@/pages/main/components/BannerAd";
import MainHeader from "@/pages/main/components/MainHeader";
import Advertisement from "@/businessComponents/advertisement";
// @ts-ignore
import QuickEntry from "@/businessComponents/quickEntry/index";
import {CONSTANT, STORAGE_KEY} from "@/constants";
import BuryPoint from '@/utils/BuryPoint';
import navigationUtils from '../../utils/navigation'
import storage from '@/utils/storage'

const defaultState = {
  bl_buildingTreeIds: [],
  bannerList: [],
  fullScreenList: [],
  fullScreenListRandom: 0,
  refreshing: false,
  refreshingRandom: Math.random()
} as IMainStateType;

const Main = (props: any) => {

  const cityCode = props.projectLocation.cityCode || props.projectLocation.defaultCityCode;

  const [state, setState] = useState(defaultState);
  const [visible, setVisible] = useState(false);
  const [isInit, setIsInit] = useState(0); // 0 - 还在获取数据 1 - 第一次进入  2 - 弟N此

  useEffect(() => {
    advertisementRequest()
  }, [props.projectLocation.cityCode]);

  useEffect(() => {
    storage.get(STORAGE_KEY.ISINIT_MAIN).then(res => {
      console.log(res)
      if (res === STORAGE_KEY.ISINIT_MAIN ) {
        setIsInit(2)
      } else {
        setIsInit(1)
        setVisible(true)
        storage.set(STORAGE_KEY.ISINIT_MAIN, STORAGE_KEY.ISINIT_MAIN)
      }
    }).catch(() => {
      setIsInit(1)
      setVisible(true)
      storage.set(STORAGE_KEY.ISINIT_MAIN, STORAGE_KEY.ISINIT_MAIN)
    })
  }, [])

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
  }, [])

  useEffect(() => {
    const {config: {noticeInfo}, dispatch} = props
    if (noticeInfo && noticeInfo.url && !noticeInfo.show) {
      navigationUtils.noticeNavigate(noticeInfo)
      dispatch({
        type: 'config/setNoticeInfoShow',
      })
    }
  }, [props.config.noticeInfo])

  /**广告接口*/
  const advertisementRequest = async () => {
    const requestData = {
      cityId: cityCode,
      app: 1,
      adSiteCodes: {'NEW_BANNER': 5, 'MAIN_RECOMMEND': 5, 'RECOMMEND_BUILDING': 30, 'BROKER_ON_OPEN': 5}
    };
    const response = await projectService.advertisementReqOld(requestData);
    const {code, extension} = response;
    if (code === '0') {
      let bl_buildingTreeIds: Array<IBuildingTreeIds> = [];
      //RECOMMEND_BUILDING：猜你喜欢
      //NEW_BANNER：banner广告
      //BROKER_ON_OPEN：开屏广告
      const {RECOMMEND_BUILDING = [], NEW_BANNER = [], BROKER_ON_OPEN = []} = extension as IAdvertisementType;
      if (RECOMMEND_BUILDING.length > 0) {
        bl_buildingTreeIds = RECOMMEND_BUILDING.map(v => ({adId: v.id, buildingTreeId: v.link}));
      }
      setState({
        ...state,
        bl_buildingTreeIds,
        bannerList: NEW_BANNER,
        fullScreenList: BROKER_ON_OPEN,
        fullScreenListRandom: state.fullScreenListRandom ? state.fullScreenListRandom : Math.random(),
        refreshing: false,
        refreshingRandom: Math.random()
      })
    } else {
      setState({
        ...state,
        refreshing: false
      })
    }
  };

  const mainLabelClick = (id: string) => {
    const params = {
      page: '房源首页',
    }
    if (id === 'buildingList') {
      BuryPoint.add({target: '全部楼盘_button', ...params})
      props.navigation.navigate('buildingList', {city: cityCode});
    } else if (id === 'searchShop') {
      BuryPoint.add({target: '侦探寻铺_button', ...params})
      props.navigation.navigate('searchBuilding');
    } else if (id === 'articleList') {
      BuryPoint.add({target: '聚焦热点_button', ...params})
      props.navigation.navigate('articleList');
    } else if (id === 'mapHouse') {
      BuryPoint.add({target: '地图找铺_button', ...params})
      props.navigation.navigate('mapHouse');
    }
  };

  const onRefresh = () => {
    setState({
      ...state,
      refreshing: true,
    });
    setTimeout(() => {
      advertisementRequest()
    }, 1000)
  };

  const advertisementDetail = (item: IAdvertisementDetailType, source: number, targer?: string) => {
    const {config, projectLocation, user} = props;
    if (!item.link) return;
    const reqParams = {
      adId: item.id,
      app: 1,
      source: Platform.OS === 'ios' ? 1 : 2,
      userId: (user.userInfo || {}).id,
      cityId: projectLocation.cityCode
    };
    BuryPoint.add({page: '房源首页', target: targer || '', action_param: reqParams})
    projectService.addVisitReq(config.requestUrl.public, reqParams);
    if (item.jumpType === 3) {
      props.navigation.navigate('buildingDetail', {buildingTreeId: item.link});
    } else {
      props.navigation.navigate('xkjWebView', {url: item.link, title: item.adName, id: item.id})
    }
    let target = '';
    if (source === CONSTANT.SOURCE.CAROUSEL) {
      target = 'banner_button'
    } else {
      target = '运营板块_button'
    }
    BuryPoint.add({
      page: '房源首页',
      target: 'banner_button',
      action: 'click',
      action_param: {
        adId: item.id,
      }
    })
  };

  const refreshControl = <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh}/>;

  return (
    <View style={styles.m_scrollView_wrapper}>

      <StatusBar translucent={true} barStyle='light-content' backgroundColor='rgba(255,255,255,0)'/>

      {/*搜索框*/}
      <MainHeader navigation={props.navigation}/>

      <ScrollView
        style={[styles.m_wrapper]}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}>

        <View style={styles.m_label_wrapper}>
          {mainLabels.map((v, i) => (
            <TouchableOpacity activeOpacity={0.9} onPress={() => mainLabelClick(v.id)} style={styles.m_label_item} key={i}>
              <Image style={styles.m_label_icon} source={v.icon}/>
              <Text style={styles.m_title} numberOfLines={1}>{v.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/**横幅广告*/}
        <BannerAd navigation={props.navigation} advertisementDetail={advertisementDetail} bannerList={state.bannerList}/>

        {/**最近主推*/}
        <Recommend navigation={props.navigation} refreshingRandom={state.refreshingRandom}/>

        {/**项目动态*/}
        <Dynamic cityCode={cityCode} refreshingRandom={state.refreshingRandom}/>

        {/**特色商铺*/}
        <FeatureShop cityCode={cityCode} refreshingRandom={state.refreshingRandom}/>

        {/**市场行情*/}
        <Quotation refreshingRandom={state.refreshingRandom}/>

        {/**猜你喜欢*/}
        {state.bl_buildingTreeIds.length > 0 && (
          <BuildingLike buildingTreeIds={state.bl_buildingTreeIds} refreshingRandom={state.refreshingRandom}/>
        )}

        {/**开屏广告*/}
        {state.fullScreenList.length >= 1 && !props.config.willUpdate && !props.config.isShow && isInit === 2 && (
          <Advertisement fullScreenListRandom={state.fullScreenListRandom}
                         advertisementDetail={advertisementDetail}
                         fullScreenList={state.fullScreenList}/>
        )}

        {/**快速入口*/}
        <QuickEntry visible={props.config.showQuickPage.routeName === 'Main'}/>

      </ScrollView>
      {
        isInit === 1
        ?
        <Modal visible={visible} transparent={true} presentationStyle='overFullScreen'>
          <TouchableOpacity activeOpacity={0.95} onPress={() => {setVisible(false)}}>
            <Image style={{width: '100%', height: '100%'}} resizeMode='stretch' source={require('@/images/guide/main_ydy.png')} />
          </TouchableOpacity>
        </Modal>
        :
        null
      }
    </View>
  )
};

const mapStateToProps = ({config, point, projectLocation, user}: any) => {
  return {
    config, user,
    projectLocation,
    sendPoint: point.buryingPoint
  }
};
export default connect(mapStateToProps)(Main)

