import React, {PureComponent} from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {TouchableOpacity, Text, DeviceEventEmitter} from "react-native";
import Search from "@/businessComponents/Search";
import {ConnectState} from "@/models/connect";
import {connect} from 'react-redux';
import {
  handleMapAssociateSearchExtension,
  mapAssociateSearch,
  mapAssociateSearchItemParam
} from "@/services/mapHouse/mapAssociateSearch";
import { Toast } from '@new-space/teaset'
import styles from "./styles";
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";

type mapHouseHistoryProps = {
  projectLocation: any
} & NavigationScreenProps & ConnectState

type mapHouseHistoryStates = {
  loading: boolean
  refreshing: boolean
  totalCount: number
  dataSource: mapAssociateSearchItemParam[]
}

class MapHouseHistory extends PureComponent<mapHouseHistoryProps, mapHouseHistoryStates>{
  constructor(props: mapHouseHistoryProps) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      totalCount: 0,
      dataSource: []
    }
  }

  onPressSearch = async (keyword: string) => {
    try {
       const res = await mapAssociateSearch({city: this.props.projectLocation.cityCode || this.props.projectLocation.defaultCityCode, keyWord: keyword});
       console.log(res, 'mapAssociateSearch....');
       const list: mapAssociateSearchItemParam[] = handleMapAssociateSearchExtension(res.extension || []);
       this.setState({
         dataSource: list,
         totalCount: res.totalCount
       })
    } catch (e) {
      Toast.message(`请求失败，请稍后重试:${e.message}`);
      console.log(e, 'mapAssociateSearch-失败')
    } finally {

    }
  };

  onClick = (item: mapAssociateSearchItemParam) => {
    if (item.type === 4) {// 楼盘详情
      this.props.navigation.navigate('buildingDetail', {buildingTreeId: item.buildingTreeId})
    }
    if ([1,2,3].includes(item.type)) {
      this.props.navigation.goBack();
      const {city, cityName, district, districtName, area, areaName} = item;
      let obj: IRegionType = {
        city: '',
        cityName: '',
        district: '',
        districtName: '',
        area: [],
        areaName: [],
        regionText: [],
      };
      if (city && cityName) {
        obj = {
          ...obj,
          city: city,
          cityName: cityName,
          regionText: [cityName],
        };
        if (city && cityName && district && districtName) {
          obj = {
            ...obj,
            city: city,
            cityName: cityName,
            district: district,
            districtName: districtName,
            regionText: [districtName],
          };
          if (city && cityName && district && districtName && area && areaName) {
            obj = {
              city: city,
              cityName: cityName,
              district: district,
              districtName: districtName,
              area: [area],
              areaName: [areaName],
              regionText: [areaName],
            };
          }
        }
      }

      DeviceEventEmitter.emit('mapHouseHistorySearch', {region: obj})
    }
  };

  renderItem = (item: mapAssociateSearchItemParam) => {
    return <TouchableOpacity activeOpacity={0.8} style={styles['item-view']} onPress={() => {this.onClick(item)}}>
      <Text style={styles['type-name']}>{item.label}</Text>
      <Text style={styles['name']} numberOfLines={1}>{item.value}</Text>
      {item.number ? <Text style={styles['number']}>约{item.number}个楼盘</Text>:null}
    </TouchableOpacity>
  };

  render(): React.ReactNode {
    const {loading, refreshing, dataSource, totalCount} = this.state;
    return <Search
      navigation={this.props.navigation}
      type='single'
      placeholder='请输入搜索内容'
      loading={loading}
      refreshing={refreshing}
      total={totalCount}
      associativeSearch={true}
      dataSource={dataSource}
      renderItem={this.renderItem}
      onPressSearch={this.onPressSearch}
      onChangeText={this.onPressSearch}
      onPressHistory={this.onPressSearch}
    />;
  }
}
const mapStateToProps = ({user, point, config, projectLocation}: mapHouseHistoryProps) => ({
  user,
  config,
  point,
  projectLocation
});
export default connect(mapStateToProps)(MapHouseHistory)