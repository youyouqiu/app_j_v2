/**
 * Created by Kary on 2020/05/25 15:37.
 */

import React, {PureComponent} from 'react';
import {
  DeviceEventEmitter,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  EmitterSubscription,
  Modal,
  StyleSheet
} from 'react-native';
import {MapView} from 'react-native-baidumap-sdk'
import Page from "@/components/Page";
import {connect, DispatchProp} from "react-redux";
import {ConnectState} from "@/models/connect";
import API_mapSearch, {
  mapSearchResponseExtension,
  mapSearchRequest,
  shopPriceType, districtListParam, handleDistrictList
} from '@/services/mapHouse/mapSearch'
import styles from "./styles";
import {NavigationScreenProps, FlatList} from 'react-navigation'
import {SwitchView} from "@/components/new-space";
import LabelCheckBox from "@/components/LabelCheckBox";
import PriceChoiceModal from "@/businessComponents/choice/priceChoice/priceChoiceModal";
import ChoicePrice from "@/businessComponents/choice/priceChoice/priceChoice";
import AreaChoiceModal from '@/businessComponents/choice/areaChoice/areaChoiceModal'
import ChoiceArea from '@/businessComponents/choice/areaChoice/areaChoice'
import {IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import {IModalPriceChoiceOnChangeType} from "@/businessComponents/choice/priceChoice/types";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import {Toast} from '@new-space/teaset';
import {getBaiduAreaCode} from "@/services/getBaiduAreaCode";
import request from "@/utils/request";
import API_getBuildList, {IBuildingPreview} from '@/services/building/buildingList';
import WebViewScreen from './mapWebView'
import {scaleSize} from "@/utils/screenUtil";
import BuildingPreview from '@/businessComponents/BuildingPreview';
import Selector from "@/components/Selector";

type locationParam = {
  accuracy?: number;
  latitude: number;
  longitude: number;
  direction: number;
};

type mapHouseProps = {
  projectLocation: any
} & DispatchProp & ConnectState & NavigationScreenProps


interface mapHouseStates {
  selectId: string|null
  districtList: districtListParam[]
  areaList: districtListParam[]
  region: IRegionType
  price: IModalPriceChoiceOnChangeType
  area: IChoiceLabelDataPropsType[]
  requestData: mapSearchRequest
  loading: boolean
  visible: boolean
  locationSite: locationParam | undefined
  zoomLevel: number
  regionChange: number
  city: {
    code: string,
    name: string,
    latitude: number
    longitude: number,
  }
}

const DEFAULT_ZOOM_LEVEL = 12;

class MapHouse extends PureComponent<mapHouseProps, mapHouseStates> {
  constructor(props: mapHouseProps) {
    super(props);
    const city = {
      code: props.projectLocation.cityCode || props.projectLocation.defaultCityCode,
      name: props.projectLocation.cityName || props.projectLocation.defaultCityName,
      latitude: props.projectLocation.lat || 29.56502727600978,// 默认定位重庆
      longitude: props.projectLocation.lng || 106.583947244564,
    };
    console.log(city, '城市==');
    let defaultRequestData = new mapSearchRequest();
    defaultRequestData.city = city.code;
    this.state = {
      locationSite: undefined,
      selectId: null,
      districtList: [],
      areaList: [],
      zoomLevel: DEFAULT_ZOOM_LEVEL,
      regionChange: 0,
      region: {
        city: city.code,
        cityName: city.name,
        district: '',
        districtName: '',
        area: [],
        areaName: [],
        regionText: []
      },
      price: {} as IModalPriceChoiceOnChangeType,
      area: [] as IChoiceLabelDataPropsType[],
      requestData: defaultRequestData,
      loading: false,
      visible: false,
      city: city
    };
  }
  regionRank: 1 | 2 | 3 = 1;// 地区级别 城市|区域/街道
  listener: EmitterSubscription | null = null;
  dataSource: mapSearchResponseExtension[] = [];
  positionList: { code?: string, location: { lat: number, lng: number } }[] = [];
  buildList: IBuildingPreview[] = [];

  async componentDidMount() {
    this.getCurrentCoordinate();
    this.getMarkerList();
    this.listener = DeviceEventEmitter.addListener('mapHouseHistorySearch', (param: { region: IRegionType }) => {
      param.region.district && this.props.dispatch({
        type: 'global/getBuildingCityScreenByCityCode',
        payload: {_public: request.getUrl().public, code: param.region.district}
      });
      this.handleRegionChange(param.region)
    });
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  getMarkerList = async (requestData?: mapSearchRequest) => {
    try {
      let res = await API_mapSearch(requestData || this.state.requestData);
      console.log(res, 'mapSearchResponse');
      const list = res.extension || [];
      const district_list = list.reduce((res, curr) => {
        res.push({code: curr.districtCode, name: curr.districtName});
        return res;
      }, [] as { code: string, name: string }[]);
      const positionList = await this.getDistrictPosition(district_list);
      this.dataSource = list;
      this.positionList = positionList;
      this.setState({districtList: this.handleDataSource(list)});
    } catch (e) {
      Toast.message(`请求失败，请稍后重试:${e.message}`);
      console.log(e, '找房失败')
    }
  };

  handleDataSource = (data?: mapSearchResponseExtension[]): districtListParam[] => {
    const list = data || this.dataSource;
    const positionList = this.positionList;
    let districtList: districtListParam[] = [];
    console.log(this.state.zoomLevel, 'handleDataSource');
    if (this.state.zoomLevel <= DEFAULT_ZOOM_LEVEL) {// 区域
      districtList = list.reduce((res, curr) => {
        let item: districtListParam[] = [];
        if (curr.districtName.indexOf('其它') >= 0) {
          item.push(...handleDistrictList([curr]));
        } else {
          let position = positionList.find(_item => _item.code === curr.districtCode)!;
          item = [{
            id: curr.districtCode,
            name: curr.districtName,
            number: curr.buildingTreeNumber,
            longitude: position?.location?.lng,
            latitude: position?.location?.lat,
            level: 'region'
          }];
        }
        res.push(...item);
        return res
      }, [] as districtListParam[]);
    } else {// 项目
      districtList = list.reduce((res, curr) => {
        let item: districtListParam[] = [];
        item.push(...handleDistrictList([curr]));
        res.push(...item);
        return res;
      }, [] as districtListParam[]);
    }
    return districtList
  };

  getDistrictPosition = (list: { code?: string, name: string }[]): Promise<{ code?: string, location: { lat: number, lng: number } }[]> => {
    let _interface: any = [];
    const cityName = this.state.city.name + '市';
    list.forEach((curr) => {
      _interface.push(new Promise((resolve) => {
        getBaiduAreaCode(cityName, curr.name)
          .then((res) => {
            resolve({code: curr.code, location: res.result.location})
          })
          .catch(_error => {
            resolve({code: curr.code, location: {lat: 0, lng: 0}})
          })
      }))
    });
    return Promise.all(_interface)
  };

  getCurrentCoordinate = async () => {
    const location = await this.getDistrictPosition([{name: `${this.state.city.name}市` || '重庆市'}]);
    await this.setState((prev) => ({
      city: {
        ...prev.city,
        latitude: location[0].location.lat,
        longitude: location[0].location.lng,
      }
    }));
    console.log(this.state.city, 'getCurrentCoordinate')
  };

  getAreaBuilds = (item: districtListParam) => {
    this.props.dispatch({
      type: 'global/getBuildingCityScreenByCityCode',
      payload: {_public: request.getUrl().public, code: item.id}
    });
    this.handleRegionChange({
      ...this.state.region,
      district: item.id,
      districtName: item.name,
      area: [],
      areaName: [],
      regionText: [item.name]
    })
  };

  getBuildingDetails = (buildingTreeId: string) => {
    buildingTreeId && this.props.navigation.navigate('buildingDetail', {buildingTreeId})
  };

  getBuildList = async (param: districtListParam) => {
    try {
      const res = await API_getBuildList.postBuildingList({buildingTreeIds: param.buildingTreeIds});
      this.buildList = res.extension || [];
      await this.setState({visible: true, selectId: param.id});
    } catch (e) {

    }
  };

  changeRegionLoading = false;
  handleRegionChange = async (params: IRegionType) => {
    console.log(params, 'params  handleRegionChange');
    try {
      this.changeRegionLoading = true;
      let name = '';
      if (params.city) {
        name = params.cityName + '市';
        this.regionRank = 1;
        if (params.district && params.district.indexOf('_') < 0) {
          name = params.cityName + '市' + params.districtName;
          this.regionRank = 2;
        }
      }
      const zoomLevel = this.regionRank === 1 ? DEFAULT_ZOOM_LEVEL : DEFAULT_ZOOM_LEVEL + 1;
      const code = await this.getDistrictPosition([{name: name}]);
      await this.setState((prev) => ({
        region: params,
        zoomLevel: zoomLevel,
        // regionChange: prev.regionChange + 1,
        selectId: this.regionRank === 1 ? params.city : params.district,
        city: {
          ...prev.city,
          latitude: code[0].location.lat,
          longitude: code[0].location.lng,
        },
        requestData: {
          ...prev.requestData,
        }
      }));
      console.log(this.regionRank, zoomLevel, name, this.state.selectId, 'handleRegionChange');
      const districtList = this.handleDataSource();
      await this.setState({districtList: districtList});
    } catch (e) {
      console.log(e, 'error')
    } finally {
      setTimeout(() => {// 防止触发onStatusChange 重复渲染
        this.changeRegionLoading = false
      }, 2500)
    }
  };

  arrayCompare = (source: any, target: any) => {
    return source.length == target.length && source.every((item: any, index: number) => item.op == target[index].op)
  };

  onStatusChange = async (zoomLevel: number) => {
    if (this.changeRegionLoading) return;
    console.log(zoomLevel, '缩放 onStatusChange', this.changeRegionLoading);
    try {
      await this.setState({zoomLevel: zoomLevel});
      const _districtList = this.state.districtList;
      const districtList = this.handleDataSource();
      const result = this.arrayCompare(_districtList, districtList);
      !result && await this.setState({districtList: districtList});
    } catch (e) {
      console.log(e, 'onStatusChange')
    } finally {
    }
  };

  _formatPrice = (value: string, rate: number, arr: shopPriceType[]) => {
    const price = value.split('-');
    arr.push({
      minPrice: parseInt(price[0]) * rate || 0,
      maxPrice: parseInt(price[1]) * rate || 0x7fffffff,
    })
  };

  handlePriceChange = (params: IModalPriceChoiceOnChangeType) => {
    let buildingTreeTotalPrices: shopPriceType[] = [];
    let buildingTreeUnitPrices: shopPriceType[] = [];
    params.total.forEach(i => this._formatPrice(i.value as string, 1, buildingTreeTotalPrices));
    params.unit.forEach(i => this._formatPrice(i.value as string, 10000, buildingTreeUnitPrices));
    this.setState((prev) => ({
      price: params,
      requestData: {
        ...prev.requestData,
        buildingTreeTotalPrices: buildingTreeTotalPrices,
        buildingTreeUnitPrices: buildingTreeUnitPrices
      }
    }), this.getMarkerList)
  };

  handleAreaChange = (params: IChoiceLabelDataPropsType[]) => {
    const buildingTreeAreas = params.map(i => {
      const area = (i.value as string).split('-');
      return {
        minArea: parseInt(area[0]) || 0,
        maxArea: parseInt(area[1]) || 0x7fffffff,
      }
    });
    this.setState((prev) => ({
      area: params,
      requestData: {...prev.requestData, buildingTreeAreas: buildingTreeAreas}
    }), this.getMarkerList);
  };

  choiceLabelsOnChange = ({name, value}: { name?: string, value: boolean | number | string | undefined | null }) => {
    this.setState((prev) => ({
      requestData: {...prev.requestData, [name!]: value}
    }), this.getMarkerList)
  };

  goSearch = () => {
    this.props.navigation.navigate('mapHouseHistory')
  };

  setSelectModal = (visible: boolean) => {
    this.setState({
      visible
    })
  };

  render(): React.ReactNode {
    const {districtList, city, visible, selectId, regionChange, zoomLevel, region} = this.state;
    const {price, area} = this.state;
    return <Page scroll={false} title="地图找铺"
                 rightView={(<TouchableOpacity style={styles['search-icon-view']} onPress={this.goSearch}>
                   <Image style={styles['search-icon-img']} source={require('@/images/icons/search.png')}/>
                 </TouchableOpacity>)}>
      <View style={styles['search-view']}>
        <View style={styles['search-view-screen-1']}>
          <Selector
            style={styles['filters-rank']}
            name='treeCategory'
            onChange={this.choiceLabelsOnChange}
            selection={[
              {label: '不限', value: '',},
              {label: '商铺', value: 1},
              {label: '车库', value: 2},
              {label: '写字楼', value: 3},
              {label: '公寓', value: 4},
            ]}
            >
            { ({item, isOpen}) => <>
                <Text style={[styles['filters-rank-text'], isOpen ? { color: '#1F3070' } : null]} numberOfLines={1}>{!item.value ? '类型' : item.label}</Text>
                <Image style={styles['filters-rank-img']} source={isOpen ? require('@/images/icons/more_open.png') : require('@/images/icons/more_close.png')} />
            </>}
          </Selector>
          <PriceChoiceModal
            label='价格'
            totalPriceSelectValues={price.total}
            unitPriceSelectValues={price.unit}
            onConfirm={this.handlePriceChange}
            content={<ChoicePrice/>}/>
          <AreaChoiceModal
            areaSelectValues={area}
            onConfirm={this.handleAreaChange}
            label='建面'
            content={<ChoiceArea/>}/>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles['scroll-view']}
                    contentContainerStyle={styles['filters-row2-scroll']}>
          <LabelCheckBox label='独家'
                         separator
                         name='projectType'
                         onChange={({name, value}) => {
                           this.choiceLabelsOnChange({name, value: value ? 1 : null})
                         }}/>
          <LabelCheckBox label='佣金高'
                         name='maxCommission'
                         separator
                         onChange={this.choiceLabelsOnChange}/>
          <LabelCheckBox label='现金奖'
                         name='cashPrize'
                         separator
                         onChange={this.choiceLabelsOnChange}/>
          <LabelCheckBox label='近期开盘'
                         name='batelyBegin'
                         separator
                         onChange={this.choiceLabelsOnChange}/>
          <LabelCheckBox label='有优惠'
                         name='discounts'
                         separator
                         onChange={this.choiceLabelsOnChange}/>
        </ScrollView>
      </View>
      <WebViewScreen config={this.props.config} selectId={selectId} zoomLevel={zoomLevel} region={region} city={city} districtList={districtList} getBuildList={this.getBuildList}
                     getAreaBuilds={this.getAreaBuilds} getBuildingDetails={(buildingTreeId) => {
                          this.setState({selectId: buildingTreeId});
                          this.getBuildingDetails(buildingTreeId)
                     }}
                     onZoomEnd={this.onStatusChange}/>
      <Modal
        visible={visible}
        transparent={true}
      >
        <TouchableOpacity onPress={() => {
          this.setSelectModal(false)
        }} activeOpacity={1} style={styles['modal-view']}>
          <View style={styles['modal-view-bg']}>
            <View style={styles['modal-line']}/>
            <TouchableOpacity activeOpacity={1} style={styles['modal-content']}>
              <FlatList
                data={this.buildList}
                style={{maxHeight: scaleSize(720)}}
                keyExtractor={(_, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}: any) => {
                  return <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.setSelectModal(false);
                    this.getBuildingDetails(item.buildingTreeId);
                  }} style={[{flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, paddingHorizontal: scaleSize(24), borderBottomColor: '#EAEAEA'}]}>
                    <BuildingPreview data={item}/>
                  </TouchableOpacity>
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Page>
  }
}

const mapStateToProps = ({user, point, config, projectLocation}: mapHouseProps) => ({
  user,
  config,
  point,
  projectLocation
});
export default connect(mapStateToProps)(MapHouse)
