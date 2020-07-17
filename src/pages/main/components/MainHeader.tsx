/**
 * @author: zxs
 * @date: 2020/4/29
 */
import styles from "@/pages/main/style";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { checkPermission } from "@/utils/utils";
import { getLocationInfo } from "@/pages/project/common";
import BuryPoint from '@/utils/BuryPoint'

const location_icon = require('../../../images/icons/location_main.png');
const search_icon = require('../../../images/icons/searchMain.png');

const MainHeader = (props: any) => {

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const response = await checkPermission('location');
    if (response) {
      const { dispatch } = props;
      const result = await getLocationInfo({ cityList: [] }).catch(err => {});
      if (!result) return;
      const { cityName, cityCode, lat, lng } = result;
      let payloadData;
      if (result.cityCode) {
        payloadData = { cityName, cityCode, lat, lng }
      } else {
        payloadData = {
          cityCode: props.projectLocation.defaultCityCode,
          cityName: props.projectLocation.defaultCityName
        }
      }
      dispatch({
        type: 'projectLocation/changeCityInfo',
        payload: payloadData
      });
    }
  };

  const gotoCityList = () => {
    props.navigation.navigate('cityList')
  };

  const gotoBuildingSearch = () => {
    BuryPoint.add({
      page: '房源首页',
      target: '搜索框_input',
      action: 'click',
    })
    props.navigation.navigate('buildingSearch')
  };

  return (
    <View style={styles.m_search_content}>
      <TouchableOpacity onPress={gotoCityList} activeOpacity={0.8} style={styles.m_location_content}>
        <Image style={styles.m_location_icon} source={location_icon} />
        <Text style={styles.m_location_text}>
          {props.projectLocation.cityName || props.projectLocation.defaultCityName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}
        onPress={gotoBuildingSearch}
        style={styles.m_search_container}>
        <Image style={styles.m_search_icon} source={search_icon} />
        <Text style={styles.m_search_text}>请输入楼盘名或区域</Text>
      </TouchableOpacity>
    </View>
  )
};
const mapStateToProps = ({ config, point, projectLocation }: any) => {
  return {
    config,
    projectLocation,
    sendPoint: point.buryingPoint
  }
};
export default connect(mapStateToProps)(MainHeader)
