import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import styles from "@/pages/main/style";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import {IBuildingDetailType, ICurrentDateType, IRecommendCacheType, IRecommendPropsType, IRecommendStateType} from "@/pages/main/types/recommendTypes";
import {storageSetWithCityCode, weekNumTransToCN} from "@/utils/utils";
import {mainService} from "@/services/mainService";
import {mainRecommendFormat} from "@/pages/main/formatUtils/recommendFormat";
import BuryPoint from '@/utils/BuryPoint';
import {STORAGE_KEY} from "@/constants";
import storage from "@/utils/storage";
import RecommendSkeleton from "@/components/skeleton/components/RecommendSkeleton";

const projectTypeIcon = require('../../../images/icons/dujia.png');
const discountIcon = require('../../../images/icons/06.png');

const start = {x: 0, y: 0.25};
const end = {x: 0, y: 0.75};
const colors = ['#DBE4FF', '#FFFFFF'];

const defaultState = {
  currentDate: {} as ICurrentDateType,
  buildingList: [],
  buildingDetail: {} as IBuildingDetailType,
  idx: 0,
  cityCode: ''
} as IRecommendStateType;

const Recommend = (props: IRecommendPropsType) => {

  const [state, setState] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = weekNumTransToCN(date.getDay());
    const currentDate = {year, month, day, week};
    return {
      ...defaultState,
      currentDate,
      cityCode: props.projectLocation.cityCode || props.projectLocation.defaultCityCode
    }
  });

  useEffect(() => {
    storageGetCache()
  }, []);

  useEffect(() => {
    mainRecommendRequest();
  }, [state.cityCode, props.refreshingRandom]);

  const mainRecommendRequest = async () => {
    const requestData = {
      cityId: state.cityCode
    };
    const response = await mainService.mainRecommendRequest(requestData);
    if (response.code === '0') {
      const buildingList = mainRecommendFormat(response.extension);
      setState({
        ...state,
        buildingList,
        buildingDetail: buildingList[0],
        idx: 0
      });
      storageSetCache(buildingList)
    }
  };

  /**写入缓存数据*/
  const storageSetCache = (params: Array<IBuildingDetailType>) => {
    storageSetWithCityCode(STORAGE_KEY.RECOMMEND_AD, state.cityCode, params);
  };

  /**读取缓存数据*/
  const storageGetCache = async () => {
    const cityCode = state.cityCode;
    const cacheData: IRecommendCacheType = await storage.get(STORAGE_KEY.RECOMMEND_AD).catch();
    if (cacheData && cacheData[cityCode] && cacheData[cityCode].length > 0) {
      setState(prevState => ({
        ...prevState,
        buildingList: cacheData[cityCode],
        buildingDetail: cacheData[cityCode][0]
      }))
    }
  };

  const changeBuilding = (idx: number) => {
    setState({
      ...state,
      buildingDetail: state.buildingList[idx],
      idx
    })
  };

  const gotoBuildingDetail = () => {
    BuryPoint.add({
      page: '房源首页',
      target: '近期主推_button',
      action: 'click',
      action_param: {
        buildingTreeId: state.buildingDetail.buildingTreeId
      }
    })
    props.navigation.navigate('buildingDetail', {buildingTreeId: state.buildingDetail.buildingTreeId});
  };

  if (state.buildingList.length === 0) return null;

  return (
    <View style={styles.m_subWrapper}>
      <SubHeader subTitle='近期主推'/>
      {state.buildingList.length > 0 ? (
        <View style={styles.m_content}>
          <LinearGradient start={start} end={end} colors={colors} style={styles.m_lg_content}/>
          <View style={styles.m_container}>
            <TouchableOpacity activeOpacity={0.9} onPress={gotoBuildingDetail} style={styles.m_reco_buildingInfo_content}>
              <View style={styles.m_reco_buildingInfo}>
                <Text style={styles.m_reco_building_name} numberOfLines={1}>{state.buildingDetail.buildingTreeName}</Text>
                <View style={styles.m_reco_building_labels}>
                  {state.buildingDetail.projectType === 1 ? (
                    <Image style={styles.m_reco_building_projectType} source={projectTypeIcon}/>
                  ) : null}
                  {state.buildingDetail.sellStateStr ? (
                    <Text style={styles.m_reco_building_sellState}>{state.buildingDetail.sellStateStr}</Text>
                  ) : null}
                  {state.buildingDetail.treeCategoryStr ? (
                    <Text style={styles.m_reco_building_treeCategory}>{state.buildingDetail.treeCategoryStr}</Text>
                  ) : null}
                </View>
                <Text style={styles.m_reco_reason} numberOfLines={3}>
                  <Text style={styles.m_reco_reason_tips}>推荐理由：</Text>
                  {state.buildingDetail.reason}
                </Text>
              </View>
              <View style={styles.m_reco_building_img_wrapper}>
                <Image style={styles.m_reco_building_img} source={state.buildingDetail.icon}/>
                {state.buildingDetail.discounts ? (
                  <Image style={styles.m_reco_building_icon} source={discountIcon}/>
                ) : null}
              </View>
            </TouchableOpacity>

            <View style={styles.m_reco_buildingList}>
              <View style={styles.m_reco_date_wrapper}>
                <Text style={styles.m_reco_date}>
                  {state.currentDate.day}
                </Text>
                <View style={styles.m_reco_month_wrapper}>
                  <Text style={styles.m_reco_month}>
                    {state.currentDate.year}.{state.currentDate.month}月
                  </Text>
                  <Text style={styles.m_reco_week}>星期{state.currentDate.week}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.m_reco_buildingList_icons,
                  state.buildingList.length >= 5 ? {justifyContent: 'space-between',} : {justifyContent: 'flex-start'}
                ]}>
                {state.buildingList.map((v, i) => (
                  <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => changeBuilding(i)}
                                    style={styles.m_reco_buildingList_icon_wrap}>
                    <Image source={v.icon}
                           style={[
                             styles.m_reco_buildingList_icon,
                             i === state.idx ? styles.m_reco_buildingList_icon_s : null
                           ]}/>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      ) : <RecommendSkeleton/>}
    </View>
  )
};

const mapStateToProps = ({config, point, projectLocation}: any) => {
  return {
    config,
    projectLocation,
    sendPoint: point.buryingPoint
  }
};
export default connect(mapStateToProps)(Recommend)
