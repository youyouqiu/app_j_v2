import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, FlatList, DeviceEventEmitter, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'teaset';
import moment from 'moment';

// 工具
import {scaleSize} from './../../../utils/screenUtil';
import {buildingDataApi, ruleDataApi} from './../../../services/report';

// 组件
import BaseContainer from '../../../components/Page';
import Modal from './../../../components/Modal';
import NoData from './../../../businessComponents/noData';
import SwitchView from './../../../components/SwitchView';
// 样式
import {STYLE} from './style';
const SwitchViewItem = SwitchView.Item;
class ReportBuilding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true, // 加载状态
            moreLoading: false,
            initError: false,
            isRefreshing: false,
            pageIndex: 0,
            totalCount: 0,
            visible: false, // 弹窗状态
            buildingId: '', // 楼盘 id
            buildingList: [], // 楼盘列表数据
            buildingRuleData: {}, // 报备规则数据
            animating: false, // ActivityIndicator
        }
    }
    
    componentDidMount() {
        this.initData();
    }

    componentWillUnmount() {
        // 移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }

    // 楼盘列表接口
    initData = async (type = 'init') => {
        try {
            type === 'init' && await this.setState({loading: true});
            type === 'update' && await this.setState({isRefreshing: true});
            type === 'more' && await this.setState({moreLoading: true});
            const {user} = this.props;
            console.log(user, 'user')
            const res = await buildingDataApi(this.props.config.requestUrl.api, {
                keyWord: '',
                pageIndex: this.state.pageIndex,
                pageSize: 30,
                city: ((user || {}).userInfo || {}).city || '',
                // city: '',
            });
            let list = res.extension || [];
            if (type === 'more') {
                console.log('more')
                let _list = this.state.buildingList || [];
                list = _list.concat(list);
            }
            this.setState({
                buildingList: list,
                initError: false,
                totalCount: res.totalCount || 0
            });
            console.log(res, 'res--res')
        } catch (e) {
            console.log(e, '请求失败');
            type === 'init' && this.setState({initError: true});
            type !== 'init' && Toast.message(e.message || '请求失败')
        } finally {
            type === 'init' && this.setState({loading: false});
            type === 'update' && await this.setState({isRefreshing: false});
            type === 'more' && await this.setState({moreLoading: false});
        }
    }

    _keyExtractor = (item, index) => index.toString();

    _onRefresh = async () => {
        try {
            if (!this.state.isRefreshing) {
                await this.setState({pageIndex: 0})
                this.initData('update');
            }
        } catch(e) {}
    };

    _onEndReached = async () => {
        if (!this.state.moreLoading && this.state.totalCount !== this.state.buildingList.length) {
            let currPage = this.state.pageIndex;
            currPage ++;
            await this.setState({pageIndex: currPage});
            await this.initData('more')
        }
    };

    // 跳转搜索页面
    gotoSearchPage = () => {
        let {navigation} = this.props;

        this.props.navigation.navigate('bulidingSearch', ((navigation || {}).state || {}).params);
    }

    // 关闭弹窗
    onClose = () => {
        console.log('关闭弹窗')

        this.setState({
            visible: false,
        })
    }

    // 报备规则接口
    initRuleData = async (buildingId) => {
        console.log('报备规则接口')
        let {api} = this.props.config.requestUrl;

        this.setState({
            buildingRuleData: {},
            visible: true,
            animating: true,
        })

        try {
            let res = await ruleDataApi(api, buildingId);
            let buildingRuleData = {};

            console.log(res, 'res');

            if (res && res.code === '0') {
                buildingRuleData = res.extension;

                this.setState({
                    animating: false,
                    buildingRuleData,
                })
            }
        } catch(error) {
            console.log(error);
        }
    }

    // 楼盘选择
    onBuildingData = (id, buildingId, name) => {
        console.log('楼盘选择', buildingId)

        let {navigation} = this.props;

        if ((((navigation || {}).state || {}).params || {}).fromCus) {
            // 判断从客户列表的选择项目
            console.log(this.props.navigation, 'this.props.navigation')
            let param = {
                buildTreeId: id,
                buildingId,
                buildingName: name
            }
            // this.props.navigation.goBack('customerList', {buildTreeId: buildTreeId});
            
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('ReportBack', param)
        } else {
            let selectBuildingInfo = {
                buildingId,
                buildTreeId: id,
                buildingName: name,
            };

            DeviceEventEmitter.emit('buildingData', selectBuildingInfo);

            this.props.navigation.navigate('addReport');
    
            // setTimeout(() => {
            //     ((navigation || {}).state || {}).params(selectBuildingInfo);
    
            //     this.props.navigation.navigate('addReport');
            // }, 380)
        }        
    }

    // 报备规则数据
    onRuleData = (buildingId) => {
        console.log('报备规则数据', buildingId)

        this.initRuleData(buildingId);
    }

    onErrorPress = () => {
        if (!this.loading) {
            this.setState({pageIndex: 0}, () => {this.initData('init')});
        }
    }

    render() { 
        let {loading, visible, buildingList, buildingRuleData, isRefreshing, moreLoading, initError, animating} = this.state;
        let reportTime = '暂无数据';
        let StartTime = '暂无数据';
        let EndTime = '暂无数据';
        let newTime = '暂无数据';
        let beltProtectDay = '暂无数据';
        let validityDay = '暂无数据';

        if (buildingRuleData.reportTime) {
            reportTime = moment(buildingRuleData.reportTime).format('YYYY-MM-DD HH:mm:ss');
        }

        if (buildingRuleData.liberatingStart) {
            StartTime = moment(buildingRuleData.liberatingStart).format('HH:mm');
        }

        if (buildingRuleData.liberatingEnd) {
            EndTime = moment(buildingRuleData.liberatingEnd).format('HH:mm');
        }

        if (buildingRuleData.beltProtectDay === 99999) {
            beltProtectDay = '永久';
        } else if (buildingRuleData.beltProtectDay) {
            beltProtectDay = `${buildingRuleData.beltProtectDay}天`;
        }

        if (buildingRuleData.validityDay === 0) {
            validityDay = '当天';
        } else if (buildingRuleData.validityDay === 99999) {
            validityDay = '永久';
        } else if (buildingRuleData.validityDay) {
            validityDay = `${buildingRuleData.validityDay}天`;
        }

        newTime = `${StartTime} - ${EndTime}`;

        return (
            <BaseContainer
                scroll={false}
                error={{
                    isError: initError,
                    onErrorPress: () => {
                        // if (!this.loading) {
                        //     this.setState({pageIndex: 0}, this.initData('init'))
                        // }
                        this.onErrorPress()
                    }
                }}
                title='楼盘选择'
                bodyStyle={{padding: 0, backgroundColor: 'rgba(248,248,248,1)'}}
                loading={loading}
            >
                <View style={STYLE.bulidingSearchWarp}>
                    <TouchableOpacity
                        style={STYLE.bulidingSearchBtn}
                        activeOpacity={0.8}
                        onPress={() => {this.gotoSearchPage()}}
                    >
                        <Image
                            style={STYLE.topImg}
                            source={require('../../../images/icons/searchCus.png')}
                        />
                        <Text>请输入楼盘名称</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={STYLE.flatList}
                    data={buildingList}
                    refreshing={isRefreshing}
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    renderItem={(curr, index) => {
                        const item = curr.item;
                        return <TouchableOpacity
                            style={[STYLE.click]}
                            activeOpacity={0.8}
                            onPress={() => {this.onBuildingData(item.id, item.buildingId, item.name)}}
                            key={index}
                        >
                            <View style={[STYLE.warp, STYLE.top]}>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <View style={[STYLE.topRight, {marginTop: scaleSize(8)}]}>
                                        <Text style={STYLE.buildingTypeText}>{item.buildingType || ''}</Text>
                                        <Text
                                            style={[STYLE.fontMiddle, {fontSize: scaleSize(28), width: scaleSize(330)}]}
                                            numberOfLines={1}
                                            ellipsizeMode={'middle'}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={{display: 'flex', flexDirection: 'column'}}>
                                        <Text style={STYLE.contentTime}>{item.areaFullName}</Text>
                                        <Text style={STYLE.contentTime}>
                                            在售房源：<Text style={{color: 'rgba(0,0,0,1)'}}>{item.shopsStock}</Text>
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[STYLE.ruleBtn, STYLE.topRight]}
                                    onPress={() => {this.onRuleData(item.id)}}
                                >
                                    <Text style={{fontSize: scaleSize(28), color: 'rgba(0,0,0,1)'}}>报备规则</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    }}
                    ListEmptyComponent={<NoData tips='抱歉，没有相关信息' style={{marginTop: '50%'}}/>}
                    ListFooterComponent = {
                        (buildingList.length) ? (<Text style={STYLE.more}>{moreLoading ? '加载中~' : '~没有更多了~'}</Text>) : null
                    }
                >
                </FlatList>
                
                <Modal
                    visible={visible}
                    transparent={true}
                    type='basic'
                    width={540}
                    height={690}
                    title={''}
                    footerType={'one'}
                    onClose={this.onClose}
                >
                    <ScrollView style={{height: scaleSize(600)}}>
                        <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                            <SwitchView current={animating ? 'loading' : 'default' }>
                                <SwitchViewItem type='loading'>
                                    <View style={STYLE.modalQRCodeAnimating}>
                                        <ActivityIndicator size="large" />
                                    </View>
                                </SwitchViewItem>
                                <SwitchViewItem type={'default'}>
                                    <View style={{display: 'flex', flexDirection: 'column'}}>
                                        <View style={{display: 'flex', flexDirection: 'row'}}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>报备有效期：</Text>
                                            <Text style={STYLE.modalText}>{validityDay}</Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>带看保护期：</Text>
                                            <Text style={STYLE.modalText}>{beltProtectDay}</Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>报备开始时间：</Text>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(0,0,0,1)'}}>{reportTime || '暂无数据'}</Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>接访时间：</Text>
                                            <Text style={[STYLE.modalText, {marginLeft: scaleSize(48)}]}>{newTime || '暂无数据'}</Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>报备备注：</Text>
                                            <Text style={[STYLE.modalText, {marginLeft: scaleSize(48)}]}>
                                                {buildingRuleData.mark || '暂无数据'}
                                            </Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>覆盖房源：</Text>
                                            <Text style={[STYLE.modalText, {marginLeft: scaleSize(48)}]}>
                                                {(buildingRuleData.housingResources || []).join('，') || '暂无数据'}
                                            </Text>
                                        </View>
                                        <View style={STYLE.modalWarp}>
                                            <Text style={{fontSize: scaleSize(24), color: 'rgba(134,134,134,1)'}}>项目经理：</Text>
                                            <Text style={[STYLE.modalText, {marginLeft: scaleSize(48)}]}>
                                                {buildingRuleData.residentUser || '暂无数据'}
                                            </Text>
                                        </View>
                                    </View>
                                </SwitchViewItem>
                            </SwitchView>
                        </View>
                    </ScrollView>
                </Modal>
            </BaseContainer>
        )
    }
}

const mapStateToProps = ({config, user})=> {
    return {config, user}
}

export default connect(mapStateToProps)(ReportBuilding);
