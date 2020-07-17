import React, { PureComponent } from 'react'
import { View, Text, Image, LayoutChangeEvent, ScrollView, TouchableOpacity } from 'react-native'
import style from '../../style'
import { Label } from '@/components/new-space'
import { IMainShopItem, IProjectDetail } from '@/services/typings/project'
import { NavigationScreenProps } from 'react-navigation'
import BuryPoint from '@/utils/BuryPoint'

interface IFeaturedListProps extends NavigationScreenProps {
  mainShopList?: IMainShopItem[]
  onLayout?: (e: LayoutChangeEvent) => void
  buildingDetail?: IProjectDetail
}

interface IFeaturedListState {
}

class FeaturedList extends PureComponent<IFeaturedListProps, IFeaturedListState> {

  constructor(props: IFeaturedListProps) {
    super(props)
    this.state = {
    }
  }

  gotoShopDetail = (item: IMainShopItem) => {
    const { buildingDetail } = this.props
    const routerParams = {
      shopId: item.id,
      buildingTreeId: buildingDetail?.buildingTreeId
    };
    BuryPoint.add({
      page: '楼盘详情页',
      target: '主推铺_button',
      action_param: routerParams,
    })
    this.props.navigation.navigate('shopDetail', routerParams)
  }

  renderItem = (item: IMainShopItem, index: number) => {
    console.log(item, 'item--IMainShopItem')
    return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.gotoShopDetail(item)} key={index} style={[style['flexCloum'], style['ztShopItem']]}>
      <Image style={[style['ztShopItemImg']]} source={{ uri: item.icon }} />
      <View style={[style['flexRow'], style['ztShopItemNameRow'], style['alignCenter']]}>
        <Text style={[style['font-32'], style['ztShopItemName']]}>{item.shopName}</Text>
        <Label.ShopSaleStatus _key={item.saleStatus!} />
      </View>
      <View style={[style['flexRow'], style['justifyBetween'], style['alignCenter']]}>
        <Text style={[style['grayText'], style['font-24']]}>建面{item.area}㎡</Text>
        <Text style={[style['redText'], style['font-28']]}>{item.price}万</Text>
      </View>
    </TouchableOpacity>)
  }

  render(): Element {
    const { mainShopList = [], onLayout } = this.props
    return <View onLayout={onLayout ? onLayout : () => { }} style={style['featuredListWrapper']}>
      <View style={style['itemContent']}>
        <View style={[style['flexRow'], style['alignCenter'], style['itemTitle']]}>
          <View style={style['headerLeftLine']} />
          <Text style={style['font-32']}>主推（{mainShopList.length}）</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mainShopList.map((item: IMainShopItem, index: number) => {
            return this.renderItem(item, index)
          })}
        </ScrollView>
      </View>
    </View>
  }
}

export default FeaturedList
