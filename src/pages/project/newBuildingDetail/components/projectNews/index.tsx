import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import style from '../../style'
import { IDynamicItem, IFollowState } from '@/services/typings/project'
import moment from 'moment'
import NoData from '../noData'
import { newsType } from "@/models/getLastNews";
import { NavigationScreenProps } from 'react-navigation'
import BuryPoint from '@/utils/BuryPoint'
interface IProjectNewsProps {
  dynamicList?: IDynamicItem[]
  followStatus?: IFollowState
  onPressDy: (isSubscribe: boolean, isShow?: boolean) => Promise<void>
  onLayout: (e: LayoutChangeEvent) => void
  buildingTreeId?: string
}

interface IProjectNewsState {
}

class ProjectNews extends PureComponent<IProjectNewsProps & NavigationScreenProps, IProjectNewsState> {

  constructor(props: IProjectNewsProps & NavigationScreenProps) {
    super(props)
    this.state = {
    }
  }

  renderItem = (item: IDynamicItem, index: number) => {
    return (
      <TouchableOpacity activeOpacity={0.8} key={index} style={[style['flexRow']]} onPress={() => {
        BuryPoint.add({
          page: '楼盘详情页',
          target: '项目动态_button',
          action_param: {
            buildingTreeId: item.buildingTreeId
          }
        })
        this.props.navigation.navigate('buildingTrends', { buildingTreeId: item.buildingTreeId })
      }}>
        <View style={[style['flexCloum'], style['alignCenter']]}>
          <View style={[style['circleBlue']]} />
          <View style={[index === 0 ? style['projectLine'] : style['projectLine2']]} />
        </View>
        <View style={[style['projectNewItem'], style['flexCloum']]}>
          <View style={[style['flexRow'], style['justifyBetween']]}>
            <Text style={[style['font-24'], style['grayText']]}>{moment(item.createTime).format('YYYY.M.D HH:mm')}</Text>
            <Text style={[style['font-24'], style['blueText']]}>{item.label}</Text>
          </View>
          <View style={[style['flexCloum'], style['projectNewContent']]}>
            <Text numberOfLines={1} style={[style['font-32'], style['projectNewContentTitle']]}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={[style['font-28'], style['grayText'], style['lineHeight50']]}>
              {item.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render(): Element {
    const { dynamicList = [], followStatus, onPressDy, onLayout, navigation } = this.props
    const newV = dynamicList.concat([]).slice(0, 2)
    return <View onLayout={onLayout} style={style['projectNewsWrapper']}>
      <View style={style['itemContent']}>
        <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['itemTitle']]}>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <View style={style['headerLeftLine']} />
            <Text style={style['font-32']}>项目动态（{dynamicList.length}）</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={[style['flexRow'], style['alignCenter']]} onPress={() => { navigation.navigate('buildingTrends', { buildingTreeId: this.props.buildingTreeId }) }}>
            <Text>全部动态</Text>
            <Image style={[style['newsRight']]} source={require('@/images/icons/project/arrow_right.png')} />
          </TouchableOpacity>
        </View>
        <View>
          {
            newV.length === 0
              ?
              <NoData />
              :
              newV.map((item, index) => {
                return this.renderItem(item, index)
              })
          }
        </View>
        {/* <View> */}
        {
          followStatus?.isSubscribe
            ?
            <TouchableOpacity activeOpacity={0.8} onPress={() => { onPressDy(!followStatus?.isSubscribe, true) }} style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['unActiveBtn']]}>
              <Image style={[style['kpIcon']]} source={require('@/images/icons/project/dy.png')} />
              <Text style={[style['font-28'], style['grayText'], style['txImage']]}>已订阅</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={0.8} onPress={() => { onPressDy(!followStatus?.isSubscribe, true) }} style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['activeBtn']]}>
              <Image style={[style['kpIcon']]} source={require('@/images/icons/project/tixing.png')} />
              <Text style={[style['font-28'], style['blueText'], style['txImage']]}>订阅销控和楼盘动态</Text>
            </TouchableOpacity>
        }
        {/* </View> */}
      </View>
    </View>
  }
}

export default ProjectNews
