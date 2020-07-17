import React, { Component, FC, ReactText } from 'react'
import { View, Text } from 'react-native'
//@ts-ignore
import Shadow from '../../../components/Shadow'
//@ts-ignore
import Echarts from '@new-space/native-echarts'
import { scaleSize } from '../../../utils/screenUtil'
import { isEmpty } from '../../../utils/utils'
import styles from './saleType.styles'
import { TChart } from './types'

const Label: FC<{ label: string, value?: ReactText, color: string, width: string }> = ({
  label,
  value = 0,
  color,
  width,
}) => {
  return (
    <View style={styles['label'](width)}>
      <View style={styles['circle'](color)}>
        <View style={styles['circle-inner']} />
      </View>
      <Text style={styles['label-text']} numberOfLines={1}>
        {`${label}:${value}`}
      </Text>
    </View>
  )
}

class SaleType extends Component<TChart>{

  shouldComponentUpdate(nextProps: TChart) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }

  getGrid = (x: number, y: number) => `${100 * x / y}%`

  isNoData = (data: Array<number | undefined>) => {
    if (data.some(i => isEmpty(i))) return true
    return data.every(i => i === 0)
  }

  render() {
    const { ck, gy, sp, xzl } = this.props
    const option = {
      series: [
        {
          type: 'pie',
          radius: ['67%', '100%'],
          silent: true,
          label: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: ck,
              itemStyle: { normal: { color: '#FE5139' } }
            }, {
              value: gy,
              itemStyle: { normal: { color: '#49A1FF' } }
            }, {
              value: sp,
              itemStyle: { normal: { color: '#3AD047' } }
            }, {
              value: xzl,
              itemStyle: { normal: { color: '#4B6AC5' } }
            }, {
              value: this.isNoData([ck, gy, sp, xzl]) ? 1 : 0,
              itemStyle: { normal: { color: '#EAEAEA' } }
            }
          ],
        },
      ],
    }
    return (
      <Shadow style={styles['container']}>
        <View style={styles['chart']}>
          <Echarts
            height={scaleSize(176)}
            width={scaleSize(176)}
            option={option}
          />
          <View style={styles['title']}>
            <Text style={styles['title-text']}>我的销售</Text>
            <Text style={styles['title-text']}>类型统计</Text>
          </View>
        </View>
        <View style={styles['label-ul']}>
          <Label label='写字楼' value={xzl} color='#4B6AC5' width={this.getGrid(6, 11)} />
          <Label label='车库' value={ck} color='#FE5139' width={this.getGrid(5, 11)} />
          <Label label='商铺' value={sp} color='#3AD047' width={this.getGrid(6, 11)} />
          <Label label='公寓' value={gy} color='#49A1FF' width={this.getGrid(5, 11)} />
        </View>
      </Shadow>
    )
  }
}

export default SaleType
