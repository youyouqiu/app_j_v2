import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, Linking, Text, ScrollView} from 'react-native';
import {Location, MapView} from 'react-native-baidumap-sdk'
import {XActionSheet} from "../../components/XActionSheet";
import Page from "../../components/Page";
import {scaleSize} from "../../utils/screenUtil";
import {connect} from "react-redux";
import Toast from '@new-space/teaset/components/Toast/Toast'
import projectService from "../../services/projectService";
import {aroundType} from '@/pages/project/newBuildingDetail/buildJson'
import {mapSearch} from '../../utils/mapServerApi'
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view'
import Shadow from '../../components/Shadow'

import styles from './styles'

let serviceUrl = {
  baidu: Platform.OS === 'ios' ? 'baidumap://' : 'baidumap://map/direction',
  qq: 'qqmap://',
  gaode: Platform.OS === 'ios' ? 'iosamap://' : 'amapuri://',
};

class BaiduMap extends Component {


  constructor(props) {
    super(props);
    const {latitude, longitude, name, address, txLatitude, txLongitude} = props.navigation.state.params;
    this.state = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      txLatitude: parseFloat(txLatitude),
      txLongitude: parseFloat(txLongitude),
      activeId: '',
      name: name,
      address: address,
      cuurValue: {
        value: []
      },
      visible: false,
      aroundMatchingValue: aroundType
    };
    this.common = {
      haveGDMap: false,
      haveBDMap: false,
      haveQQMap: false,
      selfLatitude: 0,
      selfLongitude: 0,
      mapList: []
    }
  }

  componentDidMount() {
    //检测是否安装百度地图
    Linking.canOpenURL(serviceUrl.baidu).then(supported => {
      supported ? this.common.mapList.push('百度地图') : null;
    }).catch(() => {
    });
    //检测是否安装腾讯地图
    Linking.canOpenURL(serviceUrl.qq).then(supported => {
      supported ? this.common.mapList.push('腾讯地图') : null;
    });
    //检测是否安装高德地图
    Linking.canOpenURL(serviceUrl.gaode).then(supported => {
      supported ? this.common.mapList.push('高德地图') : null;
    });
    if (Platform.OS === 'ios') {
      this.common.mapList.push('本机地图')
    }
    this.getAroundMatching()
    this.getCurrentCoordinate();
  }

  gotoCenter = () => {
    const {latitude, longitude} = this.props.navigation.state.params;
    this.setState(() => ({
      latitude: parseFloat(latitude) + parseFloat((Math.random() * 0.0001).toFixed(5)),
      longitude: parseFloat(longitude),
      random: Math.random()
    }))
  };

  // 获取周边配套信息
  getAroundMatching = async () => {
    let {latitude, longitude} = this.state
    let list = []
    aroundType.map(item => {
      let a = new Promise((resolve) => {
        mapSearch(latitude, longitude, item.label, 10, item.tag).then(res => {
          if (res.message === 'ok' && res.total > 0) {
            resolve({key: item.key, value: res.results, ...item})
          } else {
            resolve({key: item.key, value: [], ...item})
          }
          // eslint-disable-next-line no-unused-vars
        }).catch(e => {
          resolve({key: item.key, value: [], ...item})
        })
      })
      list.push(a)
    })
    Promise.all(list).then(values => {
      this.setState({
        aroundMatchingValue: values
      }, () => {
        this.setCuurValue(0)
      })
    })
  }

  getCurrentCoordinate = async () => {
    await Location.init();
    // eslint-disable-next-line no-unused-vars
    let locationListener = Location.addLocationListener(async (location) => {
      const {latitude, longitude} = location;
      const res = await projectService.baiduTotx(latitude, longitude);
      if (res.status === 0) {
        this.common.selfLatitude = res.locations[0].lat;
        this.common.selfLongitude = res.locations[0].lng;
      }
      Location.stop();
      locationListener = null
    });
    Location.start()
  };

  modalToggle = () => {
    const {latitude, longitude, address, txLatitude, txLongitude, name} = this.state;
    const {selfLatitude, selfLongitude} = this.common;
    if (this.common.mapList.length === 0) {
      if (Platform.OS === 'ios') {
        Linking.openURL(`http://maps.apple.com/?ll=${latitude},${longitude}&q=${address}`).catch(err => {
          Toast.fail(`打开地图失败:${err.message}`);
        })
      } else {
        if (selfLatitude === 0) {
          Toast.message('坐标获取失败，请重试');
          this.setState({visible: false})
        } else {
          const mapData = {longitude, name, selfLatitude, selfLongitude, txLatitude, txLongitude};
          this.props.navigation.navigate('mapWebView', {...mapData})
        }
      }
      return
    }
    this.setState(prev => ({
      visible: !prev.visible
    }))
  };

  onSelect = (item) => {
    this.setState({visible: false});
    const {latitude, longitude, name, address, txLatitude, txLongitude} = this.state;
    if (item === '高德地图') {
      let iosUrl = `iosamap://path?sourceApplication=applicationName&did=BGVIS2&dlat=${txLatitude}&dlon=${txLongitude}&dname=${address}&dev=0&t=0`;
      let androidUrl = `amapuri://route/plan/?did=BGVIS2&dlat=${txLatitude}&dlon=${txLongitude}&dname=${address}&dev=0&t=0`;
      this.openMapUrl(Platform.OS === 'ios' ? iosUrl : androidUrl, item)
    } else if (item === '百度地图') {
      let url = `baidumap://map/direction?destination=name:${name}|latlng:${latitude},${longitude}&coord_type=bd09ll&mode=driving&src=baidu.openAPIdemo`;
      this.openMapUrl(url, item)
    } else if (item === '腾讯地图') {
      let url = `qqmap://map/routeplan?type=drive&to=${name}&tocoord=${txLatitude},${txLongitude}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
      this.openMapUrl(url, item)
    } else if (item === '本机地图') {
      let url = `http://maps.apple.com/?ll=${latitude},${longitude}&q=${address}`;
      this.openMapUrl(url, item)
    }
  };

  _onChangeTab = (item) => {
    this.setCuurValue(item.i)
  }

  setCuurValue = (index) => {
    let {aroundMatchingValue} = this.state
    let cuurValue = aroundMatchingValue[index] || {}
    this.setState({
      cuurValue: cuurValue
    })
  };


  setCurrentItemActive = (item, index) => {
    let {cuurValue} = this.state;
    let cuurValueList = cuurValue.value || [];
    this.setState({
      activeId: cuurValueList[index].uid,
      latitude: item.location.lat,
      longitude: item.location.lng
    })
  };

  openMapUrl = (url, param) => {
    Linking.openURL(url).catch(e => {
      this.modalToggle();
      Toast.message(param + '打开失败' + e.message);
    })
  };

  renderTabBar = ({tabs, goToPage, activeTab}) => {
    return <View style={styles.renderTabBar}>
      {tabs.map((tab, i) => {
        return <TouchableOpacity activeOpacity={0.9} style={styles.renderTabBarItem} key={tab.key} onPress={() => goToPage(i)}>
          <Image style={styles.itemIcon} source={tab.icon}/>
          <Text style={[styles.itemText, {color: activeTab === i ? '#1F3070' : '#868686'}]}>{tab.label}</Text>
        </TouchableOpacity>
      })}
    </View>
  };


  render() {
    const {latitude, longitude, visible, name, aroundMatchingValue, cuurValue, activeId} = this.state;
    const selfLatitude = parseFloat(this.props.navigation.state.params.latitude);
    const selfLongitude = parseFloat(this.props.navigation.state.params.longitude);
    let cuurValueList = cuurValue.value || []
    const {mapList} = this.common;
    const markerView = (source, style) => {
      return (
        <TouchableOpacity activeOpacity={1}>
          <Image style={[styles.ms_marker_icon, style]} source={source || require('../../images/icons/map_red.png')}/>
        </TouchableOpacity>
      )
    };
    return (
      <Page scroll={false} title={name}>
        <View style={styles.ms_wrapper}>
          <MapView style={styles.ms_map_view}
                   zoomControlsDisabled={true}
                   center={{latitude: latitude, longitude: longitude}}
                   zoomLevel={15}>

            <MapView.Marker selected={false}
                            coordinate={{latitude: selfLatitude, longitude: selfLongitude}}
                            view={() => (markerView())}/>

            {cuurValueList.map((item, i) => {
              let {location = {}} = item;
              return (
                <MapView.Marker key={i}
                                selected={item.uid === activeId}
                                coordinate={{latitude: location.lat, longitude: location.lng}}
                                view={() => markerView(cuurValue.mapIcon, styles.markerView)}>
                  <MapView.Callout>
                    <Shadow
                      style={[styles.mapView_callout_shadow, {marginLeft: Platform.OS === 'ios' ? ((item.name || '').length * scaleSize(11) * -1) : 0,}]}>
                      <Text style={{fontSize: scaleSize(22)}} numberOfLines={1}>{item.name}</Text>
                    </Shadow>
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
          </MapView>

          {/**重新定位*/}
          <TouchableOpacity style={styles.current_location} onPress={this.gotoCenter}>
            <Image style={styles.current_location_icon} source={require('../../images/icons/dingwei.png')}/>
          </TouchableOpacity>

          {/**导航*/}
          <TouchableOpacity style={styles.current_navigation} onPress={this.modalToggle}>
            <Image style={styles.current_location_icon} source={require('../../images/icons/navigation.png')}/>
          </TouchableOpacity>

          <ScrollableTabView renderTabBar={(props) => this.renderTabBar(props)}
                             tabBarBackgroundColor='white'
                             tabBarInactiveTextColor={'#4D4D4D'}
                             tabBarActiveTextColor={'#1F3070'}
                             onChangeTab={this._onChangeTab}
                             style={{paddingBottom: scaleSize(20)}}>
            {aroundMatchingValue.map((curr, cruuindex) => {
                let value = curr.value;
                if (!value || (value && value.length === 0)) return (
                  <View style={styles.noData} data-value={curr} key={cruuindex}>
                    <Text style={styles.noDataText}>周围2公里内没有更多数据了~</Text>
                  </View>
                );
                return (
                  <ScrollView data-value={curr} key={cruuindex} style={{width: '100%'}}>
                    {value.map((item, index) => {
                      let active = item.uid === activeId;
                      return (
                        <TouchableOpacity onPress={() => this.setCurrentItemActive(item, index)} activeOpacity={0.8}
                                          style={styles.valueItem} key={index}>
                          <View style={styles.valueItemLeft}>
                            <Text style={[styles.valueItemName, active ? {color: '#1F3070'} : {}]}
                                  numberOfLines={1}>{item.name}</Text>
                            <Text style={[styles.address, active ? {color: '#1F3070'} : {}]}
                                  numberOfLines={1}>{item.address}</Text>
                          </View>
                          <View style={styles.valueItemRight}>
                            <Image style={styles.addressIcon} source={require('../../images/icons/address.png')}/>
                            <Text style={[styles.distance, active ? {color: '#1F3070'} : {}]}>{item.detail_info.distance}m</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                )
              })
            }
          </ScrollableTabView>
          <XActionSheet data={mapList} visible={visible} onSelect={this.onSelect}
                        onClose={this.modalToggle}/>
        </View>
      </Page>
    )
  }
}

const mapStateToProps = ({config}) => {
  return {
    requestUrl: config.requestUrl
  }
};

export default connect(mapStateToProps)(BaiduMap)

export const mapStyle = StyleSheet.create({});

