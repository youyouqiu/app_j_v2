import React, { PureComponent } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import ScrollTabView, { ChangeTabProperties } from '@new-space/react-native-scrollable-tab-view'
import Page from '@/components/Page'
import TabBar from './TabBar'
import BuildingTrendsList from './BuildingTrendsList'
import api, { Label, Trends } from '@/services/building/buildingTrends'
import config from './config'
import BuryPoint from '@/utils/BuryPoint'

interface BuildingTrendsParams {
  buildingTreeId: string
}

interface TState {
  title: string
  labels: Label[]
  initData: { [key: string]: Trends[] }
  inited: boolean
}

class BuildingTrends extends PureComponent<NavigationScreenProps<BuildingTrendsParams>, TState> {
  state: TState = {
    title: '项目动态',
    labels: [],
    initData: {},
    inited: false,
  }

  // 初始化页面数据
  componentDidMount = async () => {
    try {
      const { buildingTreeId = '' } = this.props.navigation.state.params || {}
      // 请求label
      const labels = await this.fetchLabel(buildingTreeId)
      // 请求所有标签的首屏数据
      const fetchAll = labels.map(i => this.fetchInitData(buildingTreeId, i.labelId))
      fetchAll.push(this.fetchInitData(buildingTreeId))
      await Promise.all(fetchAll)
    } catch (e) {
      console.log('初始化页面数据失败', e)
    } finally {
      this.setState({ inited: true })
    }
  }

  // 请求动态标签和数量
  fetchLabel = async (buildingTreeId: string) => {
    try {
      const { extension } = await api.postTrendsLabel({ buildingTreeId })
      this.setState({
        title: extension.buildingTreeName,
        labels: extension.labelList,
      })
      return extension.labelList
    } catch (e) {
      console.log('动态标签请求失败', e)
      throw e
    }
  }

  // 请求列表首屏数据
  fetchInitData = async (buildingTreeId: string, labelId?: string) => {
    try {
      const { extension } = await api.postTrendsList({
        buildingTreeId,
        labelId,
        pageIndex: 0,
        pageSize: config.pageSize,
      })
      this.setState(({ initData }) => ({
        initData: {
          ...initData,
          [labelId || config.totalKey]: extension,
        },
      }))
      return extension
    } catch (e) {
      console.log('动态列表首屏数据请求失败', e)
      throw e
    }
  }

  handleChangeTab = (o: ChangeTabProperties) => {
    BuryPoint.add({
      page: '项目动态列表',
      target: '项目动态列表标签_button',
      action_param: {
        buildingTreeId: this.props.navigation.state.params?.buildingTreeId,
        tabName: o.ref.props['data-value'].name,
      },
    })
  }

  render() {
    const { buildingTreeId = '' } = this.props.navigation.state.params || {}
    const { inited, title, initData } = this.state
    return (
      <Page
        scroll={false}
        title={title}
        showSkeleton={!inited}
        skeleton={<ActivityIndicator
          style={{ flex: 1 }}
          size='large'
        />}
      >
        <ScrollTabView renderTabBar={TabBar} onChangeTab={this.handleChangeTab}>
          <BuildingTrendsList
            data-value={{ name: '全部动态' }}
            buildingTreeId={buildingTreeId}
            initData={initData[config.totalKey]}
          />
          {this.state.labels.map(i => (
            <BuildingTrendsList
              data-value={{ name: i.labelName, count: i.count }}
              label={i}
              buildingTreeId={buildingTreeId}
              initData={initData[i.labelId]}
            />
          ))}
        </ScrollTabView>
      </Page>
    )
  }
}

export default BuildingTrends
