// Created by Kary on 2019/09/03 20:36.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../../../components/Page';
import LinearGradient from 'react-native-linear-gradient';
import { View, TouchableOpacity, Image, Text, FlatList, Animated, Easing, ActivityIndicator, ImageBackground } from 'react-native'
import styles from './css';
import XKJButton from '../../../components/Button';
import TopBar from './../../../components/Page/TopBar';
import { scaleSize } from '../../../utils/screenUtil';
import { Toast, ActionPopover } from 'teaset';
import API from './../../../services/stationHelper'
import { wxApi } from '../../../utils/wxUtils';
import NoData from './../../../businessComponents/noData'
import BuryingPoint from "@/utils/BuryPoint";
class StationHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            totalCount: 0,
            pageIndex: 0,
            dataList: [
                { text: '报备', val: 0 },
                { text: '带看', val: 0 },
                { text: '认购', val: 0 },
                { text: '签约', val: 0 },
                { text: '退房', val: 0 },
            ],
            hiddenTopBar: true,
            initError: false,
            isRefreshing: false,
            offsetY: false,
            loading: false,
            moreLoading: false,
            barAnimated: new Animated.Value(0) // 滑块透明度
        }
    };
    FLAT_REF = null;
    ref_progress = {};
    _handleShare = async ({ build_tree_name = '', build_tree_id = '', building_id = '', cover = '' }) => {
        try {
            const { userInfo = {} } = this.props.user;
            await Image.getSize(cover, () => { }, () => {
                cover = `${this.props.config.requestUrl.cqAuth}/images/defaultProject.png`
            });
            const data = {
                type: 'miniProgram',
                webpageUrl: 'https://www.baidu.com/',
                title: `${userInfo.trueName || ''}邀请你报备${build_tree_name}！`,
                description: 'description',
                thumbImage: cover,
                miniProgramType: 1,  //分享小程序的版本（0-正式，1-开发，2-体验）
                userName: 'gh_76def9e899ca',
                path: `/pages/share/index?company_id=${userInfo.filialeId || ''}&build_tree_id=${build_tree_id}&build_id=${building_id}&type=2`  //小程序页面路径
            };
            await wxApi.handleShareToSession(data);
            this.props.sendPoint.add({
                target: '分享报备小程序_button',
                page: '工作台-驻场助手',
                action_param: {
                    companyid: userInfo.filialeId,
                    buildingid: building_id
                }
            })
        } catch (e) {

        }
    };
    _handleTips = (ref, per_item, item) => {
        const rate = (!per_item.val || !item.val) ? 0 : Math.round(item.progress * 100);
        const tips = [
            { title: `转换率：${rate}%` }
        ];
        // eslint-disable-next-line no-unused-vars
        this.ref_progress[ref].measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            const X = frameWidth * (item.linearGradientWidth) - 18;
            ActionPopover.show({ x: X < 8 ? 10 : X, y: pageY + 10, width: 100, height: 100 }, tips);
        });
    };
    goProjectDetail = (item) => {
        const { building_id, build_tree_id } = item;
        (building_id && build_tree_id) && this.props.navigation.navigate('projectDetail', {
            buildingId: building_id,
            buildingtreeId: build_tree_id,
        })
    };
    _getProgress = (a, b) => {
        if (!a || !b) return 0;
        return a / b > 1 ? 1 : a / b;
    };

    _statistical = (item) => {
        BuryingPoint.add({
            page: '工作台-驻场助手',
            target: '统计分析_button',
        });
        this.props.navigation.navigate('stationStatistical', { id: item.build_tree_id })
    }

    // eslint-disable-next-line no-unused-vars
    _keyExtractor = (item, index) => index.toString();
    _renderItems = ({ item, index }) => {
        const progressList = [
            { text: '报备', val: item.reportCount || 0, unit: '次', colors: ['#415DA9', '#1F3070'], linearGradientWidth: this._getProgress(item.reportCount, item.reportCount), progress: item.reportCount ? 1 : 0 },
            { text: '带看', val: item.takeLookCount || 0, unit: '次', colors: ['#6CEA7D', '#3AD047'], linearGradientWidth: this._getProgress(item.takeLookCount, item.reportCount), progress: this._getProgress(item.takeLookCount, item.reportCount) },
            { text: '认购', val: item.subscribeCount || 0, unit: '套', colors: ['#80CFFF', '#49A1FD'], linearGradientWidth: this._getProgress(item.subscribeCount, item.reportCount), progress: this._getProgress(item.subscribeCount, item.takeLookCount) },
            { text: '签约', val: item.signingCount || 0, unit: '套', colors: ['#FF8A6B', '#FE5139'], linearGradientWidth: this._getProgress(item.signingCount, item.reportCount), progress: this._getProgress(item.signingCount, item.subscribeCount) },
        ];
        const cover = item.cover ? { uri: item.cover } : require('./../../../images/pictures/building_def.png');
        return <View style={[styles.itemView, (index + 1) === this.state.list.length ? { marginBottom: 0 } : {}]}>
            <View style={styles.projectInfo}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.goProjectDetail(item)} style={styles.projectImg}>
                    <Image style={styles.projectImg_icon} source={cover} />
                </TouchableOpacity>
                <View style={styles.projectInfoRight}>
                    <Text numberOfLines={2} style={styles.projectName}>{item.build_tree_name || '暂无数据'}</Text>
                    <View style={styles.projectData}>
                        <View style={styles.projectDataItem}>
                            <Text style={styles.projectDataItem_text}>商铺</Text>
                            <Text style={styles.projectDataItem_val}>{item.shopStock || 0}/{item.shops || 0}</Text>
                        </View>
                        <View style={styles.projectDataItem}>
                            <Text style={styles.projectDataItem_text}>销售</Text>
                            <Text style={styles.projectDataItem_val}>{item.saleShops || 0}</Text>
                        </View>
                        <View style={styles.projectDataItem}>
                            <Text style={styles.projectDataItem_text}>销售货值</Text>
                            <Text style={[styles.projectDataItem_val, { color: '#FE5139' }]}>{Math.round((item.saleAmount / 10000 || 0) * 10) / 10}万</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.progress}>
                {
                    progressList.map((progressItem, i) => {
                        return (
                            <View key={i} style={styles.progressItem}>
                                <View style={styles.progressItemBg}>
                                    <TouchableOpacity
                                        ref={(ref) => this.ref_progress[`ref_${index}_${i}`] = ref}
                                        activeOpacity={0.8}
                                        onPress={() => i && this._handleTips(`ref_${index}_${i}`, progressList[i - 1], progressList[i])}
                                        style={styles.progressItemBtn} />
                                    <LinearGradient
                                        start={{ x: 1.5, y: 0 }} end={{ x: 0.0, y: 1.0 }}
                                        colors={progressItem.colors}
                                        style={[styles.progressItemLG, { width: progressItem.linearGradientWidth * 100 + '%' }]}
                                    />
                                </View>
                                <View style={styles.progressItemInfo}>
                                    <Text style={styles.progressItemInfo_left}>{progressItem.text}</Text>
                                    <Text style={styles.progressItemInfo_right}>/{progressItem.val}{progressItem.unit}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.footer}>
                <XKJButton onPress={() => this._statistical(item)} title={
                    <View style={[styles.flex, styles.flexRow, styles.alignCenter]}>
                        <Image style={styles.weiXin} source={require('./../../../images/icons/statistical.png')} />
                        <Text style={styles.btn_text}>统计分析</Text>
                    </View>
                } style={[styles.btn, styles.btnBgColor]} />
                <XKJButton onPress={() => this._handleShare(item)} title={
                    <View style={[styles.flex, styles.flexRow, styles.alignCenter]}>
                        <Image style={styles.weiXin} source={require('./../../../images/icons/weixin.png')} />
                        <Text style={styles.btn_text}>分享报备小程序</Text>
                    </View>
                } style={styles.btn} />
            </View>

        </View>
    };
    _listHeaderComponent = () => {
        const { dataList, totalCount } = this.state;
        return <View style={[styles.bg, styles.flex]}>
            <LinearGradient
                start={{ x: 1.5, y: 0 }} end={{ x: 0.0, y: 1.0 }}
                colors={['#415DA9', '#1F3070']}
                style={{ width: '100%', borderBottomLeftRadius: scaleSize(130), borderBottomRightRadius: scaleSize(130), paddingHorizontal: scaleSize(24), height: scaleSize(500), position: 'absolute', left: 0, top: 0 }}
            >
            </LinearGradient>
            <TopBar
                tintColor={'#fff'}
                topBarStyle={styles.topBar}
                title={<Text style={styles.pageTitle}>驻场助手</Text>}
            />
            <View style={[styles.project]}>
                <Image style={styles.project_icon} source={require('./../../../images/icons/order.png')} />
                <Text style={[styles.color_fff, styles.fontSize_24]}>您管辖的项目</Text>
                <Text style={[styles.project_num]}>{totalCount}个</Text>
            </View>
            <View style={styles.dataView}>
                {
                    dataList.map((item, key) => {
                        return (
                            <View key={key} style={styles.dataViewItem}>
                                <Text style={styles.dataViewItem_text}>{item.val}</Text>
                                <View style={[styles.flex, styles.flexRow, styles.alignCenter]}>
                                    <Text style={styles.dataViewItem_label}>{item.text}</Text>
                                    {
                                        dataList.length !== (key + 1) ? <Text style={styles.line} /> : null
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    };
    _onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y || 0;
        let toValue = offsetY / 150;
        if (offsetY >= 150) toValue = 1;
        if (offsetY <= 100) toValue = 0;
        Animated.timing(this.state.barAnimated, {
            toValue: toValue,
            duration: 0,
            easing: Easing.linear,
        }).start();
        this.setState({ offsetY: offsetY });
    };
    _onRefresh = async () => {
        if (this.state.isRefreshing) return;
        await this.setState({ pageIndex: 0 });
        this.initData('update');
    };
    _onEndReached = async () => {
        if (!this.state.moreLoading && this.state.totalCount !== this.state.list.length) {
            let currPage = this.state.pageIndex;
            currPage++;
            await this.setState({ pageIndex: currPage });
            await this.initData('more')
        }
    };
    _handleDataToList = (data = []) => {

        return data.reduce((res, curr) => {
            res.push({
                building_id: curr.buildingId,
                build_tree_id: curr.buildingTreeId,
                build_tree_name: curr.buildingTreeName,
                cover: curr.cover,
                shops: curr.shops,
                shopStock: curr.shopStock,
                saleShops: curr.saleShops,
                saleAmount: curr.saleAmount,
                reportCount: curr.reportCount,
                takeLookCount: curr.takeLookCount,
                subscribeCount: curr.subscribeCount,
                signingCount: curr.signingCount,
            });
            return res;
        }, [])
    };
    /**
     *
     * @param type 'init'|'more'|'update'
     * @returns {Promise<void>}
     */
    initData = async (type = 'init') => {
        try {
            type === 'init' && await this.setState({ loading: true });
            type === 'update' && await this.setState({ isRefreshing: true });
            type === 'more' && await this.setState({ moreLoading: true });
            const res = await API.customerReport(this.props.config.requestUrl.api, {
                pageIndex: this.state.pageIndex,
                pageSize: 20
            });
            let list = this._handleDataToList(res.extension.records || []);
            const { totalCount, reportCount, beltLookCount, subscribeCount, signingCount, returnRoomCount } = res.extension;
            if (type === 'more') {
                let _list = this.state.list;
                list = _list.concat(list);
            }
            this.setState({
                list: list,
                initError: false,
                totalCount: totalCount || 0,
                dataList: [
                    { text: '报备', val: reportCount },
                    { text: '带看', val: beltLookCount },
                    { text: '认购', val: subscribeCount },
                    { text: '签约', val: signingCount },
                    { text: '退房', val: returnRoomCount },
                ]
            });
        } catch (e) {
            console.log(e)
            type === 'init' && this.setState({ initError: true });
            type !== 'init' && Toast.message(e.message || '请求失败')
        } finally {
            type === 'init' && this.setState({ loading: false });
            type === 'update' && await this.setState({ isRefreshing: false });
            type === 'more' && await this.setState({ moreLoading: false });
        }

    };
    componentDidMount() {
        this.initData()
        this.props.sendPoint.add({ target: '页面', page: '工作台-驻场助手', action: 'view' })
    }
    render() {
        const { dataList, isRefreshing, loading, moreLoading, list, initError, totalCount, barAnimated } = this.state;
        return (
            <Page
                error={{
                    isError: initError,
                    onErrorPress: async () => {
                        if (loading) return;
                        await this.setState({ pageIndex: 0 });
                        this.initData('init')
                    }
                }}
                hiddenTopBar={true}
                title={'驻场助手'}
                scroll={false}
                bodyStyle={styles.page}
            >
                <Animated.View style={[styles._project, { opacity: barAnimated }]}>
                    <TopBar title={'驻场助手'} />
                    <View style={[styles.flexRow, styles.alignCenter, styles._projectNum]}>
                        <Image style={styles.project_icon} source={require('./../../../images/icons/order_.png')} />
                        <Text style={[styles.color_000, styles.fontSize_24]}>您管辖的项目</Text>
                        <Text style={[styles.project_num, styles.color_000]}>{totalCount}个</Text>
                    </View>
                    <View style={styles.dataView}>
                        {
                            dataList.map((item, key) => {
                                return (
                                    <View key={key} style={styles.dataViewItem}>
                                        <Text style={[styles.dataViewItem_text, styles.color_000]}>{item.val}</Text>
                                        <View style={[styles.flex, styles.flexRow, styles.alignCenter]}>
                                            <Text style={[styles.dataViewItem_label, styles.color_cb]}>{item.text}</Text>
                                            {
                                                dataList.length !== (key + 1) ? <Text style={styles.line} /> : null
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Animated.View>
                <FlatList
                    ref={(e) => this.FLAT_REF = e}
                    data={list}
                    refreshing={isRefreshing}
                    onRefresh={this._onRefresh}
                    onScroll={this._onScroll}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    renderItem={(item, index) => this._renderItems(item, index)}
                    ListHeaderComponent={this._listHeaderComponent}
                    ListEmptyComponent={
                        <View>
                            {loading ? <ActivityIndicator size="large" animating={loading} /> : null}
                            <NoData tips='抱歉，没有相关信息' style={{ marginTop: '50%' }} />
                        </View>
                    }
                    ListFooterComponent={
                        (list.length) ? (<Text style={{ color: '#868686', fontSize: scaleSize(24), textAlign: 'center', marginTop: scaleSize(30) }}>{moreLoading ? '加载中~' : '~没有更多了~'}</Text>) : null
                    }
                    keyExtractor={this._keyExtractor}
                    style={styles.list}
                >
                </FlatList>

                {
                    this.props.config.isFirstInZczs && (
                        <ImageBackground
                            style={styles['container']}
                            imageStyle={styles['background']}
                            source={require('@/images/guide/zczs.png')}
                        >
                            <View style={styles['button-view']}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles['button']}
                                    onPress={() => this.props.dispatch({ type: 'config/noLongerFirstInZczs' })}
                                >
                                    <Text style={styles['text']}>我知道了</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    )
                }
            </Page>
        )
    }
}

const mapStateToProps = ({ config, user, point }) => {
    return {
        config,
        user,
        sendPoint: point.buryingPoint
    }
};
export default connect(mapStateToProps)(StationHelper)
