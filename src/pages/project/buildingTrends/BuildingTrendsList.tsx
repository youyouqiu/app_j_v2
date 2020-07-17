import React, { PureComponent } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Theme } from '@new-space/teaset'
import Empty from '@/businessComponents/noData'
import TrendsItem from './TrendsItem'
import api, { Label, Trends } from '@/services/building/buildingTrends'
import config from './config'

interface TProps {
  label?: Label
  buildingTreeId: string
  initData?: Trends[]
}

interface TState {
  data: Trends[]
  inited: false
  loading: boolean
}

class BuildingTrendsList extends PureComponent<TProps, TState> {
  static getDerivedStateFromProps(nextProps: TProps, prevState: TState) {
    if (nextProps.initData && !prevState.inited) {
      return {
        inited: true,
        data: nextProps.initData
      }
    }
    return null
  }

  _hasMore = true
  _loading = false
  _pagination = {
    pageIndex: 0,
    pageSize: config.pageSize,
  }
  state: TState = {
    data: [],
    inited: false,
    loading: false,
  }

  // 请求列表分页数据
  fetchTrendsList = async () => {
    try {
      this.setState({ loading: true })
      const { label, buildingTreeId } = this.props
      const { extension, pageIndex, pageCount } = await api.postTrendsList({
        buildingTreeId,
        labelId: label ? label.labelId : undefined,
        ...this._pagination
      })
      this.setState(({ data }) => ({ data: pageIndex ? [...data, ...extension] : extension }))
      if (!pageCount || pageIndex + 1 >= pageCount) {
        this._hasMore = false
      }
    } catch (e) {
      console.log(`动态列表获取分页数据失败`, e)
      throw e
    } finally {
      this.setState({ loading: false })
    }
  }

  // 请求下一页数据
  fetchNextPage = async () => {
    if (!this._hasMore) return
    if (this._loading) return
    this._loading = true
    this._pagination.pageIndex++
    try {
      await this.fetchTrendsList()
    } catch {
      this._pagination.pageIndex--
    }
    this._loading = false
  }

  listRenderItem: ListRenderItem<Trends> = ({ item }) => {
    return <TrendsItem data={item} />
  }

  render() {
    return (
      <FlatList
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: Theme.isIPhoneX ? 34 : 0 }}
        showsVerticalScrollIndicator={false}
        data={this.state.data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={this.listRenderItem}
        onEndReached={this.fetchNextPage}
        ListEmptyComponent={Empty}
      />
    )
  }
}

export default BuildingTrendsList
