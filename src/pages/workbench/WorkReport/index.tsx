import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect, MapStateToProps } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import Page from '../../../components/Page'
import Shadow from '../../../components/Shadow'
import Profile from './Profile'
import CounterCube from './CounterCube'
import CounterTable, { DataSourceItem } from './CounterTable'
import ConversionRate from './ConversionRate'
import SaleType from './SaleType'
import Record from './Record'
import moment from 'moment'
import services from '../../../services/workReport'
import { isEmpty, returnFloatStr } from '../../../utils/utils'
import StoreState, { UserInfo } from '../../../models/types'
import styles from './index.styles'
import {
  TCube, TTable, TRate, TChart,
  TRecord, TLoading, TLoadingObj
} from './types'
import WorkReportSkeleton from "@/components/skeleton/components/WorkReportSkeleton";

interface WorkReportProps extends NavigationScreenProps, TStateProps { }
interface WorkReportState {
  cube: TCube
  table: TTable
  rate: TRate
  chart: TChart
  record: TRecord
  inited: boolean
  loading: TLoadingObj
}
class WorkReport extends PureComponent<WorkReportProps, WorkReportState> {
  state = {
    cube: {} as TCube,
    table: {} as TTable,
    rate: {} as TRate,
    chart: {} as TChart,
    record: {} as TRecord,
    inited: false,
    loading: {
      summary: true,
      businessData: true,
      saleType: true,
      personalMax: true,
    }
  }

  // 防止重复请求的同步loading
  loading = {} as TLoadingObj

  componentDidMount() {
    const start = moment(this.props.userInfo.createTime).toISOString()
    const end = moment().toISOString()
    this.fetchSummary()
    this.fetchBusinessData(start, end)
    this.fetchSaleType(start, end)
    this.fetchPersonalMax(start, end)
  }

  /**
   * 请求控制：
   * 1.防止重复请求
   * 2.lodaing控制
   * 3.接口请求失败跳转错误页
   */
  fetchCtl = (key: TLoading, doFetch: () => Promise<void>) => {
    if (this.loading[key]) return
    const setLoading = (_loading: boolean) => ({ loading }: WorkReportState) => ({
      loading: { ...loading, [key]: _loading }
    })

    this.loading[key] = true
    this.setState(setLoading(true), async () => {
      try {
        await doFetch()
      } catch (e) {
        console.log('doFetch error:', e)
        // TODO
      }
      this.setState(setLoading(false), this.initComplete)
      this.loading[key] = false
    })
  }

  /**
   * 判断第一轮数据是否请求完成 - 骨架屏显示与否
   */
  initComplete = () => {
    const { inited, loading } = this.state
    if (inited) return
    for (let key in loading) {
      if (loading[key as TLoading]) return
    }
    this.setState({ inited: true })
  }

  /**
   * 获取[拥有客户],[微信绑定],[完成签约]
   */
  fetchSummary = () => {
    this.fetchCtl('summary', async () => {
      const {
        extension: {
          customerCount: kh,
          wxBindCount: wx,
          dealAmount: qy,
        }
      } = await services.summary()
      this.setState({
        cube: { kh, wx, qy },
      })
    })
  }

  /**
   * 获取[报备]、[到访]、[认购]、[签约]、[退房]以及[转换率]
   */
  fetchBusinessData = (startTime: string, endTime: string) => {
    this.fetchCtl('businessData', async () => {
      const {
        extension: {
          reportCount: bb,
          visitCount: df,
          subscriptionCount: rg,
          signedCount: qy,
          checkoutCount: tf,
          report2VisitRate: bb2df,
          visit2SubcriptionRate: df2rg,
          subscription2SignedRate: rg2qy,
          report2SignedRate: bb2qy,
        }
      } = await services.businessData({ startTime, endTime })
      this.setState({
        table: { bb, df, rg, qy, tf },
        rate: { bb2df, df2rg, rg2qy, bb2qy },
      })
    })
  }

  /**
   * 获取[销售类型]
   */
  fetchSaleType = (startTime: string, endTime: string) => {
    this.fetchCtl('saleType', async () => {
      const {
        extension: {
          officeDealCount: xzl,
          shopDealCount: sp,
          garageDealCount: ck,
          apartmentDealCount: gy,
        }
      } = await services.saleType({ startTime, endTime })
      this.setState({
        chart: { xzl, sp, ck, gy },
      })
    })
  }

  /**
   * 获取[个人纪录]
   */
  fetchPersonalMax = (startTime: string, endTime: string) => {
    this.fetchCtl('personalMax', async () => {
      const {
        extension: {
          maxReportBuildingTreeName: bbBuild,
          maxReportCount: bbCount,
          maxVisitBuildingTreeName: dfBuild,
          maxVisitCount: dfCount,
          commissionSettlementRatio: yjjsRate,
        }
      } = await services.personalMax({ startTime, endTime })
      this.setState({
        record: { bbBuild, bbCount, dfBuild, dfCount, yjjsRate }
      })
    })
  }

  // 选择时间后重新请求数据
  handleChose = (start: string, end: string) => {
    this.fetchBusinessData(start, end)
    this.fetchSaleType(start, end)
    this.fetchPersonalMax(start, end)
  }

  render() {
    const { userInfo } = this.props
    const { cube, table, rate, chart, record, inited } = this.state

    // StatisticTable -> dataSource
    const dataSource = [
      { label: '报备', value: table.bb || 0 },
      { label: '到访', value: table.df || 0 },
      { label: '认购', value: table.rg || 0 },
      { label: '签约', value: table.qy || 0 },
      { label: '退房', value: table.tf || 0 },
    ]

    return (
      <Page
        title='工作报表'
        statusBarStyle='dark-content'
        topBarStyle={styles['top-bar']}
        bodyStyle={styles['page-body']}
        showSkeleton={!inited}
        skeleton={<WorkReportSkeleton />}
      >
        <View>
          {/* 个人名牌 */}
          <Profile {...userInfo} />

          {/* 拥有客户、微信绑定、完成签约 */}
          <View style={styles['multiple-wrapper']}>
            <CounterCube
              title='拥有客户'
              icon={require('../../../images/icons/yykh.png')}
              value={cube.kh || 0}
              unit='位'
            />
            <View style={styles['separator']} />
            <CounterCube
              icon={require('../../../images/icons/wxbd.png')}
              title='微信绑定'
              unit='位'
              value={cube.wx || 0}
            />
            <View style={styles['separator']} />
            <CounterCube
              icon={require('../../../images/icons/wcqy.png')}
              title='完成签约'
              unit='万'
              value={cube.qy || 0}
              valueColor='#FF0000'
            />
          </View>

          {/* 日期统计 */}
          <CounterTable
            startTime={userInfo.createTime!}
            dataSource={dataSource as DataSourceItem[]}
            onChose={this.handleChose}
          />

          {/* 转换率、销售类型 */}
          <View style={styles['multiple-wrapper']}>
            <ConversionRate {...rate} />
            <View style={styles['separator']} />
            <SaleType {...chart} />
          </View>

          {/* 报备最多、到访最多、佣金结算比 */}
          <Shadow style={styles['record-ul']}>
            <Record
              icon={require('../../../images/icons/report.png')}
              title='我报备最多的楼盘'
              content={record.bbBuild ? [record.bbBuild!, `${record.bbCount}次`] : '暂无数据'}
            />
            <Record
              icon={require('../../../images/icons/building.png')}
              title='我客户到访最多楼盘'
              content={record.dfBuild ? [record.dfBuild!, `${record.dfCount}次`] : '暂无数据'}
            />
            <Record
              icon={require('../../../images/icons/coin.png')}
              title='我的佣金结算比'
              content={!isEmpty(record.yjjsRate) ? `${returnFloatStr(record.yjjsRate!, 2)}%` : '暂无数据'}
            />
          </Shadow>
        </View>
      </Page>
    )
  }
}

interface TStateProps {
  userInfo: UserInfo
}
const mapStateToProps: MapStateToProps<TStateProps, any, StoreState> = ({ user }) => ({
  userInfo: user.userInfo,
})

export default connect(mapStateToProps)(WorkReport)
