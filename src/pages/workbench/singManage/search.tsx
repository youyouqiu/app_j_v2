import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { connect, MapStateToProps } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import ApiSing, { SearchConditions, ListConditions } from '../../../services/sing'
import Search from '../../../businessComponents/Search'
import ListItem from './listItem'
import { scaleSize } from '../../../utils/screenUtil'

const pageSize = 3
enum Keys {
  subscribe = 1,
  sign,
  unsubscribe,
}
const STATUS = {
  [Keys.subscribe]: '认购',
  [Keys.sign]: '签约',
  [Keys.unsubscribe]: '退房',
}

interface DataSourceItem {
  key: Keys
  data: any[]
  total: number
  pageIndex: number
}
class SingSearch extends PureComponent<TStateProps & NavigationScreenProps> {
  state = {
    dataSource: [] as DataSourceItem[],
    loading: false,
    refreshing: false,
  }

  // 防止多次调用onLoadMore
  _loading = false

  // 一级页面数据接口
  fetchDataSource = (conditions: SearchConditions) => {
    return ApiSing.search(this.props.config.requestUrl.api, conditions)
  }

  // 二级页面数据接口
  fetchInternalData = (conditions: ListConditions) => {
    return ApiSing.list(this.props.config.requestUrl.api, conditions)
  }

  // 一级页面 - 获取数据
  getDataSource = (keyword: string, callback?: () => void) => {
    this.setState({ loading: true }, async () => {
      const statusList = [Keys.subscribe, Keys.sign, Keys.unsubscribe]
      try {
        const { extension } = await this.fetchDataSource({ statusList, keyword })
        const dataSource: DataSourceItem[] = []
        statusList.forEach(i => {
          if (extension[i].pageCount) {
            dataSource.push({
              key: i,
              data: extension[i].extension,
              total: extension[i].totalCount,
              pageIndex: extension[i].pageIndex,
            })
          }
        })
        this.setState({ dataSource })
      } catch (e) {
        console.log('getInitData error:', e)
        // TODO
      }
      this.setState({ loading: false })
      callback && callback()
    })
  }

  // 二级页面 - 搜索/刷新 获取数据通用逻辑
  internaInit = async (keyword: string, status: Keys) => {
    const conditions: ListConditions = {
      keyword,
      status,
      pageSize,
      pageIndex: 0,
    }
    try {
      const { extension, totalCount, pageIndex } = await this.fetchInternalData(conditions)
      const dataSource = this.state.dataSource.map(i => i.key === status ? {
        key: status,
        data: extension,
        total: totalCount,
        pageIndex: pageIndex,
      } : i)
      this.setState({ dataSource })
    } catch (e) {
      throw e
    }
  }

  // 二级页面 - 搜索
  internalSearch = (keyword: string, status: Keys) => {
    this.setState({ loading: true }, async () => {
      try {
        await this.internaInit(keyword, status)
      } catch (e) {
        console.log('internalSearch error:', e)
        // TODO
      }
      this.setState({ loading: false })
    })
  }

  // 二级页面 - 刷新
  handleRefresh = (keyword: string, status: Keys) => {
    this.setState({ refreshing: true }, async () => {
      try {
        await this.internaInit(keyword, status)
      } catch (e) {
        console.log('internalRefresh error:', e)
        // TODO
      }
      this.setState({ refreshing: false })
    })
  }

  // 二级页面 - 上拉加载 获取数据逻辑
  handleLoadMore = async (keyword: string, status: Keys) => {
    if (this._loading) return
    this._loading = true
    const { pageIndex } = this.state.dataSource.find(i => i.key === status)!
    const conditions: ListConditions = {
      keyword,
      status,
      pageSize,
      pageIndex: pageIndex + 1,
    }
    try {
      const { extension, totalCount, pageIndex } = await this.fetchInternalData(conditions)
      const dataSource = this.state.dataSource.map(i => i.key === status ? {
        key: status,
        data: i.data.concat(extension),
        total: totalCount,
        pageIndex: pageIndex,
      } : i)
      this.setState({ dataSource })
    } catch (e) {
      console.log('internalLoadMore error:', e)
      // TODO
    }
    this._loading = false
  }

  // 点击历史记录item
  handlePressHistory = (keyword: string, callback: () => void) => {
    this.getDataSource(keyword, callback)
  }

  // 点击键盘搜索按钮
  handlePressSearch = (keyword: string, key?: Keys) => {
    if (!key) {
      // 一级页面搜索
      this.getDataSource(keyword)
    } else {
      // 二级页面搜索
      this.internalSearch(keyword, key)
    }
    this.props.sendPoint.add({
      target: '搜索框_input',
      page: '工作台-签约管理',
      action_param: keyword
    })
  }

  // 渲染title
  renderTitle = (item: DataSourceItem, index: number, callback: () => void) => (
    <View key={index} style={styles['title']}>
      {/* 左侧文字 */}
      <Text style={styles['title-text']}>
        {`${STATUS[item.key]}共 `}<Text style={styles['title-text-number']}>{item.total}</Text> 个
      </Text>
      {/* 右侧查看更多 */}
      {
        item.total > 3 ? (
          <TouchableOpacity onPress={callback} style={styles['title-right']}>
            <Text style={styles['title-text']}>查看更多</Text>
            <Image source={require('./../../../images/icons/arrow_right.png')} style={styles['more-image']} />
          </TouchableOpacity>
        ) : null
      }
    </View>
  )

  // 渲染item
  renderItem = (item: any, index: number) => (
    <View key={index} style={{ marginTop: scaleSize(32) }}>
      <ListItem
        item={item}
        gotoDetail={() => this.props.navigation.navigate('singDetail', item)}
      />
    </View>
  )

  render() {
    return (
      // @ts-ignore
      <Search
        navigation={this.props.navigation}
        type='group'
        placeholder='请输入姓名/手机号码'
        loading={this.state.loading}
        refreshing={this.state.refreshing}
        dataSource={this.state.dataSource}
        renderTitle={this.renderTitle}
        renderItem={this.renderItem}
        onPressHistory={this.handlePressHistory}
        onPressSearch={this.handlePressSearch}
        onRefresh={this.handleRefresh}
        onLoadMore={this.handleLoadMore}
      />
    )
  }
}

interface TStateProps {
  config: any,
  sendPoint: any
}
const mapStateToProps: MapStateToProps<TStateProps, any, any> = ({ config, point }) => ({
  config,
  sendPoint: point.buryingPoint
})

export default connect(mapStateToProps)(SingSearch)

const styles = StyleSheet.create({
  'title': {
    marginLeft: scaleSize(32),
    marginRight: scaleSize(32),
    marginTop: scaleSize(24),
    marginBottom: scaleSize(-8),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  'title-text': {
    color: '#000',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'title-text-number': {
    color: '#FE5139',
  },
  'title-right': {
    margin: scaleSize(-10),
    padding: scaleSize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  'more-image': {
    marginLeft: scaleSize(8),
    width: scaleSize(16),
    height: scaleSize(30),
  },
})
