import {FlatList, Text, View} from 'react-native';
import React, {Component} from 'react';
import scrollViewTabService from '../../services/scrollViewTabService';
import {debounce, debounceLast} from '../../utils/utils';
import {scaleSize} from '../../utils/screenUtil';
import NoData from '../../businessComponents/noData/index'


// const ScrollableTabView = require('react-native-scrollable-tab-view');
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

export class XKJScrollTabView extends Component {

    constructor(props) {
        super();
        this.state = {
            tabs: props.tabs,
            random: null,
            refreshing: false,
            showFooter: true,
            dataSource: Array(props.tabs.length).fill({}),
            markerList: [],
        };
        this.common = {
            activeTabIdx: props.activeTabIdx || 0,
            dataRequestUrl: props.dataRequestUrl,
            markerRequestUrl: props.markerRequestUrl,
            requestData: props.requestData,
            tabIdKey: props.tabIdKey || 'typeId',
            currentPageIndex: 0,
            merge: props.merge === false ? props.merge : true,
            renderTabBar: props.scrollView
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.tabs !== prevState.tabs) {
            return {
                ...prevState,
                tabs: nextProps.tabs,
            }
        }
        if (nextProps.requestData !== prevState.requestData) {
            return {
                ...prevState,
                requestData: {...prevState.requestData, ...nextProps.requestData}
            }
        }
        return null
    }

    componentDidMount() {
        const {tabs} = this.state;
        const {requestData, tabIdKey, activeTabIdx, markerRequestUrl} = this.common;
        const {requestDataManual, refreshMarkers} = this.props;
        if (tabs.length > 0) {
            requestData[tabIdKey] = tabs[activeTabIdx][tabIdKey];
            this.getTabData();
        }

        markerRequestUrl ? this.getMarkers() : null;
        requestDataManual ? requestDataManual(this.onRefresh) : null;
        refreshMarkers ? refreshMarkers(this.getMarkers) : null
    }

    componentDidUpdate() {
        const {tabs, dataSource} = this.state;
        const {tabIdKey, activeTabIdx} = this.common;
        if (tabs.length > 0 && dataSource.length === 0) {
            this.common.requestData[tabIdKey] = tabs[activeTabIdx][tabIdKey];
            this.getTabData();
        }
    }

    getMarkers = async () => {
        const {markerRequestUrl, requestData} = this.common;
        const response = await scrollViewTabService.getMarkers(markerRequestUrl, requestData);
        let markerList = [];
        for (let key in response.extension || {}) {
            markerList.push(response.extension[key])
        }
        console.log(markerList);
        this.setState({markerList: markerList})
    };

    getTabData = async () => {
        const {dataRequestUrl, requestData, activeTabIdx, merge} = this.common;
        let {tabs, dataSource} = this.state;
        try {
            const response = await scrollViewTabService.getTabDataRequest(dataRequestUrl, requestData);
            if (response.code === '0') {
                const {pageIndex, pageSize, totalCount} = response;
                if (dataSource.length === 0) {
                    dataSource = Array(tabs.length).fill({});
                }
                if (JSON.stringify(dataSource[activeTabIdx]) === '{}') {
                    response.hasMore = (pageIndex + 1) * pageSize < totalCount;
                    dataSource[activeTabIdx] = response;
                } else {
                    if (merge) {
                        response.extension = [...dataSource[activeTabIdx].extension, ...response.extension];
                    } else {
                        response.extension = [...response.extension];
                    }
                    response.hasMore = (pageIndex + 1) * pageSize < totalCount;
                    dataSource[activeTabIdx] = response;
                }
                this.setState({
                    dataSource,
                    refreshing: false,
                    showFooter: true
                })
            }
        } catch (e) {
            console.log(e)
        }
    };

    onEndReached = () => {
        const {dataSource} = this.state;
        const {activeTabIdx} = this.common;
        debounce(() => {
            this.common.requestData.pageIndex = dataSource[activeTabIdx].pageIndex + 1;
            this.getTabData();
        }, 500)();
    };

    onRefresh = () => {
        this.setState({refreshing: true, showFooter: false});
        let {dataSource} = this.state;
        const {activeTabIdx} = this.common;
        dataSource[activeTabIdx] = {};
        this.setState({dataSource}, () => {
            debounceLast(() => {
                this.common.requestData.pageIndex = 0;
                this.getTabData();
            }, 500)();
        });
    };

    onChangeTab = (e) => {
        const {onChangeTab} = this.props;
        this.common.activeTabIdx = e.i;
        const {tabIdKey} = this.common;
        const {dataSource, tabs} = this.state;
        const dataSourceItem = {...dataSource[e.i]};
        this.common.requestData[tabIdKey] = tabs[e.i][tabIdKey];
        if (JSON.stringify(dataSourceItem) === '{}') {
            this.common.requestData.pageIndex = 0;
            this.getTabData()
        }
        onChangeTab ? onChangeTab(tabs[e.i][tabIdKey]) : null;
    };

    listFooterComponent = (hasMore) => {
        const {showFooter} = this.state;
        if (showFooter && (hasMore || hasMore === undefined)) {
            return (
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: scaleSize(68)}}>
                    <Text style={{color: '#868686', fontSize: 14, marginTop: scaleSize(24)}}>数据正在加载中...</Text>
                </View>
            )
        }
        // else if (showFooter && !hasMore) {
        //     return (
        //         <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50}}>
        //             <Text style={{color: '#868686', fontSize: 14, marginTop: scaleSize(24)}}>没有更多数据</Text>
        //         </View>
        //     )
        // }
    };

    renderLabel = (idx) => {
        const {tabs, markerList} = this.state;
        const tabItem = tabs[idx];
        const marker = markerList[idx];
        return marker > 0 ? tabItem.name + '(' + marker + ')' : tabItem.name;
    };

    render() {
        const {tabItemComponent} = this.props;
        const {dataSource, showFooter, refreshing} = this.state;
        const renderTabBar = dataSource.length > 5 ? <ScrollableTabBar/> : <DefaultTabBar/>;
        const sameRenderItem = tabItemComponent.length !== dataSource.length;
        return (
            <View style={{height: '100%'}}>
                {dataSource.length > 0 ? (
                    <ScrollableTabView renderTabBar={() => renderTabBar} {...this.props}
                                       onChangeTab={this.onChangeTab}>
                        {dataSource.map((item, idx) => (
                            <View tabLabel={this.renderLabel(idx)} key={idx} style={{flex:1}}>
                                <FlatList
                                    style={{flex:1}}
                                    renderItem={sameRenderItem ? tabItemComponent[0] : tabItemComponent[idx]}
                                    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={showFooter && !item.hasMore ? this.listFooterComponent(item.hasMore) : null}
                                    onEndReached={() => item.hasMore ? this.onEndReached(idx, item.name) : null}
                                    onEndReachedThreshold={0.1}
                                    onRefresh={() => this.onRefresh(idx, item.name)}
                                    refreshing={refreshing}
                                    data={item.extension}
                                    ListEmptyComponent={item.extension && item.extension.length === 0 ? <NoData tips='抱歉，暂无数据'/> : null}
                                />
                            </View>
                        ))}
                    </ScrollableTabView>
                ) : <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#868686', fontSize: 14, marginTop: scaleSize(24)}}>数据正在加载中...</Text>
                </View>}
            </View>
        )
    }
}
