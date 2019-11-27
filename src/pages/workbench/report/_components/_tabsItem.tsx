import React, { Component, PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TabsReportItem from '../_components/_tabsReportItem';
import TabsBeltLookItem from '../_components/_tabsBeltLookItem';
import TabsLapseItem from '../_components/_tabsLapseItem';
import NoData from '../../../../businessComponents/noData';

let newRefreshing: boolean = true;

interface propsTypes {
    reportData: any
    totalCount: any
    page: number
    gotoSelectInfo: any
    initReportData: any
    initReportCount: any
    callPhone: any
    tabsItem: any
    config: any
    user: any
    sendPoint: any
};

interface totalCountTypes {
    reportTotal: number
    beltLookTotal: number
    lapseTotal: number
};

interface isEndReachedType {
    [index: number]: any
}

class ReportItem extends PureComponent<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        tabsItem: [],
        page: 0,
        tabsItemIsNull: false,
        totalCount: {} as totalCountTypes,
        isEndReached: {} as isEndReachedType, // 是否触发上拉加载
    }

    componentDidMount() {}

    componentWillReceiveProps(newProps: any) {
        let isEndReached: any = {};
        if (((newProps || {}).totalCount || {}).reportTotal >= 0) {
            if (newProps.page === 0) {
                isEndReached[0] = newProps.tabsItem.length < (newProps.totalCount || {}).reportTotal;
            }
            if (newProps.page === 1) {
                isEndReached[1] = newProps.tabsItem.length < (newProps.totalCount || {}).beltLookTotal;
            }
            if (newProps.page === 2) {
                isEndReached[2] = newProps.tabsItem.length < (newProps.totalCount || {}).lapseTotal;
            }
            this.setState({
                tabsItem: newProps.tabsItem,
                page: newProps.page,
                totalCount: newProps.totalCount,
                isEndReached,
            })
        }
        if (newProps.totalCount) {
            if (newProps.page === 0 && newProps.totalCount.reportTotal === 0) {
                this.setState({
                    tabsItemIsNull: true,
                })
            }
            if (newProps.page === 1 && newProps.totalCount.beltLookTotal === 0) {
                this.setState({
                    tabsItemIsNull: true,
                })
            }
            if (newProps.page === 2 && newProps.totalCount.lapseTotal === 0) {
                this.setState({
                    tabsItemIsNull: true,
                })
            }
        }
    }

    // ! 提升性能，阻止render做多余渲染（非必要不要使用）
    // shouldComponentUpdate(nextProps: any, nextState: any) {
    //     console.log(nextProps, 'nextProps')
    //     console.log(nextState, 'nextState')
    //     return nextState.tabsItem !== this.state.tabsItem;
    // }

    // 下拉刷新
    refreshData = (page: number) => {
        const {initReportData, initReportCount} = this.props;
        initReportData(page); // 下拉刷新时即时请求数据
        initReportCount(); // 下拉刷新时即时请求数量
    }

    // 上拉加载
    endReachedData = (page: number) => {
        console.log(page, 'endReachedData');
        const {initReportData, initReportCount} = this.props;
        initReportData(page); // 上拉加载时即时请求数据
        // initReportCount(); // 上拉加载时时即时请求数量
    }

    // renderItem
    handTabsContent = (item: any) => {
        const {page} = this.state;
        if (page === 0) {
            return (
                <TabsReportItem {...this.props} contentList={item} />
            )
        } else if (page === 1) {
            return (
                <TabsBeltLookItem {...this.props} contentList={item} />
            )
        } else {
            return (
                <TabsLapseItem {...this.props} contentList={item} />
            )
        }
    }
    
    // ListFooterComponent
    handleRenderFooter = () => {
        const {totalCount, tabsItem, page} = this.state;
        let text: string = '～ 没有了 ～';
        if (page === 0) {
            text = tabsItem.length < (totalCount || {}).reportTotal ? '数据正在加载中...' : '～ 没有了 ～';
        }
        if (page === 1) {
            text = tabsItem.length < (totalCount || {}).beltLookTotal ? '数据正在加载中...' : '～ 没有了 ～';
        }
        if (page === 2) {
            text = tabsItem.length < (totalCount || {}).lapseTotal ? '数据正在加载中...' : '～ 没有了 ～';
        }
        return (
            <View style={styles['footer']}>
                <Text>{text}</Text>
            </View>
        )
    }

    render() {
        const {tabsItem, page, tabsItemIsNull, isEndReached} = this.state;
        if (tabsItem) {
            newRefreshing = false;
        }
        return (
            <View style={{height: '100%'}}>
                {
                    tabsItem.length === 0 && !tabsItemIsNull
                    ? <View style={styles['footer']}><Text>数据正在加载中...</Text></View>
                    : <FlatList
                        style={{height: '100%'}}
                        data={tabsItem}
                        extraData={this.state}
                        renderItem={({item}) => this.handTabsContent(item)}
                        refreshing={newRefreshing}
                        onRefresh={() => {this.refreshData(page)}}
                        onEndReached={() => {isEndReached[page] ? this.endReachedData(page) : null}}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={tabsItem.length > 0 ? this.handleRenderFooter : null}
                        ListEmptyComponent={tabsItemIsNull ? <NoData tips='抱歉，暂无数据'/> : null}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'content-wrap': {
        display: 'flex',
        flexDirection: 'column',
    },
    'footer': {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReportItem;
