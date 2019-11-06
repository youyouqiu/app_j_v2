import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking, TextInput} from 'react-native';
import {Location, MapView} from 'react-native-baidumap-sdk'
import {XActionSheet} from "../../components/XActionSheet";
import Page from "../../components/Page";
import {scaleSize} from "../../utils/screenUtil";
import {connect} from "react-redux";
import Toast from 'teaset/components/Toast/Toast'
import projectService from "../../services/projectService";

let serviceUrl = {
    baidu: Platform.OS === 'ios' ? 'baidumap://' : 'baidumap://map/direction',
    qq: 'qqmap://',
    gaode: Platform.OS === 'ios' ? 'iosamap://' : 'amapuri://',
};

class BaiduMap extends Component {


    constructor(props) {
        super(props);
        console.log('props', props);
        const {latitude, longitude, name, address, txLatitude, txLongitude} = props.navigation.state.params;
        this.state = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            txLatitude: parseFloat(txLatitude),
            txLongitude: parseFloat(txLongitude),
            name: name,
            address: address,
            visible: false,
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
            console.log('gaode', supported);
            supported ? this.common.mapList.push('高德地图') : null;
        });
        if (Platform.OS === 'ios') {
            this.common.mapList.push('本机地图')
        }
        this.getCurrentCoordinate();
    }

    gotoCenter = () => {
        this.setState(prev => ({
            latitude: prev.latitude + parseFloat((Math.random() * 0.0001).toFixed(5)),
            longitude: prev.longitude,
            random: Math.random()
        }))
    };

    getCurrentCoordinate = async () => {
        await Location.init();
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
                    Toast.fail('打开地图失败');
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

    onSelect = (item, idx) => {
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

    openMapUrl = (url, param) => {
        Linking.openURL(url).catch(err => {
            this.modalToggle();
            Toast.message(param + '打开失败');
        })
    };

    render() {
        const {latitude, longitude, visible, name, address,} = this.state;
        const {mapList} = this.common;
        const markerView = <Image style={mapStyle.ms_marker_icon} source={require('../../images/icons/map_location.png')}/>;
        return (
            <Page scroll={false} title='地图服务'>
                <View style={mapStyle.ms_wrapper}>
                    <MapView style={mapStyle.ms_map_view}
                             zoomControlsDisabled={true}
                             center={{latitude: latitude, longitude: longitude}}
                             zoomLevel={15}>
                        <MapView.Marker coordinate={{latitude: latitude, longitude: longitude}}
                                        view={() => (markerView)}/>
                    </MapView>
                    <TouchableOpacity style={{position: 'absolute', bottom: scaleSize(180), right: scaleSize(30)}}
                                      onPress={this.gotoCenter}>
                        <Image style={{width: scaleSize(55), height: scaleSize(55),}}
                               source={require('../../images/icons/dingwei.png')}/>
                    </TouchableOpacity>
                    <View style={mapStyle.ms_footer}>
                        <View style={mapStyle.ms_footer_left}>
                            <Text numberOfLines={1} style={mapStyle.ms_footer_text1}>{name}</Text>
                            <Text numberOfLines={1} style={mapStyle.ms_footer_text2}>{address}</Text>
                        </View>
                        <TouchableOpacity onPress={this.modalToggle}>
                            <Image source={require('../../images/icons/lubiao.png')}
                                   style={mapStyle.ms_footer_right_icon}/>
                        </TouchableOpacity>
                    </View>
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
    ms_wrapper: {
        flexDirection: 'column',
        height: '100%',
    },
    ms_map_view: {
        width: '100%',
        height: '100%'
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

