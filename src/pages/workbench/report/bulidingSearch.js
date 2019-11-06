import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, DeviceEventEmitter, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'teaset';
import moment from 'moment';

// 工具
import { scaleSize } from '../../../utils/screenUtil';
import {buildingDataApi, ruleDataApi} from '../../../services/report';

// 组件
import Search from '../../../businessComponents/Search';
import Modal from './../../../components/Modal';

// 样式
import { STYLE } from './style';

const ARROW = require('../../../images/icons/arrow_right.png')

class BulidingSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: false,
            refreshing: false,
            visible: false, // 弹窗状态
            pageIndex: 0,
            pageSize: 8,
            bulidingSearchList: [], // 报备数据
            bulidingTotalCount: 0,
            buildingRuleData: {}, // 报备规则
            reportId: '', // 报备 id
            reportInfo: {}, // 选中的报备信息
        }
    }
    // 防止多次调用onLoadMore
    _loading = false;

    // 一级页面数据接口
    firstDataSource = (conditions) => {
        return buildingDataApi(this.props.config.requestUrl.api, conditions);
    }

    // 二级页面接口
    fetchInternalData = (conditions) => {
        return buildingDataApi(this.props.config.requestUrl.api, conditions);
    }

    // 一级页面数据获取
    getReportDataSource = (keyword,callback) => {
        let { pageIndex, pageSize } = this.state;
        let {user} = this.props;

        this.setState({ loading: true }, async () => {
            try {
                let params = {
                    keyWord: keyword,
                    city: ((user || {}).userInfo || {}).city || '',
                    pageIndex,
                    pageSize,
                }
                let res = await this.firstDataSource(params);

                console.log(res, '一级页面数据获取')
                this.setState({
                    bulidingSearchList: res.extension,
                    bulidingTotalCount: res.totalCount,
                    loading: false,
                }, () => {
                    this.dealData();
                })
            } catch (e) {
                Toast.message('搜索客户失败');
            }
            callback && callback()
        })
    }

    dealData = () => {
        let { bulidingSearchList, bulidingTotalCount } = this.state;
        let dataSource = [
            {
                key: 1,
                data: bulidingSearchList,
                total: bulidingTotalCount,
                pageIndex: 0
            }
        ];

        this.setState({
            dataSource,
        })
    }

    // 二级页面 搜索
    internalSearch = (keyword, key) => {
        this.setState({ loading: true }, async () => {
            try {
                await this.internaInit(keyword, key)
            } catch (e) {
                Toast.message('获取更多失败')
            }
            this.setState({ loading: false })
        })
    }

    // 二级页面 搜索 刷新  通用逻辑
    internaInit = async (keyword, key) => {
        let { pageIndex, pageSize } = this.state;
        let {user} = this.props;
        let params = {
            pageIndex: 0,
            pageSize,
            keyWord: keyword,
            city: ((user || {}).userInfo || {}).city || '',
        }

        try {
            let res = await this.fetchInternalData(params);

            let dataSource = this.state.dataSource.map(i => i.key === key ? {
                key: key,
                data: res.extension,
                total: res.totalCount,
                pageIndex: res.pageIndex,
            }: i);

            this.setState({
                dataSource,
                loading: false,
            })
        } catch (e) {
            Toast.message('获取更多失败');
        }
    }

    handlePressSearch = (keyword, key) => {
        if (!key) {
            // 一级页面搜索
            this.getReportDataSource(keyword)
        } else {
            // 二级页面搜索
            this.internalSearch(keyword, key)
        }
    }

    //点击历史记录 
    handlePressHistory = (keyword,callback) => {
        this.getReportDataSource(keyword,callback)
    }

    // 二级页面 上拉加载  
    handleLoadMore = async (keyword, key) => {
        if (this._loading) return;

        this._loading = true;
        let { pageSize } = this.state;
        let {user} = this.props;
        const { pageIndex } = this.state.dataSource.find(i => i.key === key);
        let params = {
            pageIndex: pageIndex + 1,
            pageSize,
            keyWord: keyword,
            city: ((user || {}).userInfo || {}).city || '',
        }

        try {
            let res = await this.fetchInternalData(params);

            let dataSource = this.state.dataSource.map(i => i.key === key ? {
                key: key,
                data: i.data.concat(res.extension),
                total: res.totalCount,
                pageIndex: res.pageIndex,
            }: i);

            this.setState({
                dataSource,
                loading: false,
            })
        } catch (e) {
            Toast.message('获取更多失败');
        }

        this._loading = false;
    }

    // 二级页面刷新
    handleRefresh = (keyword, key) => {
        this.setState({ refreshing: true }, async () => {
            try {
                await this.internaInit(keyword, key);
            } catch (e) {
                Toast.message('获取更多失败');
            }
        })

        this.setState({ refreshing: false});
    }

    // 渲染 title
    renderTitle = (item, index, callback) => {
        console.log(item, 'itemitemitemitemitem')
        return (
            <View key={index} style={STYLE.searchTitle}>
                <Text style={[STYLE.searchTitleText, { marginLeft: scaleSize(32) }]}>
                    {item.key === 1 ? '报备' : ''}
                </Text>
                {
                    item.total > 3 ?
                        <TouchableOpacity onPress={callback} style={[STYLE.searchRight, { marginRight: scaleSize(32) }]}>
                            <Text style={STYLE.searchTitleText}>查看更多</Text>
                            <Image source={ARROW} style={STYLE.searchArrowImg} />
                        </TouchableOpacity>
                        : null
                }
            </View>
        )
    }

    // 报备规则接口
    initRuleData = async (id) => {
        console.log('报备规则接口')

        let {api} = this.props.config.requestUrl;

        try {
            let res = await ruleDataApi(api, id);
            let buildingRuleData = {};

            console.log(res, 'res');

            if (res && res.code === '0') {
                buildingRuleData = res.extension;

                this.setState({
                    buildingRuleData,
                    visible: true,
                })
            }

        } catch(error) {
            console.log(error);
        }
    }

    // 报备规则数据
    onRuleData = (id) => {
        console.log('报备规则数据', id)

        this.initRuleData(id);
    }

    // 关闭弹窗
    onClose = () => {
        console.log('关闭弹窗')

        this.setState({
            visible: false,
        })
    }

    // 楼盘选择
    onBuildingData = (id, buildingId, name) => {
        console.log('楼盘选择', buildingId)

        let {navigation} = this.props;
        if ((((navigation || {}).state || {}).params || {}).fromCus) {
            // 判断从客户列表的选择项目(搜索楼盘时)
            let param = {
                buildTreeId: id,
                buildingId,
                buildingName: name
            }
            this.props.navigation.navigate('customerList');
            DeviceEventEmitter.emit('ReportBack', param)
        } else {
            let selectBuildingInfo = {
                buildingId,
                buildTreeId: id,
                buildingName: name,
            };

            DeviceEventEmitter.emit('buildingData', selectBuildingInfo);
    
            this.props.navigation.navigate('addReport');

            // ((navigation || {}).state || {}).params(selectBuildingInfo);
        }
    }

    renderItem = (item, index, key) => {
        let renderContent = null;

        renderContent = (
            <TouchableOpacity
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
        )
        
        return (
            renderContent
        )
    }

    render() {
        let {visible, buildingRuleData, dataSource, loading} = this.state;
        let {navigation} = this.props;
        let validityDay = '暂无数据';
        let beltProtectDay = '暂无数据';
        let reportTime = '暂无数据';
        let newTime = '暂无数据';
        let StartTime = '暂无数据';
        let EndTime = '暂无数据';

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
            <>
                <Search
                    navigation={navigation}
                    type='group'
                    placeholder='请输入楼盘名称'
                    dataSource={dataSource}
                    loading={loading}
                    renderTitle={this.renderTitle}
                    renderItem={this.renderItem}
                    onPressSearch={this.handlePressSearch}
                    onPressHistory={this.handlePressHistory}
                    onLoadMore={this.handleLoadMore}
                    onRefresh={this.handleRefresh}
                />

                <Modal
                    visible={visible}
                    transparent={true}
                    type='basic'
                    width={540}
                    height={630}
                    title={''}
                    footerType={'one'}
                    onClose={this.onClose}
                >
                    <ScrollView style={{height: scaleSize(600)}}>
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
                    </ScrollView>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = ({ config, user }) => {
    return { config, user }
}

export default connect(mapStateToProps)(BulidingSearch);
