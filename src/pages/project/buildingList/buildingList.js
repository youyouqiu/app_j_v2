// 楼盘列表
import React, {Component} from 'react';
import {FlatList, TouchableOpacity, Image, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import projectService from '../../../services/projectService'
import BuildingItem from '../../../businessComponents/building/buildingItem'
import Page from '../../../components/Page';
import {connect} from 'react-redux';
import {scaleSize} from '../../../utils/screenUtil'
import Screen from '../../../businessComponents/screen/index'
import NoData from '../../../businessComponents/noData/index'
import {debounce} from "../../../utils/utils";
import Toast from "teaset/components/Toast/Toast";

class BuildingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buildingList: [],
            refreshing: false,
            hasMore: true,
            showFooter: false,
            condition: {},
            pageSize: 10,
            pageIndex: 0,
            total: 0,
            city: props.global.cityCode || props.global.defaultCityCode,
            showEmptyComponent: false
        }
    }

    componentDidMount() {
        this.getBuildingList()
    }

    getBuildingList = async (params = {}, type) => {
        try {
            const {requestUrl} = this.props;
            let {pageSize, pageIndex, city, condition} = this.state;
            let requestData = {pageSize, pageIndex, city, ...condition, ...params};
            if (requestData.district && requestData.area.includes('_0')) {
                requestData.area = undefined
            }
            const response = await projectService.buildingListReq(requestUrl.api, requestData);
            type === 'onOk' ? Toast.message('为您搜索到 ' + response.totalCount + ' 房源') : null;
            const {extension = [], totalCount} = response;
            const hasMore = (pageIndex + 1) * pageSize < totalCount;
            this.setState(prev => ({
                buildingList: [...prev.buildingList, ...extension],
                refreshing: false,
                hasMore,
                total: totalCount,
                pageIndex: response.pageIndex,
                showEmptyComponent: [...prev.buildingList, ...extension].length === 0,
            }));
        } catch (e) {
            this.setState({refreshing: false})
        }
    };

    _renderItems = ({item}) => {
        return <BuildingItem {...item} gotoProjectDetail={this.gotoProjectDetail}/>

    };

    gotoProjectDetail = (buildingId, buildingTreeId) => {
        this.props.navigation.navigate('buildingDetail', {buildingId, buildingTreeId})
    };

    _keyExtractor = (item, index) => index.toString();

    gotoSearch = () => {
        this.props.navigation.navigate('buildingSearch')
    };

    onOk = (item) => {
        this.setState({pageIndex: 0, buildingList: [], condition: item}, () => this.getBuildingList({}, 'onOk'))
    };

    onRefresh = () => {
        this.setState({pageIndex: 0,buildingList:[],showEmptyComponent:false,hasMore:true}, this.getBuildingList)
    };

    getMore = () => {
        let {pageIndex, hasMore} = this.state;
        if (hasMore) {
            debounce(() => {
                this.setState({
                    pageIndex: pageIndex + 1,
                }, this.getBuildingList)
            },1000)()
        }
    };

    footerContent = () => {
        const {hasMore} = this.state;
        return (
            hasMore ? (
                <View style={styles.bl_footerContent}>
                    <ActivityIndicator/>
                    <Text style={styles.bl_footerText}>&emsp;加载中</Text>
                </View>
            ) : (
                <View style={styles.bl_footerContent}>
                    <Text style={styles.bl_footerText}>没有更多了</Text>
                </View>
            )
        )
    };

    render() {
        let {buildingList, refreshing, hasMore, showFooter, showEmptyComponent} = this.state;

        const renderRight = (
            <TouchableOpacity activeOpacity={0.8} onPress={this.gotoSearch}>
                <Image style={{width: scaleSize(45), height: scaleSize(45), marginRight: scaleSize(32)}} source={require('../../../images/icons/search.png')}/>
            </TouchableOpacity>
        );
        return (
            <Page title='房源列表' scroll={false} rightView={renderRight}>
                <Screen onOk={this.onOk}/>
                <FlatList extraData={this.state}
                          refreshing={refreshing}
                          onEndReachedThreshold={0.1}
                          onEndReached={hasMore ? this.getMore : null}
                          ListFooterComponent={showEmptyComponent ? null : this.footerContent}
                          style={{height: '100%'}}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItems}
                          ListEmptyComponent={showEmptyComponent ? <NoData tips='抱歉，暂无楼盘信息～'/> : null}
                          data={buildingList}
                          onRefresh={this.onRefresh}/>
            </Page>
        )
    }
}

const mapStateToProps = ({config, global}) => {
    return {
        requestUrl: config.requestUrl,
        global
    }
};
export default connect(mapStateToProps)(BuildingList)

const styles = StyleSheet.create({
    bl_footerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    bl_footerText: {
        color: '#868686',
        fontSize: scaleSize(24)
    }
});
