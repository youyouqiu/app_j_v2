import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {Component} from 'react';
import scrollViewTabService from '../../services/scrollViewTabService';
import {debounce, debounceLast} from '../../utils/utils';
import {scaleSize} from '../../utils/screenUtil';
import NoData from '../../businessComponents/noData/index'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from '@new-space/react-native-scrollable-tab-view';
import {cloneDeep} from 'lodash'
export class XKJScrollTabView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: props.tabs,
            random: null,
            refreshing: false,
            showFooter: true,
            dataSource: Array(props.tabs.length).fill({}),
            markerList: [],
            showEmptyComponent: false,
            showSkeleton: true
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
        this.setState({markerList: markerList})
    };

    getTabData = async () => {
        const {dataRequestUrl, requestData, activeTabIdx} = this.common;
        console.log(cloneDeep(requestData))
        let {tabs, dataSource} = this.state;
        try {
            const response = await scrollViewTabService.getTabDataRequest(dataRequestUrl, requestData);
            console.log(cloneDeep(response))
            if (response.code === '0') {
                const {pageIndex, pageSize, totalCount} = response;
                if (dataSource.length === 0) {
                    dataSource = Array(tabs.length).fill({});
                }
                response.hasMore = (pageIndex + 1) * pageSize < totalCount;
                if (JSON.stringify(dataSource[activeTabIdx]) === '{}') {
                    response.showEmptyComponent = response.extension.length === 0;
                } else {
                    response.showEmptyComponent = [...dataSource[activeTabIdx].extension, ...response.extension].length === 0;
                    response.extension = [...dataSource[activeTabIdx].extension, ...response.extension];
                }
                dataSource[activeTabIdx] = response;
                this.setState({
                    dataSource,
                    refreshing: false,
                    showSkeleton: false,
                })
            }else {
                this.setState({
                    showSkeleton: false,
                })
            }
        } catch (e) {
            this.setState({
                showSkeleton: false,
            })
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
        const {tabIdKey, activeTabIdx} = this.common;
        const {dataSource, tabs} = this.state;
        const dataSourceItem = {...dataSource[e.i]};
        this.common.requestData[tabIdKey] = tabs[e.i][tabIdKey];
        if (JSON.stringify(dataSourceItem) === '{}' || this.props.changeTabRefresh) {
            dataSource[activeTabIdx] = {};
            this.common.requestData.pageIndex = 0;
            this.getTabData()
        }
        onChangeTab ? onChangeTab(tabs[e.i][tabIdKey]) : null;
    };

    listFooterComponent = (hasMore) => {
        const {refreshing} = this.state;
        if (!refreshing && (hasMore || hasMore === undefined)) {
            return (
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: scaleSize(68)}}>
                    <ActivityIndicator/>
                </View>
            )
        }
    };

    renderLabel = (idx) => {
        const {tabs, markerList} = this.state;
        const tabItem = tabs[idx];
        const marker = markerList[idx];
        return marker > 0 ? tabItem?.name + '(' + marker + ')' : tabItem?.name;
    };

    render() {
        const {tabItemComponent, skeleton} = this.props;
        const {dataSource, refreshing, showSkeleton} = this.state;
        const renderTabBar = dataSource.length > 5 ? ScrollableTabBar : DefaultTabBar;
        const sameRenderItem = tabItemComponent.length !== dataSource.length;
        return (
            <View style={{height: '100%'}}>
                {!showSkeleton ? (
                    dataSource.length > 0 ? (
                        <ScrollableTabView renderTabBar={renderTabBar} {...this.props}
                                           onChangeTab={this.onChangeTab}>
                            {dataSource.map((item, idx) => (
                                <View data-value={{name: this.renderLabel(idx)}} key={idx} style={{flex: 1}}>
                                    <FlatList
                                        style={{flex: 1}}
                                        renderItem={sameRenderItem ? tabItemComponent[0] : tabItemComponent[idx]}
                                        showsVerticalScrollIndicator={false}
                                        ListFooterComponent={!item.showEmptyComponent ? this.listFooterComponent(item.hasMore) : null}
                                        onEndReached={() => item.hasMore ? this.onEndReached(idx, item?.name) : null}
                                        onEndReachedThreshold={0.1}
                                        onRefresh={() => this.onRefresh(idx, item?.name)}
                                        refreshing={refreshing}
                                        data={item.extension}
                                        ListEmptyComponent={item.showEmptyComponent ? <NoData tips='抱歉，暂无楼盘信息'/> : null}
                                    />
                                </View>
                            ))}
                        </ScrollableTabView>
                    ) : null
                ) : (skeleton ? skeleton : null)}
            </View>
        )
    }
}
