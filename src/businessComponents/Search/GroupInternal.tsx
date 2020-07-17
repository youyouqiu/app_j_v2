import React, { PureComponent } from 'react'
import {
  View, FlatList, TouchableOpacity,
  Text, TextInput, Image,
} from 'react-native'
import { connect, MapStateToProps } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { GroupPropsCommon, DataSourceItem, Key } from './Group'
import Page from '../../components/Page'
import SwitchView from '../../components/SwitchView'
import NoData from '../noData'
import navigation from '../../utils/navigation'
import styles from './styles'
const SwitchItem = SwitchView.Item

interface SuperParams extends GroupPropsCommon {
  initText: string
  curKey: Key,
}

interface ModelProps {
  dataSource: DataSourceItem[]
  loading: boolean
  refreshing: boolean
}

interface State {
  text: string
}

class GroupInternal extends PureComponent<NavigationScreenProps & ModelProps, State>{

  params = this.props.navigation.state.params as SuperParams

  state = {
    text: this.params.initText,
  }

  // 格式化数据
  getDataSource = () => {
    return this.props.dataSource.find(i => i.key === this.params.curKey) || {
      data: [],
      total: 0,
      key: undefined,
    }
  }

  // 点击搜索
  handleSearch = () => {
    const { onPressSearch, curKey } = this.params
    const { text } = this.state
    onPressSearch(text, curKey)
  }

  // 搜索输入框中输入关键词
  handleChangeText = (text: string) => {
    const { onChangeText, curKey } = this.params
    onChangeText && onChangeText(text, curKey)
    this.setState({ text })
  }

  // 点击搜索输入框右侧清空按钮
  cleanInput = () => {
    const { onInputClean, curKey } = this.params
    onInputClean && onInputClean(curKey)
    this.setState({ text: '' })
  }

  // ListFooterComponent
  handleRenderFooter = () => {
    const { data, total } = this.getDataSource()
    let text = '～ 没有了 ～'
    if (total) text = data.length < total ? '加载中' : '～ 没有了 ～'
    return (
      <View style={styles['footer']}>
        <Text>{text}</Text>
      </View>
    )
  }

  // onEndReached
  handleEndReached = () => {
    const { onLoadMore, curKey } = this.params
    const { data, total } = this.getDataSource()
    if (!total || total <= data.length) return
    onLoadMore && onLoadMore(this.state.text, curKey)
  }

  // 退出页面
  handleGoBack = () => {
    const { onBack, curKey } = this.params
    onBack && onBack(curKey)
    navigation.goBack()
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
        placeholder={this.params.placeholder || '请输入搜索内容'}
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
    <TouchableOpacity onPress={this.handleGoBack} style={styles['topBar-right']}>
      <Text style={styles['topBar-right-text']}>取消</Text>
    </TouchableOpacity>
  )

  render() {
    const { error, renderItem, onRefresh } = this.params
    const { loading, refreshing } = this.props
    const { data, key } = this.getDataSource()
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
        {/* 有结果 | 无结果 */}
        <SwitchView current={data.length ? 'nonempty' : 'empty'}>
          {/* 有结果 */}
          <SwitchItem type='nonempty' style={styles['result-layout']}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => renderItem(item, index, key)}
              keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={this.handleRenderFooter}
              refreshing={refreshing}
              onRefresh={() => onRefresh && onRefresh(this.state.text, key)}
              onEndReachedThreshold={0.2}
              onEndReached={this.handleEndReached}
            />
          </SwitchItem>

          {/* 无结果 */}
          <SwitchItem type='empty'>
            {!loading && !refreshing ? <NoData /> : null}
          </SwitchItem>
        </SwitchView>
      </Page>
    )
  }
}

const mapStateToProps: MapStateToProps<ModelProps, any, any> = ({ search }) => ({
  dataSource: search.data,
  loading: search.loading,
  refreshing: search.refreshing,
})

export default connect(mapStateToProps)(GroupInternal)
