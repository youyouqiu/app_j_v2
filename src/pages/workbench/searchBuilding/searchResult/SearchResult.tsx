import {ActivityIndicator, FlatList, Image, SectionList, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useReducer, useState} from "react";
import {connect} from "react-redux";
import BaseContainer from '../../../../components/Page'
import styles from "./styles";
import ChoiceLabel from "../components/ChoiceLabel";
import Label from "../components/Label";
import {searchBuildingService} from "../../../../services/searchBuildingService";
import {debounce} from "../../../../utils/utils";
import NoData from "../../../../businessComponents/noData";
import {scaleSize} from "../../../../components/new-space/utils/screenUtil";
import navigation from "../../../../utils/navigation";
import BuryingPoint from "@/utils/BuryPoint";


const SearchResult = (props: any) => {

    const initialState: any = {
        "sessionListData": [],
        "pageIndex": 0,
        "pageSize": 30,
        "refreshing": false,
        "hasMore": true,
        "random": Math.random()
    };

    const {dictionaries} = props;
    const {house_type_obj, shop_status_obj, shop_configuration_obj} = dictionaries;
    const propsData = props.navigation.state.params.requestData;

    const reducer = (state: any, action: any) => {
        return {...state, ...action.payload}
    };

    const [state, stateDispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getDemandData();
    }, [state.pageIndex, state.random]);

    const getDemandData = async () => {
        /*寻铺结果*/
        const requestData = {...propsData, pageSize: initialState.pageSize, pageIndex: state.pageIndex};
        if (requestData.hasOwnProperty('showText')) delete requestData['showText'];
        const demandResult = await searchBuildingService.demandDataReq(requestData).catch(err => {
            console.log('寻铺结果异常：', err)
        });
        if (!demandResult) return;
        console.log('寻铺结果：', demandResult);
        const {shopTotalCount, extension, totalCount} = demandResult;
        const prevDemandData = ((state.sessionListData[0] || {}).data) || [];
        const sessionListData: any = [
            {
                title: {shopTotalCount, totalCount, type: 'demand'},
                data: [...prevDemandData, ...extension]
            },
        ];
        if (sessionListData[0].data.length > 3) {
            const payload = {sessionListData, refreshing: false, hasMore: ((state.pageIndex + 1) * state.pageSize) < totalCount};
            stateDispatch({type: 'updateDemandData', payload});
            return
        }
        /*推荐结果*/
        requestData.excludeBuildingTreeIds = extension.map((item: any) => {
            return item.buildingTreeId
        });
        const recommendResult = await searchBuildingService.recommendDataReq(requestData).catch(err => {
            console.log('寻铺推荐结果异常：', err);
            const payload = {sessionListData, refreshing: false};
            stateDispatch({type: 'updateDemandData', payload});
        });
        if (!recommendResult) return;

        const prevRecommendData = ((state.sessionListData[1] || {}).data) || [];
        sessionListData.push(
            {
                title: {shopTotalCount: recommendResult.shopTotalCount, totalCount: recommendResult.totalCount, type: 'recommend'},
                data: [...prevRecommendData, ...recommendResult.extension]
            },
        );
        const payload = {sessionListData, refreshing: false, hasMore: ((state.pageIndex + 1) * state.pageSize) < totalCount};
        stateDispatch({type: 'updateDemandData', payload});
        console.log('SearchResult111_寻铺推荐结果：', recommendResult);
    };

    const toDetail = (data: any) => {
        BuryingPoint.add({
            page: '工作台-侦探寻铺',
            target: '寻铺结果_楼盘_button',
            action_param: {
                buildingTreeId: data.buildingTreeId
            }
        });
        navigation.navigate('buildingDetail', {buildingTreeId: data.buildingTreeId})
    };

    const toShopDetail = (data: any, _data: any) => {
        BuryingPoint.add({
            page: '工作台-侦探寻铺',
            target: '寻铺结果_商铺_button',
            action_param: {
                shopId: _data.shopsId
            }
        });
        navigation.navigate('shopDetail', {buildingTreeId: data.buildingTreeId, shopId: _data.shopsId})
    };

    const onRefresh = () => {
        const payload = {
            pageIndex: 0,
            refreshing: true,
            sessionListData: [],
            random: Math.random()
        };
        stateDispatch({type: 'updateDemandData', payload});
    };

    const onEndReached = () => {
        if (state.sessionListData.length >= 2 || !state.hasMore) {
            return
        }
        const payload = {
            pageIndex: state.pageIndex + 1
        };
        stateDispatch({type: 'updateDemandData', payload});
    };

    const listHeaderComponent = () => {

        const demandList = [];
        if (propsData.hasOwnProperty('showText') && propsData.showText.length > 0) {
            demandList.push(...propsData.showText)
        }
        if (propsData.hasOwnProperty('minPrice') && propsData.hasOwnProperty('maxPrice')) {
            demandList.push(propsData.minPrice + '-' + propsData.maxPrice + '万')
        }
        if (propsData.hasOwnProperty('minArea') && propsData.hasOwnProperty('maxArea')) {
            if (!propsData.maxArea) {
                demandList.push(propsData.minArea + '㎡+')
            } else {
                demandList.push(propsData.minArea + '-' + propsData.maxArea + '㎡')
            }
        }
        if (propsData.hasOwnProperty('shopType')) {
            demandList.push(house_type_obj[propsData.shopType])
        }
        if (propsData.hasOwnProperty('shopFacilities') && propsData.shopFacilities.length > 0) {
            demandList.push(...propsData.shopFacilities)
        }
        if (propsData.hasOwnProperty('buildingFacilities')) {
            demandList.push(...propsData.buildingFacilities)
        }

        return (
            <View style={styles.sr_headerComponent}>
                <View style={styles.sr_demandWrap}>
                    <Text style={styles.sr_demandLabel}>您的定制需求</Text>
                    <View style={styles.sr_demandContent}>
                        {demandList.map((item: any, idx: any) => (
                            <View style={{flexDirection: 'row', width: '25%', flexWrap: 'wrap', paddingRight: scaleSize(6), paddingLeft: scaleSize(6)}}>
                                <ChoiceLabel idx={idx} data={{value: item}} isSelected={true}/>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        )
    };

    const listFooterComponent = () => {
        if (state.refreshing) return null;
        if (state.hasMore) {
            return <View style={styles.sr_footerWrapper}><ActivityIndicator/><Text>&emsp;加载中</Text></View>;
        }
        return <View style={styles.sr_footerWrapper}><Text>无更多数据</Text></View>;
    };

    const renderSectionHeader = ({section: {data, title}}: any) => {
        let renderContent = null;
        if (title.type === 'demand') {
            renderContent = (
                <View>
                    <Text style={styles.sr_resultText}>
                        铺侦探为您找到<Text style={styles.sr_resultNum}>{title.totalCount}</Text>个楼盘，总共<Text style={styles.sr_resultNum}>{title.shopTotalCount}</Text>个房源
                    </Text>
                    {data.length === 0 ? <NoData style={{paddingBottom: scaleSize(20)}}/> : null}
                </View>
            );
        } else if (title.type === 'recommend' && data.length > 0)
            renderContent = (
                <Text style={styles.sr_resultText}>
                    铺侦探为您推荐<Text style={styles.sr_resultNum}>{title.totalCount}</Text>个楼盘
                </Text>
            );
        return renderContent
    };

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => toDetail(item)} style={styles.sr_itemContent}>
                <View style={styles.sr_buildingInfo}>
                    <View style={styles.sr_buildingTitleWrap}>
                        <View style={styles.sr_buildingTitleContainer}>
                            <Text style={styles.sr_buildingTitle}
                                  numberOfLines={1}>{item.buildingTreeName}</Text>
                            <Label _key={house_type_obj[item.buildingTreeCategory]}/>
                        </View>
                        <View style={styles.sr_rightIconWrap}>
                            <Image style={styles.sr_rightIcon} source={require('../../../../images/icons/chose.png')}/>
                        </View>
                    </View>
                    <Text style={styles.sr_saleShops}>可售商铺：<Text style={styles.sr_saleShopsNum}>{item.buildingTreeShopsStock}</Text></Text>
                </View>
                <View style={styles.sr_shopsContent}>
                    {item.shopsList.map((_item: any, _idx: any) => (
                        <TouchableOpacity activeOpacity={0.8} style={styles.sr_shopsItem} onPress={() => toShopDetail(item, _item)}>
                            <View style={styles.sr_shopsLeft}>
                                <Text style={styles.sr_shopTitle} numberOfLines={1}>{_item.shopsName}</Text>
                                <View style={styles.sr_shopLabelGroup}>
                                    <Label _key={shop_status_obj[_item.shopsStatus]}/>
                                    <Label _key={house_type_obj[_item.shopCategory]}/>
                                </View>
                            </View>
                            <View style={styles.sr_shopsRight}>
                                <View style={styles.sr_shopsRightItem}>
                                    <Text style={styles.sr_shopsRightItem_area}>{_item.shopBuildingArea}㎡</Text>
                                    <Text style={styles.sr_shopsRightItem_label}>建面</Text>
                                </View>
                                <View style={styles.sr_shopsRightDivision}/>
                                <View style={styles.sr_shopsRightItem}>
                                    <Text style={styles.sr_shopsRightItem_price}>{_item.shopTotalPrice}万</Text>
                                    <Text style={styles.sr_shopsRightItem_label}>价格</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        )
    };

    const keyExtractor = (item: any) => item.buildingTreeId;
    const {refreshing, sessionListData} = state;
    return (
        <BaseContainer title='寻铺结果' topBarStyle={styles.sr_navBar} scroll={false}>
            <SectionList sections={sessionListData} renderItem={renderItem}
                         renderSectionHeader={renderSectionHeader}
                         stickySectionHeadersEnabled={false}
                         refreshing={refreshing} onRefresh={onRefresh}
                         ListFooterComponent={state.sessionListData.length >= 2 ? null : listFooterComponent}
                         onEndReachedThreshold={0.1}
                         onEndReached={() => debounce(onEndReached, 800)()}
                         ListHeaderComponent={listHeaderComponent} keyExtractor={keyExtractor}
            />
        </BaseContainer>
    )
};

const mapStateToProps = (props: any) => {
    const {dictionaries, config, global} = props;
    return {dictionaries, config, global}
};

export default connect(mapStateToProps)(SearchResult)





