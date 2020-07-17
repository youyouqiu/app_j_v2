import React, { FC, memo } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import Label from '@/components/new-space/components/Label'
import Cover from './Cover'
import navigation from '@/utils/navigation'
import { TShopPreview } from '@/services/shop/shopListSpecial'
import { specialLabels } from './config'
import styles from './styles'
import { Commission } from '../commission'
import BuryPoint from '@/utils/BuryPoint'
import {IFeatureShopHeaderType} from '@/pages/main/types/featureShopTypes'

interface Props {
  data: TShopPreview
  curShop?: boolean
  buryPointParams?: {
    page: string
  },
  featureShopHeader?: IFeatureShopHeaderType
}

const ShopPreview: FC<Props> = ({ data, curShop, buryPointParams, featureShopHeader }) => {
  // 根据后端字段获取特色标签,然后随机
  const getLabels = (data: TShopPreview) => {
    const labels: string[] = []
    specialLabels.map(i => {
      if (i.judge(data[i.key])) {
        labels.push(i.label)
      }
    })
    return labels.slice(0, 3)
  }

  // 跳转房源详情
  const gotoShopDetail = () => {
    buryPointParams && BuryPoint.add({
      target: '查看单铺_button',
      action_param: {
        shopId: data.shopId,
      },
      ...buryPointParams,
    })
    navigation.push({type: 'Navigation/PUSH', routeName: 'shopDetail', params: { shopId: data.shopId, buildingTreeId: data.buildingTreeId, featureShopHeader }})
  }

  // 跳转期组详情
  const gotoProjectDetail = () => {
    navigation.navigate('buildingDetail', { buildingTreeId: data.buildingTreeId })
  }

  return (
    <TouchableOpacity style={styles['container']} activeOpacity={1} onPress={gotoShopDetail}>
      <View style={styles['left']}>
        <Cover source={{ uri: data.shopImage! }} showTag={!!data.discounts} curShop={curShop} />
      </View>
      <View style={styles['right']}>
        <View style={styles['right-row1']}>
          <Text style={styles['right-row1-text']} numberOfLines={1}>{data.shopName}</Text>
          <Label.ShopSaleStatus _key={data.saleStatus!} />
          <Label.ShopCategoryType _key={data.shopCategoryType!} />
        </View>
        <Text style={styles['right-row2']} numberOfLines={1}>
          <Text style={styles['right-row2-text1']}>{data.totalPrice}</Text>
          <Text style={styles['right-row2-text2']}>万</Text>
          <Text style={styles['right-row2-line']}>｜</Text>
          <Text style={styles['right-row2-text3']}>{data.unitPrice}元/㎡</Text>
        </Text>
        <Text style={styles['right-row3']} numberOfLines={1}>
          <Text>{data.districtName}</Text>
          <Text>{data.areaName}</Text>
          <Text>｜</Text>
          <Text>建面{data.buildingArea}㎡</Text>
        </Text>
        <View style={styles['right-row4']}>
          {data.featureLabels?.map((v,i)=>(
            <Label key={i} _key={v} />
          ))}
        </View>
        {data.commission && (
          <View style={styles['right-row5']}>
            <Commission commission={data.commission!} />
          </View>
        )}
        <View style={styles['right-row6']}>
          <View style={styles['right-row6-dot']} />
          <Text style={styles['right-row6-text']} numberOfLines={1}>{data.buildingTreeName}</Text>
          <TouchableOpacity style={styles['right-row6-cklp']} activeOpacity={1} onPress={gotoProjectDetail}>
            <Text style={styles['right-row6-cklp-text']}>查看楼盘</Text>
            <Image style={styles['right-row6-cklp-arrow']} source={require('@/images/icons/arrowRight_1.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(ShopPreview)
