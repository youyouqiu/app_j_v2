import React from 'react';
import { Animated, Easing, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import BaseInfo from './components/baseInfo';
import ShopOtherInfo from './components/shopOtherInfo'
import MatchingInfo from './components/matchingInfo';
import RelevantInfo from './components/relevantInfo';
import ReportRule from './components/reportRule';
import projectService from '../../../services/projectService';
import { connect } from 'react-redux';
import ShopIntroduce from './components/shopIntroduce';
import Theme from 'teaset/themes/Theme';
import { scaleSize } from '../../../utils/screenUtil';
import FunctionDesk from './components/functionDesk';


const tabs = [
    { label: '商铺外摆信息', key: 'otherY' },
    { label: '商铺简介', key: 'introY' },
    { label: '配套信息', key: 'matchingY' },
    { label: '相关信息', key: 'relevantY' },
];

class ShopDetail extends React.Component {

    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
        this.baseHeight = Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(96);
        this.state = {
            shopDetail: {},
            fdVisible: false,
            activeTabKey: 'otherY',
            headerOpacity0: new Animated.Value(0),
            headerOpacity1: new Animated.Value(1),
            shop_category_obj: [],
            hasRule: false
        };
        this.common = {
            shopId: props.navigation.state.params.shopId,
            buildingTreeId: props.navigation.state.params.buildingTreeId,
            buildingId: '',
            otherInfo: {},//商铺外摆信息
            relevantInfo: {},//相关信息
            layouts: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dictionaries.shop_category_obj !== prevState.shop_category_obj) {
            return {
                ...prevState,
                shop_category_obj: nextProps.dictionaries.shop_category_obj || [],
            }
        }
        return null
    }

    componentDidMount() {
        const { shop_category_obj } = this.state;
        this.getShopDetail();
        shop_category_obj.length === 0 ? this.getSearchShopAreaDic() : null;
    }

    getSearchShopAreaDic = () => {
        const { dispatch, requestUrl } = this.props;
        dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestUrl: requestUrl.public,
                requestData: ['SHOP_CATEGORY']
            }
        })
    };

    modalToggle = () => {
        this.setState(prev => ({
            fdVisible: !prev.fdVisible
        }))
    };

    onClick = (type) => {
        this.setState(prev => ({
            fdVisible: !prev.fdVisible
        }), () => {
            if (type === 'gzt') {
                this.props.navigation.navigate('Workbench')
            } else if (type === 'building') {
                const { buildingTreeId } = this.common;
                this.props.navigation.navigate('buildingDetail', { buildingTreeId })
            } else if (type === 'house') {
                this.props.navigation.navigate('Project')
            }
        });
    };

    goBack = () => {
        this.props.navigation.goBack();
    };

    getShopDetail = async () => {
        const { shopId } = this.common;
        const { requestUrl } = this.props;
        const response = await projectService.shopDetailReq(requestUrl.api, shopId);
        const { basicInfo } = response.extension;
        this.common.otherInfo = {
            freeArea: (basicInfo || {}).freeArea,
            streetDistance: (basicInfo || {}).streetDistance,
            isCorner: (basicInfo || {}).isCorner,
            isFaceStreet: (basicInfo || {}).isFaceStreet,
        };
        this.common.relevantInfo = {
            number: (basicInfo || {}).number,
            shopCategory: (basicInfo || {}).shopCategory,
            buildingNo: (basicInfo || {}).buildingNo,
            floorNo: (basicInfo || {}).floorNo,
            houseArea: (basicInfo || {}).houseArea,
            buildingArea: (basicInfo || {}).buildingArea,
        };
        this.common.buildingId = response.extension.buildingId;
        this.setState({ shopDetail: response.extension });
    };

    scrollTo = (key) => {
        this.setState({ activeTabKey: key }, () => {
            const y = this.common.layouts[key];
            this.scrollRef.current.scrollTo({ x: 0, y: y - this.baseHeight, animated: false })
        });
    };

    onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const { headerOpacity0, headerOpacity1, activeTabKey } = this.state;
        const { layouts } = this.common;
        Animated.timing(headerOpacity0, {
            toValue: offsetY / 150,
            duration: 0,
            easing: Easing.linear,
        }).start();
        Animated.timing(headerOpacity1, {
            toValue: 1 - (offsetY / 150),
            duration: 0,
            easing: Easing.linear,
        }).start();
        if (activeTabKey !== 'relevantY' && offsetY >= 0) {
            this.setState({ activeTabKey: 'otherY' })
        }
        if (activeTabKey !== 'relevantY' && offsetY >= layouts['introY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'introY' })
        }
        if (activeTabKey !== 'relevantY' && offsetY >= layouts['matchingY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'matchingY' })
        }
        if (offsetY >= layouts['relevantY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'relevantY' })
        }
    };

    isCanReport = () => {
        if (!this.state.hasRule) return true; // 没有报备规则；
        const cityCode = ((this.props.user || {}).userInfo || {}).city || null;
        const shopDetail = (this.state.shopDetail || {});
        if (!cityCode || !shopDetail.cityCode || cityCode !== shopDetail.cityCode) return true; // 不在同一城市
        return false;
    };

    handleHasRule = (hasRule) => {
        this.setState({hasRule: hasRule})
    };

    gotoReport = () => {
        const { buildingTreeId, buildingId } = this.common;
        const { shopDetail } = this.state;
        let param = {
            buildTreeId: buildingTreeId,
            buildingId: buildingId,
            buildingName: shopDetail.buildingTreeName
        };
        this.props.navigation.navigate('addReport', { buildingInfo: param });
        this.props.sendPoint.add({ target: '报备客户_button', page: '商铺详情' })
    };

    onLayout = (key, e) => {
        this.common.layouts[key] = e.nativeEvent.layout.y;
    };

    render() {
        const { shopDetail, activeTabKey, headerOpacity0, headerOpacity1, shop_category_obj, fdVisible } = this.state;
        const { requestUrl } = this.props;
        const { otherInfo, relevantInfo, buildingTreeId,shopId } = this.common;
        const isCanReport = this.isCanReport();
        console.log('render', shop_category_obj);
        return (
            <View style={styles.bd_wrapper}>

                {/*动态header*/}
                <View style={styles.bd_headerAbsolute}>
                    <Animated.View style={[styles.bd_headerContainer, { opacity: headerOpacity1 }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                            <Image style={[styles.bd_headerIcon]}
                                source={require('../../../images/icons/project/back_white.png')} />
                        </TouchableOpacity>
                        <Text style={styles.bd_headerIconDivision} />
                        <TouchableOpacity activeOpacity={0.8} onPress={this.modalToggle}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/more_white.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.bd_headerAnimated, { opacity: headerOpacity0 }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/back_black.png')} />
                        </TouchableOpacity>
                        <Text style={styles.bd_headerIconDivision}>商铺详情</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.modalToggle}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/more_black.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/*动态tabs*/}
                <Animated.View style={[styles.bd_animatedHeader, { opacity: headerOpacity0 }]}>
                    {tabs.map(item => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.scrollTo(item.key)}
                            key={item.key} style={styles.bd_animatedHeaderItem}>
                            <View style={[styles.bd_animatedHeaderTextWrap]}>
                                <Text
                                    style={[styles.bd_animatedHeaderText, { color: activeTabKey === item.key ? '#1F3070' : '#868686' }]}>
                                    {item.label}
                                </Text>
                            </View>
                            <Text
                                style={[styles.bd_animatedHeaderLine, { backgroundColor: activeTabKey === item.key ? '#1F3070' : '#fff' }]} />
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                <FunctionDesk visible={fdVisible} modalClose={this.modalToggle} onClick={this.onClick} />

                <View style={styles.bd_content}>
                    <ScrollView onScroll={this.onScroll} ref={this.scrollRef} showsVerticalScrollIndicator={false}>
                        <StatusBar translucent={true} barStyle='dark-content'
                            backgroundColor='rgba(255,255,255,0)' />

                        <BaseInfo baseInfo={shopDetail.basicInfo} shopId={shopId} requestUrl={requestUrl} shop_category_obj={shop_category_obj} />
                        {/*商铺外摆信息*/}
                        <ShopOtherInfo otherInfo={otherInfo} onLayout={e => this.onLayout('otherY', e)} />
                        {/*商铺简介*/}
                        <ShopIntroduce summary={shopDetail.summary} onLayout={e => this.onLayout('introY', e)} />
                        {/*配套信息*/}
                        <MatchingInfo facilitiesInfo={shopDetail.facilitiesInfo} onLayout={e => this.onLayout('matchingY', e)} />
                        {/*相关信息*/}
                        <RelevantInfo relevantInfo={relevantInfo} shop_category_obj={shop_category_obj} onLayout={e => this.onLayout('relevantY', e)} />
                        {/*报备规则*/}
                        <ReportRule handleHasRule={this.handleHasRule} buildingTreeId={buildingTreeId} onLayout={e => this.onLayout('ruleY', e)} requestUrl={requestUrl} />
                    </ScrollView>
                    <View style={styles.bd_footer}>
                        <TouchableOpacity disabled={isCanReport} style={[styles.bd_footerContent, isCanReport ? {opacity: 0.8} : {}]} activeOpacity={0.8} onPress={this.gotoReport}>
                            <Text style={styles.bd_footerContentText}>报备客户</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ config, dictionaries, point, user }) => {
    return {
        showQuickPage: config.showQuickPage,
        requestUrl: config.requestUrl,
        dictionaries: dictionaries,
        sendPoint: point.buryingPoint,
        user
    }
};

export default connect(mapStateToProps)(ShopDetail)
