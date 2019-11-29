import React, { Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { scaleSize } from '../../../../utils/screenUtil';
import { NavigationScreenProps } from 'react-navigation';
import TabsReportItem from '../_components/_tabsReportItem';
import TabsBeltLookItem from '../_components/_tabsBeltLookItem';
import TabsLapseItem from '../_components/_tabsLapseItem';
import NoData from '../../../../businessComponents/noData';

const tabsTitles: any = [ // ! tabs-title
    { name: '报备', id: '001' },
    { name: '到访', id: '002' },
    { name: '失效', id: '003' },
];
let newRefreshing: boolean = true; // ! FlatList-refreshing

interface propsTypes {
    reportData: any
    totalCount: any
    initReportData: any
    initReportCount: any
    gotoSelectInfo: any
    callPhone: any
    config: any
    user: any
    sendPoint: any
};

interface isTabsItemIsNullType {
    [index: number]: any
};

interface isEndReachedType {
    [index: number]: any
};

class ReportList extends PureComponent<propsTypes & NavigationScreenProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        page: 0, // ! 初始tab页
        tabsItemIsNull: {} as isTabsItemIsNullType, // ! 暂无数据页面是否显示
        isEndReached: {} as isEndReachedType, // ! 上拉加载是否触发
    }

    componentWillReceiveProps(newProps: any) {
        let isEndReached: any = {};
        let tabsItemIsNull: any = {};
        if (((newProps || {}).reportData || {})[newProps.page || 0]) {
            if (newProps.page === 0) {
                isEndReached[0] = newProps.reportData[0].length < (newProps.totalCount || {}).reportTotal;
            }
            if (newProps.page === 1) {
                isEndReached[1] = newProps.tabsItem[1].length < (newProps.totalCount || {}).beltLookTotal;
            }
            if (newProps.page === 2) {
                isEndReached[2] = newProps.tabsItem[2].length < (newProps.totalCount || {}).lapseTotal;
            }
            this.setState({
                isEndReached,
            })
        }
        if (newProps.totalCount) {
            if (newProps.totalCount.reportTotal === 0) {
                tabsItemIsNull[0] = true;
            }
            if (newProps.totalCount.beltLookTotal === 0) {
                tabsItemIsNull[1] = true;
            }
            if (newProps.totalCount.lapseTotal === 0) {
                tabsItemIsNull[2] = true;
            }
            this.setState({
                tabsItemIsNull,
            })
        }
    }

    // ! 提升性能，阻止render做多余渲染（非必要不要使用）
    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log(nextProps, 'nextProps')
        console.log(nextState, 'nextState')
        return nextState.isEndReached !== this.state.isEndReached;
    }

    // ? tabs页面改变时
    onChangeTabs = (page: number) => {
        const { initReportData, initReportCount } = this.props;
        initReportData(page); // 切换tabsTitle时即时请求数据
        initReportCount(); // 切换tabsTitle时即时请求数量
        this.setState({
            page,
        })
    }

    // ? renderItem
    handTabsContent = (item: any, page: number) => {
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

    // ? ListFooterComponent
    handleRenderFooter = (tabsItem: any, page: number) => {
        const { totalCount } = this.props;
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

    // ? 下拉刷新
    refreshData = (page: number) => {
        const { initReportData, initReportCount } = this.props;
        initReportData(page); // 下拉刷新时即时请求数据
        initReportCount(); // 下拉刷新时即时请求数量
    }

    // ? 上拉加载
    endReachedData = (page: number) => {
        const { initReportData, initReportCount } = this.props;
        initReportData(page); // 上拉加载时即时请求数据
        // initReportCount(); // 上拉加载时无需即时请求数量
    }

    render() {
        const { reportData, totalCount } = this.props;
        let { page, tabsItemIsNull, isEndReached } = this.state;
        let tabsItem = ((reportData || {})[page] || []);
        if (tabsItem) {
            newRefreshing = false;
        }
        return (
            <View style={styles['wrap']}>
                {/**tabs-title */}
                <View style={styles['title-wrap']}>
                    {
                        tabsTitles.map((item: any, index: number) => {
                            let newTotalCount: any = {};
                            if (index === 0) {
                                newTotalCount[0] = (totalCount || {}).reportTotal || 0;
                            } else if (index === 1) {
                                newTotalCount[1] = (totalCount || {}).beltLookTotal || 0;
                            } else {
                                newTotalCount[2] = (totalCount || {}).lapseTotal || 0;
                            }
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    style={styles['title-wrapList']}
                                    onPress={() => this.onChangeTabs(index)}
                                >
                                    <Text style={page === index ? styles['title-text'] : null}>
                                        {item.name + (newTotalCount[index] > 0 ? `（${newTotalCount[index]}）` : '')}
                                    </Text>
                                    <View style={page === index ? styles['title-textBottom'] : null}></View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {/**tabs-item */}
                <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
                    {
                        tabsItem.length === 0 && !tabsItemIsNull[page]
                            ? <View style={styles['footer']}><Text>数据正在加载中...</Text></View>
                            : <FlatList
                                style={{ height: '100%' }}
                                data={tabsItem}
                                extraData={this.state}
                                renderItem={({ item }) => this.handTabsContent(item, page)}
                                refreshing={newRefreshing}
                                onRefresh={() => { this.refreshData(page) }}
                                onEndReached={() => { isEndReached[page] ? this.endReachedData(page) : null }}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={tabsItem.length > 0 ? this.handleRenderFooter(tabsItem, page) : null}
                                ListEmptyComponent={tabsItemIsNull[page] ? <NoData tips='抱歉，暂无数据' /> : null}
                            />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'wrap': {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    'title-wrap': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: scaleSize(24),
        backgroundColor: 'white',
    },
    'title-wrapList': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    'title-text': {
        color: '#1F3070',
        marginBottom: scaleSize(20),
        fontSize: scaleSize(28),
    },
    'title-textBottom': {
        width: scaleSize(55),
        height: scaleSize(5),
        backgroundColor: '#1F3070',
    },
    'footer': {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReportList;
