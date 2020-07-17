import React, {
  useState, useEffect,
  FunctionComponent, ReactElement,
} from 'react'
import {
  View, TouchableOpacity, Text,
  TextInput, Image, ViewProps,
} from 'react-native'
import { connect, MapStateToProps, DispatchProp } from 'react-redux'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { ErrorViewProps } from '../../components/ErrorView/types'
import Page from '../../components/Page'
import SwitchView from '../../components/SwitchView'
import NoData from '../noData'
import storage from '../../utils/storage'
import styles from './styles'
import { scaleSize } from '../../utils/screenUtil'
const Item = SwitchView.Item

export type Key = string | number
export type DataSourceItem = {
  key: Key
  data: any[]
  total: number
  [props: string]: any
}

export interface GroupPropsCommon {
  // 占位符（default：请输入搜索内容）
  placeholder?: string

  // 页面错误处理 同page error
  error?: ErrorViewProps

  // 渲染 item
  renderItem: (item: any, index: number, key?: Key) => ReactElement

  // 点击键盘搜索按钮
  onPressSearch: (keyword: string, key?: Key) => void

  // 加载更多
  onLoadMore?: (keyword: string, key?: Key) => void

  // 下拉刷新
  onRefresh?: (keyword: string, key?: Key) => void

  // 输入框值改变
  onChangeText?: (keyword: string, key?: Key) => void

  // 清空输入框
  onInputClean?: (key?: Key) => void

  // 从更多页面退回主页面
  onBack?: (key: Key) => void
}

export interface GroupProps extends GroupPropsCommon {
  // 历史记录是否区分用户
  auth?: boolean

  // 搜索页路由
  navigation: NavigationScreenProp<NavigationRoute>

  // 搜索结果数据源
  dataSource: DataSourceItem[]

  // 一级页面展示数据条数
  initNum?: number

  // 用于：点击搜索、历史记录（default：false）
  loading?: boolean

  // 用于：下拉刷新（default：false）
  refreshing?: boolean

  // 搜索结果body view的style
  bodyStyle?: ViewProps

  // 每个group view的style
  groupWrapperStyle?: ViewProps

  // 渲染 title
  renderTitle: (item: DataSourceItem, index: number, callback: () => void) => ReactElement

  // 点击历史搜索
  onPressHistory: (keyword: string) => void
}

export interface ModelProps {
  cache: DataSourceItem[],
  useCache: boolean,
  userId: string,
}

const Group: FunctionComponent<GroupProps & ModelProps & DispatchProp> = ({
  auth = true,
  initNum = 3,
  placeholder = '请输入搜索内容',
  loading = false,
  refreshing = false,
  navigation,
  dataSource,
  bodyStyle,
  groupWrapperStyle,
  error,
  renderTitle,
  renderItem,
  onPressHistory,
  onPressSearch,
  onLoadMore,
  onRefresh,
  onChangeText,
  onInputClean,
  onBack,
  // redux
  cache,
  useCache,
  dispatch,
  userId,
}) => {
  const [text, setText] = useState('')
  const [current, setCurrent] = useState('history')
  const [history, setHistory] = useState([] as string[])
  const storageKey = `${navigation.state.routeName}:${auth ? userId : 'all'}`

  useEffect(() => {
    // 缓存上个页面数据
    dispatch({ type: 'search/pushMultiCache' })
    // 获取缓存中的历史记录
    storage.get(storageKey).then(history => {
      setHistory(history)
    }).catch(() => {
      storage.set(storageKey, [])
    })
    return () => {
      dispatch({ type: 'search/popMultiCache' })
    }
  }, [])

  // dataSource 更新
  useEffect(() => {
    dispatch({
      type: 'search/updateData',
      payload: dataSource,
    })
  }, [dataSource])

  // loading 更新
  useEffect(() => {
    dispatch({ type: 'search/updateLoading', payload: loading })
  }, [loading])

  // refreshing 更新
  useEffect(() => {
    dispatch({ type: 'search/updateRefreshing', payload: refreshing })
  }, [refreshing])

  // 添加keyword到历史搜索
  const addToHistory = (keyword: string) => {
    let newHistory = history.filter(i => i !== keyword)
    newHistory.unshift(keyword)
    newHistory.splice(8)
    storage.set(storageKey, newHistory)
    setHistory(newHistory)
  }

  // 清空历史搜索
  const cleanHistory = () => {
    storage.set(storageKey, [])
    setHistory([])
  }

  // 搜索通用逻辑
  const handleSearch = () => {
    onPressSearch(text)
    text && addToHistory(text)
    dispatch({ type: 'search/closeCache' })
    setCurrent('result')
  }

  // 点击历史记录
  const handlePressHistory = (keyword: string) => {
    onPressHistory(keyword)
    addToHistory(keyword)
    dispatch({ type: 'search/closeCache' })
    setText(keyword)
    setCurrent('result')
  }

  // 搜索输入框中输入关键词
  const handleChangeText = (preText: string) => {
    setText(preText)
    onChangeText && onChangeText(preText)
  }

  // 点击搜索输入框右侧清空按钮
  const cleanInput = () => {
    onInputClean && onInputClean()
    setText('')
    setCurrent('history')
  }

  // 跳转查看更多callback
  const getCallback = (key: Key) => {
    return () => {
      navigation.push('groupInternal', {
        placeholder, error, renderItem,
        onPressSearch, onChangeText, onInputClean,
        onRefresh, onLoadMore, onBack,
        initText: text,
        curKey: key,
      })
    }
  }

  // top-left 搜索输入框
  const SearchInput = (
    <View style={styles['topBar-left']}>
      {/* 搜索框文字部分 */}
      <TextInput
        value={text}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearch}
        maxLength={50}
        returnKeyType='search'
        placeholder={placeholder}
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
      {text ? (
        <TouchableOpacity onPress={cleanInput} style={styles['input-clean']} >
          <Image
            source={require('../../images/icons/cleanInput.png')}
            style={styles['image-input-clean']}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )

  // top-right 取消按钮
  const CancelButton = (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles['topBar-right']}>
      <Text style={styles['topBar-right-text']}>取消</Text>
    </TouchableOpacity>
  )

  const mainData = useCache ? cache : dataSource

  return (
    <Page
      scroll={false}
      loading={loading}
      error={error}
      leftView={SearchInput}
      rightView={CancelButton}
      topBarStyle={styles['topBar']}
      bodyStyle={{ backgroundColor: '#F8F8F8' }}
    >
      {/* 历史搜索 | 搜索结果 */}
      <SwitchView current={current}>
        {/* 历史搜索 */}
        <Item type='history' style={styles['history-layout']}>
          {/* 历史搜索标题栏 */}
          <View style={styles['history-header']}>
            <Text style={styles['history-text']}>历史搜索</Text>
            <TouchableOpacity onPress={cleanHistory} style={styles['history-clean']}>
              <Image
                source={require('../../images/icons/delete.png')}
                style={styles['image-history-clean']}
              />
            </TouchableOpacity>
          </View>
          {/* 历史搜索列表 */}
          <View style={styles['history-content']}>
            {history.map(i => (
              <TouchableOpacity
                key={i}
                style={styles['history-item']}
                onPress={() => handlePressHistory(i)}
              >
                <Image style={styles['history-item-img']} source={require('@/images/icons/clock.png')}/>
                <Text style={styles['history-item-text']}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Item>

        {/* 搜索结果 */}
        <Item type='result' style={[styles['result-layout'], bodyStyle]}>
          {/* 有结果 | 无结果 */}
          <SwitchView current={dataSource.some(i => i.data.length) ? 'nonempty' : 'empty'}>
            {/* 有结果 */}
            <Item scroll type='nonempty' style={styles['result-layout']}>
              {/* 二级页面搜索结果不能影响一级页面 */}
              {mainData.map((dsItem, dsIndex) => {
                const isLast = mainData.length - 1 === dsIndex
                // dataSource.data为空不渲染group
                return Array.isArray(dsItem.data) && dsItem.data.length ? (
                  <View key={dsIndex} style={[
                    styles['result-layout'],
                    isLast ? { paddingBottom: scaleSize(32) } : null
                  ]}>
                    <View style={[styles['result-layout'], groupWrapperStyle]}>
                      {renderTitle(dsItem, dsIndex, getCallback(dsItem.key))}
                      {dsItem.data.slice(0, initNum).map((item, index) => {
                        return renderItem(item, index, dsItem.key)
                      })}
                    </View>
                  </View>
                ) : null
              })}
            </Item>
            {/* 无结果 */}
            <Item type='empty' style={{flex:1}}>
              {!loading && !refreshing ? <NoData /> : null}
            </Item>
          </SwitchView>
        </Item>
      </SwitchView>
    </Page>
  )
}

const mapStateToProps: MapStateToProps<ModelProps, any, any> = ({ search, user }) => ({
  cache: search.cache,
  useCache: search.useCache,
  userId: user.status === 200 ? user.userInfo.id : 'all'
})

export default connect(mapStateToProps)(Group)
