import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, Linking, Text, ScrollView} from 'react-native';
import {Location, MapView} from 'react-native-baidumap-sdk'
import {XActionSheet} from "../../components/XActionSheet";
import Page from "../../components/Page";
import {scaleSize} from "../../utils/screenUtil";
import {connect} from "react-redux";
import Toast from 'teaset/components/Toast/Toast'
import projectService from "../../services/projectService";
import {aroundType} from '../../pages/project/buildingDetail/buildJson'
import {mapSearch} from '../../utils/mapServerApi'
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view'

// import {} from '@new'

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
        }).catch(e => {
            console.log(e, 'eee')
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
        this.setState(prev => ({
            latitude: prev.latitude + parseFloat((Math.random() * 0.0001).toFixed(5)),
            longitude: prev.longitude,
            random: Math.random()
        }))
    };

    // 获取周边配套信息
    getAroundMatching = async() => {
        let {latitude, longitude} = this.state
        let list = []
        aroundType.map(item => {
            let a = new Promise((resolve) => {
                mapSearch(latitude, longitude, item.label, 10).then(res => {
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
    }

    openMapUrl = (url, param) => {
        Linking.openURL(url).catch(e => {
            this.modalToggle();
            Toast.message(param + '打开失败' + e.message);
        })
    };

    renderTabBar = (props) => {
        return <View style={mapStyle.renderTabBar}>
            {props.tabs.map((item, i) => {
                return <TouchableOpacity activeOpacity={0.9} style={mapStyle.renderTabBarItem} key={item.key} onPress={() => props.goToPage(i)}>
                    <Image style={mapStyle.itemIcon} source={item.icon}/>
                    <Text style={[mapStyle.itemText, {color: props.activeTab === i ? '#1DA873' : '#868686'}]}>{item.label}</Text>
                </TouchableOpacity>
            })}
        </View>
    }

    render() {
        const {latitude, longitude, visible, name, aroundMatchingValue, cuurValue} = this.state;
        let cuurValueList = cuurValue.value || []
        const {mapList} = this.common;
        const markerView = (source, style) => { return <Image style={[mapStyle.ms_marker_icon, style]} source={source || require('../../images/icons/map_red.png')}/>};
        return (
            <Page scroll={false} title={name}>
                <View style={mapStyle.ms_wrapper}>
                    <MapView style={mapStyle.ms_map_view}
                             zoomControlsDisabled={true}
                             center={{latitude: latitude, longitude: longitude}}
                             zoomLevel={15}>
                        <MapView.Marker coordinate={{latitude: latitude, longitude: longitude}}
                                        view={() => (markerView())}/>
                        {
                            cuurValueList.map((item, i) => {
                                let {location = {}} = item
                                return <MapView.Marker key={i} coordinate={{latitude: location.lat, longitude: location.lng}}
                                view={() => (markerView(cuurValue.mapIcon, {width: scaleSize(48), height: scaleSize(58)}))}/>
                            })
                        }
                    </MapView>
                    <TouchableOpacity style={{position: 'absolute', bottom: '32%', right: scaleSize(30), padding: scaleSize(10)}}
                                      onPress={this.gotoCenter}>
                        <Image style={{width: scaleSize(55), height: scaleSize(55),}}
                               source={require('../../images/icons/dingwei.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: 'absolute', bottom: '32%', right: scaleSize(120), padding: scaleSize(10)}} onPress={this.modalToggle}>
                        <Image style={{width: scaleSize(55), height: scaleSize(55),}} source={require('../../images/icons/lubiao.png')}/>
                    </TouchableOpacity>
                    <ScrollableTabView
                        renderTabBar={(props) => this.renderTabBar(props)}
                        tabBarBackgroundColor='white'
                        tabBarInactiveTextColor={'#4D4D4D'}
                        tabBarActiveTextColor={'#1F3070'}
                        onChangeTab={this._onChangeTab}
                        style={{paddingBottom: scaleSize(20)}}
                    >
                        {
                            aroundMatchingValue.map((curr, cruuindex) => {
                                let value = curr.value
                                if (!value || (value && value.length === 0)) return <View  style={mapStyle.noData} tabLabel={curr}  key={cruuindex}>
                                    <Text style={mapStyle.noDataText}>周围2公里内没有更多数据了~</Text>
                                </View>
                                return <ScrollView tabLabel={curr} key={cruuindex} style={{width: '100%'}}>
                                {   
                                    value.map((item, index) => {
                                        return <View style={mapStyle.valueItem} key={index}>
                                            <View style={mapStyle.valueItemLeft}>
                                                <Text style={mapStyle.valueItemName} numberOfLines={1}>{item.name}</Text>
                                                <Text style={mapStyle.address} numberOfLines={1}>{item.address}</Text>
                                            </View>
                                            <View style={mapStyle.valueItemRight}>
                                                <Image style={mapStyle.addressIcon} source={require('../../images/icons/address.png')}/>
                                                <Text style={mapStyle.distance}>{item.detail_info.distance}m</Text>
                                            </View>
                                        </View>
                                    })
                                }
                            </ScrollView>})
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

const mapStyle = StyleSheet.create({
    noDataText: {
        color: '#868686'
    },
    noData: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    address: {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    addressIcon: {
        width: scaleSize(32),
        height: scaleSize(32)
    },
    distance: {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    valueItemName: {
        fontSize: scaleSize(28),
        color: '#000000',
        marginBottom: scaleSize(10)
    },
    valueItemRight: {
        flex: 0,
        flexDirection: 'row'
    },
    valueItemLeft: {
        flex: 1,
        flexDirection: 'column'
    },
    valueItem: {
        display: 'flex',
        flexDirection: 'row', 
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16)
    },
    itemText: {
        fontSize: scaleSize(24),
    },
    itemIcon: {
        width: scaleSize(32),
        height: scaleSize(32)
    },
    renderTabBarItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
        paddingTop: scaleSize(12),
        paddingBottom: scaleSize(12),
        flex: 1
    },
    renderTabBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: scaleSize(90)
    },
    ms_wrapper: {
        flexDirection: 'column',
        height: '100%',
    },
    ms_map_view: {
        width: '100%',
        height: '70%'
    },
    ms_marker_icon: {
        width: scaleSize(82),
        height: scaleSize(82)
    },
    ms_footer: {
        height: scaleSize(150),
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
        flexDirection: 'row', alignItems: 'center'
    },
    ms_footer_left: {
        flex: 1
    },
    ms_footer_text1: {
        fontSize: scaleSize(32),
        color: '#494A4C'
    },
    ms_footer_text2: {
        fontSize: scaleSize(28),
        color: '#868686',
        paddingTop: scaleSize(10)
    },
    ms_footer_right_icon: {
        width: scaleSize(100),
        height: scaleSize(100)
    },
});

