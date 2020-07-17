import React, {useEffect, useMemo, useState} from "react";
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
// @ts-ignore
import {BoxShadow} from 'react-native-shadow'
import {scaleSize} from "@/utils/screenUtil";
import styles from "@/pages/main/style";
import {Carousel} from "@new-space/teaset";
import {mainService} from "@/services/mainService";
import {df_buildingDetailFormat} from "@/pages/main/formatUtils/dynamicFormat";
import {IDynamicCacheDataType, IDynamicCacheType, IDynamicPropsType, IDynamicResponseExtensionType, IStateType} from "@/pages/main/types/dynamicType";
import {ResponseCommon} from "@/services/typings/types";
import navigation from "@/utils/navigation";
import {newsType} from "@/models/getLastNews";
import {connect} from "react-redux";
import BuryPoint from '@/utils/BuryPoint';
import {IAdvertisementDetailType, IAdvertisementType} from "@/pages/main/types/mainTypes";
import {storageSetWithCityCode} from "@/utils/utils";
import {STORAGE_KEY} from "@/constants";
import storage from "@/utils/storage";

const d_width = Dimensions.get('window').width;
const shadowOpt = {
  width: d_width - scaleSize(64),
  height: scaleSize(226),
  color: "#3b3b3b",
  border: 3,
  radius: 4,
  opacity: 0.1,
  x: 0,
  y: 0,
};
const dynamicIcon = require('../images/dynamicIcon.png');
const d_icon = require('../images/2222.png');
const arrow_main = require('../../../images/icons/arrow_main.png');

const defaultState: IStateType = {
  dynamicList: [],
  hasSubscribe: false,
  todayCount: 0
};

const Dynamic = (props: IDynamicPropsType) => {

  const [state, setState] = useState(defaultState);
  const [isGuest, setGuest] = useState(true);

  const cityCode = useMemo<string>(() => {
    return props.projectLocation.cityCode || props.projectLocation.defaultCityCode
  }, [props.projectLocation.cityCode]);

  useEffect(() => {
    const _isGuest = !props?.user?.userInfo?.id;
    if (!_isGuest) {
      // setGuest(true)
      storageGetCache();
      dynamicListRequest()
    }
  }, [props.refreshingRandom]);

  useEffect(() => {
    const _isGuest = !props?.user?.userInfo?.id;
    setGuest(Boolean(_isGuest))
  }, [props.user])

  const dynamicListRequest = async () => {
    if (isGuest) return;
    const requestData = {
      pageSize: 5,
      pageIndex: 0,
    };
    const response: ResponseCommon<IDynamicResponseExtensionType> = await mainService.dynamicListRequest(requestData);
    if (response.code === '0') {
      const newData = df_buildingDetailFormat(response.extension);
      const _cache: IDynamicCacheDataType = {
        dynamicList: newData.dynamicList,
        hasSubscribe: newData.hasSubscribe,
        todayCount: newData.todayCount,
      };
      setState(prevState => ({
        ...prevState,
        ..._cache
      }));
      storageSetCache(_cache)
    }
  };

  /**写入缓存数据*/
  const storageSetCache = (params: IDynamicCacheDataType) => {
    storageSetWithCityCode(STORAGE_KEY.MAIN_DYNAMIC, cityCode, params);
  };

  /**读取缓存数据*/
  const storageGetCache = async () => {
    const cacheData: IDynamicCacheType = await storage.get(STORAGE_KEY.MAIN_DYNAMIC).catch();
    if (cacheData && cacheData[cityCode]) {
      setState(prevState => ({
        ...prevState,
        dynamicList: cacheData[cityCode].dynamicList,
        hasSubscribe: cacheData[cityCode].hasSubscribe,
        todayCount: cacheData[cityCode].todayCount,
      }))
    }
  };

  const carouselControl = (
    <Carousel.Control style={styles.m_carousel_control}
                      dot={<Text style={styles.m_carousel_dot}/>}
                      activeDot={<Text style={styles.m_carousel_activeDot}/>}/>
  );

  const gotoBuildingTrends = (buildingTreeId: string, buildingTreeName: string) => {
    BuryPoint.add({
      page: '房源首页',
      target: '项目动态_button',
      action: 'click',
      action_param: {
        buildingTreeId
      },
    })
    navigation.navigate('buildingDetail', {buildingTreeId})
    // 跳转的时候需要先跳到楼盘详情，再跳转到动态
    setTimeout(() => {
      navigation.navigate('buildingTrends', {buildingTreeId, buildingTreeName})
    }, 300)
  };

  const gotoDynamicMessage = () => {
    navigation.navigate('messageDetail', {type: newsType.project})
  };

  const gotoSubscribe = () => {
    if (isGuest) {
      navigation.navigate('login');
      return
    }
    navigation.navigate('buildingList')
  };

  const hasSubscribeContent = (
    <Carousel style={styles.m_carousel} control={carouselControl} carousel={true}>
      {state.dynamicList.map((v, i) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => gotoBuildingTrends(v.buildingTreeId, v.buildingTreeName)} style={styles.m_carousel_item}>
          <Image style={styles.m_carousel_img} source={{uri: v.imageFiles[0]}} defaultSource={d_icon}/>
          <View style={styles.m_carousel_right}>
            <Text style={styles.m_carousel_title} numberOfLines={1}>{v.buildingTreeName}</Text>
            <Text style={styles.m_carousel_desc} numberOfLines={2}>{v.content}</Text>
            <View style={styles.m_carousel_footer}>
              <View style={styles.m_carousel_footer_left}>
                <Text style={styles.m_carousel_footer_label}>{v.label}</Text>
              </View>
              <Text style={styles.m_carousel_time}>{v.createTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Carousel>
  );

  const hasNoSubscribeContent = (
    <View style={styles.m_dynamic_content}>
      <View style={styles.m_dynamic_top}>
        <View style={styles.m_dynamic_tips}>
          <Text style={styles.m_dynamic_text1}>一手掌握项目动态</Text>
          <Text style={styles.m_dynamic_text2}>楼盘动态推荐/实时响应</Text>
        </View>
        <Image style={styles.m_dynamicIcon} source={dynamicIcon}/>
      </View>
      <View style={styles.m_dynamic_line}/>
      <TouchableOpacity activeOpacity={0.2} onPress={gotoSubscribe} style={styles.m_dynamic_btn}>
        <Text style={styles.m_dynamic_btn_text}>立即订阅</Text>
      </TouchableOpacity>
    </View>
  );

  const rightContent = (
    <View style={styles.m_dynamic_right_wrapper}>
      <Text onPress={() => gotoDynamicMessage()} style={styles.m_dynamic_right_text}>本日更新{state.todayCount || 0}条</Text>
      <Image style={styles.m_dynamic_right_icon} source={arrow_main}/>
    </View>
  );

  if (state.hasSubscribe && state.dynamicList.length === 0) return null;

  const content = isGuest ? hasNoSubscribeContent : (state.hasSubscribe ? hasSubscribeContent : hasNoSubscribeContent);

  return (
    <View style={styles.m_dynamic_page_wrapper}>
      <SubHeader subTitle='项目动态' rightContent={state.hasSubscribe ? rightContent : null}/>
      <View style={styles.m_dynamic_wrapper}>
        <BoxShadow setting={shadowOpt}>
          {content}
        </BoxShadow>
      </View>
    </View>
  )
};

const mapStateToProps = ({user, projectLocation}: any) => {
  return {user, projectLocation}
};
export default connect(mapStateToProps)(Dynamic)

