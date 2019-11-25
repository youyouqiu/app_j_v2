import React from 'react'
import {View} from "react-native";
import Search from "../../../businessComponents/Search";
import {scaleSize} from "../../../utils/screenUtil";
import BuildingItem from "../../../businessComponents/building/buildingItem";
import projectService from "../../../services/projectService";
import {connect} from "react-redux";

class BuildingSearch extends React.Component {


    constructor(props) {
        super();
        this.state = {
            dataSource: [],
            loading: false,
            refreshing: false,
            totalCount: 0
        };
        this.requestData = {
            pageIndex: 0,
            pageSize: 10,
            keyWord: '',
            city: props.projectLocation.cityCode || props.projectLocation.defaultCityCode
        };
        this.common = {
            hasMore: true
        }
    }

    handlePressSearch = (text) => {
        this.requestData.keyWord = text;
        this.setState({
            dataSource:[]
        },()=>{
            this.doSearch();
        });
    };

    doSearch = async (callback) => {
        const {api} = this.props.requestUrl;
        this.setState({loading: true});
        const res = await projectService.buildingListReq(api, this.requestData);
        const {extension, totalCount} = res;
        this.setState((prevState) => ({
            dataSource: [...prevState.dataSource, ...extension],
            totalCount,
            loading: false
        }),() => {
          callback && callback()
        })
    };

    handleRefresh = () => {
        this.requestData.pageIndex = 0;
        this.setState({dataSource: []}, () => {
            this.doSearch();
        });
    };

    handleLoadMore = () => {
        const {pageIndex} = this.requestData;
        this.requestData.pageIndex = pageIndex + 1;
        this.doSearch()
    };

    handlePressHistory = (text,callback) => {
        this.requestData.keyWord = text;
        this.doSearch(callback);
    };

    gotoProjectDetail=(buildingId, buildingTreeId)=>{
        this.props.navigation.navigate('buildingDetail',{buildingTreeId})
    };

    renderItem = (item) => {
        return <BuildingItem {...item} gotoProjectDetail={this.gotoProjectDetail}/>
    };

    render() {
        const {refreshing, dataSource, loading, totalCount} = this.state;
        return (
            <View style={{flex: 1}}>
                <Search navigation={this.props.navigation}
                        type='single'
                        placeholder='请输入搜索内容'
                        loading={loading}
                        refreshing={refreshing}
                        dataSource={dataSource}
                        renderTitle={this.renderTitle}
                        renderItem={this.renderItem}
                        onPressHistory={this.handlePressHistory}
                        onPressSearch={this.handlePressSearch}
                        onRefresh={this.handleRefresh}
                        onLoadMore={this.handleLoadMore}
                        total={totalCount}
                        bodyStyle={{marginBottom: scaleSize(32)}}/>
            </View>
        )
    }
}

const mapStateToProps = ({config, global,projectLocation}) => {
    return {
        requestUrl: config.requestUrl,projectLocation,
        global
    }
};

export default connect(mapStateToProps)(BuildingSearch)
