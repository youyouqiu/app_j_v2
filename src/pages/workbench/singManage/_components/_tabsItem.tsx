import React, { Component, PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';



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

    

    

    
    
    

    render() {
        const {tabsItem, page, tabsItemIsNull, isEndReached} = this.state;
        if (tabsItem) {
            newRefreshing = false;
        }
        return (
            <View style={{height: '100%'}}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    'content-wrap': {
        display: 'flex',
        flexDirection: 'column',
    },
    
});

export default SingItem;
