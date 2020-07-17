/**
 * @author: zxs
 * @date: 2020/4/27
 */
import React, {useEffect, useState} from "react";
import {FlatList, Image, ListRenderItem, Text, TouchableOpacity, View} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import styles from '../style'
import {IBuildingDetailTypes, IBuildingLikeStateTypes, IBuildingLikeTypes} from "@/pages/main/types/buildingLikeTypes";
import projectService from "@/services/projectService";
import {connect} from "react-redux";
import {buildingLikeFormat} from "@/pages/main/formatUtils/buildingLikeFormat";
import Label from "@/components/new-space/components/Label";
import navigation from "@/utils/navigation";
import Bdt from '@/businessComponents/Bdt'
import BuryPoint from '@/utils/BuryPoint';

const discountIcon = require('../images/discountIcon.png');
const defaultImg = require('../../../images/defaultImage/default_1.png');

const defaultState = {
  buildingList: []
} as IBuildingLikeStateTypes;

const BuildingLike = (props: IBuildingLikeTypes) => {

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (props.buildingTreeIds.length > 0) buildingLikeRequest()
  }, [props.buildingTreeIds, props.projectLocation.cityCode, props.refreshingRandom]);

  const _keyExtractor = (item: IBuildingDetailTypes, idx: number) => {
    return idx.toString()
  };

  const buildingLikeRequest = async () => {
    const {requestUrl} = props.config;
    const response = await projectService.recommendBuildingReq(requestUrl.api, props.buildingTreeIds);
    if (response.code === '0') {
      const _buildingList = buildingLikeFormat(response.extension);
      setState({
        ...state,
        buildingList: _buildingList
      })
    }
  };

  const gotoBuildingDetail = (buildingTreeId: string, buildingId: string, name: string) => {
    navigation.navigate('buildingDetail', {buildingTreeId, buildingId})
    BuryPoint.add({target: '猜你喜欢_item', page: '房源首页', action_param: {buildingTreeId, name}})
  };

  const renderItem: ListRenderItem<IBuildingDetailTypes> = ({item}) => {
    const {cityName, defaultCityName, cityCode, defaultCityCode} = props.projectLocation;
    const projectInfo = {
      buildingTreeId: item.buildingTreeId,
      fullName: item.fullName,
      areaFullName: item.areaFullName,
      cityName: cityName || defaultCityName,
      city: cityCode || defaultCityCode,
      minPrice: item.minPrice,
      maxPrice: item.maxPrice,
      buildIcon: item.buildIcon,
      images: ''
    };
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => gotoBuildingDetail(item.buildingTreeId, item.buildingId, item.fullName)} style={styles.m_buildingLike_item}>
        <Image style={styles.m_buildingLike_building_img} defaultSource={defaultImg} source={{uri: item.buildIcon}}/>
        <View style={styles.m_buildingLike_base_info}>
          <View style={styles.m_buildingLike_buildingName_wrapper}>
            <Text style={styles.m_buildingLike_buildingName} numberOfLines={1}>{item.fullName}</Text>
            {item.discounts ? (
              <Image style={styles.m_buildingLike_discountIcon} source={discountIcon}/>
            ) : null}
          </View>
          {item.maxPrice && item.minPrice ? (
            <Text style={styles.m_buildingLike_price}>{item.minPrice}-{item.maxPrice}万</Text>
          ) : null}
        </View>
        <View style={styles.m_buildingLike_labels}>
          <View style={styles.m_buildingLike_labels_content}>
            <Label.SoloBuilding isSolo={item.projectType === 1}/>
            <Label.BuildingSaleStatus _key={item.sellState}/>
            <Label.TreeCategory _key={item.treeCategory}/>
            {item.labelNames.map((v) => <Label _key={v}/>)}
          </View>
          <Text style={styles.m_buildingLike_location}>
            {item.areaName}{item.minAcreage && item.maxAcreage ? `｜建面${item.minAcreage}-${item.maxAcreage}㎡` : null}
          </Text>
        </View>
        <Bdt name={item.fullName} number={item.number} avatorSourceList={item.avatarList} buildingFormat={item?.buildingFormat} buildingTreeId={item.buildingTreeId}/>
      </TouchableOpacity>
    )
  };
  return (
    <View style={styles.m_buildingLike_wrapper}>
      <SubHeader subTitle='猜你喜欢'/>
      <View style={styles.m_buildingLike_flatList_wrapper}>
        <FlatList data={state.buildingList} keyExtractor={_keyExtractor} renderItem={renderItem}/>
      </View>
    </View>
  )
};

const mapStateToProps = ({config, projectLocation}: any) => {
  return {
    config, projectLocation
  }
};
export default connect(mapStateToProps)(BuildingLike)
