import React, {
  PureComponent, ReactElement,
} from 'react'
import {
  View, FlatList, TouchableOpacity,
  Text, TextInput, Image, ViewProps,
} from 'react-native'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { ErrorViewProps } from '../../components/ErrorView/types'
import { connect, MapStateToProps } from 'react-redux'
import Page from '../../components/Page'
import SwitchView from '../../components/SwitchView'
import NoData from '../noData'
import storage from '../../utils/storage'
import styles from './styles'
const SwitchItem = SwitchView.Item

export interface SingleProps {
  // 搜索历史记录是否区分用户
  auth?: boolean

  // 搜索页路由
  navigation: NavigationScreenProp<NavigationRoute>

  // 用于：点击搜索、历史记录
  loading?: boolean

  // 用于：下拉刷新
  refreshing?: boolean

  // 占位符（default：请输入搜索内容）
  placeholder?: string

  // 搜索结果数据源
  dataSource: any[]

  // 总共数据条数
  total?: number

  // 搜索结果页面body wrapper style
  bodyStyle?: ViewProps

  // 页面错误处理
  error?: ErrorViewProps

  // 渲染 title
  renderTitle?: () => ReactElement

  // 渲染 item
  renderItem: (item: any, index: number) => ReactElement

  // 点击历史搜索
  onPressHistory: (keyword: string) => void

  // 点击键盘搜索按钮
  onPressSearch: (keyword: string) => void

  // 加载更多
  onLoadMore?: (keyword: string) => void

  // 下拉刷新
  onRefresh?: (keyword: string) => void

  // 输入框值改变
  onChangeText?: (keyword: string) => void

  // 清空输入框
  onInputClean?: () => void
}

interface ModelProps {
  userId: string
}

type currentType = 'history' | 'result'
interface SingleState {
  text: string
  current: currentType
  history: string[]
}

class Single extends PureComponent<SingleProps & ModelProps, SingleState> {
  state = {
    text: '',
    current: 'history' as currentType,
    history: [] as string[],
  }
  storageKey = (() => {
    const { auth = true, userId, navigation } = this.props
    const { routeName } = navigation.state
    return `${routeName}:${auth ? userId : 'all'}`
  })()

  componentDidMount() {
    // 获取缓存中的历史记录
    storage.get(this.storageKey)
      .then(history => this.setState({ history }))
      .catch(() => storage.set(this.storageKey, []))
  }

  // 添加keyword到历史搜索
  addToHistory = (keyword: string) => {
    keyword = keyword.trim()
    const history = this.state.history.filter(i => i !== keyword)
    history.unshift(keyword)
    history.splice(8)
    this.setState({ history })
    storage.set(this.storageKey, history)
  }

  // 清空历史搜索
  cleanHistory = () => {
    storage.set(this.storageKey, [])
    this.setState({ history: [] })
  }

  // 点击搜索
  handleSearch = () => {
    const { text } = this.state
    text && this.addToHistory(text)
    this.props.onPressSearch(text)
    this.setState({ current: 'result' })
  }

  // 点击历史记录
  handlePressHistory = (keyword: string) => {
    this.addToHistory(keyword)
    this.props.onPressHistory(keyword)
    this.setState({
      text: keyword,
      current: 'result',
    })
  }

  // 搜索输入框中输入关键词
  handleChangeText = (text: string) => {
    const { onChangeText } = this.props
    onChangeText && onChangeText(text)
    this.setState({ text })
  }

  // 点击搜索输入框右侧清空按钮
  cleanInput = () => {
    this.props.onInputClean && this.props.onInputClean()
    this.setState({
      text: '',
      current: 'history',
    })
  }

  // onEndReached
  handleEndReached = () => {
    const { dataSource, total, onLoadMore } = this.props
    if (!total || total <= dataSource.length) return
    onLoadMore && onLoadMore(this.state.text)
  }

  // ListFooterComponent
  handleRenderFooter = () => {
    const { dataSource, total } = this.props
    let text = '～ 没有了 ～'
    if (total) text = dataSource.length < total ? '加载中' : '～ 没有了 ～'
    return (
      <View style={styles['footer']}>
        <Text>{text}</Text>
      </View>
    )
  }

  // top-left 搜索输入框
  renderSearchInput = () => (
    <View style={styles['topBar-left']}>
      {/* 搜索框文字部分 */}
      <TextInput
        value={this.state.text}
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSearch}
        maxLength={50}
        returnKeyType='search'
        placeholder={this.props.placeholder || '请输入搜索内容'}
        placeholderTextColor='#CBCBCB'
        // underlineColorAndroid='transparent'
        style={styles['search-input']}
      />

      {/* 左侧放大镜icon */}
      <Image
        source={require('../../images/icons/searchCus.png')}
        style={styles['image-search']}
      />

      {/* 右侧清空icon */}
      {this.state.text ? (
        <TouchableOpacity onPress={this.cleanInput} style={styles['input-clean']} >
          <Image
            source={require('../../images/icons/cleanInput.png')}
            style={styles['image-input-clean']}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )

  // top-right 取消按钮
  renderCancelButton = () => (
    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles['topBar-right']}>
      <Text style={styles['topBar-right-text']}>取消</Text>
    </TouchableOpacity>
  )

  render() {
    const {
      dataSource, bodyStyle, error, loading, refreshing,
      renderTitle, renderItem, onRefresh,
    } = this.props
    return (
      <Page
        scroll={false}
        loading={loading}
        error={error}
        leftView={this.renderSearchInput()}
        rightView={this.renderCancelButton()}
        topBarStyle={styles['topBar']}
        bodyStyle={{ backgroundColor: '#F8F8F8' }}
      >
        {/* 历史搜索 | 搜索结果 */}
        <SwitchView current={this.state.current}>
          {/* 历史搜索 */}
          <SwitchItem type='history' style={styles['history-layout']}>
            {/* 历史搜索标题栏 */}
            <View style={styles['history-header']}>
              <Text style={styles['history-text']}>历史搜索</Text>
              <TouchableOpacity onPress={this.cleanHistory} style={styles['history-clean']}>
                <Image
                  source={require('../../images/icons/delete.png')}
                  style={styles['image-history-clean']}
                />
              </TouchableOpacity>
            </View>
            {/* 历史搜索列表 */}
            <View style={styles['history-content']}>
              {
                this.state.history.map(i => (
                  <TouchableOpacity
                    key={i}
                    style={styles['history-item']}
                    onPress={() => this.handlePressHistory(i)}
                  >
                    <Text style={styles['history-item-text']}>{i}</Text>
                  </TouchableOpacity>
                ))
              }
            </View >
          </SwitchItem>

          {/* 搜索结果 */}
          <SwitchItem type='result' style={[styles['result-layout'], bodyStyle]}>
            {/* 有结果 | 无结果 */}
            <SwitchView current={dataSource.length ? 'nonempty' : 'empty'}>
              {/* 有结果 */}
              <SwitchItem type='nonempty' style={styles['result-layout']}>
                <FlatList
                  data={dataSource}
                  renderItem={({ item, index }) => renderItem(item, index)}
                  keyExtractor={(_, index) => index.toString()}
                  ListHeaderComponent={renderTitle ? renderTitle() : null}
                  ListFooterComponent={this.handleRenderFooter}
                  refreshing={refreshing}
                  onRefresh={() => onRefresh && onRefresh(this.state.text)}
                  onEndReachedThreshold={0.2}
                  onEndReached={this.handleEndReached}
                />
              </SwitchItem>

              {/* 无结果 */}
              <SwitchItem type='empty'>
                {!loading && !refreshing ? <NoData /> : null}
              </SwitchItem>
            </SwitchView>
          </SwitchItem>
        </SwitchView>
      </Page>
    )
  }
}

const mapStateToProps: MapStateToProps<ModelProps, any, any> = ({ search, user }) => ({
  userId: user.status === 200 ? user.userInfo.id : 'all'
})

export default connect(mapStateToProps)(Single)
