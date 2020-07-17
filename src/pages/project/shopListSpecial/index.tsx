import React, { PureComponent } from 'react'
import {
  FlatList, View, Image, TouchableOpacity, ActivityIndicator,
  Text, ListRenderItem, ImageBackground, Animated
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import ShopPreview from '@/businessComponents/ShopPreview'
import api, { TShopPreview } from '@/services/shop/shopListSpecial'
import styles from './styles'
import BuryPoint from '@/utils/BuryPoint'

export interface Params {
  featureId: string
  curShopId?: string
}

export interface State {
  inited: boolean
  loading: boolean
  shops: TShopPreview[]
  title: string,
  featureId: string,
  subTitle: string,
}

class ShopListSpecial extends PureComponent<NavigationScreenProps<Params>, State> {
  _scrollY = new Animated.Value(0)
  _loading = false
  _hasMore = true
  _pagination = {
    pageIndex: 0,
    pageSize: 10,
  }
  state = {
    inited: false,
    loading: false,
    shops: [],
    title: '',
    subTitle: '',
    featureId: ''
  }

  componentDidMount = async () => {
    try {
      await this.fetchListData(this._pagination)
    } catch { /** nothing todo */ }
    this.setState({ inited: true })
  }

  // 请求数据 修改state
  fetchListData = async (pagination: { pageIndex: number, pageSize: number }) => {
    this._loading = true
    this.setState({ loading: true })
    try {
      const { featureId } = this.props.navigation.state.params || {}
      let { extension: {
        featureTitle,
        featureSubtitle,
        homeFeatureShops,
        pageIndex,
        pageSize,
        totalCount
      } } = await api.postShopListSpecial({ featureId, ...pagination })
      if (!homeFeatureShops) {
        homeFeatureShops = []
      }
      const pageCount = Math.ceil(totalCount / pageSize)
      if (!pageCount || pageCount - 1 === pageIndex) {
        this._hasMore = false
      }
      this.setState(({ shops }) => ({
        loading: false,
        shops: pagination.pageIndex ? [...shops, ...homeFeatureShops] : homeFeatureShops,
        title: featureTitle,
        subTitle: featureSubtitle,
        featureId: featureId || ''
      }))
    } catch (e) {
      this.setState({ loading: false })
      throw e
    }
    this._loading = false
  }

  // 请求下一页数据
  fetchNextPage = async () => {
    if (!this._hasMore) return
    if (this._loading) return
    this._pagination.pageIndex++
    try {
      await this.fetchListData(this._pagination)
    } catch {
      this._pagination.pageIndex--
    }
  }

  // 列表头渲染
  listRenderHeader = () => {
    return (
      <ImageBackground style={styles['header']} source={require('@/images/pictures/special.png')}>
        <View style={styles['header-title']}>
          <Text style={styles['header-title-text']}>{this.state.title}</Text>
        </View>
        <View style={styles['header-profile']}>
          <Text style={styles['header-profile-text']}>{this.state.subTitle}</Text>
        </View>
      </ImageBackground>
    )
  }

  // 列表项渲染
  listRenderItem: ListRenderItem<TShopPreview> = ({ item }) => (
    <View style={styles['list-item']}>
      <ShopPreview
        data={item}
        featureShopHeader={{
          featureTitle: this.state.title,
          featureId: this.state.featureId,
          featureSubtitle: this.state.subTitle}
        }
        curShop={item.shopId === this.props.navigation.state.params?.curShopId}
        buryPointParams={{ page: '铺优选-查看更多' }}
      />
    </View>
  )

  // 跳转侦探寻铺
  goSearchShop = () => {
    BuryPoint.add({
      page: '铺优选-查看更多',
      target: '帮我找铺_button',
    })
    this.props.navigation.navigate('searchBuilding')
  }

  // 返回
  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    if (!this.state.inited) return <ActivityIndicator size='large' style={{ flex: 1 }} />
    return (
      <View style={styles['page-container']}>
        <Animated.View style={[styles['top'], { opacity: this._scrollY.interpolate({ inputRange: [0, 247], outputRange: [0, 1] }) }]}>
          <Text style={styles['top-text']}>{this.state.title}</Text>
        </Animated.View>

        <TouchableOpacity style={styles['back']} activeOpacity={1} onPress={this.goBack}>
          <Image style={styles['back-img']} source={require('@/images/icons/back_white.png')} />
        </TouchableOpacity>

        <FlatList
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this._scrollY } } }])}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles['list-content-container']}
          data={this.state.shops}
          renderItem={this.listRenderItem}
          onEndReached={this.fetchNextPage}
          keyExtractor={(_, i) => i.toString()}
          ListHeaderComponent={this.listRenderHeader}
        />

        {/* 帮我找铺 */}
        <TouchableOpacity style={styles['bwzp']} activeOpacity={1} onPress={this.goSearchShop}>
          <Image style={styles['bwzp-img']} source={require('@/images/pictures/bwzp.png')} />
        </TouchableOpacity>
      </View >
    )
  }
}

export default ShopListSpecial
