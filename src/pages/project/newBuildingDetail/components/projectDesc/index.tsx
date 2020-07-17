import React, {PureComponent} from 'react'
import {View, Text, LayoutChangeEvent} from 'react-native'
import style from '../../style'
import {IProjectDetail} from '@/services/typings/project'

interface IProjectDescProps {
  buildingDetail?: IProjectDetail
  onLayout: (e: LayoutChangeEvent) => void
}

interface IProjectDescState {
}

class ProjectDesc extends PureComponent<IProjectDescProps, IProjectDescState> {

  constructor (props: IProjectDescProps) {
    super(props)
    this.state = {
    }
  }

  render ():Element {
    const {buildingDetail, onLayout} = this.props
    return <View onLayout={onLayout} style={style['projectDescWrapper']}>
      <View style={style['itemContent']}>
        <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['itemTitle']]}>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <View style={style['headerLeftLine']}/>
            <Text style={style['font-32']}>项目简介</Text>
          </View>
        </View>
        <View>
          <Text style={[style['font-28'], style['grayText'], style['lineHeight50']]}>
            {buildingDetail?.summary}
          </Text>
        </View>
      </View>
    </View>
  }
}

export default ProjectDesc
