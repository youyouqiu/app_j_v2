import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Easing, StatusBar, Image, Animated, FlatList, Platform, ActivityIndicator, RefreshControl,} from 'react-native';
import {connect} from 'react-redux'
import {IndexStyle} from './indexStyle'
import {deviceWidth, scaleSize} from '../../utils/screenUtil';
import QuickEntry from '../../businessComponents/quickEntry'
import ProjectCarousel from './components/projectCarousel';
import projectService from '../../services/projectService';
import {ProjectNum, Trend} from './components/common';
import styles from './styles';
import {extractIdFromUrl} from '../../utils/utils';
import {CONSTANT} from '../../constants';

const LOCATION = require('../../images/icons/map.png');
const SEARCH = require('../../images/icons/seachH.png');

let defaultTop = scaleSize(294)

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarOpacity: new Animated.Value(0),
            searchBarTop: new Animated.Value(defaultTop),
            advertisement: {},
            shopStatus: props.dictionaries.shop_status || [],
            recommendBuildings: [],
            cityName: '',
            cityCode: '',
            refreshing: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {dictionaries, global} = nextProps;
        if (dictionaries.shop_status && (dictionaries.shop_status !== prevState.shopStatus)) {
            return {
                ...prevState,
                refreshing: false,
                shopStatus: dictionaries.shop_status
            }
        }
        if (global.cityCode !== prevState.cityCode) {
            return {
                ...prevState,
                refreshing: false,
                cityName: global.cityName || global.defaultCityName,
                cityCode: global.cityCode || global.defaultCityCode,
            }
        }
        return null
    }

    init = () => {
        const {shopStatus} = this.state;
        this.getCoordinate();
        this.getAdvertisement(); // 因为现在定位数据是从首页拿去的。所以可以直接获取
        if (shopStatus.length === 0) {
            this.getSearchShopAreaDic();
        }
    };

    componentDidMount() {
        this.init();
        setTimeout(() => {
            if (!this.state.cityCode) {
                const {global} = this.props;
                this.setState({
                    cityName: global.defaultCityName,
                    cityCode: global.defaultCityCode,
                }, this.init)
            }
        }, 0);
        this.props.sendPoint.add({target: '页面', page: '房源', action: 'view'})
    };


    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState) {
        if (this.props.global.cityCode !== prevProps.global.cityCode) {
            this.getAdvertisement();
        }
    }

    getCoordinate = async () => {
        const {dispatch, location} = this.props;
        if (location.status === 'error') {
            dispatch({type: 'location/getLocationInfo'});
        }
    };

    getSearchShopAreaDic = () => {
        const {dispatch, config} = this.props;
        dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestUrl: config.requestUrl.public,
                requestData: ['SHOP_STATUS']
            }
        })
    };

    getAdvertisement = async () => {
        const {requestUrl} = this.props.config;
        const {cityCode} = this.state;
        const requestData = {'cityId': cityCode, 'app': 1};
        const response = await projectService.advertisementReq(requestUrl.public, requestData);
        const {RECOMMEND_BUILDING} = response.extension;
        RECOMMEND_BUILDING.length > 0 ? this.getRecommendBuilding(RECOMMEND_BUILDING) : this.setState({recommendBuildings: []});
        this.setState({
            advertisement: response.extension
        })
    };

    getRecommendBuilding = async (RECOMMEND_BUILDING) => {
        const {requestUrl} = this.props.config;
        let buildingTreeIds = [];
        RECOMMEND_BUILDING.map(item => {
            buildingTreeIds.push({
                adId: item.id,
                buildingTreeId: item.link
            })
        });
        const response = await projectService.recommendBuildingReq(requestUrl.api, buildingTreeIds);
        this.setState({recommendBuildings: response.extension});
    };

    gotoBuildingList = () => {
        this.props.navigation.navigate('buildingList');
        this.props.sendPoint.add({
            target: '推荐楼盘全部_button',
            page: '房源'
        })
    };

    advertisementDetail = (item, source) => {
        const {config} = this.props;
        if (!item.link) return;
        const reqParams = {
            adId: item.id,
            app: 1,
            source: Platform.OS === 'ios' ? 1 : 2,
            userId: (this.props.user.userInfo || {}).id,
            cityId: this.state.cityCode
        };
        projectService.addVisitReq(config.requestUrl.public, reqParams);
        if (item.jumpType === 3) {
            this.props.navigation.navigate('buildingDetail', {buildingTreeId: item.link});
        } else {
            if (item.link.includes('.html') && item.link.includes('/html/')) {
                const id = extractIdFromUrl(item.link);
                this.props.navigation.navigate('articleDetail', {url: item.link, id, source});
            }else {
                this.props.navigation.navigate('xkjWebView', {url: item.link, title: item.adName, id: item.id})
            }
        }
        let target = '';
        if (source === CONSTANT.SOURCE.CAROUSEL) {
            target = 'banner_button'
        } else {
            target = '运营板块_button'
        }

        this.props.sendPoint.add({
            target,
            page: '房源',
            action_param: {
                inforid: item.id
            }
        })
    };

    //头部
    _renderItemHead = () => {
        const {advertisement, shopStatus, cityCode, refreshing} = this.state;
        const {BROKER_HOME_TOP = [], BROKER_BANNER = []} = advertisement;
        const {requestUrl} = this.props.config;
        const imgWidth = (deviceWidth - scaleSize(88)) / 2;
        const imgHeight = imgWidth * 175 / 200;
        return (
            <View>
                <ProjectCarousel BROKER_HOME_TOP={BROKER_HOME_TOP} advertisementDetail={this.advertisementDetail}/>

                <View style={[styles.fy_contentView]}>
                    <Trend refreshing={refreshing} cityCode={cityCode} requestUrl={requestUrl}/>
                    <ProjectNum refreshing={refreshing} cityCode={cityCode} requestUrl={requestUrl} shopStatus={shopStatus}/>
                </View>

                <View>
                    <View style={styles.fy_bannerContent}>
                        {BROKER_BANNER.length > 0 && BROKER_BANNER.map(item => (
                            <TouchableOpacity key={item.id} style={styles.fy_bannerItem} onPress={() => this.advertisementDetail(item, CONSTANT.SOURCE.BANNER)}
                                              activeOpacity={0.8}>
                                <Image source={{uri: item.cover}} style={{width: imgWidth, height: imgHeight, borderRadius: scaleSize(8)}}/>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.fy_recommend}>
                        <Text style={styles.fy_recommendLeft}>推荐楼盘</Text>
                        <TouchableOpacity onPress={this.gotoBuildingList} activeOpacity={0.8} style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>全部</Text>
                            <Image source={require('../../images/icons/chose.png')} style={{width: scaleSize(30), height: scaleSize(30)}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    _renderItem = ({item}) => {
        const longPicture = item.longPicture ? {uri: item.longPicture} : require('../../images/defaultImage/default_1.png');
        return (
            <TouchableOpacity style={styles.fy_buildingItem} onPress={() => this.gotoBuildingDetail(item)} activeOpacity={0.9}>
                <Image style={styles.fy_buildingImage} source={longPicture}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleSize(16)}}>
                    <Text style={{color: '#000', flex: 1, fontWeight: 'bold', fontSize: scaleSize(32)}} numberOfLines={1}>{item.buildingName}</Text>
                    <Text style={{fontSize: scaleSize(32), color: '#FE5139'}}>
                        {item.minPrice === null && item.maxPrice === null ? '——' : `${item.minPrice}-${item.maxPrice}万`}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: scaleSize(10)}}>
                    <Text style={{color: '#868686', fontSize: scaleSize(24)}}>
                        {item.buildingTreeName}
                    </Text>
                    {item.buildingType ? (
                        <Text style={{
                            color: '#66739B',
                            backgroundColor: '#F4F5F9',
                            borderRadius: scaleSize(2),
                            fontSize: scaleSize(22),
                            paddingRight: scaleSize(8),
                            paddingLeft: scaleSize(8),
                            paddingBottom: scaleSize(4),
                            paddingTop: scaleSize(4)
                        }}>
                            {item.buildingType}
                        </Text>
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    };

    gotoBuildingDetail = (item) => {
        const {config} =this.props;
        const routerParams = {
            buildingId: item.buildingId,
            buildingTreeId: item.buildingTreeId
        };
        this.props.navigation.navigate('buildingDetail', routerParams);
        const reqParams = {
            adId: item.adId,
            app: 1,
            source: Platform.OS === 'ios' ? 1 : 2,
            userId: (this.props.user.userInfo || {}).id,
            cityId: this.state.cityCode
        };
        projectService.addVisitReq(config.requestUrl.public, reqParams);
        this.props.sendPoint.add({
            target: '推荐楼盘详情_button',
            page: '房源',
            action_param: {
                buildingid: item.buildingId
            }
        })
    };

    _onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        Animated.timing(this.state.searchBarOpacity, {
            toValue: offsetY / 150,
            duration: 0,
            easing: Easing.linear,
        }).start();
        Animated.timing(this.state.searchBarTop, {
            toValue: defaultTop - offsetY < 0 ? 0 : defaultTop - offsetY,
            duration: 0,
            easing: Easing.linear,
        }).start();
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getSearchShopAreaDic();
        this.getAdvertisement();
    };


    gotoCityList = () => {
        this.props.navigation.navigate('cityList')
    };

    gotoSearch = () => {
        this.props.navigation.navigate('buildingSearch')
    };

    // eslint-disable-next-line no-unused-vars
    _keyExtractor = (item, index) => index.toString();

    render() {
        let {searchBarOpacity, cityName, cityCode, recommendBuildings, refreshing, searchBarTop} = this.state;
        const refreshControl = (
            <RefreshControl progressViewOffset={scaleSize(150)} refreshing={refreshing} onRefresh={this.onRefresh}/>
        );
        return (
            <View style={{flex: 1}}>
                {cityCode ? (
                    <View style={{flex: 1}}>
                        <StatusBar translucent={true} barStyle='dark-content' backgroundColor='rgba(255,255,255,0)'/>
                        <FlatList
                            style={{flex: 1}}
                            data={recommendBuildings}
                            onScroll={this._onScroll}
                            refreshControl={refreshControl}
                            ListHeaderComponent={this._renderItemHead}
                            renderItem={recommendBuildings.length > 0 ? this._renderItem : null}
                            keyExtractor={this._keyExtractor}/>
                        <Animated.View style={{...IndexStyle.header_container_op, opacity: searchBarOpacity}}/>
                        <Animated.View style={[IndexStyle.header_wrapper, {top: searchBarTop}]}>
                            <View style={IndexStyle.header_container}>
                                <View style={IndexStyle.header_content}>
                                    <TouchableOpacity style={IndexStyle.header_left} activeOpacity={1} onPress={this.gotoCityList}>
                                        <Image source={LOCATION}
                                               style={IndexStyle.header_location_icon}/>
                                        <Text style={IndexStyle.header_location_text}>{cityName || '重庆'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={IndexStyle.header_center} activeOpacity={1} onPress={this.gotoSearch}>
                                        <Text style={IndexStyle.header_division}/>
                                        <Image source={SEARCH}
                                               style={IndexStyle.header_search_icon}/>
                                        <Text style={IndexStyle.header_search_text}>搜索</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                        <QuickEntry visible={this.props.config.showQuickPage.routeName === 'Project'}/>
                    </View>
                ) : (
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator/>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = ({config, dictionaries, global,location, point, user}) => {
    return {
        config, user,
        dictionaries,
        global,
        location,
        sendPoint: point.buryingPoint
    }
};
export default connect(mapStateToProps)(Project)
