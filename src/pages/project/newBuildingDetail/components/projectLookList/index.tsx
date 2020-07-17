import React, { PureComponent } from 'react'
import { View, Text, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import style from '../../style'
import BuildingPreviewWithShare from '@/businessComponents/BuildingPreviewWithShare'
import { IBuildingPreview } from '@/services/building/buildingList'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import BuryPoint from '@/utils/BuryPoint'

interface IProjectLookListProps {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>
  hotlist?: IBuildingPreview[]
  onLayout: (e: LayoutChangeEvent) => void
}

interface IProjectLookListState {
}

class ProjectLookList extends PureComponent<IProjectLookListProps, IProjectLookListState> {

  constructor(props: IProjectLookListProps) {
    super(props)
    this.state = {
    }
  }
  // 跳转楼盘详情
  gotoDetail = (buildingTreeId: string) => () => {
    BuryPoint.add({
      page: '楼盘详情页',
      target: '看过此楼盘的也看过_button',
      action_param: { buildingTreeId },
    })
    this.props.navigation.push('buildingDetail', { buildingTreeId })
  }
  render(): Element {
    const { hotlist = [], onLayout } = this.props
    return <View onLayout={onLayout} style={style['projectLookListWrapper']}>
      <View style={style['itemContent']}>
        <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['itemTitle']]}>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <View style={style['headerLeftLine']} />
            <Text style={style['font-32']}>看过此楼盘的也看过</Text>
          </View>
        </View>
        <View>
          {hotlist.map((item, index) => {
            return <TouchableOpacity activeOpacity={0.8} onPress={this.gotoDetail(item?.buildingTreeId!)}><BuildingPreviewWithShare key={index} pageFrom='楼盘详情' data={item} /></TouchableOpacity>
          })}
        </View>
      </View>
    </View>
  }
}

export default ProjectLookList
