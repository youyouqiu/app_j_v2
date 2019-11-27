import React, { Component, PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {scaleSize} from '../../../../utils/screenUtil';
import ListItem from '../listItem';
import NoData from '../../../../businessComponents/noData';

let newRefreshing = true;

interface propsTypes {
    singData: any
    totalCount: any
    page: number
    initSingData: any
    initSingCount: any
    gotoDetail: any
    tabsItem: any
    config: any
    user: any
    sendPoint: any
};

interface totalCountTypes {
    dealCount: number
    returnCount: number
    subCount: number
}

interface isEndReachedType {
    [index: number]: any
}

class SingItem extends PureComponent<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        tabsItem: [],
        tabsItemIsNull: false,
        page: 0,
        totalCount: {} as totalCountTypes,
        isEndReached: {} as isEndReachedType, // 是否触发上拉加载
    }

    componentDidMount() {}

    componentWillReceiveProps(newProps: any) {
        let isEndReached: any = {};
        if (((newProps || {}).totalCount || {}).subCount >= 0) {
            if (newProps.page === 0) {
                isEndReached[0] = newProps.tabsItem.length < (newProps.totalCount || {}).subCount;
            }
            if (newProps.page === 1) {
                isEndReached[1] = newProps.tabsItem.length < (newProps.totalCount || {}).dealCount;
            }
            if (newProps.page === 2) {
                isEndReached[2] = newProps.tabsItem.length < (newProps.totalCount || {}).returnCount;
            }
            this.setState({
                tabsItem: newProps.tabsItem,
                page: newProps.page,
                totalCount: newProps.totalCount,
                isEndReached,
            })
        }
        if (newProps.totalCount) {
            if (newProps.page === 0 && newProps.totalCount.subCount === 0) {
                this.setState({
                    tabsItemIsNull: true,
                })
            }
            if (newProps.page === 1 && newProps.totalCount.dealCount === 0) {
                this.setState({
                    tabsItemIsNull: true,
                })
            }
            if (newProps.page === 2 && newProps.totalCount.returnCount === 0) {
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
        const {initSingData, initSingCount} = this.props;
        initSingData(page); // 下拉刷新时即时请求数据
        initSingCount(); // 下拉刷新时即时请求数量
    }

    // 上拉加载
    endReachedData = (page: number) => {
        const {initSingData, initSingCount} = this.props;
        initSingData(page); // 下拉刷新时即时请求数据
        // initSingCount(); // 下拉刷新时即时请求数量
    }

    // renderItem
    handTabsContent = (item: any) => {
        const {gotoDetail} = this.props;
        return (
            <View style={{marginTop: scaleSize(32)}}>
                <ListItem item={item} gotoDetail={() => gotoDetail(item)} />
            </View>
        )
    }
    
    // ListFooterComponent
    handleRenderFooter = () => {
        const {totalCount, tabsItem, page} = this.state;
        let text: string = '～ 没有了 ～';
        if (page === 0) {
            text = tabsItem.length < (totalCount || {}).subCount ? '数据正在加载中...' : '～ 没有了 ～';
        }
        if (page === 1) {
            text = tabsItem.length < (totalCount || {}).dealCount ? '数据正在加载中...' : '～ 没有了 ～';
        }
        if (page === 2) {
            text = tabsItem.length < (totalCount || {}).returnCount ? '数据正在加载中...' : '～ 没有了 ～';
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

export default SingItem;
