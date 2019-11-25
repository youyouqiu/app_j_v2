import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StatusBar, Image, Animated, FlatList, Platform, ActivityIndicator, RefreshControl,} from 'react-native';
import {connect} from 'react-redux'
import {IndexStyle} from './indexStyle'
import {scaleSize} from '../../utils/screenUtil';
import QuickEntry from '../../businessComponents/quickEntry'
import ProjectCarousel from './components/projectCarousel';
import projectService from '../../services/projectService';
import {ProjectNum, Trend} from './components/common';
import styles from './styles';
import Theme from 'teaset/themes/Theme';
import {extractIdFromUrl} from '../../utils/utils';
import {CONSTANT} from '../../constants';
import {GoodNews} from "./goodNews";
import {getLocationInfo} from "@/pages/project/common";

const LOCATION = require('../../images/icons/map.png');
const SEARCH = require('../../images/icons/seachH.png');

// let defaultTop = scaleSize(294)

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarOpacity: new Animated.Value(0),
            advertisement: {},
            shopStatus: props.dictionaries.shop_status || [],
            recommendBuildings: [],
            cityName: '',
            cityCode: '',
            goodNewsList: [],
            refreshing: false,
            showIndex: false,
            cityList: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {dictionaries, projectLocation} = nextProps;
        return {
            ...prevState,
            shopStatus: dictionaries.shop_status || [],
            cityName: projectLocation.cityName || projectLocation.defaultCityName,
            cityCode: projectLocation.cityCode || projectLocation.defaultCityCode,
            cityList: projectLocation.cityList || [],
        }
    }

    init = async () => {
        const {shopStatus} = this.state;
        this.getCoordinate();
        this.getGoodNews()
        this.getAdvertisement(); // 因为现在定位数据是从首页拿去的。所以可以直接获取
        if (shopStatus.length === 0) {
            this.getSearchShopAreaDic();
        }
    };

    getGoodNews = () => {
        let {cityCode} = this.state
        projectService.getSigningList(cityCode).then(response => {
            let list = response.extension || []
            this.setState({
                goodNewsList: list
            })
        })
    }

    componentDidMount() {
        this.init();
        this.props.sendPoint.add({target: '页面', page: '房源', action: 'view'})
    };


    componentDidUpdate(prevProps) {
        if (this.props.projectLocation.cityCode !== prevProps.projectLocation.cityCode) {
            this.getAdvertisement();
            this.getGoodNews()
        }
    }

    getCoordinate = async () => {
        const {dispatch} = this.props;
        const result = await getLocationInfo({cityList: this.state.cityList}).catch(err => {
            console.log('获取定位失败：', err)
        });
        if (!result) return;
        console.log('获取定位成功：', result);
        dispatch({
            type: 'projectLocation/saveCityInfo',
            payload: result
        })
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
            advertisement: response.extension,
            refreshing: false
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
            this.props.navigation.navigate('xkjWebView', {url: item.link, title: item.adName, id: item.id})
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
                inforid: item.id,
                title: item.adName || ''
            }
        })
    };

    //头部
    _renderItemHead = () => {
        const {advertisement} = this.state;
        const {BROKER_HOME_TOP = []} = advertisement;
        return (
            <View style={{zIndex: 3, marginBottom: -1 * (Theme.statusBarHeight + scaleSize(36))}}>

                <ProjectCarousel BROKER_HOME_TOP={BROKER_HOME_TOP} advertisementDetail={this.advertisementDetail}/>
            </View>
        )
    };

    _renderItem = ({item}) => {
        const {advertisement, shopStatus, cityName, refreshing, cityCode, goodNewsList} = this.state;
        const {BROKER_BANNER = []} = advertisement;
        const {requestUrl} = this.props.config;
        const longPicture = item.longPicture ? {uri: item.longPicture} : require('../../images/defaultImage/default_1.png');
        if (item.id === 'stickyHeaderIndices') {
            return <View style={[IndexStyle.header_container, {paddingTop: Theme.statusBarHeight, backgroundColor: item.show ? '#fff' : 'rgba(0,0,0,0)'}]}>
                {
                    item.show
                        ?
                        <View style={{...IndexStyle.header_container_op}}/>
                        :
                        null
                }
                <View style={IndexStyle.header_content}>
                    <TouchableOpacity style={IndexStyle.header_left} activeOpacity={1} onPress={this.gotoCityList}>
                        <Image source={LOCATION}
                               style={IndexStyle.header_location_icon}/>
                        <Text style={IndexStyle.header_location_text}>{cityName || '重庆'}</Text>
                        <Text style={IndexStyle.header_division}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={IndexStyle.header_center} activeOpacity={1} onPress={this.gotoSearch}>
                        <Image source={SEARCH}
                               style={IndexStyle.header_search_icon}/>
                        <Text style={IndexStyle.header_search_text}>找房源</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        if (item.id === 'content') {
            return <View>
                <View style={[styles.fy_contentView]}>
                    <Trend refreshing={refreshing} cityCode={cityCode} requestUrl={requestUrl}/>
                    <ProjectNum refreshing={refreshing} cityCode={cityCode} requestUrl={requestUrl} shopStatus={shopStatus}/>
                </View>
                <View>
                    <GoodNews goodNewsList={goodNewsList}/>
                </View>
                <View>
                    <View style={styles.fy_bannerContent}>
                        {BROKER_BANNER.length > 0 && BROKER_BANNER.map(item => (
                            <TouchableOpacity key={item.id} style={styles.fy_bannerItem} onPress={() => this.advertisementDetail(item, CONSTANT.SOURCE.BANNER)}
                                              activeOpacity={0.8}>
                                <Image source={{uri: item.cover}} style={{width: scaleSize(331), height: scaleSize(175), borderRadius: scaleSize(8)}}/>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.fy_recommend}>
                        <Text style={styles.fy_recommendLeft}>推荐楼盘</Text>
                        <TouchableOpacity onPress={this.gotoBuildingList} activeOpacity={0.8} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: scaleSize(32),
                            paddingTop: scaleSize(22),
                            paddingBottom: scaleSize(22)
                        }}>
                            <Text>全部</Text>
                            <Image source={require('../../images/icons/chose.png')} style={{width: scaleSize(30), height: scaleSize(30)}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
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
        const {config} = this.props;
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
        let {recommendBuildings} = this.state
        let stickyHeaderIndex = recommendBuildings.findIndex(item => item.id === 'stickyHeaderIndices')
        let stickyHeaderItem = recommendBuildings[stickyHeaderIndex] || {}
        if (offsetY / 150 > 0.8 && stickyHeaderItem.show) {
            return
        }
        if (offsetY / 150 < 0.8 && !stickyHeaderItem.show) {
            return
        }
        stickyHeaderItem.show = offsetY / 150 > 0.8
        recommendBuildings[stickyHeaderIndex] = stickyHeaderItem
        this.setState({
            recommendBuildings
        })
        // Animated.timing(this.state.searchBarOpacity, {
        //     toValue: offsetY / 150,
        //     duration: 0,
        //     easing: Easing.linear,
        // }).start();
        // this.setState({
        //     showIndex: offsetY / 150 > 0.7
        // })
    };

    onRefresh = () => {
        console.log('onRefreshonRefreshonRefresh');
        this.setState({refreshing: true});
        this.getSearchShopAreaDic();
        this.getAdvertisement();
        this.getGoodNews()
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
        let {cityCode, recommendBuildings, refreshing} = this.state;
        if (recommendBuildings.findIndex(item => item.id === 'stickyHeaderIndices') === -1) {
            recommendBuildings.unshift({id: 'stickyHeaderIndices'}, {id: 'content'})
        }
        const refreshControl = (
            <RefreshControl progressViewOffset={scaleSize(150)} refreshing={refreshing} onRefresh={this.onRefresh}/>
        );
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={true} barStyle='dark-content' backgroundColor='rgba(255,255,255,0)'/>
                {cityCode ? (
                    <View style={{flex: 1, zIndex: 3}}>
                        <FlatList
                            style={{flex: 1}}
                            data={recommendBuildings}
                            onScroll={this._onScroll}
                            stickyHeaderIndices={[1]}
                            refreshControl={refreshControl}
                            ListHeaderComponent={this._renderItemHead}
                            renderItem={recommendBuildings.length > 0 ? this._renderItem : null}
                            keyExtractor={this._keyExtractor}/>
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

const mapStateToProps = ({config, dictionaries, point, user, projectLocation}) => {
    return {
        config, user,
        dictionaries,
        projectLocation,
        sendPoint: point.buryingPoint
    }
};
export default connect(mapStateToProps)(Project)
