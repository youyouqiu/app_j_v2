import React from 'react'
import { TouchableOpacity, View } from "react-native";
import Search from "../../../businessComponents/Search";
import { scaleSize } from "../../../utils/screenUtil";
import projectService from "../../../services/projectService";
import { connect } from "react-redux";
import Toast from '@new-space/teaset/components/Toast/Toast'
import api from '../../../services/building/buildingList'
import BuildingPreviewWithShare from "@/businessComponents/BuildingPreviewWithShare";
import BuryPoint from '@/utils/BuryPoint'

class BuildingSearch extends React.Component {


  constructor(props) {
    super(props);
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

  handlePressSearch = async (text) => {
    BuryPoint.add({
      page: '首页',
      target: '搜索历史_item',
      action: 'click',
      action_param: {
        searchContent: text,
      }
    })
    this.requestData = {
      ...this.requestData,
      keyWord: text,
      pageIndex: 0,
      pageSize: 10,
    };
    this.setState({
      dataSource: [],
      loading: true,
    });
    await this.doSearch();
    this.setState({ loading: false })
  };

  doSearch = async (callback) => {
    const res = await api.postBuildingList(this.requestData);
    const { extension, totalCount } = res;
    this.setState((prevState) => ({
      dataSource: this.requestData.pageIndex ? [...prevState.dataSource, ...extension] : extension,
      totalCount,
    }), () => {
      if (this.state.dataSource.length > 0) {
        this.getShareData();
        callback && callback()
      }
    })
  };

  getShareData = async () => {
    // 推荐楼盘的ID
    const buildingTreeIdArr = this.state.dataSource?.map(a => a.buildingTreeId)
    projectService.getShareData(buildingTreeIdArr).then(response => {
      const result = response.extension
      const newArr = this.state.dataSource.map(i => {
        for (let j = 0; j < result.length; j++) {
          if (i.buildingTreeId === result[j].buildingTreeId) {
            i.number = result[j].number
            i.avatars = result[j].avatarList
            result.splice(j, 1)
            break
          }
        }
        return i
      })
      this.setState({ dataSource: newArr })
    }).catch(() => {
      Toast.message('获取微信推广数据失败')
    })
  }

  handleRefresh = async () => {
    this.requestData.pageIndex = 0;
    this.setState({ refreshing: true })
    await this.doSearch();
    this.setState({ refreshing: false })
  };

  handleLoadMore = () => {
    const { pageIndex } = this.requestData;
    this.requestData.pageIndex = pageIndex + 1;
    this.doSearch()
  };

  handlePressHistory = async (text, callback) => {
    BuryPoint.add({
      page: '首页',
      target: '搜索历史_item',
      action: 'click',
      action_param: {
        searchContent: text,
      }
    })
    this.requestData = {
      ...this.requestData,
      keyWord: text,
      pageIndex: 0,
      pageSize: 10,
    };
    this.setState({
      dataSource: [],
      loading: true,
    })
    await this.doSearch(callback);
    this.setState({ loading: false })
  };

  gotoProjectDetail = (buildingTreeId) => {
    this.props.navigation.navigate('buildingDetail', { buildingTreeId })
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity style={{paddingHorizontal: scaleSize(24), backgroundColor: '#fff'}} activeOpacity={1} onPress={() => this.gotoProjectDetail(item.buildingTreeId)}>
        <BuildingPreviewWithShare separator pageFrom='楼盘列表' data={item} />
      </TouchableOpacity>
    )
  };

  render() {
    const { refreshing, dataSource, loading, totalCount } = this.state;
    return (
      <View style={{ flex: 1 }}>
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
          bodyStyle={{ marginBottom: scaleSize(32) }} />
      </View>
    )
  }
}

const mapStateToProps = ({ config, global, projectLocation }) => {
  return {
    requestUrl: config.requestUrl, projectLocation,
    global
  }
};

export default connect(mapStateToProps)(BuildingSearch)
