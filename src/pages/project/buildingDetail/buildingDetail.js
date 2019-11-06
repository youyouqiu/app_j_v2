import * as React from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import {
    Animated,
    Easing,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native'
import {connect} from 'react-redux';
import DetailInfo from './components/detailInfo'
import BaseInfo from './components/baseInfo';
import ProjectInfo from './components/projectInfo'
import Surround from './components/surround';
import ReportRule from './components/reportRule';
import styles from './styles'
import Button from 'teaset/components/Button/Button';
import Theme from 'teaset/themes/Theme';
import {scaleSize} from '../../../utils/screenUtil';
import projectService from '../../../services/projectService';
import ShareView from '../../../components/Share/shareView';
import Toast from 'teaset/components/Toast/Toast';
import * as WeChat from 'xkj-react-native-wechat'
import ViewShot from 'react-native-view-shot';
import {checkPermission} from '../../../utils/utils';
import {wxApi} from '../../../utils/wxUtils';
import {verifyUser} from '../../../utils/utils'

const tabs = [
    {label: '基本信息', key: 'baseY'},
    {label: '项目信息', key: 'projectY'},
    {label: '周边配套', key: 'surroundY'},
    {label: '报备规则', key: 'reportY'},
];

const shareText = ['【超高性价比】', '【热销】', '【超低价格】', '【投资性价比高】', '【投资回报率快】'];

class BuildingDetail extends React.Component {

    constructor(props) {
        super();
        this.baseHeight = Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(96);
        this.scrollRef = React.createRef();
        this.state = {
            headerOpacity0: new Animated.Value(0),
            headerOpacity1: new Animated.Value(1),
            activeTabKey: 'baseY',
            buildingDetail: {},
            reportRule: {},
            shareVisible: false
        };
        this.common = {
            layouts: {},
            buildingTreeId: props.navigation.state.params.buildingTreeId,
            detailInfo: {},
            projectInfo: {}
        };
    }

    shareRef = null; // 分享截屏图片
    buildIcon = null; // 楼盘封面 small
    componentDidMount() {
        this.props.sendPoint.add({page: '楼盘详情', action: 'view'});
        this.getBuildingDetail();
        this.getReportRule();
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    shareVisibleToggle = () => {
        this.setState(prev => ({
            shareVisible: !prev.shareVisible
        }))
        let {buildingDetail} = this.state
        this.props.sendPoint.add({
            target: '分享_button',
            page: '房源-房源详情',
            action_param: {
                buildingid: buildingDetail.buildingId
            }
        })
    };

    shareSelect = async (key) => {
        const installed = await WeChat.isWXAppInstalled();
        if (!installed && ['shareToTimeline', 'sharingFriends'].includes(key)) {
            Toast.message('请您安装微信之后再试');
            return
        }
        if (key === 'shareToTimeline') {
            this.shareToTimeline();
        } else if (key === 'sharingFriends') {
            this.sharingFriends();
        } else if (key === 'savePicture') {
            this.savePicture();
        }
    };

    shareToTimeline = async () => {
        try {
            const url = await this.shareRef.capture();
            let data = {
                type: 'imageUrl',
                thumbImage: 'file://' + url,
                imageUrl: 'file://' + url
            };
            WeChat.shareToTimeline(data);

        } catch (e) {
            console.log(e, '分享朋友圈失败-catch');
        } finally {
            this.shareVisibleToggle()
        }
    };

    sharingFriends = async () => {
        try {
            const {requestUrl, global, user} = this.props;
            const {buildingDetail} = this.state;
            let data = {
                objectId: buildingDetail.buildingTreeId,
                type: 1,
                userId: user.userInfo.id,
                cityName: global.cityName || global.defaultCityName,
                city: global.cityCode || global.defaultCityCode,
                source: 1
            };
            const relation = await projectService.shareRelationReq(requestUrl.api, data);
            if (!relation.extension) {
                Toast.message('获取关联信息失败');
                return
            }
            let shareData = {
                type: 'miniProgram',
                webpageUrl: 'https://www.baidu.com/',
                title: `我为您推荐了一个${shareText[Math.floor(Math.random() * shareText.length)]}楼盘 ${buildingDetail.fullName}`,
                description: '我在铺侦探看上了一个不错的楼盘',
                niProgramType: 1,  //分享小程序的版本（0-正式，1-开发，2-体验）
                thumbImage: this.buildIcon || `${this.props.requestUrl.cqAuth}/images/defaultProject.png`, // 只能是网页链接
                userName: 'gh_6790b5afe67c',//小程序ID
                path: `/pages/scanInto/scanInto?recordId=${relation.extension}`  //小程序页面路径
            };
            await WeChat.shareToSession(shareData);

        } catch (e) {
            Toast.message('系统异常，请重试')
        } finally {
            this.shareVisibleToggle()
        }

    };

    // 分享报备小程序
    handleShare = async () => {
        const {buildingDetail} = this.state;
        const {userInfo = {}} = this.props.user;
        if (!buildingDetail.buildingTreeId || !buildingDetail.buildingId || !buildingDetail.fullName) return;
        let path = `/pages/share/index?build_tree_id=${buildingDetail.buildingTreeId}&build_id=${buildingDetail.buildingId}`;
        if (userInfo.isResident) {
            path += `&company_id=${userInfo.filialeId || ''}&type=2`
        } else {
            path += `&type=1`
        }

        let thumbImage = this.buildIcon || `${this.props.requestUrl.cqAuth}/images/defaultProject.png`;

        const data = {
            type: 'miniProgram',
            webpageUrl: 'https://www.baidu.com/',
            title: `${userInfo.trueName || ''}邀请你报备${buildingDetail.fullName}！`,
            description: 'description',
            thumbImage: thumbImage,
            userName: 'gh_76def9e899ca',
            path: path
        };
        wxApi.handleShareToSession(data)
            .then(() => {
            })
        this.props.sendPoint.add({
            target: '分享报备小程序_button',
            page: '房源-房源详情',
            action_param: {
                buildingid: buildingDetail.buildingId,
                companyid: userInfo.filialeId
            }
        })
    };

    savePicture = async () => {
        try {
            if (!this.shareRef) {
                Toast.message('保存失败');
                return
            }
            const url = await this.shareRef.capture();
            // this.setState(prev => ({
            //     shareVisible: !prev.shareVisible
            // }))
            this.shareVisibleToggle()
            const res = await checkPermission('photo');
            if (res) {
                await this.saveImg(url);
                Toast.message('保存成功');
            }
        } catch (e) {
            console.log(e, '保存-catch');
            Toast.message('保存失败')
        } finally {
        }
    };

    //保存图片
    saveImg = async (img) => {
        return new Promise((resolve, reject) => {
            CameraRoll.saveToCameraRoll(img)
                .then(function (result) {
                    resolve(result);
                }).catch(function () {
                reject()
            });
        })
    };

    getReportRule = async () => {
        const {requestUrl} = this.props;
        const {buildingTreeId} = this.common;
        let response = await projectService.reportRuleReq(requestUrl.api, buildingTreeId);
        this.setState({reportRule: response.extension || {}})
    };

    getBuildingDetail = async () => {
        const {requestUrl} = this.props;
        const {buildingTreeId} = this.common;
        const response = await projectService.buildingDetailReq(requestUrl.api, buildingTreeId);
        const {extension} = response;
        this.common.detailInfo = {
            fullName: extension.fullName,
            saleStatus: extension.saleStatus,
            areaFullName: (extension.basicInfo || {}).areaFullName,
            buildingType: (extension.basicInfo || {}).buildingType,
            shops: (extension.basicInfo || {}).shops,
            maxPrice: extension.maxPrice,
            minPrice: extension.minPrice,
            coordinate: {
                latitude: (extension.basicInfo || {}).latitude,
                longitude: (extension.basicInfo || {}).longitude,
                txLatitude: (extension.basicInfo || {}).txLatitude,
                txLongitude: (extension.basicInfo || {}).txLongitude,
            }
        };
        this.common.projectInfo = {
            summary: extension.summary,
            buildingTreeId: buildingTreeId,
            residentUserInfo: extension.residentUserInfo
        };
        this.setState({buildingDetail: extension || {}})
    };

    onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const {headerOpacity0, headerOpacity1, activeTabKey} = this.state;
        const {layouts} = this.common;
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
        if (activeTabKey !== 'reportY' && offsetY >= 0) {
            this.setState({activeTabKey: 'baseY'})
        }
        if (activeTabKey !== 'reportY' && offsetY >= layouts['projectY'] - this.baseHeight) {
            this.setState({activeTabKey: 'projectY'})
        }
        if (activeTabKey !== 'reportY' && offsetY >= layouts['surroundY'] - this.baseHeight) {
            this.setState({activeTabKey: 'surroundY'})
        }
        if (offsetY >= layouts['reportY'] - this.baseHeight) {
            this.setState({activeTabKey: 'reportY'})
        }
    };

    scrollTo = (key) => {
        this.setState({activeTabKey: key}, () => {
            const y = this.common.layouts[key];
            this.scrollRef.current.scrollTo({x: 0, y: y - this.baseHeight, animated: false})
        });
    };

    onLayout = (key, e) => {
        this.common.layouts[key] = e.nativeEvent.layout.y;
    };

    gotoShopList = async () => {
        try {
            await verifyUser('weak', '加入公司之后即可查看楼盘实时信息')
            const {buildingDetail} = this.state;
            const {buildingTreeId} = this.common;
            this.props.navigation.navigate('shopList', {
                buildingTreeId: buildingTreeId,
                fullName: buildingDetail.fullName,
                buildingId: buildingDetail.buildingId
            });
            this.props.sendPoint.add({target: '商铺信息_button', page: '房源-房源详情'})
        } catch (e) {
        }
    };

    getFilesIcon = async (files = []) => {
        const item = files.find((item) => item.isIcon);
        if (item) {
            await new Promise(((resolve) => {
                Image.getSize(item.small, () => {
                    this.buildIcon = item.small;
                    resolve()
                }, () => {
                    this.buildIcon = this.props.requestUrl.cqAuth + '/images/defaultProject.png';
                    resolve()
                });
            }));
        }
    };

    footerClick = (type) => {
        const {buildingTreeId, detailInfo} = this.common;
        const {buildingDetail} = this.state;
        let param = {
            buildTreeId: buildingTreeId,
            buildingId: buildingDetail.buildingId,
            buildingName: detailInfo.fullName
        };
        if (type === 1) {
            this.props.navigation.navigate('customerList', param);
            this.props.sendPoint.add({
                target: '批量报备客户_button',
                page: '房源-房源详情',
                action_param: {
                    buildingid: buildingDetail.buildingId
                }
            })
        } else if (type === 2) {
            this.props.navigation.navigate('addReport', {
                buildingInfo: param
            });
            this.props.sendPoint.add({
                target: '报备客户_button',
                page: '房源-房源详情',
                action_param: {
                    buildingid: buildingDetail.buildingId
                }
            })
        }
    };

    getShareSlot = () => {
        const detailInfo = this.common.detailInfo || {};
        const {buildingTreeId = null} = this.state.buildingDetail;
        const {basicInfo = {}} = this.state.buildingDetail;
        const {userInfo} = this.props.user;
        let QR = <Image style={{width: scaleSize(107), height: scaleSize(106)}} source={require('./../../../images/pictures/building_def.png')}/>;
        if (basicInfo.cityName && basicInfo.city && buildingTreeId && userInfo.id) {
            QR = <Image
                source={{uri: `${this.props.requestUrl.api}/api/clientapplet/wxacode/getUnlimited?ObjectId=${buildingTreeId}&Type=1&UserId=${userInfo.id}&CityName=${basicInfo.cityName}&Type=1&Source=1&Source=1&City=${basicInfo.city}&path=${'pages/scanInto/scanInto'}`}}
                style={{width: scaleSize(107), height: scaleSize(106)}}/>
        }
        const minPrice = detailInfo.minPrice || null;
        const maxPrice = detailInfo.maxPrice || null;

        return <ViewShot style={[styles.shareSlot]} ref={(ref) => this.shareRef = ref}>
            <TouchableOpacity onPress={() => {
            }} activeOpacity={1}>
                <Image style={[styles.shareSlotImage]} source={{uri: this.buildIcon}}/>
                <View style={styles.shareSlotInfo}>
                    <View style={[styles.shareSlotBuildInfo]}>
                        <Text style={styles.shareSlotBuildInfoName}>{detailInfo.fullName}</Text>
                        <Text style={styles.shareSlotBuildInfoAddress}>{detailInfo.areaFullName}</Text>
                        <Text style={styles.shareSlotBuildInfoPrice}>
                            {((minPrice && maxPrice) || (minPrice === 0 && maxPrice === 0)) ? `${minPrice}-${maxPrice}万元` : '暂未定价'}
                        </Text>
                    </View>
                    <View style={[styles.shareSlotQRCode]}>
                        {QR}
                        <Text style={[styles.shareSlotQRCodeText]}>长按识别</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </ViewShot>
    };

    isCanReport = () => {
        const reportRule = this.state.reportRule || {};
        const len = Object.keys(reportRule).length;
        if (!len) return true; // 没有报备规则；
        const cityCode = ((this.props.user || {}).userInfo || {}).city || null;
        const basicInfo = (this.state.buildingDetail || {}).basicInfo || {};
        if (!cityCode || !basicInfo.city || cityCode !== basicInfo.city) return true; // 不在同一城市；
        return false;
    };

    render() {
        const {headerOpacity0, headerOpacity1, activeTabKey, buildingDetail, reportRule, shareVisible} = this.state;
        const {detailInfo, projectInfo, buildingTreeId} = this.common;
        const {basicInfo} = buildingDetail;
        const {user} = this.props;
        return (
            <View style={{height: '100%'}}>
                {buildingDetail && JSON.stringify(buildingDetail) !== '{}' ? (
                    <View style={styles.detailWrapper}>

                        {/*动态header*/}
                        <View style={styles.headerAbsolute}>
                            <Animated.View style={[styles.headerContainer, {opacity: headerOpacity1}]}>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                                    <Image style={[styles.headerIcon]}
                                           source={require('../../../images/icons/project/back_white.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.headerIconDivision}/>
                                {user.status !== 404 ? (
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.shareVisibleToggle}>
                                        <Image style={[styles.headerIcon]}
                                               source={require('../../../images/icons/project/share_white.png')}/>
                                    </TouchableOpacity>
                                ) : null}
                            </Animated.View>
                            <Animated.View style={[styles.headerAnimated, {opacity: headerOpacity0}]}>
                                <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                                    <Image style={styles.headerIcon}
                                           source={require('../../../images/icons/project/back_black.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.headerIconDivision}>楼盘详情</Text>
                                {user.status !== 404 ? (
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.shareVisibleToggle}>
                                        <Image style={styles.headerIcon}
                                               source={require('../../../images/icons/project/share_black.png')}/>
                                    </TouchableOpacity>
                                ) : (<View style={styles.headerIcon}/>)}

                            </Animated.View>
                        </View>

                        {/*动态tabs*/}
                        <Animated.View style={[styles.pd_subHeader, {opacity: headerOpacity0}]}>
                            {tabs.map(item => (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.scrollTo(item.key)}
                                                  key={item.key} style={styles.pd_subHeaderItem}>
                                    <View style={[styles.pd_subHeaderTextWrap]}>
                                        <Text
                                            style={[styles.pd_subHeaderText, {color: activeTabKey === item.key ? '#1F3070' : '#868686'}]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    <Text
                                        style={[styles.pd_subHeaderLine, {backgroundColor: activeTabKey === item.key ? '#1F3070' : '#fff'}]}/>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>


                        {/*内容*/}
                        <ScrollView onScroll={this.onScroll} scrollEventThrottle={20} ref={this.scrollRef} showsVerticalScrollIndicator={false}>
                            <StatusBar translucent={true} barStyle='dark-content'
                                       backgroundColor='rgba(255,255,255,0)'/>
                            {/* 地图 */}
                            <DetailInfo detailInfo={detailInfo} buildingTreeId={buildingTreeId}
                                        getFiles={this.getFilesIcon}
                                        navigation={this.props.navigation}
                                        onLayout={e => this.onLayout('detailY', e)}
                            />
                            {/*基本信息*/}
                            <BaseInfo basicInfo={basicInfo} onLayout={e => this.onLayout('baseY', e)}/>
                            {/*项目信息*/}
                            <ProjectInfo projectInfo={projectInfo} navigation={this.props.navigation} onLayout={e => this.onLayout('projectY', e)}/>
                            {/*周边配套*/}
                            <Surround facilitiesInfo={buildingDetail.facilitiesInfo} onLayout={e => this.onLayout('surroundY', e)}/>
                            {/*报备规则*/}
                            <ReportRule reportRule={reportRule} shareWeChat={user.status !== 404} handleShare={this.handleShare}
                                        onLayout={e => this.onLayout('reportY', e)}/>
                        </ScrollView>

                        {/*footer*/}
                        <View style={styles.detailFooter}>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.gotoShopList} style={styles.detailFooterLeft}>
                                <Image style={styles.detailFooterIcon}
                                       source={require('../../../images/icons/building_shop.png')}/>
                                <Text style={styles.detailFooterLabel}>商铺信息</Text>
                            </TouchableOpacity>
                            <View style={styles.detailFooterCenterWrap}><Text style={styles.detailFooterCenter}/></View>
                            <View style={styles.detailFooterRight}>
                                <Button style={styles.detailFooterBtn1}
                                        onPress={() => this.footerClick(1)}
                                        activeOpacity={0.8}
                                        disabled={this.isCanReport()}
                                        titleStyle={styles.detailFooterBtn1TitleStyle} title='批量报备客户'/>
                                <Button style={styles.detailFooterBtn2}
                                        onPress={() => this.footerClick(2)}
                                        activeOpacity={0.8}
                                        disabled={this.isCanReport()}
                                        titleStyle={styles.detailFooterBtn2TitleStyle} title='报备客户'/>
                            </View>
                        </View>
                        {shareVisible ? (
                            <ShareView visible={shareVisible} closeModal={this.shareVisibleToggle}
                                       shareSelect={this.shareSelect}
                                       slot={this.getShareSlot()}
                                       keys={['sharingFriends', 'shareToTimeline', 'savePicture']}/>
                        ) : null}
                    </View>
                ) : (
                    <View style={styles.contentLoading}>
                        <ActivityIndicator/>
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = ({config, global, user, point}) => {
    return {
        requestUrl: config.requestUrl,
        sendPoint: point.buryingPoint,
        global, user
    }
};

export default connect(mapStateToProps)(BuildingDetail)
