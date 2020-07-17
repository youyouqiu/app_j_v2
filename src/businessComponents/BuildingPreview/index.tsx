import React, { FC, memo, ReactNode } from 'react'
import { View, Text } from 'react-native'
import Label from '@/components/new-space/components/Label'
import Cover from './Cover'
import Price from './Price'
import { Commission } from '@/businessComponents/commission'
import { IBuildingPreview } from '@/services/building/buildingList'
import styles from './styles'

export interface IProps {
  data: IBuildingPreview
  separator?: boolean
  extention?: ReactNode
}

const BuildingPreview: FC<IProps> = ({ data, separator, extention }) => {
  return (
    <View style={[styles['container'], separator ? styles['container-separator'] : null]}>
      <View style={styles['main']}>
        {/* 左侧 楼盘封面图 */}
        <Cover source={{ uri: data.buildIcon }} showTag={!!data?.discounts} />

        {/* 右侧基本信息 */}
        <View style={styles['right']}>
          <View style={styles['row-1']}>
            <Text style={styles['name']} numberOfLines={1}>{data.buildingTreeName}</Text>
            <Label.BuildingSaleStatus _key={data.sellState!} />
          </View>
          <View style={styles['row-2']}>
            <Price min={data.minPrice} />
            <Text style={styles['remain']}>{`剩余${data.surplusShopNumber ?? 0}/${data.sumShopNumber ?? 0}套`}</Text>
          </View>
          <Text style={styles['row-3']}>
            {`${data.district}${data.area}｜建面${data.minArea ?? 0}-${data.maxArea ?? 0}㎡`}
          </Text>
          <View style={styles['row-4']}>
            <Label.SoloBuilding isSolo={data.projectType === 1} />
            <Label.TreeCategory _key={data.treeCategory!} />
            {data.labels?.slice(0, 2).map(tag => <Label key={tag} _key={tag} />)}
          </View>
          {/* 佣金+带看奖+现金奖+优惠政策+特色标签 */}
          <View style={[styles['row-5'], !data.commission && !data.discounts ? { display: 'none' } : null]}>
            <Commission commission={data.commission!} featureText={data.featureLabels?.[0]} />
          </View>
        </View>
      </View>
      {extention}
    </View>
  )
}

export default memo(BuildingPreview)
